# Agentforce 上线检查表（Go-Live Checklist）

- 版本: v1
- 最后更新: 2026-02-28
- 适用范围: Agentforce Sales / Service / Mixed
- 使用方法: 每项填写 `Status`（Done/NA/Blocked）与 `Evidence`

## 1. 发布窗口信息

| 项目 | 内容 |
| --- | --- |
| Release ID |  |
| 目标环境 |  |
| 发布时间窗 |  |
| 回滚截止时间 |  |
| Release Owner |  |
| On-Call |  |

## 2. Pre-Go-Live（发布前必检）

| ID | 检查项 | Status | Evidence | Owner |
| --- | --- | --- | --- | --- |
| P01 | 实施范围与变更单已冻结 |  |  |  |
| P02 | 依赖功能已启用（Agentforce、渠道、Data Cloud/EAC/InBox） |  |  |  |
| P03 | 权限矩阵已完成并通过最小权限验证 |  |  |  |
| P04 | Agent User 可用且身份绑定正确 |  |  |  |
| P05 | Topic/Action/Prompt 契约文档已更新 |  |  |  |
| P06 | Guardrails（拒绝、脱敏、转人工）已验证 |  |  |  |
| P07 | Preview 单用例测试通过 |  |  |  |
| P08 | Testing Center 批量回归通过率 >= 95% |  |  |  |
| P09 | E2E 场景通过（成功、失败、退订、人工接管） |  |  |  |
| P10 | Dashboard/告警/日志字段已就绪 |  |  |  |
| P11 | 回滚脚本与开关已演练 |  |  |  |
| P12 | 业务、技术、安全三方已完成预审批 |  |  |  |

## 3. Release Gates（Go/No-Go）

全部满足才允许 Go：

1. Blocker/High 缺陷 = `0`
2. 安全类 P0 = `0`
3. 核心场景通过率 `>= 95%`
4. Hallucination Rate `<= 2%`
5. p95 响应时间 `<= 8s`

## 4. Go-Live 执行清单（发布窗口内）

| ID | 执行动作 | Status | Evidence | Owner |
| --- | --- | --- | --- | --- |
| G01 | 启用生产配置（Feature Flag / Activation） |  |  |  |
| G02 | 执行冒烟用例（至少 3 条核心路径） |  |  |  |
| G03 | 验证关键 Action 调用成功率 |  |  |  |
| G04 | 验证权限拒绝路径（越权请求） |  |  |  |
| G05 | 验证渠道接入（Web/Email/Console） |  |  |  |
| G06 | 监控首小时告警与错误日志 |  |  |  |
| G07 | 发布通知（业务 + 支持团队） |  |  |  |

## 5. Rollback Criteria（回滚触发条件）

满足任一条件即触发回滚：

1. 出现 P0 安全事件（越权数据暴露、敏感信息泄露）。
2. 核心 Action 连续失败率超过阈值（例如 > 10%，持续 15 分钟）。
3. 关键业务路径不可用（创建、查询、转人工）超过 10 分钟未恢复。

## 6. Rollback Steps（回滚步骤）

| 序号 | 动作 | 预期结果 | Owner |
| --- | --- | --- | --- |
| R01 | 关闭生产开关 / 回退激活状态 | 新流量停止进入新版本 |  |
| R02 | 恢复上一稳定配置（Topic/Prompt/Action） | 旧版本行为恢复 |  |
| R03 | 验证冒烟用例 | 核心路径恢复正常 |  |
| R04 | 发布回滚公告并记录事件 | 团队同步一致 |  |

## 7. Post-Go-Live（发布后 24h）

| ID | 检查项 | Status | Evidence | Owner |
| --- | --- | --- | --- | --- |
| A01 | 错误率、延迟、成功率趋势稳定 |  |  |  |
| A02 | 无新增 P0/P1 事故 |  |  |  |
| A03 | 用户反馈已收集并分类 |  |  |  |
| A04 | 新增失败样本已回灌 Eval Dataset |  |  |  |
| A05 | 发布复盘会议已预约 |  |  |  |

## 8. Sign-Off

| 角色 | 姓名 | 决策（Go/No-Go） | 时间 |
| --- | --- | --- | --- |
| Release Owner |  |  |  |
| Tech Lead |  |  |  |
| Security |  |  |  |
| Business Owner |  |  |  |
