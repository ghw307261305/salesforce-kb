# Agentforce アーキテクチャ概要

このページは Agentforce を実装・運用するための全体像を定義します。
「何をどこで管理するか」を明確にし、Cloud 固有領域と Shared 領域の責務を分離します。

## 1) 全体像

Agentforce は以下のレイヤーで構成します。

1. 体験レイヤー: ユーザー対話、チャネル、応答形式
2. 推論レイヤー: Topic 判定、指示階層、ツール選択
3. 実行レイヤー: Flow / Apex / API Action 実行
4. 制御レイヤー: Guardrails、権限、PII 保護、監査
5. 運用レイヤー: ログ、KPI、評価、インシデント対応

## 2) 参照アーキテクチャ（論理）

```text
User Channel (Web/Experience/Console)
        |
        v
Agent Runtime
  - Topic Router
  - Prompt Orchestrator
  - Tool Dispatcher
        |
        +--> Action: Flow
        +--> Action: Apex
        +--> Action: External API
        |
        v
Guardrails + Security Controls
  - CRUD/FLS/Sharing
  - PII Redaction
  - Policy Refusal / Handoff
        |
        v
Observability
  - Logs / Metrics / Traces
  - Eval / Regression
  - Incident Runbook
```

## 3) 設計責務（Cloud vs Shared）

| 区分 | 管理場所 | 含める内容 |
| --- | --- | --- |
| Agentforce 固有 | `01-Clouds/Agentforce` | Topic、Action 契約、Prompt、Guardrails、評価設計 |
| 共通資産 | `02-Shared` | Security、Integration、DevOps、Testing の共通標準 |
| 案件固有 | `04-Projects` | 背景、制約、意思決定、実行履歴 |

## 4) 主要コンポーネント

| コンポーネント | 役割 | 設計ドキュメント |
| --- | --- | --- |
| Topic Router | 意図分類と経路選択 | [Topics](../02-Build-HowTo/Topics) |
| Action Dispatcher | Action 実行制御 | [Actions](../02-Build-HowTo/Actions) |
| Prompt Layer | 指示階層と応答契約 | [Prompt-Structure-v1](../03-Prompting/Prompt-Structure-v1.md) |
| Guardrails Engine | 安全制御と拒否・引継ぎ判定 | [Guardrails](../02-Build-HowTo/Guardrails) |
| Eval Engine | テスト・回帰評価 | [Testing](../02-Build-HowTo/Testing) |
| Telemetry | ログ・KPI・監査 | [05-Observability](../05-Observability) |

## 5) データと権限の流れ

1. ユーザー入力を受け取る。
2. Topic 判定と入力妥当性確認を行う。
3. 必要時のみ Action を実行する。
4. 実行前後で CRUD/FLS/Sharing を検証する。
5. 出力時に PII をマスキングし、監査ログを記録する。
6. 失敗時は再試行・確認質問・人手引継ぎを選択する。

## 6) 信頼性設計

- タイムアウト設計: Action ごとに上限時間を明確化。
- リトライ設計: 冪等な処理のみ再試行。
- フォールバック: 取得失敗時は説明 + 次善策提示。
- エラー正規化: 内部エラーをユーザー安全文面へ変換。

## 7) セキュリティ設計

- 最小権限での実行を原則とする。
- 禁止領域（他顧客情報、内部機密）を明示し回答させない。
- 高リスク要求は自動拒否または人手引継ぎ。
- ログに機微情報を残さない。

参照: [Safety-Policy](../02-Build-HowTo/Guardrails/Safety-Policy.md), [Data-Access-Control](../02-Build-HowTo/Guardrails/Data-Access-Control.md), [02-Shared/Security-IAM](../../../02-Shared/Security-IAM)

## 8) 品質評価とKPI

最低限の運用KPI:

- Action Success Rate
- Escalation Rate
- Hallucination Rate
- p95 Latency
- User Satisfaction Proxy（再問い合わせ率など）

評価運用:

- リリース前: 固定 Eval Dataset で回帰確認。
- リリース後: インシデント・失敗ログを評価データへ再投入。

参照: [Metrics-KPIs](../05-Observability/Metrics-KPIs.md), [Eval-Datasets](../02-Build-HowTo/Testing/Eval-Datasets.md)

## 9) 典型的な実装フロー

1. Topic を定義（対象 / 非対象 / 成功条件）。
2. Action 契約を定義（入力 / 出力 / エラー）。
3. Guardrails を設定（禁止・降格・権限）。
4. Prompt と Response Contract を確定。
5. テストケースと KPI を定義。
6. ログ監視と運用Runbookを準備。

## 10) 関連ドキュメント

- [Agentforce Index](../00-Index.md)
- [Terminology](./Terminology.md)
- [Topic 設計実例](../02-Build-HowTo/Topics/Topic-Design-Case-Assistant-v1.md)
- [Action 設計テンプレート](../02-Build-HowTo/Actions/Action-Design-Template.md)
- [Prompt-Structure-v1](../03-Prompting/Prompt-Structure-v1.md)
- [Incident-Runbook](../05-Observability/Incident-Runbook.md)

## 11) 変更履歴

| 日付 | 版 | 変更内容 | 作成者 |
| --- | --- | --- | --- |
| 2026-02-26 | v1 | 初版作成（レイヤー、責務、品質運用） |  |
