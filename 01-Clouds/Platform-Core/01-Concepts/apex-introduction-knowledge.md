# Apex 入门知识整理（Introducing Apex）

- 版本: v1
- 最后更新: 2026-02-26
- 对应入口: https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_forcecom_intro.htm

## Summary

Apex 是 Salesforce 平台上的强类型、面向对象语言，用于在平台服务端执行业务逻辑与事务控制。  
它的定位不是通用编程语言，而是“多租户云平台上的业务逻辑语言”。

官方对 Apex 的核心定位可以归纳为：

1. 与平台深度集成（DML、SOQL/SOSL、事务、锁、触发器）。
2. 在 Lightning Platform 上托管运行（编译后以元数据形式保存并解释执行）。
3. 受多租户治理限制（Governor Limits）约束。
4. 天生要求可测试（单元测试与覆盖率是交付基础）。

## Decision / Changes

1. 新建 Apex 入门知识文档，作为 Platform-Core 中 Apex 主题入口。
2. 按“是什么 -> 什么时候用 -> 如何运行 -> 开发流程”四段结构整理。
3. 明确 Apex 与 LWC/Flow/SOAP API 的职责边界，避免误用。

## 1. 什么是 Apex

官方定义要点：

1. Apex 是强类型、面向对象语言，语法接近 Java。
2. 运行在 Salesforce 服务器端，可与 API 调用协同。
3. 可挂载到多数系统事件（例如记录保存触发、页面请求、Web Service 请求）。

## 2. Apex 的语言特性（入门级）

根据 `Introducing Apex` 章节，Apex 具备：

1. `Integrated`：内置 DML、SOQL/SOSL、锁、异常处理等平台能力。
2. `Easy to use`：沿用 Java 常见语法与控制流。
3. `Data focused`：面向平台数据访问与事务编排。
4. `Rigorous`：强类型与 schema 依赖校验，编译阶段尽早失败。
5. `Hosted`：由 Lightning Platform 统一解释执行。
6. `Multitenant aware`：受 governor limits 保护共享资源。
7. `Easy to test`：内置测试支持，发布前需通过测试。
8. `Versioned`：支持按 API 版本保存行为。

## 3. 什么时候使用 Apex

官方给出的典型场景：

1. 创建 Web Services 或 Email Services。
2. 实现跨对象复杂校验。
3. 实现 Flow 难以表达的复杂业务流程。
4. 实现覆盖“整个事务”的自定义逻辑。
5. 把逻辑挂在保存等操作上，确保来自 UI / API 的调用都触发一致规则。

## 4. Apex 如何运行

运行模型（官方原理）：

1. 开发者保存 Apex 后，平台先编译为可解释的抽象指令并存储为元数据。
2. 终端用户或系统事件触发时，平台加载元数据并执行。
3. 所有 Apex 在平台上按事务执行，不在客户端执行。

## 5. Apex 的边界与限制

`Introducing Apex` 中明确了以下边界：

1. Apex 不是通用编程语言。
2. 不能用于通用 UI 渲染（除错误消息等有限场景）。
3. 不能创建临时文件。
4. 不能生成线程。
5. 受 governor limits 限制，必须按 bulk 模式编写（不能假设一次只处理一条记录）。

## 6. Apex 开发流程（官方主线）

官方开发流程可归纳为：

1. 准备开发 org（Developer Edition / Scratch Org / Sandbox）。
2. 编写 Apex 代码。
3. 编写并执行单元测试（推荐 TDD）。
4. 在沙箱验证。
5. 部署到生产组织。

## 7. 与其他平台能力的关系

| 能力 | 适合职责 |
| --- | --- |
| Apex | 服务端业务逻辑、事务与复杂规则 |
| LWC | 前端交互与 UI 组件 |
| Flow | 声明式流程编排（低代码） |
| SOAP API | 外部系统标准 API 调用（轻事务需求） |

## Risks / Known Issues

1. 忽略 bulk 设计会快速触发 governor limits。
2. 仅在 UI 测试逻辑、忽略 API 路径，会造成规则不一致。
3. 过度用 Apex 替代可声明式能力，会提高长期维护成本。

## Next Steps

1. 追加一份 `Apex Development Process` 深化文档（环境、测试、部署细则）。
2. 在仓库补“Governor Limits 设计清单”和“Bulk 模式模板”。
3. 与 LWC 文档联动，补一份“何时选 Apex，何时选 LDS/UI API”决策表。

## Sources

1. https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_forcecom_intro.htm
2. https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf （Apex Developer Guide，Spring ’26，Introducing Apex）
