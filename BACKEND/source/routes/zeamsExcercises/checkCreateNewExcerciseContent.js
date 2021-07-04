import express from "express";
import cors from "cors";
import checkCreateNewExcerciseContent from "../../controllers/zeamsExcercises/checkCreateNewExcerciseContent";
import bodyParser from "body-parser";

let router = express.Router();

let checktocreatenewexcerciseRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/checktocreatenewexcercise",
    cors(corsOptions),
    checkCreateNewExcerciseContent
  );

  return app.use("/", router);
};

module.exports = checktocreatenewexcerciseRoutes;
