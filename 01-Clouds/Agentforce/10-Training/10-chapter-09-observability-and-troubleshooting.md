# 第9章 可观测性与故障排查

- 版本: v1
- 最后更新: 2026-02-28
- 章节定位: 交付运营核心
- 预计学习时长: 120-150 分钟

## Summary

本章目标是让 Agentforce 上线后“可见、可诊断、可恢复”。  
核心是把会话质量、动作执行、外部依赖三类信号统一纳入监控。

完成本章后，学习者应能:

1. 搭建可观测指标体系（KPI + 技术指标）。
2. 设计日志与审计字段。
3. 运行标准化故障排查与事件响应流程。

## Decision / Changes

1. 指标拆分为业务层、模型层、系统层三层。
2. 日志字段采用统一命名（request_id/topic_id/action_id）。
3. 故障处理流程统一到 Incident Runbook，避免临场决策。

## 1. 学习目标

### 1.1 知识目标

1. 理解 Agentforce 观测面（质量、性能、稳定性、安全）。
2. 理解日志、审计、指标三者差异与协同。
3. 理解故障定级、响应SLA与复盘机制。

### 1.2 技能目标

1. 能定义 Dashboard 指标与告警阈值。
2. 能通过日志快速定位故障环节。
3. 能执行事件分级、止损与恢复流程。

### 1.3 交付目标

1. 一份可观测指标表。
2. 一份日志与审计字段标准。
3. 一份故障排查流程与值班手册。

## 2. 前置知识

1. 第5章 Action 契约（观测字段）。
2. 第8章 测试与评测门禁。
3. 基础监控与告警概念。

## 3. 指标体系设计

### 3.1 业务层指标

| 指标 | 说明 |
| --- | --- |
| Resolution Rate | 自动完成率 |
| Escalation Rate | 转人工比例 |
| Meeting/Conversion | 业务结果指标 |
| Opt-Out Rate | 退订率 |

### 3.2 质量与模型层指标

| 指标 | 目标 |
| --- | --- |
| Intent Accuracy | >= 90% |
| Grounded Answer Rate | >= 90% |
| Hallucination Rate | <= 2% |
| Policy Violation Rate | 0 for P0 |

### 3.3 系统层指标

| 指标 | 目标 |
| --- | --- |
| p95 Latency | <= 8s |
| Action Success Rate | >= 90% |
| Timeout Rate | <= 3% |
| External Error Rate | <= 2% |

## 4. 日志与审计标准

### 4.1 最小日志字段

1. request_id
2. session_id
3. topic_id
4. action_id
5. latency_ms
6. outcome
7. error_code

### 4.2 审计字段

1. principal_id（调用主体）
2. permission_context（权限上下文）
3. data_source_id（接地来源）
4. handoff_reason（人工接管原因）

### 4.3 脱敏要求

1. PII 默认脱敏。
2. 日志不存明文密钥或敏感凭据。
3. 调试输出与生产日志分层隔离。

## 5. 告警与响应

### 5.1 告警分级示例

| 级别 | 条件 | 响应时限 |
| --- | --- | --- |
| P0 | 安全违规、数据泄露 | 15分钟内响应 |
| P1 | 关键路径不可用 | 30分钟内响应 |
| P2 | 性能劣化 | 2小时内处理 |
| P3 | 低影响体验问题 | 当日处理 |

### 5.2 告警阈值建议

1. p95 latency > 8s 持续 10 分钟。
2. timeout rate > 3% 持续 15 分钟。
3. policy violation > 0（P0）。

## 6. 故障排查流程

### 6.1 标准流程

1. Detect：接收告警并确认影响范围。
2. Triage：判定故障层级（Topic/Action/Integration/Data）。
3. Mitigate：降级、熔断、转人工。
4. Recover：修复与验证核心路径。
5. Postmortem：复盘根因并回灌测试集。

### 6.2 快速定位矩阵

| 现象 | 可能原因 | 首查项 |
| --- | --- | --- |
| 回复慢 | 外部接口超时 | latency 分布 + 下游状态 |
| 误路由升高 | Topic/Prompt 变更 | 最近变更记录 + 置信度 |
| 越权报错激增 | 权限配置漂移 | 最近权限变更 |
| 无依据回答 | 数据源不可用 | data_source_id + ingest日志 |

## 7. 实操练习（必做 + 可选）

### 7.1 必做练习: 搭建一套观测与排障面板

任务:

1. 定义 12 项关键指标。
2. 配置 4 条告警规则与响应人。
3. 模拟 2 个故障场景并完成排查记录。

预期结果: 形成可运行的监控与排障手册。

### 7.2 可选练习: 事故复盘报告

任务:

1. 选择一个历史故障案例。
2. 输出 timeline、根因、影响、改进动作。
3. 追加对应回归测试样例。

预期结果: 形成标准 Postmortem 模板。

## 8. 常见错误与排障

| 问题 | 现象 | 修正建议 |
| --- | --- | --- |
| 只看业务指标 | 技术故障发现滞后 | 增加系统层指标 |
| 无 request_id | 追踪断链 | 强制全链路打点 |
| 告警过多无分级 | 值班疲劳 | 按 P0-P3 分层 |
| 故障复盘不闭环 | 同类故障重复 | 复盘后回灌测试集 |

## 9. 练习题

### 9.1 选择题

1. 下列哪项最适合定位单次调用链路？
   - A. topic_name
   - B. request_id
   - C. language
   - D. channel
2. 下列哪项属于系统层指标？
   - A. Conversion Rate
   - B. p95 Latency
   - C. Meeting Rate
   - D. CSAT
3. 发生安全违规时正确动作是：
   - A. 等日报总结
   - B. 立即降级并升级P0响应
   - C. 先优化文案
   - D. 继续观察

答案：1-B，2-B，3-B。

### 9.2 实作题

题目：为“客户支持助手”设计一版可观测方案，至少包含：

1. 10个指标。
2. 4条告警规则。
3. 1份故障响应流程图。

评分参考：

1. 指标完整性（40分）
2. 告警可执行性（30分）
3. 排障可操作性（30分）

## 10. 验收标准（章节通过条件）

1. 输出可观测指标+告警+排障流程三件套。
2. 模拟故障演练完成并有记录。
3. 练习题得分 >= 80 分。

## 11. 参考资料

1. [../05-Observability/Metrics-KPIs.md](../05-Observability/Metrics-KPIs.md)
2. [../05-Observability/Logging-Auditing.md](../05-Observability/Logging-Auditing.md)
3. [../05-Observability/Incident-Runbook.md](../05-Observability/Incident-Runbook.md)
4. [../07-Troubleshooting/Common-Failures.md](../07-Troubleshooting/Common-Failures.md)
5. [../07-Troubleshooting/Debug-Checklist.md](../07-Troubleshooting/Debug-Checklist.md)

## 12. 版本敏感假设

1. 指标采集入口和字段可能随平台版本变化。
2. 告警阈值应按业务季节性和流量峰值调优。

## Risks / Known Issues

1. 指标过多但无优先级会导致监控失焦。
2. 无统一值班机制会放大响应延迟。
3. 仅记录不复盘，无法持续改进。

## Next Steps

1. 进入第10章，完成发布管理与回滚策略。
2. 将关键故障场景纳入发布前演练。
3. 建立周报机制追踪指标趋势。
