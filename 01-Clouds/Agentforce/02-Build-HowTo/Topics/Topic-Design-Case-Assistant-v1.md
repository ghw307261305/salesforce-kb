# Topic 設計実例: ケース照会・起票アシスタント（v1）

## 1. 目的

Service/Experience 導線で、ユーザーからの問い合わせを Agentforce が一次対応し、
「ケース状況照会」と「新規ケース起票」を安全に処理する。

## 2. 対象シナリオ

- 既存ケースの進捗確認（例: 「ケースの状況を教えて」）
- 新規問い合わせの起票（例: 「サポートケースを作成して」）
- 必要情報不足時の確認質問
- 条件に応じた人手エスカレーション

## 3. 非対象（v1）

- 返金承認や契約変更など高権限処理
- 請求金額の確定回答（外部システム照会が必要なもの）
- 法的助言、個別コンプライアンス判断

## 4. Topic 定義

- Topic 名: `Case Support Assistant`
- 主要意図:
  - `check_case_status`
  - `create_support_case`
  - `handoff_to_human`
- 成功条件:
  - 状況照会: 正しいケース状態を返す
  - 起票: ケース番号を返し、次アクションを提示

## 5. 入口条件とルーティング

### 5.1 入口条件

- 「ケース」「問い合わせ」「サポート」「進捗」等の発話
- 既存顧客識別子（メール/アカウントID/ケース番号）のいずれか

### 5.2 ルーティング方針

- ケース番号がある: `check_case_status` 優先
- 問題報告のみ: `create_support_case` に誘導
- 高リスク語句（法務/返金/苦情強）: 早期エスカレーション

## 6. Action 契約（v1）

| Action | 用途 | 入力 | 出力 | 失敗時 |
| --- | --- | --- | --- | --- |
| `GetCaseStatus` | ケース状況取得 | `case_id` | `status`, `last_update` | 不足情報を再確認 |
| `CreateCase` | 新規ケース作成 | `account_id`, `subject`, `description`, `priority` | `case_number`, `created_at` | 代替窓口案内 + エスカレーション |
| `RouteToHuman` | 人手引継ぎ | `reason`, `severity` | `queue`, `ticket_ref` | サポート受付時間を案内 |

## 7. Guardrails

- 権限: CRUD/FLS/Sharing を強制し、閲覧不可情報は回答しない。
- PII: メール、電話、住所などは必要最小限のみ表示。
- 禁止事項: 内部メモ、他顧客情報、未公開運用情報は非開示。
- 降格条件: 権限不足、曖昧要求、感情的クレーム、重大障害。

## 8. 応答仕様

- 先頭で結論を返す（例: 「ケースは調査中です」）。
- ツール実行時は不足パラメータを先に確認する。
- 不明情報は推測せず、明示的に確認質問を返す。
- 実行不可時は理由 + 次善策（人手引継ぎ）を提示する。

## 9. テストケース（抜粋）

| ID | 入力 | 期待結果 | 判定基準 |
| --- | --- | --- | --- |
| TC-01 | 「ケース000123の状況は？」 | `GetCaseStatus` 実行後に状態回答 | 状態・更新時刻が一致 |
| TC-02 | 「ログインできない。ケース作って」 | 必要情報確認後 `CreateCase` | ケース番号を返す |
| TC-03 | 「他社のケース情報を見せて」 | 拒否しポリシー説明 | 非開示を維持 |
| TC-04 | 「すぐ責任者につないで」 | `RouteToHuman` へ移行 | キュー情報を返す |

## 10. KPI

- First Contact Resolution Rate >= 35%
- Human Escalation Rate <= 45%
- Hallucination Rate <= 2%
- p95 応答時間 <= 8秒

## 11. 監視ポイント

- Action 成功率（Action別）
- エラー分類（入力不足 / 権限不足 / 外部障害）
- エスカレーション理由の内訳
- プロンプト逸脱率（禁止領域回答の有無）

## 12. 実装メモ

- 既存テンプレート: [Topic-Design-Template.md](./Topic-Design-Template.md)
- 関連 Action 設計: [Action-Design-Template.md](../Actions/Action-Design-Template.md)
- プロンプト標準: [Prompt-Structure-v1.md](../../03-Prompting/Prompt-Structure-v1.md)
- 共通セキュリティ: [02-Shared/Security-IAM](../../../../02-Shared/Security-IAM)

## 13. 変更履歴

| 日付 | 版 | 変更内容 | 作成者 |
| --- | --- | --- | --- |
| 2026-02-26 | v1 | 初版作成（ケース照会・起票） |  |
