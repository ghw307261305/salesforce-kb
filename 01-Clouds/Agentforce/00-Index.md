# Agentforce Index

Agentforce 領域の入口ページです。ここでは Topic / Action / Guardrails / Prompt / Eval / Observability を一貫して管理します。

## この領域で扱うもの

- Agent の意図設計（Topic 分割、対象範囲、エスカレーション条件）
- 実行設計（Flow / Apex / API の Action 契約）
- 安全設計（権限、禁止事項、PII 保護、監査）
- 品質設計（テスト戦略、評価データ、KPI、運用監視）

## 最初に読む順番

1. [01-Concepts/Terminology.md](./01-Concepts/Terminology.md)
2. [01-Concepts/Architecture-Overview.md](./01-Concepts/Architecture-Overview.md)
3. [03-Prompting/Prompt-Structure-v1.md](./03-Prompting/Prompt-Structure-v1.md)
4. [02-Build-HowTo/Topics/Topic-Design-Case-Assistant-v1.md](./02-Build-HowTo/Topics/Topic-Design-Case-Assistant-v1.md)

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
- Shared Security: [02-Shared/Security-IAM](../../02-Shared/Security-IAM)
- Shared Integration: [02-Shared/Integration](../../02-Shared/Integration)
- Project Template: [04-Projects/Project-001-XXXX/00-Overview.md](../../04-Projects/Project-001-XXXX/00-Overview.md)
