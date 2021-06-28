import express from "express";
import cors from "cors";
import getTeamNoteNonOutDateList from "../../controllers/zeamsTeams/getTeamNoteNonOutDateList";
import bodyParser from "body-parser";

let router = express.Router();

let getteamnotenonoutdatelistRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getteamlist/getteamnotenonoutdatelist",
    cors(corsOptions),
    getTeamNoteNonOutDateList
  );

  return app.use("/", router);
};

module.exports = getteamnotenonoutdatelistRoutes;
