import React from "react";

import ExcercisesDoExcercise from "../../Excercises/ExcercisesDoExcercise/ExcercisesDoExcercise";
import AssignmentsExcerciseDetailItem from "./AssignmentsExcerciseDetailItem";
import AssignmentsExcerciseItemScoreBoard from "./AssignmentsExcerciseItemScoreBoard";

export default class AssignmentsDoExcercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkDoExcercise: false,
      renderAssignmentDoExcercise: "excercisedetail",
      ExcerciseID: "",
      TimeToDoExcercise: "0"
    };
  }

  getExcerciseIDAndTimeMemberChoice = (excerciseID, timeToDoExcercise) => {
    this.setState({
      ExcerciseID: excerciseID,
      TimeToDoExcercise: timeToDoExcercise
    });
  };

  updateRenderExcerciseControl = state => {
    if (state === "excerciseall") {
      this.props.updateRenderAssignmentsControl("assignmentall");
    } else if (state === "excercisedoexcercise") {
      this.updateRenderAssignmentDoExcercise("doexcercise");
    } else if (state === "owneditem") {
      this.setState({
        renderAssignmentDoExcercise: "excercisedetail"
      });
    }
  };

  updateRenderExcerciseOwnedControl = state => {
    if (state === "ownedlist") {
      this.props.updateRenderAssignmentsControl("assignmentall");
    } else if (state === "owneditemscoreboard") {
      this.setState({
        renderAssignmentDoExcercise: "excerciseitemscoreboard"
      });
    } else if (state === "owneditem") {
      this.setState({
        renderAssignmentDoExcercise: "excercisedetail"
      });
    }
  };

  updateRenderAssignmentDoExcercise = state => {
    this.setState({
      renderAssignmentDoExcercise: state
    });
  };

  getExcerciseOwnedIDMemberChoice = excerciseID => {
    this.setState({
      ExcerciseID: excerciseID
    });
  };

  renderAssignmentDoExcercise = () => {
    switch (this.state.renderAssignmentDoExcercise) {
      case "doexcercise":
        return (
          <ExcercisesDoExcercise
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
            TimeToDoExcercise={this.state.TimeToDoExcercise}
            ExcerciseID={this.state.ExcerciseID}
          />
        );
      case "excercisedetail":
        return (
          <AssignmentsExcerciseDetailItem
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseOwnedControl={
              this.updateRenderExcerciseOwnedControl
            }
            ExcerciseID={this.props.ExcerciseID}
            getExcerciseIDAndTimeMemberChoice={
              this.getExcerciseIDAndTimeMemberChoice
            }
            getExcerciseOwnedIDMemberChoice={
              this.getExcerciseOwnedIDMemberChoice
            }
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
          />
        );
      case "excerciseitemscoreboard":
        return (
          <AssignmentsExcerciseItemScoreBoard
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseOwnedControl={
              this.updateRenderExcerciseOwnedControl
            }
            ExcerciseID={this.state.ExcerciseID}
            getExcerciseIDAndTimeMemberChoice={
              this.props.getExcerciseIDAndTimeMemberChoice
            }
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControls
            }
            getExcerciseOwnedIDMemberChoice={
              this.getExcerciseOwnedIDMemberChoice
            }
          />
        );
      default:
        return (
          <AssignmentsExcerciseDetailItem
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseOwnedControl={
              this.updateRenderExcerciseOwnedControl
            }
            ExcerciseID={this.props.ExcerciseID}
            getExcerciseIDAndTimeMemberChoice={
              this.getExcerciseIDAndTimeMemberChoice
            }
            getExcerciseOwnedIDMemberChoice={
              this.getExcerciseOwnedIDMemberChoice
            }
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
          />
        );
    }
  };

  render() {
    return <div>{this.renderAssignmentDoExcercise()}</div>;
  }
}
