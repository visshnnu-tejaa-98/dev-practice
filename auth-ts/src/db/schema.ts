import {
  pgTable,
  varchar,
  boolean,
  date,
  timestamp,
  text,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { ALLOWED_ROLES, USER } from "../app/common/constants";

export const userRoleEnum = pgEnum("user_role", ALLOWED_ROLES);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  role: userRoleEnum("role").default(USER).notNull(),

  password: text("password"),

  isVerified: boolean("is_verified").default(false),
  verificationToken: text("verification_token"),

  refreshToken: text("refresh_token"),
  resetToken: text("reset_token"),
  resetTokenExpires: date("reset_token_expires"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
