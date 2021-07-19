import React from "react";
import Modal from "react-modal";

// import { Link } from "react-router-dom";

export default class TeamMainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setSelectTeam: "discuss",
      checkAlreadyCallTeamVideoIsOpen: false
    };
  }

  openCheckAlreadyCallTeamVideoModal = () => {
    this.setState({
      checkAlreadyCallTeamVideoIsOpen: true
    });
  };

  closeCheckAlreadyCallTeamVideoModal = () => {
    this.setState({
      checkAlreadyCallTeamVideoIsOpen: false
    });
  };

  setSelectTeamClickChoose = setSelect => {
    this.props.setSelectTeamContentClickChoose(setSelect);
    this.setState({
      setSelectTeam: setSelect
    });
  };

  startBeginCallVideoTeam = () => {
    this.props.socket.emit("send-to-check-begin-call-team-video", {
      MemberID: this.props.MemberID
    });
  };

  componentDidMount = () => {
    this.mouted = true;

    this.props.socket.on("receive-to-check-begin-call-team-video", data => {
      if (this.mouted) {
        if (
          data.MemberID === this.props.MemberID &&
          data.SocketID === this.props.socket.id
        ) {
          // console.log(
          //   "Ra cái CheckAlreadyCallTeamVideo",
          //   data.CheckAlreadyCallTeamVideo
          // );
          if (data.CheckAlreadyCallTeamVideo) {
            this.openCheckAlreadyCallTeamVideoModal();
          } else {
            window.open(
              `/videoteamcall/MemberID=${this.props.MemberID}&&TeamID=${this.props.TeamID}`,
              "_blank",
              "toolbar=0,location=0,menubar=0"
            );
          }
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.mouted = false;
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__menu">
        {this.props.ChooseTeamInfor.map((teaminforitem, teaminforindex) => (
          <div key={teaminforindex}>
            <img src={teaminforitem.TeamLogo} alt="team-logo" />
          </div>
        ))}
        <div>
          <button
            style={
              this.state.setSelectTeam === "discuss"
                ? {
                    color: "blue",
                    borderBottom: "groove",
                    outline: "none",
                    borderBottomColor: " rgb(216, 215, 215)",
                    fontWeight: "bold"
                  }
                : {}
            }
            onClick={() => this.setSelectTeamClickChoose("discuss")}
          >
            Thảo luận
          </button>
        </div>
        <div>
          <button
            style={
              this.state.setSelectTeam === "files"
                ? {
                    color: "blue",
                    borderBottom: "groove",
                    outline: "none",
                    borderBottomColor: " rgb(216, 215, 215)",
                    fontWeight: "bold"
                  }
                : {}
            }
            onClick={() => this.setSelectTeamClickChoose("files")}
          >
            Tệp
          </button>
        </div>
        <div>
          <button
            style={
              this.state.setSelectTeam === "notes"
                ? {
                    color: "blue",
                    borderBottom: "groove",
                    outline: "none",
                    borderBottomColor: " rgb(216, 215, 215)",
                    fontWeight: "bold"
                  }
                : {}
            }
            onClick={() => this.setSelectTeamClickChoose("notes")}
          >
            Ghi chú
          </button>
        </div>
        <div className="user-team_team-menu-and-content__callsetting">
          <div
            // style={
            //   this.props.CheckMemberIsAdmin
            //     ? { display: "block" }
            //     : { display: "none" }
            // }
            className="user-team_team-menu-and-content__callsetting___call"
          >
            <button onClick={() => this.startBeginCallVideoTeam()}>
              <i className="material-icons" style={{ fontSize: "32px" }}>
                &#xe070;
              </i>
            </button>
          </div>
          <div className="user-team_team-menu-and-content__callsetting___setting">
            <button
              style={
                this.state.setSelectTeam === "settings"
                  ? {
                      color: "blue",
                      borderBottom: "groove",
                      outline: "none",
                      borderBottomColor: " rgb(216, 215, 215)",
                      fontWeight: "bold"
                    }
                  : {}
              }
              onClick={() => this.setSelectTeamClickChoose("settings")}
            >
              <i className="material-icons" style={{ fontSize: "32px" }}>
                &#xe8b8;
              </i>
            </button>
          </div>
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
              userSelect: "none",
              zIndex: "3"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkAlreadyCallTeamVideoIsOpen}
          onRequestClose={this.closeCheckAlreadyCallTeamVideoModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn không thể thực hiện Cuộc gọi nhóm vì bạn Đang tham gia cuộc
              gọi của nhóm {this.state.TeamCallVideoName} rồi!!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckAlreadyCallTeamVideoModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>
      </div>
    );
  }
}
