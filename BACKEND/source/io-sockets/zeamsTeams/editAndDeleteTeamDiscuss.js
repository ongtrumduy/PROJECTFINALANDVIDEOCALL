import StartBeginSocket from "../startBeginSocket";
import zeamsTeamsDiscuss from "../../services/zeamsTeams/zeamsTeamsDiscuss";
import zeamsTeamsDiscussComments from "../../services/zeamsTeams/zeamsTeamsDiscussComments";

let EditAndDeleteTeamDiscuss = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("send-to-edit-team-discuss", data => {
      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-edit-team-discuss-content",
        {
          TeamID: data.TeamID,
          TeamDiscussID: data.TeamDiscussID,
          MemberID: data.MemberID,
          SocketID: socket.id
        }
      );

      zeamsTeamsDiscuss.editChoiceTeamDiscuss(data);

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "send-to-update-team-discuss-content",
        {
          TeamID: data.TeamID,
          TeamDiscussID: data.TeamDiscussID,
          MemberID: data.MemberID,
          SocketID: socket.id
        }
      );
    });

    //====================================================================================================

    socket.on("send-to-delete-team-discuss", data => {
      console.log(
        "Dữ liệu đổ qua cái send-to-delete-team-discuss của tao đm ",
        data
      );
      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-delete-team-discuss-content",
        {
          TeamID: data.TeamID,
          TeamDiscussID: data.TeamDiscussID,
          MemberID: data.MemberID,
          SocketID: socket.id
        }
      );

      zeamsTeamsDiscuss.deleteChoiceTeamDiscuss(data);

      zeamsTeamsDiscussComments.deleteChoiceTeamDiscussOfComment(data);

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "send-to-update-team-discuss-content",
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

module.exports = EditAndDeleteTeamDiscuss;
