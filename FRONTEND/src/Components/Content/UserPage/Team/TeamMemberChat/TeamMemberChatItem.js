import React from "react";

export default class TeamMemberChatItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={
          this.props.MemberChattedID === this.props.MemberID
            ? "user-team_team-menu-and-content__content___discuss____member-chat______team-chat-content_______member-team-chat-item"
            : "user-team_team-menu-and-content__content___discuss____member-chat______team-chat-content_______member-chat-team-chat-item"
        }
      >
        <div>
          <p>&nbsp;&nbsp;{this.props.MemberChattedContent}&nbsp;&nbsp;</p>
        </div>
        <div>
          <small>{this.props.MemberChattedDate}</small>
        </div>
      </div>
    );
  }
}
