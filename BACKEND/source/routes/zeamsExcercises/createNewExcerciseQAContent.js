import express from "express";
import cors from "cors";
import createNewExcerciseQAContent from "../../controllers/zeamsExcercises/createNewExcerciseQAContent";
import bodyParser from "body-parser";

let router = express.Router();

let createnewexcerciseQAcontentRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/createnewexcerciseallQAcontent",
    cors(corsOptions),
    createNewExcerciseQAContent
  );

  return app.use("/", router);
};

module.exports = createnewexcerciseQAcontentRoutes;
