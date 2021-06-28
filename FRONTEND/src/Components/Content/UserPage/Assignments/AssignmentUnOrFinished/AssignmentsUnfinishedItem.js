import React from "react";
import axios from "axios";

export default class AssignmentsUnfinishedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkRenderDetail: "0",
      TeamLogo: "",
      TeamName: "",
      ExcerciseName: "",
      ExcerciseLogo: "",
      MemberDidHighestScore: "",
      ExcerciseNumberQuestion: ""
    };
  }

  componentDidMount = () => {
    axios
      .post("./getteamofassignsmentinfor", {
        TeamID: this.props.TeamID
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          TeamName: res.data.TeamName,
          TeamLogo: res.data.TeamLogo
        });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .post("./getexcerciseofassignmentinfor", {
        ExcerciseID: this.props.ExcerciseID,
        MemberID: this.props.MemberID
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          ExcerciseName: res.data.ExcerciseName,
          ExcerciseLogo: res.data.ExcerciseLogo,
          MemberDidHighestScore: res.data.MemberDidHighestScore,
          ExcerciseNumberQuestion: res.data.ExcerciseNumberQuestion
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  setChooseAssignmentItem = (assignmentID, excerciseID) => {
    this.props.setChooseAssignmentAndExcerciseToDoExcericse(
      assignmentID,
      excerciseID
    );
    this.props.updateRenderAssignmentsControl("doexcercise");
  };

  setChangeRenderDetail = () => {
    if (this.state.checkRenderDetail === "1") {
      this.setState({
        checkRenderDetail: "2"
      });
    } else if (this.state.checkRenderDetail === "2") {
      this.setState({
        checkRenderDetail: "3"
      });
    } else if (this.state.checkRenderDetail === "3") {
      this.setState({
        checkRenderDetail: "0"
      });
    } else if (this.state.checkRenderDetail === "0") {
      this.setState({
        checkRenderDetail: "1"
      });
    }
  };

  renderAllAssignmentUnfinishedItem = () => {
    switch (this.state.checkRenderDetail) {
      case "0":
        return (
          <div className="user-assignments_all__list___content_____finished______assignment-item_______content_______first-item">
            <div style={{ height: "40px", fontWeight: "bold" }}>
              <p style={{ lineHeight: "0px" }}>{this.props.TeamNoteName}</p>
            </div>
            <div style={{ color: "blue", margin: "-8px 0 0 0" }}>
              <div>
                <span>Ngày tạo: {this.props.TeamNoteCreateDate}</span>
              </div>
              <div>
                <span>Hết hạn: {this.props.TeamNoteEndDate}</span>
              </div>
            </div>
          </div>
        );
      case "1":
        return (
          <div className="user-assignments_all__list___content_____finished______assignment-item_______content_______second-item">
            <div>
              <img
                style={{ width: "48px", height: "48px" }}
                src={this.state.ExcerciseLogo}
                alt="excercise-logo"
              />
            </div>
            <div style={{ fontWeight: "bold" }}>
              <p>{this.state.ExcerciseName}</p>
            </div>
            <div style={{ fontWeight: "bold" }}>
              <span>{this.state.MemberDidHighestScore}</span>/
              <span>{this.state.ExcerciseNumberQuestion}</span>
              &nbsp; câu
            </div>
          </div>
        );
      case "2":
        return (
          <div className="user-assignments_all__list___content_____finished______assignment-item_______content_______third-item">
            <div>
              <p>
                <span style={{ margin: "0 0 0 12px" }}>Tên nhóm:&nbsp;</span>
                <span style={{ fontWeight: "bold" }}>
                  {this.state.TeamName}
                </span>
              </p>
            </div>
          </div>
        );
      case "3":
        return (
          <div className="user-assignments_all__list___content_____finished______assignment-item_______content_______fourth-item">
            <div>
              <p>
                <span style={{ margin: "0 0 0 12px" }}>Mô tả: &nbsp;</span>
                <span style={{ fontWeight: "bold" }}>
                  {this.state.TeamNoteDescription}
                </span>
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="user-assignments_all__list___content_____finished______assignment-item_______content_______first-item">
            <div style={{ height: "40px", fontWeight: "bold" }}>
              <p style={{ lineHeight: "0px" }}>{this.props.TeamNoteName}</p>
            </div>
            <div style={{ color: "blue", margin: "-8px 0 0 0" }}>
              <div>
                <span>Ngày tạo: {this.props.TeamNoteCreateDate}</span>
              </div>
              <div>
                <span>Hết hạn: {this.props.TeamNoteEndDate}</span>
              </div>
            </div>
          </div>
        );
    }
  };

  render() {
    return (
      <div className="user-assignments_all__list___content_____unfinished______assignment-item">
        <div
          style={{ cursor: "pointer" }}
          onClick={() =>
            this.props.setChooseAssignmentToTurnIn(this.props.AssignmentID)
          }
        >
          <i className="material-icons">
            {this.props.AssignmentChoiceID === this.props.AssignmentID
              ? "radio_button_checked"
              : "radio_button_unchecked"}
          </i>
        </div>
        <div
          style={{
            cursor: "pointer",
            width: "100%",
            border: "1px solid black"
          }}
          onClick={() =>
            this.setChooseAssignmentItem(
              this.props.AssignmentID,
              this.props.ExcerciseID
            )
          }
        >
          <div className="user-assignments_all__list___content_____unfinished______assignment-item_______content">
            <div>
              <img
                style={{ width: "60px", height: "60px" }}
                alt="team-logo"
                src={this.props.TeamLogo}
              />
            </div>
            {this.renderAllAssignmentUnfinishedItem()}
            <div style={{ fontWeight: "bold" }}>
              {this.props.CheckOverTimeToFinished ? (
                <span style={{ color: "red" }}>Quá hạn</span>
              ) : (
                <span style={{ color: "blue" }}>Còn hạn</span>
              )}
            </div>
          </div>
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => this.setChangeRenderDetail()}
        >
          <i className="material-icons" style={{ fontWeight: "bold" }}>
            {"arrow_forward"}
          </i>
        </div>
      </div>
    );
  }
}
