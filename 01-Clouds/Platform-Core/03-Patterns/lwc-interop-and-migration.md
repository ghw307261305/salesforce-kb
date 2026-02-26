# LWC 互操作与迁移模式

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: lightning-out / interop / migrate 官方文档

## Summary

官方文档给出的互操作与迁移主线是：

1. 在 Salesforce 内部进行 Aura 与 LWC 互操作。
2. 在外部容器中使用 Lightning Out（适用时）。
3. 从 Aura 迁移到 LWC，采用渐进式替换策略。

## Decision / Changes

1. 将互操作与迁移方案统一为一份模式文档。
2. 强调“渐进迁移 + 双栈共存”的现实路径。
3. 在外部嵌入场景加入边界与风险提示。

## 1. 互操作策略

### 1.1 Aura 与 LWC 共存

1. 在保留存量 Aura 的前提下，新增优先 LWC。
2. 用清晰组件边界控制依赖方向。
3. 先替换高价值、低耦合组件，再推进核心模块。

### 1.2 Lightning Out 场景

1. 用于将 Lightning 组件嵌入到 Salesforce 外部页面。
2. 需要特别关注会话、鉴权与资源加载策略。
3. 对外嵌入时优先评估是否有更现代且受支持的替代方案。

## 2. 迁移路径（Aura -> LWC）

1. 先做资产盘点（组件复杂度、依赖、业务关键度）。
2. 划分批次：低风险组件先迁移。
3. 建立兼容层：事件、数据契约保持稳定。
4. 每批次都做回归（功能、性能、安全）。
5. 迁移后清理遗留依赖，避免长期双栈负担。

## 3. 迁移优先级建议

| 优先级 | 特征 |
| --- | --- |
| 高 | 页面核心路径、交互频繁、维护痛点明显 |
| 中 | 独立组件、依赖可控 |
| 低 | 强耦合旧框架、改造收益不明显 |

## Risks / Known Issues

1. 一次性“全量迁移”风险高，建议分批推进。
2. 互操作期间若契约不稳定，容易出现隐性回归。
3. 外部嵌入场景若鉴权边界不清，可能引入安全问题。

## Next Steps

1. 生成 Aura 资产迁移清单（复杂度/风险/收益）。
2. 选择 1-2 个低风险页面做试点迁移。
3. 建立迁移 KPI（缺陷率、渲染性能、交付效率）。

## Sources

1. https://developer.salesforce.com/docs/platform/lwc/guide/lightning-out-intro.html
2. https://developer.salesforce.com/docs/platform/lwc/guide/interop-intro.html
3. https://developer.salesforce.com/docs/platform/lwc/guide/migrate-introduction.html
