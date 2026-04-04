import express, { Express } from "express";
import routes from "./api/v1/routes/routes";

const app: Express = express();

//global middleware.
app.use(express.json());
//app.use((morgan("combined")));

//router handler for marathon API.
app.use("/api/v1", routes);

export default app;