---
name: salesforce-release-notes-sync
description: Sync Salesforce and Agentforce release notes into this knowledge base. Use when asked to track new releases, summarize impact, map changes to existing docs, and update KB content with date-stamped change records.
---

# Salesforce Release Notes Sync

## Overview
Convert release updates into actionable KB deltas with explicit impact and ownership.

## Workflow
1. Capture release source, version, and publication date.
2. Extract items relevant to this repository scope.
3. Classify each item:
   - New capability
   - Behavior change
   - Deprecation or removal
   - Security or compliance impact
4. Map each item to existing KB files or required new files.
5. Apply doc updates with concise change notes and dates.
6. Add follow-up tasks for testing or migration work.

## Output Format
- `Release Summary`
- `Impact Matrix`
- `Doc Updates Applied`
- `Open Actions`

## Rules
- Do not mix speculation with confirmed release behavior.
- Mark unknown rollout details as `TODO`.
- Keep one change log entry per release wave.

## Validation
1. Verify each release note item has an owner path in the KB.
2. Verify impacted docs include updated date or version marker.
3. Verify removed or deprecated features are flagged clearly.

