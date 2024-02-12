import type { Application } from "express";
import { Router } from 'express';

import appRoute from "../../lib/health/health.controller";

import { ROUTE_API_V1 } from "../../lib/utils/routes/routes";

const router = Router({ mergeParams: true });

export const configureRoutes = (app: Application) => {
  app.use(ROUTE_API_V1, router);
  router.use(appRoute);
};
