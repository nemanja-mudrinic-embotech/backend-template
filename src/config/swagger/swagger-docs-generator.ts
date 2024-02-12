import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import * as yaml from "yaml";
import fs from "fs";
import type { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { registry } from "./swagger-registry";
import { ROUTE_API_V1 } from "../../lib/utils/routes/routes";
import {registerVehicleOpenApi} from "../../modules/vehicle/openapi/vehicle.openapi.ts";

const getOpenApiDocumentation = () => {
  registerVehicleOpenApi();

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Vehicle Service",
      description: "This is the Vehicle Service API",
    },
    servers: [{ url: "/api/v1" }],
  });
};

export const writeDocumentation = () => {
  // OpenAPI JSON
  const docs = getOpenApiDocumentation();

  // YAML equivalent
  const fileContent = yaml.stringify(docs);

  fs.writeFileSync(`openapi-docs.yml`, fileContent, {
    encoding: "utf-8",
  });
};

export const configureSwagger = (app: Express) => {
  writeDocumentation();

  const file = fs.readFileSync(`openapi-docs.yml`, {
    encoding: "utf-8",
  });
  const swaggerDocument = yaml.parse(file);

  app.use(`${ROUTE_API_V1}/docs-json`, (req: Request, res: Response) => {
    res.send(swaggerDocument);
  });

  app.use(
    `${ROUTE_API_V1}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  );
};
