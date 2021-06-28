import React from "react";
import axios from "axios";

import ChatsMessagesContent from "./ChatsMessagesContent";
import ChatsMessagesSend from "./ChatsMessagesSend";

export default class ChatsMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CurrentRoomChatContent: [],
      CheckNextRenderChatContent: false,
      BannedOfMember: false,
      BannedOfMemberChat: false,
      CurrentIndexToRenderMemberChatContent: "1",
      NumberMemberChatContent: "15"
    };
  }

  componentDidMount = () => {
    axios
      .post("/getchatmessagecontent", {
        MemberID: this.props.MemberID,
        MemberChatID: this.props.MemberChoiceChatID,
        CurrentIndexToRenderMemberChatContent: this.state
          .CurrentIndexToRenderMemberChatContent,
        NumberMemberChatContent: this.state.NumberMemberChatContent
      })
      .then(res => {
        // console.log("Dữ liệu đổ về đây nhanh đi màyyyyyyyyyyy", res.data);
        this.setState({
          CurrentRoomChatContent: res.data.CurrentRoomChatContent,
          CheckNextRenderChatContent: res.data.CheckNextRenderChatContent,
          BannedOfMember: res.data.BannedOfMember,
          BannedOfMemberChat: res.data.BannedOfMemberChat
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.mounted = true;
    this.semounted = true;

    this.props.socket.on("send-to-update-room-chat-list", data => {
      if (this.semounted) {
        if (
          this.props.MemberID === data.MemberID &&
          this.props.MemberChoiceChatID === data.MemberChatID
        ) {
          // console.log("Đã vào đây cái đậu mé sao lại được");
          this.props.socket.emit("receive-to-update-room-chat-list", {
            MemberChatID: this.props.MemberChoiceChatID,
            TeamID: this.props.TeamID,
            MemberID: this.props.MemberID,
            CurrentIndexToRenderMemberChatContent: "1",
            NumberMemberChatContent: this.state.NumberMemberChatContent
          });
          this.setState({
            CurrentIndexToRenderMemberChatContent: "1"
          });
        }
      }
    });

    this.props.socket.on("update-room-chat-list", data => {
      if (this.mounted) {
        if (
          this.props.MemberID === data.MemberID &&
          this.props.MemberChoiceChatID === data.MemberChatID
        ) {
          this.setState({
            CurrentRoomChatContent: data.CurrentRoomChatContent,
            CheckNextRenderChatContent: data.CheckNextRenderChatContent,
            BannedOfMember: data.BannedOfMember,
            BannedOfMemberChat: data.BannedOfMemberChat
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.mounted = false;
    this.semounted = false;
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.MemberChoiceChatID !== this.props.MemberChoiceChatID) {
      axios
        .post("/getchatmessagecontent", {
          MemberChatID: nextProps.MemberChoiceChatID,
          MemberID: this.props.MemberID,
          CurrentIndexToRenderMemberChatContent: this.state
            .CurrentIndexToRenderMemberChatContent,
          NumberMemberChatContent: this.state.NumberMemberChatContent
        })
        .then(res => {
          this.setState({
            CurrentRoomChatContent: res.data.CurrentRoomChatContent,
            CheckNextRenderChatContent: res.data.CheckNextRenderChatContent,
            BannedOfMember: res.data.BannedOfMember,
            BannedOfMemberChat: res.data.BannedOfMemberChat
          });
        });
    }
  };

  sendToSeeOldMemberChatContent = () => {
    this.props.socket.emit("receive-to-update-room-chat-list", {
      MemberID: this.props.MemberID,
      MemberChatID: this.props.MemberChoiceChatID,
      CurrentIndexToRenderMemberChatContent:
        Number(this.state.CurrentIndexToRenderMemberChatContent) + 1 + "",
      NumberMemberChatContent: this.state.NumberMemberChatContent
    });
    this.setState({
      CurrentIndexToRenderMemberChatContent:
        Number(this.state.CurrentIndexToRenderMemberChatContent) + 1 + ""
    });
  };

  render() {
    return (
      <div className="user-chat_content__message">
        <ChatsMessagesContent
          MemberID={this.props.MemberID}
          MemberChoiceChatID={this.props.MemberChoiceChatID}
          socket={this.props.socket}
          CurrentRoomChatContent={this.state.CurrentRoomChatContent}
          CheckNextRenderChatContent={this.state.CheckNextRenderChatContent}
          sendToSeeOldMemberChatContent={this.sendToSeeOldMemberChatContent}
        />
        <ChatsMessagesSend
          MemberID={this.props.MemberID}
          MemberChoiceChatID={this.props.MemberChoiceChatID}
          socket={this.props.socket}
          BannedOfMember={this.state.BannedOfMember}
          BannedOfMemberChat={this.state.BannedOfMemberChat}
          MemberChoiceChatFullName={this.props.MemberChoiceChatFullName}
        />
      </div>
    );
  }
}
