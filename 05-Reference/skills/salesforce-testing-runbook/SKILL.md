---
name: salesforce-testing-runbook
description: Build Salesforce and Agentforce testing runbooks for setup validation and release readiness. Use when asked to define test strategy, preview scenarios, batch test datasets, pass/fail gates, and post-release regression loops.
---

# Salesforce Testing Runbook

## Overview
Produce repeatable testing plans for Agentforce behavior, safety, and operational stability.

## Workflow
1. Define test scope: setup, functional, safety, integration, runtime.
2. Build scenario matrix for preview tests and real record tests.
3. Define batch testing inputs and expected topic and action outcomes.
4. Define release gates with measurable thresholds.
5. Define failure triage and rerun process.
6. Define post-release regression cycle from production incidents.

## Required Outputs
- Test matrix
- Dataset and context-variable requirements
- Acceptance criteria and release gate
- Defect severity and response SLA

## Rules
- Keep expected outcomes explicit for each scenario.
- Include negative and boundary cases.
- Track unresolved risk as release blockers when high severity.

## Validation
1. Verify all critical topics and actions are covered.
2. Verify expected outputs are machine-checkable where possible.
3. Verify rollback and incident response references are present.

