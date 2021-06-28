import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import zeamsExcercisesLists from "./zeamsExcercisesLists";
import zeamsExcercisesMemberResults from "./zeamsExcercisesMemberResults";

class ZeamsExcercises {
  constructor() {
    let excercises = fs.readFileSync(
      "../BACKEND/source/databases/zeamsExcercises/zeamsExcercises.json"
    );
    if (excercises.length > 0) {
      this.ZeamsExcercises = JSON.parse(excercises);
    } else {
      this.ZeamsExcercises = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsExcercises/zeamsExcercises.json",
      JSON.stringify(this.ZeamsExcercises),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewExcercisesContent(excerciseinfor) {
    let ExcerciseID = uuidv4();
    let newexcercisecontent = {
      ExcerciseID: ExcerciseID,
      ExcerciseName: excerciseinfor.ExcerciseName,
      ExcerciseType: excerciseinfor.ExcerciseType,
      ExcerciseDescription: excerciseinfor.ExcerciseDescription,
      ExcerciseLogo: excerciseinfor.ExcerciseLogo,
      ExcerciseNumberQuestion: excerciseinfor.ExcerciseNumberQuestion,
      ExcerciseCreateDate: moment().format("HH:mm DD-MM-YYYY"),
      ExcerciseAllQAContent: []
    };

    let newexcercisetolistcontent = {
      MemberID: excerciseinfor.MemberID,
      ExcerciseID: ExcerciseID,
      ExcerciseName: excerciseinfor.ExcerciseName,
      ExcerciseType: excerciseinfor.ExcerciseType,
      ExcerciseDescription: excerciseinfor.ExcerciseDescription,
      ExcerciseLogo: excerciseinfor.ExcerciseLogo,
      ExcerciseNumberQuestion: excerciseinfor.ExcerciseNumberQuestion
    };

    zeamsExcercisesLists.createNewExcercisesListItemContent(
      newexcercisetolistcontent
    );

    this.ZeamsExcercises.push(newexcercisecontent);
    this.saveDataJSON();

    return ExcerciseID;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkCreateNewExcercisesContent(excerciseinfor) {
    let checkcreatenewexcercise = false;
    let excerciseindex = this.ZeamsExcercises.findIndex(excerciseitem => {
      return excerciseitem.ExcerciseName === excerciseinfor.ExcerciseName;
    });

    if (excerciseindex >= 0) {
      checkcreatenewexcercise = true;
    }
    return checkcreatenewexcercise;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseCheckCreateNewExcerciseContent(excerciseinfor) {
    let resCheckCreateNewExcercise;

    let checkcreatenewexcercise = this.checkCreateNewExcercisesContent(
      excerciseinfor
    );
    if (checkcreatenewexcercise) {
      resCheckCreateNewExcercise = {
        checkValidate: "havedexistedexcercisename"
      };
    } else if (Object.keys(excerciseinfor.ExcerciseName).length === 0) {
      resCheckCreateNewExcercise = {
        checkValidate: "excercisename"
      };
    } else {
      let ExcerciseID = this.createNewExcercisesContent(excerciseinfor);
      resCheckCreateNewExcercise = {
        checkValidate: "success-create-excercise",
        ExcerciseID: ExcerciseID
      };
    }
    return resCheckCreateNewExcercise;
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewExcerciseAllQAContent(excerciseinfor) {
    let excerciseidindex = this.ZeamsExcercises.findIndex(excerciseitem => {
      return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
    });

    if (excerciseidindex >= 0) {
      let ExcerciseAllQAContent = excerciseinfor.ExcerciseAllQAContent;

      this.ZeamsExcercises[
        excerciseidindex
      ].ExcerciseAllQAContent = ExcerciseAllQAContent;
    }

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseCancelCreateNewExcerciseContent(excerciseinfor) {
    let excerciseidindex = this.ZeamsExcercises.findIndex(excerciseitem => {
      return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
    });

    let resCancelCreateNewExcerciseContent = { checkValidate: "" };

    if (excerciseidindex >= 0) {
      this.ZeamsExcercises.splice(excerciseidindex, 1);
      this.saveDataJSON();

      zeamsExcercisesLists.removeCreateExcerciseFromList(excerciseinfor);

      resCancelCreateNewExcerciseContent = {
        checkValidate: "remove-success"
      };
    }

    return resCancelCreateNewExcerciseContent;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseCreateNewExcerciseQAContent(excerciseinfor) {
    this.createNewExcerciseAllQAContent(excerciseinfor);
    let resCreateNewExcerciseQAContent = {
      checkValidate: "success-create-excercise-QA-content"
    };
    return resCreateNewExcerciseQAContent;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseAllQuestionAnswerExcerciseItemContent(excerciseinfor) {
    let excerciseindex = this.ZeamsExcercises.findIndex(excerciseitem => {
      return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
    });
    let resAllQuestionAnswerContent = {};

    if (excerciseindex >= 0) {
      let excerciseQAinfor = this.ZeamsExcercises[excerciseindex];

      resAllQuestionAnswerContent = {
        ExcerciseName: excerciseQAinfor.ExcerciseName,
        ExcerciseNumberQuestion: excerciseQAinfor.ExcerciseNumberQuestion,
        ExcerciseType: excerciseQAinfor.ExcerciseType,
        ExcerciseAllQAContent: excerciseQAinfor.ExcerciseAllQAContent,
        ExcerciseLogo: excerciseQAinfor.ExcerciseLogo
      };
    }

    return resAllQuestionAnswerContent;
  }

  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------

  responseExcerciseInforToCreateTeamNote(excerciseinfor) {
    let excerciseindex = this.ZeamsExcercises.findIndex(excerciseitem => {
      return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseTeamNoteID;
    });
    let resExcerciseInforToCreateTeamNote = {};

    if (excerciseindex >= 0) {
      let excerciseinfor = this.ZeamsExcercises[excerciseindex];

      resExcerciseInforToCreateTeamNote = {
        ExcerciseName: excerciseinfor.ExcerciseName,
        ExcerciseNumberQuestion: excerciseinfor.ExcerciseNumberQuestion,
        ExcerciseType: excerciseinfor.ExcerciseType,
        ExcerciseLogo: excerciseinfor.ExcerciseLogo,
        returnExcerciseInfor: "exist-excercise"
      };
    } else {
      resExcerciseInforToCreateTeamNote = {
        returnExcerciseInfor: "non-exist-excercise"
      };
    }

    return resExcerciseInforToCreateTeamNote;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getAllExcerciseInforForAssignment(excerciseinfor) {
    console.log("Dữ liệu vào đây ", excerciseinfor);
    let excerciseindex = this.ZeamsExcercises.findIndex(excerciseitem => {
      return excerciseitem.ExcerciseID === excerciseinfor.ExcerciseID;
    });

    let excerciseofassignmentinfor = this.ZeamsExcercises[excerciseindex];

    let memberDidHighestScoreInfor = zeamsExcercisesMemberResults.getMemberDidHighestScoreForAssignment(
      excerciseinfor
    );

    console.log(
      "RA thử kết quả memberDidHighestScoreInfor",
      memberDidHighestScoreInfor
    );

    let getAllExcerciseInfor = {
      ExcerciseName: excerciseofassignmentinfor.ExcerciseName,
      ExcerciseNumberQuestion:
        excerciseofassignmentinfor.ExcerciseNumberQuestion,
      ExcerciseType: excerciseofassignmentinfor.ExcerciseType,
      ExcerciseLogo: excerciseofassignmentinfor.ExcerciseLogo,
      MemberDidHighestScore: memberDidHighestScoreInfor.MemberDidHighestScore
    };

    console.log("RA thử kết quả", getAllExcerciseInfor);

    return getAllExcerciseInfor;
  }

  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
}
let zeamsExcercises = new ZeamsExcercises();

module.exports = zeamsExcercises;
