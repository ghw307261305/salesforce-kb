# 第3章 Prompt 分层与会话设计

- 版本: v1
- 最后更新: 2026-02-28
- 章节定位: 设计核心
- 预计学习时长: 120-150 分钟

## Summary

本章聚焦 Agentforce 设计质量的核心：Prompt 与会话流程。目标不是“写出华丽文案”，而是建立可控、可测、可维护的行为约束体系。

完成本章后，学习者应能设计一套具备以下能力的 Prompt：

1. 指令层级清晰，冲突可判定。
2. 输出合同稳定，便于回归测试。
3. 在失败场景下可安全降级或转人工。

## Decision / Changes

1. 采用 `System -> Developer -> User -> Tools` 的固定分层模型。
2. 将 Prompt 内容拆分为 `Locked` 与 `Customizable` 区块，支持治理与演进。
3. 会话流程统一为状态机设计，避免“自由对话导致不可控”。

## 1. 学习目标

### 1.1 知识目标

1. 理解 Prompt 分层职责和优先级。
2. 理解输出合同、工具调用策略和安全拒绝策略的关系。
3. 理解会话状态机与 Slot 收集原则。

### 1.2 技能目标

1. 能写出结构化 Prompt 模板并标注锁定区块。
2. 能设计会话状态迁移图和异常分支。
3. 能定义可机器检查的响应合同。

### 1.3 交付目标

1. 一份 Prompt 模板（含版本、Owner、回归规则）。
2. 一份会话状态机定义（含 handoff 策略）。
3. 一份 Prompt 回归测试清单。

## 2. 前置知识

1. 第1章术语与运行流程。
2. 第2章权限与前置条件模型。
3. 基础 JSON 与模板变量概念。

## 3. Prompt 分层模型

### 3.1 分层职责与优先级

| 层级 | 作用 | 示例 |
| --- | --- | --- |
| System | 不可协商规则与安全底线 | 禁止编造、禁止越权 |
| Developer | 业务目标、工具策略、风格约束 | 何时调用动作、何时追问 |
| User | 当前任务与上下文 | “请帮我查询案例状态” |
| Tools | 可调用能力与输入输出契约 | Action schema |

优先级规则：`System > Developer > User > Tools`。

### 3.2 Canonical Skeleton（教材模板）

```text
[System]
Role: <agent role>
Safety rules: <must follow>
Hard constraints: <never do>

[Developer]
Business objective: <success criteria>
Decision policy: <ask vs execute vs handoff>
Tool policy: <which tool under what condition>
Response style: <format/length/language>

[User]
Request: <latest request>
Context: <record/channel/locale>

[Tools]
Available tools:
- <tool_name>: <inputs, outputs, limits>
```

### 3.3 Locked / Customizable 区块

| 区块 | 默认策略 |
| --- | --- |
| Safety rules | Locked |
| Hard constraints | Locked |
| Output contract | Locked |
| Tool-call policy | Locked（少量可配） |
| Tone and style | Customizable |
| Value proposition | Customizable |

## 4. 会话设计（Conversation Design）

### 4.1 状态机模型

| State | Purpose | Transition |
| --- | --- | --- |
| intent_detect | 识别用户意图 | -> slot_collect |
| slot_collect | 收集必需参数 | -> execute_action |
| execute_action | 调用动作 | success -> respond / fail -> recover |
| recover | 重试或替代方案 | recover fail -> handoff |
| handoff | 人工接管 | end |
| respond | 返回最终结果 | end |

### 4.2 Slot 收集规则

1. 仅收集执行必需字段。
2. 单轮最多追问 2 个字段。
3. 已知上下文不重复询问。
4. 连续两次无法补齐字段时建议 handoff。

### 4.3 Fallback 与 Handoff 策略

| Failure Type | Agent Response | Next Step |
| --- | --- | --- |
| Missing input | 指明缺失字段并追问 | 返回 slot_collect |
| Permission denied | 说明无法执行 | handoff |
| Downstream timeout | 说明暂时失败 | retry once |
| Policy violation request | 明确拒绝并给替代方案 | respond |
| No grounded answer | 明确无依据 | handoff |

## 5. 工具调用与安全策略

### 5.1 Tool-Calling Policy

1. 仅在需要读取/写入/验证事实时调用工具。
2. 工具调用前先检查必需参数。
3. 工具失败需转换为用户可理解文案。
4. 禁止“工具结果不存在时编造补齐”。

### 5.2 Output Contract（建议）

```json
{
  "summary": "string",
  "selected_action": "string",
  "result": "object",
  "next_step": "execute|clarify|handoff|refuse"
}
```

### 5.3 安全拒绝文案原则

1. 简短直接，不辩论。
2. 说明边界，不暴露内部策略细节。
3. 给出可执行替代路径（如人工渠道）。

## 6. 实操练习（必做 + 可选）

### 6.1 必做练习: 设计一版 Case Assistant Prompt

任务：

1. 使用四层模板写一版 Prompt。
2. 定义 5 个必需输出字段。
3. 设计 3 条拒绝策略（越权、敏感信息、无依据）。
4. 定义至少 6 条回归测试样例。

预期结果：Prompt 可通过结构审查与回归检查。

### 6.2 可选练习: Red Team 场景测试

任务：设计 5 条恶意输入，验证拒绝策略与脱敏策略是否生效。

预期结果：形成安全回归用例包。

## 7. 常见错误与排障

| 问题 | 现象 | 修正建议 |
| --- | --- | --- |
| 分层混乱 | 同一规则在多层冲突 | 固定层级并做冲突检查 |
| 输出合同不稳定 | 同类问题返回结构不一致 | 锁定输出字段 |
| 追问过多 | 用户体验差、会话拉长 | 限制单轮追问数量 |
| 失败无降级 | 一直重试直到超时 | 增加 retry/handoff 门槛 |
| 无回归机制 | 每次改 prompt 都引入回归 bug | 维护标准回归集 |

## 8. 练习题

### 8.1 选择题

1. Prompt 分层中，哪一层优先级最高？
   - A. User
   - B. Tools
   - C. Developer
   - D. System
2. 当工具调用返回超时，合理策略是？
   - A. 继续无限重试
   - B. 编造结果返回
   - C. 重试一次并准备 handoff
   - D. 直接结束会话
3. 下列哪项最适合作为 Locked 区块？
   - A. 行业价值点
   - B. 语气风格
   - C. 输出合同
   - D. 营销措辞

答案：1-D，2-C，3-C。

### 8.2 实作题

题目：为“退款申请助手”设计一版会话状态机，至少覆盖：

1. 2 条正常流。
2. 3 条失败流。
3. 2 条人工接管触发条件。

评分参考：

1. 状态完整性（40分）
2. 安全策略完整性（30分）
3. 可执行性（30分）

## 9. 验收标准（章节通过条件）

1. 输出 1 份结构化 Prompt，包含四层并通过格式检查。
2. 输出 1 份状态机设计，覆盖正常/异常/handoff。
3. 回归样例通过率 >= 95%，练习题得分 >= 80 分。

## 10. 参考资料

1. [../03-Prompting/Prompt-Structure-v1.md](../03-Prompting/Prompt-Structure-v1.md)
2. [../03-Prompting/Conversation-Design.md](../03-Prompting/Conversation-Design.md)
3. [../02-Build-HowTo/Testing/Test-Strategy.md](../02-Build-HowTo/Testing/Test-Strategy.md)
4. [../02-Build-HowTo/Topics/Topic-Design-Template.md](../02-Build-HowTo/Topics/Topic-Design-Template.md)
5. [../02-Build-HowTo/Actions/Action-Design-Template.md](../02-Build-HowTo/Actions/Action-Design-Template.md)

## 11. 版本敏感假设

1. Prompt Builder 的具体 UI 可能随版本调整，但分层思想保持稳定。
2. 工具可用类型和参数可能变化，需以目标 org 实际 schema 为准。

## Risks / Known Issues

1. 学习者常把 Prompt 调优等同“改文案”，忽视行为契约。
2. 若无回归测试，Prompt 迭代容易造成隐性功能回退。
3. 会话设计若无 handoff 门槛，生产中会出现“长对话低成功”。

## Next Steps

1. 进入第4章，开始 Topic 路由与边界设计。
2. 将本章 Prompt 模板用于第11章案例进行一次实战演练。
3. 建立 Prompt 版本管理与审批流（Owner + Security + Ops）。
