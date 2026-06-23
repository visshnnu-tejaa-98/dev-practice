import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const blogTable = pgTable("blogs", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 80 }).notNull(),
  content: text("content").notNull(),
  orgId: text("oig_id").notNull(),
  createdBy: timestamp("created_at").defaultNow().notNull(),
  updatedt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type CreateBlogType = typeof blogTable.$inferInsert;
export type SelectBlogType = typeof blogTable.$inferSelect;
