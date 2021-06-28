import express from "express";
import cors from "cors";
import getExcericseItemScoreBoard from "../../controllers/zeamsExcercises/getexcericseitemscoreboard";
import bodyParser from "body-parser";

let router = express.Router();

let getexcericseitemscoreboardRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getexcericseitemscoreboard",
    cors(corsOptions),
    getExcericseItemScoreBoard
  );

  return app.use("/", router);
};

module.exports = getexcericseitemscoreboardRoutes;
