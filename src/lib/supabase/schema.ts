import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  foreignKey,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const workspaces = pgTable("workspaces", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data"),
  inTrash: text("in_trash"),
  logo: text("logo"),
  bannerUrl: text("banner_url"),
  workspaceOwner: uuid("workspace_owner")
    .notNull()
    .references(() => profiles.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
});

export const folders = pgTable("folders", {
  folderId: uuid("folder_id").defaultRandom().primaryKey().notNull(),
  title: text("title").notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data"),
  inTrash: text("in_trash"),
  bannerUrl: text("banner_url"),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  folderId: uuid("folder_id")
    .notNull()
    .references(() => folders.folderId, { onDelete: "cascade" }),
  title: text("title").notNull(),
  iconId: text("icon_id").notNull(),
  data: text("data"),
  inTrash: text("in_trash"),
  bannerUrl: text("banner_url"),
  workspaceId: uuid("workspace_id")
    .notNull()
    .references(() => workspaces.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  fullName: text("full_name"),
  avatarUrl: text("avatar_url"),
  website: text("website"),
  email: text("email"),
  billingAddress: jsonb("billing_address"),
  paymentMethod: jsonb("payment_method"),
});

export const pricingType = pgEnum("pricing_type", ["one_time", "recurring"]);
export const pricingPlanInterval = pgEnum("pricing_plan_interval", [
  "day",
  "week",
  "month",
  "year",
]);

export const subscription_status = pgEnum("subscription_status", [
  "trialing",
  "active",
  "canceled",
  "incomplete",
  "incomplete_expired",
  "past_due",
  "unpaid",
]);

export const products = pgTable("products", {
  id: text("id").primaryKey().notNull(),
  active: boolean("active"),
  name: text("name"),
  description: text("description"),
  image: text("image"),
  metadata: jsonb("metadata"),
});

export const prices = pgTable("prices", {
  id: text("id").primaryKey().notNull(),
  productId: text("product_id").references(() => products.id),
  active: boolean("active"),
  description: text("description"),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  unitAmount: bigint("unit_amount", { mode: "number" }),
  currency: text("currency"),
  type: pricingType("type"),
  interval: pricingPlanInterval("interval"),
  intervalCount: integer("interval_count"),
  trialPeriodDays: integer("trial_period_days"),
  metadata: jsonb("metadata"),
});

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().notNull(),
    full_name: text("full_name"),
    avatar_url: text("avatar_url"),
    billing_address: jsonb("billing_address"),
    payment_method: jsonb("payment_method"),
    email: text("email"),
    updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" }),
  },
  (table) => {
    return {
      users_id_fkey: foreignKey({
        columns: [table.id],
        foreignColumns: [table.id],
        name: "users_id_fkey",
      }),
    };
  }
);

export const subscriptions = pgTable("subscriptions", {
  id: text("id").primaryKey().notNull(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  status: subscription_status("status"),
  metadata: jsonb("metadata"),
  price_id: text("price_id").references(() => prices.id),
  quantity: integer("quantity"),
  cancel_at_period_end: boolean("cancel_at_period_end"),
  created: timestamp("created", { withTimezone: true, mode: "string" })
    .default(sql`now()`)
    .notNull(),
  current_period_start: timestamp("current_period_start", {
    withTimezone: true,
    mode: "string",
  })
    .default(sql`now()`)
    .notNull(),
  current_period_end: timestamp("current_period_end", {
    withTimezone: true,
    mode: "string",
  })
    .default(sql`now()`)
    .notNull(),
  ended_at: timestamp("ended_at", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
  cancel_at: timestamp("cancel_at", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
  canceled_at: timestamp("canceled_at", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
  trial_start: timestamp("trial_start", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
  trial_end: timestamp("trial_end", {
    withTimezone: true,
    mode: "string",
  }).default(sql`now()`),
});
