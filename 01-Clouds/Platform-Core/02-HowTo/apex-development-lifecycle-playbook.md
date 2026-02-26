# Apex 开发与发布实装手册

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: Apex Developer Guide（Apex Development Process / Running Apex / Testing / Deploying）

## Summary

这份手册把 `Apex Developer Guide` 的分散章节整理成一条可执行流水线：  
环境选择 -> 编码与数据设计 -> 异步与集成 -> 测试 -> 部署发布。

## Decision / Changes

1. 建立 Apex 开发生命周期文档，补齐当前知识库缺少的“实装主线”。
2. 把官方章节重组为团队可直接执行的步骤与检查项。
3. 明确异步能力与部署渠道选型，降低上线前返工。

## 1. 开发环境选择

官方建议 Apex 在 `sandbox / scratch org / Developer Edition` 开发，不直接在生产组织开发。

| 环境 | 适用场景 | 注意点 |
| --- | --- | --- |
| Scratch Org | 短周期功能开发、CI 场景 | 生命周期短，需自动化初始化 |
| Sandbox | 与生产配置接近的联调与验收 | 需要定期刷新与数据治理 |
| Developer Edition | 学习与 PoC | 与企业 org 配置可能存在差异 |

## 2. 开发流水线（推荐）

1. 定义需求边界: 先判断 Flow/LWC 是否可满足，再决定是否落 Apex。
2. 设计数据与事务: 明确 DML 原子性、锁策略和批量输入模式。
3. 实现业务逻辑: class + trigger + service 分层，避免触发器中堆积逻辑。
4. 设计异步链路: Queueable/Batch/Schedule/Future 按场景选型。
5. 补全测试: 先单测再联调，保留失败分支与权限分支用例。
6. 验证部署: 先 sandbox，再生产发布。

## 3. 异步能力选型（官方主线）

| 能力 | 适用场景 | 关键特征 |
| --- | --- | --- |
| Queueable Apex | 长耗时任务、需链式任务 | 有 Job ID，支持复杂类型与链式编排 |
| Batch Apex | 大数据量批处理 | 分批执行，适合维护类任务 |
| Scheduled Apex | 定时执行 | 用于日/周周期任务触发 |
| Future Methods | 历史兼容或简单异步调用 | 官方建议优先使用 Queueable |

## 4. 数据与事务设计基线

1. 所有逻辑默认按 bulk 模式设计，不假设一次只处理一条记录。
2. 区分 DML 语句与 `Database` 类方法，按错误处理需求选用。
3. 需要并发安全时明确锁策略（如 `FOR UPDATE`），并评估死锁风险。
4. 动态查询和动态 DML 仅用于确实需要元数据动态性的场景。

## 5. 外部集成与 Callout 落地

1. 端点与鉴权优先使用 `Named Credentials` 管理。
2. HTTP/SOAP callout 必须补齐 mock 测试（`HttpCalloutMock` 或静态资源）。
3. 长耗时 callout 评估 `Continuation` 或异步链路。
4. 关注 callout limits，避免与大批量 DML 混合导致超限。

## 6. 部署渠道与发布策略

官方可用部署方式包括：

1. Change Sets
2. Salesforce Extensions for VS Code / Code Builder
3. Metadata API
4. Tooling API
5. DevOps Center

发布建议：

1. 先在 sandbox 完整跑测试与回归。
2. 生产发布前确认覆盖率与关键交易路径。
3. 对版本化行为（含 managed package）单独做兼容性验证。

## 7. 发布前最小 Gate（建议）

1. 单元测试通过，关键路径覆盖充足。
2. 权限校验策略明确（sharing / object / field）。
3. 关键触发器和异步任务做过 bulk 压力验证。
4. 集成 callout 有超时、失败、重试策略。
5. 部署回滚路径和责任人已确认。

## Risks / Known Issues

1. 只在功能层面验收、不做 bulk 与限额验证，生产风险高。
2. 异步能力误选（例如能用 Queueable 却继续堆 Future）会影响可维护性。
3. 缺少发布 gate 时，容易出现“测试通过但运行失败”的割裂。

## Next Steps

1. 在项目模板中固化 Apex 发布 gate（PR 模板 + CI 检查）。
2. 增加 Queueable/Batch 的标准骨架代码与示例测试。
3. 把部署方式细化为团队标准（例如主推 DevOps Center 或 Metadata API）。

## Sources

1. C:\workspace\salesforce-kb\99-Inbox\salesforce_apex_developer_guide.pdf（p15-20, p289-324, p605-647, p715-752）
2. https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf

