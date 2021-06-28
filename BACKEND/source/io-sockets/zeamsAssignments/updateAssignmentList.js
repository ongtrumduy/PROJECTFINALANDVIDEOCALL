import StartBeginSocket from "../startBeginSocket";
import zeamsAssignments from "../../services/zeamsAssginments/zeamsAssignments";

let GetAllAssignmentList = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("receive-to-update-assignment-unfinished-list", data => {
      let resAllAssignmentUnfinishedList = zeamsAssignments.responseAllAssignmentUnfinishedList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "update-assignment-unfinished-list",
        resAllAssignmentUnfinishedList
      );
    });

    //====================================================================================================

    socket.on("receive-to-update-assignment-finished-list", data => {
      let resAllAssignmentFinishedList = zeamsAssignments.responseAllAssignmentFinishedList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "update-assignment-finished-list",
        resAllAssignmentFinishedList
      );
    });

    //====================================================================================================
  });
};

module.exports = GetAllAssignmentList;
