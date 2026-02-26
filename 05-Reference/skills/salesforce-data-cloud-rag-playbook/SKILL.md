---
name: salesforce-data-cloud-rag-playbook
description: Document Salesforce Data Cloud and RAG implementation patterns for Agentforce and CRM use cases. Use when asked to design knowledge grounding, data ingestion, retrieval configuration, trust controls, and evaluation metrics for Data Cloud powered responses.
---

# Salesforce Data Cloud RAG Playbook

## Overview
Create practical playbooks for Data Cloud grounded retrieval and answer quality control.

## Workflow
1. Define business questions and required grounded answers.
2. Inventory data sources and classify trusted vs non-trusted sources.
3. Document ingestion plan: source, cadence, ownership, and data quality checks.
4. Specify retrieval and grounding behavior for each response scenario.
5. Define trust and safety controls (masking, refusal, escalation).
6. Define evaluation metrics for accuracy, latency, and hallucination.
7. Add runtime feedback loop for continuous improvement.

## Required Outputs
- Data source catalog
- Grounding and retrieval design
- Safety and compliance constraints
- Evaluation and operations plan

## Rules
- Ground responses in documented sources only.
- Separate operational data from reference knowledge.
- Record fallback behavior when data is missing.

## Validation
1. Verify every answer path has an authoritative source.
2. Verify sensitive data handling is explicit.
3. Verify KPI definitions are measurable and testable.

