import React from "react";
import Modal from "react-modal";
import TeamMemberChat from "../TeamMemberChat/TeamMemberChat";
import TeamDiscussContent from "./TeamAllDiscussContent";
import "./TeamDiscuss.css";
import TeamDiscussCreateNew from "./TeamDiscussCreateNew";


export default class TeamDiscuss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseTeamMemberChat: false,
      MemberChoiceChatID: "",
      MemberChoiceChatFullName: "",
      modalCheckChatWithSelfIsOpen: false
    };
  }

  openModalCheckChatWithSelfModal = () => {
    this.setState({ modalCheckChatWithSelfIsOpen: true });
  };

  closeModalCheckChatWithSelfModal = () => {
    this.setState({ modalCheckChatWithSelfIsOpen: false });
  };

  setChoiceTeamMemberChatID = (memberID, memberFullName) => {
    if (this.props.MemberID !== memberID) {
      this.setState({
        MemberChoiceChatID: memberID,
        MemberChoiceChatFullName: memberFullName,
        chooseTeamMemberChat: true
      });
    } else {
      this.openModalCheckChatWithSelfModal();
    }
  };

  setChooseTeamMemberChat = chooseTeamMemberChat => {
    this.setState({
      chooseTeamMemberChat: chooseTeamMemberChat
    });
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___discuss">
        <TeamDiscussContent
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
          setChoiceTeamMemberChatID={this.setChoiceTeamMemberChatID}
          CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
        />
        {this.state.chooseTeamMemberChat === true ? (
          <TeamMemberChat
            MemberChoiceChatID={this.state.MemberChoiceChatID}
            MemberChoiceChatFullName={this.state.MemberChoiceChatFullName}
            CurrentTeamMemberRoomChatList={
              this.state.CurrentTeamMemberRoomChatList
            }
            setChooseTeamMemberChat={this.setChooseTeamMemberChat}
            MemberID={this.props.MemberID}
            TeamID={this.props.TeamID}
            socket={this.props.socket}
          />
        ) : (
          <div></div>
        )}
        <TeamDiscussCreateNew
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
        />
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
          isOpen={this.state.modalCheckChatWithSelfIsOpen}
          onRequestClose={() => this.closeModalCheckChatWithSelfModal()}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn không thể chọn nhắn tin với bản thân !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeModalCheckChatWithSelfModal()}
          >
            Đóng
          </button>
        </Modal>
        ;
      </div>
    );
  }
}
