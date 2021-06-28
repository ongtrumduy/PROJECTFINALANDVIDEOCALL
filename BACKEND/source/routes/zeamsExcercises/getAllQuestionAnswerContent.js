import express from "express";
import cors from "cors";
import getAllQuestionAnswerContent from "../../controllers/zeamsExcercises/getAllQuestionAnswerContent";
import bodyParser from "body-parser";

let router = express.Router();

let getallquestionanswercontentRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getallquestionanswercontent",
    cors(corsOptions),
    getAllQuestionAnswerContent
  );

  return app.use("/", router);
};

module.exports = getallquestionanswercontentRoutes;
