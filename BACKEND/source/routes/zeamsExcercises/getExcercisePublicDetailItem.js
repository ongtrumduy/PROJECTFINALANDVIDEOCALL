import express from "express";
import cors from "cors";
import getExcercisePublicDetailItem from "../../controllers/zeamsExcercises/getExcercisePublicDetailItem";
import bodyParser from "body-parser";

let router = express.Router();

let getexcercisepublicdetailttemRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getexcercisepublicdetailitem",
    cors(corsOptions),
    getExcercisePublicDetailItem
  );

  return app.use("/", router);
};

module.exports = getexcercisepublicdetailttemRoutes;
