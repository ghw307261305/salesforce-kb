# テスト戦略（Test Strategy）

## 1) 目的

Agentforce の品質を「正確性」「安全性」「運用安定性」で担保する。
本戦略は設計段階からリリース後運用までのテスト体系を定義する。

## 2) 品質目標

- 正確性: 意図判定と回答が要件どおりであること
- 安全性: 禁止要求を拒否し、権限外データを露出しないこと
- 安定性: 外部障害や入力不足時でも破綻しないこと
- 追跡性: 失敗理由がログから追えること

## 3) テストレイヤー

| レイヤー | 目的 | 代表テスト | 実施タイミング |
| --- | --- | --- | --- |
| L1: Prompt/Rule 単体 | 指示階層、拒否文面、応答契約の検証 | Prompt Unit Tests | 変更ごと |
| L2: Action 統合 | Flow/Apex/API 契約の検証 | Integration Tests | 日次CI |
| L3: E2E 会話 | 実ユーザー近似シナリオ検証 | End-to-End Scenarios | リリース前 |
| L4: 回帰評価 | 過去障害の再発防止 | Eval Dataset Regression | リリース前後 |
| L5: Red Team | 悪性入力・越権要求耐性 | Safety/Abuse Tests | 定期（月次） |

## 4) テスト分類

### 4.1 機能テスト

- 意図判定
- 必須入力収集
- Action 実行成功
- 期待レスポンス形式

### 4.2 安全テスト

- 禁止要求（他顧客データ、内部情報開示）
- 権限不足時の拒否
- PII マスキング

### 4.3 異常系テスト

- 入力欠損
- 外部 API タイムアウト
- 一時障害時の再試行
- 引継ぎ分岐

### 4.4 性能テスト

- 応答時間（p95）
- Action 失敗率
- 同時実行時の劣化

## 5) テストデータ設計

- 正常系: 主要ユースケースの代表パターン
- 境界系: 曖昧要求、入力不足、長文、口語
- 禁止系: 越権、機密開示、攻撃的入力
- 障害系: 外部停止、部分失敗、遅延

データセット管理:

- 固定IDで管理（`EVAL-XXXX`）
- 期待結果を明文化（応答、Action、ステータス）
- 障害事例は再発防止ケースとして追加

## 6) 品質ゲート（Release Gate）

リリース可否の最低条件:

- Blocker/High 不具合: 0
- Critical 安全不備: 0
- 必須シナリオ成功率: 95%以上
- Hallucination Rate: 2%以下
- p95 応答時間: 8秒以下

## 7) 欠陥分類と優先度

| 区分 | 例 | 優先度 |
| --- | --- | --- |
| Safety | 禁止情報を開示 | P0 |
| Permission | 権限外データ参照 | P0 |
| Functional | 誤った Action 実行 | P1 |
| Reliability | タイムアウト後の回復不備 | P1 |
| UX | 冗長な確認質問 | P2 |

## 8) CI/CD 連携

- PR 時: L1（Prompt Unit）必須
- Main マージ時: L1 + L2 実行
- リリース候補: L1〜L4 実行
- 本番後: 監視ログから失敗ケースを週次で Eval へ追加

## 9) テスト報告テンプレート

| 項目 | 内容 |
| --- | --- |
| テスト対象版 |  |
| 実行日 |  |
| 実行者 |  |
| 総ケース数 |  |
| 成功/失敗 |  |
| 主要不具合 |  |
| リリース判定 | go / no-go |

## 10) 運用後の改善サイクル

1. 失敗ログを収集
2. 失敗を分類（入力/権限/外部障害/設計不備）
3. Eval Dataset へ追加
4. Prompt/Topic/Action のいずれかを改修
5. 回帰テストで再発防止を確認

## 11) 関連ドキュメント

- [Prompt-Unit-Tests](./Prompt-Unit-Tests.md)
- [Eval-Datasets](./Eval-Datasets.md)
- [Conversation-Design](../../03-Prompting/Conversation-Design.md)
- [Topic 設計実例](../Topics/Topic-Design-Case-Assistant-v1.md)
- [Metrics-KPIs](../../05-Observability/Metrics-KPIs.md)
- [Incident-Runbook](../../05-Observability/Incident-Runbook.md)

## 12) 変更履歴

| 日付 | 版 | 変更内容 | 作成者 |
| --- | --- | --- | --- |
| 2026-02-26 | v1 | 初版作成（レイヤー、品質ゲート、CI連携） |  |
