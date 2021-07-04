import React from "react";
import axios from "axios";

import TeamsItem from "./TeamsItem";

export default class TeamsAllList extends React.Component {
  constructor(props) {
    super(props);
    this.axiosmounted = false;
    this.state = {
      AllTeamList: [],
      checkLoadingTeamListData: false
    };
  }

  componentDidMount = () => {
    this.axiosmounted = true;

    axios
      .post("/getteamlist", {
        MemberID: this.props.MemberID
      })
      .then(res => {
        if (this.axiosmounted) {
          // console.log(res.data);
          this.setState({
            AllTeamList: res.data.AllTeamList
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    this.timeout = setTimeout(() => {
      this.setState({
        checkLoadingTeamListData: true
      });
    }, 1200);
  };

  componentWillUnmount = () => {
    this.axiosmounted = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  chooseOneJoinedTeam = TeamID => {
    this.props.getTeamIDMemberChoice(TeamID);
    this.props.updateRenderTeamControl("teamcontent");
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {this.state.checkLoadingTeamListData ? (
          <div className="user-teams_all__list">
            {this.state.AllTeamList.length === 0 ? (
              <p>Bạn chưa tham gia Nhóm thảo luận nào</p>
            ) : (
              this.state.AllTeamList.map((teamitem, teamindex) =>
                teamitem.TeamInfor.map(teamnameitem => (
                  <TeamsItem
                    key={teamindex}
                    TeamID={teamitem.TeamID}
                    MemberID={this.props.MemberID}
                    TeamLogo={teamnameitem.TeamLogo}
                    TeamName={teamnameitem.TeamName}
                    chooseOneJoinedTeam={this.chooseOneJoinedTeam}
                  />
                ))
              )
            )}
          </div>
        ) : (
          <p style={{ color: "blue", fontWeight: "bold" }}>
            Đang tải dữ liệu các nhóm....
          </p>
        )}
      </div>
    );
  }
}
