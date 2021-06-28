import express from "express";
import cors from "cors";
import sendToTurnInAssginmentOfMember from "../../controllers/zeamsAssignments/sendToTurnInAssignmentOfMember";
import bodyParser from "body-parser";

let router = express.Router();

let sendtoturninassginmentofmemberRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/sendtoturninassginmentofmember",
    cors(corsOptions),
    sendToTurnInAssginmentOfMember
  );

  return app.use("/", router);
};

module.exports = sendtoturninassginmentofmemberRoutes;
