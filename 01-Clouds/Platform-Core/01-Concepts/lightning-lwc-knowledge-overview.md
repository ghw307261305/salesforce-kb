# Lightning Base Components & LWC 知识总览

- 版本: v1
- 最后更新: 2026-02-26
- 适用范围: Salesforce Platform UI 开发（LWC / Aura 共存场景）

## Summary

这批官方文档共同给出了一条清晰路径：

1. 用 `Lightning Base Components` 作为 UI 基础。
2. 用 `LWC` 作为默认开发模型（官方建议新开发优先 LWC）。
3. 用 `Utility Modules` 与 `API Modules` 连接平台能力与数据。
4. 在 `Reference` 文档中查语法、模块与元数据细节。

## Decision / Changes

1. 把 Component Reference 与 LWC Guide 合并为统一知识地图。
2. 用“能力矩阵”表达组件、工具模块、API 模块之间的关系。
3. 明确“先简后繁”的数据接入策略，减少过度定制。

## 1. 文档族关系

| 文档入口 | 关注点 |
| --- | --- |
| Lightning Component Reference / get-started | Base Components 总入口 |
| Components | 组件分类清单（按钮、表单、表格等） |
| Utilities | `lightning/*` 工具模块 |
| API Modules | 数据与平台 API 模块 |
| LWC get-started / reference | LWC 框架入口与规范索引 |

## 2. Base Components 分类要点

官方将组件按功能分组，常见类别包括：

1. Action & Menu
2. Container
3. Visual
4. Input / Form
5. Navigation
6. Status & Notification
7. Output
8. Progress
9. Table / Tree

这些组件遵循 SLDS 设计体系，并内置可访问性与性能优化。

## 3. Utility Modules 要点

常用 utility modules（`lightning/*`）包括：

1. `flowSupport`
2. `messageService`
3. `navigation`
4. `platformResourceLoader`
5. `platformShowToastEvent`
6. `refresh`
7. `logger`

## 4. API Modules 要点

官方 API 模块覆盖三层：

1. UI API 数据层：`uiRecordApi`、`uiObjectInfoApi`、`uiListsApi`、`uiRelatedListApi`、GraphQL 等。
2. Console / Messaging 平台层：`platformWorkspaceApi`、`platformUtilityBarApi`、`conversationToolkitApi`。
3. 专项能力层：Analytics、CMS、Knowledge 等模块。

## 5. LWC 参考索引要点

`Reference` 与 `LWC API Modules` 文档是查阅型入口，重点包括：

1. `.js-meta.xml` 配置元素
2. HTML template directives
3. Decorators
4. `@salesforce` modules
5. LWC API modules 与 wire adapter 清单

## Risks / Known Issues

1. 只看组件外观而忽略 API 约束，容易造成后期重构。
2. 直接上 Apex 而不先评估 UI API / LDS，会增加维护成本。
3. 组件与模块版本（API Version）不对齐会导致行为不一致。

## Next Steps

1. 结合本总览，优先阅读 `lwc-component-development-playbook.md`。
2. 为团队沉淀一份“组件选型 + 数据选型”决策表。
3. 把 `reference` 文档加入日常 code review 检查项。

## Sources

1. https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/get-started.html
2. https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/components.html
3. https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/utilities.html
4. https://developer.salesforce.com/docs/platform/lightning-component-reference/guide/api.html
5. https://developer.salesforce.com/docs/platform/lwc/guide/get-started-introduction.html
6. https://developer.salesforce.com/docs/platform/lwc/guide/reference-api-modules.html
7. https://developer.salesforce.com/docs/platform/lwc/guide/reference.html
