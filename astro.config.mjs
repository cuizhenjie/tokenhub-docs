// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://cuizhenjie.github.io',
  base: '/tokenhub-docs/',
  integrations: [
    starlight({
      title: '集智AI Lens',
      description: '集智AI Lens 网关使用手册：获取密钥、配置客户端、调用接口、查询额度',
      logo: {
        src: './src/assets/logo.svg',
      },
      favicon: '/favicon.svg',
      defaultLocale: 'root',
      locales: {
        root: { label: '简体中文', lang: 'zh-CN' },
      },
      sidebar: [
        {
          label: '快速开始',
          items: [{ label: '获取 API 密钥', slug: '01-api-key' }],
        },
        { label: '客户端接入', items: ['02-clients'] },
        { label: 'API 参考', items: ['03-api'] },
        { label: '额度与支持', items: ['04-quota-usage', '05-faq'] },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
  ],
});
