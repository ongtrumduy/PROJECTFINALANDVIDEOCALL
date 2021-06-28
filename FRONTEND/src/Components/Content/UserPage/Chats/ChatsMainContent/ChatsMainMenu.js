import React from "react";
import defaultavatar from "../../../../Main/Image-Icons/default-avatar.png";

export default class ChatsMainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setSelectChat: "message" };
  }

  setSelectChatClickChoose = setSelect => {
    this.props.setSelectChatContentClickChoose(setSelect);
    this.setState({
      setSelectChat: setSelect
    });
  };

  render() {
    return (
      <div className="user-chat_content__menu">
        <div>
          <img src={defaultavatar} alt="default-avatar" />
        </div>
        <div className="user-chat_content__menu___fullname">
          <p>
            {this.props.MemberChoiceChatFullName}-
            {this.props.MemberChoiceChatID}
          </p>
        </div>
        <div style={{ width: "20%" }}>
          <button
            style={
              this.state.setSelectChat === "message"
                ? {
                    color: "blue",
                    borderBottom: "groove",
                    outline: "none",
                    borderBottomColor: " rgb(216, 215, 215)",
                    fontWeight: "bold"
                  }
                : {}
            }
            onClick={() => this.setSelectChatClickChoose("message")}
          >
            Trò chuyện
          </button>
        </div>
        <div>
          <button
            style={
              this.state.setSelectChat === "files"
                ? {
                    color: "blue",
                    borderBottom: "groove",
                    outline: "none",
                    borderBottomColor: " rgb(216, 215, 215)",
                    fontWeight: "bold"
                  }
                : {}
            }
            onClick={() => this.setSelectChatClickChoose("files")}
          >
            Tệp
          </button>
        </div>
        {/* <div>
          <button
            style={
              this.state.setSelectChat === "notes"
                ? {
                    color: "blue",
                    borderBottom: "groove",
                    outline: "none",
                    borderBottomColor: " rgb(216, 215, 215)",
                    fontWeight: "bold"
                  }
                : {}
            }
            onClick={() => this.setSelectChatClickChoose("notes")}
          >
            Ghi chú
          </button>
        </div> */}
        <div className="user-chat_content__callsetting">
          {/* <div className="user-chat_content__callsetting___call">
            <button>
              <i className="material-icons" style={{ fontSize: "32px" }}>
                &#xe070;
              </i>
            </button>
          </div>
          <div className="user-chat_content__callsetting___screenshare">
            <button>
              <i className="material-icons" style={{ fontSize: "32px" }}>
                &#xe0e2;
              </i>
            </button>
          </div> */}
          <div className="user-chat_content__callsetting___setting">
            <button
              style={
                this.state.setSelectChat === "setting"
                  ? {
                      color: "blue",
                      borderBottom: "groove",
                      outline: "none",
                      borderBottomColor: " rgb(216, 215, 215)",
                      fontWeight: "bold"
                    }
                  : {}
              }
              onClick={() => this.setSelectChatClickChoose("setting")}
            >
              <i className="material-icons" style={{ fontSize: "32px" }}>
                &#xe8b8;
              </i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
