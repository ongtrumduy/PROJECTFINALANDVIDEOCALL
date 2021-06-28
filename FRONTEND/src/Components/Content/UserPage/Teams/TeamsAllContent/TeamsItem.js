import React from "react";
import axios from "axios";
import Modal from "react-modal";
export default class TeamsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkShowLeaveTeam: false,
      checkValidate: "",
      checkLeaveTeamConfirmIsOpen: false,
      checkConfirmLeaveTeamSuccessIsOpen: false
    };
  }

  openCheckLeaveTeamConfirmModal = () => {
    this.setState({
      checkLeaveTeamConfirmIsOpen: true
    });
  };

  closeCheckLeaveTeamConfirmModal = () => {
    this.setState({
      checkLeaveTeamConfirmIsOpen: false
    });
  };

  openCheckConfirmLeaveTeamSuccessModal = () => {
    this.setState({
      checkConfirmLeaveTeamSuccessIsOpen: true
    });
  };

  closeCheckConfirmLeaveTeamSuccessModal = () => {
    this.setState({
      checkConfirmLeaveTeamSuccessIsOpen: false
    });
  };

  showLeaveTeamItem = () => {
    if (this.state.checkShowLeaveTeam) {
      this.setState({
        checkShowLeaveTeam: false
      });
    } else {
      this.setState({
        checkShowLeaveTeam: true
      });
    }
  };

  sendToLeaveOfTeamChoice = () => {
    axios
      .post("./leaveofteamchoice", {
        MemberID: this.props.MemberID,
        TeamID: this.props.TeamID
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "leave-team-success") {
          this.openCheckConfirmLeaveTeamSuccessModal();
        }
      });
  };

  renderTeamItemContent = () => {
    return this.state.checkShowLeaveTeam ? (
      <div className="user-teams_all__list___team-item____delete">
        <i
          className="material-icons"
          style={{ color: "rebeccapurple" }}
          onClick={() => this.showLeaveTeamItem()}
        >
          {"more"}
        </i>
        <span onClick={() => this.openCheckLeaveTeamConfirmModal()}>Xóa</span>
        <div onClick={() => this.props.chooseOneJoinedTeam(this.props.TeamID)}>
          <img alt="team-logo" src={this.props.TeamLogo} />
          <p
            style={{
              fontWeight: "bold",
              margin: "12px 12px 0 12px"
            }}
          >
            {this.props.TeamName}
          </p>
        </div>
      </div>
    ) : (
      <div className="user-teams_all__list___team-item____non-delete">
        <i className="material-icons" onClick={() => this.showLeaveTeamItem()}>
          {"more"}
        </i>
        <div onClick={() => this.props.chooseOneJoinedTeam(this.props.TeamID)}>
          <img style={{}} alt="team-logo" src={this.props.TeamLogo} />
          <p
            style={{
              fontWeight: "bold",
              margin: "12px 12px 0 12px"
            }}
          >
            {this.props.TeamName}
          </p>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderTeamItemContent()}

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
          isOpen={this.state.checkLeaveTeamConfirmIsOpen}
          onRequestClose={this.closeCheckLeaveTeamConfirmModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có thực sự muốn rời khỏi nhóm &nbsp;
              <span style={{ color: "burlywood" }}>{this.props.TeamName}</span>
              ????
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToLeaveOfTeamChoice()}
          >
            <span>Chuẩn luôn!!!</span>
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckLeaveTeamConfirmModal()}
          >
            <span>Nhầm đấy :(((</span>
          </button>
        </Modal>

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
          isOpen={this.state.checkConfirmLeaveTeamSuccessIsOpen}
          onRequestClose={this.closeCheckConfirmLeaveTeamSuccessModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn đã rời thành công nhóm &nbsp;
              <span style={{ color: "blanchedalmond" }}>
                {this.props.TeamName}
              </span>
              !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckConfirmLeaveTeamSuccessModal()}
          >
            <span>OKIII</span>
          </button>
        </Modal>
      </div>
    );
  }
}
