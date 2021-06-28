import zeamsMembers from "../../services/zeamsMembers/zeamsMembers";

let GetRegisterNewMember = async (req, res) => {
  // console.log(req.body);
  let resNewMemberRegister = await zeamsMembers.resNewMemberRegister(req.body);
  res.send(resNewMemberRegister);
};

module.exports = GetRegisterNewMember;
