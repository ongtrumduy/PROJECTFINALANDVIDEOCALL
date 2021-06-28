import React from "react";
import Modal from "react-modal";

export default class ChatsMessagesSend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberMessageChat: "",
      checkBannedOfMemberIsOpen: false,
      checkBannedOfMemberChatIsOpen: false
    };
  }

  handleNewMessageChat = event => {
    this.setState({
      MemberMessageChat: event.target.value
    });
  };

  openCheckBannedOfMemberModal = () => {
    this.setState({
      checkBannedOfMemberIsOpen: true
    });
  };

  closeCheckBannedOfMemberModal = () => {
    this.setState({
      checkBannedOfMemberIsOpen: false
    });
  };

  openCheckBannedOfMemberChatModal = () => {
    this.setState({
      checkBannedOfMemberChatIsOpen: true
    });
  };

  closeCheckBannedOfMemberChatModal = () => {
    this.setState({
      checkBannedOfMemberChatIsOpen: false
    });
  };

  sendNewMessageChat = () => {
    if (this.props.BannedOfMember === true) {
      this.openCheckBannedOfMemberModal();
    } else if (this.props.BannedOfMemberChat === true) {
      this.openCheckBannedOfMemberChatModal();
    } else {
      this.props.socket.emit("send-message-to-member-chat", {
        MemberChatID: this.props.MemberChoiceChatID,
        MemberID: this.props.MemberID,
        MemberChatContent: this.state.MemberMessageChat
      });
      this.setState({
        MemberMessageChat: ""
      });
    }
  };

  pressEnterNewMessage = event => {
    if (event.key === "Enter") {
      this.sendNewMessageChat();
    }
  };

  render() {
    return (
      <div className="user-chat_content__message___chat-send">
        <div>
          <input
            type="text"
            placeholder="Nhập tin nhắn"
            maxLength="2000"
            value={this.state.MemberMessageChat}
            onChange={event => this.handleNewMessageChat(event)}
            onKeyPress={event => this.pressEnterNewMessage(event)}
          />
        </div>
        <div onClick={() => this.sendNewMessageChat()}>
          <i className="material-icons">&#xe163;</i>
        </div>

        {/*============================================================================================================================= */}

        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1",
              userSelect: "none"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkBannedOfMemberIsOpen}
          onRequestClose={() => this.closeCheckBannedOfMemberModal()}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn không thể nhắn tin với{" "}
              <span style={{ color: "red" }}>
                {this.props.MemberChoiceChatFullName}-
                {this.props.MemberChoiceChatID}
              </span>
              &nbsp; vì BẠN đã chặn mất roàii!!! Bạn cần bỏ chặn để nhắn tin!!!
            </p>
          </div>

          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckBannedOfMemberModal()}
          >
            Đã rõ!!!
          </button>
        </Modal>

        {/*============================================================================================================================= */}

        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1",
              userSelect: "none"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkBannedOfMemberChatIsOpen}
          onRequestClose={() => this.closeCheckBannedOfMemberChatModal()}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn không thể nhắn tin với{" "}
              <span style={{ color: "blue" }}>
                {this.props.MemberChoiceChatFullName}-
                {this.props.MemberChoiceChatID}
              </span>
              &nbsp; vì người đó đã chặn bạn mất roàii!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckBannedOfMemberChatModal()}
          >
            Đã hỉu!!!
          </button>
        </Modal>

        {/*============================================================================================================================= */}
      </div>
    );
  }
}
