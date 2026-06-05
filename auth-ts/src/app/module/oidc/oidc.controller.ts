import type { Request, Response } from "express";

import { SERVICE_DISCOVERY_ENDPOINTS } from "./oidc.constants";

const getServiceDiscoveryEndpoints = (req: Request, res: Response) => {
  res.json(SERVICE_DISCOVERY_ENDPOINTS);
};

export { getServiceDiscoveryEndpoints };
