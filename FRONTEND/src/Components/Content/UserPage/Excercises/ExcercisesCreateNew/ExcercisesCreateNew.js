import React from "react";
import "./ExcercisesCreateNew.css";

import ExcercisesCreateNewMain from "./ExcercisesCreateNewMain";
import ExcercisesCreateQAndAContent from "./ExcercisesCreateQAndAContent";

export default class ExcercisesCreateNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setExcerciseCreateNewRender: "createnewmain",
      ExcerciseID: "",
      ExcerciseName: "",
      ExcerciseDescription: "",
      ExcerciseNumberQuestion: "",
      ExcerciseType: "",
      ExcerciseLogo: null
    };
  }

  updateRenderExcerciseCreateNewControl = state => {
    this.setState({
      setExcerciseCreateNewRender: state
    });
  };

  setExcerciseContentToCreateQAContent = (
    excerciseName,
    excerciseNumberQuestion,
    excerciseType,
    excerciseLogo,
    excerciseID
  ) => {
    this.setState({
      ExcerciseName: excerciseName,
      ExcerciseNumberQuestion: excerciseNumberQuestion,
      ExcerciseType: excerciseType,
      ExcerciseLogo: excerciseLogo,
      ExcerciseID: excerciseID
    });
  };

  renderExcerciseCreateNewControlContent = () => {
    switch (this.state.setExcerciseCreateNewRender) {
      case "createnewQAcontent":
        return (
          <ExcercisesCreateQAndAContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            updateRenderExcerciseCreateNewControl={
              this.updateRenderExcerciseCreateNewControl
            }
            ExcerciseID={this.state.ExcerciseID}
            ExcerciseName={this.state.ExcerciseName}
            ExcerciseNumberQuestion={this.state.ExcerciseNumberQuestion}
            ExcerciseType={this.state.ExcerciseType}
            ExcerciseLogo={this.state.ExcerciseLogo}
          />
        );
      case "createnewmain":
        return (
          <ExcercisesCreateNewMain
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            updateRenderExcerciseCreateNewControl={
              this.updateRenderExcerciseCreateNewControl
            }
            setExcerciseContentToCreateQAContent={
              this.setExcerciseContentToCreateQAContent
            }
          />
        );

      default:
        return (
          <ExcercisesCreateNewMain
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            updateRenderExcerciseCreateNewControl={
              this.updateRenderExcerciseCreateNewControl
            }
            setExcerciseContentToCreateQAContent={
              this.setExcerciseContentToCreateQAContent
            }
          />
        );
    }
  };

  render() {
    return (
      <div className="user-excercises_create-new">
        {this.renderExcerciseCreateNewControlContent()}
      </div>
    );
  }
}
