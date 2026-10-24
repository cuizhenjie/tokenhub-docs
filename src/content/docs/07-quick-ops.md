---
title: 7. 高频操作速查
description: 控制台路径 + 一行命令：查余额、充值、日志排查、密钥管理、查价格、切模型
sidebar:
  order: 7
---

日常最常做的几件事，控制台怎么点、命令怎么敲，一张表说清。详细说明见各链接章节。

## 速查表

| 我要… | 控制台操作 | API / 命令 |
| --- | --- | --- |
| 查余额 | **钱包** | 见下方[余额查询命令](#余额查询命令) |
| 充值 | **钱包 → 充值** | — |
| 用兑换码入账 | **兑换码** 页输入兑换 | — |
| 创建新密钥 | **API 密钥 → 创建**（详见[第 1 章](../01-api-key/)） | — |
| 临时停用某个密钥 | **API 密钥 → 禁用**（客户端立即 401） | — |
| 限制密钥能用的模型 / IP | **API 密钥 → 编辑 → 模型限制 / IP 白名单** | — |
| 排查一次失败调用 | **使用日志**：按时间/模型过滤，看状态与失败原因 | — |
| 看某个模型多少钱 | **模型广场 / 模型定价** | — |
| 看当前可用模型 | **模型广场** | `curl /v1/models`（见下） |
| 验证密钥可用 | — | 一句话对话测试（见下） |

## 常用一行命令

先设置密钥环境变量（下文直接引用）：

```bash
export JIZHI_API_KEY=sk-xxxxxxxx
```

**列出可用模型**（模型名以此为准）：

```bash
curl --fail-with-body https://th.3cool.cc/v1/models \
  -H "Authorization: Bearer ${JIZHI_API_KEY}"
```

**一句话连通性测试**（正常返回即接入成功）：

```bash
curl --fail-with-body https://th.3cool.cc/v1/chat/completions \
  -H "Authorization: Bearer ${JIZHI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{"model": "你的模型名", "messages": [{"role": "user", "content": "你好"}]}'
```

### 余额查询命令

```bash
# 总额度（hard_limit_usd，美元）
curl --fail-with-body https://th.3cool.cc/v1/dashboard/billing/subscription \
  -H "Authorization: Bearer ${JIZHI_API_KEY}"

# 已用额度（total_usage，单位为美分，除以 100 即美元）
curl --fail-with-body "https://th.3cool.cc/v1/dashboard/billing/usage" \
  -H "Authorization: Bearer ${JIZHI_API_KEY}"
```

> 余额接口需要密钥开启 **允许查询用户额度**（默认开启，见[第 1 章](../01-api-key/)）；两个接口的口径说明见[第 4 章](../04-quota-usage/)。

## 切换模型

| 客户端 | 操作 |
| --- | --- |
| Claude Code | 会话内 `/model` 选择；或环境变量 `ANTHROPIC_MODEL` 固定 |
| Cursor | **Settings → Models → Add model**，填入与 `/v1/models` 一致的模型名 |
| Cherry Studio / ChatBox / LobeChat | 在对应服务商下添加模型，模型 ID 逐字一致 |
| SDK 调用 | 改 `model` 参数即可，地址与密钥不变 |

模型名填错会报「无可用渠道」，先 `curl /v1/models` 核对（报错排查见[第 5 章](../05-faq/)）。

## 每月 / 每周例行检查

1. **钱包**看余额趋势，避免关键任务中途欠费；
2. **使用日志**扫一眼失败率，异常升高早发现（渠道故障、密钥泄露都体现在这里）；
3. 长期不用的密钥 **禁用或删除**，按用途保留最小集合；
4. 在用密钥设了过期时间的，提前轮换避免线上断供。
