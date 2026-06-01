import type { Request, Response } from "express";
import ApiResponse from "../../common/utils/api-response";
import { register, verifyEmail } from "./auth.service";

const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const data = await register({ name, email, password });
  ApiResponse.created(res, "User created successfully", data);
};

const verifyUserEmail = async (req: Request, res: Response) => {
  const { token } = req.body;
  const user = await verifyEmail({ token });
  ApiResponse.created(res, "User Email Verified Successfully", user);
};

export { registerUser, verifyUserEmail };
