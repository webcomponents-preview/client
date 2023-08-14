import { getConfig } from './config.utils.js';

export const log = {
  info(...args: unknown[]) {
    if (['error', 'warn', 'info'].includes(getConfig()?.logging?.severity ?? 'info')) {
      console.log(...args);
    }
  },
  warn(...args: unknown[]) {
    if (['error', 'warn'].includes(getConfig()?.logging?.severity ?? 'info')) {
      console.warn(...args);
    }
  },
  error(...args: unknown[]) {
    if (['error'].includes(getConfig()?.logging?.severity ?? 'info')) {
      console.error(...args);
    }
  },
};
