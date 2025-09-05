import { sql } from "drizzle-orm";
import { doublePrecision, integer, uuid, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";


export const productTable = pgTable("products", {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({length: 255}),
  price: doublePrecision().notNull(),
  quantity: integer().default(0),
  category: text().array(),
  tags: text().array()
});

export const createProductSchema = createInsertSchema(productTable).omit({id: true})
export const updateProductSchema = createUpdateSchema(productTable).omit({id: true}).partial()