import { relations } from "drizzle-orm/relations";
import { profiles, workspaces, folders, files, users, products, prices, subscriptions } from "./schema";

export const workspacesRelations = relations(workspaces, ({one, many}) => ({
	profile: one(profiles, {
		fields: [workspaces.workspace_owner],
		references: [profiles.id]
	}),
	files: many(files),
	folders: many(folders),
}));

export const profilesRelations = relations(profiles, ({many}) => ({
	workspaces: many(workspaces),
}));

export const filesRelations = relations(files, ({one}) => ({
	folder: one(folders, {
		fields: [files.folder_id],
		references: [folders.folder_id]
	}),
	workspace: one(workspaces, {
		fields: [files.workspace_id],
		references: [workspaces.id]
	}),
}));

export const foldersRelations = relations(folders, ({one, many}) => ({
	files: many(files),
	workspace: one(workspaces, {
		fields: [folders.workspace_id],
		references: [workspaces.id]
	}),
}));

export const usersRelations = relations(users, ({one, many}) => ({
	user: one(users, {
		fields: [users.id],
		references: [users.id],
		relationName: "users_id_users_id"
	}),
	users: many(users, {
		relationName: "users_id_users_id"
	}),
	subscriptions: many(subscriptions),
}));

export const pricesRelations = relations(prices, ({one, many}) => ({
	product: one(products, {
		fields: [prices.product_id],
		references: [products.id]
	}),
	subscriptions: many(subscriptions),
}));

export const productsRelations = relations(products, ({many}) => ({
	prices: many(prices),
}));

export const subscriptionsRelations = relations(subscriptions, ({one}) => ({
	price: one(prices, {
		fields: [subscriptions.price_id],
		references: [prices.id]
	}),
	user: one(users, {
		fields: [subscriptions.user_id],
		references: [users.id]
	}),
}));