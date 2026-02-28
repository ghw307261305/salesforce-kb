# Agentforce 基础知识整理（理论 + 实践）

- 版本: v1
- 最后更新: 2026-02-28
- 适用范围: Agentforce 入门、PoC、首个生产试点
- 目标读者: Admin、实施顾问、开发、测试、业务负责人

## Summary

本文把 Agentforce 的“理论认知”和“落地实践”合并成一份基础入口，目标是先建立统一认知，再按最小可行路径完成首个可运行 Agent。  
建议按 `理论 -> 配置 -> 测试 -> 运营` 的顺序执行，避免只学概念或只堆配置。

## Decision / Changes

1. 新增基础聚合文档，避免在 `Concepts / HowTo / Training` 多目录之间来回跳转。
2. 采用统一落地骨架：`Readiness -> Setup Checklist -> Permission Matrix -> Test & Acceptance`。
3. 将“必须项”和“可选项”拆分，优先保证首个 Agent 可上线、可审计、可回滚。

## 1. 理论基础（先建立共同语言）

### 1.1 Agentforce 的最小闭环

`User Intent -> Topic Routing -> Action Execution -> Guardrails -> Grounded Response -> Audit/Eval`

### 1.2 核心组件与职责

| 组件 | 作用 | 你需要先掌握什么 |
| --- | --- | --- |
| Agent Runtime | 处理会话、触发推理和动作 | 会话生命周期与渠道接入 |
| Atlas Reasoning Engine | 任务分解与决策 | Topic 边界与指令优先级 |
| Topics + Instructions | 定义“能做什么/不能做什么” | 业务范围划分、升级条件 |
| Actions（Flow/Apex/API/Prompt） | 真正执行业务动作 | 输入输出契约、错误处理、权限控制 |
| Data Cloud / Data Library | 提供 grounding 数据 | 数据范围、更新频率、可信来源 |
| Einstein Trust Layer | 安全、脱敏、毒性检测、审计 | PII 规则、风险动作管控 |
| Testing Center / Eval Dataset | 质量验证与回归 | 测试集分层、通过门槛 |
| Observability（Dashboard/Logs） | 运行监控和持续优化 | KPI、告警、排障流程 |

### 1.3 四条基础设计原则

1. 先边界后能力: 先定义 Topic 边界，再扩展 Actions。
2. 先契约后实现: 每个 Action 先写输入/输出/错误契约，再写 Flow 或代码。
3. 先安全后自动化: 高风险动作必须先过权限与审计设计。
4. 先可测后上线: 没有固定 Eval 数据集，不进入生产。

## 2. 实践骨架（从 0 到 1）

### 2.1 Readiness Matrix（上线前必须确认）

| 维度 | 必须项 | 可选项 |
| --- | --- | --- |
| 组织能力 | 已启用 Agentforce；有 Sandbox | 多环境流水线（Dev/UAT/Prod） |
| 数据能力 | 有可用于 grounding 的 CRM/知识数据 | Data Cloud 统一画像 |
| 渠道能力 | 至少一个目标渠道（Web/Email/Console） | 多渠道一致体验 |
| 身份权限 | Agent User + Admin/Builder/Tester 角色到位 | 细粒度 RBAC 自动化 |
| 治理能力 | 审计日志、基础 KPI、故障升级机制 | 自动化告警与回放 |

### 2.2 Step-by-Step Setup Checklist

| 步骤 | 必做/可选 | 操作 | 预期结果 |
| --- | --- | --- | --- |
| S01 | 必做 | 明确单一业务场景（例如 Case 分流或 Lead Nurture） | 场景范围文档可评审 |
| S02 | 必做 | 创建 Agent，并定义 3-5 个初始 Topics | 每个 Topic 有“包含/不包含”边界 |
| S03 | 必做 | 为每个 Topic 绑定最小 Actions（优先 Flow） | 至少一条端到端链路可执行 |
| S04 | 必做 | 配置 Guardrails（禁答、升级、敏感数据规则） | 高风险请求可拒绝或转人工 |
| S05 | 必做 | 绑定数据源（Data Library/CRM）并验证检索 | 回答有依据，减少幻觉 |
| S06 | 必做 | 在 Preview + Testing Center 做批量回归 | 核心用例通过率达标 |
| S07 | 必做 | 定义上线门槛（成功率、升级率、p95 延迟） | 有明确 Go/No-Go 结论 |
| S08 | 可选 | 接入 Data Cloud 深化个性化与 RAG | 回答相关性和转化率提升 |
| S09 | 可选 | 接入外部系统（OAuth/API） | 覆盖跨系统任务 |

## 3. 权限与职责矩阵（最小可用）

| 角色 | 必要权限方向 | 核心职责 | 交付物 |
| --- | --- | --- | --- |
| Admin | 平台启用、用户与权限分配 | 环境与访问治理 | Readiness 清单 |
| Builder | Agent Builder、Topic/Action 配置 | 能力配置与调优 | Topic/Action 契约表 |
| Developer | Apex/API/集成开发权限 | 实现复杂动作与集成 | Action 实现与单测 |
| Tester | Testing Center 与数据准备权限 | 用例执行、缺陷回归 | 测试报告与通过率 |
| Business Owner | 业务对象可见与审批权限 | 目标、验收与运营决策 | KPI 与上线审批 |

## 4. 测试与验收（发布前硬门槛）

### 4.1 测试分层

| 层级 | 目标 | 最低要求 |
| --- | --- | --- |
| Topic 路由测试 | 意图是否命中正确 Topic | 关键意图命中率 >= 95% |
| Action 契约测试 | 输入输出与异常是否稳定 | P0/P1 契约错误 = 0 |
| 安全测试 | 是否触发禁答、脱敏、升级 | 高风险场景漏拦截 = 0 |
| E2E 场景测试 | 真实业务链路能否跑通 | 核心场景通过率 >= 95% |
| 回归测试 | 修改后是否引入退化 | 回归失败项有明确修复闭环 |

### 4.2 Go-Live Gate（建议基线）

1. 阻断级缺陷（Blocker/Critical）= 0。
2. 核心业务场景通过率 >= 95%。
3. 幻觉率（Hallucination）<= 2%（按你的评测口径统计）。
4. 安全策略（PII/禁答/升级）全部生效并可审计。
5. 监控面板已可观测 `成功率/升级率/错误率/p95延迟`。

## 5. 两周入门节奏（理论 + 实操并行）

| 周次 | 理论重点 | 实操重点 | 完成标志 |
| --- | --- | --- | --- |
| Week 1 | 架构、术语、Prompt/Topic/Action 基础 | 完成 S01-S05，打通 Preview | 首个可对话 Agent |
| Week 2 | 测试、治理、发布、观测 | 完成 S06-S07，并小范围试运行 | 有数据的 Go/No-Go 结论 |

## 6. 官方文档入口（2026-02-28 已核对）

1. Agentforce Guide root: https://developer.salesforce.com/docs/ai/agentforce/guide
2. Get Started: https://developer.salesforce.com/docs/ai/agentforce/guide/get-started.html
3. Actions: https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-actions.html
4. Models and Prompts: https://developer.salesforce.com/docs/ai/agentforce/guide/models-get-started.html
5. APIs and SDKs: https://developer.salesforce.com/docs/einstein/genai/guide/get-started-agents.html
6. Trust Layer: https://developer.salesforce.com/docs/einstein/genai/guide/trust.html

## Risks / Known Issues

1. Agentforce 功能与权限命名在不同版本可能变化，上线前需按目标 org 实测校准。
2. Data Library/Data Cloud 的索引延迟会影响初期问答稳定性。
3. 仅靠 Prompt 调优而缺少权限和动作契约治理，容易产生“看起来可用、实际不可控”的风险。
4. 若没有固定评测集，团队很难判断质量是在提升还是退化。

## Next Steps

1. 先选一个低风险高价值场景，按本文 S01-S07 做首个试点。
2. 将本文矩阵落到你们 org 的真实对象、权限集和测试数据上，形成组织版本。
3. 试点完成后再扩展到 Data Cloud RAG、多渠道接入和外部系统动作。

## Sources

1. [Architecture-Overview.md](./Architecture-Overview.md)
2. [Terminology.md](./Terminology.md)
3. [agentforce-developer-get-started.md](./agentforce-developer-get-started.md)
4. [Agentforce-Implementation-Runbook.md](../02-Build-HowTo/Setup/Agentforce-Implementation-Runbook.md)
5. [agentforce-for-sales-implementation-guide.md](../02-Build-HowTo/Setup/agentforce-for-sales-implementation-guide.md)
6. [agentforce-sales-implementation-guide.md](../02-Build-HowTo/Setup/agentforce-sales-implementation-guide.md)
7. [Test-Strategy.md](../02-Build-HowTo/Testing/Test-Strategy.md)
8. [Metrics-KPIs.md](../05-Observability/Metrics-KPIs.md)
9. `99-Inbox/Agentforce.extracted.txt`
10. `99-Inbox/agentforce-sales-implementation-guide.extracted.txt`
11. `99-Inbox/Agentforce-for-Sales-Development-Implementation-Guide.extracted.txt`
12. https://developer.salesforce.com/docs/ai/agentforce/guide
13. https://developer.salesforce.com/docs/ai/agentforce/guide/get-started.html
14. https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-actions.html
15. https://developer.salesforce.com/docs/ai/agentforce/guide/models-get-started.html
16. https://developer.salesforce.com/docs/einstein/genai/guide/get-started-agents.html
17. https://developer.salesforce.com/docs/einstein/genai/guide/trust.html
