import React from "react";

export default class ChatsMessagesContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={
          this.props.MemberChattedID === this.props.MemberID
            ? "user-chat_content__message___content____member-message"
            : "user-chat_content__message___content____member-chat-message"
        }
      >
        <div>
          {this.props.MemberChattedContent === "" ? (
            <small></small>
          ) : (
            <p>&nbsp;&nbsp;{this.props.MemberChattedContent}&nbsp;&nbsp;</p>
          )}
        </div>
        <div>
          <small>{this.props.MemberChattedDate}</small>
        </div>
      </div>
    );
  }
}
