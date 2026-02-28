# Agentforce Official Docs

- Last verified: 2026-02-28
- Scope: Salesforce Developer Docs (Agentforce)

## Summary

这是 Agentforce 官方开发文档导航页，统一收录可直接用于开发与实施的入口链接。  
优先阅读顺序建议为：`Get Started -> APIs/SDKs -> Actions -> Models/Prompts -> Trust Layer`。

## Decision / Changes

1. 新增官方入口总览，避免在多个站点（Developer / Help / Blog）间反复检索。
2. 标注“开发主入口”与“治理必读入口”，便于团队统一学习路径。
3. 将版本敏感的能力（模型、SDK、测试能力）集中到同一页维护。

## Core Entry Links

1. Get Started with Agentforce and AI Agents  
   https://developer.salesforce.com/docs/ai/agentforce/guide/get-started.html
2. Agentforce APIs and SDKs  
   https://developer.salesforce.com/docs/einstein/genai/guide/get-started-agents.html
3. Build and Enhance Agentforce Actions  
   https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-actions.html
4. Get Started with Models and Prompts  
   https://developer.salesforce.com/docs/ai/agentforce/guide/models-get-started.html
5. Trust Layer  
   https://developer.salesforce.com/docs/einstein/genai/guide/trust.html

## Recommended Deep Links

1. Agent Script  
   https://developer.salesforce.com/docs/ai/agentforce/guide/agent-script.html
2. Agentforce DX  
   https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx.html
3. Supported Models  
   https://developer.salesforce.com/docs/ai/agentforce/guide/supported-models.html
4. Models API (REST)  
   https://developer.salesforce.com/docs/ai/agentforce/guide/access-models-api-with-rest.html

## Quick Use Guide

1. 做首个 Agent: 从 `get-started` + `get-started-actions` 开始。
2. 做系统集成: 增加 `get-started-agents` 与 `agent-dx`。
3. 做模型治理: 增加 `models-get-started` + `supported-models` + `trust`。

## Risks / Known Issues

1. Agentforce 文档存在跨路径（`/ai/agentforce/guide` 与 `/einstein/genai/guide`）链接，维护时需同时检查。
2. 页面内容更新频率较高，权限名和功能入口可能随版本变化。
3. 新特性有时先在 Help/Release Notes 发布，再同步到 Developer Guide。

## Next Steps

1. 每月一次核对本页链接可用性和页面标题变更。
2. 配套更新 [Release-Notes.md](./Release-Notes.md) 做版本差异记录。
3. 将变更影响同步到 Agentforce 基础文档与实施 Runbook。
