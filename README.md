# 集智AI 操作手册

> 在线文档：<https://cuizhenjie.github.io/tokenhub-docs/>

集智AI 是自托管的 AI 网关：把多家上游大模型聚合到统一 API 之后，客户端只需要一个地址和一个密钥，即可使用全部已接入的模型。

| 入口 | 地址 |
| --- | --- |
| 控制台（注册、创建密钥、查用量） | <https://th.jimei.cn> |
| API 地址（OpenAI 兼容客户端） | `https://th.jimei.cn/v1` |
| API 地址（Anthropic 协议客户端，如 Claude Code） | `https://th.jimei.cn` |

本手册只讲三件事：**怎么拿密钥、怎么在客户端里配、怎么调用和查用量**。

## 目录

| 章节 | 内容 |
| --- | --- |
| [1. 获取 API 密钥](src/content/docs/01-api-key.md) | 在控制台创建、管理 `sk-` 密钥 |
| [2. 客户端配置](src/content/docs/02-clients.md) | Claude Code、Codex CLI、Cursor、Cherry Studio、ChatBox、LobeChat、OpenAI/Anthropic SDK |
| [3. 接口调用](src/content/docs/03-api.md) | 端点列表、curl 示例、流式输出 |
| [4. 额度与用量](src/content/docs/04-quota-usage.md) | 余额、充值、调用日志、价格查询 |
| [5. 常见问题](src/content/docs/05-faq.md) | 401 / 404 / 503 / 余额不足等排查 |

## 三步上手

1. 登录[控制台](https://th.jimei.cn)，在「API 密钥」页创建一个密钥并**立即复制**（只显示一次）；
2. 打开 [第 2 章](src/content/docs/02-clients.md)，把地址和密钥填进你正在用的客户端；
3. 用 [第 3 章](src/content/docs/03-api.md)的示例发起第一次对话。

> [!WARNING]
> 密钥等同于账户密码：不要提交进代码仓库、不要截图外发。怀疑泄露时，先在控制台**禁用**该密钥。

## 本地开发

本站基于 [Astro Starlight](https://starlight.astro.build) 构建，推送到 `main` 分支后由 GitHub Actions 自动发布到 GitHub Pages：

```bash
npm install
npm run dev      # 本地预览 http://localhost:4321/tokenhub-docs/
npm run build    # 构建到 dist/
```
