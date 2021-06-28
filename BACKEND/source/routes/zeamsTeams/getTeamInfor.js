import express from "express";
import cors from "cors";
import getTeamInfor from "../../controllers/zeamsTeams/getTeamInfor";
import bodyParser from "body-parser";

let router = express.Router();

let getteaminforRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/getteamlist/getteaminfor", cors(corsOptions), getTeamInfor);

  return app.use("/", router);
};

module.exports = getteaminforRoutes;
