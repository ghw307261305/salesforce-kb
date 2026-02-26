# Agentforce 用語集

このページは Agentforce 関連の共通語彙を統一するための辞書です。
定義を固定し、プロジェクトごとの表現ゆれを防ぎます。

## 1) コア概念

| 用語 | 定義 | 実務での使いどころ | 関連ドキュメント |
| --- | --- | --- | --- |
| Agent | ユーザー要求を理解し、必要に応じてツールを呼び出して回答・実行する実行主体 | 体験設計の単位 | [Agentforce Index](../00-Index.md) |
| Topic | Agent が扱う意図範囲（対象業務） | 要件分割・責務分割 | [Topic 設計実例](../02-Build-HowTo/Topics/Topic-Design-Case-Assistant-v1.md) |
| Intent | ユーザー発話の目的ラベル | ルーティング条件 | [Topic 設計テンプレート](../02-Build-HowTo/Topics/Topic-Design-Template.md) |
| Action | Agent が実行する処理単位（Flow / Apex / API） | 業務処理の実行契約 | [Action 設計テンプレート](../02-Build-HowTo/Actions/Action-Design-Template.md) |
| Guardrails | 禁止事項、権限制約、降格条件などの安全制御 | 安全・法務・運用制御 | [Safety-Policy](../02-Build-HowTo/Guardrails/Safety-Policy.md) |
| Handoff | 人手対応へ引き継ぐ動作 | 高リスク・不確実ケース対応 | [Common-Failures](../07-Troubleshooting/Common-Failures.md) |

## 2) プロンプト / 応答系

| 用語 | 定義 | 注意点 |
| --- | --- | --- |
| System 指示 | 最上位の不変ルール | 下位指示で上書きしない |
| Developer 指示 | 業務要件・応答方針・ツール利用方針 | 実装ポリシーを具体化する |
| User 入力 | その時点の要求 | 不足情報は確認質問で補完 |
| Tool Calling | ツール実行の意思決定と入出力制御 | 必須入力が揃うまで実行しない |
| Response Contract | 応答フォーマットの契約 | 一貫した UX を維持 |
| Hallucination | 根拠のない出力 | 推測回答を禁止し、確認・拒否・引継ぎを使う |

参照: [Prompt-Structure-v1](../03-Prompting/Prompt-Structure-v1.md)

## 3) データ / 権限 / 安全

| 用語 | 定義 | 実務ルール |
| --- | --- | --- |
| CRUD | オブジェクトレベル権限 | 実行前に権限チェック |
| FLS | 項目レベル権限 | 非表示項目は出力禁止 |
| Sharing | レコード共有権限 | 所有外レコードへのアクセス制御 |
| PII | 個人識別情報（メール、電話、住所等） | 必要最小限表示・ログでマスキング |
| Redaction | 機微データの伏せ字処理 | 監査ログと画面出力で適用 |
| Audit Trail | 誰が何をしたかの追跡記録 | 監査要件を満たすため保持 |

参照: [Data-Access-Control](../02-Build-HowTo/Guardrails/Data-Access-Control.md), [Redaction-PII](../02-Build-HowTo/Guardrails/Redaction-PII.md), [02-Shared/Security-IAM](../../../02-Shared/Security-IAM)

## 4) 品質 / 評価 / 運用

| 用語 | 定義 | 例 |
| --- | --- | --- |
| Eval Dataset | 品質評価用の固定テスト集合 | 正常系 + 境界 + 禁止系 |
| Success Rate | 期待結果を満たした割合 | Action 成功率 |
| Escalation Rate | 人手へ引き継いだ割合 | 高すぎる場合は Topic/Action 設計見直し |
| FCR | First Contact Resolution 率 | 一次応答で解決した割合 |
| p95 Latency | 95パーセンタイル応答時間 | 応答SLOの主要指標 |
| Incident | 期待挙動を外れた運用障害 | 再発防止を Runbook に反映 |

参照: [Metrics-KPIs](../05-Observability/Metrics-KPIs.md), [Incident-Runbook](../05-Observability/Incident-Runbook.md), [Eval-Datasets](../02-Build-HowTo/Testing/Eval-Datasets.md)

## 5) 用語運用ルール

- 新用語を追加するときは「定義 / 使いどころ / 関連リンク」を同時に記載する。
- 同義語がある場合は主語彙を1つ決め、他はエイリアスとして明記する。
- プロジェクト固有表現は `04-Projects` に置き、再利用可能な定義だけ本ページへ昇格する。

## 6) 変更履歴

| 日付 | 版 | 変更内容 | 作成者 |
| --- | --- | --- | --- |
| 2026-02-26 | v1 | 初版作成（コア概念 / 安全 / 評価） |  |
