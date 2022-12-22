import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

import routes from "./routes.js";
import { envVars } from "./config/config.js";

const app = express();

app.use(morgan(':status - :method :url in :response-time ms'));
app.use(express.json());
app.use(routes);

mongoose.set("strictQuery", false);

app.listen(envVars.PORT, () => console.log(`🖥 Server is running on port: ${envVars.PORT}`));
