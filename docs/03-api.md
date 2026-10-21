# 3. 接口调用

## 认证方式

所有请求携带 `Authorization: Bearer sk-xxxxxxxx`；Anthropic 协议端点同时接受 `x-api-key` 请求头。

```bash
export JIZHI_API_KEY=sk-xxxxxxxx   # 下文示例直接引用
```

## 端点列表

| 协议 | 端点 |
| --- | --- |
| 模型列表 | `GET /v1/models` |
| OpenAI 对话 | `POST /v1/chat/completions` |
| OpenAI Responses | `POST /v1/responses` |
| Anthropic Messages | `POST /v1/messages` |
| Gemini 原生 | `POST /v1beta/models/{model}:generateContent`、`POST /v1beta/models/{model}:streamGenerateContent` |
| 向量 / 重排 | `POST /v1/embeddings`、`POST /v1/rerank` |
| 图像 | `POST /v1/images/generations`、`POST /v1/images/edits` |
| 音频 | `POST /v1/audio/speech`、`POST /v1/audio/transcriptions`、`POST /v1/audio/translations` |
| 额度查询 | `GET /v1/dashboard/billing/subscription`（总额度）、`GET /v1/dashboard/billing/usage`（已用额度） |

各端点的实际可用性取决于管理员配置的渠道与模型，以 `/v1/models` 和实际调用为准。

## 查询可用模型

```bash
curl --fail-with-body https://th.jimei.cn/v1/models \
  -H "Authorization: Bearer ${JIZHI_API_KEY}"
```

返回的 `data[].id` 就是调用时填的模型名。调用报「无可用渠道」时，先来这里确认模型名拼写。

## 对话（OpenAI 格式）

```bash
curl --fail-with-body https://th.jimei.cn/v1/chat/completions \
  -H "Authorization: Bearer ${JIZHI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "你的模型名",
    "messages": [{"role": "user", "content": "你好！"}]
  }'
```

## 对话（流式输出）

加 `"stream": true` 即可，返回 SSE 流：

```bash
curl --fail-with-body https://th.jimei.cn/v1/chat/completions \
  -H "Authorization: Bearer ${JIZHI_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "你的模型名",
    "stream": true,
    "messages": [{"role": "user", "content": "讲个一句话笑话"}]
  }'
```

## 对话（Anthropic 格式）

走 `/v1/messages`，请求体为 Anthropic Messages 格式：

```bash
curl --fail-with-body https://th.jimei.cn/v1/messages \
  -H "x-api-key: ${JIZHI_API_KEY}" \
  -H "anthropic-version: 2023-06-01" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "你的模型名",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "你好！"}]
  }'
```

## 查询额度

```bash
# 密钥对应的总额度（hard_limit_usd，美元）
curl --fail-with-body https://th.jimei.cn/v1/dashboard/billing/subscription \
  -H "Authorization: Bearer ${JIZHI_API_KEY}"

# 已用额度（total_usage，单位为美分，除以 100 即美元）
curl --fail-with-body "https://th.jimei.cn/v1/dashboard/billing/usage" \
  -H "Authorization: Bearer ${JIZHI_API_KEY}"
```
