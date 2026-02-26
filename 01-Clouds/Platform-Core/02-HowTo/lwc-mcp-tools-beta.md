# LWC MCP Tools（Beta）知识整理

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: https://developer.salesforce.com/docs/platform/lwc/guide/mcp-intro.html

## Summary

LWC MCP Tools（Beta）面向开发效率，提供在 VS Code 中更快构建、调试和理解 LWC 的辅助能力。  
官方入口强调：

1. 这是 Beta 功能。
2. 依赖 VS Code 扩展与 Agentforce for Developers 扩展包。
3. 需要在项目中启用 MCP 配置并在 Copilot 环境中可见。

## Decision / Changes

1. 新建该文档，沉淀 LWC MCP 的启用与使用前提。
2. 明确 Beta 风险与团队采用建议。
3. 与 `mcp-solutions-for-developers`（Agentforce 侧）形成区分。

## 1. 启用前提（按文档归纳）

1. 使用支持的 VS Code 环境。
2. 安装 Salesforce 扩展与 Agentforce for Developers 扩展包。
3. 在项目中完成 MCP 配置，并确保工具在 Copilot 环境可见。

## 2. 使用场景

1. 更快定位 LWC 代码结构与依赖关系。
2. 在开发中辅助生成或补全样板逻辑。
3. 提升日常调试与理解速度。

## 3. 团队采用建议

1. 先在试点项目启用，验证收益与稳定性。
2. 建立“工具辅助 != 自动合入”的评审规则。
3. 保留人工代码评审与测试门槛。

## Risks / Known Issues

1. Beta 阶段可能存在行为变化与兼容性问题。
2. 工具可见性配置错误时会导致能力不可用。
3. 若缺少评审约束，可能引入质量不稳定的自动生成代码。

## Next Steps

1. 制定团队级 MCP 使用规范（适用场景、禁用场景）。
2. 把 MCP 生成代码纳入额外测试与审查。
3. 观察版本变更并定期更新此文档。

## Sources

1. https://developer.salesforce.com/docs/platform/lwc/guide/mcp-intro.html
