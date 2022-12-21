import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import MoodsController from "./controllers/moodsController.js";

const routes = Router();
const controller = new MoodsController();

routes.post("/moods", controller.newMood);

routes.use((req, res) => res.status(StatusCodes.NOT_FOUND).json({
  error: "Not found"
}));

export default routes;
