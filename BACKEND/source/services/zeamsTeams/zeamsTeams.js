import fs from "fs";
import { v1 as uuidv1 } from "uuid";
import zeamMembers from "../zeamsMembers/zeamsMembers";

class ZeamsTeams {
  constructor() {
    let teams = fs.readFileSync(
      "../BACKEND/source/databases/zeamsTeams/zeamsTeams.json"
    );
    if (teams.length > 0) {
      this.ZeamsTeams = JSON.parse(teams);
    } else {
      this.ZeamsTeams = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsTeams/zeamsTeams.json",
      JSON.stringify(this.ZeamsTeams),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewTeam(teaminfor) {
    let TeamID = uuidv1();

    let newteam = {
      TeamID: TeamID,
      TeamAdminMemberList: [],
      TeamInfor: [],
      TeamMemberList: []
    };
    let newteaminfor = {
      TeamName: teaminfor.TeamName,
      TeamType: teaminfor.TeamType,
      TeamDescription: teaminfor.TeamDescription,
      TeamLogo: teaminfor.TeamLogo
    };
    newteam.TeamInfor.push(newteaminfor);

    let newadminmember = {
      MemberID: teaminfor.MemberID
    };
    newteam.TeamAdminMemberList.push(newadminmember);

    let newteammember = {
      MemberID: teaminfor.MemberID
    };
    newteam.TeamMemberList.push(newteammember);

    this.ZeamsTeams.push(newteam);
    this.saveDataJSON();

    return TeamID;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkCreateNewTeam(teaminfor) {
    let checkcreatenewteam = false;
    this.ZeamsTeams.forEach(teamitem => {
      teamitem.TeamInfor.forEach(teaminforitem => {
        if (teaminforitem.TeamName === teaminfor.TeamName) {
          checkcreatenewteam = true;
        }
      });
    });
    return checkcreatenewteam;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseCreateNewTeam(teaminfor) {
    let resCreateNewTeam;
    if (Object.keys(teaminfor.TeamName).length === 0) {
      resCreateNewTeam = {
        checkValidate: "teamname"
      };
    } else {
      let checkcreatenewteam = this.checkCreateNewTeam(teaminfor);
      if (checkcreatenewteam) {
        resCreateNewTeam = {
          checkValidate: "existed-team"
        };
      } else {
        let TeamID = this.createNewTeam(teaminfor);
        resCreateNewTeam = {
          checkValidate: "success-create-team",
          TeamID: TeamID
        };
      }
    }
    return resCreateNewTeam;
  }
  //-----------------------------------------------------------------------------------------------------------------

  getAllTeamOfMemberList(teaminfor) {
    let allTeamList = [];
    this.ZeamsTeams.forEach(teamitem => {
      teamitem.TeamMemberList.forEach(memberitem => {
        if (teaminfor.MemberID === memberitem.MemberID) {
          let TeamInfor = {
            TeamID: teamitem.TeamID,
            TeamInfor: teamitem.TeamInfor
          };
          allTeamList.push(TeamInfor);
        }
      });
    });
    return allTeamList;
  }

  responseAllTeamListOfMember(teaminfor) {
    let resAllTeamList = {
      AllTeamList: this.getAllTeamOfMemberList(teaminfor)
    };

    return resAllTeamList;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getAllMemberIDsOfTeam(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });

    let resTeamMemberList = [];

    if (teamindex >= 0) {
      resTeamMemberList = this.ZeamsTeams[teamindex].TeamMemberList;
    }
    return resTeamMemberList;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getChoiceJoinedTeamInfor(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });
    let choicejoinedteaminfor = [];
    if (teamindex >= 0) {
      choicejoinedteaminfor = this.ZeamsTeams[teamindex].TeamInfor;
    }
    return choicejoinedteaminfor;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getKickedTeamName(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });
    let kickedteamname = "";
    if (teamindex >= 0) {
      kickedteamname = this.ZeamsTeams[teamindex].TeamInfor[0].TeamName;
    }
    return kickedteamname;
  }

  //-----------------------------------------------------------------------------------------------------------------

  addNewMemberToTeam(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamCodeToJoin;
    });
    let newMemberID = {
      MemberID: teaminfor.MemberID
    };
    if (teamindex >= 0) {
      this.ZeamsTeams[teamindex].TeamMemberList.push(newMemberID);
    }
    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseSearchTeamToJoinTeam(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamCodeToJoin;
    });

    let resSearchTeamToJoinTeam = {};

    if (teamindex >= 0) {
      let memberteamindex = this.ZeamsTeams[teamindex].TeamMemberList.findIndex(
        memberteamitem => {
          return memberteamitem.MemberID === teaminfor.MemberID;
        }
      );
      if (memberteamindex >= 0) {
        resSearchTeamToJoinTeam = {
          checkValidate: "joined-team"
        };
      } else {
        this.addNewMemberToTeam(teaminfor);
        resSearchTeamToJoinTeam = {
          checkValidate: "success-joined"
        };
      }
    } else {
      resSearchTeamToJoinTeam = {
        checkValidate: "non-existed-team"
      };
    }

    return resSearchTeamToJoinTeam;
  }

  //-----------------------------------------------------------------------------------------------------------------

  setCheckMemberIsAdmin(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });
    let adminmemberindex;
    if (teamindex >= 0) {
      adminmemberindex = this.ZeamsTeams[
        teamindex
      ].TeamAdminMemberList.findIndex(adminmemberitem => {
        return adminmemberitem.MemberID === teaminfor.MemberID;
      });

      if (adminmemberindex >= 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseChoiceJoinedTeamInfor(teaminfor) {
    let resChoiceJoinedTeamInfor = {};

    let TeamAllInfor = this.getChoiceJoinedTeamInfor(teaminfor);

    let checkMemberIsAdmin = this.setCheckMemberIsAdmin(teaminfor);

    resChoiceJoinedTeamInfor = {
      TeamID: teaminfor.TeamID,
      TeamAllInfor: TeamAllInfor,
      CheckMemberIsAdmin: checkMemberIsAdmin
    };

    return resChoiceJoinedTeamInfor;
  }

  //-----------------------------------------------------------------------------------------------------------------

  getAllMemberInforOfTeam(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });

    let allMemberInforOfTeam = [];

    if (teamindex >= 0) {
      let TeamMemberList = this.ZeamsTeams[teamindex].TeamMemberList;

      TeamMemberList.forEach(teammemberitem => {
        let toCheckMemberIsAdmin = {
          TeamID: teaminfor.TeamID,
          MemberID: teammemberitem.MemberID
        };

        let teamMemberItem = {
          MemberID: teammemberitem.MemberID,
          MemberFullName: zeamMembers.getMemberFullName(teammemberitem),
          CheckMemberIsAdmin: this.setCheckMemberIsAdmin(toCheckMemberIsAdmin)
        };

        allMemberInforOfTeam.push(teamMemberItem);
      });
    }

    return allMemberInforOfTeam;
  }

  //-----------------------------------------------------------------------------------------------------------------

  resGetAllMemberInforOfTeam(teaminfor) {
    let resGetAllMember = {
      AllMemberOfTeam: this.getAllMemberInforOfTeam(teaminfor),
      TeamID: teaminfor.TeamID
    };

    return resGetAllMember;
  }

  //-----------------------------------------------------------------------------------------------------------------

  editChoiceTeamName(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });

    console.log("vào đây mà ", teamindex);

    if (teamindex >= 0) {
      this.ZeamsTeams[teamindex].TeamInfor[0].TeamName = teaminfor.TeamName;

      this.saveDataJSON();
    }
  }

  //----------------------------------------------------------------------------------------------------------------- //-----------------------------------------------------------------------------------------------------------------

  editChoiceTeamDescription(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });

    if (teamindex >= 0) {
      this.ZeamsTeams[teamindex].TeamInfor[0].TeamDescription =
        teaminfor.TeamDescription;

      this.saveDataJSON();
    }
  }

  //----------------------------------------------------------------------------------------------------------------- //-----------------------------------------------------------------------------------------------------------------

  editChoiceTeamType(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });

    if (teamindex >= 0) {
      this.ZeamsTeams[teamindex].TeamInfor[0].TeamType = teaminfor.TeamType;

      this.saveDataJSON();
    }
  }

  //----------------------------------------------------------------------------------------------------------------- //-----------------------------------------------------------------------------------------------------------------

  addMemberBecomeAdminToList(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });

    if (teamindex >= 0) {
      let memberadminindex = this.ZeamsTeams[
        teamindex
      ].TeamAdminMemberList.findIndex(memberadminitem => {
        return memberadminitem.MemberID === teaminfor.MemberID;
      });

      if (memberadminindex < 0) {
        let newadmin = {
          MemberID: teaminfor.MemberID
        };

        this.ZeamsTeams[teamindex].TeamAdminMemberList.push(newadmin);

        this.saveDataJSON();
      }
    }
  }

  //----------------------------------------------------------------------------------------------------------------- //-----------------------------------------------------------------------------------------------------------------

  removeMemberAdminFromList(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });

    if (teamindex >= 0) {
      let memberadminindex = this.ZeamsTeams[
        teamindex
      ].TeamAdminMemberList.findIndex(memberadminitem => {
        return memberadminitem.MemberID === teaminfor.MemberID;
      });

      if (memberadminindex >= 0) {
        this.ZeamsTeams[teamindex].TeamAdminMemberList.splice(
          memberadminindex,
          1
        );

        this.saveDataJSON();
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  removeMemberFromTeamList(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });

    if (teamindex >= 0) {
      let memberindex = this.ZeamsTeams[teamindex].TeamMemberList.findIndex(
        memberadminitem => {
          return memberadminitem.MemberID === teaminfor.MemberID;
        }
      );

      if (memberindex >= 0) {
        this.ZeamsTeams[teamindex].TeamMemberList.splice(memberindex, 1);

        let memberadminindex = this.ZeamsTeams[
          teamindex
        ].TeamAdminMemberList.findIndex(memberadminitem => {
          return memberadminitem.MemberID === teaminfor.MemberID;
        });

        if (memberadminindex >= 0) {
          this.ZeamsTeams[teamindex].TeamAdminMemberList.splice(
            memberadminindex,
            1
          );
        }

        this.saveDataJSON();
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  getTeamInforOfTeam(teaminfor) {
    let teamindex = this.ZeamsTeams.findIndex(teamitem => {
      return teamitem.TeamID === teaminfor.TeamID;
    });

    console.log("Dữ liệu đổ vào ", teaminfor);

    let teamInfor = { TeamLogo: "" };

    if (teamindex >= 0) {
      teamInfor = {
        TeamLogo: this.ZeamsTeams[teamindex].TeamInfor[0].TeamLogo
      };
    }

    return teamInfor;
  }

  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------
}
let zeamsTeams = new ZeamsTeams();

module.exports = zeamsTeams;
