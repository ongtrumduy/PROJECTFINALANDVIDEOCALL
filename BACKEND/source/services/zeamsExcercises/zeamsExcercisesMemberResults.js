import fs from "fs";
import zeamsMember from "../zeamsMembers/zeamsMembers";
import moment from "moment";

class ZeamsExcercisesMemberResults {
  constructor() {
    let excercisesmemberresults = fs.readFileSync(
      "../BACKEND/source/databases/zeamsExcercises/zeamsExcercisesMemberResults.json"
    );
    if (excercisesmemberresults.length > 0) {
      this.ZeamsExcercisesMemberResults = JSON.parse(excercisesmemberresults);
    } else {
      this.ZeamsExcercisesMemberResults = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsExcercises/zeamsExcercisesMemberResults.json",
      JSON.stringify(this.ZeamsExcercisesMemberResults),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewFinishedExcerciseAnswerContent(finishedanswerinfor) {
    let newfinishedexcerciseanswercontent = {
      ExcerciseID: finishedanswerinfor.ExcerciseID,
      MemberDidExcerciseAllList: []
    };

    this.ZeamsExcercisesMemberResults.push(newfinishedexcerciseanswercontent);

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkCreateNewFinishedExcerciseAnswerContent(finishedanswerinfor) {
    let excerciseindex = this.ZeamsExcercisesMemberResults.findIndex(
      excerciseitem => {
        return excerciseitem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );

    if (excerciseindex >= 0) {
      return true;
    } else {
      return false;
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewMemberDidAnswerItemContent(
    finishedanswerinfor,
    memberDidExcerciseTimes
  ) {
    let memberhighestscore = this.countResultScoreOfMemberDidExcercise(
      finishedanswerinfor
    );

    let newmemberdidanswercontent = {
      MemberID: finishedanswerinfor.MemberID,
      MemberFullName: zeamsMember.getMemberFullName(finishedanswerinfor),
      MemberDidExcerciseMinute: finishedanswerinfor.TimeToDoExcercise,
      MemberDidHighestScore: memberhighestscore + "",
      MemberDidExcerciseTimes: memberDidExcerciseTimes + "",
      MemberDidExcerciseNumberQuestion:
        finishedanswerinfor.ExcerciseNumberQuestion,
      MemberDidExcerciseDate: moment().format("HH:mm DD-MM-YYYY")
      // MemberAllDidAnswerList: []
    };

    // newmemberdidanswercontent.MemberAllDidAnswerList =
    //   finishedanswerinfor.ExcerciseAllAnswerContent;

    let excerciseindex = this.ZeamsExcercisesMemberResults.findIndex(
      excerciseitem => {
        return excerciseitem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );

    this.ZeamsExcercisesMemberResults[
      excerciseindex
    ].MemberDidExcerciseAllList.unshift(newmemberdidanswercontent);

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  removeMemberDisAnswerItemContent(finishedanswerinfor) {
    let excerciseindex = this.ZeamsExcercisesMemberResults.findIndex(
      excerciseitem => {
        return excerciseitem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );

    let memberdidindex = this.ZeamsExcercisesMemberResults[
      excerciseindex
    ].MemberDidExcerciseAllList.findIndex(memberdiditem => {
      return memberdiditem.MemberID === finishedanswerinfor.MemberID;
    });

    this.ZeamsExcercisesMemberResults[
      excerciseindex
    ].MemberDidExcerciseAllList.splice(memberdidindex, 1);

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewMemberDidAnswerContent(finishedanswerinfor) {
    console.log("leuleuuuuuuuuu", finishedanswerinfor);
    let checkCreateNewFinishedExcerciseAnswer = this.checkCreateNewFinishedExcerciseAnswerContent(
      finishedanswerinfor
    );

    let checkNewMemberDidAnswer = this.checkNewMemberDidAnswerContent(
      finishedanswerinfor
    );

    if (!checkCreateNewFinishedExcerciseAnswer) {
      this.createNewFinishedExcerciseAnswerContent(finishedanswerinfor);
    }

    let memberDidExcerciseTimes = this.getMemberDidExcerciseTimes(
      finishedanswerinfor
    );

    if (checkNewMemberDidAnswer) {
      let memberscore = this.countResultScoreOfMemberDidExcercise(
        finishedanswerinfor
      );

      let membercurrenthighestscore = this.getTheHighestScoreOfMember(
        finishedanswerinfor
      );

      if (memberscore >= membercurrenthighestscore) {
        this.removeMemberDisAnswerItemContent(finishedanswerinfor);

        this.createNewMemberDidAnswerItemContent(
          finishedanswerinfor,
          memberDidExcerciseTimes
        );
      }
    } else {
      this.createNewMemberDidAnswerItemContent(
        finishedanswerinfor,
        memberDidExcerciseTimes
      );
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkNewMemberDidAnswerContent(finishedanswerinfor) {
    let excerciseindex = this.ZeamsExcercisesMemberResults.findIndex(
      excerciseitem => {
        return excerciseitem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );
    if (excerciseindex >= 0) {
      let memberdidindex = this.ZeamsExcercisesMemberResults[
        excerciseindex
      ].MemberDidExcerciseAllList.findIndex(memberdiditem => {
        return memberdiditem.MemberID === finishedanswerinfor.MemberID;
      });

      if (memberdidindex >= 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  getTheHighestScoreOfMember(finishedanswerinfor) {
    let excerciseindex = this.ZeamsExcercisesMemberResults.findIndex(
      excerciseitem => {
        return excerciseitem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );

    let memberdidindex = this.ZeamsExcercisesMemberResults[
      excerciseindex
    ].MemberDidExcerciseAllList.findIndex(memberdiditem => {
      return memberdiditem.MemberID === finishedanswerinfor.MemberID;
    });

    let highestScoreOfMember = this.ZeamsExcercisesMemberResults[excerciseindex]
      .MemberDidExcerciseAllList[memberdidindex].MemberDidHighestScore;

    return highestScoreOfMember;
  }

  //-----------------------------------------------------------------------------------------------------------------

  countResultScoreOfMemberDidExcercise(finishedanswerinfor) {
    let countResultScore = 0;

    finishedanswerinfor.ExcerciseAllAnswerContent.forEach(answeritem => {
      if (
        answeritem.ExcerciseChoiceAnswer === answeritem.ExcerciseCorrectAnswer
      ) {
        countResultScore++;
      }
    });

    return countResultScore;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getMemberDidExcerciseTimes(finishedanswerinfor) {
    let excerciseindex = this.ZeamsExcercisesMemberResults.findIndex(
      excerciseitem => {
        return excerciseitem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );

    let memberDidExcerciseCurrentTimes = 0;

    if (excerciseindex >= 0) {
      let memberdidindex = this.ZeamsExcercisesMemberResults[
        excerciseindex
      ].MemberDidExcerciseAllList.findIndex(memberdiditem => {
        return memberdiditem.MemberID === finishedanswerinfor.MemberID;
      });
      if (memberdidindex >= 0) {
        let memberDidExcerciseTimes = this.ZeamsExcercisesMemberResults[
          excerciseindex
        ].MemberDidExcerciseAllList[memberdidindex].MemberDidExcerciseTimes;

        memberDidExcerciseCurrentTimes = Number(memberDidExcerciseTimes) + 1;
      } else {
        memberDidExcerciseCurrentTimes = 1;
      }
    }
    return memberDidExcerciseCurrentTimes;
  }

  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
  responseFinishedExcericiseChoiceAnswer(finishedanswerinfor) {
    this.createNewMemberDidAnswerContent(finishedanswerinfor);

    let resFinishedExcerciseAnswer = {
      checkValidate: "success-finished-excercise-choice",
      ExcerciseMemberDidResult:
        this.countResultScoreOfMemberDidExcercise(finishedanswerinfor) + ""
    };
    return resFinishedExcerciseAnswer;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getCurrentMemberDidResultOfExcerciseChooseList(finishedanswerinfor) {
    let excerciseindex = this.ZeamsExcercisesMemberResults.findIndex(
      excerciseitem => {
        return excerciseitem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );

    let allMemberDidResultList = [];

    if (excerciseindex >= 0) {
      const currentIndexScoreItemPage = Number(
        finishedanswerinfor.CurrentIndexScoreItemPage
      );
      const numberScoreItemOnPage = Number(
        finishedanswerinfor.NumberScoreItemOnPage
      );

      const indexOfLastScoreItem =
        currentIndexScoreItemPage * numberScoreItemOnPage;

      const indexOfFirstScoreItem =
        indexOfLastScoreItem - numberScoreItemOnPage;

      allMemberDidResultList = this.ZeamsExcercisesMemberResults[
        excerciseindex
      ].MemberDidExcerciseAllList.slice(
        indexOfFirstScoreItem,
        indexOfLastScoreItem
      );
    }

    return allMemberDidResultList;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseCurrentMemberDidResultOfExcerciseChooseList(finishedanswerinfor) {
    let resCurrentMemberDidResult = {};

    let excerciseindex = this.ZeamsExcercisesMemberResults.findIndex(
      excerciseitem => {
        return excerciseitem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );

    if (excerciseindex >= 0) {
      resCurrentMemberDidResult = {
        CurrentExcerciseItemResultList: this.getCurrentMemberDidResultOfExcerciseChooseList(
          finishedanswerinfor
        ),
        AllNumberExcerciseResult: this.ZeamsExcercisesMemberResults[
          excerciseindex
        ].MemberDidExcerciseAllList.length,
        ExcerciseID: finishedanswerinfor.ExcerciseID,
        MemberID: finishedanswerinfor.MemberID
      };
    } else {
      resCurrentMemberDidResult = {
        CurrentExcerciseItemResultList: [],
        AllNumberExcerciseResult: 0,
        ExcerciseID: finishedanswerinfor.ExcerciseID,
        MemberID: finishedanswerinfor.MemberID
      };
    }

    return resCurrentMemberDidResult;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkMemberHaveDoneExcericse(finishedanswerinfor) {
    let excerciseDidIndex = this.ZeamsExcercisesMemberResults.findIndex(
      excercisediditem => {
        return excercisediditem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );

    let checkMemberHaveDone = false;

    if (excerciseDidIndex >= 0) {
      let memberDidExcerciseIndex = this.ZeamsExcercisesMemberResults[
        excerciseDidIndex
      ].MemberDidExcerciseAllList.findIndex(memberdidexcerciseitem => {
        return memberdidexcerciseitem.MemberID === finishedanswerinfor.MemberID;
      });

      if (memberDidExcerciseIndex >= 0) {
        checkMemberHaveDone = true;
      }
    }

    return checkMemberHaveDone;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getAllResultOfMemberDidExcercise(finishedanswerinfor) {
    let excerciseDidIndex = this.ZeamsExcercisesMemberResults.findIndex(
      excercisediditem => {
        return excercisediditem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );

    let allResultInforOfMember = {};

    if (excerciseDidIndex >= 0) {
      let memberDidExcerciseIndex = this.ZeamsExcercisesMemberResults[
        excerciseDidIndex
      ].MemberDidExcerciseAllList.findIndex(memberdidexcerciseitem => {
        return memberdidexcerciseitem.MemberID === finishedanswerinfor.MemberID;
      });

      if (memberDidExcerciseIndex >= 0) {
        allResultInforOfMember = {
          MemberDidExcerciseMinute: this.ZeamsExcercisesMemberResults[
            excerciseDidIndex
          ].MemberDidExcerciseAllList[memberDidExcerciseIndex]
        };
      }

      return allResultInforOfMember;
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  getMemberDidHighestScoreForAssignment(finishedanswerinfor) {
    console.log("vào đây lấy điểm cao nhất ", finishedanswerinfor);
    let excerciseDidIndex = this.ZeamsExcercisesMemberResults.findIndex(
      excercisediditem => {
        return excercisediditem.ExcerciseID === finishedanswerinfor.ExcerciseID;
      }
    );

    let getMemberDidHighestScore = { MemberDidHighestScore: "0" };

    if (excerciseDidIndex >= 0) {
      let memberDidExcerciseIndex = this.ZeamsExcercisesMemberResults[
        excerciseDidIndex
      ].MemberDidExcerciseAllList.findIndex(memberdidexcerciseitem => {
        return memberdidexcerciseitem.MemberID === finishedanswerinfor.MemberID;
      });

      if (memberDidExcerciseIndex >= 0) {
        getMemberDidHighestScore = {
          MemberDidHighestScore: this.ZeamsExcercisesMemberResults[
            excerciseDidIndex
          ].MemberDidExcerciseAllList[memberDidExcerciseIndex]
            .MemberDidHighestScore
        };
      }
    }

    return getMemberDidHighestScore;
  }

  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
}
let zeamsExcercisesMemberResults = new ZeamsExcercisesMemberResults();

module.exports = zeamsExcercisesMemberResults;
