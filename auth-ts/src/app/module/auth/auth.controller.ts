import type { Request, Response } from "express";
import ApiResponse from "../../common/utils/api-response";
import { login, register, verifyEmail } from "./auth.service";
import { UnauthorizedError } from "../../common/utils/api-error";

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

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { id: userId, accessToken } = await login({ email, password });

  ApiResponse.created(res, "User loggedin successfully", {
    accessToken,
    id: userId,
  });
};

const profile = async (req: Request, res: Response) => {
  if (!req.user || typeof req.user === "string") {
    throw new UnauthorizedError("Invallid session content");
  }
  const { id } = req.user;
  ApiResponse.success(res, "Fetched user details successfully", { id });
};

export { registerUser, verifyUserEmail, loginUser, profile };
