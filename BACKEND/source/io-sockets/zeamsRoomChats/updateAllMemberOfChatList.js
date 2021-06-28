import StartBeginSocket from "../startBeginSocket";
import zeamsRoomChatsContents from "../../services/zeamsRoomChats/zeamsRoomChatsContents";

let GetTeamMemberChatList = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("receive-to-update-all-member-of-chat-list", data => {
      let resGetAllMemberChatRoom = zeamsRoomChatsContents.responseAllMemberChatRoomList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "update-all-member-of-chat-list",
        resGetAllMemberChatRoom
      );
    });

    //====================================================================================================
  });
};

module.exports = GetTeamMemberChatList;
