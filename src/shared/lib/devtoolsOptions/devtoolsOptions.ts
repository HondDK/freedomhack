import { DevtoolsOptions } from 'zustand/middleware';

export function devtoolsOptions(name: string): DevtoolsOptions {
  return { name, enabled: process.env.NODE_ENV === 'development' };
}