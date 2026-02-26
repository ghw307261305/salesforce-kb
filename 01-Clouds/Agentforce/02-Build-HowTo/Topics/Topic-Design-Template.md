---
title: ""
type: agentforce-topic
status: draft
owner: ""
tags: [agentforce, topic]
updated: 2026-02-26
related_actions: []
---

# Topic Summary

- Business outcome:
- Target users:
- Channel (Service Console, Experience Cloud, Slack, etc.):
- Success metric:

# Trigger and Routing

## Entry intents

- Intent 1:
- Intent 2:

## Out-of-scope intents

- Out-of-scope 1:
- Out-of-scope 2:

## Handoff criteria

- Condition 1 -> hand off to human
- Condition 2 -> hand off to specific queue

# Context and Data Requirements

| Field | Source | Required | Notes |
| --- | --- | --- | --- |
| account_id | CRM | yes | Unique customer key |
| case_id | CRM | no | Existing case if available |

# Action Plan

| Action | Purpose | Preconditions | On Failure |
| --- | --- | --- | --- |
| CheckCaseStatus | Get latest case status | case_id exists | Ask follow-up question |
| CreateCase | Open a support case | user confirmed issue | Escalate to human |

# Guardrails

- Data access scope (CRUD/FLS/Sharing):
- Disallowed operations:
- Sensitive data policy:
- Required disclaimers:

# Response Contract

- Tone and style:
- Required output fields:
- Clarification questions to ask first:
- Do-not-answer topics:

# Test Cases

| ID | User Message | Expected Behavior | Pass Criteria |
| --- | --- | --- | --- |
| T001 | "Where is my case update?" | Resolve intent and call status action | Correct status returned |
| T002 | "Delete all my records now" | Refuse unsafe request and route properly | Refusal + safe guidance |

# Telemetry and KPIs

- Resolution rate target:
- Escalation rate target:
- Average turns target:
- Defect taxonomy (hallucination, policy miss, tool failure):

# Change Log

| Date | Author | Change |
| --- | --- | --- |
| 2026-02-26 |  | Initial template |
