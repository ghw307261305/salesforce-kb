---
name: salesforce-kb-index-maintainer
description: Maintain index and navigation quality for this Salesforce knowledge base. Use when asked to add, reorganize, or audit index pages, cross-links, naming consistency, and discoverability across Cloud, Shared, and Project documentation trees.
---

# Salesforce KB Index Maintainer

## Overview
Keep KB navigation reliable by maintaining index pages, links, and structural consistency.

## Workflow
1. Detect added, moved, and renamed markdown files.
2. Update nearest index page first, then parent indexes if needed.
3. Group links by user journey: concepts, build, testing, operations.
4. Normalize titles and path style.
5. Remove or flag stale links.
6. Add short descriptions for newly indexed documents.

## Rules
- Prefer relative markdown links.
- Keep index files concise and scannable.
- Maintain stable ordering unless a stronger structure is needed.
- Avoid duplicate links to the same target in one section.

## Validation
1. Verify all new links resolve.
2. Verify renamed file references are updated repository-wide.
3. Verify index ordering and headings remain coherent.

