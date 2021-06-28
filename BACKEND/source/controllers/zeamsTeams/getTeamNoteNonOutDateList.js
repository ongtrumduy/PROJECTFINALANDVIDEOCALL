import zeamsTeamsNotes from "../../services/zeamsTeams/zeamsTeamsNotes";

let GetTeamNoteNonOutDateList = async (req, res) => {
  // console.log(req.body);
  let resTeamNoteNonOutDatetList = zeamsTeamsNotes.responseAllTeamNoteNonOutDateList(
    req.body
  );
  // console.log("dữ liệu gửi về", resMemberRoomChatList);

  res.send(resTeamNoteNonOutDatetList);
};

module.exports = GetTeamNoteNonOutDateList;
