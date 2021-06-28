import zeamsTeams from "../../services/zeamsTeams/zeamsTeams";

let GetAllTeamList = async (req, res) => {
  // console.log(req.body);
  let resAllTeamList = await zeamsTeams.responseAllTeamListOfMember(req.body);
  // console.log(getAllTeamList);
  res.send(resAllTeamList);
};

module.exports = GetAllTeamList;
