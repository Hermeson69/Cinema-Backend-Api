CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"public_id" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"createdAt" text NOT NULL,
	"updatedAt" text NOT NULL,
	"deletedAt" text,
	CONSTRAINT "clients_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "seets" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_id" text NOT NULL,
	"seat_number" text NOT NULL,
	"row" text NOT NULL,
	"number" numeric NOT NULL,
	"category" text NOT NULL,
	"status" text NOT NULL,
	"createdAt" text NOT NULL,
	"updatedAt" text NOT NULL
);
