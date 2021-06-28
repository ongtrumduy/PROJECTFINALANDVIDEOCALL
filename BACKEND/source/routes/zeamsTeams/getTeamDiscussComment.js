import express from "express";
import cors from "cors";
import getTeamDiscussComment from "../../controllers/zeamsTeams/getTeamDiscussComment";
import bodyParser from "body-parser";

let router = express.Router();

let getteamdiscusscommentRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getteamlist/getteamdiscusscomment",
    cors(corsOptions),
    getTeamDiscussComment
  );

  return app.use("/", router);
};

module.exports = getteamdiscusscommentRoutes;
