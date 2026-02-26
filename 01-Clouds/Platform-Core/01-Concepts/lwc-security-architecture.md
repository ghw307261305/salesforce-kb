# LWC 安全模型知识整理

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: https://developer.salesforce.com/docs/platform/lightning-components-security/guide/get-started-intro.html

## Summary

Salesforce Lightning 组件安全模型的核心是“分层防护”：

1. 前端运行时隔离（组件边界与 DOM 访问控制）。
2. 平台权限控制（对象、字段、记录级权限）。
3. 服务端数据访问治理（Apex 与 API 层校验）。

## Decision / Changes

1. 新建安全总览，作为 LWC 开发默认前置阅读。
2. 强调“前端安全不替代后端鉴权”的边界。
3. 将安全检查纳入组件开发与上线流程。

## 1. 安全设计原则

1. 最小权限原则：仅暴露业务所需的数据与操作。
2. 防御纵深：前端、平台、后端都做校验。
3. 显式边界：组件只访问授权范围内的资源。
4. 可追溯：关键操作可审计、可回放。

## 2. 开发落地要点

1. UI 层不信任外部输入，统一做格式与边界校验。
2. 数据访问优先使用平台安全模型（LDS/UI API）。
3. Apex 场景必须补充对象/字段/记录权限校验。
4. 避免把敏感逻辑仅放在客户端实现。

## 3. 安全检查清单（简版）

1. 是否存在越权读取字段风险？
2. 是否存在越权更新记录风险？
3. 是否对用户输入做了安全处理？
4. 是否记录关键失败与拒绝路径日志？
5. 是否在测试中覆盖权限不足场景？

## Risks / Known Issues

1. 前端可见不等于有权限，错误假设会造成数据泄露风险。
2. 仅做客户端判断、缺少服务端校验，存在绕过风险。
3. 外部嵌入与互操作场景若边界不清，风险会放大。

## Next Steps

1. 为 LWC 项目建立安全审查模板（设计评审 + PR 检查）。
2. 把权限不足与越权访问加入自动化测试。
3. 与安全团队定义组件上线前的最小合规门槛。

## Sources

1. https://developer.salesforce.com/docs/platform/lightning-components-security/guide/get-started-intro.html
