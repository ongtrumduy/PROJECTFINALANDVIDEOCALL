import zeamsExcercisesMemberResults from "../../services/zeamsExcercises/zeamsExcercisesMemberResults";

let FinishedExcerciseChoiceAnswer = async (req, res) => {
  let finishedExcerciseChoiceAnswer = await zeamsExcercisesMemberResults.responseFinishedExcericiseChoiceAnswer(
    req.body
  );
  res.send(finishedExcerciseChoiceAnswer);
};

module.exports = FinishedExcerciseChoiceAnswer;
