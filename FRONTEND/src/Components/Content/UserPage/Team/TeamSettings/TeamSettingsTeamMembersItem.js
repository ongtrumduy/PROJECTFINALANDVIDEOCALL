import React from "react";
import Modal from "react-modal";

import defaultavatar from "../../../../Main/Image-Icons/default-avatar.png";

export default class TeamSettingsTeamMembersItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkAddMemberBecomeAdminIsOpen: false,
      checkRemoveMemberAdminIsOpen: false,
      checkRemoveMemberFromTeamIsOpen: false
    };
  }

  openCheckAddMemberBecomeAdminModal = () => {
    this.setState({ checkAddMemberBecomeAdminIsOpen: true });
  };

  closeCheckAddMemberBecomeAdminModal = () => {
    this.setState({ checkAddMemberBecomeAdminIsOpen: false });
  };

  openCheckRemoveMemberAdminModal = () => {
    this.setState({ checkRemoveMemberAdminIsOpen: true });
  };

  closeCheckRemoveMemberAdminModal = () => {
    this.setState({ checkRemoveMemberAdminIsOpen: false });
  };

  openCheckRemoveMemberFromTeamModal = () => {
    this.setState({ checkRemoveMemberFromTeamIsOpen: true });
  };

  closeCheckRemoveMemberFromTeamModal = () => {
    this.setState({ checkRemoveMemberFromTeamIsOpen: false });
  };

  sendToAddMemberBecomeAdmin = () => {
    this.closeCheckAddMemberBecomeAdminModal();

    this.props.socket.emit("send-to-add-member-become-admin", {
      TeamID: this.props.TeamID,
      MemberID: this.props.MemberChoiceID
    });
  };

  sendToRemoveMemberAdmin = () => {
    this.closeCheckRemoveMemberAdminModal();

    this.props.socket.emit("send-to-remove-member-admin", {
      TeamID: this.props.TeamID,
      MemberID: this.props.MemberChoiceID
    });
  };

  sendToRemoveMemberFromTeam = () => {
    this.closeCheckRemoveMemberFromTeamModal();

    this.props.socket.emit("send-to-remove-member-from-team", {
      TeamID: this.props.TeamID,
      MemberID: this.props.MemberChoiceID
    });
  };

  addOrRemoveMemberAdmin = () => {
    if (this.props.CheckChooseMemberIsAdmin) {
      this.openCheckRemoveMemberAdminModal();
    } else {
      this.openCheckAddMemberBecomeAdminModal();
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___settings____team-members____content_____member-infor-item">
        <div>
          <img src={defaultavatar} alt="default-avatar" />
        </div>

        <div>
          <p>
            {this.props.MemberChoiceFullName}-{this.props.MemberChoiceID}
          </p>
        </div>
        <div
          style={
            this.props.CheckMemberIsAdmin === false ||
            (this.props.CheckMemberIsAdmin === true &&
              this.props.MemberChoiceID === this.props.MemberID)
              ? { display: "none" }
              : { display: "inline", cursor: "pointer" }
          }
          onClick={() => {
            this.addOrRemoveMemberAdmin();
          }}
        >
          <i
            className="material-icons"
            style={{
              fontWeight: "bold",
              color: (this.props.CheckChooseMemberIsAdmin && "blue") || "black"
            }}
          >
            {(this.props.CheckChooseMemberIsAdmin && "group") || "group_add"}
          </i>
        </div>

        <div
          style={
            this.props.CheckMemberIsAdmin === false ||
            (this.props.CheckMemberIsAdmin === true &&
              this.props.MemberChoiceID === this.props.MemberID)
              ? { display: "none" }
              : { display: "inline", cursor: "pointer" }
          }
          onClick={() => this.openCheckRemoveMemberFromTeamModal()}
        >
          <i
            className="material-icons"
            style={{
              fontWeight: "bold",
              color: "red"
            }}
          >
            {"remove_circle"}
          </i>
        </div>

        {/*==========================================================================================*/}
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
          isOpen={this.state.checkAddMemberBecomeAdminIsOpen}
          onRequestClose={this.closeCheckAddMemberBecomeAdminModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NH???C NH???</p>
            <p style={{ fontWeight: "bold" }}>
              B???n c?? ch???c l?? mu???n ?????t th??nh vi??n n??y th??nh Qu???n tr??? vi??n gi???ng
              b???n kh??ng ??? !!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToAddMemberBecomeAdmin()}
          >
            Chu???n r???i!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckAddMemberBecomeAdminModal()}
          >
            Ngh?? l???i!!!
          </button>
        </Modal>

        {/*==========================================================================================*/}
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
          isOpen={this.state.checkRemoveMemberAdminIsOpen}
          onRequestClose={this.closeCheckRemoveMemberAdminModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NH???C NH???</p>
            <p style={{ fontWeight: "bold" }}>
              B???n c?? ch???c l?? mu???n x??a t?? c??ch Qu???n tr??? vi??n c???a th??nh vi??n n??y
              kh??ng ??? !!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToRemoveMemberAdmin()}
          >
            Chu???n r???i!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckRemoveMemberAdminModal()}
          >
            Ngh?? l???i!!!
          </button>
        </Modal>

        {/*==========================================================================================*/}
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
          isOpen={this.state.checkRemoveMemberFromTeamIsOpen}
          onRequestClose={this.closeCheckRemoveMemberFromTeamModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NH???C NH???</p>
            <p style={{ fontWeight: "bold" }}>
              B???n c?? ch???c l?? mu???n x??a th??nh vi??n n??y ra kh???i nh??m c???a b???n kh??ng
              ??? !!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToRemoveMemberFromTeam()}
          >
            Chu???n r???i!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckRemoveMemberFromTeamModal()}
          >
            Ngh?? l???i!!!
          </button>
        </Modal>
      </div>
    );
  }
}
