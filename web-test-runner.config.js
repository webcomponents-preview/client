import { fileURLToPath } from 'node:url';
import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: 'src/**/*.test.ts',
  nodeResolve: true,
  puppeteer: true,
  esbuild: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      tsconfig: fileURLToPath(new URL('./tsconfig.test.json', import.meta.url)),
    }),
  ],
  testRunnerHtml: (testFramework) => `
    <script type="module" src="${testFramework}"></script>
    <script type="module" src="/web-test-runner.setup.js"></script>
  `,
};
