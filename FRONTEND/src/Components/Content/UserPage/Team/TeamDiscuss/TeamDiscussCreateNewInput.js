import React from "react";

export default class TeamDiscussCreateNewInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberDiscuss: ""
    };
  }

  handleNewDiscuss = event => {
    this.setState({
      MemberDiscuss: event.target.value
    });
  };

  sentNewDiscussCreate = () => {
    this.props.socket.emit("create-new-discuss", {
      MemberID: this.props.MemberID,
      TeamID: this.props.TeamID,
      MemberDiscuss: this.state.MemberDiscuss
    });
    this.setState({
      MemberDiscuss: ""
    });
  };

  pressEnterNewDiscuss = event => {
    if (event.key === "Enter") {
      this.sentNewDiscussCreate();
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___discuss____createnew____createnewinput">
        <div>
          <input
            type="text"
            onChange={event => this.handleNewDiscuss(event)}
            onKeyPress={this.pressEnterNewDiscuss}
            value={this.state.MemberDiscuss}
            maxLength="4000"
            placeholder="Bắt đầu cuộc thảo luận mới"
          />
        </div>
        <div onClick={() => this.sentNewDiscussCreate()}>
          <i className="material-icons">&#xe163;</i>
        </div>
      </div>
    );
  }
}
