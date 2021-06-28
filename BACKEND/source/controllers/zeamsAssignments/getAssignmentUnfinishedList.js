import zeamsAssignments from "../../services/zeamsAssginments/zeamsAssignments";

let GetAssignmentUnfinishedList = async (req, res) => {
  let getAssignmentUnfinishedList = await zeamsAssignments.responseAllAssignmentUnfinishedList(
    req.body
  );
  res.send(getAssignmentUnfinishedList);
};

module.exports = GetAssignmentUnfinishedList;
