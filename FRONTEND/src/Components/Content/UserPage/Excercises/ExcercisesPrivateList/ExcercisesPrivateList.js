import React from "react";

import ExcercisesPrivateListContent from "./ExcercisesPrivateListContent";
import ExcercisesPrivateDetailItem from "./ExcercisesPrivateDetailItem";

export default class ExcercisesPrivateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setExcercisePrivateRender: "privatelist", ExcerciseID: "" };
  }

  updateRenderExcercisePrivateControl = excercisePrivate => {
    this.setState({
      setExcercisePrivateRender: excercisePrivate
    });
  };

  getExcercisePrivateIDMemberChoice = excerciseID => {
    this.setState({
      ExcerciseID: excerciseID
    });
  };

  renderAllExcercisePrivateOptionList = () => {
    switch (this.state.setExcercisePrivateRender) {
      case "privatelist":
        return (
          <ExcercisesPrivateListContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcercisePrivateControl={
              this.updateRenderExcercisePrivateControl
            }
          />
        );
      case "privateitem":
        return (
          <ExcercisesPrivateDetailItem
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcercisePrivateControl={
              this.updateRenderExcercisePrivateControl
            }
            ExcerciseID={this.state.ExcerciseID}
          />
        );
      default:
        return (
          <ExcercisesPrivateListContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcercisePrivateControl={
              this.updateRenderExcercisePrivateControl
            }
          />
        );
    }
  };

  render() {
    return (
      <div className="user-excercises_all-list__private-list">
        {this.renderAllExcercisePrivateOptionList()}
      </div>
    );
  }
}
