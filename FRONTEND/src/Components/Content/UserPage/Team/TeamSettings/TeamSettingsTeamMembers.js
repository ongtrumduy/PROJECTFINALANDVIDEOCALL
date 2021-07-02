import React from "react";
import axios from "axios";
import TeamSettingsTeamMembersItem from "./TeamSettingsTeamMembersItem";

export default class TeamSettingsTeamMembers extends React.Component {
  constructor(props) {
    super(props);
    this.axiosmounted = false;
    this.upmounted = false;
    this.state = {
      AllMemberOfTeam: [],
      checkLoadingTeamMember: false
    };
  }

  componentDidMount = () => {
    this.axiosmounted = true;

    axios
      .post("./getteamlist/getallmembersofteam", {
        TeamID: this.props.TeamID
      })
      .then(res => {
        if (this.axiosmounted) {
          // console.log(res.data);
          this.setState({
            AllMemberOfTeam: res.data.AllMemberOfTeam
          });
        }
      });

    this.timeout = setTimeout(() => {
      this.setState({
        checkLoadingTeamMember: true
      });
    }, 300);

    this.upmounted = true;

    this.props.socket.on("update-all-members-of-team", data => {
      if (this.upmounted) {
        if (data.TeamID === this.props.TeamID) {
          this.setState({
            AllMemberOfTeam: data.AllMemberOfTeam
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.axiosmounted = false;
    this.upmounted = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___settings____team-members">
        <p style={{ color: "blue", fontSize: "16px", userSelect: "none" }}>
          Tất cả thành viên nhóm
        </p>
        {this.state.checkLoadingTeamMember ? (
          <div className="user-team_team-menu-and-content__content___settings____team-members____content">
            {this.state.AllMemberOfTeam.map((memberitem, memberindex) => (
              <div key={memberindex}>
                <TeamSettingsTeamMembersItem
                  MemberID={this.props.MemberID}
                  TeamID={this.props.TeamID}
                  socket={this.props.socket}
                  CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
                  MemberChoiceID={memberitem.MemberID}
                  MemberChoiceFullName={memberitem.MemberFullName}
                  CheckChooseMemberIsAdmin={memberitem.CheckMemberIsAdmin}
                />
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: "violet" }}>
            Đang tải dữ liệu các thành viên nhóm....
          </p>
        )}
      </div>
    );
  }
}
