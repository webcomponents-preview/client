import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import { esbuildPlugin } from '@web/dev-server-esbuild';
import { defaultReporter, summaryReporter } from '@web/test-runner';
import { junitReporter } from '@web/test-runner-junit-reporter';

const { values } = parseArgs({ options: { ci: { type: 'boolean', default: false } } });
const { ci: isCi } = values;

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
  reporters: isCi
    ? [
        junitReporter({
          outputPath: './reports/test-results.xml',
          reportLogs: true,
        }),
        summaryReporter({ flatten: false }),
      ]
    : [defaultReporter({ reportTestResults: true, reportTestProgress: true })],
};
