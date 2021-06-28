import zeamsTeamsDiscussComments from "../../services/zeamsTeams/zeamsTeamsDiscussComments";

let GetTeamDiscussComment = async (req, res) => {
  console.log("vào đây mày vào đâu ", req.body);
  let resTeamDiscussComments = await zeamsTeamsDiscussComments.responseTeamDiscussCommentContent(
    req.body
  );
  // console.log(resTeamDiscuss);
  res.send(resTeamDiscussComments);
};

module.exports = GetTeamDiscussComment;
