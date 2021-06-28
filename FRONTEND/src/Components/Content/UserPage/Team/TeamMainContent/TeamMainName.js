import React from "react";

export default class TeamMainName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-team_team-name__teammainname">
        {this.props.ChooseTeamInfor.map((teaminforitem, teaminforindex) => {
          return (
            <div key={teaminforindex}>
              <div className="user-team_team-name__teammainname___title">
                <img alt="team-logo" src={teaminforitem.TeamLogo} />
              </div>
              <div className="user-team_team-name__teammainname___content">
                <p>{teaminforitem.TeamName}</p>
                <span>
                  <span style={{ userSelect: "none" }}>Mã nhóm:</span>
                  <br style={{ userSelect: "none" }}></br>
                  {this.props.TeamID}
                </span>
                <p>
                  <span style={{ userSelect: "none", color: "black" }}>
                    Mô tả:
                  </span>
                  <br style={{ userSelect: "none" }}></br>
                  {teaminforitem.TeamDescription}
                </p>
                <p>
                  <span style={{ userSelect: "none", color: "black" }}>
                    Loại nhóm: &nbsp;
                  </span>
                  {teaminforitem.TeamType === "public"
                    ? "Công khai"
                    : "Riêng tư"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
