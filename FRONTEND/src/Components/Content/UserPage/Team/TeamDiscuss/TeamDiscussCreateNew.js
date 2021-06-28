import React from "react";
import TeamDiscussCreateNewInput from "./TeamDiscussCreateNewInput";

export default class TeamContentCreateNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setInputStatus: false };
  }

  handleSetInputStatus = () => {
    this.setState({
      setInputStatus: true
    });
  };

  renderInputBoxToCreate = () => {
    if (this.state.setInputStatus) {
      return (
        <TeamDiscussCreateNewInput
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
        />
      );
    } else {
      return (
        <button onClick={() => this.handleSetInputStatus()}>
          Cuộc thảo luận mới
        </button>
      );
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___discuss____createnew">
        {this.renderInputBoxToCreate()}
      </div>
    );
  }
}
