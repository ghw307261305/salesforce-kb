---
name: salesforce-agentforce-implementation
description: Build Agentforce for Sales, Service, or Data Cloud implementation guides and runbooks. Use when asked to create or update setup procedures, prerequisites, permissions, activation flows, testing plans, go-live criteria, and troubleshooting for Agentforce deployments.
---

# Salesforce Agentforce Implementation

## Overview
Produce execution-ready Agentforce implementation documentation from source material and existing repository standards.

## Workflow
1. Classify scope: Service Agent, Sales Development, Data Cloud, or mixed.
2. Create a readiness matrix: objects, channels, licenses, org prerequisites.
3. Define role and permission mapping for admin, agent user, and business users.
4. Write setup in ordered phases:
   - Enablement
   - Configuration
   - Testing and preview
   - Runtime monitoring
5. Add explicit acceptance criteria and go-live gates.
6. Add troubleshooting matrix for common failures and corrections.
7. Cross-link related docs in `01-Clouds/Agentforce`.

## Required Outputs
- Implementation summary
- Step-by-step setup checklist
- Permission matrix
- Testing and acceptance section
- Risks and next actions

## Rules
- Use deterministic steps, not high-level slogans.
- Separate mandatory vs optional setup clearly.
- Call out version-sensitive assumptions explicitly.

## Validation
1. Verify every step has an expected result.
2. Verify permission names and object names are consistent.
3. Verify all paths and links are valid.

