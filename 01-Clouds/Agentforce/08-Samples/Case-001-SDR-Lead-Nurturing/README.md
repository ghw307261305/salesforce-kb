# Case-001: SDR Lead Nurturing Agent（可交付案例包）

- 版本: v1
- 最后更新: 2026-02-28
- 目标场景: Sales Development（Email 线索培育）
- 适用渠道: Email（可扩展到 Web 入站联动）

## 案例目标

通过 Agentforce 实现以下闭环：

1. 自动首封外呼与跟进（Nudge）。
2. 对潜客回复进行意图分流（产品问答/约会请求/离题/退订）。
3. 调用知识库生成可引用回复并保留人工接管出口。

## 交付件

1. [01-Topic-Design.md](./01-Topic-Design.md)
2. [02-Action-Contracts.md](./02-Action-Contracts.md)
3. [03-Prompt-Template.md](./03-Prompt-Template.md)
4. [04-Test-Cases-and-Dataset.md](./04-Test-Cases-and-Dataset.md)
5. [05-GoLive-Checklist.md](./05-GoLive-Checklist.md)

## 版本敏感假设

1. 菜单、权限集、SKU 名称按目标 org 实际显示为准。
2. 若使用 Data Cloud grounding，需先完成 Data Space 与索引准备。
3. 上线前需完成一次 Sandbox 与生产配置差异审计。
