import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { NotFoundError } from "./api-error";
import { env } from "../zod/env";
import { StringValue } from "ms";
import { createHash } from "node:crypto";

const generateSalt = async (rounds: number) => {
  return await bcrypt.genSalt(rounds);
};

const hash = async (payload: string, salt: string) => {
  return await bcrypt.hash(payload, salt);
};

const hashToken = (token: string) => {
  return createHash("sha256").update(token).digest("hex");
};

const generateVerifyEmailToken = (email: string) => {
  const payload = { email: email };
  const secret = env.JWT_VERIFY_TOKEN_SECRET;
  const expiresIn = env.JWT_VERIFY_TOKEN_EXPIRES || "5m";
  if (!secret)
    throw new NotFoundError(
      "Error While generating email verification token - JWT_SECRET_NOTFOUND",
    );

  if (!expiresIn)
    throw new NotFoundError(
      "Error While generating email verification token - JWT_SECRET_NOTFOUND",
    );
  const options: SignOptions = {
    expiresIn: expiresIn as StringValue,
  };
  return jwt.sign(payload, secret, options);
};

const verifyEmailToken = (token: string) => {
  const secret = env.JWT_VERIFY_TOKEN_SECRET;
  return jwt.verify(token, secret);
};

const generateAccessToken = (id: string) => {
  const payload = { id };
  const secret = env.JWT_ACCESS_TOKEN_SECRET;
  const expiresIn = env.JWT_ACCESS_TOKEN_EXPIRES || "15m";
  if (!secret)
    throw new NotFoundError(
      "Error While generating access token - JWT_SECRET_NOTFOUND",
    );

  if (!expiresIn)
    throw new NotFoundError(
      "Error While generating access expiry token - JWT_SECRET_NOTFOUND",
    );
  const options: SignOptions = {
    expiresIn: expiresIn as StringValue,
  };
  return jwt.sign(payload, secret, options);
};

const verifyAccessToken = (token: string) => {
  const secret = env.JWT_ACCESS_TOKEN_SECRET;
  return jwt.verify(token, secret);
};

const generateRefeshToken = (id: string) => {
  const payload = { id };
  const secret = env.JWT_REFRESH_TOKEN_SECRET;
  const expiresIn = env.JWT_REFRESH_TOKEN_EXPIRES || "15m";
  if (!secret)
    throw new NotFoundError(
      "Error While generating access token - JWT_SECRET_NOTFOUND",
    );

  if (!expiresIn)
    throw new NotFoundError(
      "Error While generating access expiry token - JWT_SECRET_NOTFOUND",
    );
  const options: SignOptions = {
    expiresIn: expiresIn as StringValue,
  };
  return jwt.sign(payload, secret, options);
};

const verifyRefreshToken = (token: string) => {
  const secret = env.JWT_REFRESH_TOKEN_SECRET;
  return jwt.verify(token, secret);
};

const generateResetToken = (id: string) => {
  const payload = { id };
  const secret = env.JWT_RESET_TOKEN_SECRET;
  const expiresIn = env.JWT_RESET_TOKEN_EXPIRES || "15m";
  if (!secret)
    throw new NotFoundError(
      "Error While generating access token - JWT_SECRET_NOTFOUND",
    );

  if (!expiresIn)
    throw new NotFoundError(
      "Error While generating access expiry token - JWT_SECRET_NOTFOUND",
    );
  const options: SignOptions = {
    expiresIn: expiresIn as StringValue,
  };
  return jwt.sign(payload, secret, options);
};

const verifyResetToken = (token: string) => {
  const secret = env.JWT_RESET_TOKEN_SECRET;
  return jwt.verify(token, secret);
};

export {
  generateSalt,
  hash,
  hashToken,
  generateVerifyEmailToken,
  verifyEmailToken,
  generateAccessToken,
  verifyAccessToken,
  generateRefeshToken,
  verifyRefreshToken,
  generateResetToken,
  verifyResetToken,
};
