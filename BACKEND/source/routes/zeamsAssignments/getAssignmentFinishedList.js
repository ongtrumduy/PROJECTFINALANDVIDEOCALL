import express from "express";
import cors from "cors";
import getAssignmentFinishedList from "../../controllers/zeamsAssignments/getAssignmentFinishedList";
import bodyParser from "body-parser";

let router = express.Router();

let getassignmentfinishedlistRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getassignmentfinishedlist",
    cors(corsOptions),
    getAssignmentFinishedList
  );

  return app.use("/", router);
};

module.exports = getassignmentfinishedlistRoutes;
