import React from "react";
import Modal from "react-modal";

import defaultavatar from "../../../../Main/Image-Icons/default-avatar.png";

export default class TeamDiscussCommentContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberCommentContent: "",
      openEditAndDeleteMode: false,
      checkEditTeamDiscussCommentIsOpen: false,
      checkDeleteTeamDiscussCommentIsOpen: false,
      checkChangeToEditMode: false
    };
  }

  componentDidMount = () => {
    this.edmounted = true;
    this.demounted = true;

    this.props.socket.on("update-edit-team-discuss-comment-content", data => {
      if (this.edmounted) {
        if (
          this.props.TeamDiscussID === data.TeamDiscussID &&
          this.props.TeamCommentID === data.TeamCommentID
        ) {
          this.setState({
            checkChangeToEditMode: false,
            openEditAndDeleteMode: false
          });
        }
      }
    });

    this.props.socket.on("update-delete-team-discuss-comment-content", data => {
      if (this.demounted) {
        if (
          this.props.TeamDiscussID === data.TeamDiscussID &&
          this.props.TeamCommentID === data.TeamCommentID
        ) {
          this.setState({
            checkChangeToEditMode: false,
            openEditAndDeleteMode: false
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.edmounted = false;
    this.demounted = false;
  };

  handleMemberCommentContent = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  cancelChangeToEditMode = () => {
    this.setState({
      checkChangeToEditMode: false
    });
  };

  changeToEditModeToEditTeamDiscussComment = () => {
    this.closeCheckEditTeamDiscussCommentModal();
    this.setState({
      MemberCommentContent: this.props.MemberCommentContent,
      checkChangeToEditMode: true,
      openEditAndDeleteMode: false
    });
  };

  sendToEditTeamDiscussCommentContent = () => {
    this.setState({
      checkChangeToEditMode: false
    });
    this.props.socket.emit("send-to-edit-team-discuss-comment", {
      TeamID: this.props.TeamID,
      MemberID: this.props.MemberID,
      TeamCommentID: this.props.TeamCommentID,
      TeamDiscussID: this.props.TeamDiscussID,
      MemberCommentContent: this.state.MemberCommentContent
    });
  };

  sendToDeleteTeamDiscussCommentContent = () => {
    this.setState({
      checkChangeToEditMode: false
    });
    this.closeCheckDeleteTeamDiscussCommentModal();
    this.props.socket.emit("send-to-delete-team-discuss-comment", {
      TeamID: this.props.TeamID,
      MemberID: this.props.MemberID,
      TeamCommentID: this.props.TeamCommentID,
      TeamDiscussID: this.props.TeamDiscussID
    });
  };

  openCheckEditTeamDiscussCommentModal = () => {
    this.setState({
      checkEditTeamDiscussCommentIsOpen: true
    });
  };

  closeCheckEditTeamDiscussCommentModal = () => {
    this.setState({
      checkEditTeamDiscussCommentIsOpen: false
    });
  };

  openCheckDeleteTeamDiscussCommentModal = () => {
    this.setState({
      checkDeleteTeamDiscussCommentIsOpen: true
    });
  };

  closeCheckDeleteTeamDiscussCommentModal = () => {
    this.setState({
      checkDeleteTeamDiscussCommentIsOpen: false
    });
  };

  setOpenEditAndDeleteMode = () => {
    this.props.setTeamChoiceCommentID(this.props.TeamCommentID);

    if (this.state.openEditAndDeleteMode) {
      this.setState({
        openEditAndDeleteMode: false
      });
    } else {
      this.setState({
        openEditAndDeleteMode: true
      });
    }
  };

  renderTeamDiscussCommentContent = () => {
    return (
      <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment">
        <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________avatar">
          <img
            style={{
              height: "28px",
              width: "28px",
              margin: "4px 0 0 0"
            }}
            src={defaultavatar}
            alt="defalut-avatar"
          />
        </div>
        <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox">
          <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox__________nameandtime">
            <div
              onClick={() =>
                this.props.setChoiceTeamMemberChatID(this.props.MemberCommentID)
              }
              className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox___________fullname"
            >
              {this.props.MemberCommentFullName}-{this.props.MemberCommentID}
            </div>
            <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox___________timedate">
              {this.props.MemberCommentTime}
            </div>
            <div
              style={
                this.props.CheckMemberIsAdmin === true ||
                this.props.MemberDiscussID === this.props.MemberID ||
                this.props.MemberCommentID === this.props.MemberID
                  ? { display: "inline" }
                  : { display: "none" }
              }
              onClick={() => this.setOpenEditAndDeleteMode()}
              className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox___________edit-and-delete"
            >
              <i className="material-icons">{"more_horiz"}</i>
            </div>

            {this.props.MemberCommentID === this.props.MemberID ? (
              <div
                style={
                  this.state.openEditAndDeleteMode === true &&
                  this.props.TeamChoiceCommentID === this.props.TeamCommentID
                    ? { display: "inline" }
                    : { display: "none" }
                }
                className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox___________edit-and-delete-button"
              >
                <p onClick={() => this.openCheckEditTeamDiscussCommentModal()}>
                  Chỉnh sửa
                </p>
                <p
                  onClick={() => this.openCheckDeleteTeamDiscussCommentModal()}
                >
                  Xóa
                </p>
              </div>
            ) : (
              <div
                style={
                  this.state.openEditAndDeleteMode === true &&
                  this.props.TeamChoiceCommentID === this.props.TeamCommentID
                    ? { display: "inline" }
                    : { display: "none" }
                }
                className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox___________delete-button"
              >
                <p
                  onClick={() => this.openCheckDeleteTeamDiscussCommentModal()}
                >
                  Xóa
                </p>
              </div>
            )}
          </div>

          <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox__________content">
            {this.state.checkChangeToEditMode === false ? (
              <p>{this.props.MemberCommentContent}</p>
            ) : (
              <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox__________content________edit-mode">
                <div>
                  <textarea
                    value={this.state.MemberCommentContent}
                    name="MemberCommentContent"
                    onChange={event => this.handleMemberCommentContent(event)}
                  />
                </div>
                <div>
                  <input
                    type="button"
                    value="Cập nhật"
                    onClick={() => this.sendToEditTeamDiscussCommentContent()}
                  />
                  <input
                    type="button"
                    value="Hủy"
                    onClick={() => this.cancelChangeToEditMode()}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.renderTeamDiscussCommentContent()}

        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1",
              userSelect: "none"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkEditTeamDiscussCommentIsOpen}
          onRequestClose={this.closeCheckEditTeamDiscussCommentModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có muốn chỉnh sửa Bình luận này không?
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.changeToEditModeToEditTeamDiscussComment()}
          >
            Có chứ
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckEditTeamDiscussCommentModal()}
          >
            Ấn nhầm
          </button>
        </Modal>

        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1",
              userSelect: "none"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkDeleteTeamDiscussCommentIsOpen}
          onRequestClose={this.closeCheckDeleteTeamDiscussCommentModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có chắc chắn muốn xóa Bình luận này không ???
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToDeleteTeamDiscussCommentContent()}
          >
            Chắc chắn!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckDeleteTeamDiscussCommentModal()}
          >
            Ấn nhầm!!
          </button>
        </Modal>
      </div>
    );
  }
}
