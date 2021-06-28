import express from "express";
import cors from "cors";
import getFullnameMember from "../../controllers/zeamsMembers/getFullName";
import bodyParser from "body-parser";

let router = express.Router();

let fullnameRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/getfullname", cors(corsOptions), getFullnameMember);

  return app.use("/", router);
};

module.exports = fullnameRoutes;
