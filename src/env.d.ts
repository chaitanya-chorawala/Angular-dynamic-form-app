interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_ENV: string;
  readonly NG_APP_PRODUCTION: boolean;
  readonly NG_APP_API_KEY: string;
  readonly NG_APP_AUTH_DOMAIN: string;
  readonly NG_APP_PROJECT_ID: string;
  readonly NG_APP_STORAGE_BUCKET: string;
  readonly NG_APP_MESSAGING_SENDER_ID: string;
  readonly NG_APP_APP_ID: string;
  readonly NG_APP_USERNAME: string;
  readonly NG_APP_PASSWORD: string;
  readonly NG_APP_ADMIN_USER: string;
}
