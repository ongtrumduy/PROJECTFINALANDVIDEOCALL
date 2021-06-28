import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import zeamsTeams from "../zeamsTeams/zeamsTeams";
import zeamsAssignments from "../zeamsAssginments/zeamsAssignments";

class ZeamsTeamsNotes {
  constructor() {
    let teamsnotes = fs.readFileSync(
      "../BACKEND/source/databases/zeamsTeams/zeamsTeamsNotes.json"
    );
    if (teamsnotes.length > 0) {
      this.ZeamsTeamsNotes = JSON.parse(teamsnotes);
    } else {
      this.ZeamsTeamsNotes = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsTeams/zeamsTeamsNotes.json",
      JSON.stringify(this.ZeamsTeamsNotes),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewTeamNoteContentList(teamnoteinfor) {
    let newteamnotecontent = {
      TeamID: teamnoteinfor.TeamID,
      TeamNoteNonOutDateList: [],
      TeamNoteOutDateList: []
    };

    this.ZeamsTeamsNotes.push(newteamnotecontent);

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewTeamNote(teamnoteinfor) {
    // console.log("Lấy dữ liệu vào trong đây", teamnoteinfor);

    let teamindex = this.ZeamsTeamsNotes.findIndex(teamitem => {
      return teamitem.TeamID === teamnoteinfor.TeamID;
    });

    if (teamindex < 0) {
      this.createNewTeamNoteContentList(teamnoteinfor);
    }

    let teamnoteindex = this.ZeamsTeamsNotes.findIndex(teamitem => {
      return teamitem.TeamID === teamnoteinfor.TeamID;
    });

    let teamNoteCreateDate = moment().format("HH:mm DD-MM-YYYY");

    let teamNoteID = uuidv4();

    let teamnotecontent = {
      TeamNoteID: teamNoteID,
      TeamNoteName: teamnoteinfor.TeamNoteName,
      TeamNoteDescription: teamnoteinfor.TeamNoteDescription,
      TeamNoteCreateDate: teamNoteCreateDate,
      TeamNoteEndDate: moment(teamnoteinfor.TeamNoteEndDate).format(
        "DD-MM-YYYY"
      ),
      TeamNoteRemoveDate: moment(teamnoteinfor.TeamNoteEndDate)
        .add(7, "days")
        .format("DD-MM-YYYY"),
      TeamNoteTypeContent: []
    };

    if (teamnoteinfor.TeamNoteType === "with-excercise") {
      teamnotecontent.TeamNoteTypeContent.push({
        TeamNoteType: "with-excercise",
        ExcerciseTeamNoteID: teamnoteinfor.ExcerciseTeamNoteID
      });

      this.createNewAssignmentForAllMemberOfTeam(
        teamnoteinfor,
        teamNoteCreateDate,
        teamNoteID
      );
    } else {
      teamnotecontent.TeamNoteTypeContent.push({
        TeamNoteType: "none-with-excercise"
      });
    }

    this.ZeamsTeamsNotes[teamnoteindex].TeamNoteNonOutDateList.push(
      teamnotecontent
    );

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewAssignmentForAllMemberOfTeam(
    teamnoteinfor,
    teamNoteCreateDate,
    teamNoteID
  ) {
    let allMemberOfTeam = zeamsTeams.getAllMemberIDsOfTeam(teamnoteinfor);

    let teamforassignmentinfor = zeamsTeams.getTeamInforOfTeam(teamnoteinfor);

    // console.log("ra teamforassignmentinfor ", teamforassignmentinfor);

    allMemberOfTeam.forEach(memberitem => {
      let assignmentinfor = {
        MemberID: memberitem.MemberID,
        TeamNoteID: teamNoteID,
        TeamNoteName: teamnoteinfor.TeamNoteName,
        TeamNoteDescription: teamnoteinfor.TeamNoteDescription,
        TeamNoteCreateDate: teamNoteCreateDate,
        TeamNoteEndDate: moment(teamnoteinfor.TeamNoteEndDate).format(
          "DD-MM-YYYY"
        ),
        TeamID: teamnoteinfor.TeamID,
        TeamLogo: teamforassignmentinfor.TeamLogo,
        ExcerciseID: teamnoteinfor.ExcerciseTeamNoteID
      };

      zeamsAssignments.addNewAssignmentOfMember(assignmentinfor);
    });
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkExistTeamNoteNameContent(teamnoteinfor) {
    // console.log("dữ liệu nhảy vào đây ", teamnoteinfor);
    let teamnoteindex = this.ZeamsTeamsNotes.findIndex(teamnoteitem => {
      return teamnoteitem.TeamID === teamnoteinfor.TeamID;
    });

    let checkResCreateNewTeamNote = false;

    if (teamnoteindex >= 0) {
      let checkExistTeamNoteNameIndex = this.ZeamsTeamsNotes[
        teamnoteindex
      ].TeamNoteNonOutDateList.findIndex(teamnoteitem => {
        return teamnoteitem.TeamNoteName === teamnoteinfor.TeamNoteName;
      });

      if (checkExistTeamNoteNameIndex >= 0) {
        checkResCreateNewTeamNote = true;
      }
    }
    // console.log("Ra checkResCreateNewTeamNote", checkResCreateNewTeamNote);

    return checkResCreateNewTeamNote;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkCreateTeamNoteEndDate(teamnoteinfor) {
    let checkEndDate = false;
    if (
      moment(teamnoteinfor.TeamNoteEndDate, "YYYY/MM/DD").year() >
      moment(moment(), "DD/MM/YYYY").year()
    ) {
      checkEndDate = true;
    } else if (
      moment(teamnoteinfor.TeamNoteEndDate, "YYYY/MM/DD").year() ===
      moment(moment(), "DD/MM/YYYY").year()
    ) {
      if (
        moment(teamnoteinfor.TeamNoteEndDate, "YYYY/MM/DD").month() >
        moment(moment(), "DD/MM/YYYY").month()
      ) {
        checkEndDate = true;
      } else if (
        moment(teamnoteinfor.TeamNoteEndDate, "YYYY/MM/DD").month() ===
        moment(moment(), "DD/MM/YYYY").month()
      ) {
        if (
          moment(teamnoteinfor.TeamNoteEndDate, "YYYY/MM/DD").date() >
          moment(moment(), "DD/MM/YYYY").date()
        ) {
          checkEndDate = true;
        }
      }
    }
    return checkEndDate;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseCreateNewTeamNote(teamnoteinfor) {
    let resCreateNewTeamNote = {};

    if (Object.keys(teamnoteinfor.TeamNoteName).length === 0) {
      resCreateNewTeamNote = {
        checkValidate: "team-note-name"
      };
    } else if (Object.keys(teamnoteinfor.TeamNoteEndDate).length === 0) {
      resCreateNewTeamNote = {
        checkValidate: "note-end-date"
      };
    } else if (this.checkExistTeamNoteNameContent(teamnoteinfor)) {
      resCreateNewTeamNote = {
        checkValidate: "exist-excercise-name"
      };
    } else if (!this.checkCreateTeamNoteEndDate(teamnoteinfor)) {
      resCreateNewTeamNote = {
        checkValidate: "non-pass-end-date"
      };
    } else {
      this.createNewTeamNote(teamnoteinfor);

      resCreateNewTeamNote = {
        checkValidate: "success-create-note"
      };
    }

    return resCreateNewTeamNote;
  }

  //-----------------------------------------------------------------------------------------------------------------

  // getAllTeamNoteContentList(teamnoteinfor) {
  //   let teamnoteindex = this.ZeamsTeamsNotes.findIndex(teamnoteitem => {
  //     return teamnoteitem.TeamID === teamnoteinfor.TeamID;
  //   });

  //   let allTeamNoteContentList = [];

  //   if (teamnoteindex >= 0) {
  //     this.getAllTeamNoteOutDate(teamnoteinfor);

  //     this.getAllTeamNoteRemoveDate(teamnoteinfor);
  //   }

  //   return allTeamNoteContentList;
  // }

  //-----------------------------------------------------------------------------------------------------------------

  setAllTeamNoteNonOutDateList(teamnoteinfor) {
    let teamnoteindex = this.ZeamsTeamsNotes.findIndex(teamnoteitem => {
      return teamnoteitem.TeamID === teamnoteinfor.TeamID;
    });

    if (teamnoteindex >= 0) {
      let allTeamNoteIDOutDateList = [];

      let nowdate = moment().format("DD-MM-YYYY");

      this.ZeamsTeamsNotes[teamnoteindex].TeamNoteNonOutDateList.forEach(
        teamnoteitem => {
          if (teamnoteitem.TeamNoteEndDate === nowdate) {
            allTeamNoteIDOutDateList.push(teamnoteitem.TeamNoteID);
            this.ZeamsTeamsNotes[teamnoteindex].TeamNoteOutDateList.push(
              teamnoteitem
            );
          }
        }
      );

      allTeamNoteIDOutDateList.forEach(teamnoteoutdateitem => {
        let teamnoteoutdateindex = this.ZeamsTeamsNotes[
          teamnoteindex
        ].TeamNoteNonOutDateList.findIndex(teamnoteitem => {
          return teamnoteitem.TeamNoteID == teamnoteoutdateitem.TeamNoteID;
        });

        this.ZeamsTeamsNotes[teamnoteindex].TeamNoteNonOutDateList.splice(
          teamnoteoutdateindex,
          1
        );
      });

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  setAllTeamNoteOutDateList(teamnoteinfor) {
    let teamnoteindex = this.ZeamsTeamsNotes.findIndex(teamnoteitem => {
      return teamnoteitem.TeamID === teamnoteinfor.TeamID;
    });

    if (teamnoteindex >= 0) {
      let allTeamNoteIDRemoveDateList = [];

      let nowdate = moment().format("DD-MM-YYYY");

      this.ZeamsTeamsNotes[teamnoteindex].TeamNoteOutDateList.forEach(
        teamnoteitem => {
          if (teamnoteitem.TeamNoteRemoveDate === nowdate) {
            allTeamNoteIDRemoveDateList.push(teamnoteitem.TeamNoteID);
          }
        }
      );

      allTeamNoteIDRemoveDateList.forEach(teamnoteremovedateitem => {
        let teamnoteremovedateindex = this.ZeamsTeamsNotes[
          teamnoteindex
        ].TeamNoteOutDateList.findIndex(teamnoteitem => {
          return teamnoteitem.TeamNoteID == teamnoteremovedateitem.TeamNoteID;
        });

        this.ZeamsTeamsNotes[teamnoteindex].TeamNoteOutDateList.splice(
          teamnoteremovedateindex,
          1
        );

        let teamnoteremoveinfor = {
          TeamID: teamnoteinfor.TeamID,
          TeamNoteID: teamnoteoutdateitem.TeamNoteID
        };

        this.removeMemberAssignmentFromTeamNoteList(teamnoteremoveinfor);
      });

      this.saveDataJSON();
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  getAllTeamNoteNonOutDateList(teamnoteinfor) {
    this.setAllTeamNoteNonOutDateList(teamnoteinfor);

    let allTeamNoteNonOutDate = [];

    let teamnoteindex = this.ZeamsTeamsNotes.findIndex(teamnoteitem => {
      return teamnoteitem.TeamID === teamnoteinfor.TeamID;
    });

    if (teamnoteindex >= 0) {
      allTeamNoteNonOutDate = this.ZeamsTeamsNotes[teamnoteindex]
        .TeamNoteNonOutDateList;
    }

    return allTeamNoteNonOutDate;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getAllTeamNoteOutDateList(teamnoteinfor) {
    this.setAllTeamNoteNonOutDateList(teamnoteinfor);

    this.setAllTeamNoteOutDateList(teamnoteinfor);

    let allTeamNoteOutDate = [];

    let teamnoteindex = this.ZeamsTeamsNotes.findIndex(teamnoteitem => {
      return teamnoteitem.TeamID === teamnoteinfor.TeamID;
    });

    if (teamnoteindex >= 0) {
      allTeamNoteOutDate = this.ZeamsTeamsNotes[teamnoteindex]
        .TeamNoteOutDateList;
    }

    return allTeamNoteOutDate;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseAllTeamNoteNonOutDateList(teamnoteinfor) {
    let allTeamNoteNonOutDate = this.getAllTeamNoteNonOutDateList(
      teamnoteinfor
    );

    let resAllTeamNoteNonOutDate = {
      TeamNoteNonOutDateContentList: allTeamNoteNonOutDate,
      TeamID: teamnoteinfor.TeamID
    };

    return resAllTeamNoteNonOutDate;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseAllTeamNoteOutDateList(teamnoteinfor) {
    let allTeamNoteOutDate = this.getAllTeamNoteOutDateList(teamnoteinfor);

    let resAllTeamNoteOutDate = {
      TeamNoteOutDateContentList: allTeamNoteOutDate,
      TeamID: teamnoteinfor.TeamID
    };

    return resAllTeamNoteOutDate;
  }

  //-----------------------------------------------------------------------------------------------------------------

  removeTeamNoteItemFromNonOutDateList(teamnoteinfor) {
    let teamnoteindex = this.ZeamsTeamsNotes.findIndex(teamnoteitem => {
      return teamnoteitem.TeamID === teamnoteinfor.TeamID;
    });

    if (teamnoteindex >= 0) {
      let teamnotenonoutdateindex = this.ZeamsTeamsNotes[
        teamnoteindex
      ].TeamNoteNonOutDateList.findIndex(teamnoteitem => {
        return teamnoteitem.TeamNoteID === teamnoteinfor.TeamNoteID;
      });

      if (teamnotenonoutdateindex >= 0) {
        this.ZeamsTeamsNotes[teamnoteindex].TeamNoteNonOutDateList.splice(
          teamnotenonoutdateindex,
          1
        );

        this.removeMemberAssignmentFromTeamNoteList(teamnoteinfor);

        this.saveDataJSON();
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  removeMemberAssignmentFromTeamNoteList(teamnoteinfor) {
    let allMemberOfTeam = zeamsTeams.getAllMemberIDsOfTeam(teamnoteinfor);

    allMemberOfTeam.forEach(memberitem => {
      let assignmentinfor = {
        MemberID: memberitem.MemberID,
        TeamNoteID: teamnoteinfor.TeamNoteID
      };

      zeamsAssignments.removeMemberAssignmentFromList(assignmentinfor);
    });
  }

  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------

  removeTeamNoteItemFromOutDateList(teamnoteinfor) {
    // console.log("Dữ liệu vào trong này", teamnoteinfor);
    let teamnoteindex = this.ZeamsTeamsNotes.findIndex(teamnoteitem => {
      return teamnoteitem.TeamID === teamnoteinfor.TeamID;
    });

    if (teamnoteindex >= 0) {
      let teamnoteoutdateindex = this.ZeamsTeamsNotes[
        teamnoteindex
      ].TeamNoteOutDateList.findIndex(teamnoteitem => {
        return teamnoteitem.TeamNoteID === teamnoteinfor.TeamNoteID;
      });

      if (teamnoteoutdateindex >= 0) {
        this.ZeamsTeamsNotes[teamnoteindex].TeamNoteOutDateList.splice(
          teamnoteoutdateindex,
          1
        );

        this.removeMemberAssignmentFromTeamNoteList(teamnoteinfor);

        this.saveDataJSON();
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
}
let zeamsTeamsNotes = new ZeamsTeamsNotes();

module.exports = zeamsTeamsNotes;
