import { defineConfig } from 'tinacms';
import { categories } from '../src/lib/constants';

const tinacmsCategories = categories.map((category) => {
  return { label: category.categoryName, value: category.categorySlug};
});

const branch = process.env.HEAD || 'main';

export default defineConfig({
  branch,
  clientID: process.env.PUBLIC_CLIENTID,
  token: process.env.TOKEN,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'assets',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'blog',
        label: 'Blog記事',
        path: 'src/content/blog',
        format: 'mdx',
        ui: {
          filename: false,
          slugify: (values) => {
            return `${values?.slug}`;
          },
        },
      },
      defaultItem: () => {
        return {
          pubDate: new Date().toISOString(),
        };
      },
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'タイトル',
          required: true,
        },
        {
          type: 'string',
          name: 'slug',
          label: 'スラッグ',
          required: true,
        },
        {
          type: 'datetime',
          name: 'pubDate',
          label: '投稿日',
          dateFormat: 'YYYY-MM-DD',
          required: true,
        },
        {
          type: 'image',
          name: 'image',
          label: '画像',
        },
        {
          type: 'string',
          name: 'category',
          label: 'カテゴリー',
          required: true,
          options: tinacmsCategories,
        },
        {
          type: 'rich-text',
          name: 'body',
          label: '記事本文',
          isBody: true,
          required: true,
        },
        {
          type: 'string',
          name: 'description',
          label: '説明',
          component: 'texarea',
          required: true,
        },
      ]
    ]
  }
})