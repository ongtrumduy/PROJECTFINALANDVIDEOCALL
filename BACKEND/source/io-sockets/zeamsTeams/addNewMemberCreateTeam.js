import StartBeginSocket from "../startBeginSocket";
import zeamsTeamsDiscuss from "../../services/zeamsTeams/zeamsTeamsDiscuss";

let AddNewMemberCreateTeam = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("add-new-member-create-team", data => {
      zeamsTeamsDiscuss.createAdminMemberJoinedNotify(data);

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "send-to-update-team-discuss-content",
        {
          MemberID: data.MemberID,
          TeamID: data.TeamID
        }
      );
    });

    //====================================================================================================
  });
};

module.exports = AddNewMemberCreateTeam;
