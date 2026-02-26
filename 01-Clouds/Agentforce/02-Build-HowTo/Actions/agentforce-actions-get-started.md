# Agentforce Actions 入门知识整理

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-actions.html

## Summary

`Get Started with Agentforce Actions` 聚焦“如何让 agent 真正执行任务”。  
官方把动作能力分为“创建动作”和“增强动作”两层：

1. 创建动作：Apex REST、`@AuraEnabled`、Invocable、Named Query。
2. 增强动作：global copy、citations、Lightning 类型增强、增强 UI。

## Decision / Changes

1. 新建 Actions 入门文档，作为 `02-Build-HowTo/Actions` 的官方入口补充。
2. 强调“动作选型”和“增强项触发条件”两大实施关键点。
3. 与已有 `Apex-Actions.md`、`Flow-Actions.md`、`API-Actions.md` 形成分层。

## 1. Action 类型选型

| 类型 | 适用场景 | 备注 |
| --- | --- | --- |
| Apex REST Action | 需要通过 REST 封装业务逻辑 | 适合对外接口或复杂后端封装 |
| Apex `@AuraEnabled` Action | 已有 Aura/LWC 后端能力复用 | 便于复用现有控制器逻辑 |
| Invocable Action | Flow/自动化链路编排 | 低代码/声明式集成友好 |
| Named Query Action | 查询模式可复用 | 适合结构化数据读取场景 |

## 2. Action 增强能力

| 增强项 | 作用 |
| --- | --- |
| Global Copy | 改善跨动作复制与共享行为 |
| Citations | 在响应中提供引用依据 |
| Lightning Type Enhancements | 改善复杂输入/输出的类型体验 |
| Lightning Web Components Enhancements | 提升交互和可视化体验 |

## 3. 推荐实施流程

1. 先选 Action 类型（按执行需求，不按实现偏好）。
2. 定义输入、输出、错误、权限边界。
3. 在 Agent Builder 绑定到 topic 的 reasoning actions。
4. 加入 `available when` 与 guardrails，限制误调用。
5. 对外展示类场景再添加 citations 与 UI 增强。
6. 用 Testing Center + API 回归验证调用路径。

## 4. 常见设计原则

1. 动作应单一职责，避免“超大一体化 action”。
2. 高风险动作必须显式鉴权与二次确认。
3. 读取动作与写入动作分离，便于审计与回滚。
4. 给 action 命名时体现业务意图，而非技术实现细节。

## Risks / Known Issues

1. 动作边界不清晰会导致 topic 调用漂移。
2. 缺少输入约束时，LLM tool-calling 误触发概率上升。
3. UI 增强与后端契约不同步时，会出现运行时类型错误。

## Next Steps

1. 在本仓库补充“Action 选型决策树”。
2. 为每类 action 增加一个最小模板（输入/输出/错误/鉴权）。
3. 把 citations 与审计字段纳入发布检查清单。

## Sources

1. https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-actions.html
2. https://developer.salesforce.com/docs/ai/agentforce/guide/agent-script.html
