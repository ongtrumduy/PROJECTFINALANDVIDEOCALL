import React from "react";
import axios from "axios";

import TeamMainName from "./TeamMainContent/TeamMainName";
import TeamMainMenu from "./TeamMainContent/TeamMainMenu";
import TeamMainContent from "./TeamMainContent/TeamMainContent";
import "./Team.css";

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.upmounted = false;
    this.leavemounted = false;
    this.axiosmounted = false;
    this.state = {
      ChooseTeamInfor: [],
      setSelectTeamContent: "discuss",
      CheckMemberIsAdmin: false,
      ChooseTeamID: "",
      checkLoadingTeamChoiceInfor: false
    };
  }

  componentDidMount = () => {
    this.axiosmounted = true;

    axios
      .post("/getteamlist/getteaminfor", {
        TeamID: this.props.TeamID,
        MemberID: this.props.MemberID
      })
      .then(res => {
        if (this.axiosmounted) {
          this.setState({
            ChooseTeamID: res.data.TeamID,
            ChooseTeamInfor: res.data.TeamAllInfor,
            CheckMemberIsAdmin: res.data.CheckMemberIsAdmin
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    this.timeout = setTimeout(() => {
      this.setState({
        checkLoadingTeamChoiceInfor: true
      });
    }, 500);

    this.mounted = true;
    this.upmounted = true;
    this.leavemounted = true;

    this.props.socket.on("sent-to-update-team-infor", data => {
      if (this.upmounted) {
        if (this.props.TeamID === data.TeamID) {
          this.props.socket.emit("receive-to-update-team-infor", {
            TeamID: data.TeamID,
            MemberID: this.props.MemberID
          });
        }
      }
    });

    this.props.socket.on("update-team-infor", data => {
      if (this.mounted) {
        if (this.props.TeamID === data.TeamID) {
          this.setState({
            ChooseTeamID: data.TeamID,
            ChooseTeamInfor: data.TeamAllInfor,
            CheckMemberIsAdmin: data.CheckMemberIsAdmin
          });
        }
      }
    });

    this.props.socket.on("confirm-kickout-from-team", data => {
      if (this.leavemounted) {
        if (
          this.props.TeamID === data.TeamID &&
          this.props.MemberID === data.MemberID
        ) {
          this.props.openConfirmKickoutFromTeamModal(data.TeamName);

          this.props.updateRenderTeamControl("teamall");
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.mounted = false;
    this.upmounted = false;
    this.leavemounted = false;
    this.axiosmounted = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  setSelectTeamContentClickChoose = setSelect => {
    this.setState({
      setSelectTeamContent: setSelect
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {this.state.checkLoadingTeamChoiceInfor ? (
          <div className="user-team">
            <div className="user-team_team-name">
              <div
                className="user-team_team-name__backtoteamall"
                onClick={() => this.props.updateRenderTeamControl("teamall")}
              >
                <div>
                  <i className="material-icons"> &#xe5c4;</i>
                </div>
                <div>
                  <span>Tất cả các nhóm</span>
                </div>
              </div>
              <TeamMainName
                MemberID={this.props.MemberID}
                TeamID={this.state.ChooseTeamID}
                ChooseTeamInfor={this.state.ChooseTeamInfor}
              />
            </div>
            <div className="user-team_team-menu-and-content">
              <div>
                <TeamMainMenu
                  MemberID={this.props.MemberID}
                  TeamID={this.state.ChooseTeamID}
                  socket={this.props.socket}
                  ChooseTeamInfor={this.state.ChooseTeamInfor}
                  setSelectTeamContentClickChoose={
                    this.setSelectTeamContentClickChoose
                  }
                  CheckMemberIsAdmin={this.state.CheckMemberIsAdmin}
                  updateRenderTeamControl={this.props.updateRenderTeamControl}
                  localhostclientIP={this.props.localhostclientIP}
                />
              </div>
              <div>
                <TeamMainContent
                  MemberID={this.props.MemberID}
                  TeamID={this.props.TeamID}
                  socket={this.props.socket}
                  ChooseTeamInfor={this.state.ChooseTeamInfor}
                  setSelectTeamContent={this.state.setSelectTeamContent}
                  CheckMemberIsAdmin={this.state.CheckMemberIsAdmin}
                />
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: "blue", fontWeight: "bold" }}>
            Đang tải nội dung...
          </p>
        )}
      </div>
    );
  }
}
