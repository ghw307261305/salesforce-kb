# LWC 调试、测试与性能优化知识整理

- 版本: v1
- 最后更新: 2026-02-26
- 主要来源: debug / testing / perf 官方文档

## Summary

LWC 质量保障可分三块：

1. `Debug`：快速定位渲染、事件、数据绑定问题。
2. `Testing`：单元测试与行为回归（Jest 为主）。
3. `Performance`：减少不必要重渲染与数据往返，优化加载与交互响应。

## Decision / Changes

1. 新建一份面向工程实践的“质量三件套”文档。
2. 将调试、测试、性能从零散知识整理为统一流程。
3. 明确每次发布前最低质量检查项。

## 1. 调试（Debug）实践

1. 先定位“数据是否正确”，再定位“UI 为什么不对”。
2. 对事件链路做断点与日志追踪，确认冒泡/派发顺序。
3. 对复杂组件拆小问题域，避免一次调试过多变量。

## 2. 测试（Testing）实践

1. 组件测试优先覆盖：
   - 输入属性变化
   - 关键事件派发
   - 数据加载成功/失败分支
2. 对外部依赖（wire/Apex）使用 mock。
3. 把高风险交互场景加入回归集合。

## 3. 性能（Performance）实践

1. 减少重复渲染与无效状态更新。
2. 优先使用平台数据能力，避免过多自定义网络往返。
3. 大列表与复杂视图要关注首屏加载与交互延迟。

## 4. 发布前最小质量门槛（建议）

1. 核心组件单测通过。
2. 关键页面无阻塞级性能问题。
3. 关键交互路径有回归记录。
4. 线上错误监控与日志可用。

## Risks / Known Issues

1. 没有测试只靠手工验证，回归风险高。
2. 性能问题常在数据规模扩大后才暴露，需提前压测。
3. 调试阶段若缺少统一日志规范，定位成本会显著上升。

## Next Steps

1. 在团队中固定 LWC 调试与测试模板。
2. 把关键页面性能指标纳入发布门槛。
3. 建立“缺陷 -> 测试用例补齐”的闭环机制。

## Sources

1. https://developer.salesforce.com/docs/platform/lwc/guide/debug-intro.html
2. https://developer.salesforce.com/docs/platform/lwc/guide/testing.html
3. https://developer.salesforce.com/docs/platform/lwc/guide/perf-intro.html
