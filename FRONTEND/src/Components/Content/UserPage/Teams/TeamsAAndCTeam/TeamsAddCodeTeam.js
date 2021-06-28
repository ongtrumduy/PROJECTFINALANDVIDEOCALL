import React from "react";
import axios from "axios";

export default class TeamsAddCodeTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamCodeToJoin: "",
      checkValidate: ""
    };
  }

  handleValueSearch = event => {
    this.setState({
      TeamCodeToJoin: event.target.value
    });
  };

  handleSearchTeamByTeamCode = event => {
    this.searchTeamByTeamCodeToJoin();

    event.preventDefault();
  };

  checkValidateAddCodeTeam = type => {
    switch (type) {
      case "joined-team":
        return <span>Bạn đã tham gia nhóm này rồi !!!</span>;
      case "success-joined":
        return <span>Bạn đã tham gia nhóm thành công !!!</span>;
      case "non-existed-team":
        return (
          <small>Mã nhóm bạn nhập thiếu hoặc nhóm này không tồn tại</small>
        );
      default:
    }
  };

  renderValidateNotify = type => {
    if (this.state.checkValidate === type) {
      return <div>{this.checkValidateAddCodeTeam(type)}</div>;
    }
  };

  searchTeamByTeamCodeToJoin = () => {
    axios
      .post("/searchtojointeam", {
        MemberID: this.props.MemberID,
        TeamCodeToJoin: this.state.TeamCodeToJoin
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-joined") {
          this.props.socket.emit("add-new-member-join-team", {
            MemberID: this.props.MemberID,
            TeamID: this.state.TeamCodeToJoin
          });
          setTimeout(() => {
            this.props.updateRenderTeamControl("teamall");
          }, 1000);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  addCodeTeamForm = () => {
    return (
      <div className="user-teams_addcode">
        <form onSubmit={event => this.handleSearchTeamByTeamCode(event)}>
          <div
            className="user-teams_addcode__backtoteamall"
            onClick={() => this.props.updateRenderTeamControl("teamall")}
          >
            <div>
              <i className="material-icons"> &#xe5c4;</i>
            </div>
            <div>
              <span>Quay lại</span>
            </div>
          </div>

          <div className="user-teams_addcode__team">
            <div className="user-teams_addcode__team___form">
              <div>
                <p>Nhập mã nhóm</p>
                <input
                  type="text"
                  placeholder="Nhập mã nhóm..."
                  maxLength="100"
                  onChange={event => this.handleValueSearch(event)}
                />
              </div>
              <div className="user-teams_addcode__team___validate">
                {this.renderValidateNotify("non-existed-team")}
              </div>

              <div className="user-team_addcode__team___submit-addcode">
                <input type="submit" value="Tham gia" />
              </div>
              <div className="user-teams_create__team___response-addcode-team">
                {this.renderValidateNotify("joined-team")}
                {this.renderValidateNotify("success-joined")}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return <div>{this.addCodeTeamForm()}</div>;
  }
}
