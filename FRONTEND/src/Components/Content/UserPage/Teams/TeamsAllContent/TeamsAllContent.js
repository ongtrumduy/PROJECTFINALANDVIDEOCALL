import React from "react";
import TeamsAllList from "./TeamsAllList";

export default class TeamsAllContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-teams_all">
        <div className="user-teams_all__control">
          <div className="user-teams_all__control___title">
            <p>Tất cả nhóm</p>
          </div>
          <div className="user-teams_all__control___button">
            <button
              onClick={() => this.props.updateRenderTeamControl("create")}
            >
              Tạo nhóm
            </button>
            <button
              onClick={() => this.props.updateRenderTeamControl("addcode")}
            >
              Tham gia nhóm bằng mã
            </button>
          </div>
        </div>
        <TeamsAllList
          MemberID={this.props.MemberID}
          updateRenderTeamControl={this.props.updateRenderTeamControl}
          getTeamIDMemberChoice={this.props.getTeamIDMemberChoice}
        />
      </div>
    );
  }
}
