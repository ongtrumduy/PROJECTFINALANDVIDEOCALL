import zeamsTeamsNotes from "../../services/zeamsTeams/zeamsTeamsNotes";

let GetTeamNoteOutDateList = async (req, res) => {
  // console.log(req.body);
  let resTeamNoteOutDatetList = zeamsTeamsNotes.responseAllTeamNoteOutDateList(
    req.body
  );
  // console.log("dữ liệu gửi về", resMemberRoomChatList);

  res.send(resTeamNoteOutDatetList);
};

module.exports = GetTeamNoteOutDateList;
