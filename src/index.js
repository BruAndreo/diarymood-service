import { config } from "dotenv";
config();
import express from "express";
import morgan from "morgan";

const app = express();
const port = process.env.SERVER_PORT;

app.use(morgan(':status - :method :url in :response-time ms'));

app.get("/", (req, res) => res.status(200).json({ "message": "Hello world node, again... I miss you" }));

app.listen(port, () => console.log(`🖥 Server is running on port: ${port}`));
