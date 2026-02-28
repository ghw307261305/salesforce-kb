# 第8章 测试策略与评测数据集

- 版本: v1
- 最后更新: 2026-02-28
- 章节定位: 交付质量核心
- 预计学习时长: 150-180 分钟

## Summary

本章目标是把 Agentforce 测试从“手工点点看”升级为“可重复、可量化、可回归”的工程体系。

完成本章后，学习者应能:

1. 设计分层测试策略（Prompt、Action、E2E、回归、安全）。
2. 构建可复用的 Eval Dataset。
3. 用质量门禁判定 Go/No-Go。

## Decision / Changes

1. 采用五层测试模型：L1 Prompt、L2 Action、L3 E2E、L4 回归、L5 Red Team。
2. 将“失败样本回灌”定义为发布后必做项。
3. 所有发布门禁统一指标口径，避免团队各自定义。

## 1. 学习目标

### 1.1 知识目标

1. 理解 Agentforce 测试层级与职责边界。
2. 理解 Eval Dataset 的结构化设计与生命周期管理。
3. 理解缺陷分级、SLA 与发布门禁关系。

### 1.2 技能目标

1. 能输出测试矩阵并覆盖关键业务路径。
2. 能编制可机检的评测数据集（含预期结果）。
3. 能根据门禁指标做发布决策。

### 1.3 交付目标

1. 一份测试策略文档。
2. 一份 Eval Dataset schema 与样例集。
3. 一份测试报告模板与缺陷分级标准。

## 2. 前置知识

1. 第3章 Prompt 分层与会话设计。
2. 第4章 Topic 路由策略。
3. 第5章 Action 契约设计。

## 3. 测试分层模型

| 层级 | 目标 | 代表测试 | 执行频率 |
| --- | --- | --- | --- |
| L1 Prompt/Rule | 验证指令层级与输出合同 | Prompt Unit | 每次变更 |
| L2 Action Integration | 验证接口契约与权限 | Integration | 每日 |
| L3 E2E Conversation | 验证真实业务流程 | E2E Scenarios | 发布前 |
| L4 Eval Regression | 防止历史缺陷复发 | Dataset Regression | 发布前后 |
| L5 Safety/Red Team | 验证越权与滥用防护 | Abuse Tests | 每月 |

## 4. 测试分类与样例

### 4.1 功能测试

1. 意图识别是否正确。
2. Slot 收集是否完整。
3. Action 是否按契约执行。
4. 输出结构是否符合合同。

### 4.2 安全测试

1. 禁止请求是否被拒绝。
2. 权限不足是否正确回退。
3. 敏感数据是否脱敏。

### 4.3 异常与稳定性测试

1. 下游超时重试是否生效。
2. 部分失败是否正确降级。
3. 人工接管是否可触发并保留上下文。

## 5. Eval Dataset 设计

### 5.1 数据集结构

```csv
case_id,category,input,context,expected_topic,expected_action,expected_output,expected_status
EVAL-0001,functional,"Where is my case status?",case_id=500xx...,case_status,GetCaseStatus,status=InProgress,pass
```

### 5.2 样本分布建议

| 类型 | 比例 |
| --- | --- |
| 正常样例 | 50% |
| 边界样例 | 20% |
| 异常样例 | 15% |
| 安全样例 | 15% |

### 5.3 数据集治理规则

1. 使用固定 ID（`EVAL-XXXX`）。
2. 每条样例必须有可验证预期。
3. 线上事故样本需在 1 周内回灌。

## 6. 发布门禁与缺陷治理

### 6.1 Go/No-Go 门禁

1. Blocker/High 缺陷 = 0
2. 安全 P0 = 0
3. 必测通过率 >= 95%
4. Hallucination <= 2%
5. p95 延迟 <= 8s

### 6.2 缺陷分级与SLA

| 等级 | 示例 | SLA |
| --- | --- | --- |
| P0 | 越权数据泄露 | 1小时内缓解 |
| P1 | 关键路径不可用 | 4小时内修复方案 |
| P2 | 质量下降可绕行 | 2工作日 |
| P3 | 文案或体验问题 | 1周 |

## 7. 实操练习（必做 + 可选）

### 7.1 必做练习: 构建一套测试与评测包

任务:

1. 为一个 Agent 场景设计 30 条测试样例。
2. 覆盖 4 类样本（正常/边界/异常/安全）。
3. 输出测试报告并给出发布结论。

预期结果: 可直接用于发布评审。

### 7.2 可选练习: 失败样本回灌演练

任务:

1. 选取 5 条历史失败日志。
2. 设计回灌样例并重跑回归。
3. 比较回灌前后通过率变化。

预期结果: 输出回归优化报告。

## 8. 常见错误与排障

| 问题 | 现象 | 修正建议 |
| --- | --- | --- |
| 只测 happy path | 生产故障频发 | 增加异常和安全样例 |
| 测试结果不可复现 | 团队结论不一致 | 固化数据集与预期 |
| 缺陷无等级 | 修复优先级混乱 | 建立 P0-P3 标准 |
| 回归集长期不更新 | 同类问题反复出现 | 强制事故回灌 |

## 9. 练习题

### 9.1 选择题

1. Eval Dataset 最核心价值是：
   - A. 美化报告
   - B. 可重复验证行为
   - C. 减少日志
   - D. 减少章节数
2. 下列哪项属于发布门禁指标？
   - A. 目录命名
   - B. Hallucination Rate
   - C. 字体大小
   - D. 页面颜色
3. 线上失败样本最佳处理方式是：
   - A. 删除日志
   - B. 仅口头复盘
   - C. 回灌到评测集并回归
   - D. 忽略

答案：1-B，2-B，3-C。

### 9.2 实作题

题目：为“售后助手”设计一版测试与评测计划，至少包含：

1. 20条测试样例。
2. 5项门禁指标。
3. 1份缺陷分级与 SLA 表。

评分参考：

1. 覆盖完整度（40分）
2. 可执行性（40分）
3. 指标清晰度（20分）

## 10. 验收标准（章节通过条件）

1. 输出完整测试策略和数据集 schema。
2. 必测场景通过率 >= 95%。
3. 练习题得分 >= 80 分。

## 11. 参考资料

1. [../02-Build-HowTo/Testing/Test-Strategy.md](../02-Build-HowTo/Testing/Test-Strategy.md)
2. [../02-Build-HowTo/Testing/Eval-Datasets.md](../02-Build-HowTo/Testing/Eval-Datasets.md)
3. [../08-Samples/Case-001-SDR-Lead-Nurturing/04-Test-Cases-and-Dataset.md](../08-Samples/Case-001-SDR-Lead-Nurturing/04-Test-Cases-and-Dataset.md)
4. [../02-Build-HowTo/Deployment/Release-Checklist.md](../02-Build-HowTo/Deployment/Release-Checklist.md)

## 12. 版本敏感假设

1. Testing Center 功能与导入格式可能随版本变化。
2. 评分阈值应按业务风险等级微调。

## Risks / Known Issues

1. 若测试数据与生产数据差异过大，结论会失真。
2. 若门禁指标未被强制执行，质量体系会失效。
3. 大规模回归执行成本可能上升，需要分层抽样优化。

## Next Steps

1. 进入第9章，构建可观测与故障排查体系。
2. 把本章数据集接入 CI/CD 自动回归。
3. 建立每周测试与缺陷趋势报告机制。
