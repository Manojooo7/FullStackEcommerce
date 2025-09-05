import { sql } from "drizzle-orm";
import { doublePrecision, integer, uuid, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema, createSelectSchema } from "drizzle-zod";


export const userTable = pgTable("users", {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  first_name: varchar({ length: 255 }),
  last_name: varchar({ length: 255 }),
  image: varchar({length: 255}),
  address: text(),
  email: varchar({length: 255}).notNull(),
  password: varchar({length: 255}).notNull(),
  role: varchar({length: 255}).notNull().default("user")
});

export const createUserSchema = createInsertSchema(userTable).omit({id: true, role: true})
export const loginSchema = createSelectSchema(userTable).pick({email: true, password: true})
export const clienTable = createInsertSchema(userTable).omit({password: true})
export const updateUserSchema = createUpdateSchema(userTable).omit({id: true, role: true}).partial()