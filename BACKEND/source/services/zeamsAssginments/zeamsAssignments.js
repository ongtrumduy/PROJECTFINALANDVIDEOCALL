import fs from "fs";
import { v1 as uuidv1 } from "uuid";
import moment from "moment";

import zeamsExcercisesMemberResults from "../zeamsExcercises/zeamsExcercisesMemberResults";

class ZeamsAssignments {
  constructor() {
    let assignments = fs.readFileSync(
      "../BACKEND/source/databases/zeamsAssignments/zeamsAssignments.json"
    );
    if (assignments.length > 0) {
      this.ZeamsAssignments = JSON.parse(assignments);
    } else {
      this.ZeamsAssignments = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsAssignments/zeamsAssignments.json",
      JSON.stringify(this.ZeamsAssignments),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewAssignmentsForMember(assignmentinfor) {
    let memberassignmentindex = this.ZeamsAssignments.findIndex(
      memberassignmentitem => {
        return memberassignmentitem.MemberID === assignmentinfor.MemberID;
      }
    );

    if (memberassignmentindex < 0) {
      let memberassignment = {
        MemberID: assignmentinfor.MemberID,
        AssignmentMemberUnfinishedList: [],
        AssignmentMemberFinishedList: []
      };

      this.ZeamsAssignments.push(memberassignment);

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  addNewAssignmentOfMember(assignmentinfor) {
    // console.log("vào đây để tạo ra assignment ", assignmentinfor);
    this.createNewAssignmentsForMember(assignmentinfor);

    let memberassignmentindex = this.ZeamsAssignments.findIndex(
      memberassignmentitem => {
        return memberassignmentitem.MemberID === assignmentinfor.MemberID;
      }
    );

    let assignmentmemberinfor = {
      AssignmentID: uuidv1(),
      TeamID: assignmentinfor.TeamID,
      TeamNoteID: assignmentinfor.TeamNoteID,
      TeamNoteName: assignmentinfor.TeamNoteName,
      TeamNoteCreateDate: assignmentinfor.TeamNoteCreateDate,
      TeamNoteEndDate: assignmentinfor.TeamNoteEndDate,
      TeamLogo: assignmentinfor.TeamLogo,
      ExcerciseID: assignmentinfor.ExcerciseID,
      CheckOverTimeToFinished: false
    };

    // let checkFinishedExcercise = zeamsExcercisesMemberResults.checkMemberHaveDoneExcericse(
    //   assignmentinfor
    // );

    // if (checkFinishedExcercise) {
    this.ZeamsAssignments[
      memberassignmentindex
    ].AssignmentMemberUnfinishedList.unshift(assignmentmemberinfor);
    // } else {
    //   this.ZeamsAssignments[
    //     memberassignmentindex
    //   ].AssignmentMemberFinishedList.unshift(assignmentmemberinfor);
    // }

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  // setAssignmentOfMemberToFinished(assignmentinfor) {
  //   let memberassignmentindex = this.ZeamsAssignments.findIndex(
  //     memberassignmentitem => {
  //       return memberassignmentitem.MemberID === assignmentinfor.MemberID;
  //     }
  //   );

  //   if (memberassignmentindex >= 0) {
  //     let allAssignmentIDToFinishedList = [];

  //     this.ZeamsAssignments[
  //       memberassignmentindex
  //     ].AssignmentMemberUnfinishedList.forEach(assignmentitem => {
  //       let memberexcerciseinfor = {
  //         MemberID: assignmentinfor.MemberID,
  //         ExcerciseID: assignmentitem.ExcerciseID
  //       };
  //       let checkFinishedExcercise = zeamsExcercisesMemberResults.checkMemberHaveDoneExcericse(
  //         memberexcerciseinfor
  //       );
  //       if (checkFinishedExcercise) {
  //         allAssignmentIDToFinishedList.push(assignmentitem.AssignmentID);

  //         this.ZeamsAssignments[
  //           memberassignmentindex
  //         ].AssignmentMemberFinishedList.unshift(assignmentitem);
  //       }
  //     });

  //     allAssignmentIDToFinishedList.forEach(assignmentiditem => {
  //       let assignmentidindex = this.ZeamsAssignments[
  //         memberassignmentindex
  //       ].AssignmentMemberUnfinishedList.findIndex(assignmentitem => {
  //         return assignmentitem.AssignmentID == assignmentiditem.AssignmentID;
  //       });

  //       this.ZeamsAssignments[
  //         memberassignmentindex
  //       ].AssignmentMemberUnfinishedList.splice(assignmentidindex, 1);
  //     });

  //     this.saveDataJSON();
  //   }
  // }

  //-----------------------------------------------------------------------------------------------------------------

  setAssignmentOfMemberOverTimeToFinished(assignmentinfor) {
    let memberassignmentindex = this.ZeamsAssignments.findIndex(
      memberassignmentitem => {
        return memberassignmentitem.MemberID === assignmentinfor.MemberID;
      }
    );

    if (memberassignmentindex >= 0) {
      this.ZeamsAssignments[
        memberassignmentindex
      ].AssignmentMemberUnfinishedList.forEach(assignmentitem => {
        let assignmentEndTimeInfor = {
          TeamNoteEndDate: assignmentitem.TeamNoteEndDate
        };
        let checkOverTime = this.checkOverTimeToFinished(
          assignmentEndTimeInfor
        );

        console.log("RA cái checkOverTime", checkOverTime);

        if (checkOverTime) {
          assignmentitem.CheckOverTimeToFinished = checkOverTime;
        }
      });

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkOverTimeToFinished(assignmentinfor) {
    let checkOverTime = false;
    if (
      moment(assignmentinfor.TeamNoteEndDate, "YYYY/MM/DD").year() <
      moment(moment(), "DD/MM/YYYY").year()
    ) {
      checkOverTime = true;
    } else if (
      moment(assignmentinfor.TeamNoteEndDate, "YYYY/MM/DD").year() ===
      moment(moment(), "DD/MM/YYYY").year()
    ) {
      if (
        moment(assignmentinfor.TeamNoteEndDate, "YYYY/MM/DD").month() <
        moment(moment(), "DD/MM/YYYY").month()
      ) {
        checkOverTime = true;
      } else if (
        moment(assignmentinfor.TeamNoteEndDate, "YYYY/MM/DD").month() ===
        moment(moment(), "DD/MM/YYYY").month()
      ) {
        if (
          moment(assignmentinfor.TeamNoteEndDate, "YYYY/MM/DD").date() <
          moment(moment(), "DD/MM/YYYY").date()
        ) {
          checkOverTime = true;
        }
      }
    }
    return checkOverTime;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkTurnInFinishedLateTime(assignmentinfor) {
    let checkTurnInFinishedTime = false;
    if (
      moment(assignmentinfor.TeamNoteEndDate, "YYYY/MM/DD").year() <
      moment(moment(), "DD/MM/YYYY").year()
    ) {
      checkTurnInFinishedTime = true;
    } else if (
      moment(assignmentinfor.TeamNoteEndDate, "YYYY/MM/DD").year() ===
      moment(moment(), "DD/MM/YYYY").year()
    ) {
      if (
        moment(assignmentinfor.TeamNoteEndDate, "YYYY/MM/DD").month() <
        moment(moment(), "DD/MM/YYYY").month()
      ) {
        checkTurnInFinishedTime = true;
      } else if (
        moment(assignmentinfor.TeamNoteEndDate, "YYYY/MM/DD").month() ===
        moment(moment(), "DD/MM/YYYY").month()
      ) {
        if (
          moment(assignmentinfor.TeamNoteEndDate, "YYYY/MM/DD").date() <
          moment(moment(), "DD/MM/YYYY").date()
        ) {
          checkTurnInFinishedTime = true;
        }
      }
    }
    return checkTurnInFinishedTime;
  }

  //-----------------------------------------------------------------------------------------------------------------

  setAssignmentTurnInOfMember(assignmentinfor, currentexcercisescore) {
    // console.log("ảo vão lozzzzzzzzzzzz ", assignmentinfor);
    let memberassignmentindex = this.ZeamsAssignments.findIndex(
      memberassignmentitem => {
        return memberassignmentitem.MemberID === assignmentinfor.MemberID;
      }
    );

    if (memberassignmentindex >= 0) {
      let assignmentofinishindex = this.ZeamsAssignments[
        memberassignmentindex
      ].AssignmentMemberUnfinishedList.findIndex(assignmenttofinishitem => {
        return (
          assignmenttofinishitem.AssignmentID === assignmentinfor.AssignmentID
        );
      });

      if (assignmentofinishindex >= 0) {
        // console.log("Như buoi aaaaaaaaaaaaaaaa");
        let assignmenttofinishitem = this.ZeamsAssignments[
          memberassignmentindex
        ].AssignmentMemberUnfinishedList[assignmentofinishindex];

        assignmenttofinishitem.AssignmentExcerciseScore = currentexcercisescore;
        assignmenttofinishitem.CheckTurnInFinishedLate = this.checkTurnInFinishedLateTime(
          assignmentinfor
        );

        this.ZeamsAssignments[
          memberassignmentindex
        ].AssignmentMemberFinishedList.unshift(assignmenttofinishitem);

        this.ZeamsAssignments[
          memberassignmentindex
        ].AssignmentMemberUnfinishedList.splice(assignmentofinishindex, 1);

        this.saveDataJSON();
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  getAllAssignmentUnfinishedList(assignmentinfor) {
    this.setAssignmentOfMemberOverTimeToFinished(assignmentinfor);
    let memberassignmentindex = this.ZeamsAssignments.findIndex(
      memberassignmentitem => {
        return memberassignmentitem.MemberID === assignmentinfor.MemberID;
      }
    );

    let allAssignmentUnfinishedList = [];

    if (memberassignmentindex >= 0) {
      allAssignmentUnfinishedList = this.ZeamsAssignments[memberassignmentindex]
        .AssignmentMemberUnfinishedList;
    }

    return allAssignmentUnfinishedList;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getAllAssignmentFinishedList(assignmentinfor) {
    // this.setAssignmentOfMemberToFinished(assignmentinfor);

    let memberassignmentindex = this.ZeamsAssignments.findIndex(
      memberassignmentitem => {
        return memberassignmentitem.MemberID === assignmentinfor.MemberID;
      }
    );

    let allAssignmentFinishedList = [];

    if (memberassignmentindex >= 0) {
      allAssignmentFinishedList = this.ZeamsAssignments[memberassignmentindex]
        .AssignmentMemberFinishedList;
    }

    return allAssignmentFinishedList;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseAllAssignmentUnfinishedList(assignmentinfor) {
    let resAssignmentUnfinished = {
      MemberID: assignmentinfor.MemberID,
      AllAssignmentUnfinishedList: this.getAllAssignmentUnfinishedList(
        assignmentinfor
      )
    };

    return resAssignmentUnfinished;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseAllAssignmentFinishedList(assignmentinfor) {
    let resAssignmentFinished = {
      MemberID: assignmentinfor.MemberID,
      AllAssignmentFinishedList: this.getAllAssignmentFinishedList(
        assignmentinfor
      )
    };

    return resAssignmentFinished;
  }

  //-----------------------------------------------------------------------------------------------------------------

  removeMemberAssignmentFromList(assignmentinfor) {
    let memberassignmentindex = this.ZeamsAssignments.findIndex(
      memberassignmentitem => {
        return memberassignmentitem.MemberID === assignmentinfor.MemberID;
      }
    );

    if (memberassignmentindex >= 0) {
      let assignmentunfinishedindex = this.ZeamsAssignments[
        memberassignmentindex
      ].AssignmentMemberUnfinishedList.findIndex(assignmentunfinisheditem => {
        return (
          assignmentunfinisheditem.TeamNoteID === assignmentinfor.TeamNoteID
        );
      });

      if (assignmentunfinishedindex >= 0) {
        this.ZeamsAssignments[
          memberassignmentindex
        ].AssignmentMemberUnfinishedList.splice(assignmentunfinishedindex, 1);
      }

      let assignmentfinishedindex = this.ZeamsAssignments[
        memberassignmentindex
      ].AssignmentMemberFinishedList.findIndex(assignmentfinisheditem => {
        return assignmentfinisheditem.TeamNoteID === assignmentinfor.TeamNoteID;
      });

      if (assignmentfinishedindex >= 0) {
        this.ZeamsAssignments[
          memberassignmentindex
        ].AssignmentMemberFinishedList.splice(assignmentfinishedindex, 1);
      }

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkExcericiseOfAssignmentMember(assignmentinfor) {
    let checkExcerciseOfAssignment = false;

    let memberassignmentindex = this.ZeamsAssignments.findIndex(
      memberassignmentitem => {
        return memberassignmentitem.MemberID === assignmentinfor.MemberID;
      }
    );

    if (memberassignmentindex >= 0) {
      let excercisefinishedindex = this.ZeamsAssignments[
        memberassignmentindex
      ].AssignmentMemberUnfinishedList.findIndex(assignmentfinisheditem => {
        return (
          assignmentfinisheditem.ExcerciseID === assignmentinfor.ExcerciseID
        );
      });

      if (excercisefinishedindex >= 0) {
        checkExcerciseOfAssignment = true;
      }
    }

    return checkExcerciseOfAssignment;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseTurnInAssignmentOfMember(assignmentinfor) {
    // console.log(
    //   "vào trong cái responseTurnInAssignmentOfMember ",
    //   assignmentinfor
    // );
    let memberassignmentindex = this.ZeamsAssignments.findIndex(
      memberassignmentitem => {
        return memberassignmentitem.MemberID === assignmentinfor.MemberID;
      }
    );

    let resTurnIn = {
      checkResTurnIn: ""
    };

    if (memberassignmentindex >= 0) {
      let assignmentofinishindex = this.ZeamsAssignments[
        memberassignmentindex
      ].AssignmentMemberUnfinishedList.findIndex(assignmenttofinishitem => {
        return (
          assignmenttofinishitem.AssignmentID === assignmentinfor.AssignmentID
        );
      });

      if (assignmentofinishindex >= 0) {
        let memberexcerciseinfor = {
          MemberID: assignmentinfor.MemberID,
          ExcerciseID: this.ZeamsAssignments[memberassignmentindex]
            .AssignmentMemberUnfinishedList[assignmentofinishindex].ExcerciseID
        };

        // console.log("Ra cái thằng memberexcerciseinfor ", memberexcerciseinfor);

        let checkFinishedExcercise = zeamsExcercisesMemberResults.checkMemberHaveDoneExcericse(
          memberexcerciseinfor
        );

        // console.log(
        //   "Ra cái thằng checkFinishedExcercise ",
        //   checkFinishedExcercise
        // );

        if (checkFinishedExcercise) {
          let currentExcerciseScore = zeamsExcercisesMemberResults.getTheHighestScoreOfMember(
            memberexcerciseinfor
          );

          // console.log(
          //   "ra thawfng currentExcerciseScore",
          //   currentExcerciseScore
          // );

          if (currentExcerciseScore === "0") {
            resTurnIn = {
              checkResTurnIn: "have-zero-score"
            };
          } else {
            resTurnIn = {
              checkResTurnIn: "turn-in-success"
            };
            this.setAssignmentTurnInOfMember(
              assignmentinfor,
              currentExcerciseScore
            );
          }
        } else {
          resTurnIn = {
            checkResTurnIn: "non-did-excercise"
          };
        }
      }
    }
    return resTurnIn;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseTurnInAssignmentOfMemberWithZeroScore(assignmentinfor) {
    let memberassignmentindex = this.ZeamsAssignments.findIndex(
      memberassignmentitem => {
        return memberassignmentitem.MemberID === assignmentinfor.MemberID;
      }
    );
    let resTurnIn = {
      checkResTurnIn: ""
    };

    if (memberassignmentindex >= 0) {
      let assignmentofinishindex = this.ZeamsAssignments[
        memberassignmentindex
      ].AssignmentMemberUnfinishedList.findIndex(assignmenttofinishitem => {
        return (
          assignmenttofinishitem.AssignmentID === assignmentinfor.AssignmentID
        );
      });

      if (assignmentofinishindex >= 0) {
        let memberexcerciseinfor = {
          MemberID: assignmentinfor.MemberID,
          ExcerciseID: this.ZeamsAssignments[memberassignmentindex]
            .AssignmentMemberUnfinishedList[assignmentofinishindex].ExcerciseID
        };

        let checkFinishedExcercise = zeamsExcercisesMemberResults.checkMemberHaveDoneExcericse(
          memberexcerciseinfor
        );

        if (checkFinishedExcercise) {
          let currentExcerciseScore = zeamsExcercisesMemberResults.getTheHighestScoreOfMember(
            memberexcerciseinfor
          );

          resTurnIn = {
            checkResTurnIn: "turn-in-success"
          };
          this.setAssignmentTurnInOfMember(
            assignmentinfor,
            currentExcerciseScore
          );
        } else {
          resTurnIn = {
            checkResTurnIn: "non-did-excercise"
          };
        }
      }
    }
    return resTurnIn;
  }

  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
}

let zeamsAssignments = new ZeamsAssignments();

module.exports = zeamsAssignments;
