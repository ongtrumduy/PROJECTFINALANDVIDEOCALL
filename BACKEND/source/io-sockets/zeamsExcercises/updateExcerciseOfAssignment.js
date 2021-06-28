import StartBeginSocket from "../startBeginSocket";
import zeamsAssignments from "../../services/zeamsAssginments/zeamsAssignments";

let UpdateExcerciseOfAssignment = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("receive-to-update-excercise-of-assignment;", data => {
      let checkExcericiseOfAssignment = zeamsAssignments.checkExcericiseOfAssignmentMember(
        data
      );

      if (checkExcericiseOfAssignment) {
        StartBeginSocket.emitAllSocketsOfMember(
          membersocket,
          memberiditem.MemberID,
          io,
          "send-to-update-assignment-unfinished-list",
          membersocket.MemberID
        );
      }
    });
    //====================================================================================================
  });
};

module.exports = UpdateExcerciseOfAssignment;
