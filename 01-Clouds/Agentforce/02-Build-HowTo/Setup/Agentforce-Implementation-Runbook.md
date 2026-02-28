# Agentforce 实施 Runbook（通用模板）

- 版本: v1
- 最后更新: 2026-02-28
- 适用范围: Sales / Service / Data Cloud 混合场景
- 文档类型: Implementation Runbook
- 目标读者: Salesforce Admin、架构师、实施顾问、测试负责人、运维负责人

## 版本敏感假设（必须确认）

1. 本文基于仓库内 2025-05 与 2025-10 的 Agentforce 实施资料整理。
2. 权限集、菜单名称、SKU 展示可能因 org 版本或已开功能而变化。
3. 上线前必须在目标 org 执行一次“菜单与权限名核对”。

## 1. Implementation Summary

目标是以可审核方式完成 Agentforce 端到端落地，覆盖四阶段：

1. `Enablement`：开通能力与许可、建立基础依赖。
2. `Configuration`：Topic/Action/Prompt/Guardrails 配置并固化契约。
3. `Testing & Preview`：单用例、批量回归、E2E 验收。
4. `Runtime Monitoring`：上线运行、监控、告警、回滚准备。

交付标准：

1. 每个步骤都有明确“预期结果”和“证据”。
2. 必做项失败即阻断上线。
3. 关键风险有对应补救动作和负责人。

## 2. 范围分类（先做）

按以下方式确定实施边界，避免后续反复改造：

| 维度 | 选项 | 当前选择 |
| --- | --- | --- |
| 业务域 | Sales / Service / Mixed |  |
| 渠道 | Web / Email / Console / Messaging |  |
| 数据接地 | CRM Only / Data Cloud RAG / External KB |  |
| 交付模式 | OOTB First / Custom First |  |
| 上线策略 | Pilot / Phased / Big Bang |  |

## 3. 端到端实施手顺（Step-by-Step Checklist）

说明：

1. `必做` 未完成不得进入下一阶段。
2. `可选` 仅在场景需要时执行。

### 3.1 Phase A: Enablement

| 序号 | 级别 | 动作 | 预期结果 | 证据 |
| --- | --- | --- | --- | --- |
| A01 | 必做 | 确认 SKU/许可证与可用功能 | Agentforce 入口可见，目标模板可选 | Setup 截图 |
| A02 | 必做 | 校验对象模型（Lead/Contact/Case 等） | 关键对象可读写，字段映射完成 | 对象清单 |
| A03 | 必做 | 完成角色与职责分工（Admin/Builder/Tester/Approver） | 责任人明确，无空白责任域 | RACI 表 |
| A04 | 必做 | 分配基础权限集（管理员、Agent User、业务用户） | 各角色可执行预期最小操作 | 权限验证记录 |
| A05 | 必做 | 配置并验证 Agent User（含邮箱） | Agent User 显示可用且已验证 | User 详情截图 |
| A06 | 必做 | 启用邮件/活动链路（如 EAC/InBox） | 邮件同步链路可用 | 测试邮件记录 |
| A07 | 可选 | 启用 Data Cloud 并绑定 Data Space | 可用于知识检索与 grounding | Data Space 截图 |

### 3.2 Phase B: Configuration

| 序号 | 级别 | 动作 | 预期结果 | 证据 |
| --- | --- | --- | --- | --- |
| B01 | 必做 | 选择 Agent 模板并创建 Agent | Agent 创建成功，状态可编辑 | Builder 截图 |
| B02 | 必做 | 定义 Topic（入口、非范围、人工接管） | Topic 路由规则清晰且可测试 | Topic 文档 |
| B03 | 必做 | 绑定 Action（输入/输出/错误映射） | Action 能被正确调用并返回合同字段 | Action 测试记录 |
| B04 | 必做 | 配置 Prompt 分层（System/Developer/User/Tools） | 指令层级无冲突、输出合同明确 | Prompt 版本记录 |
| B05 | 必做 | 配置 Guardrails（禁止项、敏感数据、权限边界） | 禁止请求可拒绝，越权不可执行 | 安全测试记录 |
| B06 | 可选 | 上传 Data Library/知识文件 | 知识可检索并带引用策略 | 索引与检索截图 |
| B07 | 可选 | 配置 Engagement/Assignment 规则 | 自动分配与触达节奏符合业务策略 | 规则清单 |

### 3.3 Phase C: Testing & Preview

| 序号 | 级别 | 动作 | 预期结果 | 证据 |
| --- | --- | --- | --- | --- |
| C01 | 必做 | Conversation Preview 单场景测试 | 核心意图命中，调用正确 Action | Preview 记录 |
| C02 | 必做 | Testing Center 批量回归 | 核心样本通过率达到门槛 | 测试报告 |
| C03 | 必做 | 安全与越权测试（拒绝/脱敏/转人工） | 无 P0 安全缺陷 | 安全用例结果 |
| C04 | 必做 | E2E 真实流程验证（Dummy Record） | 创建、更新、回复、退订路径可闭环 | E2E 视频或日志 |
| C05 | 可选 | 压测与并发验证 | 峰值时延与错误率可接受 | 性能报告 |

### 3.4 Phase D: Runtime Monitoring

| 序号 | 级别 | 动作 | 预期结果 | 证据 |
| --- | --- | --- | --- | --- |
| D01 | 必做 | 配置监控面板（质量、ROI、生产力、错误） | 关键指标可观测 | Dashboard 截图 |
| D02 | 必做 | 配置告警阈值（错误率、延迟、失败数） | 超阈值可触发告警通知 | 告警策略 |
| D03 | 必做 | 建立事件分级与响应 SLA | P0/P1 响应时限明确 | 事件流程文档 |
| D04 | 必做 | 准备回滚方案并演练 | 触发条件明确，演练可执行 | 演练记录 |
| D05 | 可选 | 建立周回归与月度复盘机制 | 失败样本可持续回灌 | 复盘模板 |

## 4. 测试与验收标准（Go/No-Go）

上线最低门槛：

1. Blocker/High 缺陷 = `0`
2. 安全类 P0 = `0`
3. 核心业务用例通过率 `>= 95%`
4. Hallucination Rate `<= 2%`
5. p95 响应时间 `<= 8s`

## 5. Troubleshooting Matrix（常见故障与修复）

| 故障现象 | 根因定位 | 修复动作 | 责任角色 |
| --- | --- | --- | --- |
| Agent 无法执行动作 | Agent 未激活或权限不足 | 检查激活状态与权限集分配 | Admin |
| Action 调用失败 | 输入校验缺失或契约不一致 | 对齐输入 schema 与错误映射 | Builder/Dev |
| 无法读取邮件活动 | EAC/InBox 未正确绑定 | 校验邮箱绑定、同步开关、共享设置 | Admin |
| 回复不稳定或答非所问 | Prompt 合同不完整或知识未索引 | 收紧指令、补充负例、重建索引 | Prompt Owner |
| 测试通过但生产失败 | 环境配置漂移 | 对比 Sandbox/Prod 差异并回补 | Release Owner |

## 6. 风险与下一步动作

主要风险：

1. 不同 org 的权限命名差异导致授权偏差。
2. 数据接地准备不足导致问答质量波动。
3. 仅做功能测试但忽略越权与拒绝策略。

下一步动作：

1. 使用权限矩阵模板完成 org 级最小权限实配。
2. 使用上线检查表完成 go-live 审批。
3. 将生产故障样本每周回灌到 Eval Dataset。

## 7. 相关文档

1. [agentforce-for-sales-implementation-guide.md](./agentforce-for-sales-implementation-guide.md)
2. [agentforce-sales-implementation-guide.md](./agentforce-sales-implementation-guide.md)
3. [Prompt-Structure-v1.md](../../03-Prompting/Prompt-Structure-v1.md)
4. [Test-Strategy.md](../Testing/Test-Strategy.md)
5. [Release-Checklist.md](../Deployment/Release-Checklist.md)
