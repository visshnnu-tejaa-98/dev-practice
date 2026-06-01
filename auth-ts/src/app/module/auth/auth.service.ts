import { JwtPayload } from "jsonwebtoken";
import { sendVerificationEmail } from "../../common/config/nodemailer";
import { BadRequestError, ConflictError } from "../../common/utils/api-error";
import {
  generateSalt,
  generateVerifyEmailToken,
  hash,
  hashToken,
  verifyEmailToken,
} from "../../common/utils/jwt";
import {
  checkUserWithEmailExists,
  getUserByEmailVerifyToken,
  insertUser,
  updateUserAfterEmailVerification,
} from "./auth.utils";

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

  // await sendVerificationEmail(email, verificationToken);

  return { id: userId?.id, verificationToken: verificationToken };
};

const verifyEmail = async ({ token }: { token: string }) => {
  const hashedToken = hashToken(token);
  const user = await getUserByEmailVerifyToken(hashedToken);
  const decoded = verifyEmailToken(token) as JwtPayload;

  if (user.email !== decoded.email)
    throw new BadRequestError("TOken Expired or Invalid token");
  const updatedUser = await updateUserAfterEmailVerification(decoded.email);

  return updatedUser;
};

export { register, verifyEmail };
