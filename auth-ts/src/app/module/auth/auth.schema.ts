import z from "zod";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .describe("Full name of the registrant"),
  email: z.string().email().lowercase().describe("Email of the registrant"),
  password: z
    .string()
    .trim()
    .min(8)
    .max(100)
    .describe("Password of the regsitrant"),
});

type RegisterInputType = z.infer<typeof registerSchema>;

const verifyEmailSchema = z.object({
  token: z
    .string()
    .trim()
    .describe("Verification email token of the registrant"),
});

type VerificationEmailSchemaType = z.infer<typeof verifyEmailSchema>;

const loginSchema = z.object({
  email: z.string().email().lowercase().describe("Email of the registrant"),
  password: z
    .string()
    .trim()
    .min(8)
    .max(100)
    .describe("Password of the regsitrant"),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export { registerSchema, verifyEmailSchema, loginSchema };
export type { RegisterInputType, VerificationEmailSchemaType, LoginSchemaType };
