import z from "zod";
import { ALLOWED_ROLES, USER } from "../../common/constants";

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
  role: z.enum(ALLOWED_ROLES).default(USER),
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

const forgotPasswordSchema = z.object({
  email: z.string().email().lowercase().describe("Email of the registrant"),
});

type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;

const resetPasswordSchemaFromBody = z.object({
  password: z
    .string()
    .trim()
    .min(8)
    .max(100)
    .describe("Password of the regsitrant"),
});

type ResetPasswordSchemaFromBodyType = z.infer<
  typeof resetPasswordSchemaFromBody
>;

const resetPasswordSchemaFromParams = z.object({
  token: z.string().trim().describe("Reset Password token of the registrant"),
});

type ResetPasswordSchemaFromParamsType = z.infer<
  typeof resetPasswordSchemaFromParams
>;

export {
  registerSchema,
  verifyEmailSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchemaFromBody,
  resetPasswordSchemaFromParams,
};
export type {
  RegisterInputType,
  VerificationEmailSchemaType,
  LoginSchemaType,
  ForgotPasswordSchemaType,
  ResetPasswordSchemaFromBodyType,
  ResetPasswordSchemaFromParamsType,
};
