import express from "express";
import cors from "cors";
import cancelCreateNewExcercise from "../../controllers/zeamsExcercises/cancelCreateNewExcercise";
import bodyParser from "body-parser";

let router = express.Router();

let cancelcreatenewexcerciseRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/cancelcreatenewexcercise",
    cors(corsOptions),
    cancelCreateNewExcercise
  );

  return app.use("/", router);
};

module.exports = cancelcreatenewexcerciseRoutes;
