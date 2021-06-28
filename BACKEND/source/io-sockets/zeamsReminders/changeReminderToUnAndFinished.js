import StartBeginSocket from "../startBeginSocket";
import zeamsReminders from "../../services/zeamsReminders/zeamsReminders";


let CreateNewDiscuss = io => {
  let membersocket = {};

  io.on("connection", socket => {
    //====================================================================================================

    membersocket = StartBeginSocket.setStartBeginSocket(socket, membersocket);

    //====================================================================================================

    socket.on("send-choice-reminder-to-unfinished", data => {
      zeamsReminders.changeReminderToUnfinished(data);

      let resMemberReminderList = zeamsReminders.responseMemberReminderList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "update-reminder-list",
        resMemberReminderList
      );
    });
    //====================================================================================================

    socket.on("send-choice-reminder-to-finished", data => {
      zeamsReminders.changeReminderToFinished(data);

      let resMemberReminderList = zeamsReminders.responseMemberReminderList(
        data
      );

      StartBeginSocket.emitAllSocketsOfMember(
        membersocket,
        data.MemberID,
        io,
        "update-reminder-list",
        resMemberReminderList
      );
    });
    //====================================================================================================2
  });
};

module.exports = CreateNewDiscuss;
