import StartBeginSocket from "../startBeginSocket";
import zeamsRoomChats from "../../services/zeamsRoomChats/zeamsRoomChats";
import zeamsRoomChatsContents from "../../services/zeamsRoomChats/zeamsRoomChatsContents";

let UnAndBannedMemberChat = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("send-to-unbanned-of-member-chat", data => {
      // console.log(
      //   "Có dữ liệu sang bên này rồi send-to-unbanned-of-member-chat",
      //   data
      // );
      zeamsRoomChats.changeUnbannedOfRoomChatMember(data);

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

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberChatID,
        io,
        "send-to-update-all-member-of-chat-list",
        {
          MemberChatID: data.MemberID,
          MemberID: data.MemberChatID
        }
      );

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
          MemberChatID: data.MemberID,
          MemberID: data.MemberChatID
        }
      );
    });

    //====================================================================================================

    socket.on("send-to-banned-of-member-chat", data => {
      // console.log(
      //   "Có dữ liệu sang bên này rồi send-to-banned-of-member-chat",
      //   data
      // );

      zeamsRoomChats.changeBannedOfRoomChatMember(data);

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

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberChatID,
        io,
        "send-to-update-all-member-of-chat-list",
        {
          MemberChatID: data.MemberID,
          MemberID: data.MemberChatID
        }
      );

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
          MemberChatID: data.MemberID,
          MemberID: data.MemberChatID
        }
      );
    });

    //====================================================================================================

    socket.on("send-to-delete-of-member-chat-content", data => {
      zeamsRoomChatsContents.deleteAndNoRemoveMemberChatContentFromList(data);

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

module.exports = UnAndBannedMemberChat;
