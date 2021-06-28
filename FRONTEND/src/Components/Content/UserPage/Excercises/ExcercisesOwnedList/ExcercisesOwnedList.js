import React from "react";

import ExcercisesOwnedListContent from "./ExcercisesOwnedListContent";
import ExcercisesOwnedDetailItem from "./ExcercisesOwnedDetailItem";
import ExcercisesOwnedItemScoreBoard from "./ExcercisesOwnedItemScoreBoard";
export default class ExcercisesOwnedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setExcerciseOwnedRender: "ownedlist", ExcerciseID: "" };
  }

  updateRenderExcerciseOwnedControl = excerciseOwned => {
    this.setState({
      setExcerciseOwnedRender: excerciseOwned
    });
  };

  getExcerciseOwnedIDMemberChoice = excerciseID => {
    this.setState({
      ExcerciseID: excerciseID
    });
  };

  renderAllExcerciseOwnedOptionList = () => {
    switch (this.state.setExcerciseOwnedRender) {
      case "ownedlist":
        return (
          <ExcercisesOwnedListContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseOwnedControl={
              this.updateRenderExcerciseOwnedControl
            }
            getExcerciseOwnedIDMemberChoice={
              this.getExcerciseOwnedIDMemberChoice
            }
          />
        );
      case "owneditem":
        return (
          <ExcercisesOwnedDetailItem
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
              this.props.updateRenderExcerciseControl
            }
            getExcerciseOwnedIDMemberChoice={
              this.getExcerciseOwnedIDMemberChoice
            }
          />
        );
      case "owneditemscoreboard":
        return (
          <ExcercisesOwnedItemScoreBoard
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
          <ExcercisesOwnedListContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseOwnedControl={
              this.updateRenderExcerciseOwnedControl
            }
            getExcerciseOwnedIDMemberChoice={
              this.getExcerciseOwnedIDMemberChoice
            }
          />
        );
    }
  };

  render() {
    return (
      <div className="user-excercises_all-list__owned-list">
        {this.renderAllExcerciseOwnedOptionList()}
      </div>
    );
  }
}
