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

export { registerSchema };
export type { RegisterInputType };
