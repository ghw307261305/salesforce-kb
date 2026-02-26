---
name: salesforce-prompt-template-governance
description: Govern Salesforce Prompt Builder templates for Agentforce solutions. Use when asked to design, review, version, and validate prompt templates, instruction blocks, guardrails, merge fields, and output contracts across environments.
---

# Salesforce Prompt Template Governance

## Overview
Standardize prompt templates to improve consistency, safety, and maintainability.

## Workflow
1. Inventory templates by use case and topic.
2. Split prompt content into governable blocks:
   - Role and goal
   - Context and data fields
   - Tone and style
   - Guardrails
   - Output contract
3. Mark each block as customizable or locked.
4. Define versioning, owner, and review cadence.
5. Define test cases for prompt behavior and regressions.
6. Publish update checklist before activation.

## Required Outputs
- Prompt template inventory
- Block-level governance rules
- Versioning and review policy
- Regression test checklist

## Rules
- Use strong instruction language for constraints.
- Add defaults for null merge fields.
- Avoid ambiguous directives.

## Validation
1. Verify every template has a clear output contract.
2. Verify guardrails prevent unsafe output.
3. Verify updates include regression evidence.

