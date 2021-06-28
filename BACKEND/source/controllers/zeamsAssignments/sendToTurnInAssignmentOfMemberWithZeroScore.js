import zeamsAssignments from "../../services/zeamsAssginments/zeamsAssignments";

let SendToTurnInAssignmentOfMemberWithZeroScore = async (req, res) => {
//   console.log(
//     "Dữ liệu về đây nhahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ",
//     req.body
//   );
  let resTurnInAssignmentOfMemberWithZeroScore = await zeamsAssignments.responseTurnInAssignmentOfMemberWithZeroScore(
    req.body
  );
  res.send(resTurnInAssignmentOfMemberWithZeroScore);
};

module.exports = SendToTurnInAssignmentOfMemberWithZeroScore;
