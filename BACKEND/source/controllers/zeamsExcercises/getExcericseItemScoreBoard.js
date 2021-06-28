import zeamsExcercisesMemberResults from "../../services/zeamsExcercises/zeamsExcercisesMemberResults";

let GetCurrentMemberDidResult = async (req, res) => {
  //   console.log("VÀo đây trước", req.body);
  let resCurrentMemberDidResult = await zeamsExcercisesMemberResults.responseCurrentMemberDidResultOfExcerciseChooseList(
    req.body
  );
  // console.log("VÀo đây ngay", getReminderList);
  res.send(resCurrentMemberDidResult);
};

module.exports = GetCurrentMemberDidResult;
