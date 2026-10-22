// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://cuizhenjie.github.io',
  base: '/tokenhub-docs/',
  integrations: [
    starlight({
      title: '集智AI 操作手册',
      description: '集智AI 网关使用手册：获取密钥、配置客户端、调用接口、查询额度',
      defaultLocale: 'zh-cn',
      locales: {
        'zh-cn': { label: '简体中文', lang: 'zh-CN' },
      },
    }),
  ],
});
