import express from "express";
import cors from "cors";
import finishedExcerciseChoiceAnswer from "../../controllers/zeamsExcercises/finishedExcerciseChoiceAnswer";
import bodyParser from "body-parser";

let router = express.Router();

let finishedexcercisechoiceanswerRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/finishedexcercisechoiceanswer",
    cors(corsOptions),
    finishedExcerciseChoiceAnswer
  );

  return app.use("/", router);
};

module.exports = finishedexcercisechoiceanswerRoutes;
