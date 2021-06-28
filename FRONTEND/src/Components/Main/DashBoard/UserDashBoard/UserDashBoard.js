import React from "react";
import axios from "axios";

import "./UserDashBoard.css";
import UserFooter from "./UserFooter";
import UserContent from "./UserContent";
import UserHeader from "./UserHeader";
import UserMenu from "./UserMenu";

// import { Route } from "react-router-dom";
// import VideoTeamCall from "../../../Content/UserPage/VideoTeamCall/VideoTeamCall";

export default class UserDashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentState: "teams",
      FirstnameMember: "",
      LastnameMember: "",
      checkJoinCall: "false",
      TeamCallID: ""
    };
  }

  updateContentState = state => {
    this.setState({ contentState: state });
    if (state !== "teams" && this.state.checkJoinCall === "true") {
      console.log("chuyển rồi nha");

      this.props.socket.emit("disconnected-call-team", {
        MemberID: this.props.MemberID,
        MemberSocketID: this.props.socket.id,
        TeamCallID: this.state.TeamCallID
      });
    }
  };

  componentDidMount = () => {
    axios
      .post("/getfullname", {
        MemberID: this.props.MemberID
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          FirstnameMember: res.data.Firstname,
          LastnameMember: res.data.Lastname
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.props.socket.emit("sent-online-memberID", {
      MemberID: this.props.MemberID
      // data: "Sao méo nhận được"
    });

    this.props.socket.on("confirm-joined-call-team", data => {
      // console.log("check ra data " + data);
      if (this.props.socket.id === data.MemberSocketID) {
        // console.log("có vào nha");
        this.setState({
          checkJoinCall: "true",
          TeamCallID: data.TeamCallID
        });
      }
    });
  };

  renderUserDashBoard = () => {
    return (
      <div className="user-dashboard">
        <UserHeader
          MemberID={this.props.MemberID}
          setMemberIDForMemberLogin={this.props.setMemberIDForMemberLogin}
          updateRenderLogPage={this.props.updateRenderLogPage}
          FirstnameMember={this.state.FirstnameMember}
          LastnameMember={this.state.LastnameMember}
          TeamCallID={this.state.TeamCallID}
          socket={this.props.socket}
        />
        <div className="user-dashboard_container">
          <UserMenu
            updateContentState={this.updateContentState}
            socket={this.props.socket}
          />
          <UserContent
            contentState={this.state.contentState}
            MemberID={this.props.MemberID}
            socket={this.props.socket}
          />
        </div>
        <UserFooter />
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderUserDashBoard()}{" "}
        {/* <Route path="/videocall" exact component={VideoTeamCall} /> */}
      </div>
    );
  }
}
