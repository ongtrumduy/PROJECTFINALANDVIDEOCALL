import zeamsAssignments from "../../services/zeamsAssginments/zeamsAssignments";

let SendToTurnInAssignmentOfMember = async (req, res) => {
  // console.log(
  //   "Dữ liệu về đây nhahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ",
  //   req.body
  // );
  let resTurnInAssignmentOfMember = await zeamsAssignments.responseTurnInAssignmentOfMember(
    req.body
  );
  res.send(resTurnInAssignmentOfMember);
};

module.exports = SendToTurnInAssignmentOfMember;
