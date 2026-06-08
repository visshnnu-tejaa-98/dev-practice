import { BadRequestError } from "../../common/utils/api-error";
import { hashToken, generateRandomString } from "../../common/utils/jwt";
import { registerClientProps } from "./oidc.types";
import {
  createNewApplication,
  getApplicationDetailsByUserIdAndApplicationUrl,
} from "./oidc.utils";

const registerNewClient = async (props: registerClientProps) => {
  const { applicationDisplayName, applicationUrl, redirectUri, userId } = props;

  const application = await getApplicationDetailsByUserIdAndApplicationUrl(
    userId,
    applicationUrl,
  );

  if (application)
    throw new BadRequestError(
      "Application already Exists, Check with a different URL",
    );

  const clientId = generateRandomString(16);
  const clientSecret = generateRandomString(32);
  const hashedClientSecret = hashToken(clientSecret);

  const applicationData = {
    applicationDisplayName,
    applicationUrl,
    redirectUri,
    userId,
    clientId,
    clientSecret: hashedClientSecret,
  };

  const createdApplication = await createNewApplication(applicationData);
  return createdApplication;
};

export { registerNewClient };
