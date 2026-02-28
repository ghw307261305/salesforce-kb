# 第5章 Action 契约设计（Flow/Apex/API）

- 版本: v1
- 最后更新: 2026-02-28
- 章节定位: 开发实现核心
- 预计学习时长: 150-180 分钟

## Summary

本章聚焦 Agentforce 的执行层设计。  
核心目标是把“可调用动作”从代码实现抽象为稳定契约，确保 Action 能被可靠调用、可观测、可回滚。

完成本章后，学习者应能:

1. 为每个 Action 定义完整输入/输出/错误契约。
2. 正确选择 Flow、Apex、API 三类动作实现方式。
3. 设计动作级安全边界、超时与重试策略。

## Decision / Changes

1. 采用“契约先行”方法: 先写 Action Contract，再写实现。
2. 将 Action 分为读、写、高风险三类，分别制定不同控制策略。
3. 将幂等键、错误映射、可观测字段作为上线前强制项。

## 1. 学习目标

### 1.1 知识目标

1. 理解 Action 在 Agentforce 执行链路中的角色。
2. 理解 Flow/Apex/API 的适用边界与选型权衡。
3. 理解动作失败时的恢复与人工接管策略。

### 1.2 技能目标

1. 能写出可执行的 Action Contract 文档。
2. 能根据场景选择合适的 Action 类型。
3. 能设计动作级 SLA（超时、重试、并发、告警）。

### 1.3 交付目标

1. 一份 Action Catalog（至少 6 个动作）。
2. 每个动作 1 份 Contract（输入/输出/错误/安全）。
3. 一组动作级测试用例（单元 + 集成 + 异常）。

## 2. 前置知识

1. 第3章 Prompt 分层与工具调用策略。
2. 第4章 Topic 路由与边界设计。
3. Salesforce Flow、Apex、API 基础能力。

## 3. Action 设计原则

### 3.1 Action 的最小职责

Action 只负责:

1. 执行明确业务操作。
2. 返回结构化、可验证结果。
3. 暴露可追踪的成功/失败状态。

Action 不负责:

1. 意图判断（由 Topic/Prompt 负责）。
2. 长篇业务解释（由响应层负责）。

### 3.2 Action 命名与分类

| 分类 | 命名建议 | 示例 |
| --- | --- | --- |
| 读取类 | `Get/List/Query` 前缀 | `GetCaseStatus` |
| 写入类 | `Create/Update/Close` 前缀 | `CreateCase` |
| 风险类 | `Approve/Cancel/Delete` 前缀并加审批说明 | `CancelOrderWithApproval` |

### 3.3 单一职责原则

一个 Action 只做一件事，避免“大而全超级动作”：

1. 好处: 可测试、可复用、可回滚。
2. 代价: 动作数量增加，但治理成本更低。

## 4. Contract-First 设计框架

### 4.1 标准合同字段

| 区块 | 必填字段 |
| --- | --- |
| Inputs | name/type/required/validation/example |
| Outputs | name/type/meaning/example |
| Execution Rules | preconditions/idempotency/timeout/retry |
| Security | required permissions/sharing/PII rules |
| Error Mapping | source/code/user-safe message/next step |
| Observability | request_id/action_id/latency/outcome |

### 4.2 输入设计规则

1. 每个输入字段必须有验证规则。
2. 可选字段必须定义默认行为。
3. 禁止用“自由文本”替代关键结构化字段。

### 4.3 输出设计规则

1. 输出必须包含 `status` 与可读 `message`。
2. 业务数据放入 `data` 对象，避免字段散乱。
3. 输出字段改动必须触发回归测试。

## 5. Flow / Apex / API 选型

### 5.1 选型矩阵

| 类型 | 适用场景 | 优势 | 风险 |
| --- | --- | --- | --- |
| Flow Action | 声明式流程、审批、标准对象操作 | 上手快、可视化 | 复杂逻辑可维护性下降 |
| Apex Action | 复杂逻辑、性能敏感、细粒度控制 | 灵活、可测试、可扩展 | 开发门槛高 |
| API Action | 外部系统集成、跨平台操作 | 解耦好、边界清晰 | 网络失败与鉴权复杂 |

### 5.2 选型决策顺序

1. 是否仅需标准对象流程编排？是 -> 优先 Flow。
2. 是否需要复杂逻辑/性能优化？是 -> Apex。
3. 是否必须调用外部系统？是 -> API。
4. 混合场景采用“Flow 编排 + Apex/API 执行”。

## 6. 动作级可靠性设计

### 6.1 幂等策略

| 场景 | 幂等键建议 |
| --- | --- |
| 创建记录 | `business_key + action_type + date_bucket` |
| 发邮件 | `recipient + template + schedule_time` |
| 外部请求 | `external_ref + operation` |

### 6.2 超时与重试建议

1. 读取类动作: timeout 2-3s，重试 0-1 次。
2. 写入类动作: timeout 3-5s，重试 1 次（需幂等）。
3. 外部 API: timeout 5-8s，重试 1 次后 handoff。

### 6.3 错误映射规范

| 错误类型 | 用户文案 | 下一步 |
| --- | --- | --- |
| INVALID_INPUT | 还缺少必要信息，请补充后继续。 | ask_clarification |
| ACCESS_DENIED | 当前权限无法执行此操作。 | handoff |
| TIMEOUT | 服务暂时不可用，请稍后重试。 | retry_once |
| DOWNSTREAM_5XX | 外部服务异常，已转人工处理。 | handoff |

## 7. 安全与可观测性

### 7.1 安全控制清单

1. 显式声明对象与字段权限需求。
2. 明确 sharing mode（with sharing/without sharing）。
3. 敏感字段脱敏输出。
4. 高风险动作启用二次确认或审批。

### 7.2 观测字段清单

| 字段 | 用途 |
| --- | --- |
| request_id | 全链路追踪 |
| topic_id | 关联路由结果 |
| action_id | 动作定位 |
| latency_ms | 性能评估 |
| outcome | 成功/失败分类 |
| error_code | 缺陷归因 |

### 7.3 告警建议

1. action_success_rate < 90%
2. p95_latency > 8s
3. timeout_rate > 3%
4. permission_denied 激增

## 8. 实操练习（必做 + 可选）

### 8.1 必做练习: 设计 6 个动作契约包

任务:

1. 基于“Case 助手”场景设计 6 个动作（3 读、2 写、1 高风险）。
2. 每个动作补齐完整合同字段。
3. 至少为 2 个写动作设计幂等键。
4. 为每个动作定义 2 条失败映射。

预期结果: 形成可直接进入开发的 Action Contract 文档。

### 8.2 可选练习: 选型评审

任务:

1. 针对同一业务需求分别给出 Flow/Apex/API 三种方案。
2. 从交付速度、可维护性、风险三维打分。
3. 输出最终选型结论与理由。

预期结果: 形成一页 Action 选型 ADR 草案。

## 9. 常见错误与排障

| 问题 | 现象 | 修正建议 |
| --- | --- | --- |
| 先写代码后补契约 | 行为不一致、难回归 | 强制 Contract-First |
| 输入校验缺失 | 运行时随机失败 | 输入字段必须验证 |
| 无幂等机制 | 重试导致重复写入 | 写动作必须幂等 |
| 错误原样透出 | 用户看到技术错误 | 统一错误映射文案 |
| 无监控字段 | 故障定位慢 | 强制记录 request_id 等字段 |

## 10. 练习题

### 10.1 选择题

1. 下列哪项最符合 Action 设计原则？
   - A. 一个动作完成所有业务逻辑
   - B. 一个动作只承担单一职责
   - C. 动作不需要输出固定结构
   - D. 动作失败后不需要分类
2. 对写入类动作，最关键的可靠性控制是：
   - A. 增加文案长度
   - B. 幂等机制
   - C. 减少日志
   - D. 增加主题数量
3. 外部 API 调用失败后，推荐策略是：
   - A. 无限重试
   - B. 编造返回值
   - C. 有限重试并转人工
   - D. 直接忽略

答案：1-B，2-B，3-C。

### 10.2 实作题

题目：为“订单取消助手”设计动作契约，至少包含：

1. 4 个动作（查询、校验、取消、通知）。
2. 每个动作的输入输出与错误映射。
3. 取消动作的审批与幂等设计。

评分参考：

1. 契约完整性（40分）
2. 安全与可靠性（40分）
3. 可实现性（20分）

## 11. 验收标准（章节通过条件）

1. 形成 1 套 Action Catalog（>= 6 个动作）并通过结构审查。
2. 写入类动作均具备幂等策略与错误映射。
3. 动作测试覆盖率 >= 90%，练习题得分 >= 80 分。

## 12. 参考资料

1. [../02-Build-HowTo/Actions/Action-Design-Template.md](../02-Build-HowTo/Actions/Action-Design-Template.md)
2. [../02-Build-HowTo/Actions/agentforce-actions-get-started.md](../02-Build-HowTo/Actions/agentforce-actions-get-started.md)
3. [../02-Build-HowTo/Actions/Flow-Actions.md](../02-Build-HowTo/Actions/Flow-Actions.md)
4. [../02-Build-HowTo/Actions/Apex-Actions.md](../02-Build-HowTo/Actions/Apex-Actions.md)
5. [../02-Build-HowTo/Actions/API-Actions.md](../02-Build-HowTo/Actions/API-Actions.md)
6. [../08-Samples/Case-001-SDR-Lead-Nurturing/02-Action-Contracts.md](../08-Samples/Case-001-SDR-Lead-Nurturing/02-Action-Contracts.md)

## 13. 版本敏感假设

1. Action 能力类型和 UI 展现可能随平台版本变化，仍需以目标 org 为准。
2. 外部 API 限流和认证策略依赖第三方系统版本。

## Risks / Known Issues

1. 团队若忽略契约版本管理，容易出现调用方与实现方不一致。
2. 高频写动作若无幂等，生产中可能产生重复写入事故。
3. 仅做功能验证不做异常验证，会放大上线风险。

## Next Steps

1. 进入第6章，完成 Data Cloud 与 RAG 接地设计。
2. 把本章动作契约接入 Testing Center 回归集。
3. 建立 Action 变更审批规则（契约变更需评审）。
