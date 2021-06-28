import zeamsAssignments from "../../services/zeamsAssginments/zeamsAssignments";

let GetAssignmentFinishedList = async (req, res) => {
  let getAssignmentFinishedList = await zeamsAssignments.responseAllAssignmentFinishedList(
    req.body
  );
  res.send(getAssignmentFinishedList);
};

module.exports = GetAssignmentFinishedList;
