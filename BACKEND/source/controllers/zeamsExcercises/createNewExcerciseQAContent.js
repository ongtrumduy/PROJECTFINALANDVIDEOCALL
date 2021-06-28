import zeamsExcercises from "../../services/zeamsExcercises/zeamsExcercises";

let CreateNewExcerciseQAContent = async (req, res) => {
  // console.log(req.body);
  let resCreateNewExcerciseContent = await zeamsExcercises.responseCreateNewExcerciseQAContent(
    req.body
  );
  // console.log(resCreateNewExcerciseContent);
  res.send(resCreateNewExcerciseContent);
};

module.exports = CreateNewExcerciseQAContent;
