import type { JestConfigWithTsJest } from 'ts-jest';

// Sync object
const config: JestConfigWithTsJest = {
  globals: {
    configuration: {},
    Liferay: {},
  },
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*(*.)@(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: { '^.+\\.m?[tj]sx?$': 'ts-jest' },
  transformIgnorePatterns: ['node_modules/(?!@?lit)'],
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'd.ts', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    // https://jestjs.io/docs/webpack#handling-static-assets
    // https://stackoverflow.com/a/41043021/1146207
    '\\.(css|sass|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      'identity-obj-proxy',
  },
};

export default config;
