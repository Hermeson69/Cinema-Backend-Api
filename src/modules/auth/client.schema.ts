import * as z from "zod";

export const CreateClient = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const LoginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const SignupSchema = CreateClient;

export const ClentResponseSchema = z.object({
    publicId: z.string(),
    name: z.string(),
    email: z.email(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const AuthResponseSchema = z.object({
    token: z.string(),
    client: ClentResponseSchema,
});

export type ClientCreate = z.infer<typeof CreateClient>;
export type LoginData = z.infer<typeof LoginSchema>;
export type SignupData = z.infer<typeof SignupSchema>;
export type ClientResponse = z.infer<typeof ClentResponseSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;