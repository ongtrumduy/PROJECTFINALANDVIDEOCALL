import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import zeamsMembers from "../zeamsMembers/zeamsMembers";

class ZeamsTeamsDiscussComments {
  constructor() {
    let teamsdiscusscomments = fs.readFileSync(
      "../BACKEND/source/databases/zeamsTeams/zeamsTeamsDiscussComments.json"
    );
    if (teamsdiscusscomments.length > 0) {
      this.ZeamsTeamsDiscussComments = JSON.parse(teamsdiscusscomments);
    } else {
      this.ZeamsTeamsDiscussComments = [];
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  saveDataJSON() {
    fs.writeFileSync(
      "../BACKEND/source/databases/zeamsTeams/zeamsTeamsDiscussComments.json",
      JSON.stringify(this.ZeamsTeamsDiscussComments),
      err => {
        if (err) throw err;
        console.log("Complete!!!");
      }
    );
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewTeamDiscussContent(discusscomment) {
    let newdiscuss = {
      TeamID: discusscomment.TeamID,
      TeamDiscussContent: []
    };

    let newdiscusscomment = {
      TeamDiscussID: discusscomment.TeamDiscussID,
      TeamCommentContent: []
    };

    newdiscuss.TeamDiscussContent.push(newdiscusscomment);

    this.ZeamsTeamsDiscussComments.push(newdiscuss);
    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewTeamDiscussComment(discusscomment) {
    let teamindex = this.ZeamsTeamsDiscussComments.findIndex(teamitem => {
      return teamitem.TeamID === discusscomment.TeamID;
    });

    if (teamindex < 0) {
      this.createNewTeamDiscussContent(discusscomment);
    } else {
      let memberdiscussindex = this.ZeamsTeamsDiscussComments[
        teamindex
      ].TeamDiscussContent.findIndex(memberdiscussitem => {
        return memberdiscussitem.TeamDiscussID === discusscomment.TeamDiscussID;
      });

      if (memberdiscussindex < 0) {
        let newdiscusscomment = {
          TeamDiscussID: discusscomment.TeamDiscussID,
          TeamCommentContent: []
        };

        this.ZeamsTeamsDiscussComments[teamindex].TeamDiscussContent.push(
          newdiscusscomment
        );
      }
    }

    this.saveDataJSON();
  }

  //-----------------------------------------------------------------------------------------------------------------

  createNewTeamMemberDiscussCommentContent(discusscomment) {
    let teamindex = this.ZeamsTeamsDiscussComments.findIndex(teamitem => {
      return teamitem.TeamID === discusscomment.TeamID;
    });
    if (teamindex >= 0) {
      let memberdiscussindex = this.ZeamsTeamsDiscussComments[
        teamindex
      ].TeamDiscussContent.findIndex(memberdiscussitem => {
        return memberdiscussitem.TeamDiscussID === discusscomment.TeamDiscussID;
      });

      if (memberdiscussindex >= 0) {
        if (Object.keys(discusscomment.MemberDiscussComment).length !== 0) {
          let membercomment = {
            TeamCommentID: uuidv4(),
            MemberCommentID: discusscomment.MemberID,
            MemberCommentFullName: zeamsMembers.getMemberFullName(
              discusscomment
            ),
            MemberCommentContent: discusscomment.MemberDiscussComment,
            MemberCommentTime: moment().format("HH:mm DD-MM-YYYY")
          };

          this.ZeamsTeamsDiscussComments[teamindex].TeamDiscussContent[
            memberdiscussindex
          ].TeamCommentContent.push(membercomment);

          this.saveDataJSON();
        }
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  getTeamDiscussCommentContentList(discusscomment) {
    this.createNewTeamDiscussComment(discusscomment);

    let currentTeamDiscussCommentContent = [];

    // console.log("Dữ liệu đổ vào đây comment", discusscomment);
    let teamindex = this.ZeamsTeamsDiscussComments.findIndex(teamitem => {
      return teamitem.TeamID === discusscomment.TeamID;
    });

    // console.log("Ra teamindex", teamindex);
    if (teamindex >= 0) {
      let memberdiscussindex = this.ZeamsTeamsDiscussComments[
        teamindex
      ].TeamDiscussContent.findIndex(discussitem => {
        return discussitem.TeamDiscussID === discusscomment.TeamDiscussID;
      });

      if (memberdiscussindex >= 0) {
        let currentIndexToRenderDiscussCommentContent = Number(
          discusscomment.CurrentIndexToRenderDiscussCommentContent
        );

        let numberRenderDiscussCommentContent = Number(
          discusscomment.NumberRenderDiscussCommentContent
        );

        let indexOfLastDiscussComment = this.ZeamsTeamsDiscussComments[
          teamindex
        ].TeamDiscussContent[memberdiscussindex].TeamCommentContent.length;

        let indexOfFirstDiscussComment =
          indexOfLastDiscussComment -
          currentIndexToRenderDiscussCommentContent *
            numberRenderDiscussCommentContent;

        if (indexOfFirstDiscussComment < 0) {
          indexOfFirstDiscussComment = 0;
        }

        currentTeamDiscussCommentContent = this.ZeamsTeamsDiscussComments[
          teamindex
        ].TeamDiscussContent[memberdiscussindex].TeamCommentContent.slice(
          indexOfFirstDiscussComment,
          indexOfLastDiscussComment
        );
      }
    }

    // console.log("Ra memberdiscussindex", memberdiscussindex);

    return currentTeamDiscussCommentContent;
  }

  //-----------------------------------------------------------------------------------------------------------------

  checkNextRenderDiscussCommentContent(discusscomment) {
    let checkNextRenderDiscussCommentContent = false;

    let teamindex = this.ZeamsTeamsDiscussComments.findIndex(teamitem => {
      return teamitem.TeamID === discusscomment.TeamID;
    });

    if (teamindex >= 0) {
      let memberdiscussindex = this.ZeamsTeamsDiscussComments[
        teamindex
      ].TeamDiscussContent.findIndex(discussitem => {
        return discussitem.TeamDiscussID === discusscomment.TeamDiscussID;
      });

      if (memberdiscussindex >= 0) {
        let currentIndexToRenderDiscussCommentContent = Number(
          discusscomment.CurrentIndexToRenderDiscussCommentContent
        );

        let numberRenderDiscussCommentContent = Number(
          discusscomment.NumberRenderDiscussCommentContent
        );

        if (teamindex >= 0) {
          let numberOfDiscussCommmentContentList = this
            .ZeamsTeamsDiscussComments[teamindex].TeamDiscussContent[
            memberdiscussindex
          ].TeamCommentContent.length;

          let indexOfLastDiscussComment =
            currentIndexToRenderDiscussCommentContent *
            numberRenderDiscussCommentContent;

          if (indexOfLastDiscussComment < numberOfDiscussCommmentContentList) {
            checkNextRenderDiscussCommentContent = true;
          } else {
            checkNextRenderDiscussCommentContent = false;
          }
        }
      }
    }

    return checkNextRenderDiscussCommentContent;
  }

  //-----------------------------------------------------------------------------------------------------------------

  responseTeamDiscussCommentContent(discusscomment) {
    let resteamsdiscusscommentcontent;

    let currentTeamDiscussCommentContent = this.getTeamDiscussCommentContentList(
      discusscomment
    );

    let checkNextRenderDiscussCommentContent = this.checkNextRenderDiscussCommentContent(
      discusscomment
    );

    resteamsdiscusscommentcontent = {
      CurrentTeamDiscussCommentContent: currentTeamDiscussCommentContent,
      CheckNextRenderDiscussCommentContent: checkNextRenderDiscussCommentContent,
      TeamID: discusscomment.TeamID,
      TeamDiscussID: discusscomment.TeamDiscussID
    };

    // console.log("RA lên cái này để còn lấy ra nào", resteamsdiscusscontent);

    return resteamsdiscusscommentcontent;
  }

  //-----------------------------------------------------------------------------------------------------------------

  editChoiceTeamDiscussComment(discusscomment) {
    let teamindex = this.ZeamsTeamsDiscussComments.findIndex(teamitem => {
      return teamitem.TeamID === discusscomment.TeamID;
    });

    if (teamindex >= 0) {
      let memberdiscussindex = this.ZeamsTeamsDiscussComments[
        teamindex
      ].TeamDiscussContent.findIndex(discussitem => {
        return discussitem.TeamDiscussID === discusscomment.TeamDiscussID;
      });

      if (memberdiscussindex >= 0) {
        let discusscommentindex = this.ZeamsTeamsDiscussComments[
          teamindex
        ].TeamDiscussContent[memberdiscussindex].TeamCommentContent.findIndex(
          commentitem => {
            return commentitem.TeamCommentID === discusscomment.TeamCommentID;
          }
        );

        if (discusscommentindex >= 0) {
          this.ZeamsTeamsDiscussComments[teamindex].TeamDiscussContent[
            memberdiscussindex
          ].TeamCommentContent[discusscommentindex].MemberCommentContent =
            discusscomment.MemberCommentContent;

          this.saveDataJSON();
        }
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  deleteChoiceTeamDiscussComment(discusscomment) {
    let teamindex = this.ZeamsTeamsDiscussComments.findIndex(teamitem => {
      return teamitem.TeamID === discusscomment.TeamID;
    });

    if (teamindex >= 0) {
      let memberdiscussindex = this.ZeamsTeamsDiscussComments[
        teamindex
      ].TeamDiscussContent.findIndex(discussitem => {
        return discussitem.TeamDiscussID === discusscomment.TeamDiscussID;
      });

      if (memberdiscussindex >= 0) {
        let discusscommentindex = this.ZeamsTeamsDiscussComments[
          teamindex
        ].TeamDiscussContent[memberdiscussindex].TeamCommentContent.findIndex(
          commentitem => {
            return commentitem.TeamCommentID === discusscomment.TeamCommentID;
          }
        );

        if (discusscommentindex >= 0) {
          this.ZeamsTeamsDiscussComments[teamindex].TeamDiscussContent[
            memberdiscussindex
          ].TeamCommentContent.splice(discusscommentindex, 1);

          this.saveDataJSON();
        }
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------

  deleteChoiceTeamDiscussOfComment(discusscomment) {
    let teamindex = this.ZeamsTeamsDiscussComments.findIndex(teamitem => {
      return teamitem.TeamID === discusscomment.TeamID;
    });

    if (teamindex >= 0) {
      let memberdiscussindex = this.ZeamsTeamsDiscussComments[
        teamindex
      ].TeamDiscussContent.findIndex(discussitem => {
        return discussitem.TeamDiscussID === discusscomment.TeamDiscussID;
      });

      if (memberdiscussindex >= 0) {
        this.ZeamsTeamsDiscussComments[teamindex].TeamDiscussContent.splice(
          memberdiscussindex,
          1
        );

        this.saveDataJSON();
      }
    }
  }

  //-----------------------------------------------------------------------------------------------------------------
}

let zeamsTeamsDiscussComments = new ZeamsTeamsDiscussComments();

module.exports = zeamsTeamsDiscussComments;
