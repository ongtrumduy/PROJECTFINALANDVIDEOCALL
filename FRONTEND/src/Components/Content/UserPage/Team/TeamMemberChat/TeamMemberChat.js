import React from "react";
import Modal from "react-modal";
import Draggable from "react-draggable";
import defaultavatar from "../../../../Main/Image-Icons/default-avatar.png";
import axios from "axios";
import TeamMemberChatItem from "./TeamMemberChatItem";

export default class TeamMemberChat extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.semounted = false;
    this.axiosmounted = false;
    this.nextpropsmounted = false;
    this.state = {
      TeamMemberChatContent: "",
      CurrentTeamMemberRoomChatList: [],
      BannedOfMember: false,
      BannedOfMemberChat: false,
      CheckNextRenderChatContent: false,
      CurrentIndexToRenderMemberChatContent: "1",
      NumberMemberChatContent: "5",
      checkBannedOfMemberIsOpen: false,
      checkBannedOfMemberChatIsOpen: false,
      checkUnBannedOfMemberIsOpen: false,
      checkLoadingMemberChatContent: false
    };
  }

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

  openCheckUnBannedOfMemberModal = () => {
    this.setState({
      checkUnBannedOfMemberIsOpen: true
    });
  };

  closeCheckUnBannedOfMemberModal = () => {
    this.setState({
      checkUnBannedOfMemberIsOpen: false
    });
  };

  componentDidMount = () => {
    this.axiosmounted = true;

    axios
      .post("/getteamlist/getteammemberchatlist", {
        MemberChatID: this.props.MemberChoiceChatID,
        MemberID: this.props.MemberID,
        CurrentIndexToRenderMemberChatContent: this.state
          .CurrentIndexToRenderMemberChatContent,
        NumberMemberChatContent: this.state.NumberMemberChatContent
      })
      .then(res => {
        if (this.axiosmounted) {
          this.setState({
            CurrentTeamMemberRoomChatList: res.data.CurrentRoomChatContent,
            CheckNextRenderChatContent: res.data.CheckNextRenderChatContent,
            BannedOfMember: res.data.BannedOfMember,
            BannedOfMemberChat: res.data.BannedOfMemberChat
          });
        }
      });

    this.timeout = setTimeout(() => {
      this.setState({
        checkLoadingMemberChatContent: true
      });
    }, 900);

    this.mounted = true;
    this.semounted = true;

    this.props.socket.on("send-to-update-room-chat-list", data => {
      if (this.semounted) {
        if (
          this.props.MemberID === data.MemberID &&
          this.props.MemberChoiceChatID === data.MemberChatID
        ) {
          this.props.socket.emit("receive-to-update-room-chat-list", {
            MemberChatID: this.props.MemberChoiceChatID,
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
            CurrentTeamMemberRoomChatList: data.CurrentRoomChatContent,
            CheckNextRenderChatContent: data.CheckNextRenderChatContent,
            BannedOfMember: data.BannedOfMember,
            BannedOfMemberChat: data.BannedOfMemberChat
          });
        }
      }
    });
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (nextProps.MemberChoiceChatID !== this.props.MemberChoiceChatID) {
      this.setState({
        checkLoadingMemberChatContent: false
      });

      this.nextpropsmounted = true;

      axios
        .post("/getteamlist/getteammemberchatlist", {
          MemberChatID: nextProps.MemberChoiceChatID,
          MemberID: this.props.MemberID,
          CurrentIndexToRenderMemberChatContent: this.state
            .CurrentIndexToRenderMemberChatContent,
          NumberMemberChatContent: this.state.NumberMemberChatContent
        })
        .then(res => {
          if (this.nextpropsmounted) {
            this.setState({
              CurrentTeamMemberRoomChatList: res.data.CurrentRoomChatContent,
              CheckNextRenderChatContent: res.data.CheckNextRenderChatContent,
              BannedOfMember: res.data.BannedOfMember,
              BannedOfMemberChat: res.data.BannedOfMemberChat
            });
          }
        })
        .catch(error => console.log(error));

      this.nextpropstimeout = setTimeout(() => {
        this.setState({
          checkLoadingMemberChatContent: true
        });
      }, 900);
    }
  };

  componentWillUnmount = () => {
    this.mounted = false;
    this.semounted = false;
    this.axiosmounted = false;
    this.nextpropsmounted = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    if (this.nextpropstimeout) {
      clearTimeout(this.nextpropstimeout);
    }
  };

  handleTeamMemberChatContent = event => {
    this.setState({
      TeamMemberChatContent: event.target.value
    });
  };

  sendToUnBannedOfMemberToChat = () => {
    this.props.socket.emit("send-to-unbanned-of-member-chat", {
      MemberChatID: this.props.MemberChoiceChatID,
      MemberID: this.props.MemberID
    });
    this.closeCheckBannedOfMemberModal();
    this.openCheckUnBannedOfMemberModal();
  };

  sendMessageToTeamMemberChat = () => {
    if (this.state.BannedOfMember === true) {
      this.openCheckBannedOfMemberModal();
    } else if (this.state.BannedOfMemberChat === true) {
      this.openCheckBannedOfMemberChatModal();
    } else {
      this.props.socket.emit("send-message-to-member-chat", {
        MemberChatID: this.props.MemberChoiceChatID,
        MemberID: this.props.MemberID,
        MemberChatContent: this.state.TeamMemberChatContent
      });
      this.setState({
        TeamMemberChatContent: ""
      });
    }
  };

  pressEnterSendMessageContent = event => {
    if (event.key === "Enter") {
      this.sendMessageToTeamMemberChat();
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

  renderTeamMemberChatName = () => {
    return (
      <div>
        <div className="user-team_team-menu-and-content__content___discuss____member-chat______avatar-fullname">
          <div className="user-team_team-menu-and-content__content___discuss____member-chat______avatar-fullname______avatar">
            <img src={defaultavatar} alt="default-avatar" />
          </div>
          <div className="user-team_team-menu-and-content__content___discuss____member-chat______avatar-fullname______fullname">
            <p>
              {this.props.MemberChoiceChatFullName}-
              {this.props.MemberChoiceChatID}
            </p>
          </div>
          <div
            onClick={() => this.props.setChooseTeamMemberChat(false)}
            className="user-team_team-menu-and-content__content___discuss____member-chat______avatar-fullname______close-box"
          >
            <i className="material-icons">&#xe5cd;</i>
          </div>
        </div>
      </div>
    );
  };

  renderTeamMemberChat = () => {
    return (
      <div style={{ width: "100%", height: "240px" }}>
        {this.state.checkLoadingMemberChatContent ? (
          <div>
            <div className="user-team_team-menu-and-content__content___discuss____member-chat______team-chat-content">
              {!this.state.CurrentTeamMemberRoomChatList.length ? (
                <p style={{ fontWeight: "bold", fontSize: "12px" }}>
                  Hãy nhắn tin để liên lạc với bạn này
                </p>
              ) : (
                <div>
                  <div
                    style={
                      this.state.CheckNextRenderChatContent
                        ? { display: "block" }
                        : { display: "none" }
                    }
                    onClick={() => this.sendToSeeOldMemberChatContent()}
                    className="user-team_team-menu-and-content__content___discuss____member-chat______team-chat-content_______seen-old-member-chat"
                  >
                    <p>Xem thêm các Tin nhắn cũ !!!</p>
                  </div>
                  {this.state.CurrentTeamMemberRoomChatList.map(
                    (roomchatitem, roomchatindex) => (
                      <div key={roomchatindex}>
                        <TeamMemberChatItem
                          MemberChattedID={roomchatitem.MemberChattedID}
                          MemberChattedContent={
                            roomchatitem.MemberChattedContent
                          }
                          MemberChattedDate={roomchatitem.MemberChattedDate}
                          MemberID={this.props.MemberID}
                          MemberChoiceChatID={this.props.MemberChoiceChatID}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
            <div className="user-team_team-menu-and-content__content___discuss____member-chat______send-message">
              <div>
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  maxLength="2000"
                  onChange={event => this.handleTeamMemberChatContent(event)}
                  onKeyPress={event => this.pressEnterSendMessageContent(event)}
                  value={this.state.TeamMemberChatContent}
                />
              </div>
              <div onClick={() => this.sendMessageToTeamMemberChat()}>
                <i className="material-icons">&#xe163;</i>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ fontWeight: "bold", fontSize: "12px", color: "blue" }}>
            Đang tải nội dung cuộc trò chuyện...
          </p>
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        <Draggable
          cancel=".user-team_team-menu-and-content__content___discuss____member-chat"
          bounds={{ top: -300, left: 0, right: 600, bottom: 0 }}
        >
          <div className="user-team_team-menu-and-content__content___discuss____member-chat">
            {this.renderTeamMemberChatName()}
            {this.renderTeamMemberChat()}
          </div>
        </Draggable>

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
              userSelect: "none",
              zIndex: "3"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkBannedOfMemberIsOpen}
          onRequestClose={this.closeCheckBannedOfMemberModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn không thể nhắn tin với{" "}
              <span style={{ color: "blue" }}>
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
            Đã hiểu!!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToUnBannedOfMemberToChat()}
          >
            Mở chặn!!!
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
              userSelect: "none",
              zIndex: "3"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkBannedOfMemberChatIsOpen}
          onRequestClose={this.closeCheckBannedOfMemberChatModal}
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

        <Modal
          style={{
            overlay: { position: "fixed", zIndex: "1000" },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1",
              userSelect: "none",
              zIndex: "3"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkUnBannedOfMemberIsOpen}
          onRequestClose={this.closeCheckUnBannedOfMemberModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn đã mở chặn người đó rồi !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckUnBannedOfMemberModal()}
          >
            QUá OKiii
          </button>
        </Modal>
      </div>
    );
  }
}
