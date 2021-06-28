import createnewdiscussSocket from "./zeamsTeams/createNewDiscuss";
import updateteamdicusscontentSocket from "./zeamsTeams/updateTeamDicussContent";
import setstartvideocallSocket from "./setstartvideocall";
import changeremindertounandfinishedSocket from "./zeamsReminders/changeReminderToUnAndFinished";
import sendmessagetochatSocket from "./zeamsRoomChats/sendMessageToChat";
import updateroomchatlistSocket from "./zeamsRoomChats/updateRoomChatList";
import unandbannedmemberchatSocket from "./zeamsRoomChats/unAndBannedMemberChat";
import updatestatusaddremoveexcerciseitemSocket from "./zeamsExcercises/updateStatusAddRemoveExcerciseItem";
import addnewmembercreateteamSocket from "./zeamsTeams/addNewMemberCreateTeam";
import addnewmemberjointeamSocket from "./zeamsTeams/addNewMemberJoinTeam";
import editanddeleteteamdiscusscommentSocket from "./zeamsTeams/editAndDeleteTeamDiscussComment";
import editanddeleteteamdiscussSocket from "./zeamsTeams/editAndDeleteTeamDiscuss";
import editallinforteamSocket from "./zeamsTeams/editAllInforTeam";
import updateallinforteamSocket from "./zeamsTeams/updateAllInforTeam";
import addandremovememberSocket from "./zeamsTeams/addAndRemoveMember";
import updateallmemberofchatlistSocket from "./zeamsRoomChats/updateAllMemberOfChatList";
import changetoseenmemberoflistSocket from "./zeamsRoomChats/changeToSeenMemberOfList";
import hiddenordeletememberchatoflistSocket from "./zeamsRoomChats/hiddenOrDeleteMemberChatOfList";
import updateanddeleteteamnotecontentSocket from "./zeamsTeams/updateAndDeleteTeamNoteContent";
import updateassignmentlistSocket from "./zeamsAssignments/updateAssignmentList";
import updateexcerciseofassignmentSocket from "./zeamsExcercises/updateExcerciseOfAssignment";

let AllSockets = io => {
  //============================Socket======================================

  // --------------------------CreateNewDisCuss--------------------------------------
  createnewdiscussSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UpdateTeamDiscussContent--------------------------------------
  updateteamdicusscontentSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------SetVideoCall--------------------------------------
  setstartvideocallSocket(io);
  //--------------------------------------------------------------------------

  //--------------------------ChangeReminderToUnAndFinished--------------------------------------
  changeremindertounandfinishedSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------SendMessageToChat--------------------------------------
  sendmessagetochatSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UpdateRoomChatList--------------------------------------
  updateroomchatlistSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UnAndBannedMemberChat--------------------------------------
  unandbannedmemberchatSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UpdateStatusAddRemoveExcerciseItem--------------------------------------
  updatestatusaddremoveexcerciseitemSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------AddNewMemberCreateTeam--------------------------------------
  addnewmembercreateteamSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------AddNewMemberJoinTeam--------------------------------------
  addnewmemberjointeamSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------EditAndDeleteTeamDiscussComment--------------------------------------
  editanddeleteteamdiscusscommentSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------EditAndDeleteTeamDiscuss--------------------------------------
  editanddeleteteamdiscussSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------EditAllInforTeam--------------------------------------
  editallinforteamSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UpdateAllInforTeam--------------------------------------
  updateallinforteamSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------AddAndRemoveMember--------------------------------------
  addandremovememberSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UpdateAllMemberOfChatList--------------------------------------
  updateallmemberofchatlistSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------ChangeToSeenMemberOfList--------------------------------------
  changetoseenmemberoflistSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------HiddenOrDeleteMemberChatOfList--------------------------------------
  hiddenordeletememberchatoflistSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UpdateAndDeleteTeamNoteContent--------------------------------------
  updateanddeleteteamnotecontentSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UpdateAssignmentList--------------------------------------
  updateassignmentlistSocket(io);
  //--------------------------------------------------------------------------

  // --------------------------UpdateExcerciseOfAssignment--------------------------------------
  updateexcerciseofassignmentSocket(io);
  //--------------------------------------------------------------------------
  //=========================================================================
};

module.exports = AllSockets;
