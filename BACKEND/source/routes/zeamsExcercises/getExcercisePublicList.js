import express from "express";
import cors from "cors";
import getExcercisePublicList from "../../controllers/zeamsExcercises/getExcercisePublicList";
import bodyParser from "body-parser";

let router = express.Router();

let getexcercisepubliclistRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getexcercisepubliclist",
    cors(corsOptions),
    getExcercisePublicList
  );

  return app.use("/", router);
};

module.exports = getexcercisepubliclistRoutes;
