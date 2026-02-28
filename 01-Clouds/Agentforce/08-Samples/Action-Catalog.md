# Action-Catalog

## Available Action Contracts

1. [Case-001-SDR-Lead-Nurturing/02-Action-Contracts.md](./Case-001-SDR-Lead-Nurturing/02-Action-Contracts.md)

## Design Rules

1. 读取动作与写入动作分离，便于审计和回滚。
2. 每个动作必须定义输入校验、错误映射和超时预算。
3. 高风险动作必须显式鉴权与人工接管出口。
