import React from "react";
import TeamNotesNonOutDateContent from "./TeamNotesNonOutDateContent";
import TeamNotesOutDateContent from "./TeamNotesOutDateContent";

export default class TeamNotesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkRenderNonOutDate: false,
      checkRenderOutDate: false
    };
  }

  setChangeRenderTeamNotesNonOutDateContent = () => {
    if (this.state.checkRenderNonOutDate) {
      this.setState({
        checkRenderNonOutDate: false
      });
    } else {
      this.setState({
        checkRenderNonOutDate: true
      });
    }
  };

  setChangeRenderTeamNotesOutDateContent = () => {
    if (this.state.checkRenderOutDate) {
      this.setState({
        checkRenderOutDate: false
      });
    } else {
      this.setState({
        checkRenderOutDate: true
      });
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___notes____content">
        <div className="user-team_team-menu-and-content__content___notes____content_____non-out-date">
          <div>
            <i className="material-icons">
              {this.state.checkRenderNonOutDate
                ? "expand_more"
                : "chevron_right"}
            </i>
          </div>
          <div onClick={() => this.setChangeRenderTeamNotesNonOutDateContent()}>
            <p>Các Ghi chú Chưa quá hạn</p>
          </div>
        </div>
        {this.state.checkRenderNonOutDate ? (
          <TeamNotesNonOutDateContent
            MemberID={this.props.MemberID}
            TeamID={this.props.TeamID}
            socket={this.props.socket}
            CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
          />
        ) : (
          <div></div>
        )}
        <div className="user-team_team-menu-and-content__content___notes____content_____out-date">
          <div>
            <i className="material-icons">
              {this.state.checkRenderOutDate ? "expand_more" : "chevron_right"}
            </i>
          </div>
          <div onClick={() => this.setChangeRenderTeamNotesOutDateContent()}>
            <p>Các Ghi chú Đã quá hạn</p>
          </div>
        </div>
        {this.state.checkRenderOutDate ? (
          <TeamNotesOutDateContent
            MemberID={this.props.MemberID}
            TeamID={this.props.TeamID}
            socket={this.props.socket}
            CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
          />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
