import zeamsTeams from "../../services/zeamsTeams/zeamsTeams";

let GetAllTeamInfor = async (req, res) => {
  let getTeamInfor = await zeamsTeams.getTeamInforOfTeam(req.body);
  res.send(getTeamInfor);
};

module.exports = GetAllTeamInfor;
