import express from "express";
import cors from "cors";
import addExcerciseItemToOwnedList from "../../controllers/zeamsExcercises/addExcerciseItemToOwnedList";
import bodyParser from "body-parser";

let router = express.Router();

let addexcerciseitemtoownedlistRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/addexcerciseitemtoownedlist",
    cors(corsOptions),
    addExcerciseItemToOwnedList
  );

  return app.use("/", router);
};

module.exports = addexcerciseitemtoownedlistRoutes;
