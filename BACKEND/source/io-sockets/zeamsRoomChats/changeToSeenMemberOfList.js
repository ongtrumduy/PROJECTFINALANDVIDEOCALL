import StartBeginSocket from "../startBeginSocket";
import zeamsRoomChats from "../../services/zeamsRoomChats/zeamsRoomChats";

let GetTeamMemberChatList = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("send-to-change-seen-member-of-list", data => {
      zeamsRoomChats.setSeenMemberOfAllMemberChatRoomList(data);

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "send-to-update-all-member-of-chat-list",
        {
          MemberChatID: data.MemberChatID,
          MemberID: data.MemberID
        }
      );
    });
    //====================================================================================================
  });
};

module.exports = GetTeamMemberChatList;
