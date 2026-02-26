# Agentforce APIs and SDKs 知识整理

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-agents.html

## Summary

`Get Started with Agentforce APIs and SDKs` 是 Agentforce 的“开发接入总览页”。  
它把能力分成三类：

1. `Build Agents`：用 Agent Script、DX、Python SDK 构建和管理 agent。
2. `Test Agents`：用 Testing Center / Agentforce DX / Testing API 做测试与回归。
3. `Use Agents`：用 Agent API、Mobile SDK、Enhanced Chat v2、In-App Chat SDK 接入业务端。

## Decision / Changes

1. 新建此文档，作为 Agentforce 开发接入能力总表。
2. 重点沉淀“能力矩阵 + 场景选型 + 最小落地路径”。
3. 与 Actions、Models、DX、MCP 文档形成互补关系。

## 1. 能力矩阵（按官方入口归纳）

| 能力 | 构建 | 测试 | 使用 | 典型用途 |
| --- | --- | --- | --- | --- |
| Agent Script | Yes | - | - | 以脚本定义 topic、变量、条件和流程 |
| Agentforce DX | Yes | Yes | Yes（preview） | CLI/VS Code 工程化开发 |
| Agentforce Python SDK | Yes | - | - | 程序化创建与管理 agent |
| Testing API | - | Yes | - | 程序化测试自动化 |
| Agent API | - | - | Yes | REST 会话接入 |
| Agentforce Mobile SDK | - | - | Yes | 原生移动端接入 |
| Enhanced Chat v2 | - | - | Yes | Web 对客聊天体验 |
| Enhanced In-App Chat SDK | - | - | Yes | 移动端嵌入式聊天 |

## 2. 测试通道对比

| 通道 | 入口 | 测试定义格式 | 自定义评估支持 |
| --- | --- | --- | --- |
| Testing Center | UI | CSV | No |
| Agentforce DX | CLI | YAML | Yes |
| Testing API | API（Metadata + Connect） | XML | Yes |

## 3. 场景选型建议

### 3.1 快速接入现有系统

1. 优先 `Agent API`（REST 会话）。
2. 若需端侧体验，再选 `Enhanced Chat v2` 或 `Mobile SDK`。

### 3.2 工程化交付

1. `Agentforce DX` 负责版本化与发布。
2. `Testing API` 或 DX 测试做自动化回归。
3. UI 测试可由 Testing Center 做业务验收补充。

### 3.3 代码驱动管理

1. 以 `Python SDK` 管理 agent 生命周期。
2. 结合 DX 做元数据与环境同步。

## 4. 最小落地路径（建议）

1. 用 Agent Script 完成最小可用流程。
2. 用 DX 发布并做 CLI preview。
3. 用 Testing Center 跑首轮业务样例。
4. 再引入 Testing API 进入 CI 回归。
5. 最后按渠道选择 Agent API 或 Chat/Mobile SDK 上线。

## Risks / Known Issues

1. 只做 UI 测试而不做 API/CLI 回归，后续变更风险高。
2. 仅依赖 Agent API 而缺少渠道层会话策略，用户体验可能割裂。
3. 若 DX 与 org 配置不同步，容易出现“本地可用、线上异常”。

## Next Steps

1. 在仓库内补一份“Agent API 会话生命周期”专项文档。
2. 以你们 CI 工具补齐 DX/YAML 测试示例。
3. 结合渠道策略确定 Web 与 Mobile 的接入边界。

## Sources

1. https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-agents.html
2. https://developer.salesforce.com/docs/ai/agentforce/guide/agent-script.html
3. https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx.html
