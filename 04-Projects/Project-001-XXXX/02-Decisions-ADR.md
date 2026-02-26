# 意思決定記録（ADR）

## 1) 使い方

- 重要な設計判断を 1 件ずつ記録する。
- 判断理由と代替案を必ず残す。
- 再利用価値がある場合は `01-Clouds` または `02-Shared` へ昇格する。

## 2) ステータス定義

- proposed: 提案中
- accepted: 承認済み
- rejected: 却下
- superseded: 後続ADRに置換済み

## 3) ADR一覧

| ADR ID | タイトル | 状態 | 日付 | 担当 | Supersedes | Superseded By |
| --- | --- | --- | --- | --- | --- | --- |
| ADR-001 |  | proposed |  |  |  |  |

## 4) ADRテンプレート

```md
### ADR-XXX: <短いタイトル>

- Status: proposed | accepted | rejected | superseded
- Date:
- Owner:
- Decision Type: architecture | security | integration | data | release | process
- Scope: project-only | reusable-knowledge

#### Context

<解決したい課題、制約、前提>

#### Options Considered

1) Option A
2) Option B
3) Option C

#### Decision

<採用案と採用理由>

#### Consequences

- Positive:
- Negative / Tradeoffs:
- Operational impact:

#### Links

- Project artifact:
- Cloud knowledge link (01-Clouds/...):
- Shared knowledge link (02-Shared/...):
- Role playbook link (03-Roles/...):

#### Follow-up Actions

- [ ] Action 1
- [ ] Action 2
```

## 5) ADR記録

### ADR-001: TBD

- Status: proposed
- Date:
- Owner:
- Decision Type:
- Scope: project-only

#### Context


#### Options Considered

1)
2)
3)

#### Decision


#### Consequences

- Positive:
- Negative / Tradeoffs:
- Operational impact:

#### Links

- Project artifact:
- Cloud knowledge link (01-Clouds/...):
- Shared knowledge link (02-Shared/...):
- Role playbook link (03-Roles/...):

#### Follow-up Actions

- [ ]

## 6) 昇格管理（Project -> KB）

| ADR ID | 昇格要否 | 昇格先 | 状態 | 逆リンク |
| --- | --- | --- | --- | --- |
| ADR-001 | no |  | todo | no |
