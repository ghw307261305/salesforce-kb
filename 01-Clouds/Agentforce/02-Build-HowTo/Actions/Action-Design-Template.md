---
title: ""
type: agentforce-action
status: draft
owner: ""
tags: [agentforce, action]
updated: 2026-02-26
action_kind: "apex|flow|api"
---

# Action Summary

- Business purpose:
- Consumer topic(s):
- Action kind (Apex, Flow, API):
- Owner team:

# Contract

## Inputs

| Name | Type | Required | Validation | Example |
| --- | --- | --- | --- | --- |
| account_id | string | yes | non-empty, known account | 001xx000... |
| locale | string | no | en-US, zh-CN, ja-JP | zh-CN |

## Outputs

| Name | Type | Meaning | Example |
| --- | --- | --- | --- |
| status | string | success or failure | success |
| message | string | human-readable summary | "Case created" |
| data | object | payload for topic response | {"caseNumber":"00012345"} |

# Execution Rules

- Preconditions:
- Idempotency key strategy:
- Timeout budget (ms):
- Retry policy:
- Concurrency limit:

# Security and Access

- Required object permissions:
- Required field permissions:
- Sharing mode and run context:
- PII handling and redaction rules:

# Error Mapping

| Error Source | Error Code | User-safe Message | Next Step |
| --- | --- | --- | --- |
| Validation | INVALID_INPUT | "I need one more detail to continue." | Ask for missing field |
| Downstream API | HTTP_503 | "Service is temporarily unavailable." | Retry then escalate |

# Observability

- Log fields (request_id, topic_id, action_id, latency_ms):
- Metrics (success_rate, p95_latency, error_rate):
- Alert thresholds:

# Test Plan

## Unit tests

- Happy path:
- Invalid input:
- Permission denied:

## Integration tests

- Sandbox end-to-end flow:
- Downstream timeout behavior:

# Rollout and Rollback

- Deployment plan:
- Feature flag strategy:
- Rollback trigger:

# Change Log

| Date | Author | Change |
| --- | --- | --- |
| 2026-02-26 |  | Initial template |
