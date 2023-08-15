import { getConfig } from './config.utils.js';

const LOG_PREFIX = '[wcp]';

export const log = {
  info(...args: unknown[]) {
    if (['error', 'warn', 'info'].includes(getConfig()?.logging?.severity ?? 'info')) {
      console.log(LOG_PREFIX, ...args);
    }
  },
  warn(...args: unknown[]) {
    if (['error', 'warn'].includes(getConfig()?.logging?.severity ?? 'info')) {
      console.warn(LOG_PREFIX, ...args);
    }
  },
  error(...args: unknown[]) {
    if (['error'].includes(getConfig()?.logging?.severity ?? 'info')) {
      console.error(LOG_PREFIX, ...args);
    }
  },
};
