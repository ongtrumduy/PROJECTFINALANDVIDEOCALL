import React from "react";

import ExcercisesOwnedList from "../ExcercisesOwnedList/ExcercisesOwnedList";
import ExcercisesPublicList from "../ExcercisesPublicList/ExcercisesPublicList";
import ExcercisesPrivateList from "../ExcercisesPrivateList/ExcercisesPrivateList";

export default class ExcercisesAllList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setExcerciseListRender: "ownedlist" };
  }

  handleValueExcerciseList = event => {
    this.setState({
      setExcerciseListRender: event.target.value
    });
  };

  renderAllExcerciseOptionList = () => {
    switch (this.state.setExcerciseListRender) {
      case "ownedlist":
        return (
          <ExcercisesOwnedList
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            getExcerciseIDAndTimeMemberChoice={
              this.props.getExcerciseIDAndTimeMemberChoice
            }
          />
        );
      case "publiclist":
        return (
          <ExcercisesPublicList
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
          />
        );
      case "privatelist":
        return (
          <ExcercisesPrivateList
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
          />
        );

      default:
        return (
          <ExcercisesOwnedList
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            getExcerciseIDAndTimeMemberChoice={
              this.props.getExcerciseIDAndTimeMemberChoice
            }
          />
        );
    }
  };

  render() {
    return (
      <div className="user-excercises_all-list">
        <div className="user-excercises_all-list__select-choose">
          <div className="user-excercises_all-list__select-choose___search">
            <input type="text" />
            <input type="button" value="Tìm kiếm" />
          </div>
          <div className="user-excercises_all-list__select-choose___excercise-list">
            <input
              type="radio"
              value="publiclist"
              checked={this.state.setExcerciseListRender === "publiclist"}
              onChange={event => this.handleValueExcerciseList(event)}
            />
            <span>&nbsp;&nbsp;Công khai</span>
            <input
              type="radio"
              value="privatelist"
              checked={this.state.setExcerciseListRender === "privatelist"}
              onChange={event => this.handleValueExcerciseList(event)}
            />
            <span>&nbsp;&nbsp;Riêng tư</span>
            <input
              type="radio"
              value="ownedlist"
              checked={this.state.setExcerciseListRender === "ownedlist"}
              onChange={event => this.handleValueExcerciseList(event)}
            />
            <span>&nbsp;&nbsp;Đã sở hữu</span>
          </div>
        </div>
        {this.renderAllExcerciseOptionList()}
      </div>
    );
  }
}
