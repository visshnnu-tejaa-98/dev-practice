import type { Request, Response } from "express";
import { sendVerificationEmail } from "../../common/config/nodemailer";
import { ConflictError } from "../../common/utils/api-error";
import ApiResponse from "../../common/utils/api-response";
import {
  generateSalt,
  generateVerifyEmailToken,
  hash,
  hashToken,
} from "../../common/utils/jwt";
import { checkUserWithEmailExists, insertUser } from "./auth.utils";
import { validateRegisterInputData } from "./auth.validation";

const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const userExists = await checkUserWithEmailExists(email);

  if (userExists)
    throw new ConflictError(
      `User with given ${email} already exists, please try login`,
    );

  const salt = await generateSalt(10);
  const hashedPassword = await hash(password, salt);

  const verificationToken = generateVerifyEmailToken(email);
  const hashedVerificationToken = hashToken(verificationToken);

  const [userId] = await insertUser({
    name,
    email,
    password: hashedPassword,
    verificationToken: hashedVerificationToken,
  });

  //   await sendVerificationEmail(email, verificationToken);
  console.log({ id: userId?.id, verificationToken: verificationToken });

  return { id: userId?.id, verificationToken: verificationToken };
};

export { register };
