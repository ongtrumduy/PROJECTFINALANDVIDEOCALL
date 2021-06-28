import zeamsExcercises from "../../services/zeamsExcercises/zeamsExcercises";

let CreateNewExcerciseContent = async (req, res) => {
  let resCreateNewExcerciseContent = await zeamsExcercises.responseCheckCreateNewExcerciseContent(
    req.body
  );
  // console.log(resCreateNewExcerciseContent);
  res.send(resCreateNewExcerciseContent);
};

module.exports = CreateNewExcerciseContent;
