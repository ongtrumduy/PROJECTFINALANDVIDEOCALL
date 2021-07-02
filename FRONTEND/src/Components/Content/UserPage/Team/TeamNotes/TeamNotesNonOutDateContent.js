import React from "react";
import axios from "axios";
import TeamNotesNonOutDateContentItem from "./TeamNotesNonOutDateContentItem";

export default class TeamNotesNonOutDateContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamNoteNonOutDateContentList: []
    };
  }

  componentDidMount = () => {
    axios
      .post("/getteamlist/getteamnotenonoutdatelist", {
        TeamID: this.props.TeamID
      })
      .then(res => {
        // console.log("Ra data tao xem nafo", res.data);
        this.setState({
          TeamNoteNonOutDateContentList: res.data.TeamNoteNonOutDateContentList
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.mounted = true;

    this.props.socket.on("update-team-note-non-out-date-list", data => {
      if (this.mounted) {
        if (this.props.TeamID === data.TeamID) {
          this.setState({
            TeamNoteNonOutDateContentList: data.TeamNoteNonOutDateContentList
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.mounted = false;
  };

  renderTeamNoteNonOutDate = () => {
    if (this.state.TeamNoteNonOutDateContentList.length !== 0) {
      return (
        <div>
          {this.state.TeamNoteNonOutDateContentList.map(
            (teamnoteitem, teamnoteindex) => (
              <div key={teamnoteindex}>
                {teamnoteitem.TeamNoteTypeContent.map(
                  (teamnotetypeitem, teamnotetypeindex) =>
                    teamnotetypeitem.TeamNoteType === "with-excercise" ? (
                      <TeamNotesNonOutDateContentItem
                        key={teamnotetypeindex}
                        TeamNoteID={teamnoteitem.TeamNoteID}
                        TeamNoteType={teamnotetypeitem.TeamNoteType}
                        TeamNoteName={teamnoteitem.TeamNoteName}
                        TeamNoteDescription={teamnoteitem.TeamNoteDescription}
                        TeamNoteEndDate={teamnoteitem.TeamNoteEndDate}
                        TeamNoteCreateDate={teamnoteitem.TeamNoteCreateDate}
                        ExcerciseTeamNoteID={
                          teamnotetypeitem.ExcerciseTeamNoteID
                        }
                        setChooseTeamNoteToChangeIcon={
                          this.setChooseTeamNoteToChangeIcon
                        }
                        MemberID={this.props.MemberID}
                        TeamID={this.props.TeamID}
                        socket={this.props.socket}
                        CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
                      />
                    ) : (
                      <TeamNotesNonOutDateContentItem
                        key={teamnotetypeindex}
                        TeamNoteID={teamnoteitem.TeamNoteID}
                        TeamNoteChoiceID={this.state.TeamNoteChoiceID}
                        TeamNoteType={teamnotetypeitem.TeamNoteType}
                        TeamNoteName={teamnoteitem.TeamNoteName}
                        TeamNoteDescription={teamnoteitem.TeamNoteDescription}
                        TeamNoteEndDate={teamnoteitem.TeamNoteEndDate}
                        TeamNoteCreateDate={teamnoteitem.TeamNoteCreateDate}
                        setChooseTeamNoteToChangeIcon={
                          this.setChooseTeamNoteToChangeIcon
                        }
                        MemberID={this.props.MemberID}
                        TeamID={this.props.TeamID}
                        socket={this.props.socket}
                        CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
                      />
                    )
                )}
              </div>
            )
          )}
        </div>
      );
    } else {
      // setTimeout(() => {
      return (
        <div>
          <p>Chưa có Ghi chú nào được tạo cả !!!</p>
        </div>
      );
      // },1000);
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___notes____content_____non-out-date______content">
        {this.renderTeamNoteNonOutDate()}
      </div>
    );
  }
}
