export const SUPER_ADMIN = "super_admin";
export const ADMIN = "admin";
export const USER = "user";

export const ALLOWED_ROLES = [SUPER_ADMIN, ADMIN, USER] as const;

export const DEVELOPMENT = "development";
export const PRODUCTION = "production";
export const TEST = "test";

export const envs = [DEVELOPMENT, PRODUCTION, TEST];
