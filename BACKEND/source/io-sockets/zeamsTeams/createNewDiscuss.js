import StartBeginSocket from "../startBeginSocket";
import zeamsTeamsDiscuss from "../../services/zeamsTeams/zeamsTeamsDiscuss";
import zeamsTeamsDiscussComments from "../../services/zeamsTeams/zeamsTeamsDiscussComments";

let CreateNewDiscuss = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("create-new-discuss", data => {
      zeamsTeamsDiscuss.createNewMemberDiscuss(data);

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "send-to-update-team-discuss-content",
        {
          TeamID: data.TeamID
        }
      );
    });

    //====================================================================================================

    socket.on("create-new-discuss-comment", data => {
      // console.log("Dữ liệu đổ qua cái comment của tao đm ", data);
      zeamsTeamsDiscussComments.createNewTeamMemberDiscussCommentContent(data);

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "send-to-update-team-discuss-comment-content",
        {
          TeamID: data.TeamID,
          TeamDiscussID: data.TeamDiscussID,
          MemberID: data.MemberID,
          SocketID: socket.id
        }
      );
    });

    //====================================================================================================
  });
};

module.exports = CreateNewDiscuss;
