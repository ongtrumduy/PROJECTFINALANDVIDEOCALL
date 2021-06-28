import StartBeginSocket from "../startBeginSocket";
import zeamsRoomChatsContents from "../../services/zeamsRoomChats/zeamsRoomChatsContents";

let GetTeamMemberChatList = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("send-message-to-member-chat", data => {
      console.log("Ra người dùng đã chọn send-message-to-member-chat", data);

      zeamsRoomChatsContents.addNewMessageToMemberAndMemberChat(data);

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "send-to-update-room-chat-list",
        {
          MemberChatID: data.MemberChatID,
          MemberID: data.MemberID
        }
      );

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberChatID,
        io,
        "send-to-update-room-chat-list",
        {
          MemberID: data.MemberChatID,
          MemberChatID: data.MemberID
        }
      );

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "send-to-update-all-member-of-chat-list",
        {
          MemberID: data.MemberID
        }
      );

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberChatID,
        io,
        "send-to-update-all-member-of-chat-list",
        {
          MemberID: data.MemberChatID
        }
      );
    });
    //====================================================================================================
  });
};

module.exports = GetTeamMemberChatList;
