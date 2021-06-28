import zeamsExcercises from "../../services/zeamsExcercises/zeamsExcercises";

let CancelCreateNewExcerciseContent = async (req, res) => {
  let resCancelCreateNewExcerciseContent = await zeamsExcercises.responseCancelCreateNewExcerciseContent(
    req.body
  );
  // console.log(resCancelCreateNewExcerciseContent);
  res.send(resCancelCreateNewExcerciseContent);
};

module.exports = CancelCreateNewExcerciseContent;
