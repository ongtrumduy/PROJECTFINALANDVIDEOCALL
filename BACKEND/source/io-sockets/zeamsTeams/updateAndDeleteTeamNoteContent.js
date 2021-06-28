import StartBeginSocket from "../startBeginSocket";
import zeamsTeamsNotes from "../../services/zeamsTeams/zeamsTeamsNotes";
import zeamsTeams from "../../services/zeamsTeams/zeamsTeams";

let UpdateAndDeleteTeamNoteContent = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("receive-to-update-new-team-note-content", data => {
      let resAllTeamNoteNonOutDate = zeamsTeamsNotes.responseAllTeamNoteNonOutDateList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-team-note-non-out-date-list",
        resAllTeamNoteNonOutDate
      );

      let resAllTeamNoteOutDate = zeamsTeamsNotes.responseAllTeamNoteOutDateList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-team-note-out-date-list",
        resAllTeamNoteOutDate
      );
      //===================================================================================================
      let allMemberOfTeamToUpdateAssignment = zeamsTeams.getAllMemberIDsOfTeam(
        data
      );

      allMemberOfTeamToUpdateAssignment.forEach(memberiditem => {
        StartBeginSocket.emitAllSocketsOfMember(
          membersocket,
          memberiditem.MemberID,
          io,
          "send-to-update-assignment-unfinished-list",
          memberiditem.MemberID
        );

        StartBeginSocket.emitAllSocketsOfMember(
          membersocket,
          memberiditem.MemberID,
          io,
          "send-to-update-assignment-finished-list",
          memberiditem.MemberID
        );
      });
    });

    //====================================================================================================

    socket.on("send-to-remove-team-note-item-from-non-out-date", data => {
      zeamsTeamsNotes.removeTeamNoteItemFromNonOutDateList(data);

      let resAllTeamNoteNonOutDate = zeamsTeamsNotes.responseAllTeamNoteNonOutDateList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-team-note-non-out-date-list",
        resAllTeamNoteNonOutDate
      );

      let resAllTeamNoteOutDate = zeamsTeamsNotes.responseAllTeamNoteOutDateList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-team-note-out-date-list",
        resAllTeamNoteOutDate
      );
      //====================================================================================================
      let allMemberOfTeamToUpdateAssignment = zeamsTeams.getAllMemberIDsOfTeam(
        data
      );

      allMemberOfTeamToUpdateAssignment.forEach(memberiditem => {
        StartBeginSocket.emitAllSocketsOfMember(
          membersocket,
          memberiditem.MemberID,
          io,
          "send-to-update-assignment-unfinished-list",
          memberiditem.MemberID
        );

        StartBeginSocket.emitAllSocketsOfMember(
          membersocket,
          memberiditem.MemberID,
          io,
          "send-to-update-assignment-finished-list",
          memberiditem.MemberID
        );
      });
    });

    //====================================================================================================

    socket.on("send-to-remove-team-note-item-from-out-date", data => {
      zeamsTeamsNotes.removeTeamNoteItemFromOutDateList(data);

      let resAllTeamNoteNonOutDate = zeamsTeamsNotes.responseAllTeamNoteNonOutDateList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-team-note-non-out-date-list",
        resAllTeamNoteNonOutDate
      );

      let resAllTeamNoteOutDate = zeamsTeamsNotes.responseAllTeamNoteOutDateList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMemberTeam(
        membersocket,
        data,
        io,
        "update-team-note-out-date-list",
        resAllTeamNoteOutDate
      );
      //====================================================================================================
      let allMemberOfTeamToUpdateAssignment = zeamsTeams.getAllMemberIDsOfTeam(
        data
      );

      allMemberOfTeamToUpdateAssignment.forEach(memberiditem => {
        StartBeginSocket.emitAllSocketsOfMember(
          membersocket,
          memberiditem.MemberID,
          io,
          "send-to-update-assignment-unfinished-list",
          memberiditem.MemberID
        );

        StartBeginSocket.emitAllSocketsOfMember(
          membersocket,
          memberiditem.MemberID,
          io,
          "send-to-update-assignment-finished-list",
          memberiditem.MemberID
        );
      });
    });
    //====================================================================================================
  });
};

module.exports = UpdateAndDeleteTeamNoteContent;
