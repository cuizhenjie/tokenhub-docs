# 2. 客户端配置

先记住两组地址，绝大多数问题都出在地址填错：

| 客户端类型 | Base URL | 密钥 |
| --- | --- | --- |
| OpenAI 兼容客户端（绝大多数） | `https://th.jimei.cn/v1`（**带** `/v1`） | `sk-` 密钥 |
| Anthropic 协议客户端（Claude Code、Anthropic SDK） | `https://th.jimei.cn`（**不带** `/v1`） | `sk-` 密钥 |

**模型名**以控制台「模型广场」或 [`GET /v1/models`](03-api.md#查询可用模型) 返回的为准，填错会报「无可用渠道」。

---

## Claude Code

Claude Code 走 Anthropic 协议，注意 Base URL **不带 `/v1`**。

方式一：环境变量（当前终端会话）

```bash
export ANTHROPIC_BASE_URL=https://th.jimei.cn
export ANTHROPIC_AUTH_TOKEN=sk-xxxxxxxx
```

方式二：写入 `~/.claude/settings.json`，对所有会话生效

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "https://th.jimei.cn",
    "ANTHROPIC_AUTH_TOKEN": "sk-xxxxxxxx",
    "ANTHROPIC_MODEL": "你的模型名"
  }
}
```

- 模型可用 `/model` 命令切换，或用 `ANTHROPIC_MODEL` 环境变量指定。
- 验证：`claude -p "你好"`，正常回复即接入成功。
- 报 401 先检查密钥；报 503「无可用渠道」见[第 5 章](05-faq.md)。

## Codex CLI

编辑 `~/.codex/config.toml`：

```toml
model_provider = "jizhi"
model = "你的模型名"

[model_providers.jizhi]
name = "Jizhi AI"
base_url = "https://th.jimei.cn/v1"
env_key = "JIZHI_API_KEY"
wire_api = "chat"
```

密钥通过环境变量传入（不要写进配置文件）：

```bash
export JIZHI_API_KEY=sk-xxxxxxxx
```

`wire_api` 可选 `chat`（`/v1/chat/completions`，兼容性最好）或 `responses`（`/v1/responses`）。

## Cursor

1. 打开 **Settings → Models**，找到 **OpenAI API Key** 区域。
2. 勾选 **Override OpenAI Base URL**，填 `https://th.jimei.cn/v1`。
3. 填入 `sk-` 密钥，在模型列表中 **Add model** 手动添加要用的模型名（与 `/v1/models` 一致）。
4. 点击 **Verify** 验证通过后保存。

注意：Cursor 内置的 tab 补全等自家代理模型不经过网关，只有对话模型走这里配置的 OpenAI 兼容接口。

## Cherry Studio

1. **设置 → 模型服务**，点击底部 **添加**，选择 **OpenAI-API 兼容**。
2. API 地址填 `https://th.jimei.cn/v1`（若你所用版本会自动补全 `/v1`，则只填 `https://th.jimei.cn`）。
3. 填入 API 密钥。
4. 在该服务商下 **添加模型**，模型 ID 必须与 `/v1/models` 返回的完全一致。
5. 保存后在模型列表点 **检查连通性** 测试。

## ChatBox

1. **设置 → 模型 → 添加自定义提供方**。
2. API 类型选择 **OpenAI API 兼容**。
3. API 域名填 `https://th.jimei.cn/v1`，填入 API 密钥。
4. 在提供方下 **添加自定义模型**，填入模型名后保存测试。

## LobeChat

1. **设置 → 语言模型 → OpenAI**。
2. API 代理地址填 `https://th.jimei.cn/v1`，填入 API Key。
3. 在模型列表中添加要使用的模型名，保存后对话时选择该模型。

## Python（OpenAI SDK）

适用于所有 OpenAI 兼容调用场景（LangChain、Dify、Open WebUI 等同理）：

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["JIZHI_API_KEY"],
    base_url="https://th.jimei.cn/v1",
)

resp = client.chat.completions.create(
    model="你的模型名",
    messages=[{"role": "user", "content": "你好"}],
)
print(resp.choices[0].message.content)
```

## Node.js（openai 包）

```js
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.JIZHI_API_KEY,
  baseURL: "https://th.jimei.cn/v1",
});

const resp = await client.chat.completions.create({
  model: "你的模型名",
  messages: [{ role: "user", content: "你好" }],
});
console.log(resp.choices[0].message.content);
```

## Python（Anthropic SDK）

走 `/v1/messages` 的 Anthropic 协议，注意 `base_url` 不带 `/v1`：

```python
import os
import anthropic

client = anthropic.Anthropic(
    api_key=os.environ["JIZHI_API_KEY"],
    base_url="https://th.jimei.cn",
)

msg = client.messages.create(
    model="你的模型名",
    max_tokens=1024,
    messages=[{"role": "user", "content": "你好"}],
)
print(msg.content[0].text)
```

## 其他客户端

任何支持「自定义 OpenAI 接口地址」的工具（沉浸式翻译、Open WebUI、Dify、RAGFlow、LangChain 等）都可以接入，只需要三样东西：

1. **API 地址**：`https://th.jimei.cn/v1`
2. **API Key**：集智AI 签发的 `sk-` 密钥
3. **模型名**：从「模型广场」或 `/v1/models` 获取
