# Agentforce 学员作业包（使用说明）

- 版本: v1
- 最后更新: 2026-02-28
- 适用对象: 学员、助教、讲师

## Summary

本文件定义学员作业包的结构、提交流程、评分口径和时间节奏。  
目标是让作业“可提交、可批改、可复盘”。

## Decision / Changes

1. 作业按三层组织：章节作业、阶段实验、毕业项目。
2. 统一使用模板提交，避免格式差异导致评分噪音。
3. 引入互评与复盘模板，提升学习闭环质量。

## 1. 作业包结构

| 层级 | 周期 | 目标 | 模板 |
| --- | --- | --- | --- |
| Chapter Assignment | 每章 | 巩固核心知识点 | `templates/chapter-assignment-template.md` |
| Lab Assignment | 每2-3章 | 组合实操能力 | `templates/lab-report-template.md` |
| Peer Review | 每阶段 | 训练评审能力 | `templates/peer-review-template.md` |
| Capstone | 结课 | 综合交付能力 | `templates/capstone-submission-template.md` |

## 2. 交付与命名规范

1. 文件命名：`<chapter-or-lab>-<name>-<date>.md`
2. 附件命名：`evidence-<id>.png/pdf`
3. 每份作业必须附“证据链接”与“自评结论”。

## 3. 提交流程

1. 学员提交作业模板 + 证据。
2. 助教初审格式与完整性。
3. 讲师按 rubric 打分。
4. 学员在 72 小时内完成一次修订（可选）。

## 4. 评分口径（建议）

| 维度 | 权重 |
| --- | --- |
| 完整性 | 25% |
| 正确性 | 35% |
| 可执行性 | 25% |
| 表达与复盘 | 15% |

## 5. 关键时间点（建议）

| 阶段 | 时间 |
| --- | --- |
| 章节作业提交 | 课程后 48 小时 |
| 实验作业提交 | 阶段结束后 72 小时 |
| 毕业项目提交 | 结课前 3 天 |
| 答辩 | 结课周 |

## 6. 模板清单

1. [chapter-assignment-template.md](./templates/chapter-assignment-template.md)
2. [lab-report-template.md](./templates/lab-report-template.md)
3. [peer-review-template.md](./templates/peer-review-template.md)
4. [capstone-submission-template.md](./templates/capstone-submission-template.md)
5. [grading-sheet-template.md](./templates/grading-sheet-template.md)

## Risks / Known Issues

1. 若无统一命名和模板，批改成本会明显上升。
2. 若证据要求不明确，分数可信度会下降。
3. 若没有修订机制，学习闭环会不完整。

## Next Steps

1. 助教按本指南初始化课程作业目录。
2. 讲师在首节课演示一次“标准提交样例”。
3. 结课后根据评分分布优化模板字段。
