import React from "react";
import axios from "axios";
import TeamNotesOutDateContentItem from "./TeamNotesOutDateContentItem";

export default class TeamNotesOutDateContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamNoteOutDateContentList: []
    };
  }

  componentDidMount = () => {
    axios
      .post("/getteamlist/getteamnoteoutdatelist", {
        TeamID: this.props.TeamID
      })
      .then(res => {
        // console.log("Ra data tao xem nafo", res.data);
        this.setState({
          TeamNoteOutDateContentList: res.data.TeamNoteOutDateContentList
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.mounted = true;

    this.props.socket.on("update-team-note-out-date-list", data => {
      if (this.mounted) {
        if (this.props.TeamID === data.TeamID) {
          this.setState({
            TeamNoteOutDateContentList: data.TeamNoteOutDateContentList
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.mounted = false;
  };

  renderTeamNoteOutDate = () => {
    if (this.state.TeamNoteOutDateContentList.length !== 0) {
      return (
        <div>
          {this.state.TeamNoteOutDateContentList.map(
            (teamnoteitem, teamnoteindex) => (
              <div key={teamnoteindex}>
                {teamnoteitem.TeamNoteTypeContent.map(teamnotetypeitem =>
                  teamnotetypeitem.TeamNoteType === "with-excercise" ? (
                    <TeamNotesOutDateContentItem
                      TeamNoteID={teamnoteitem.TeamNoteID}
                      TeamNoteType={teamnotetypeitem.TeamNoteType}
                      TeamNoteName={teamnoteitem.TeamNoteName}
                      TeamNoteDescription={teamnoteitem.TeamNoteDescription}
                      TeamNoteEndDate={teamnoteitem.TeamNoteEndDate}
                      TeamNoteCreateDate={teamnoteitem.TeamNoteCreateDate}
                      ExcerciseTeamNoteID={teamnotetypeitem.ExcerciseTeamNoteID}
                      setChooseTeamNoteToChangeIcon={
                        this.setChooseTeamNoteToChangeIcon
                      }
                      MemberID={this.props.MemberID}
                      TeamID={this.props.TeamID}
                      socket={this.props.socket}
                      CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
                    />
                  ) : (
                    <TeamNotesOutDateContentItem
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
          <p>Chưa có Ghi chú nào Quá hạn cả !!!</p>
        </div>
      );
      // },1000);
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___notes____content_____out-date______content">
        {this.renderTeamNoteOutDate()}
      </div>
    );
  }
}
