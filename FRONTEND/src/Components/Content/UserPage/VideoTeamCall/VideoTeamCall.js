import React from "react";
import ioclient from "socket.io-client";
import VideoTeamCallContent from "./VideoTeamCallContent";

export default class VideoTeamCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = { MemberID: "", TeamID: "" };
  }

  componentDidMount = () => {
    // console.log("SAng cái memberID ", this.props.match.params);

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

    this.setState({
      MemberID: this.props.match.params.MemberID,
      TeamID: this.props.match.params.TeamID
    });

    this.startBeginCallVideo();
  };

  startBeginCallVideo = () => {
    // console.log("Ra cái this.socket.id", this.socket.id);
    this.socket.emit("start-begin-call-video", {
      TeamID: this.props.match.params.TeamID,
      MemberID: this.props.match.params.MemberID,
      // MemberSocketID: this.socket.id
    });
  };

  render() {
    return (
      <div>
        {this.socket ? (
          <VideoTeamCallContent
            MemberID={this.state.MemberID}
            TeamID={this.state.TeamID}
            socket={this.socket}
            // updateRenderTeamControl={this.updateRenderTeamControl}
          />
        ) : (
          <p>Vui lòng chờ đợi kết nối !!!!</p>
        )}
      </div>
    );
  }
}
