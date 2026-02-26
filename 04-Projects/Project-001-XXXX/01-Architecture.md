# アーキテクチャ

## 1) 対象範囲と目的

- 業務目的:
- 対象機能:
- 非対象機能:
- 非機能要件（可用性 / 性能 / セキュリティ）:

## 2) クラウド構成マップ

| Cloud | 機能 | 主要コンポーネント | 参照リンク |
| --- | --- | --- | --- |
| Sales Cloud |  |  | [01-Clouds/Sales-Cloud](../../01-Clouds/Sales-Cloud/00-Index.md) |
| Service Cloud |  |  | [01-Clouds/Service-Cloud](../../01-Clouds/Service-Cloud/00-Index.md) |
| Experience Cloud |  |  | [01-Clouds/Experience-Cloud](../../01-Clouds/Experience-Cloud/00-Index.md) |
| Data Cloud |  |  | [01-Clouds/Data-Cloud](../../01-Clouds/Data-Cloud/00-Index.md) |
| Agentforce |  |  | [01-Clouds/Agentforce](../../01-Clouds/Agentforce/00-Index.md) |
| Platform Core |  |  | [01-Clouds/Platform-Core](../../01-Clouds/Platform-Core/00-Index.md) |

## 3) 共通依存マップ

| ドメイン | 利用内容 | リンク |
| --- | --- | --- |
| Security / IAM |  | [02-Shared/Security-IAM](../../02-Shared/Security-IAM) |
| Data Modeling |  | [02-Shared/Data-Modeling](../../02-Shared/Data-Modeling) |
| Automation / Flow |  | [02-Shared/Automation-Flow](../../02-Shared/Automation-Flow) |
| Dev Apex |  | [02-Shared/Dev-Apex](../../02-Shared/Dev-Apex) |
| Dev LWC |  | [02-Shared/Dev-LWC](../../02-Shared/Dev-LWC) |
| Integration |  | [02-Shared/Integration](../../02-Shared/Integration) |
| DevOps / Release |  | [02-Shared/DevOps-Release](../../02-Shared/DevOps-Release) |
| Performance / Observability |  | [02-Shared/Performance-Observability](../../02-Shared/Performance-Observability) |
| Testing / Quality |  | [02-Shared/Testing-Quality](../../02-Shared/Testing-Quality) |

## 4) コンポーネント設計

| コンポーネント | 種別 | 担当 | 役割 | インターフェース |
| --- | --- | --- | --- | --- |
|  | Flow |  |  |  |
|  | Apex |  |  |  |
|  | LWC |  |  |  |
|  | External API |  |  |  |

## 5) データ / 連携設計

### 主要データ

| オブジェクト / エンティティ | 用途 | Source of Truth | 備考 |
| --- | --- | --- | --- |
|  |  |  |  |

### 連携契約

| I/F | 方向 | プロトコル | リトライ / タイムアウト | エラー処理 |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## 6) セキュリティ・監査

- 認証 / 認可モデル:
- アクセス制御（CRUD/FLS/Sharing）:
- 機微情報取り扱い:
- 監査ログ方針:

## 7) 可観測性 / 運用

- ログ / トレース方針:
- KPI / SLO:
- アラートとRunbook:

## 8) リスクとトレードオフ

| 領域 | 採用案 | トレードオフ | 緩和策 |
| --- | --- | --- | --- |
|  |  |  |  |

## 9) 図面リンク

- システム構成図:
- 連携シーケンス図:
- データモデル図:

## 10) 参照関係

- [00-Overview.md](./00-Overview.md)
- [02-Decisions-ADR.md](./02-Decisions-ADR.md)
- [03-Runbook.md](./03-Runbook.md)
