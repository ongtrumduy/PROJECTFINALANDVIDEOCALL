import zeamsTeams from "../../services/zeamsTeams/zeamsTeams";

let CreateNewTeam = async (req, res) => {
  // console.log(req.body);
  let resCreateNewTeam = await zeamsTeams.responseCreateNewTeam(req.body);
  // console.log(resCreateNewTeam);
  res.send(resCreateNewTeam);
};

module.exports = CreateNewTeam;
