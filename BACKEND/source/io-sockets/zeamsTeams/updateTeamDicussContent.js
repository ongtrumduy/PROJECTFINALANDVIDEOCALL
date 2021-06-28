import StartBeginSocket from "../startBeginSocket";
import zeamsTeamsDiscuss from "../../services/zeamsTeams/zeamsTeamsDiscuss";
import zeamsTeamsDiscussComments from "../../services/zeamsTeams/zeamsTeamsDiscussComments";

let UpdateTeamDiscussContent = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("receive-to-update-team-discuss-content", data => {
      let resTeamDiscussContent = zeamsTeamsDiscuss.responseTeamDiscussContent(
        data
      );

      socket.emit("receive-to-close-all-discuss-reply", {
        SocketID: socket.id,
        MemberID: data.MemberID,
        TeamID: data.TeamID
      });

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "update-team-discuss-content",
        resTeamDiscussContent
      );
    });

    //====================================================================================================

    socket.on("receive-to-update-team-discuss-comment-content", data => {
      let resTeamDiscussCommentContent = zeamsTeamsDiscussComments.responseTeamDiscussCommentContent(
        data
      );

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "update-team-discuss-comment-content",
        resTeamDiscussCommentContent
      );
    });

    //====================================================================================================
  });
};

module.exports = UpdateTeamDiscussContent;
