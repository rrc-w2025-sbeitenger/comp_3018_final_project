import express, { Express } from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import morgan from "morgan";
import setupSwagger from "./config/swagger";
import routes from "./api/v1/routes/routes";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import helmet from "helmet";

const app: Express = express();

//configuration for JSON APIs
const apiHelmetConfig = helmet({
    //disable unnecessary middleware for API-only apps
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,

    //strict transport security
    hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: false,
        preload: false,
    },

    //sets "X-Permitted-Cross-Domain-Policies: none".
    //tells client the domain policy for loading cross-domian content.
    //protects from strange adobe requests.
    xPermittedCrossDomainPolicies: {
        permittedPolicies: "none",
    },

    //remove server information from responses
    hidePoweredBy: true,
    //prevent MIME type sniffing
    noSniff: true,
    //prevent clickjacking
    xFrameOptions: {action: "deny"},
});

//logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    //in development, log to console for immediate feedback
    app.use(consoleLogger);
}

//helmet.js
app.use(apiHelmetConfig);

//body parsing global middleware.
app.use(express.json());
app.use((morgan("combined")));

//router handler for marathon API.
app.use("/api/v1", routes);

//setup swagger
setupSwagger(app);

//global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;