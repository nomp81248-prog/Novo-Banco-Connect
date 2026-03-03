import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  balance: integer("balance").notNull(), // Stored in cents, so 1 800 000 € = 180000000
  isBlocked: boolean("is_blocked").notNull().default(true),
  accountNumber: text("account_number").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});
export type LoginData = z.infer<typeof loginSchema>;
