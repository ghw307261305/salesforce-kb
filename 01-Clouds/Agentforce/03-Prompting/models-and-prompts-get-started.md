# Models and Prompts 入门知识整理

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: https://developer.salesforce.com/docs/ai/agentforce/guide/models-get-started.html

## Summary

`Get Started with Models and Prompts` 的重点是：  
在 Agentforce 中把“提示模板、模型管理、模型接入和调用 API”串成一条完整链路。

官方入口主要覆盖：

1. Prompt Builder（提示模板构建）。
2. Einstein Studio（模型配置与测试）。
3. BYOLLM（接入自有或外部模型）。
4. LLM Open Connector（连接第三方模型提供方）。
5. Models API（Apex/REST 调用文本、会话、向量能力）。

## Decision / Changes

1. 新建该文档，作为 `03-Prompting` 下的模型与提示入口。
2. 用“能力矩阵 + 选型路径”降低模型层决策成本。
3. 明确与 Agent Script、Actions、Trust Layer 的衔接关系。

## 1. 能力矩阵

| 能力 | 作用 | 典型使用者 |
| --- | --- | --- |
| Prompt Builder | 设计、测试、管理提示模板 | 业务配置人员 + 提示工程师 |
| Einstein Studio | 选择/管理模型并测试 | AI 平台管理员 |
| BYOLLM | 引入组织已有模型资产 | 企业架构与平台团队 |
| LLM Open Connector | 标准化连接外部模型提供方 | 集成工程团队 |
| Models API | 代码侧调用模型能力 | 开发工程师 |

## 2. 选型路径建议

### 2.1 先快后稳（推荐）

1. 先用 Prompt Builder 构建可用模板。
2. 再在 Einstein Studio 调整模型和参数。
3. 最后按需求决定是否引入 BYOLLM / Open Connector。

### 2.2 已有模型资产（企业场景）

1. 先评估 BYOLLM 兼容性与治理要求。
2. 用 Open Connector 统一连接策略。
3. 通过 Models API 交付到业务应用。

## 3. 与 Agent 能力的衔接

1. Prompt 决定表达和推理风格。
2. Actions 决定“能做什么”。
3. Agent Script 决定“何时做、怎么做”。
4. Trust Layer 决定“是否安全可用”。

## 4. 实施注意事项

1. 模板与模型版本需绑定发布版本，避免灰度期漂移。
2. 外部模型接入必须先过数据安全与合规评估。
3. 高风险场景保留人工复核，不应完全自动化。

## Risks / Known Issues

1. 只调 prompt 不调模型策略时，性能与成本可能不可控。
2. 多模型并行但缺少统一评测，会导致线上输出不稳定。
3. BYOLLM 接入若缺少治理策略，可能带来数据和审计风险。

## Next Steps

1. 在仓库内补“Prompt + Model 联合评测模板”。
2. 为关键场景定义模型回退策略（降级模型或人工接管）。
3. 把模型变更加入发布审批与审计链路。

## Sources

1. https://developer.salesforce.com/docs/ai/agentforce/guide/models-get-started.html
2. https://developer.salesforce.com/docs/ai/agentforce/guide/agent-script.html
