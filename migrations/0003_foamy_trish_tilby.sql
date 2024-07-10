CREATE TABLE IF NOT EXISTS "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone,
	"full_name" text,
	"avatar_url" text,
	"website" text,
	"email" text,
	"billing_address" jsonb,
	"payment_method" jsonb
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_workspace_owner_profiles_id_fk" FOREIGN KEY ("workspace_owner") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
