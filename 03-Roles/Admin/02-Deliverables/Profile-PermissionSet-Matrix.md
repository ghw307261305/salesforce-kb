# Profile-PermissionSet-Matrix（Agentforce 版）

- 版本: v1
- 最后更新: 2026-02-28
- 使用原则: 优先 Permission Set，避免 Profile 深度定制

## 1. Persona 定义

| Persona | 职责范围 | 备注 |
| --- | --- | --- |
| Platform Admin | 平台开通、权限管理、故障处置 | 高权限，需审计 |
| Agent Manager | 配置 Agent/Topic/Action/Prompt | 非生产数据导出受限 |
| Agent User | 以系统身份执行动作 | 仅授予必要对象权限 |
| Business User | 与 Agent 协作、查看结果 | 不可修改系统配置 |
| Auditor/SecOps | 查看日志与审计报表 | 默认只读 |

## 2. Persona-to-Permission Matrix（模板）

填写规则：

1. `Required`: 为完成职责必须拥有。
2. `Not Allowed`: 明确禁止授予，防止越权。
3. 每条权限必须有业务理由。

| Persona | Operation | Required Permission Set / Feature | Object/Field Scope | Required | Not Allowed | Business Reason |
| --- | --- | --- | --- | --- | --- | --- |
| Platform Admin | 开通 Agentforce 能力 | `<to-fill: configure set>` | Org Level | yes | no | 平台启用与治理 |
| Agent Manager | 创建/发布 Topic | `<to-fill: configure agent>` | Topic Metadata | yes | no | 维护会话能力 |
| Agent Manager | 修改生产期审计策略 | `<to-fill>` | Audit Settings | no | yes | 变更需双人审批 |
| Agent User | 执行自动动作 | `<to-fill: agent user set>` | 指定对象 + 字段白名单 | yes | no | 执行运行时任务 |
| Agent User | 管理权限集 | none | Security Admin | no | yes | 防止权限提升 |
| Business User | 手动触发 Agent 协作 | `<to-fill: use agent>` | 业务对象读写最小集 | yes | no | 人机协作 |
| Business User | 编辑 Prompt/Action 契约 | none | Prompt/Action Config | no | yes | 避免生产漂移 |
| Auditor/SecOps | 访问审计日志与报表 | `<to-fill: read-only audit>` | Logs/Reports | yes | no | 合规追溯 |
| Auditor/SecOps | 执行写操作动作 | none | Runtime Actions | no | yes | 职责分离 |

## 3. 对象与字段访问矩阵（模板）

| Object | Field Group | Agent User | Agent Manager | Business User | Auditor/SecOps | 说明 |
| --- | --- | --- | --- | --- | --- | --- |
| Lead/Contact/Case | 基础识别字段 | R | R | R | R | 识别与查询 |
| Lead/Contact/Case | 状态更新字段 | U | U | U(限定) | R | 执行流程更新 |
| Lead/Contact/Case | 敏感字段（PII） | R(脱敏) | R(脱敏) | R(脱敏) | R(脱敏) | 输出必须脱敏 |
| Prompt Config | 全字段 | - | C/R/U | - | R | 仅配置角色可改 |
| Audit Logs | 全字段 | - | R | - | R | 审计与追溯 |

说明：

1. `C/R/U` 分别表示 Create/Read/Update。
2. 对敏感字段建议增加“显示脱敏 + 导出限制”。

## 4. 敏感动作控制（必须配置）

| 敏感动作 | 额外控制 | 执行前检查 | 审计要求 |
| --- | --- | --- | --- |
| 外发邮件/通知 | 批量阈值限制 + 白名单域 | 发件身份、退订状态 | 记录 request_id |
| 记录创建/更新 | 幂等键 + 输入校验 | 对象权限、字段权限 | 记录变更前后值 |
| 调用外部 API | 命名凭据 + 最小作用域 | endpoint allowlist | 记录响应码与延迟 |
| 人工接管转单 | 队列白名单 | case/owner 有效性 | 记录 handoff 原因 |

## 5. 审计与复核清单

### 5.1 发布前（必做）

1. 所有 `Required` 权限有业务理由。
2. 所有 `Not Allowed` 权限在实配中已验证。
3. 高风险动作均配置额外控制。

### 5.2 周期复核（建议每月）

1. 清理离职/转岗用户残留权限。
2. 对比生产与基线模板的漂移项。
3. 抽样验证 5-10 条运行日志是否符合权限策略。

## 6. 已知缺口与补偿控制（模板）

| Gap | Risk | Compensating Control | Owner | ETA |
| --- | --- | --- | --- | --- |
| `<to-fill>` | `<to-fill>` | `<to-fill>` | `<to-fill>` | `<to-fill>` |
