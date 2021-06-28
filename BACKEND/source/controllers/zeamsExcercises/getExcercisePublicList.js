import zeamsExcercisesLists from "../../services/zeamsExcercises/zeamsExcercisesLists";

let GetExcercisePublicList = async (req, res) => {
//   console.log("VÀo đây trước", req.body);
  let getExcercisePublicList = await zeamsExcercisesLists.responseMemberChoiceIndexExcercisePublicListContent(
    req.body
  );
  // console.log("VÀo đây ngay", getReminderList);
  res.send(getExcercisePublicList);
};

module.exports = GetExcercisePublicList;
