# Agentforce Index

Agentforce 領域の入口ページです。ここでは Topic / Action / Guardrails / Prompt / Eval / Observability を一貫して管理します。

## この領域で扱うもの

- Agent の意図設計（Topic 分割、対象範囲、エスカレーション条件）
- 実行設計（Flow / Apex / API の Action 契約）
- 安全設計（権限、禁止事項、PII 保護、監査）
- 品質設計（テスト戦略、評価データ、KPI、運用監視）

## 最初に読む順番

1. [01-Concepts/agentforce-basics-theory-practice.md](./01-Concepts/agentforce-basics-theory-practice.md)
2. [01-Concepts/Terminology.md](./01-Concepts/Terminology.md)
3. [01-Concepts/Architecture-Overview.md](./01-Concepts/Architecture-Overview.md)
4. [03-Prompting/Prompt-Structure-v1.md](./03-Prompting/Prompt-Structure-v1.md)
5. [02-Build-HowTo/Topics/Topic-Design-Case-Assistant-v1.md](./02-Build-HowTo/Topics/Topic-Design-Case-Assistant-v1.md)
6. [02-Build-HowTo/Setup/agentforce-for-sales-implementation-guide.md](./02-Build-HowTo/Setup/agentforce-for-sales-implementation-guide.md)
7. [02-Build-HowTo/Setup/agentforce-sales-implementation-guide.md](./02-Build-HowTo/Setup/agentforce-sales-implementation-guide.md)
8. [02-Build-HowTo/Setup/Agentforce-Implementation-Runbook.md](./02-Build-HowTo/Setup/Agentforce-Implementation-Runbook.md)
9. [02-Build-HowTo/Deployment/Release-Checklist.md](./02-Build-HowTo/Deployment/Release-Checklist.md)
10. [../../03-Roles/Admin/02-Deliverables/Profile-PermissionSet-Matrix.md](../../03-Roles/Admin/02-Deliverables/Profile-PermissionSet-Matrix.md)
11. [01-Concepts/agentforce-developer-get-started.md](./01-Concepts/agentforce-developer-get-started.md)
12. [03-Prompting/agent-script-knowledge.md](./03-Prompting/agent-script-knowledge.md)
13. [01-Concepts/agentforce-apis-and-sdks-knowledge.md](./01-Concepts/agentforce-apis-and-sdks-knowledge.md)
14. [02-Build-HowTo/Actions/agentforce-actions-get-started.md](./02-Build-HowTo/Actions/agentforce-actions-get-started.md)
15. [02-Build-HowTo/Deployment/agentforce-dx-knowledge.md](./02-Build-HowTo/Deployment/agentforce-dx-knowledge.md)
16. [03-Prompting/models-and-prompts-get-started.md](./03-Prompting/models-and-prompts-get-started.md)
17. [04-Integration/mcp-solutions-for-developers.md](./04-Integration/mcp-solutions-for-developers.md)
18. [08-Samples/Case-001-SDR-Lead-Nurturing/README.md](./08-Samples/Case-001-SDR-Lead-Nurturing/README.md)
19. [10-Training/00-index.md](./10-Training/00-index.md)

## ディレクトリ案内

- Concepts: [01-Concepts](./01-Concepts)
- Build HowTo: [02-Build-HowTo](./02-Build-HowTo)
- Prompting: [03-Prompting](./03-Prompting)
- Integration: [04-Integration](./04-Integration)
- Observability: [05-Observability](./05-Observability)
- Patterns: [06-Patterns](./06-Patterns)
- Troubleshooting: [07-Troubleshooting](./07-Troubleshooting)
- Samples: [08-Samples](./08-Samples)
- Docs Links: [09-Docs-Links](./09-Docs-Links)
- Training: [10-Training](./10-Training)

## 作業フロー（推奨）

1. Topic を定義し、対象 / 非対象を明確化。
2. 必要 Action を契約化（入力 / 出力 / エラー / タイムアウト）。
3. Guardrails を設計（権限・禁止事項・エスカレーション）。
4. Prompt と評価観点を定義し、テストケースを作成。
5. 運用 KPI を設定し、ログと監査を有効化。

## 運用ルール

- 共通知識は `02-Shared` を正本とし、ここではリンク参照を優先する。
- プロジェクト固有判断は `04-Projects` に残し、再利用可能な内容だけ Agentforce に昇格する。
- 1ファイル1テーマを徹底し、更新時は変更履歴を残す。

## 関連リンク

- StartHere: [00-StartHere/00-Index.md](../../00-StartHere/00-Index.md)
- Basics (Theory + Practice): [01-Concepts/agentforce-basics-theory-practice.md](./01-Concepts/agentforce-basics-theory-practice.md)
- Official Docs: [09-Docs-Links/Official-Docs.md](./09-Docs-Links/Official-Docs.md)
- Shared Security: [02-Shared/Security-IAM](../../02-Shared/Security-IAM)
- Shared Integration: [02-Shared/Integration](../../02-Shared/Integration)
- Project Template: [04-Projects/Project-001-XXXX/00-Overview.md](../../04-Projects/Project-001-XXXX/00-Overview.md)
- Implementation Runbook: [02-Build-HowTo/Setup/Agentforce-Implementation-Runbook.md](./02-Build-HowTo/Setup/Agentforce-Implementation-Runbook.md)
- Go-Live Checklist: [02-Build-HowTo/Deployment/Release-Checklist.md](./02-Build-HowTo/Deployment/Release-Checklist.md)
- Permission Matrix Template: [03-Roles/Admin/02-Deliverables/Profile-PermissionSet-Matrix.md](../../03-Roles/Admin/02-Deliverables/Profile-PermissionSet-Matrix.md)
- Sample Case Package: [08-Samples/Case-001-SDR-Lead-Nurturing/README.md](./08-Samples/Case-001-SDR-Lead-Nurturing/README.md)
- Training Index: [10-Training/00-index.md](./10-Training/00-index.md)
