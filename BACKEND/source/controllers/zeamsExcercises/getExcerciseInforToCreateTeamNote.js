import zeamsExcercises from "../../services/zeamsExcercises/zeamsExcercises";

let GetExcerciseInforToCreateTeamNote = async (req, res) => {
  let resExcerciseInforToCreateTeamNote = await zeamsExcercises.responseExcerciseInforToCreateTeamNote(
    req.body
  );
  res.send(resExcerciseInforToCreateTeamNote);
};

module.exports = GetExcerciseInforToCreateTeamNote;
