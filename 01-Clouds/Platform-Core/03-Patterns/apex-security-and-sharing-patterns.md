# Apex 安全与共享实现模式

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: Apex Developer Guide（Apex Security and Sharing）

## Summary

Apex 默认常在 system context 运行，因此“业务逻辑正确”不等于“权限正确”。  
这份文档把官方安全章节收敛为可落地的权限控制与安全编码模式。

## Decision / Changes

1. 新增 Apex 安全与共享模式文档，补齐 Platform-Core 的后端安全知识层。
2. 将 sharing、对象字段权限、查询安全合并成统一实现清单。
3. 形成代码评审可执行规则，降低越权与注入风险。

## 1. 执行上下文与 sharing 关键点

1. Apex 运行常不自动继承当前用户对象/字段权限。
2. 类级别需明确 `with sharing` / `without sharing` / `inherited sharing` 策略。
3. sharing 只解决记录级访问，不等同对象权限与字段权限。

## 2. 对象与字段权限控制模式

| 场景 | 推荐机制 | 目的 |
| --- | --- | --- |
| 数据库操作按当前用户权限执行 | User Mode for DB operations | 避免系统上下文越权写入 |
| 写入/返回字段前做净化 | `stripInaccessible` | 去除不可访问字段 |
| 查询时强制权限检查 | `WITH SECURITY_ENFORCED` | 避免读取无权限字段 |
| 类可执行范围控制 | Class Security | 限制可调用边界 |

## 3. Apex Managed Sharing 使用边界

1. 仅在标准 sharing 无法满足业务授权时使用 Apex Managed Sharing。
2. 共享计算逻辑要与业务状态变更解耦，避免触发器中循环重算。
3. 对“重算共享”流程保留幂等设计，避免重复授权或脏权限。

## 4. 安全编码高频风险与对策

| 风险类型 | 官方章节 | 落地对策 |
| --- | --- | --- |
| SOQL Injection | SOQL Injection（p245） | 绑定变量优先，动态条件严格白名单 |
| XSS | Cross Site Scripting（p241） | 输出编码与前端模板安全约束 |
| CSRF | Cross-Site Request Forgery（p244） | 使用平台机制并校验请求来源 |
| 数据越权 | Data Access Control（p246） | 记录级 + 对象级 + 字段级三层同时校验 |

## 5. 代码评审安全清单（建议）

1. 是否明确了 sharing 关键字并符合业务角色模型。
2. 是否对对象权限与字段权限做了强制检查。
3. 动态 SOQL/SOSL 是否存在注入入口。
4. 外部输入到输出链路是否有脱敏或最小化返回。
5. 异常消息是否避免泄露敏感数据结构。

## Risks / Known Issues

1. 只配置 sharing、不做 FLS/object 权限校验，仍可能越权。
2. 动态查询拼接缺乏白名单时，注入风险会快速放大。
3. 安全校验分散在多层且无统一规范，容易出现漏检。

## Next Steps

1. 为团队建立 Apex 安全基线（类模板 + 查询模板 + 审查规则）。
2. 对高风险对象建立“字段访问矩阵 + 单测断言”。
3. 将安全检查纳入 CI（静态扫描 + 关键用例自动化）。

## Sources

1. C:\workspace\salesforce-kb\99-Inbox\salesforce_apex_developer_guide.pdf（p215-246）
2. https://resources.docs.salesforce.com/latest/latest/en-us/sfdc/pdf/salesforce_apex_developer_guide.pdf

