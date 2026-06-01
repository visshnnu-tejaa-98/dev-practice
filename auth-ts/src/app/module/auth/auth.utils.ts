import { eq } from "drizzle-orm";
import db from "../../../db";
import { usersTable } from "../../../db/schema";
import { BadRequestError, NotFoundError } from "../../common/utils/api-error";

const checkUserWithEmailExists = async (email: string) => {
  const userExists = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email));
  return userExists.length > 0 ? true : false;
};

const insertUser = async ({
  name,
  email,
  password,
  verificationToken,
}: {
  name: string;
  email: string;
  password: string;
  verificationToken: string;
}) => {
  const userId = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password,
      verificationToken,
      updatedAt: new Date(),
    })
    .returning({
      id: usersTable.id,
    });
  return userId;
};

const getUserByEmailVerifyToken = async (token: string) => {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.verificationToken, token));
  if (users.length === 0) throw new BadRequestError("111");
  const user = users[0];
  if (!user) throw new NotFoundError("User not found");
  return user;
};

const updateUserAfterEmailVerification = async (email: string) => {
  const updatedUsers = await db
    .update(usersTable)
    .set({ isVerified: true, verificationToken: null })
    .where(eq(usersTable.email, email))
    .returning({
      id: usersTable.id,
      email: usersTable.email,
      isVerified: usersTable.isVerified,
    });

  if (updatedUsers.length === 0) throw new BadRequestError();
  const updatedUser = updatedUsers[0];
  if (!updatedUser) throw new NotFoundError("User not found");
  return updatedUser;
};

export {
  checkUserWithEmailExists,
  insertUser,
  getUserByEmailVerifyToken,
  updateUserAfterEmailVerification,
};
