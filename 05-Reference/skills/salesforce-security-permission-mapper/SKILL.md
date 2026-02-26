---
name: salesforce-security-permission-mapper
description: Create Salesforce security and permission mapping documentation. Use when asked to define least-privilege access, permission set assignments, object and field access matrices, role boundaries, and security risk controls for Salesforce or Agentforce solutions.
---

# Salesforce Security Permission Mapper

## Overview
Produce least-privilege permission documentation that engineering and admins can implement directly.

## Workflow
1. Identify personas and operational responsibilities.
2. Inventory required operations by persona (read, create, update, execute).
3. Map operations to permissions:
   - Permission Sets
   - Profiles (only when unavoidable)
   - Object and field access
   - Feature permissions
4. Build access matrix with `required` and `not allowed` states.
5. Add controls for sensitive actions and audit requirements.
6. Record periodic review procedure for permission drift.

## Required Outputs
- Persona-to-permission matrix
- Sensitive action controls
- Audit and review checklist
- Known gaps and compensating controls

## Rules
- Prefer permission sets over profile customization.
- Explicitly define private-action authentication boundaries.
- Avoid over-permissioning for convenience.

## Validation
1. Verify each permission has a concrete business reason.
2. Verify high-risk actions require additional controls.
3. Verify monitoring and audit steps are included.

