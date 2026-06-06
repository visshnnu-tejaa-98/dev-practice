import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../common/utils/api-error";
import {
  generateAccessToken,
  generateRefeshToken,
  generateResetToken,
  generateSalt,
  generateVerifyEmailToken,
  hash,
  hashToken,
  verifyEmailToken,
  verifyResetToken,
} from "../../common/utils/jwt";
import {
  checkUserWithEmailExists,
  getUserByEmailVerifyToken,
  getUserByResetToken,
  getUserDetailsByUserId,
  insertUser,
  logoutUser,
  updateUserAfterEmailVerification,
  updateUserWithNewPassword,
  updateUserWithRefreshToken,
  updateUserWithResetToken,
} from "./auth.utils";
import { USER } from "../../common/constants";

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

  const verificationToken = generateVerifyEmailToken({ email, role: USER });
  const hashedVerificationToken = hashToken(verificationToken);

  const [userId] = await insertUser({
    name,
    email,
    password: hashedPassword,
    verificationToken: hashedVerificationToken,
  });

  const accessToken = generateAccessToken({ id: userId?.id!, role: USER });
  const refreshToken = generateRefeshToken({ id: userId?.id!, role: USER });
  const hashedRefreshToken = hashToken(refreshToken);

  const updatedUser = await updateUserWithRefreshToken(
    hashedRefreshToken,
    email,
  );

  // await sendVerificationEmail(email, verificationToken);

  return { id: userId?.id, accessToken };
};

const verifyEmail = async ({ token }: { token: string }) => {
  const hashedToken = hashToken(token);
  const user = await getUserByEmailVerifyToken(hashedToken);
  const decoded = verifyEmailToken(token) as JwtPayload;

  if (user.email !== decoded.email)
    throw new BadRequestError("Token Expired or Invalid token");
  const updatedUser = await updateUserAfterEmailVerification(decoded.email);

  return updatedUser;
};

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await checkUserWithEmailExists(email);

  if (!user) throw new UnauthorizedError("Invalid email or password");

  const result =
    user.password && (await bcrypt.compare(password, user.password));

  if (!result) throw new UnauthorizedError("Invalid email or password");

  const accessToken = generateAccessToken({ id: user.id, role: user.role });
  const refreshToken = generateRefeshToken({ id: user.id, role: user.role });
  const hashedRefreshToken = hashToken(refreshToken);

  const updatedUser = await updateUserWithRefreshToken(
    hashedRefreshToken,
    email,
  );

  return {
    id: updatedUser.id,
    accessToken,
  };
};

const logout = async () => {
  const status = await logoutUser();
  return status;
};

const profile = async (id: string) => {
  const user = await getUserDetailsByUserId(id);
  return user;
};

const forgot = async ({ email }: { email: string }) => {
  const user = await checkUserWithEmailExists(email);

  if (!user)
    throw new NotFoundError(`User with given email ${email} not found`);

  const resetToken = generateResetToken({ id: user.id, role: user.role });
  const hashedResetToken = hashToken(resetToken);
  await updateUserWithResetToken(hashedResetToken, user.email);

  return {
    resetToken,
  };
};

const resetUserPassword = async ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  const hashedToken = hashToken(token);
  const user = await getUserByResetToken(hashedToken);
  const decoded = verifyResetToken(token) as JwtPayload;

  if (user.id !== decoded.id)
    throw new BadRequestError("Token Expired or Invalid token");

  const salt = await generateSalt(10);
  const hashedPassword = await hash(password, salt);

  const updatedUser = await updateUserWithNewPassword(
    hashedPassword,
    user.email,
  );

  return updatedUser;
};

export {
  register,
  verifyEmail,
  login,
  logout,
  profile,
  forgot,
  resetUserPassword,
};
