import React from "react";
import Modal from "react-modal";
import axios from "axios";
import ChatsListContentItem from "./ChatsListContentItem";

export default class ChatsListContent extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.semounted = false;
    this.state = {
      RoomChatMemberList: [],
      MemberChoiceToChatID: "",
      MemberChoiceHiddenID: "",
      MemberChoiceDeleteID: "",
      checkHiddenMemberChatIsOpen: false,
      checkDeleteMemberChatIsOpen: false
    };
  }

  openCheckHiddenMemberChatModal = memberChoiceHiddenID => {
    this.setState({
      checkHiddenMemberChatIsOpen: true,
      MemberChoiceHiddenID: memberChoiceHiddenID
    });
  };

  closeCheckHiddenMemberChatModal = () => {
    this.setState({
      checkHiddenMemberChatIsOpen: false
    });
  };

  openCheckDeleteMemberChatModal = memberChoiceDeleteID => {
    this.setState({
      checkDeleteMemberChatIsOpen: true,
      MemberChoiceDeleteID: memberChoiceDeleteID
    });
  };

  closeCheckDeleteMemberChatModal = () => {
    this.setState({
      checkDeleteMemberChatIsOpen: false
    });
  };

  sendToHiddenMemberChatOfList = () => {
    if (this.state.MemberChoiceHiddenID === this.state.MemberChoiceToChatID) {
      this.setState({
        MemberChoiceToChatID: ""
      });
    }
    this.props.socket.emit("send-to-hidden-member-chat", {
      MemberID: this.props.MemberID,
      MemberChatID: this.state.MemberChoiceHiddenID
    });

    this.setState({
      MemberChoiceHiddenID: ""
    });
    this.closeCheckHiddenMemberChatModal();
  };

  sendToDeleteMemberChatOfList = () => {
    if (this.state.MemberChoiceDeleteID === this.state.MemberChoiceToChatID) {
      this.setState({
        MemberChoiceToChatID: ""
      });
    }
    this.props.socket.emit("send-to-delete-member-chat", {
      MemberID: this.props.MemberID,
      MemberChatID: this.state.MemberChoiceDeleteID
    });

    this.setState({
      MemberChoiceDeleteID: ""
    });
    this.closeCheckDeleteMemberChatModal();
  };

  componentDidMount = () => {
    this.axiosmounted = true;
    axios
      .post("./getallroomchatmemberlist", {
        MemberID: this.props.MemberID
      })
      .then(res => {
        // console.log("Dữ liệu đổ về cho bố", res.data);
        if (this.axiosmounted) {
          if (res.data.RoomChatMemberList.length !== 0) {
            this.props.setCheckNonMemberToChat(true);
            if (this.state.MemberChoiceToChatID === "") {
              this.setMemberChoiceToChatID(
                res.data.FirstMemberChat.MemberID,
                res.data.FirstMemberChat.MemberFullName,
                res.data.FirstMemberChat.BannedMemberChat
              );
              this.setMemberChoiceToChatID(
                res.data.FirstMemberChat.MemberID,
                res.data.FirstMemberChat.MemberFullName,
                res.data.FirstMemberChat.BannedMemberChat
              );
              this.setMemberChoiceToChatID(
                res.data.FirstMemberChat.MemberID,
                res.data.FirstMemberChat.MemberFullName,
                res.data.FirstMemberChat.BannedMemberChat
              );
              // this.props.socket.emit("send-to-change-seen-member-of-list", {
              //   MemberID: this.props.MemberID,
              //   MemberChatID: res.data.FirstMemberChat.MemberID
              // });
              this.props.setCheckBannedOfMemberChat(
                res.data.FirstMemberChat.BannedMemberChat
              );
            }
          } else {
            this.props.setCheckNonMemberToChat(false);
          }

          this.setState({
            RoomChatMemberList: res.data.RoomChatMemberList
          });
        }
      })
      .catch(error => console.log(error));

    this.mounted = true;
    this.semounted = true;

    this.props.socket.on("send-to-update-all-member-of-chat-list", data => {
      if (this.semounted) {
        if (this.props.MemberID === data.MemberID) {
          this.props.socket.emit("receive-to-update-all-member-of-chat-list", {
            MemberID: this.props.MemberID
          });
        }
      }
    });

    this.props.socket.on("update-all-member-of-chat-list", data => {
      // console.log("Lấy dữ liệu về đây ", data);
      if (this.mounted) {
        if (this.props.MemberID === data.MemberID) {
          if (data.RoomChatMemberList.length !== 0) {
            this.props.setCheckNonMemberToChat(true);

            if (this.state.MemberChoiceToChatID === "") {
              this.setMemberChoiceToChatID(
                data.FirstMemberChat.MemberID,
                data.FirstMemberChat.MemberFullName,
                data.FirstMemberChat.BannedMemberChat
              );
              this.setMemberChoiceToChatID(
                data.FirstMemberChat.MemberID,
                data.FirstMemberChat.MemberFullName,
                data.FirstMemberChat.BannedMemberChat
              );
              this.setMemberChoiceToChatID(
                data.FirstMemberChat.MemberID,
                data.FirstMemberChat.MemberFullName,
                data.FirstMemberChat.BannedMemberChat
              );
            }
            // this.props.socket.emit("send-to-change-seen-member-of-list", {
            //   MemberID: this.props.MemberID,
            //   MemberChatID: this.state.MemberChoiceToChatID
            // });
            this.props.setCheckBannedOfMemberChat(
              data.FirstMemberChat.BannedMemberChat
            );
          } else {
            this.props.setCheckNonMemberToChat(false);
          }

          this.setState({
            RoomChatMemberList: data.RoomChatMemberList
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.axiosmounted = false;
    this.mounted = false;
    this.semounted = false;
  };

  setMemberChoiceToChatID = (
    memberChoiceToChatID,
    memberChoiceFullName,
    checkBannedMemberChat
  ) => {
    this.props.socket.emit("send-to-change-seen-member-of-list", {
      MemberID: this.props.MemberID,
      MemberChatID: memberChoiceToChatID
    });

    this.setState({
      MemberChoiceToChatID: memberChoiceToChatID
    });
    this.props.setMemberChoiceChatToChat(memberChoiceToChatID);
    this.props.setMemberChoiceChatFullName(memberChoiceFullName);
    this.props.setCheckBannedOfMemberChat(checkBannedMemberChat);
  };

  renderRoomChatMemberContent = () => {
    return (
      <div>
        {this.state.RoomChatMemberList.map(
          (chatmemberitem, chatmemberindex) => (
            <div key={chatmemberindex}>
              {chatmemberitem.LastMessageOfMember.MemberChattedContent ===
              "" ? (
                <ChatsListContentItem
                  MemberChoiceToChatID={this.state.MemberChoiceToChatID}
                  MemberID={this.props.MemberID}
                  socket={this.props.socket}
                  MemberChatID={chatmemberitem.MemberChatInfor.MemberID}
                  MemberChatFullName={
                    chatmemberitem.MemberChatInfor.MemberFullName
                  }
                  SeenMemberChat={chatmemberitem.MemberChatInfor.SeenMemberChat}
                  BannedMemberChat={
                    chatmemberitem.MemberChatInfor.BannedMemberChat
                  }
                  setMemberChoiceToChatID={this.setMemberChoiceToChatID}
                  openCheckDeleteMemberChatModal={
                    this.openCheckDeleteMemberChatModal
                  }
                  openCheckHiddenMemberChatModal={
                    this.openCheckHiddenMemberChatModal
                  }
                />
              ) : (
                <ChatsListContentItem
                  MemberChoiceToChatID={this.state.MemberChoiceToChatID}
                  MemberID={this.props.MemberID}
                  socket={this.props.socket}
                  MemberChatID={chatmemberitem.MemberChatInfor.MemberID}
                  MemberChatFullName={
                    chatmemberitem.MemberChatInfor.MemberFullName
                  }
                  SeenMemberChat={chatmemberitem.MemberChatInfor.SeenMemberChat}
                  BannedMemberChat={
                    chatmemberitem.MemberChatInfor.BannedMemberChat
                  }
                  MemberChattedID={
                    chatmemberitem.LastMessageOfMember.MemberChattedID
                  }
                  MemberChattedContent={
                    chatmemberitem.LastMessageOfMember.MemberChattedContent
                  }
                  setMemberChoiceToChatID={this.setMemberChoiceToChatID}
                  openCheckDeleteMemberChatModal={
                    this.openCheckDeleteMemberChatModal
                  }
                  openCheckHiddenMemberChatModal={
                    this.openCheckHiddenMemberChatModal
                  }
                />
              )}
            </div>
          )
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="user-chat_list__content">
        {this.renderRoomChatMemberContent()}

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
          isOpen={this.state.checkHiddenMemberChatIsOpen}
          onRequestClose={this.openCheckHiddenMemberChatModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có chắc chắn muốn Ẩn đoạn Chat với người này không?
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckHiddenMemberChatModal()}
          >
            Ấn nhầm!!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToHiddenMemberChatOfList()}
          >
            Chuẩn!!!
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
          isOpen={this.state.checkDeleteMemberChatIsOpen}
          onRequestClose={this.closeCheckDeleteMemberChatModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có chắc chắn là mình muốn Xóa đoạn Chat với người này không?
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckDeleteMemberChatModal()}
          >
            Ấn nhầm!!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToDeleteMemberChatOfList()}
          >
            Chuẩn rồi!!!
          </button>
        </Modal>
        {/*============================================================================================================================= */}
      </div>
    );
  }
}
