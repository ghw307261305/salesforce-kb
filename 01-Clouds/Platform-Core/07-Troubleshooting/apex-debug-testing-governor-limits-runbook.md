# Apex 测试、调试与 Governor Limits 排障手册

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: Apex Developer Guide（Governor Limits / Debugging / Testing / Deploying）

## Summary

Apex 生产问题通常集中在三类：  
1) 限额超标，2) 测试覆盖不足，3) 调试证据不足。  
本手册把官方章节整理成一套排障路径与发布前质量门槛。

## Decision / Changes

1. 新增 Apex 排障手册，承接开发文档到运维场景。
2. 将 Debug、Testing、Governor Limits 合并为统一 runbook。
3. 增加常见故障模式表，缩短定位时间。

## 1. 调试链路（Debugging Apex）

1. 先定位事务入口（Trigger / Queueable / Batch / API）。
2. 打开 Debug Log，按执行顺序查看 DML、SOQL、异常和限额消耗。
3. 对未捕获异常补充上下文日志（对象、记录集规模、关键参数）。
4. 必要时拆分复现场景，使用匿名块或最小化测试复现。

## 2. 测试策略（Testing Apex）

官方测试章节的关键落实点：

1. 测试数据默认隔离于组织真实数据。
2. `@TestSetup` 用于共享初始化，减少重复建数。
3. 使用 `Test.startTest()` / `Test.stopTest()` 隔离并触发异步执行。
4. `System.runAs()` 用于权限与共享差异测试。
5. Callout 场景使用 mock（例如 `HttpCalloutMock`）。

## 3. Governor Limits 排障步骤

1. 确认超限类型: SOQL 次数、DML 次数、CPU 时间、堆内存等。
2. 回看事务规模: 是否单次处理记录过多、是否循环内查询/写入。
3. 优先做 bulk 化改造: 集合查询、批量 DML、去除循环内 DML/SOQL。
4. 需要解耦时切异步: Queueable 或 Batch 承接重任务。
5. 增加监控: 启用限额预警邮件并保留关键日志样本。

## 4. 常见故障模式

| 故障现象 | 常见根因 | 优先处理动作 |
| --- | --- | --- |
| `Too many SOQL queries` | 循环内查询或触发链重复查询 | 提前聚合查询，复用映射缓存 |
| `Too many DML statements` | 循环内逐条写入 | 改为列表收集后批量 DML |
| CPU 超时 | 复杂分支 + 大量记录 + 重复计算 | 减少重复计算，拆异步流程 |
| 测试不稳定 | 测试数据依赖真实组织数据 | 改为测试内构造数据，移除 SeeAllData 依赖 |
| callout 测试失败 | 未 mock 外部服务 | 引入 mock 实现并覆盖失败分支 |

## 5. 发布前质量门槛（建议）

1. 单元测试通过，关键路径覆盖有明确断言。
2. 高风险 trigger 和异步链路通过 bulk 数据验证。
3. 关键异常路径有日志标识可追踪。
4. 外部集成具备 callout mock 与失败处理分支。
5. 部署前后都执行回归套件并保留结果归档。

## Risks / Known Issues

1. 只关注覆盖率数值、不验证业务断言，会导致“高覆盖低质量”。
2. 无标准日志字段时，跨团队排障成本高。
3. 限额问题在低数据量环境不明显，容易在生产才暴露。

## Next Steps

1. 追加“限额压测模板”和“异常日志字段规范”。
2. 建立触发器与异步任务的固定回归数据集。
3. 将本 runbook 接入发布准入流程（CI + 发布审批）。

## Sources

1. C:\workspace\salesforce-kb\99-Inbox\salesforce_apex_developer_guide.pdf（p348-360, p673-752）
2. https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf

