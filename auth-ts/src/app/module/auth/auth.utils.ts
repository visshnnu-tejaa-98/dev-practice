import { eq } from "drizzle-orm";
import db from "../../../db";
import { usersTable } from "../../../db/schema";

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

export { checkUserWithEmailExists, insertUser };
