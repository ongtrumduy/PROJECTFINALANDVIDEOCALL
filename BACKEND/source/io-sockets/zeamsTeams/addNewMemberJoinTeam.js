import StartBeginSocket from "../startBeginSocket";
import zeamsTeams from "../../services/zeamsTeams/zeamsTeams";
import zeamsTeamsDiscuss from "../../services/zeamsTeams/zeamsTeamsDiscuss";

let AddNewMemberJoinTeam = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("add-new-member-join-team", data => {
      zeamsTeamsDiscuss.createNewMemberJoinedNotify(data);

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

      let resGetAllMemberInforOfTeam = zeamsTeams.resGetAllMemberInforOfTeam(
        data
      );

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-all-members-of-team",
        resGetAllMemberInforOfTeam
      );
    });

    //====================================================================================================
  });
};

module.exports = AddNewMemberJoinTeam;
