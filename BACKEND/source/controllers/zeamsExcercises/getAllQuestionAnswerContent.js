import zeamsExcercises from "../../services/zeamsExcercises/zeamsExcercises";

let GetAllQuestionAnswerContent = async (req, res) => {
  let getAllQuestionAnswerContent = await zeamsExcercises.responseAllQuestionAnswerExcerciseItemContent(
    req.body
  );
  res.send(getAllQuestionAnswerContent);
};

module.exports = GetAllQuestionAnswerContent;
