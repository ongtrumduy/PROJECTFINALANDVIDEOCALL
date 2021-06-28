import express from "express";
import cors from "cors";
import createNewExcerciseContent from "../../controllers/zeamsExcercises/createNewExcerciseContent";
import bodyParser from "body-parser";

let router = express.Router();

let createnewexcercisecontentRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/createnewexcercisecontent",
    cors(corsOptions),
    createNewExcerciseContent
  );

  return app.use("/", router);
};

module.exports = createnewexcercisecontentRoutes;
