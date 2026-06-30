// Config type for env
export type CONFIG = {
  readonly MONGODB_URI: string;
  readonly JWT_SECRET: string;
};

// JWT Payload
export type Payload = {
  id: string;
};
