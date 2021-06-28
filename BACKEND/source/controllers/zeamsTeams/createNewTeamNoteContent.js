import zeamsTeamsNotes from "../../services/zeamsTeams/zeamsTeamsNotes";

let CreateNewTeamNote = async (req, res) => {
//   console.log("dữ liệu đổ về đây", req.body);
  let resCreateNewTeamNote = await zeamsTeamsNotes.responseCreateNewTeamNote(
    req.body
  );
  res.send(resCreateNewTeamNote);
};

module.exports = CreateNewTeamNote;
