import express from "express";
import cors from "cors";
import getAllMemberChatRoomList from "../../controllers/zeamsRoomChats/getAllMemberChatRoomList";
import bodyParser from "body-parser";

let router = express.Router();

let getallmemberchatroomlistRoutes = (app, corsOptions) => {
  app.use(cors());
  app.use(bodyParser.json());
  router.post(
    "/getallroomchatmemberlist",
    cors(corsOptions),
    getAllMemberChatRoomList
  );

  return app.use("/", router);
};

module.exports = getallmemberchatroomlistRoutes;
