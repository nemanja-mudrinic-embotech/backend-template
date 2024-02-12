import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import {openDbConnection} from "./src/config/db/config.ts";
import {configureSwagger} from "./src/config/swagger/swagger-docs-generator.ts";
import {requestHandler, responseHandler} from "./src/lib/handlers/request/request.handler.ts";
import {configureRoutes} from "./src/config/routes/configure-routes.ts";

configDotenv();

const app = express();

(async () => {
    // await openDbConnection();
    configureSwagger(app);

    app.use(cors());
    app.use(express.json());
    app.use(requestHandler);

    configureRoutes(app);
    app.use(responseHandler);

    // TODO: Use eventLog
    app.listen(process.env.APP_PORT || 3000, () =>
        console.log(`Server is running at port ${process.env.APP_PORT || 3000}`),
    );
})();
