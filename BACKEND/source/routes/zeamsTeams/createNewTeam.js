import express from "express";
import cors from "cors";
import createNewTeam from "../../controllers/zeamsTeams/createnewteam";
import bodyParser from "body-parser";

let router = express.Router();

let createnewteamRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/createnewteam", cors(corsOptions), createNewTeam);

  return app.use("/", router);
};

module.exports = createnewteamRoutes;
