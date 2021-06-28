import StartBeginSocket from "../startBeginSocket";
import zeamsRoomChatsContents from "../../services/zeamsRoomChats/zeamsRoomChatsContents";

let GetTeamMemberChatList = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("receive-to-update-room-chat-list", data => {
      //   console.log(
      //     "Ra người dùng đã chọn receive-to-update-room-chat-list",
      //     data
      //   );
      let resMemberRoomChatList = zeamsRoomChatsContents.responseMemberChatContent(
        data
      );

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "update-room-chat-list",
        resMemberRoomChatList
      );
    });

    //====================================================================================================
  });
};

module.exports = GetTeamMemberChatList;
