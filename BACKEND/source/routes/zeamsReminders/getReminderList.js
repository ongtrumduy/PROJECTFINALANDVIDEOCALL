import express from "express";
import cors from "cors";
import getMemberReminderList from "../../controllers/zeamsReminders/getreminderlist";
import bodyParser from "body-parser";

let router = express.Router();

let getreminderlistRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/getreminderlist", cors(corsOptions), getMemberReminderList);

  return app.use("/", router);
};

module.exports = getreminderlistRoutes;
