import express from "express";
import cors from "cors";
import createNewReminder from "../../controllers/zeamsReminders/createNewReminder";
import bodyParser from "body-parser";

let router = express.Router();

let createnewreminderRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post("/createnewreminder", cors(corsOptions), createNewReminder);

  return app.use("/", router);
};

module.exports = createnewreminderRoutes;
