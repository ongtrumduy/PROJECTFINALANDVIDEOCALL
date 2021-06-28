import express from "express";
import cors from "cors";
import createNewTeamNoteContent from "../../controllers/zeamsTeams/createNewTeamNoteContent";
import bodyParser from "body-parser";

let router = express.Router();

let createnewteamnotecontentRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/createnewteamnotecontent",
    cors(corsOptions),
    createNewTeamNoteContent
  );

  return app.use("/", router);
};

module.exports = createnewteamnotecontentRoutes;
