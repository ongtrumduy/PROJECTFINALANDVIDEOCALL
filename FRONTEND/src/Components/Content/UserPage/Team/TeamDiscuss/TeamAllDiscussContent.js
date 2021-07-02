import React from "react";
import axios from "axios";

import TeamDiscussContentItem from "./TeamDiscussContentItem";

export default class TeamAllDiscussContent extends React.Component {
  constructor(props) {
    super(props);
    this.axiosmounted = false;
    this.mounted = false;
    this.semounted = false;
    this.state = {
      CurrentTeamDiscussContent: [],
      CurrentIndexToRenderDiscussContent: "1",
      NumberRenderDiscussContent: "3",
      CheckNextRenderDiscussContent: false,
      TeamChoiceDiscussID: "",
      checkLoadingTeamDiscussContent: false
    };
  }

  componentDidMount = () => {
    this.axiosmounted = true;

    axios
      .post("/getteamlist/getteamdiscuss", {
        TeamID: this.props.TeamID,
        CurrentIndexToRenderDiscussContent: this.state
          .CurrentIndexToRenderDiscussContent,
        NumberRenderDiscussContent: this.state.NumberRenderDiscussContent
      })
      .then(res => {
        if (this.axiosmounted) {
          this.setState({
            CurrentTeamDiscussContent: res.data.CurrentTeamDiscussContent,
            CheckNextRenderDiscussContent:
              res.data.CheckNextRenderDiscussContent
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    this.timeout = setTimeout(() => {
      this.setState({
        checkLoadingTeamDiscussContent: true
      });
    }, 500);

    this.mounted = true;
    this.semounted = true;

    this.props.socket.on("send-to-update-team-discuss-content", data => {
      if (this.semounted) {
        if (this.props.TeamID === data.TeamID) {
          this.props.socket.emit("receive-to-update-team-discuss-content", {
            MemberID: this.props.MemberID,
            TeamID: this.props.TeamID,
            CurrentIndexToRenderDiscussContent: "1",
            NumberRenderDiscussContent: this.state.NumberRenderDiscussContent
          });
          this.setState({
            CurrentIndexToRenderDiscussContent: "1"
          });
        }
      }
    });

    this.props.socket.on("update-team-discuss-content", data => {
      if (this.mounted) {
        if (this.props.TeamID === data.TeamID) {
          this.setState({
            CurrentTeamDiscussContent: data.CurrentTeamDiscussContent,
            CheckNextRenderDiscussContent: data.CheckNextRenderDiscussContent
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.mounted = false;
    this.semounted = false;
    this.axiosmounted = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  // componentDidUpdate = () => {
  //   let firstmessage = document.getElementById("first-message");
  //   if (firstmessage) {
  //     firstmessage.scrollTo(0, firstmessage.scrollHeight);
  //     // window.scrollTo({ bottom: 0, behavior: "smooth" });
  //   }
  // };

  sendToSeeOldDiscussContent = () => {
    this.props.socket.emit("receive-to-update-team-discuss-content", {
      MemberID: this.props.MemberID,
      TeamID: this.props.TeamID,
      CurrentIndexToRenderDiscussContent:
        Number(this.state.CurrentIndexToRenderDiscussContent) + 1 + "",
      NumberRenderDiscussContent: this.state.NumberRenderDiscussContent
    });
    this.setState({
      CurrentIndexToRenderDiscussContent:
        Number(this.state.CurrentIndexToRenderDiscussContent) + 1 + ""
    });
  };

  setTeamChoiceDiscussID = teamChoiceDiscussID => {
    this.setState({
      TeamChoiceDiscussID: teamChoiceDiscussID
    });
  };

  renderTeamDiscussContent = teamitem => {
    switch (teamitem.TeamDiscussType) {
      case "newmember":
        return (
          <p
            style={{
              fontWeight: "bold",
              fontSize: "12px",
              color: "red"
            }}
          >
            {teamitem.MemberDiscussContent}
          </p>
        );
      case "adminmember":
        return (
          <div>
            <br></br>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "12px",
                color: "red"
              }}
            >
              {teamitem.MemberDiscussContent}
            </p>
          </div>
        );
      case "discuss":
        return (
          <TeamDiscussContentItem
            MemberDiscussID={teamitem.MemberDiscussID}
            TeamDiscussID={teamitem.TeamDiscussID}
            MemberDiscussFullName={teamitem.MemberDiscussFullName}
            MemberDiscussContent={teamitem.MemberDiscussContent}
            MemberDiscussTime={teamitem.MemberDiscussTime}
            socket={this.props.socket}
            MemberID={this.props.MemberID}
            TeamID={this.props.TeamID}
            setChoiceTeamMemberChatID={this.props.setChoiceTeamMemberChatID}
            CheckMemberIsAdmin={this.props.CheckMemberIsAdmin}
            TeamChoiceDiscussID={this.state.TeamChoiceDiscussID}
            setTeamChoiceDiscussID={this.setTeamChoiceDiscussID}
          />
        );
      default:
    }
  };

  render() {
    return (
      <div style={{ width: "100%", height: "456px" }}>
        {this.state.checkLoadingTeamDiscussContent ? (
          <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss">
            <div
              style={
                this.state.CheckNextRenderDiscussContent
                  ? { display: "block" }
                  : { display: "none" }
              }
              onClick={() => this.sendToSeeOldDiscussContent()}
              className="user-team_team-menu-and-content__content___discuss_____alldiscuss____seen-old-discuss"
            >
              <p>Xem thêm các Thảo luận cũ !!!</p>
            </div>
            <div
              // id="first-message"
              className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____content"
            >
              {this.state.CurrentTeamDiscussContent.map(
                (teamitem, teamindex) => (
                  <div key={teamindex}>
                    {this.renderTeamDiscussContent(teamitem)}
                  </div>
                )
              )}
            </div>
          </div>
        ) : (
          <p style={{ color: "blue", fontWeight: "bold" }}>
            Đang tải dữ liệu thảo luận nhóm....
          </p>
        )}
      </div>
    );
  }
}
