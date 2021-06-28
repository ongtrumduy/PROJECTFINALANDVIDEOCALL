import zeamsExcercisesLists from "../../services/zeamsExcercises/zeamsExcercisesLists";

let GetExcercisePublicDetailItem = async (req, res) => {
  let getExcercisePublicDetailItem = await zeamsExcercisesLists.responseMemberChoiceExcercisePublicItemContent(
    req.body
  );
  res.send(getExcercisePublicDetailItem);
};

module.exports = GetExcercisePublicDetailItem;
