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
      CheckBannedOfMemberChat: false
    };
  }

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
      <div className="user-chat">
        <ChatList
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          setMemberChoiceChatToChat={this.setMemberChoiceChatToChat}
          setCheckNonMemberToChat={this.setCheckNonMemberToChat}
          setMemberChoiceChatFullName={this.setMemberChoiceChatFullName}
          setCheckBannedOfMemberChat={this.setCheckBannedOfMemberChat}
        />
        <ChatMainContent
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          MemberChoiceChatID={this.state.MemberChoiceChatID}
          MemberChoiceChatFullName={this.state.MemberChoiceChatFullName}
          CheckNonMemberToChat={this.state.CheckNonMemberToChat}
          CheckBannedOfMemberChat={this.state.CheckBannedOfMemberChat}
        />
      </div>
    );
  }
}
