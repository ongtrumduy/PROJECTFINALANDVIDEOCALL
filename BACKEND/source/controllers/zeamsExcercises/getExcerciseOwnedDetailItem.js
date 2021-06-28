import zeamsExcercisesLists from "../../services/zeamsExcercises/zeamsExcercisesLists";

let GetExcerciseOwnedDetailItem = async (req, res) => {
  let getExcerciseOwnedDetailItem = await zeamsExcercisesLists.responseMemberChoiceExcerciseOwnedItemContent(
    req.body
  );
  res.send(getExcerciseOwnedDetailItem);
};

module.exports = GetExcerciseOwnedDetailItem;
