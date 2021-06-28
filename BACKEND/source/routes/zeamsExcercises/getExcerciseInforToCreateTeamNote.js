import express from "express";
import cors from "cors";
import getExcerciseInforToCreateTeamNote from "../../controllers/zeamsExcercises/getExcerciseInforToCreateTeamNote";
import bodyParser from "body-parser";

let router = express.Router();

let getexcerciseinfortocreateteamnoteRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getexcerciseinfortocreateteamnote",
    cors(corsOptions),
    getExcerciseInforToCreateTeamNote
  );

  return app.use("/", router);
};

module.exports = getexcerciseinfortocreateteamnoteRoutes;
