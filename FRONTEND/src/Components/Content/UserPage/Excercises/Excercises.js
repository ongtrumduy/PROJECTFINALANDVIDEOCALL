import React from "react";
import "./Excercises.css";

import ExcercisesAllContent from "./ExcercisesAllContent/ExcercisesAllContent";
import ExcercisesCreateNew from "./ExcercisesCreateNew/ExcercisesCreateNew";
import ExcercisesDoExcercise from "./ExcercisesDoExcercise/ExcercisesDoExcercise";

export default class Excercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setExcerciseRender: "excerciseall",
      ExcerciseID: "",
      TimeToDoExcercise: ""
    };
  }

  updateRenderExcerciseControl = state => {
    this.setState({
      setExcerciseRender: state
    });
  };

  getExcerciseIDAndTimeMemberChoice = (excerciseID, timeToDoExcercise) => {
    this.setState({
      ExcerciseID: excerciseID,
      TimeToDoExcercise: timeToDoExcercise
    });
  };

  renderExcerciseControlContent = () => {
    switch (this.state.setExcerciseRender) {
      case "createexcercisenew":
        return (
          <ExcercisesCreateNew
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
          />
        );
      case "excerciseall":
        return (
          <ExcercisesAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
            getExcerciseIDAndTimeMemberChoice={
              this.getExcerciseIDAndTimeMemberChoice
            }
          />
        );
      case "excercisedoexcercise":
        return (
          <ExcercisesDoExcercise
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
            TimeToDoExcercise={this.state.TimeToDoExcercise}
            ExcerciseID={this.state.ExcerciseID}
          />
        );
      default:
        return (
          <ExcercisesAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
            getExcerciseIDAndTimeMemberChoice={
              this.getExcerciseIDAndTimeMemberChoice
            }
          />
        );
    }
  };

  render() {
    return (
      <div className="user-excercises">
        {this.renderExcerciseControlContent()}
      </div>
    );
  }
}
