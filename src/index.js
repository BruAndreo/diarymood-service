import { config } from "dotenv";
config();
import express from "express";
import morgan from "morgan";

import routes from "./routes.js";

const app = express();
const port = process.env.SERVER_PORT;

app.use(morgan(':status - :method :url in :response-time ms'));

app.use(routes);

app.listen(port, () => console.log(`🖥 Server is running on port: ${port}`));
