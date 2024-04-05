import { defineConfig } from 'astro/config';
import { siteMeta } from './src/lib/constants';
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
const {
  siteUrl
} = siteMeta;


// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  integrations: [mdx(), sitemap()]
});