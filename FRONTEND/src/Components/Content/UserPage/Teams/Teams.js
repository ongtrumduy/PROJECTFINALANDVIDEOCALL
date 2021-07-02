import React from "react";
import Modal from "react-modal";

import "./Teams.css";
import TeamsAddCodeTeam from "./TeamsAAndCTeam/TeamsAddCodeTeam";
import TeamsAllContent from "./TeamsAllContent/TeamsAllContent";
import TeamsCreateTeam from "./TeamsAAndCTeam/TeamsCreateTeam";
import Team from "../Team/Team";
// import VideoCall from "../VideoTeamCall/VideoTeamCall";

export default class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setTeamRender: "teamall",
      TeamID: "",
      confirmKickoutFromTeam: false,
      TeamKickedName: ""
    };
  }

  openConfirmKickoutFromTeamModal = teamKickedName => {
    this.setState({
      confirmKickoutFromTeam: true,
      TeamKickedName: teamKickedName
    });
  };

  closeConfirmKickoutFromTeamModal = () => {
    this.setState({
      confirmKickoutFromTeam: false
    });
  };

  updateRenderTeamControl = state => {
    this.setState({
      setTeamRender: state
    });
  };

  getTeamIDMemberChoice = teamID => {
    this.setState({
      TeamID: teamID
    });
  };

  renderTeamControlContent = () => {
    switch (this.state.setTeamRender) {
      case "create":
        return (
          <TeamsCreateTeam
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
          />
        );
      case "addcode":
        return (
          <TeamsAddCodeTeam
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
          />
        );
      case "teamcontent":
        return (
          <Team
            MemberID={this.props.MemberID}
            TeamID={this.state.TeamID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
            openConfirmKickoutFromTeamModal={
              this.openConfirmKickoutFromTeamModal
            }
            localhostclientIP={this.props.localhostclientIP}
          />
        );
      case "teamall":
        return (
          <TeamsAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
            getTeamIDMemberChoice={this.getTeamIDMemberChoice}
          />
        );
      // case "videocall":
      //   return (
      //     <VideoCall
      //       MemberID={this.props.MemberID}
      //       TeamID={this.state.TeamID}
      //       socket={this.props.socket}
      //       updateRenderTeamControl={this.updateRenderTeamControl}
      //     />
      //   );
      default:
        return (
          <TeamsAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
            getTeamIDMemberChoice={this.getTeamIDMemberChoice}
          />
        );
    }
  };

  render() {
    return (
      <div className="user-teams">
        {this.renderTeamControlContent()}

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
          isOpen={this.state.confirmKickoutFromTeam}
          onRequestClose={this.closeConfirmKickoutFromTeamModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>
              THÔNG BÁO TIN BUỒN
            </p>
            <p style={{ fontWeight: "bold" }}>
              Bạn đã bị Xóa tư cách thành viên của Nhóm &nbsp;
              <span style={{ color: "yellowgreen" }}>
                {this.state.TeamKickedName}
              </span>
              &nbsp; bởi Quản trị viên :((((( !!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeConfirmKickoutFromTeamModal()}
          >
            Đã rõ!!!
          </button>
        </Modal>
      </div>
    );
  }
}
