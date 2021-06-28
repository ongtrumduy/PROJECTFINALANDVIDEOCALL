import zeamsTeams from "../../services/zeamsTeams/zeamsTeams";

let GetTeamInfor = async (req, res) => {
  // console.log(req.body);
  let getTeamInfor = await zeamsTeams.responseChoiceJoinedTeamInfor(req.body);
  // console.log(getTeamInfor);
  res.send(getTeamInfor);
};

module.exports = GetTeamInfor;
