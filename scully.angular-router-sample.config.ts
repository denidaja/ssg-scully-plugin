import { ScullyConfig } from '@scullyio/scully';
import '@scullyio/scully-plugin-puppeteer';

import { customPlugin } from './scully/plugins/plugin';

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'angular-router-sample',
  outDir: './dist/static',
  routes: {},
  defaultPostRenderers: [customPlugin],
};
