import express from "express";
import cors from "cors";
import searchTeamCodeToJoinTeam from "../../controllers/zeamsTeams/searchToJoinTeam";
import bodyParser from "body-parser";

let router = express.Router();

let searchtojointeamRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/searchtojointeam", cors(corsOptions), searchTeamCodeToJoinTeam);

  return app.use("/", router);
};

module.exports = searchtojointeamRoutes;
