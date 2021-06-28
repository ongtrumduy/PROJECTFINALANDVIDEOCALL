import React from "react";
import avatar from "../../../../Main/Image-Icons/default-avatar.png";

export default class ChatsListContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checkHiddenAndDeleteButton: false };
  }

  setHiddenAndDeleteButton = () => {
    if (this.state.checkHiddenAndDeleteButton) {
      this.setState({
        checkHiddenAndDeleteButton: false
      });
    } else {
      this.setState({
        checkHiddenAndDeleteButton: true
      });
    }
  };

  render() {
    return (
      <div className="user-chat_list__content___content-infor-item">
        <div
          className="user-chat_list__content___infor"
          onClick={() =>
            this.props.setMemberChoiceToChatID(
              this.props.MemberChatID,
              this.props.MemberChatFullName,
              this.props.BannedMemberChat
            )
          }
          style={
            this.props.SeenMemberChat === false
              ? {
                  backgroundColor: "white",
                  color: "blue",
                  fontWeight: "bold"
                }
              : this.props.MemberChoiceToChatID === this.props.MemberChatID
              ? { backgroundColor: "rgb(230, 231, 170)" }
              : {
                  backgroundColor: "white"
                }
          }
        >
          <div className="user-chat_list__content___infor_____avatar">
            <img
              style={{ height: "40px", width: "40px" }}
              alt="default-avatar"
              src={avatar}
            />
          </div>
          <div className="user-chat_list__content___infor_____fullname-and-lastmessage">
            <div>
              <span style={{ fontWeight: "bold" }}>
                {this.props.MemberChatFullName}
              </span>
            </div>
            <div>
              {this.props.MemberID === this.props.MemberChattedID ? (
                <small>Bạn: </small>
              ) : (
                <small></small>
              )}
              <small>{this.props.MemberChattedContent}</small>
            </div>
          </div>
        </div>
        {/*===========================================================================================*/}
        <div
          className={
            this.state.checkHiddenAndDeleteButton
              ? "user-chat_list__content___choose-hidden-and-delete-button"
              : "user-chat_list__content___hidden-and-delete-all-button"
          }
        >
          <div
            onClick={() =>
              this.setHiddenAndDeleteButton(this.props.MemberChatID)
            }
            className="user-chat_list__content___hidden-and-delete"
          >
            <i className="material-icons">{"more_horiz"}</i>
          </div>

          <div
            style={
              this.state.checkHiddenAndDeleteButton
                ? { display: "block" }
                : { display: "none" }
            }
          >
            <div
              onClick={() =>
                this.props.openCheckHiddenMemberChatModal(
                  this.props.MemberChatID
                )
              }
              className="user-chat_list__content___hidden-button"
            >
              <span>Ẩn</span>
            </div>
            <div
              onClick={() =>
                this.props.openCheckDeleteMemberChatModal(
                  this.props.MemberChatID
                )
              }
              className="user-chat_list__content___delete-button"
            >
              <span>Xóa</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
