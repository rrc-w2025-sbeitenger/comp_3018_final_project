import express, { Express } from "express";
import morgan from "morgan";
import setupSwagger from "./config/swagger";
import routes from "./api/v1/routes/routes";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";

const app: Express = express();

//logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    //in development, log to console for immediate feedback
    app.use(consoleLogger);
}

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