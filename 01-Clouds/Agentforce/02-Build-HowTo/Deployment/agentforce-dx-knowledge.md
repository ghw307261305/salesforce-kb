# Agentforce DX 知识整理

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx.html

## Summary

Agentforce DX 是面向开发者的工程化入口，目标是把 Agent 的低代码配置与本地 pro-code 开发打通。  
官方强调的核心价值是：

1. 允许在 Agent Builder 和本地代码之间迭代。
2. 在版本控制系统中管理 Agent 资源。
3. 通过 CLI 做 preview、测试与发布治理。

## Decision / Changes

1. 新建 DX 专项文档，作为 Agent 工程化交付的基础参考。
2. 将官方迭代流程压缩为可执行步骤（低代码 <-> 本地开发闭环）。
3. 补充团队协作时的“单一事实来源（source of truth）”建议。

## 1. DX 适用场景

1. 需要多人协作开发 Agent。
2. 需要把 Agent 版本纳入 Git 管理。
3. 需要可回放、可审计的发布流程。
4. 需要把测试纳入 CI/CD。

## 2. 官方迭代流程（归纳）

1. 在 Builder 中创建 Agent。
2. 同步并拉取到本地项目。
3. 用 CLI preview 本地改动。
4. 本地测试并调试。
5. 通过 Agent Studio Playground 验证行为。
6. 提交到 VCS。
7. 在 org 中拉取并同步最新版本。
8. 再次预览并验证。
9. 在 Builder 中最终确认后发布。

## 3. 团队实践建议

### 3.1 分支策略

1. `main` 仅保留已验证可发布 Agent 配置。
2. 每个主题能力使用 feature 分支迭代。
3. 合并前必须有 preview 证据与测试记录。

### 3.2 变更治理

1. Builder 直改后必须回拉本地，避免配置漂移。
2. 本地改动推送前先做 CLI preview 与最小回归。
3. 对关键资源（topics/actions/prompts）执行双人评审。

### 3.3 发布门槛

1. 能力回归通过（核心 Topic 路径）。
2. 安全策略通过（鉴权、脱敏、拒答/升级）。
3. 关键指标可观测（日志、错误率、升级率）。

## Risks / Known Issues

1. 只在 Builder 变更、不同步本地，会造成版本不可追踪。
2. 缺少 preview 与测试直接发布，容易引入行为回归。
3. 多环境同步不规范会导致“开发环境正常，生产异常”。

## Next Steps

1. 在仓库内补 DX 发布模板（分支、评审、发布清单）。
2. 把 Agent 测试纳入 CI（至少跑关键路径回归）。
3. 建立“Builder 变更必须回拉”团队约束。

## Sources

1. https://developer.salesforce.com/docs/ai/agentforce/guide/agent-dx.html
2. https://developer.salesforce.com/docs/ai/agentforce/guide/get-started-agents.html
