import React from "react";

import "./TeamSettings.css";

import TeamSettingsTeamName from "./TeamSettingsTeamName";
import TeamSettingsTeamMembers from "./TeamSettingsTeamMembers";

export default class TeamSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTeamSettingAllContent = () => {
    return (
      <div>
        <TeamSettingsTeamName
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
          ChooseTeamInfor={this.props.ChooseTeamInfor}
          CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
        />
        <TeamSettingsTeamMembers
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
          ChooseTeamInfor={this.props.ChooseTeamInfor}
          CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
        />
      </div>
    );
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___settings">
        {this.renderTeamSettingAllContent()}
      </div>
    );
  }
}
