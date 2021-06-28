import zeamsExcercisesLists from "../../services/zeamsExcercises/zeamsExcercisesLists";

let GetExcerciseOwnedList = async (req, res) => {
    // console.log("VÀo đây trước", req.body);
  let getExcerciseOwnedList = await zeamsExcercisesLists.responseMemberChoiceIndexExcerciseOwnedListContent(
    req.body
  );
  // console.log("VÀo đây ngay", getReminderList);
  res.send(getExcerciseOwnedList);
};

module.exports = GetExcerciseOwnedList;
