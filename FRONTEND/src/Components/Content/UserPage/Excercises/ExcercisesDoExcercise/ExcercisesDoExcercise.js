import React from "react";
import axios from "axios";

import "./ExcercisesDoExcercise.css";

import ExcercisesDoExcerciseContent from "./ExcercisesDoExcercise/ExcercisesDoExcerciseContent";
import ExcercisesResultExcerciseContent from "./ExcercisesResultExcercise/ExcercisesResultExcerciseContent";
import ExcercisesResultDidExcerciseContent from "./ExcercisesResultExcercise/ExcercisesResultDidExcerciseContent";

export default class ExcercisesDoExcercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseExcerciseDoOrFinished: "",
      ExcerciseAllQAContent: [],
      ExcerciseName: "",
      ExcerciseNumberQuestion: "",
      ExcerciseType: "",
      ExcerciseLogo: "",
      ExcerciseMemberDidResult: "",
      ExcerciseAllAnswerContent: []
    };
  }

  componentDidMount = () => {
    axios
      .post("/getallquestionanswercontent", {
        MemberID: this.props.MemberID,
        ExcerciseID: this.props.ExcerciseID
      })
      .then(res => {
        console.log(
          "Ra dữ liệu cái NumberQuestion cho tao ",
          res.data.ExcerciseNumberQuestion
        );
        this.setState({
          ExcerciseAllQAContent: res.data.ExcerciseAllQAContent,
          ExcerciseName: res.data.ExcerciseName,
          ExcerciseNumberQuestion: res.data.ExcerciseNumberQuestion,
          ExcerciseType: res.data.ExcerciseType,
          ExcerciseLogo: res.data.ExcerciseLogo
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  updateRenderExcerciseDoExcerciseControl = state => {
    this.setState({
      chooseExcerciseDoOrFinished: state
    });
  };

  getAllChoiceAndCorrectAnswerList = excerciseAllAnswerContent => {
    this.setState({
      ExcerciseAllAnswerContent: excerciseAllAnswerContent
    });
  };

  getExcerciseMemberDidResultOfThisExcercise = excerciseMemberDidResult => {
    this.setState({
      ExcerciseMemberDidResult: excerciseMemberDidResult
    });
  };

  renderExcerciseDoExcersiceDoOrFinished = () => {
    switch (this.state.chooseExcerciseDoOrFinished) {
      case "doexcercise":
        return (
          <ExcercisesDoExcerciseContent
            MemberID={this.props.MemberID}
            updateRenderExcerciseDoExcerciseControl={
              this.updateRenderExcerciseDoExcerciseControl
            }
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            getAllChoiceAndCorrectAnswerList={
              this.getAllChoiceAndCorrectAnswerList
            }
            getExcerciseMemberDidResultOfThisExcercise={
              this.getExcerciseMemberDidResultOfThisExcercise
            }
            ExcerciseAllQAContent={this.state.ExcerciseAllQAContent}
            TimeToDoExcercise={this.props.TimeToDoExcercise}
            ExcerciseName={this.state.ExcerciseName}
            ExcerciseNumberQuestion={this.state.ExcerciseNumberQuestion}
            ExcerciseType={this.state.ExcerciseType}
            ExcerciseLogo={this.state.ExcerciseLogo}
            ExcerciseID={this.props.ExcerciseID}
          />
        );

      case "finishexcercise":
        return (
          <ExcercisesResultExcerciseContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseDoExcerciseControl={
              this.updateRenderExcerciseDoExcerciseControl
            }
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            ExcerciseName={this.state.ExcerciseName}
            ExcerciseNumberQuestion={this.state.ExcerciseNumberQuestion}
            ExcerciseType={this.state.ExcerciseType}
            ExcerciseLogo={this.state.ExcerciseLogo}
            ExcerciseID={this.props.ExcerciseID}
            TimeToDoExcercise={this.props.TimeToDoExcercise}
            ExcerciseMemberDidResult={this.state.ExcerciseMemberDidResult}
          />
        );

      case "excerciseresultdidexcercise":
        return (
          <ExcercisesResultDidExcerciseContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseDoExcerciseControl={
              this.updateRenderExcerciseDoExcerciseControl
            }
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            ExcerciseAllQAContent={this.state.ExcerciseAllQAContent}
            ExcerciseName={this.state.ExcerciseName}
            ExcerciseNumberQuestion={this.state.ExcerciseNumberQuestion}
            ExcerciseType={this.state.ExcerciseType}
            ExcerciseLogo={this.state.ExcerciseLogo}
            ExcerciseAllAnswerContent={this.state.ExcerciseAllAnswerContent}
            ExcerciseID={this.props.ExcerciseID}
            TimeToDoExcercise={this.props.TimeToDoExcercise}
          />
        );
      default:
        return (
          <ExcercisesDoExcerciseContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseDoExcerciseControl={
              this.updateRenderExcerciseDoExcerciseControl
            }
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            getAllChoiceAndCorrectAnswerList={
              this.getAllChoiceAndCorrectAnswerList
            }
            getExcerciseMemberDidResultOfThisExcercise={
              this.getExcerciseMemberDidResultOfThisExcercise
            }
            ExcerciseAllQAContent={this.state.ExcerciseAllQAContent}
            TimeToDoExcercise={this.props.TimeToDoExcercise}
            ExcerciseName={this.state.ExcerciseName}
            ExcerciseNumberQuestion={this.state.ExcerciseNumberQuestion}
            ExcerciseType={this.state.ExcerciseType}
            ExcerciseLogo={this.state.ExcerciseLogo}
            ExcerciseID={this.props.ExcerciseID}
          />
        );
    }
  };

  render() {
    return (
      <div className="user-excercises_do-excercise">
        {this.renderExcerciseDoExcersiceDoOrFinished()}
      </div>
    );
  }
}
