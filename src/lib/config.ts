import z from "zod";

const envSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);
