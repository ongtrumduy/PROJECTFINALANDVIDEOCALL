import StartBeginSocket from "../startBeginSocket";
import zeamsTeamsDiscussComments from "../../services/zeamsTeams/zeamsTeamsDiscussComments";

let EditAndDeleteTeamDiscussComment = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("send-to-edit-team-discuss-comment", data => {
      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-edit-team-discuss-comment-content",
        {
          TeamID: data.TeamID,
          TeamDiscussID: data.TeamDiscussID,
          TeamCommentID: data.TeamCommentID,
          MemberID: data.MemberID,
          SocketID: socket.id
        }
      );

      zeamsTeamsDiscussComments.editChoiceTeamDiscussComment(data);

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
    });

    //====================================================================================================

    socket.on("send-to-delete-team-discuss-comment", data => {
      console.log(
        "Dữ liệu đổ qua cái send-to-delete-team-discuss-comment của tao đm ",
        data
      );
      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-delete-team-discuss-comment-content",
        {
          TeamID: data.TeamID,
          TeamDiscussID: data.TeamDiscussID,
          TeamCommentID: data.TeamCommentID,
          MemberID: data.MemberID
        }
      );

      zeamsTeamsDiscussComments.deleteChoiceTeamDiscussComment(data);

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

module.exports = EditAndDeleteTeamDiscussComment;
