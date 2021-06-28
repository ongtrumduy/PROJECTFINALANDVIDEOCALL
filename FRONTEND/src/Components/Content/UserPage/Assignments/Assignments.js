import React from "react";
import "./Assignments.css";

import AssignmentsAllContent from "./AssignmentsAllContent/AssignmentsAllContent";
import AssignmentsDoExcercise from "./AssignmentsDoExcercise/AssignmentsDoExcercise";

export default class Assignments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setAssignmentRender: "assignmentall",
      ExcerciseID: "",
      TimeToDoExcercise: "",
      AssignmentChoiceID: "",
      ExcerciseChoiceID: ""
    };
  }

  updateRenderAssignmentsControl = state => {
    this.setState({
      setAssignmentRender: state
    });
  };

  setChooseAssignmentAndExcerciseToDoExcericse = (
    assignmentID,
    excerciseID
  ) => {
    this.setState({
      AssignmentChoiceID: assignmentID,
      ExcerciseChoiceID: excerciseID
    });
  };

  renderAssignmentControlContent = () => {
    switch (this.state.setAssignmentRender) {
      case "doexcercise":
        return (
          <AssignmentsDoExcercise
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderAssignmentsControl={this.updateRenderAssignmentsControl}
            TimeToDoExcercise={this.state.TimeToDoExcercise}
            ExcerciseID={this.state.ExcerciseChoiceID}
          />
        );
      case "assignmentall":
        return (
          <AssignmentsAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderAssignmentsControl={this.updateRenderAssignmentsControl}
            setChooseAssignmentAndExcerciseToDoExcericse={
              this.setChooseAssignmentAndExcerciseToDoExcericse
            }
          />
        );
      default:
        return (
          <AssignmentsAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderAssignmentsControl={this.updateRenderAssignmentsControl}
            setChooseAssignmentAndExcerciseToDoExcericse={
              this.setChooseAssignmentAndExcerciseToDoExcericse
            }
          />
        );
    }
  };

  render() {
    return (
      <div className="user-assignments">
        {this.renderAssignmentControlContent()}
      </div>
    );
  }
}
