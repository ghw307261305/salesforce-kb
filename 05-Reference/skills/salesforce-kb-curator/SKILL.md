---
name: salesforce-kb-curator
description: Curate Salesforce knowledge from PDFs, release notes, help pages, or inbox notes into structured markdown under this repository. Use when asked to summarize, consolidate, normalize, or migrate Salesforce or Agentforce content into KB docs with source tracking and consistent sections.
---

# Salesforce KB Curator

## Overview
Curate raw Salesforce materials into maintainable KB documents that match this repository structure.

## Workflow
1. Confirm the target output path in `01-Clouds`, `02-Shared`, or project folders.
2. Load only required source files from `99-Inbox` or user-provided paths.
3. Extract text from PDF with `fitz` when native PDF CLI tools are unavailable.
4. Build output with required sections:
   - `Summary`
   - `Decision` or `Changes`
   - `Risks` or `Known Issues`
   - `Next Steps`
5. Convert long source content into concise architecture, setup, and checklist views.
6. Keep naming, terminology, and style aligned with nearby documents.
7. Update index pages when creating a new KB file.

## Rules
- Prefer markdown tables for matrices.
- Keep claims traceable to source documents.
- Use `TODO` for uncertain facts instead of guessing.
- Keep filenames in kebab-case.
- Exclude secrets or private credentials.

## Validation
1. Verify links resolve correctly.
2. Verify section headers are scan-friendly.
3. Verify no large copy-paste fragments from source PDFs remain.

