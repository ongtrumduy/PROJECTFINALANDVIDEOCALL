import express from "express";
import cors from "cors";
import getMemberChatContent from "../../controllers/zeamsRoomChats/getmemberchatcontent";
import bodyParser from "body-parser";

let router = express.Router();

let getmemberchatcontentRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getchatmessagecontent",
    cors(corsOptions),
    getMemberChatContent
  );

  return app.use("/", router);
};

module.exports = getmemberchatcontentRoutes;
