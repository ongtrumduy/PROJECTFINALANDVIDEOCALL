import express from "express";
import cors from "cors";
import getExcerciseOwnedDetailItem from "../../controllers/zeamsExcercises/getExcerciseOwnedDetailItem";
import bodyParser from "body-parser";

let router = express.Router();

let getexcerciseowneddetailttemRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getexcerciseownedetailitem",
    cors(corsOptions),
    getExcerciseOwnedDetailItem
  );

  return app.use("/", router);
};

module.exports = getexcerciseowneddetailttemRoutes;
