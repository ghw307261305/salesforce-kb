# 02 用語集

## 基本用語

- クラウド固有知識: 特定クラウドに依存する知識。`01-Clouds` に配置。
- 共通知識: 複数クラウドで再利用する知識。`02-Shared` を唯一の正本とする。
- ロールプレイブック: 役割ごとの進め方・テンプレート・チェックリスト。`03-Roles` に配置。
- ADR: Architecture Decision Record。重要な設計判断と根拠を記録する文書。
- 昇格（Promotion）: プロジェクト知見を再利用可能資産として知識庫へ移すこと。

## Agentforce 用語

- Topic: エージェントが扱う意図の範囲。
- Action: エージェントが実行する処理単位（Flow / Apex / API）。
- Guardrails: 安全・権限・禁止事項などの制約。
- Eval Dataset: 回答品質評価のための検証データ。
- Hallucination Rate: 根拠のない回答の割合。

## データ・セキュリティ用語

- CRUD/FLS/Sharing: オブジェクト・項目・レコードのアクセス制御。
- Source of Truth: その情報の唯一の正本。
- Idempotency: 同一要求を再実行しても副作用が増えない性質。
- Observability: ログ・メトリクス・トレースで状態を把握できること。

## 運用用語

- Inbox First: まず Inbox に集約してから分類。
- Link Instead of Copy: 複製よりリンク参照を優先。
- Project-specific vs Reusable: 案件固有と再利用可能を分離して管理。
