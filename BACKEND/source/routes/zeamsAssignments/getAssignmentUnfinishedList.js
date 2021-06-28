import express from "express";
import cors from "cors";
import getAssignmentUnfinishedList from "../../controllers/zeamsAssignments/getAssignmentUnfinishedList";
import bodyParser from "body-parser";

let router = express.Router();

let getassignmentunfinishedlistRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getassignmentunfinishedlist",
    cors(corsOptions),
    getAssignmentUnfinishedList
  );

  return app.use("/", router);
};

module.exports = getassignmentunfinishedlistRoutes;



