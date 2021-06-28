import express from "express";
import cors from "cors";
import getAllMembersOfTeam from "../../controllers/zeamsTeams/getAllMembersOfTeam";
import bodyParser from "body-parser";

let router = express.Router();

let getallmembersofteamRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getteamlist/getallmembersofteam",
    cors(corsOptions),
    getAllMembersOfTeam
  );

  return app.use("/", router);
};

module.exports = getallmembersofteamRoutes;
