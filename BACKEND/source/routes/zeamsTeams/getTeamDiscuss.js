import express from "express";
import cors from "cors";
import getTeamDiscuss from "../../controllers/zeamsTeams/getTeamDiscuss";
import bodyParser from "body-parser";

let router = express.Router();

let getteamdiscussRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/getteamlist/getteamdiscuss", cors(corsOptions), getTeamDiscuss);

  return app.use("/", router);
};

module.exports = getteamdiscussRoutes;
