---
title: 集智AI 操作手册
description: 一个地址、一个密钥，使用全部已接入的大模型
template: splash
hero:
  tagline: 把多家上游大模型聚合到统一 API 之后，客户端只需要一个地址和一个密钥，即可使用全部已接入的模型。
  actions:
    - text: 获取 API 密钥
      link: 01-api-key/
      icon: right-arrow
      variant: primary
    - text: 客户端配置
      link: 02-clients/
      icon: right-arrow
sidebar:
  order: 0
---

## 入口地址

| 入口 | 地址 |
| --- | --- |
| 控制台（注册、创建密钥、查用量） | <https://th.jimei.cn> |
| API 地址（OpenAI 兼容客户端） | `https://th.jimei.cn/v1` |
| API 地址（Anthropic 协议客户端，如 Claude Code） | `https://th.jimei.cn` |

## 三步上手

1. 登录[控制台](https://th.jimei.cn)，在「API 密钥」页创建一个密钥并**立即复制**（只显示一次）；
2. 打开 [第 2 章](02-clients/)，把地址和密钥填进你正在用的客户端；
3. 用 [第 3 章](03-api/)的示例发起第一次对话。

:::caution[密钥安全]
密钥等同于账户密码：不要提交进代码仓库、不要截图外发。怀疑泄露时，先在控制台**禁用**该密钥。
:::
