import React from "react";

import ExcercisesPublicListContent from "./ExcercisesPublicListContent";
import ExcercisesPublicDetailItem from "./ExcercisesPublicDetailItem";
import ExcercisesPublicItemScoreBoard from "./ExcercisesPublicItemScoreBoard";

export default class ExcercisesPublicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setExcercisePublicRender: "publiclist", ExcerciseID: "" };
  }

  updateRenderExcercisePublicControl = excercisepublic => {
    this.setState({
      setExcercisePublicRender: excercisepublic
    });
  };

  getExcercisePublicIDMemberChoice = excerciseID => {
    this.setState({
      ExcerciseID: excerciseID
    });
  };

  renderAllExcercisePublicOptionList = () => {
    switch (this.state.setExcercisePublicRender) {
      case "publiclist":
        return (
          <ExcercisesPublicListContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcercisePublicControl={
              this.updateRenderExcercisePublicControl
            }
            getExcercisePublicIDMemberChoice={
              this.getExcercisePublicIDMemberChoice
            }
          />
        );
      case "publicitem":
        return (
          <ExcercisesPublicDetailItem
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcercisePublicControl={
              this.updateRenderExcercisePublicControl
            }
            ExcerciseID={this.state.ExcerciseID}
            getExcercisePublicIDMemberChoice={
              this.getExcercisePublicIDMemberChoice
            }
          />
        );
      case "publicitemscoreboard":
        return (
          <ExcercisesPublicItemScoreBoard
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcercisePublicControl={
              this.updateRenderExcercisePublicControl
            }
            ExcerciseID={this.state.ExcerciseID}
            getExcerciseIDAndTimeMemberChoice={
              this.props.getExcerciseIDAndTimeMemberChoice
            }
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControls
            }
            getExcercisePublicIDMemberChoice={
              this.getExcercisePublicIDMemberChoice
            }
          />
        );
      default:
        return (
          <ExcercisesPublicListContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcercisePublicControl={
              this.updateRenderExcercisePublicControl
            }
            getExcercisePublicIDMemberChoice={
              this.getExcercisePublicIDMemberChoice
            }
          />
        );
    }
  };

  render() {
    return (
      <div className="user-excercises_all-list__public-list">
        {this.renderAllExcercisePublicOptionList()}
      </div>
    );
  }
}
