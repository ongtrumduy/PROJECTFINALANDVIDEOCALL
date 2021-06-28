import express from "express";
import cors from "cors";
import getTeamOfAssignsmentInfor from "../../controllers/zeamsTeams/getTeamOfAssignsmentInfor";
import bodyParser from "body-parser";

let router = express.Router();

let getteamofassignsmentinforRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getteamofassignsmentinfor",
    cors(corsOptions),
    getTeamOfAssignsmentInfor
  );

  return app.use("/", router);
};

module.exports = getteamofassignsmentinforRoutes;
