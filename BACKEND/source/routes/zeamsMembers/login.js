import express from "express";
import cors from "cors";
import getLoginMember from "../../controllers/zeamsMembers/login";
import bodyParser from "body-parser";

let router = express.Router();

let loginRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/login", cors(corsOptions), getLoginMember);

  return app.use("/", router);
};

module.exports = loginRoutes;
