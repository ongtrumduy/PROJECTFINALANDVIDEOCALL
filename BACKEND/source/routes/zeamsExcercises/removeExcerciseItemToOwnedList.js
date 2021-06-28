import express from "express";
import cors from "cors";
import removeExcerciseItemToOwnedList from "../../controllers/zeamsExcercises/removeExcerciseItemToOwnedList";
import bodyParser from "body-parser";

let router = express.Router();

let removeexcerciseitemtoownedlistRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/removeexcerciseitemtoownedlist",
    cors(corsOptions),
    removeExcerciseItemToOwnedList
  );

  return app.use("/", router);
};

module.exports = removeexcerciseitemtoownedlistRoutes;
