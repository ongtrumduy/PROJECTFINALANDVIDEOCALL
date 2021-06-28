import zeamsMembers from "../../services/zeamsMembers/zeamsMembers";

let GetLoginMember = async (req, res) => {
  // console.log(req.body);
  let resMemberLogin = await zeamsMembers.resMemberLogin(req.body);
  // console.log(resMemberLogin);
  res.send(resMemberLogin);
};

module.exports = GetLoginMember;
