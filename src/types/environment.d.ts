type DatabaseVariablesType =
  | 'PG_USER'
  | 'PG_PASSWORD'
  | 'PG_HOST'
  | 'PG_PORT'
  | 'PG_DATABASE';

type JWTVariablesType = 'SECRET_ACCESS_JWT' | 'SECRET_REFRESH_JWT';

type OtherVariablesType = 'PORT';

type VariablesType =
  | OtherVariablesType
  | DatabaseVariablesType
  | JWTVariablesType;

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends Record<VariablesType, string | undefined> {}
  }
}

export {};
