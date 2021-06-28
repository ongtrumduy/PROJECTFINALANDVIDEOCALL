import StartBeginSocket from "../startBeginSocket";
import zeamsTeams from "../../services/zeamsTeams/zeamsTeams";

let EditAllInforTeam = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("send-to-edit-team-name", data => {
      zeamsTeams.editChoiceTeamName(data);

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "sent-to-update-team-infor",
        {
          TeamID: data.TeamID
        }
      );
    });

    //====================================================================================================

    socket.on("send-to-edit-team-description", data => {
      zeamsTeams.editChoiceTeamDescription(data);

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "sent-to-update-team-infor",
        {
          TeamID: data.TeamID
        }
      );
    });

    //====================================================================================================

    socket.on("send-to-edit-team-type", data => {
      zeamsTeams.editChoiceTeamType(data);

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "sent-to-update-team-infor",
        {
          TeamID: data.TeamID
        }
      );
    });

    //====================================================================================================
  });
};

module.exports = EditAllInforTeam;
