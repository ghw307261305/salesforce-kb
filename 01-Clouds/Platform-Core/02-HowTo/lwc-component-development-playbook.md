# LWC 组件开发实操手册

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: LWC 官方 Guide（create-components / base-components / events / data / use）

## Summary

LWC 开发可以拆成五步：

1. 组件建模（页面结构 + 状态）。
2. 事件设计（组件内、父子、跨 DOM）。
3. 数据接入（LDS / Wire / GraphQL / Apex）。
4. 运行部署（Lightning Experience / Mobile / Experience）。
5. 回归验证（功能、权限、性能）。

## Decision / Changes

1. 将多篇分散文档整理成可执行开发流程。
2. 把“数据层选型”前置，避免后续大改。
3. 统一事件与状态管理原则，降低耦合。

## 1. 创建组件（Create Components）

1. 用 `Lightning Web Components` 创建 UI 单元。
2. 优先复用 Base Components，而不是从零构建 HTML/CSS。
3. 组件 API（`@api`）只暴露稳定、最小的输入输出。

## 2. 事件模型（Events）

| 场景 | 推荐做法 |
| --- | --- |
| 子组件通知父组件 | `CustomEvent` + 明确事件名 |
| 复杂对象传递 | 在 `detail` 中传结构化对象并约束字段 |
| 跨组件广播 | 按需评估 Lightning Message Service |

事件设计原则：

1. 事件命名表达业务语义，而非 UI 行为细节。
2. 避免在事件中传递过大对象。
3. 让组件仅发布必要事件，避免“事件泛滥”。

## 3. 数据模型（Data）

官方推荐的通用策略：

1. 优先 LDS / UI API（标准对象读写场景）。
2. 复杂读取可用 GraphQL wire adapter。
3. 必要时再使用 Apex（复杂事务或特殊逻辑）。

| 方案 | 适用场景 | 代价 |
| --- | --- | --- |
| LDS / UI API | 标准对象、表单、记录视图 | 最低维护成本 |
| GraphQL wire | 聚合读取、多对象组合 | 需要 schema 与 query 设计 |
| Apex | 特殊业务逻辑/事务 | 维护与测试成本更高 |

## 4. 组件使用（Use）

组件可部署到：

1. Lightning Experience
2. Salesforce Mobile App
3. Experience Builder（site page）
4. 部分场景可嵌入外部容器（见 Lightning Out / interop 文档）

## 5. 参考文档使用顺序

1. `create-components-introduction`
2. `base-components-overview`
3. `events`
4. `data`
5. `reference-api-modules`
6. `reference`

## Risks / Known Issues

1. 数据层选型不当（过早 Apex 化）会显著增加维护成本。
2. 组件 API 与事件契约不稳定会导致上下游频繁改动。
3. 未考虑权限与字段可见性时，运行时容易出现 UI 数据空洞。

## Next Steps

1. 建立团队级 LWC 脚手架模板（组件、事件、测试骨架）。
2. 给常用业务场景定义“数据选型默认规则”。
3. 在 PR 模板中加入组件契约检查项（@api、event、data source）。

## Sources

1. https://developer.salesforce.com/docs/platform/lwc/guide/create-components-introduction.html
2. https://developer.salesforce.com/docs/platform/lwc/guide/base-components-overview.html
3. https://developer.salesforce.com/docs/platform/lwc/guide/events.html
4. https://developer.salesforce.com/docs/platform/lwc/guide/data.html
5. https://developer.salesforce.com/docs/platform/lwc/guide/use.html
6. https://developer.salesforce.com/docs/platform/lwc/guide/reference-api-modules.html
7. https://developer.salesforce.com/docs/platform/lwc/guide/reference.html
