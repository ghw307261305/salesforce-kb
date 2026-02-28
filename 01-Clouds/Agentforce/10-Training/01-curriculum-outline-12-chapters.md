# Agentforce 开发教材规划（12章）

- 版本: v1
- 最后更新: 2026-02-28
- 语言: 中文
- 目标读者: Admin、开发者、架构师、实施顾问

## Summary

本教材面向“能上线、可治理、可演进”的 Agentforce 实战能力建设。课程按照 `认知 -> 设计 -> 开发 -> 测试 -> 发布 -> 运营` 的路径组织，共 12 章，包含实操与验收标准，可直接用于企业内训或项目 onboarding。

## Decision / Changes

1. 采用“三篇十二章”结构，兼顾入门与交付深度。
2. 每章固定模板，减少写作风格漂移并提升复用性。
3. 引入“章节级可量化验收标准”，避免只讲概念不落地。

## 1. 教学目标与能力地图

| 层级 | 能力目标 | 对应章节 |
| --- | --- | --- |
| L1 基础 | 理解 Agentforce 核心概念、架构和术语 | 1-3 |
| L2 开发 | 能完成 Topic/Action/Prompt 的设计与实现 | 4-7 |
| L3 交付 | 能完成测试、上线、监控和迭代治理 | 8-12 |

## 2. 教材结构（三篇十二章）

### 篇一: 基础认知

| 章 | 章节名 | 产出物 |
| --- | --- | --- |
| 第1章 | Agentforce 架构与术语 | 架构图 + 术语卡 |
| 第2章 | 前置条件与权限模型 | readiness matrix + 权限草案 |
| 第3章 | Prompt 分层与会话设计 | Prompt skeleton + 会话状态图 |

### 篇二: 开发实现

| 章 | 章节名 | 产出物 |
| --- | --- | --- |
| 第4章 | Topic 设计与路由策略 | Topic 设计文档 |
| 第5章 | Action 契约设计（Flow/Apex/API） | Action contract 清单 |
| 第6章 | Data Cloud 与 RAG 接地 | 数据接地方案 |
| 第7章 | 集成与身份（OAuth/外部系统） | 集成序列图 + 鉴权说明 |

### 篇三: 交付运营

| 章 | 章节名 | 产出物 |
| --- | --- | --- |
| 第8章 | 测试策略与评测数据集 | 测试矩阵 + CSV schema |
| 第9章 | 可观测性与故障排查 | KPI 面板 + 排障流程 |
| 第10章 | 发布管理与回滚策略 | go-live checklist |
| 第11章 | 实战案例: SDR Lead Nurturing | 完整案例包 |
| 第12章 | 毕业项目与评分标准 | rubric + 答辩清单 |

## 3. 每章固定模板（写作规范）

1. 学习目标（知识/技能/交付结果）
2. 前置知识
3. 核心概念（图、表、术语）
4. 实操步骤（必做/可选 + 预期结果）
5. 常见错误与排障
6. 练习题（选择题 + 实作题）
7. 验收标准（可量化）
8. `Risks / Known Issues`
9. `Next Steps`

## 4. 教学节奏（建议 8 周）

| 周次 | 重点章节 | 交付里程碑 |
| --- | --- | --- |
| W1 | 第1-2章 | 完成术语与前置检查样章 |
| W2 | 第3-4章 | 完成 Prompt/Topic 设计样章 |
| W3 | 第5章 | 完成 Action 契约样章 |
| W4 | 第6-7章 | 完成 RAG 与集成样章 |
| W5 | 第8章 | 完成测试矩阵与数据集模板 |
| W6 | 第9-10章 | 完成监控与发布章节 |
| W7 | 第11章 | 完成完整实战案例 |
| W8 | 第12章 | 完成毕业项目与评分标准 |

## 5. 质量门禁

| 维度 | 门禁 |
| --- | --- |
| 可复现性 | 实操步骤在 Sandbox 可完整跑通 |
| 可验证性 | 每章至少 3 条验收标准可打分 |
| 安全性 | 权限边界、PII、拒绝策略明确 |
| 版本敏感性 | 菜单/权限名变化有假设说明 |

## 6. 素材复用清单（本仓库）

1. [../02-Build-HowTo/Setup/Agentforce-Implementation-Runbook.md](../02-Build-HowTo/Setup/Agentforce-Implementation-Runbook.md)
2. [../02-Build-HowTo/Deployment/Release-Checklist.md](../02-Build-HowTo/Deployment/Release-Checklist.md)
3. [../../../03-Roles/Admin/02-Deliverables/Profile-PermissionSet-Matrix.md](../../../03-Roles/Admin/02-Deliverables/Profile-PermissionSet-Matrix.md)
4. [../03-Prompting/Prompt-Structure-v1.md](../03-Prompting/Prompt-Structure-v1.md)
5. [../08-Samples/Case-001-SDR-Lead-Nurturing/README.md](../08-Samples/Case-001-SDR-Lead-Nurturing/README.md)

## Risks / Known Issues

1. Agentforce 与 Data Cloud 功能菜单可能随版本变化，教材截图需要周期更新。
2. 不同 org 的权限集命名差异较大，示例名称需标注为“参考名”。
3. 实操章节如果缺少最小可运行数据集，学习者容易卡在环境准备阶段。

## Next Steps

1. 继续完成第2章初稿（前置条件与权限模型）。
2. 为第1-3章补充统一的配图风格与术语双语卡片。
3. 建立教材变更日志，按月同步平台变化。
