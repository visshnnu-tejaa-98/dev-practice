import { and, eq } from "drizzle-orm";
import db from "../../../db";
import { applicationsTable } from "../../../db/schema";
import { createNewApplicationPropsType } from "./oidc.types";

const getApplicationDetailsByUserIdAndApplicationUrl = async (
  userId: string,
  applicationUrl: string,
) => {
  const applications = await db
    .select({
      name: applicationsTable.name,
      url: applicationsTable.url,
      redirectUri: applicationsTable.redirectUri,
    })
    .from(applicationsTable)
    .where(
      and(
        eq(applicationsTable.userId, userId),
        eq(applicationsTable.url, applicationUrl),
      ),
    );

  if (applications.length === 0) return false;
  const application = applications[0];
  if (!applications) return false;
  return application;
};

const createNewApplication = async (props: createNewApplicationPropsType) => {
  const {
    userId,
    applicationDisplayName,
    applicationUrl,
    redirectUri,
    clientId,
    clientSecret,
  } = props;
  const createdApplication = await db
    .insert(applicationsTable)
    .values({
      userId,
      name: applicationDisplayName,
      url: applicationUrl,
      redirectUri: redirectUri,
      clientId,
      clientSecret,
    })
    .returning({
      id: applicationsTable.id,
      applicationDisplayName: applicationsTable.name,
      applicationURL: applicationsTable.url,
      redirectURI: applicationsTable.redirectUri,
      clientId: applicationsTable.clientId,
      clientSecret: applicationsTable.clientSecret,
    });

  return createdApplication;
};

export { getApplicationDetailsByUserIdAndApplicationUrl, createNewApplication };
