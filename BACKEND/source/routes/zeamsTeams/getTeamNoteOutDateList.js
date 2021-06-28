import express from "express";
import cors from "cors";
import getTeamNoteOutDateList from "../../controllers/zeamsTeams/getTeamNoteOutDateList";
import bodyParser from "body-parser";

let router = express.Router();

let getteamnoteoutdatelistRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getteamlist/getteamnoteoutdatelist",
    cors(corsOptions),
    getTeamNoteOutDateList
  );

  return app.use("/", router);
};

module.exports = getteamnoteoutdatelistRoutes;
