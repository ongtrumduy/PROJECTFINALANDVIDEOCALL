import express from "express";
import cors from "cors";
import getTeamMemberChatList from "../../controllers/zeamsRoomChats/getteammemberchatlist";
import bodyParser from "body-parser";

let router = express.Router();

let getteamlistchatRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getteamlist/getteammemberchatlist",
    cors(corsOptions),
    getTeamMemberChatList
  );

  return app.use("/", router);
};

module.exports = getteamlistchatRoutes;
