import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const memories = pgTable("memories", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  embedding: jsonb("embedding").notNull().$type<number[]>(),
  metadata: jsonb("metadata").notNull().$type<Record<string, any>>(),
});

export const plugins = pgTable("plugins", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  version: text("version").notNull(),
  enabled: integer("enabled").notNull().default(1),
});

export type Memory = typeof memories.$inferSelect;
export type Plugin = typeof plugins.$inferSelect;

export const insertMemorySchema = createInsertSchema(memories);
export const insertPluginSchema = createInsertSchema(plugins);

export type InsertMemory = z.infer<typeof insertMemorySchema>;
export type InsertPlugin = z.infer<typeof insertPluginSchema>;
