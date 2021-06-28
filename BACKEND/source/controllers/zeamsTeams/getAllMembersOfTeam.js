import zeamsTeams from "../../services/zeamsTeams/zeamsTeams";

let GetAllMemberInforOfTeam = async (req, res) => {
  // console.log(req.body);
  let resGetAllMemberInforOfTeam = await zeamsTeams.resGetAllMemberInforOfTeam(
    req.body
  );
  // console.log(getAllTeamList);
  res.send(resGetAllMemberInforOfTeam);
};

module.exports = GetAllMemberInforOfTeam;
