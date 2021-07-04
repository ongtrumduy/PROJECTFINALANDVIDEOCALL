import zeamsExcercises from "../../services/zeamsExcercises/zeamsExcercises";

let CheckCreateNewExcerciseContent = async (req, res) => {
  let resCheckCreateNewExcerciseContent = await zeamsExcercises.responseCheckCreateNewExcerciseContent(
    req.body
  );
  // console.log(resCreateNewExcerciseContent);
  res.send(resCheckCreateNewExcerciseContent);
};

module.exports = CheckCreateNewExcerciseContent;
