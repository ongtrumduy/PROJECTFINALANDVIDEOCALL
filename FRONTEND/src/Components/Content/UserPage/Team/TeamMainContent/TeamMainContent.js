import React from "react";
import TeamDiscuss from "../TeamDiscuss/TeamDiscuss";
import TeamFiles from "../TeamFiles/TeamFiles";
import TeamNotes from "../TeamNotes/TeamNotes";
import TeamSettings from "../TeamSettings/TeamSettings";

export default class TeamMainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  chooseTeamContentToRender = () => {
    switch (this.props.setSelectTeamContent) {
      case "discuss":
        return (
          <TeamDiscuss
            MemberID={this.props.MemberID}
            TeamID={this.props.TeamID}
            socket={this.props.socket}
            ChooseTeamInfor={this.props.ChooseTeamInfor}
            checkMemberIsAdmin={this.props.checkMemberIsAdmin}
            CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
          />
        );
      case "files":
        return <TeamFiles />;
      case "notes":
        return (
          <TeamNotes
            MemberID={this.props.MemberID}
            TeamID={this.props.TeamID}
            socket={this.props.socket}
            ChooseTeamInfor={this.props.ChooseTeamInfor}
            CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
          />
        );
      case "settings":
        return (
          <TeamSettings
            MemberID={this.props.MemberID}
            TeamID={this.props.TeamID}
            socket={this.props.socket}
            ChooseTeamInfor={this.props.ChooseTeamInfor}
            CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
          />
        );
      default:
        return (
          <TeamDiscuss
            MemberID={this.props.MemberID}
            TeamID={this.props.TeamID}
            socket={this.props.socket}
            ChooseTeamInfor={this.props.ChooseTeamInfor}
            CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
          />
        );
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content">
        {this.chooseTeamContentToRender()}
      </div>
    );
  }
}
