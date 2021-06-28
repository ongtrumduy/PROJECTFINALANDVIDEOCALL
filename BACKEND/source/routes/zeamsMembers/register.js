import express from "express";
import cors from "cors";
import getRegisterNewMember from "../../controllers/zeamsMembers/register";
import bodyParser from "body-parser";

let router = express.Router();

let registerRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/register", cors(corsOptions), getRegisterNewMember);

  return app.use("/", router);
};

module.exports = registerRoutes;
