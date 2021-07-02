import React from "react";
import ioclient from "socket.io-client";
import MainContent from "./MainContent";

import { Route, Switch } from "react-router-dom";
import VideoTeamCall from "../Content/UserPage/VideoTeamCall/VideoTeamCall";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberID: "",
      localhostserverIP: "https://192.168.0.108:8081",
      localhostclientIP: "https://192.168.0.108:3000"
    };
  }

  componentDidMount = () => {
    // window.open(
    //   `${this.state.localhostserverIP}`,
    //   "_blank",
    //   "toolbar=0,location=0,menubar=0"
    // );

    this.socket = ioclient(this.state.localhostserverIP, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      },
      secure: true,
      reconnect: true,
      rejectUnauthorized: false
    });
  };

  setMemberIDForMemberLogin = memberID => {
    this.setState({
      MemberID: memberID
    });
  };

  render() {
    // console.log("SAng cái memberID ", this.state.MemberID);

    return (
      <div>
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <MainContent
                {...props}
                socket={this.socket}
                MemberID={this.state.MemberID}
                setMemberIDForMemberLogin={this.setMemberIDForMemberLogin}
                localhostclientIP={this.state.localhostclientIP}
              />
            )}
          />
          <Route
            path="/videoteamcall/MemberID=:MemberID&&TeamID=:TeamID"
            render={props => <VideoTeamCall {...props} />}
          />
        </Switch>
      </div>
    );
  }
}
