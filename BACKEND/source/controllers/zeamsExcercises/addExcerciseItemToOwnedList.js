import zeamsExcercisesLists from "../../services/zeamsExcercises/zeamsExcercisesLists";

let AddNewExcerciseItem = async (req, res) => {
  // console.log(req.body);
  let resAddNewExcerciseItem = await zeamsExcercisesLists.responseAddNewExcerciseItemToMemberOwnedList(
    req.body
  );
  // console.log(resCancelCreateNewExcerciseContent);
  res.send(resAddNewExcerciseItem);
};

module.exports = AddNewExcerciseItem;
