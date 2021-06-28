import StartBeginSocket from "../startBeginSocket";
import zeamsTeams from "../../services/zeamsTeams/zeamsTeams";

let AddAndRemoveMember = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("send-to-add-member-become-admin", data => {
      zeamsTeams.addMemberBecomeAdminToList(data);

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

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "sent-to-update-team-infor",
        {
          MemberID: data.MemberID,
          TeamID: data.TeamID
        }
      );
    });

    //====================================================================================================

    socket.on("send-to-remove-member-admin", data => {
      zeamsTeams.removeMemberAdminFromList(data);

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

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "sent-to-update-team-infor",
        {
          MemberID: data.MemberID,
          TeamID: data.TeamID
        }
      );
    });

    //====================================================================================================

    socket.on("send-to-remove-member-from-team", data => {
      zeamsTeams.removeMemberFromTeamList(data);

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

      let teamkickedinfor = zeamsTeams.getKickedTeamName(data);

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "confirm-kickout-from-team",
        {
          MemberID: data.MemberID,
          TeamID: data.TeamID,
          TeamName: teamkickedinfor
        }
      );
    });

    //====================================================================================================
  });
};

module.exports = AddAndRemoveMember;
