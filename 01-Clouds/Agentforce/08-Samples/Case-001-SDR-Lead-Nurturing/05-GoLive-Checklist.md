---
title: "Go-Live Checklist - SDR Lead Nurturing"
type: release-checklist
status: ready-for-use
owner: ""
tags: [agentforce, release, sdr]
updated: 2026-02-28
---

# Pre-Go-Live

| ID | Check | Done | Evidence | Owner |
| --- | --- | --- | --- | --- |
| SDR-GO-01 | Agent 已激活，模板与 Topic 版本冻结 |  |  |  |
| SDR-GO-02 | Agent User 邮箱与 EAC 绑定成功 |  |  |  |
| SDR-GO-03 | 权限矩阵已实配并验证最小权限 |  |  |  |
| SDR-GO-04 | Prompt 回归通过（Intro/Nudge/Reply） |  |  |  |
| SDR-GO-05 | 批量回归通过率 >= 95% |  |  |  |
| SDR-GO-06 | 安全测试（越权、PII、退订）全通过 |  |  |  |
| SDR-GO-07 | 监控仪表与告警策略已生效 |  |  |  |
| SDR-GO-08 | 回滚步骤已演练 |  |  |  |

# Go/No-Go Gates

1. P0/P1 未关闭缺陷 = 0。
2. Core path（首封、跟进、回复、退订）全部可用。
3. 关键指标达标：
   - Hallucination <= 2%
   - p95 <= 8s

# Rollback Trigger

1. 发生敏感信息泄露或越权写入。
2. 关键动作失败率 > 10% 且持续 15 分钟。
3. 退订逻辑失效或继续触达已退订线索。

# First 24h Monitoring

| Metric | Threshold | Action |
| --- | --- | --- |
| action_success_rate | < 90% | 触发 P1 排障 |
| opt_out_processing_success | < 99% | 立即暂停外呼 |
| p95_latency | > 8s | 扩容或降级 |
| handoff_rate | > 30% | 检查路由与提示词 |

# Sign-Off

| Role | Name | Decision | Time |
| --- | --- | --- | --- |
| Release Owner |  | Go/No-Go |  |
| Sales Ops |  | Go/No-Go |  |
| Security |  | Go/No-Go |  |
| Admin Lead |  | Go/No-Go |  |

# Change Log

| Date | Author | Change |
| --- | --- | --- |
| 2026-02-28 | Codex | Initial case package |
