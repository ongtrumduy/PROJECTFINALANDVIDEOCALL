import zeamsExcercises from "../../services/zeamsExcercises/zeamsExcercises";

let GetAllExcerciseInfor = async (req, res) => {
  let getExcerciseInfor = await zeamsExcercises.getAllExcerciseInforForAssignment(
    req.body
  );
  res.send(getExcerciseInfor);
};

module.exports = GetAllExcerciseInfor;
