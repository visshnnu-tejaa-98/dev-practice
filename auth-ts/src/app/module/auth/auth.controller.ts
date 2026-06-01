import type { Request, Response } from "express";
import { sendVerificationEmail } from "../../common/config/nodemailer";
import { ConflictError } from "../../common/utils/api-error";
import ApiResponse from "../../common/utils/api-response";
import { checkUserWithEmailExists, insertUser } from "./auth.utils";
import { validateRegisterInputData } from "./auth.validation";
import { register } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = await validateRegisterInputData(req.body);

  const data = await register({ name, email, password });

  ApiResponse.created(res, "User created successfully", data);
};

export { registerUser };
