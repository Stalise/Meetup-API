declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PG_USER: string;
      PG_PASSWORD: number;
      PG_HOST: string;
      PG_PORT: number;
      PG_DATABASE: string;
    }
  }
}

export {};
