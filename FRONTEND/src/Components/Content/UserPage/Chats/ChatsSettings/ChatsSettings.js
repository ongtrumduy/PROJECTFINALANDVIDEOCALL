import React from "react";
import Modal from "react-modal";

export default class ChatsSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkConfirmBannedMemberChatIsOpen: false,
      checkConfirmUnBannedMemberChatIsOpen: false,
      checkConfirmDeleteMemberChatContentIsOpen: false
    };
  }

  openCheckConfirmBannedMemberChatModal = () => {
    this.setState({
      checkConfirmBannedMemberChatIsOpen: true
    });
  };

  closeCheckConfirmBannedMemberChatModal = () => {
    this.setState({
      checkConfirmBannedMemberChatIsOpen: false
    });
  };

  openCheckConfirmUnBannedMemberChatModal = () => {
    this.setState({
      checkConfirmUnBannedMemberChatIsOpen: true
    });
  };

  closeCheckConfirmUnBannedMemberChatModal = () => {
    this.setState({
      checkConfirmUnBannedMemberChatIsOpen: false
    });
  };

  openCheckConfirmDeleteMemberChatContentModal = () => {
    this.setState({
      checkConfirmDeleteMemberChatContentIsOpen: true
    });
  };

  closeCheckConfirmDeleteMemberChatContentModal = () => {
    this.setState({
      checkConfirmDeleteMemberChatContentIsOpen: false
    });
  };

  sendToDeleteMemberChatContent = () => {
    this.closeCheckConfirmDeleteMemberChatContentModal();

    this.props.socket.emit("send-to-delete-of-member-chat-content", {
      MemberID: this.props.MemberID,
      MemberChatID: this.props.MemberChoiceChatID
    });
  };

  sendToBannedMemberChatOfList = () => {
    this.closeCheckConfirmBannedMemberChatModal();

    this.props.socket.emit("send-to-banned-of-member-chat", {
      MemberID: this.props.MemberID,
      MemberChatID: this.props.MemberChoiceChatID
    });
  };

  sendToUnBannedMemberChatOfList = () => {
    this.closeCheckConfirmUnBannedMemberChatModal();

    this.props.socket.emit("send-to-unbanned-of-member-chat", {
      MemberID: this.props.MemberID,
      MemberChatID: this.props.MemberChoiceChatID
    });
  };

  render() {
    return (
      <div className="user-chat_content__setting">
        <div>
          <button
            onClick={() => this.openCheckConfirmDeleteMemberChatContentModal()}
          >
            <span style={{ fontWeight: "bold" }}>
              X??a N???i dung Cu???c tr?? chuy???n v???i &nbsp;
              <span style={{ color: "red" }}>
                {this.props.MemberChoiceChatFullName}
              </span>
            </span>
          </button>
        </div>
        <div>
          {this.props.CheckBannedOfMemberChat ? (
            <button
              onClick={() => this.openCheckConfirmUnBannedMemberChatModal()}
            >
              <span style={{ fontWeight: "bold" }}>
                B??? ch???n Cu???c tr?? chuy???n v???i &nbsp;
                <span style={{ color: "blue" }}>
                  {this.props.MemberChoiceChatFullName}
                </span>
              </span>
            </button>
          ) : (
            <button
              onClick={() => this.openCheckConfirmBannedMemberChatModal()}
            >
              <span style={{ fontWeight: "bold" }}>
                Ch???n Cu???c tr?? chuy???n v???i &nbsp;
                <span style={{ color: "blue" }}>
                  {this.props.MemberChoiceChatFullName}
                </span>
              </span>
            </button>
          )}
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
          isOpen={this.state.checkConfirmDeleteMemberChatContentIsOpen}
          onRequestClose={this.closeCheckConfirmDeleteMemberChatContentModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>TH??NG B??O</p>
            <p style={{ fontWeight: "bold" }}>
              B???n c?? ch???c ch???n mu???n X??a Cu???c Tr?? chuy???n v???i &nbsp;
              <span style={{ color: "red" }}>
                {this.props.MemberChoiceChatFullName}-
                {this.props.MemberChoiceChatID}{" "}
              </span>{" "}
              kh??ng?
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckConfirmDeleteMemberChatContentModal()}
          >
            ???n nh???m!!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToDeleteMemberChatContent()}
          >
            Chu???n!!!
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
          isOpen={this.state.checkConfirmBannedMemberChatIsOpen}
          onRequestClose={this.closeCheckConfirmBannedMemberChatModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>TH??NG B??O</p>
            <p style={{ fontWeight: "bold" }}>
              B???n c?? ch???c ch???n mu???n Ch???n Cu???c Tr?? chuy???n v???i &nbsp;
              <span style={{ color: "red" }}>
                {this.props.MemberChoiceChatFullName}-
                {this.props.MemberChoiceChatID}
              </span>{" "}
              kh??ng?{" "}
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckConfirmBannedMemberChatModal()}
          >
            ???n nh???m!!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToBannedMemberChatOfList()}
          >
            Chu???n r???i!!!
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
          isOpen={this.state.checkConfirmUnBannedMemberChatIsOpen}
          onRequestClose={this.closeCheckConfirmUnBannedMemberChatModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>TH??NG B??O</p>
            <p style={{ fontWeight: "bold" }}>
              B???n c?? ch???c ch???n mu???n B??? ch???n Cu???c Tr?? chuy???n v???i &nbsp;
              <span style={{ color: "red" }}>
                {this.props.MemberChoiceChatFullName}-
                {this.props.MemberChoiceChatID}{" "}
              </span>{" "}
              kh??ng?{" "}
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckConfirmUnBannedMemberChatModal()}
          >
            ???n nh???m!!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToUnBannedMemberChatOfList()}
          >
            Chu???n r???i!!!
          </button>
        </Modal>

        {/*============================================================================================================================= */}
      </div>
    );
  }
}
