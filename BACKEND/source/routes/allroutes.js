import registerRoutes from "./zeamsMembers/register";
import loginRoutes from "./zeamsMembers/login";
import getfullnameRoutes from "./zeamsMembers/getFullName";
import createnewteamRoutes from "./zeamsTeams/createNewTeam";
import getteamlistRoutes from "./zeamsTeams/getTeamList";
import getteaminforRoutes from "./zeamsTeams/getTeamInfor";
import searchtojointeamRoutes from "./zeamsTeams/searchToJoinTeam";
import getteamdiscussRoutes from "./zeamsTeams/getTeamDiscuss";
import getteamdiscusscommentRoutes from "./zeamsTeams/getTeamDiscussComment";
import getteammemberchatlistRoutes from "./zeamsRoomChats/getTeamMemberChatList";
import getreminderlistRoutes from "./zeamsReminders/getReminderList";
import createnewreminderRoutes from "./zeamsReminders/createNewReminder";
import createnewexcercisecontentRoutes from "./zeamsExcercises/createNewExcerciseContent";
import createnewexcerciseQAcontentRoutes from "./zeamsExcercises/createNewExcerciseQAContent";
import getexcerciseownedlistRoutes from "./zeamsExcercises/getExcerciseOwnedList";
import getexcercisepubliclistRoutes from "./zeamsExcercises/getExcercisePublicList";
import cancelcreatenewexcerciseRoutes from "./zeamsExcercises/cancelCreateNewExcercise";
import getexcerciseowneddetailitemRoutes from "./zeamsExcercises/getExcerciseOwnedDetailItem";
import getexcercisepublicdetailitemRoutes from "./zeamsExcercises/getExcercisePublicDetailItem";
import getexcericseitemscoreboardRoutes from "./zeamsExcercises/getExcericseItemScoreBoard";
import addexcerciseitemtoownedlistRoutes from "./zeamsExcercises/addExcerciseItemToOwnedList";
import removeexcerciseitemtoownedlistRoutes from "./zeamsExcercises/removeExcerciseItemToOwnedList";
import getallquestionanswercontentRoutes from "./zeamsExcercises/getAllQuestionAnswerContent";
import finishedexcercisechoiceanswerRoutes from "./zeamsExcercises/finishedExcerciseChoiceAnswer";
import getallmembersofteamRoutes from "./zeamsTeams/getAllMembersOfTeam";
import getallmemberchatroomlistRoutes from "./zeamsRoomChats/getAllMemberChatRoomList";
import getmemberchatcontentRoutes from "./zeamsRoomChats/getMemberChatContent";
import getexcerciseinfortocreateteamnoteRoutes from "./zeamsExcercises/getExcerciseInforToCreateTeamNote";
import createnewteamnotecontentRoutes from "./zeamsTeams/createNewTeamNoteContent";
import getteamnotenonoutdatelistRoutes from "./zeamsTeams/getTeamNoteNonOutDateList";
import getteamnoteoutdatelistRoutes from "./zeamsTeams/getTeamNoteOutDateList";
import getassignmentunfinishedlistRoutes from "./zeamsAssignments/getAssignmentUnfinishedList";
import getassignmentfinishedlistRoutes from "./zeamsAssignments/getAssignmentFinishedList";
import getexcerciseofassignmentinforRoutes from "./zeamsExcercises/getExcerciseOfAssignmentInfor";
import getteamofassignsmentinforRoutes from "./zeamsTeams/getTeamOfAssignsmentInfor";
import sendToTurnInAssignmentOfMemberRoutes from "./zeamsAssignments/sendToTurnInAssignmentOfMember";
import sendToTurnInAssignmentOfMemberWithZeroScoreRoutes from "./zeamsAssignments/sendToTurnInAssignmentOfMemberWithZeroScore";

let AllRoutes = (app, corsOptions) => {
  //========================Routes=========================================

  // -----------------------Register---------------------------------------
  registerRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // -----------------------Login---------------------------------------
  loginRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // -----------------------GetFullname---------------------------------------
  getfullnameRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------CreateNewTeam---------------------------------------
  createnewteamRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetTeamList---------------------------------------
  getteamlistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------TeamInfor---------------------------------------
  getteaminforRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------SearchToJoinTeam---------------------------------------
  searchtojointeamRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetTeamDiscuss---------------------------------------
  getteamdiscussRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetTeamDiscussComment---------------------------------------
  getteamdiscusscommentRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetTeamMemberChatList---------------------------------------
  getteammemberchatlistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------CreateNewReminder---------------------------------------
  createnewreminderRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetReminderList---------------------------------------
  getreminderlistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------CreateNewExcerciseContent---------------------------------------
  createnewexcercisecontentRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------CreateNewExcerciseQAContent---------------------------------------
  createnewexcerciseQAcontentRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetExcerciseOwnedList---------------------------------------
  getexcerciseownedlistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetExcercisePublicList---------------------------------------
  getexcercisepubliclistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------CancelCreateNewExcericse---------------------------------------
  cancelcreatenewexcerciseRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetExcerciseOwnedDetailItem---------------------------------------
  getexcerciseowneddetailitemRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetExcercisePublicDetailItem---------------------------------------
  getexcercisepublicdetailitemRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetExcerciseItemScoreBoard---------------------------------------
  getexcericseitemscoreboardRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------AddExcerciseItemToOwnedList---------------------------------------
  addexcerciseitemtoownedlistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------RemoveExcerciseItemToOwnedList---------------------------------------
  removeexcerciseitemtoownedlistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetAllQuestionAnswerContent---------------------------------------
  getallquestionanswercontentRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------FinishedExcerciseChoiceAnswer---------------------------------------
  finishedexcercisechoiceanswerRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetAllMemberOfTeam---------------------------------------
  getallmembersofteamRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetAllMemberChatRoomChatRoomList---------------------------------------
  getallmemberchatroomlistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetMemberChatContent---------------------------------------
  getmemberchatcontentRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetExcerciseInforToCreateTeamNote---------------------------------------
  getexcerciseinfortocreateteamnoteRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------CreateNewTeamNoteContent---------------------------------------
  createnewteamnotecontentRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetTeamNoteNonOutDateList---------------------------------------
  getteamnotenonoutdatelistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetTeamNoteOutDateList---------------------------------------
  getteamnoteoutdatelistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetAssignmentUnfinishedList--------------------------------------
  getassignmentunfinishedlistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetAssignmentFinishedList---------------------------------------
  getassignmentfinishedlistRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetExcerciseOfAssignmentInfor---------------------------------------
  getexcerciseofassignmentinforRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // --------------------------GetTeamOfAssignmentInfor---------------------------------------
  getteamofassignsmentinforRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // -------------------------- SendToTurnInAssignmentOfMember---------------------------------------
  sendToTurnInAssignmentOfMemberRoutes(app, corsOptions);
  //-----------------------------------------------------------------------

  // -------------------------- SendToTurnInAssignmentOfMemberWithZeroScore---------------------------------------
  sendToTurnInAssignmentOfMemberWithZeroScoreRoutes(app, corsOptions);
  //-----------------------------------------------------------------------
  //=========================================================================
};

module.exports = AllRoutes;
