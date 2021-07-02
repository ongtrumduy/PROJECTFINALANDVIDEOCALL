import React from "react";
import AdminDashBoard from "../Main/DashBoard/AdminDashBoard/AdminDashBoard";
import UserDashBoard from "../Main/DashBoard/UserDashBoard/UserDashBoard";
import LogPage from "./Log/LogPage";

export default class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateLog: "Log"
    };
  }

  updateRenderMain = () => {
    switch (this.state.updateLog) {
      case "Admin":
        return (
          <AdminDashBoard
            updateRenderLogPage={this.updateRenderLogPage}
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            localhostclientIP={this.props.localhostclientIP}
          />
        );
      case "User":
        return (
          <UserDashBoard
            updateRenderLogPage={this.updateRenderLogPage}
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            localhostclientIP={this.props.localhostclientIP}
          />
        );
      case "Log":
        return (
          <LogPage
            updateRenderLogPage={this.updateRenderLogPage}
            setMemberIDForMemberLogin={this.props.setMemberIDForMemberLogin}
            socket={this.props.socket}
          />
        );
      default:
        return (
          <LogPage
            updateRenderLogPage={this.updateRenderLogPage}
            setMemberIDForMemberLogin={this.props.setMemberIDForMemberLogin}
            socket={this.props.socket}
          />
        );
    }
  };

  updateRenderLogPage = state => {
    this.setState({
      updateLog: state
    });
  };

  render() {
    // console.log("SAng cái memberID ", this.props.MemberID);
    return <div>{this.updateRenderMain()}</div>;
  }
}
