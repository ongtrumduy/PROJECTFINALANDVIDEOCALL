import React from "react";
import defaultavatar from "../../Image-Icons/default-avatar.png";
import logopage from "../../Image-Icons/logo.png";

export default class UserHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setColor: "" };
  }

  logoutUserDashBoard = () => {
    this.setState({
      setColor: "logout"
    });
    setTimeout(() => {
      this.props.updateRenderLogPage("Log");
    }, 1000);

    this.props.socket.emit("disconnect-logout", {
      MemberID: this.props.MemberID
    });

    // if (this.props.TeamCallID !== "") {
    //   this.props.socket.emit("disconnected-call-team-logout", {
    //     TeamCallID: this.props.TeamCallID,
    //     MemberID: this.props.MemberID,
    //     MemberSocketID: this.props.socket.id
    //   });
    // }
  };

  render() {
    return (
      <div className="user-dashboard_header">
        <div className="user-dashboard_header__logo">
          <img src={logopage} alt="logo-webpage" />
        </div>
        <div className="user-dashboard_header__search">
          <input type="text" placeholder=" Tìm kiếm tên nhóm..." />
        </div>
        <div className="user-dashboard_header__infor">
          <div className="user-dashboard_header__infor___avatar">
            <img src={defaultavatar} alt="default-avatar" />
          </div>
          <div className="user-dashboard_header__infor___fullname">
            <button>
              {this.props.LastnameMember} &nbsp;
              {this.props.FirstnameMember}
            </button>
          </div>
          <div>
            <i
              className="material-icons"
              style={{
                fontSize: "48px",
                cursor: "pointer",
                margin: "0 54px 0 0",
                color: (this.state.setColor === "logout" && "white") || "black"
              }}
              onClick={() => {
                this.logoutUserDashBoard();
              }}
            >
              {"exit_to_app"}
            </i>
          </div>
        </div>
      </div>
    );
  }
}
