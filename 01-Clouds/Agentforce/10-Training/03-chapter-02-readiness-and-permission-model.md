# 第2章 前置条件与权限模型

- 版本: v1
- 最后更新: 2026-02-28
- 章节定位: 基础到实施过渡
- 预计学习时长: 120-150 分钟

## Summary

本章解决 Agentforce 项目最容易失败的两个问题：

1. 环境和依赖未准备好就开始开发，导致反复返工。
2. 权限设计不当，导致“要么不能跑，要么过度授权”。

完成本章后，学习者应能独立产出一份 `Readiness Matrix + Permission Matrix`，并用于上线前评审。

## Decision / Changes

1. 将前置检查明确拆分为“必做/可选”，避免模糊执行。
2. 权限设计采用“Permission Set 优先”策略，不鼓励 Profile 深度定制。
3. 在章节内加入“高风险动作控制”和“权限漂移复核”，强化治理视角。

## 1. 学习目标

### 1.1 知识目标

1. 理解 Agentforce 实施的前置条件分类方法。
2. 理解 Persona 到权限映射的最小权限原则。
3. 理解上线前权限验证与上线后权限漂移治理机制。

### 1.2 技能目标

1. 能构建 Readiness Matrix 并判定 Go/No-Go。
2. 能输出 Persona-to-Permission Matrix 与对象字段矩阵。
3. 能为高风险动作设计额外控制和审计要求。

### 1.3 交付目标

1. 一份项目级前置条件矩阵。
2. 一份角色权限矩阵（含 Required / Not Allowed）。
3. 一份权限复核清单（发布前 + 月度）。

## 2. 前置知识

1. 第1章术语与架构基础。
2. Salesforce 权限体系基础（Profile/Permission Set、CRUD/FLS/Sharing）。
3. Agentforce 基础功能入口（Builder、Testing、Deployment）。

## 3. 前置条件框架（Readiness Matrix）

### 3.1 检查维度

| 维度 | 典型检查项 | 级别 |
| --- | --- | --- |
| License/SKU | Agentforce 能力、相关功能许可可用 | 必做 |
| Object/Data | Lead/Contact/Case 等对象与关键字段完备 | 必做 |
| Channel | Email/Web/Console 渠道可接入 | 必做 |
| Identity | Agent User 身份、邮箱、认证链路可用 | 必做 |
| Knowledge | Data Cloud/KB 索引准备 | 场景必做 |
| Observability | 日志字段、告警、Dashboard 可用 | 必做 |
| Environment | Sandbox 与生产配置一致性 | 必做 |
| Compliance | 退订、隐私、审计策略 | 必做 |

### 3.2 四阶段检查流程

1. `Enablement`: 能力开通、对象确认、责任人就位。
2. `Configuration`: Agent/Topic/Action/Prompt 可配置并保存。
3. `Testing`: Preview、批测、E2E 可运行。
4. `Runtime`: 监控、告警、回滚方案可执行。

### 3.3 Readiness Matrix 模板

| ID | Item | Required | Owner | Status | Evidence | Risk if Missing |
| --- | --- | --- | --- | --- | --- | --- |
| RD-01 | Agentforce 功能可见 | yes | Admin |  |  | 无法创建 Agent |
| RD-02 | 关键对象/字段可访问 | yes | Admin/BA |  |  | Action 调用失败 |
| RD-03 | Agent User 验证成功 | yes | Admin |  |  | 无法执行自动动作 |
| RD-04 | 渠道接入已打通 | yes | Admin/Dev |  |  | 无法触达用户 |
| RD-05 | 测试数据集可用 | yes | QA |  |  | 无法回归 |
| RD-06 | 审计与告警可见 | yes | Ops |  |  | 故障不可观测 |

## 4. 权限模型设计（Least Privilege）

### 4.1 Persona 划分

| Persona | 核心职责 | 禁止职责 |
| --- | --- | --- |
| Platform Admin | 开通功能、分配权限、处理事故 | 代替业务审核提示词 |
| Agent Manager | 维护 Topic/Action/Prompt | 修改安全审计策略（未经审批） |
| Agent User | 执行动作 | 管理权限配置 |
| Business User | 触发协作、查看结果 | 修改系统级配置 |
| Auditor/SecOps | 审计与复核 | 直接执行业务写操作 |

### 4.2 权限映射方法

1. 先定义操作清单（read/create/update/execute）。
2. 映射到 Permission Set（优先），Profile（仅必要）。
3. 标记 `Required` 与 `Not Allowed`。
4. 为每项权限写业务理由。

### 4.3 对象字段最小授权样例

| Object | Field Group | Agent User | Agent Manager | Business User | Auditor |
| --- | --- | --- | --- | --- | --- |
| Lead/Contact/Case | 识别字段 | R | R | R | R |
| Lead/Contact/Case | 状态更新字段 | U(受限) | U | U(受限) | R |
| PII 字段 | 敏感字段 | R(脱敏) | R(脱敏) | R(脱敏) | R(脱敏) |
| Prompt 配置对象 | 配置字段 | - | C/R/U | - | R |

### 4.4 高风险动作控制

| 动作 | 额外控制 | 审计要求 |
| --- | --- | --- |
| 外发邮件 | 域名白名单 + 发送阈值 | request_id + 发送结果 |
| 写入业务记录 | 幂等键 + 前置校验 | 记录变更前后值 |
| 外部 API 调用 | endpoint allowlist | 响应码 + 延迟 |
| 人工接管 | 队列白名单 | handoff reason |

## 5. 实操练习（必做 + 可选）

### 5.1 必做练习: 完成一版 Readiness + Permission 双矩阵

任务：以“SDR Lead Nurturing”场景为例，完成：

1. Readiness Matrix（至少 10 项）。
2. Persona-to-Permission Matrix（至少 5 类 Persona）。
3. 高风险动作控制表（至少 4 条）。

预期结果：矩阵可用于项目例会直接评审并给出 Go/No-Go 结论。

### 5.2 可选练习: 权限漂移审计

任务：抽样检查 5 个生产用户权限，与基线矩阵对比差异并给出处置意见。

预期结果：形成一页“漂移清单 + 纠偏计划”。

## 6. 常见错误与排障

| 问题 | 现象 | 修正建议 |
| --- | --- | --- |
| 只做功能开通，不做依赖检查 | 开发到中途才发现渠道/邮箱不可用 | 用 Readiness Matrix 前置拦截 |
| 权限命名照搬文档 | 在目标 org 找不到对应权限 | 用“能力映射”替代“名称照搬” |
| Profile 过度定制 | 难以迁移和审计 | 改为 Permission Set 组合 |
| 忽视 Not Allowed | 出现横向越权风险 | 显式定义并在 UAT 验证 |
| 无复核机制 | 上线后权限逐步漂移 | 建立月度权限审计 |

## 7. 练习题

### 7.1 选择题

1. 下列哪项最符合最小权限原则？
   - A. 先全开，后续再收敛
   - B. 先按职责最小授权，再按需扩展
   - C. 统一用 System Admin
   - D. 只要能跑通即可
2. 权限矩阵中 `Not Allowed` 的主要价值是？
   - A. 美化文档
   - B. 降低学习成本
   - C. 明确越权边界并用于审计
   - D. 方便截图
3. Readiness Matrix 未覆盖哪个维度最危险？
   - A. 文档字体
   - B. 命名风格
   - C. Identity/认证链路
   - D. 目录结构

答案：1-B，2-C，3-C。

### 7.2 实作题

题目：为“Case 助手”场景设计一版权限模型，至少包含：

1. 4 类 Persona。
2. 8 条操作权限映射。
3. 3 条高风险动作控制。

评分参考：

1. 最小权限落实（40分）
2. 可执行性与可审计性（40分）
3. 表达清晰度（20分）

## 8. 验收标准（章节通过条件）

1. 能输出可执行 Readiness Matrix（必做项覆盖率 100%）。
2. 能输出权限矩阵并通过同伴审查（无明显越权项）。
3. 练习题得分 >= 80 分。

## 9. 参考资料

1. [../02-Build-HowTo/Setup/Agentforce-Implementation-Runbook.md](../02-Build-HowTo/Setup/Agentforce-Implementation-Runbook.md)
2. [../02-Build-HowTo/Deployment/Release-Checklist.md](../02-Build-HowTo/Deployment/Release-Checklist.md)
3. [../../../03-Roles/Admin/02-Deliverables/Profile-PermissionSet-Matrix.md](../../../03-Roles/Admin/02-Deliverables/Profile-PermissionSet-Matrix.md)
4. [../07-Troubleshooting/Common-Failures.md](../07-Troubleshooting/Common-Failures.md)

## 10. 版本敏感假设

1. 权限集名称因 org 和版本存在差异，示例均为参考名。
2. 某些功能依赖 SKU 或区域开通状态，需在目标环境确认。

## Risks / Known Issues

1. 学习者容易把“开通成功”误判为“可上线”，忽略治理与审计。
2. 权限矩阵如不与真实用户映射，会变成静态文档。
3. 多团队协作时，Owner 不明确会导致检查项长期未关闭。

## Next Steps

1. 进入第3章，学习 Prompt 分层与会话设计。
2. 将本章矩阵模板引入项目周会，作为固定审查项。
3. 建立权限漂移月度复核节奏并记录证据。
