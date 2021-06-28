import React from "react";
import ioclient from "socket.io-client";
import MainContent from "./MainContent";

import { Route, Switch } from "react-router-dom";
import VideoTeamCall from "../Content/UserPage/VideoTeamCall/VideoTeamCall";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberID: ""
    };
  }

  componentDidMount = () => {
    // const linklocalbackend = "http://40.88.10.237:8081";
    // const linklocalbackend = "http://localhost:8081";

    this.socket = ioclient("https://localhost:8081", {
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
    console.log("SAng cái memberID ", this.state.MemberID);

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
              />
            )}
          />
          <Route
            path="/videoteamcall/MemberID=:MemberID&&TeamID=:TeamID"
            // render={props => (
            //   <VideoTeamCall
            // {...props}
            // socket={this.socket}
            // MemberID={this.state.MemberID}
            //   />
            // )}
            render={props => <VideoTeamCall {...props} />}
          />
        </Switch>
      </div>
    );
  }
}
