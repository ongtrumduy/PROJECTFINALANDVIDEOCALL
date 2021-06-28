import React from "react";
import ChatsMessagesContentItem from "./ChatsMessagesContentItem";

export default class ChatsMessagesContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderChatMessageContent = () => {
    if (this.props.CurrentRoomChatContent.length === 0) {
      return <div></div>;
    } else {
      return (
        <div>
          <div
            style={
              this.props.CheckNextRenderChatContent
                ? { display: "block" }
                : { display: "none" }
            }
            onClick={() => this.props.sendToSeeOldMemberChatContent()}
            className="user-chat_content__message___content_______seen-old-member-chat"
          >
            <p>Xem thêm các Tin nhắn cũ của Cuộc trò chuyện!!!</p>
          </div>
          {this.props.CurrentRoomChatContent.map(
            (membermessageitem, membermessageindex) => (
              <div key={membermessageindex}>
                <ChatsMessagesContentItem
                  MemberChattedID={membermessageitem.MemberChattedID}
                  MemberChattedContent={membermessageitem.MemberChattedContent}
                  MemberChattedDate={membermessageitem.MemberChattedDate}
                  MemberID={this.props.MemberID}
                  MemberChoiceChatID={this.props.MemberChoiceChatID}
                />
              </div>
            )
          )}
        </div>
      );
    }
  };

  render() {
    return (
      <div className="user-chat_content__message___content">
        {this.renderChatMessageContent()}
      </div>
    );
  }
}
