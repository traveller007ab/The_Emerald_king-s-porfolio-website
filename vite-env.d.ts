
// Augment the global namespace to include process.env for TypeScript support
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_KEY: string;
    }
  }
}

export {};
