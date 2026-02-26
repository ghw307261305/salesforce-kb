# Apex Developer Guide 知识地图（Spring '26）

- 版本: v1
- 最后更新: 2026-02-26
- 适用范围: Salesforce Platform Core（Apex 开发、运行与治理）

## Summary

`Apex Developer Guide` 是 Apex 体系的主文档，覆盖从语言基础到数据访问、运行模型、安全、异步、集成、测试与部署的完整链路。  
对知识库建设而言，这份文档最有价值的不是单点语法，而是“开发生命周期 + 运行约束 + 质量门槛”的统一模型。

## Decision / Changes

1. 基于整本 Guide 建立一份 Apex 知识地图，作为 Platform-Core 的 Apex 总入口。
2. 将内容按“概念、实装、安全、排障”拆解到可维护文档，而不是单一超长文件。
3. 以章节页码标注能力域，确保后续追溯到官方原文时可快速定位。

## 1. 指南覆盖范围（按能力域）

| 能力域 | 官方章节（页码） | 重点输出 |
| --- | --- | --- |
| 入门与开发流程 | Getting Started with Apex（p6-26） | Apex 定位、开发 org 选择、测试与部署主线 |
| 语言与语法基础 | Writing Apex（p27-134） | 类型系统、集合、类/接口、注解、代码版本 |
| 数据访问与事务 | Working with Data in Apex（p135-214） | sObject、DML、SOQL/SOSL、Dynamic Apex、锁与事务 |
| 安全与共享 | Apex Security and Sharing（p215-246） | sharing、对象字段权限、`stripInaccessible`、`WITH SECURITY_ENFORCED` |
| 运行时能力 | Running Apex（p266-347） | Trigger、Async Apex、SOAP/REST 暴露、Email Service |
| 治理约束 | Apex Transactions and Governor Limits（p348-360） | 事务边界、执行限额、限额内设计方法 |
| 外部集成 | Integration and Apex Utilities（p605-647） | Named Credentials、HTTP/SOAP callout、mock 测试、continuation |
| 质量与发布 | Debugging, Testing, and Deploying Apex（p673-752） | Debug 日志、单测框架、覆盖率、部署通道 |
| 包与版本治理 | Apex in Managed Packages（p752-770） | 托管包版本化、全局 API 演进、兼容性策略 |

## 2. Apex 能力模型（知识库组织视角）

1. 语言层: 类型、语句、类、注解、版本。
2. 数据层: DML/SOQL/SOSL、锁、批量模式、动态元数据访问。
3. 运行层: Trigger、Queueable/Batch/Schedule/Future、Web Service 暴露。
4. 安全层: sharing、对象/字段权限、查询安全、输入输出安全。
5. 运维层: 调试、测试、部署、限额治理、版本演进。

## 3. 推荐学习路径（团队落地顺序）

1. 先读 `Getting Started + Writing Apex`，统一语法和代码边界。
2. 再读 `Working with Data + Security and Sharing`，建立数据与权限底座。
3. 然后进入 `Running Apex + Governor Limits`，完成可运行的业务逻辑设计。
4. 最后固化 `Debugging/Testing/Deploying + Managed Packages`，确保可发布和可演进。

## 4. 与 Platform-Core 现有文档关系

1. `apex-introduction-knowledge.md` 负责入门定义与边界。
2. 本文负责全书知识导航与章节映射。
3. 其余 Apex 实装文档负责具体执行规范与排障路径。

## Risks / Known Issues

1. 仅做语法学习、忽略 Governor Limits 与安全章节，容易在生产环境失稳。
2. 不做章节映射时，团队在排障阶段难以快速回溯官方依据。
3. 若不区分 LWC 与 Apex 责任，常出现“前端问题后端化”的过度设计。

## Next Steps

1. 对高频主题追加专题页: Trigger Framework、Queueable 编排、Callout 架构。
2. 增加“章节 -> 团队编码规范”映射表，形成开发检查清单。
3. 将测试与部署章节转为可执行 release checklist，纳入发布流程。

## Sources

1. C:\workspace\salesforce-kb\99-Inbox\salesforce_apex_developer_guide.pdf
2. https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf

