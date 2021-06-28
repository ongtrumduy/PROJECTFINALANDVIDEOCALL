import express from "express";
import cors from "cors";
import getExcerciseOfAssignsmentInfor from "../../controllers/zeamsExcercises/getExcerciseOfAssignmentInfor";
import bodyParser from "body-parser";

let router = express.Router();

let getexcerciseofassignmentinforRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getexcerciseofassignmentinfor",
    cors(corsOptions),
    getExcerciseOfAssignsmentInfor
  );

  return app.use("/", router);
};

module.exports = getexcerciseofassignmentinforRoutes;
