# Agent Script 知识整理（Developer Guide）

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: https://developer.salesforce.com/docs/ai/agentforce/guide/agent-script.html

## Summary

Agent Script 是 Agentforce Builder 的脚本语言，用来把“LLM 的自然语言推理能力”与“确定性业务逻辑”组合在同一工作流中。  
核心价值是：在需要稳定可控的地方使用程序化逻辑，在需要灵活表达的地方保留模型推理。

## Decision / Changes

1. 新建本知识文档，作为 Agent Script 的中文结构化入口。
2. 重点沉淀“语法规则 + 执行流 + 常见模式 + 工程化管理”四块内容。
3. 增加对 Actions/Tools/Utils 的边界说明，避免实施时混用。

## 1. Agent Script 是什么

根据官方说明，Agent Script 具备以下特征：

1. 是 Salesforce 为 Agentforce 设计的专用语言。
2. 保存版本时会编译为推理引擎使用的底层元数据。
3. 同时支持：
   - 逻辑指令（确定性执行）
   - Prompt 指令（交给 LLM 推理）
4. 目标是构建“可预测、上下文感知”的 agent 流程，而不完全依赖 LLM 即时判断。

## 2. 核心语法心智模型

### 2.1 两类指令

1. `->`：逻辑指令（deterministic），用于分支、变量、动作调用、路由。
2. `|`：Prompt 指令（natural language），用于告诉 LLM 如何表达和回答。

### 2.2 资源引用

1. `@actions.<name>`：动作引用。
2. `@topic.<name>`：topic 引用。
3. `@variables.<name>`：变量引用。
4. `@outputs.<name>`：动作输出引用。
5. Prompt 中插值：`{!@variables.<name>}`。

### 2.3 条件与运算

1. 支持 `if` / `else`（当前不支持 `else if`）。
2. 支持比较、逻辑、算术运算（如 `==`、`!=`、`>`, `and`, `or`, `+`, `-`）。
3. 支持空值判断：`is None` / `is not None`。

## 3. Blocks 结构

Agent Script 由 blocks 组成，常见块如下：

1. `system`：全局系统消息与系统级指令（如 welcome/error）。
2. `config`：agent 配置（label、developer_name、默认用户等）。
3. `variables`：全局变量定义（跨 topic 可访问）。
4. `language`：语言支持配置。
5. `connection`：连接配置（如 Enhanced Chat，escalate 依赖）。
6. `topic`：具体任务块（描述、actions、reasoning 等）。
7. `start_agent`：每次用户输入的入口（Topic Selector），负责分类与路由。

## 4. 执行流（Flow of Control）

### 4.1 入口与顺序

1. 所有请求（含首条）都从 `start_agent` 开始。
2. topic 内 `reasoning.instructions` 按从上到下顺序解析。
3. Agentforce 先解析出最终 prompt，再交给 LLM 推理。

### 4.2 迁移规则

1. `@utils.transition to` 是单向跳转，执行后不会回到原 topic。
2. 发生 transition 时，原 topic 已解析 prompt 会被丢弃，最终 prompt 仅来自新 topic。
3. 直接把 `@topic.<name>` 作为 tool 引用时，语义更像“调用后返回”；与 transition 的单向语义不同。

## 5. Actions、Tools、Utils 的边界

### 5.1 Actions

1. Action 是可执行任务（target 可指向 Flow、Apex、Prompt Template）。
2. 可在逻辑区 `run` 确定性调用（每次都执行）。
3. 也可暴露给 LLM 作为 tool（由 LLM 选择是否调用）。

### 5.2 Tools（Reasoning Actions）

1. 定义在 `topic.reasoning.actions`，由 LLM 按上下文选择调用。
2. 可包裹 action 或 `@utils` 功能。
3. 可用 `available when` 做可见性控制，增强确定性。

### 5.3 Utils

常用工具能力：

1. `@utils.transition to`：单向跳转 topic。
2. `@utils.setVariables`：让 LLM 按描述填变量（支持 `...` slot-fill）。
3. `@utils.escalate`：升级到人工（需 Omni-Channel messaging connection）。

## 6. Variables 设计

变量用于跨轮次、跨 topic 的确定性状态管理，避免仅依赖模型上下文记忆。

1. 在 `variables` 块统一定义。
2. 所有 topic 可访问。
3. 常见类型包含 regular variable 与 linked variable（linked 通常绑定外部输出）。

## 7. 常见模式（Patterns）

官方推荐的高频模式包括：

1. Action Chaining & Sequencing
2. Conditionals
3. Fetch Data before reasoning
4. Filtering with `available when`
5. Required Topic Workflow
6. Resource References（显式 @ 引用）
7. System Overrides（topic 级覆盖）
8. Topic Selector（start_agent 路由）
9. Transitions
10. Variables

## 8. 实施建议（基于官方模式）

1. 先用最少指令跑通，再增量加规则并做回归测试。
2. topic/action/variable 命名必须清晰且互相区分，避免语义重叠。
3. 把业务刚性规则写成逻辑（`->`），把话术与解释留给 prompt（`|`）。
4. 重要资源在 prompt 中显式 `@` 引用，提高模型调用一致性。
5. 发布后持续复测，避免上线后因脚本变更产生路由漂移。

## 9. 与仓库结构的映射

| Agent Script 概念 | 建议落点 |
| --- | --- |
| 语言与语法 | `03-Prompting` |
| Topic 路由策略 | `02-Build-HowTo/Topics` |
| Action 定义与调用 | `02-Build-HowTo/Actions` |
| 升级/人工接管 | `06-Patterns/Human-in-the-Loop.md` |
| 测试回归 | `02-Build-HowTo/Testing` |

## Risks / Known Issues

1. 过度依赖 prompt、缺少逻辑约束时，行为稳定性会下降。
2. 过度硬编码逻辑会降低对真实对话变化的适应性。
3. `transition` 与 `@topic` 引用语义不同，混淆后容易导致流程偏差。
4. 复杂脚本若缺少命名规范与注释，后续维护成本会快速上升。

## Next Steps

1. 基于该文档补一份“最小可运行 Agent Script 模板”（含 start_agent、2 个 topic、1 个 transition）。
2. 在测试目录补一份 Agent Script 回归清单（路由、变量、动作调用、升级路径）。
3. 按你当前业务场景设计 3 个强确定性节点（如鉴权、下单、退款）优先脚本化。

## Sources

1. https://developer.salesforce.com/docs/ai/agentforce/guide/agent-script.html
2. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-lang.html
3. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-blocks.html
4. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-flow.html
5. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-patterns.html
6. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-reference.html
7. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-actions.html
8. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-tools.html
9. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-utils.html
10. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-instructions.html
11. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-variables.html
12. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-expressions.html
13. https://developer.salesforce.com/docs/ai/agentforce/guide/ascript-ref-operators.html
