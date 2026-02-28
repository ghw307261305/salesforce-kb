# 第11章 实战案例：SDR Lead Nurturing 全流程交付

- 版本: v1
- 最后更新: 2026-02-28
- 章节定位: 综合实战
- 预计学习时长: 180-240 分钟

## Summary

本章将前10章方法落到一个完整案例：`SDR Lead Nurturing Agent`。  
学习者将按真实交付节奏完成从设计到上线的闭环。

完成本章后，学习者应能:

1. 独立搭建一个可运行 Agent 方案。
2. 输出完整交付文档包（Topic/Action/Prompt/测试/发布）。
3. 通过上线门禁并给出运营优化计划。

## Decision / Changes

1. 采用仓库现成案例包作为基础，避免空白启动。
2. 交付物按“评审顺序”组织，便于教学验收。
3. 对每阶段定义强制产物和通过标准。

## 1. 学习目标

### 1.1 知识目标

1. 理解案例中每个设计决策的原因与权衡。
2. 理解 Sales 场景下的自动化触达与合规边界。
3. 理解案例发布后的运营监控与优化逻辑。

### 1.2 技能目标

1. 能完成 Topic/Action/Prompt 三件套设计。
2. 能完成端到端测试与发布检查。
3. 能根据指标提出优化建议。

### 1.3 交付目标

1. 一套可审查的案例交付包。
2. 一份上线评审记录与签字结论。
3. 一份上线后30天优化计划。

## 2. 前置知识

1. 第1-10章全部内容。
2. Sandbox 环境与基础权限。
3. 可用测试数据（Lead/Contact/邮件场景）。

## 3. 案例背景与范围

### 3.1 业务目标

1. 自动完成首封外呼与跟进。
2. 对潜客回复进行分类并执行对应动作。
3. 提升会议转化并控制退订与误触达风险。

### 3.2 In Scope

1. Email 渠道线索培育。
2. OOTB Topic 扩展与 Prompt 调优。
3. Testing Center 批量回归与发布验证。

### 3.3 Out of Scope

1. 电话与社媒渠道编排。
2. 法务条款自动承诺。
3. 大规模多语种深度本地化。

## 4. 交付物清单（使用现有案例包）

| 交付物 | 路径 |
| --- | --- |
| 案例总览 | [README.md](../08-Samples/Case-001-SDR-Lead-Nurturing/README.md) |
| Topic 设计 | [01-Topic-Design.md](../08-Samples/Case-001-SDR-Lead-Nurturing/01-Topic-Design.md) |
| Action 契约 | [02-Action-Contracts.md](../08-Samples/Case-001-SDR-Lead-Nurturing/02-Action-Contracts.md) |
| Prompt 模板 | [03-Prompt-Template.md](../08-Samples/Case-001-SDR-Lead-Nurturing/03-Prompt-Template.md) |
| 测试数据集 | [04-Test-Cases-and-Dataset.md](../08-Samples/Case-001-SDR-Lead-Nurturing/04-Test-Cases-and-Dataset.md) |
| 上线检查表 | [05-GoLive-Checklist.md](../08-Samples/Case-001-SDR-Lead-Nurturing/05-GoLive-Checklist.md) |

## 5. 实施阶段与验收

### 5.1 Phase A: 方案设计

任务:

1. 校准 Topic 边界与 handoff 条件。
2. 对齐 Action 输入输出和错误映射。
3. 确认 Prompt 锁定区块。

通过标准:

1. 文档评审通过率 100%。
2. 无未闭合高风险项。

### 5.2 Phase B: 构建与联调

任务:

1. 在 Agent Builder 配置 Topic/Action/Prompt。
2. 绑定数据、邮箱和必要连接。
3. 完成基础联调。

通过标准:

1. 核心路径可运行。
2. 权限校验通过。

### 5.3 Phase C: 测试与发布

任务:

1. 执行 Preview、批量回归、E2E。
2. 完成 Go/No-Go 评审。
3. 执行发布并做24小时观察。

通过标准:

1. 门禁指标满足。
2. 发布后无P0/P1事故。

## 6. 案例指标与目标值

| 指标 | 目标 |
| --- | --- |
| Reply Rate | >= 18% |
| Meeting Request Rate | >= 6% |
| Opt-Out Rate | <= 3% |
| Hallucination Rate | <= 2% |
| p95 Latency | <= 8s |

## 7. 常见问题与优化方向

| 问题 | 现象 | 优化动作 |
| --- | --- | --- |
| 误路由 | 回复分类错误 | 补充训练样例 + 优化路由阈值 |
| 无依据回答 | 质量波动 | 强化 Data Source 质量与引用约束 |
| 发送失败 | 邮箱/权限配置异常 | 校验身份链路与权限集 |
| 转人工过高 | 自动处理能力不足 | 优化 Prompt 与 Action 覆盖 |

## 8. 实操练习（必做 + 可选）

### 8.1 必做练习: 交付一次完整案例

任务:

1. 基于案例包完成一次端到端部署。
2. 输出发布评审纪要。
3. 输出上线后优化清单（至少5项）。

预期结果: 可作为项目模板复用。

### 8.2 可选练习: 对照组实验

任务:

1. 对比“OOTB-only”与“定制版本”。
2. 统计两组关键指标差异。
3. 给出 ROI 结论。

预期结果: 输出优化投入优先级建议。

## 9. 练习题

### 9.1 选择题

1. 案例交付中最先应完成的是：
   - A. 发布签字
   - B. 方案设计评审
   - C. 线上监控
   - D. 复盘会议
2. 下列哪项属于发布前门禁？
   - A. Reply Rate 月环比
   - B. 必测通过率 >= 95%
   - C. 季度ROI报告
   - D. 年度预算
3. 如果转人工率异常升高，应优先检查：
   - A. 主题配色
   - B. Topic/Prompt/Action 覆盖与阈值
   - C. 目录结构
   - D. 文档字体

答案：1-B，2-B，3-B。

### 9.2 实作题

题目：为该案例输出一版“上线后30天优化计划”，至少包含：

1. 5个优化动作。
2. 每个动作的目标指标与owner。
3. 1个风险项与缓解策略。

评分参考：

1. 可执行性（40分）
2. 指标清晰度（30分）
3. 风险意识（30分）

## 10. 验收标准（章节通过条件）

1. 完整交付包提交并通过评审。
2. 发布门禁全通过并有证据。
3. 练习题得分 >= 80 分。

## 11. 参考资料

1. [../08-Samples/Case-001-SDR-Lead-Nurturing/README.md](../08-Samples/Case-001-SDR-Lead-Nurturing/README.md)
2. [../02-Build-HowTo/Setup/agentforce-for-sales-implementation-guide.md](../02-Build-HowTo/Setup/agentforce-for-sales-implementation-guide.md)
3. [../02-Build-HowTo/Deployment/Release-Checklist.md](../02-Build-HowTo/Deployment/Release-Checklist.md)
4. [../05-Observability/Metrics-KPIs.md](../05-Observability/Metrics-KPIs.md)

## 12. 版本敏感假设

1. SDR 场景默认依赖 Email 链路与相关许可能力。
2. 不同 org 的权限与对象配置会影响案例可运行性。

## Risks / Known Issues

1. 案例若不结合企业真实数据，指标参考价值有限。
2. 单案例成功不代表多场景可复制，需要治理机制支持。
3. 外部依赖不稳定时会影响案例体验评估。

## Next Steps

1. 进入第12章，完成毕业项目与评分。
2. 将本章案例沉淀为团队 onboarding 标准项目。
3. 每月复盘案例指标并持续优化。
