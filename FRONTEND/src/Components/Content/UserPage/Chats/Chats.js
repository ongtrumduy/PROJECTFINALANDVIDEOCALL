import React from "react";
import ChatList from "./ChatsList/ChatsList";
import ChatMainContent from "./ChatsMainContent/ChatsMainContent";
import "./Chats.css";

export default class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberChoiceChatID: "",
      MemberChoiceChatFullName: "",
      CheckNonMemberToChat: false,
      CheckBannedOfMemberChat: false,
      checkLoadingChatContent: false,
      checkLoadingChatMessageContent: false
    };
  }

  componentDidMount = () => {
    this.chattimeout = setTimeout(() => {
      this.setState({
        checkLoadingChatContent: true
      });
    }, 400);

    this.chatmessagetimeout = setTimeout(() => {
      this.setState({
        checkLoadingChatMessageContent: true
      });
    }, 800);
  };

  componentWillUnmount = () => {
    if (this.chattimeout) {
      clearTimeout(this.chattimeout);
    }
    if (this.chatmessagetimeout) {
      clearTimeout(this.chatmessagetimeout);
    }
  };

  setMemberChoiceChatToChat = memberChoiceChatID => {
    this.setState({
      MemberChoiceChatID: memberChoiceChatID
    });
  };

  setMemberChoiceChatFullName = memberChoiceChatFullName => {
    this.setState({
      MemberChoiceChatFullName: memberChoiceChatFullName
    });
  };

  setCheckNonMemberToChat = checkNonMemberToChat => {
    this.setState({
      CheckNonMemberToChat: checkNonMemberToChat
    });
  };

  setCheckBannedOfMemberChat = checkBannedOfMemberChat => {
    this.setState({
      CheckBannedOfMemberChat: checkBannedOfMemberChat
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {this.state.checkLoadingChatContent ? (
          <div className="user-chat">
            <ChatList
              MemberID={this.props.MemberID}
              socket={this.props.socket}
              setMemberChoiceChatToChat={this.setMemberChoiceChatToChat}
              setCheckNonMemberToChat={this.setCheckNonMemberToChat}
              setMemberChoiceChatFullName={this.setMemberChoiceChatFullName}
              setCheckBannedOfMemberChat={this.setCheckBannedOfMemberChat}
            />
            {this.state.checkLoadingChatMessageContent ? (
              <ChatMainContent
                MemberID={this.props.MemberID}
                socket={this.props.socket}
                MemberChoiceChatID={this.state.MemberChoiceChatID}
                MemberChoiceChatFullName={this.state.MemberChoiceChatFullName}
                CheckNonMemberToChat={this.state.CheckNonMemberToChat}
                CheckBannedOfMemberChat={this.state.CheckBannedOfMemberChat}
              />
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <p style={{ color: "blue", fontWeight: "bold", textAlign: "center" }}>
            Đang tải dữ liệu Danh sách và Cuộc trò chuyện....
          </p>
        )}
      </div>
    );
  }
}
