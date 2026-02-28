---
title: "Action Contracts - SDR Lead Nurturing"
type: agentforce-action-catalog
status: ready-for-build
owner: ""
tags: [agentforce, action, sales, sdr]
updated: 2026-02-28
---

# Action Summary

- Business purpose: 为 SDR Agent 提供可控、可审计的邮件触达与回复能力。
- Consumer topic(s): send_outreach / reply_product_question / reply_meeting_request / unsubscribe_request。
- Action kinds: Flow + Apex + Prompt/Reasoning。
- Owner team: Salesforce Admin + Sales Ops + Dev Team。

# Action Catalog

| Action ID | Action Name | Kind | Criticality | Notes |
| --- | --- | --- | --- | --- |
| ACT-GET-PROSPECT-CONTEXT | GetProspectContext | Apex/Named Query | High | 读取线索上下文 |
| ACT-DRAFT-INTRO-EMAIL | DraftInitialOutreachEmail | Prompt Action | High | 首封外呼 |
| ACT-DRAFT-NUDGE-EMAIL | DraftNudgeEmail | Prompt Action | High | 跟进外呼 |
| ACT-DRAFT-QA-REPLY | DraftLeadQuestionReply | Prompt + RAG | High | 产品问答 |
| ACT-DRAFT-MEETING-REPLY | DraftMeetingRequestReply | Prompt Action | Medium | 会议回复 |
| ACT-DRAFT-GENERIC-REPLY | DraftGenericReply | Prompt Action | Medium | 离题回复 |
| ACT-SCHEDULE-EMAIL | ScheduleEmail | Flow | High | 计划发送 |
| ACT-OPT-OUT | OptOutLead | Flow | High | 停发与打标 |
| ACT-HANDOFF-TO-SELLER | CreateSellerHandoffTask | Flow | High | 人工接管 |

# Contract Details

## ACT-GET-PROSPECT-CONTEXT

### Inputs

| Name | Type | Required | Validation |
| --- | --- | --- | --- |
| lead_id | string | yes | non-empty, exists |
| locale | string | no | en-US/ja-JP/zh-CN |

### Outputs

| Name | Type | Meaning |
| --- | --- | --- |
| status | string | success/failure |
| lead_profile | object | 线索基础信息 |
| opt_out_status | boolean | 是否退订 |
| inbox_enabled | boolean | 是否可用会议链接 |

### Execution Rules

- Preconditions: 具备 Lead/Contact 读取权限。
- Timeout budget: 3000ms。
- Retry policy: 不重试，直接失败返回。

## ACT-DRAFT-INTRO-EMAIL / ACT-DRAFT-NUDGE-EMAIL

### Inputs

| Name | Type | Required | Validation |
| --- | --- | --- | --- |
| lead_profile | object | yes | required fields present |
| value_props | array | yes | length >= 1 |
| scenario | string | yes | Intro or Nudge |
| locale | string | no | valid locale |

### Outputs

| Name | Type | Meaning |
| --- | --- | --- |
| email_subject | string | 邮件标题 |
| email_body | string | 邮件正文 |
| disclaimer_applied | boolean | 是否附加披露文案 |

### Execution Rules

- Preconditions: `opt_out_status=false`。
- Idempotency key: `lead_id + scenario + cadence_step_tracker_id`。
- Timeout budget: 6000ms。
- Retry policy: 超时重试 1 次。

## ACT-DRAFT-QA-REPLY

### Inputs

| Name | Type | Required | Validation |
| --- | --- | --- | --- |
| lead_id | string | yes | exists |
| email_body | string | yes | length > 0 |
| kb_scope | string | no | approved scope only |

### Outputs

| Name | Type | Meaning |
| --- | --- | --- |
| email_subject | string | 回复标题 |
| email_body | string | 回复正文 |
| citations | array | 引用列表 |
| grounded | boolean | 是否有 grounding |

### Execution Rules

- Preconditions: Data Cloud/KB 索引可用。
- Timeout budget: 8000ms。
- Retry policy: 超时重试 1 次，失败即 handoff。

## ACT-SCHEDULE-EMAIL

### Inputs

| Name | Type | Required | Validation |
| --- | --- | --- | --- |
| lead_id | string | yes | exists |
| email_subject | string | yes | non-empty |
| email_body | string | yes | non-empty |
| send_time | datetime | no | future or immediate |

### Outputs

| Name | Type | Meaning |
| --- | --- | --- |
| status | string | queued/sent/failed |
| task_id | string | 发送任务标识 |

### Execution Rules

- Preconditions: 发件身份与邮箱绑定有效。
- Idempotency key: `lead_id + send_time + hash(email_body)`。
- Timeout budget: 5000ms。
- Retry policy: 失败重试 1 次。

## ACT-OPT-OUT

### Inputs

| Name | Type | Required | Validation |
| --- | --- | --- | --- |
| lead_id | string | yes | exists |
| reason | string | no | max 255 chars |

### Outputs

| Name | Type | Meaning |
| --- | --- | --- |
| status | string | success/failure |
| opt_out_updated | boolean | 退订状态是否更新 |

### Execution Rules

- Preconditions: 具备字段更新权限。
- Timeout budget: 3000ms。
- Retry policy: 不重试，失败转人工。

# Security and Access

- Required object permissions:
  - Lead/Contact: Read
  - Lead status/opt-out fields: Update（仅动作需要字段）
  - Task/Activity: Create
- Required field permissions: 仅开放动作所需字段，PII 字段脱敏输出。
- Sharing mode: with sharing（除系统批处理外）。
- PII handling: 日志只记录掩码值与 request_id。

# Error Mapping

| Error Source | Error Code | User-safe Message | Next Step |
| --- | --- | --- | --- |
| Validation | INVALID_INPUT | 我还缺少关键信息，补充后可继续。 | ask_missing_field |
| Permission | ACCESS_DENIED | 当前权限无法执行该操作。 | handoff |
| KB/RAG | NO_GROUNDED_ANSWER | 当前知识库没有足够依据。 | handoff |
| Downstream | TIMEOUT | 服务暂时不可用，请稍后重试。 | retry_once_then_handoff |

# Observability

- Log fields:
  - request_id
  - lead_id
  - topic
  - action_id
  - latency_ms
  - outcome
- Metrics:
  - action_success_rate
  - action_timeout_rate
  - p95_latency
  - opt_out_processing_success

# Change Log

| Date | Author | Change |
| --- | --- | --- |
| 2026-02-28 | Codex | Initial case package |
