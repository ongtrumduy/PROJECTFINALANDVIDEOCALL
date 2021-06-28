import express from "express";
import cors from "cors";
import sendToTurnInAssignmentOfMemberWithZeroScore from "../../controllers/zeamsAssignments/sendToTurnInAssignmentOfMemberWithZeroScore";
import bodyParser from "body-parser";

let router = express.Router();

let sendToTurnInAssignmentOfMemberWithZeroScoreRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/sendtoturninassginmentofmemberwithzeroscore",
    cors(corsOptions),
    sendToTurnInAssignmentOfMemberWithZeroScore
  );

  return app.use("/", router);
};

module.exports = sendToTurnInAssignmentOfMemberWithZeroScoreRoutes;
