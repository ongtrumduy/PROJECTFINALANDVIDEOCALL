import React from "react";
import ioclient from "socket.io-client";
import VideoTeamCallContent from "./VideoTeamCallContent";

export default class VideoTeamCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = { MemberID: "", TeamID: "" };
  }

  componentDidMount = () => {
    this.socket = ioclient(`https://${window.location.hostname}:8081`, {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      },
      secure: true,
      reconnect: true,
      rejectUnauthorized: false
    });

    // console.log("Ra để lấy url ", window.location);

    this.setState({
      MemberID: this.props.match.params.MemberID,
      TeamID: this.props.match.params.TeamID
    });

    this.startBeginCallVideo();
  };

  startBeginCallVideo = () => {
    this.socket.emit("start-begin-call-video", {
      TeamID: this.props.match.params.TeamID,
      MemberID: this.props.match.params.MemberID
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
          />
        ) : (
          <p>Vui lòng chờ đợi kết nối !!!!</p>
        )}
      </div>
    );
  }
}
