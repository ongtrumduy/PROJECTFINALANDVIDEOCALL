import express from "express";
import cors from "cors";
import getAllTeamList from "../../controllers/zeamsTeams/getTeamList";
import bodyParser from "body-parser";

let router = express.Router();

let getteamlistRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/getteamlist", cors(corsOptions), getAllTeamList);

  return app.use("/", router);
};


module.exports = getteamlistRoutes;
