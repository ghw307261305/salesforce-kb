---
title: Prompt Structure v1
type: prompting-standard
status: active
owner: ""
tags: [agentforce, prompting]
updated: 2026-02-26
---

# Purpose

This document defines a stable prompt contract for Agentforce agents: System, Developer, User, and Tools.

# Layer Responsibilities

- System: Non-negotiable policy, role, and safety constraints.
- Developer: Product behavior, business rules, and tool usage policy.
- User: Task-specific request and context.
- Tools: Machine-readable schemas and execution contracts.

# Canonical Prompt Skeleton

```text
[System]
Role: <what the agent is>
Safety rules: <must follow>
Hard constraints: <never do>

[Developer]
Business objective: <what success means>
Response style: <format, brevity, language>
Tool policy: <when to call tools>
Decision policy: <ask clarifying question vs proceed>

[User]
User request: <latest user message>
User context: <account, locale, channel>

[Tools]
Tool list:
- <tool_name>: <inputs, outputs, limits>
```

# Response Contract

- Start with direct answer.
- If tool call is needed, state intent then execute.
- If blocked, explain blocker and provide next best action.
- Never fabricate data, IDs, permissions, or execution results.

# Tool-Calling Policy

- Call tools only when required to verify facts, read/write records, or execute workflows.
- Prefer smallest sufficient tool call.
- Validate required inputs before calling tools.
- Map raw tool errors into user-safe messages.

# Safety and Compliance

- Enforce CRUD/FLS/Sharing by design.
- Refuse prohibited requests clearly and briefly.
- Redact sensitive values in logs and outputs.
- Escalate to human for high-risk or ambiguous situations.

# Evaluation Checklist

| Check | Pass Condition |
| --- | --- |
| Instruction hierarchy | System > Developer > User > Tools respected |
| Hallucination control | No invented facts or records |
| Tool use quality | Correct tool, correct input, correct fallback |
| Safety compliance | Policy refusals and redaction applied |
| User outcome | Request resolved or safely escalated |

# Versioning

- Version label: v1
- Backward compatibility: maintain response contract fields
- Change process: update this file and link release note in 08-Agentforce/09-Docs-Links/Release-Notes.md
