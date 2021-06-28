import React from "react";
import axios from "axios";
import Modal from "react-modal";

export default class TeamNotesNonOutDateContentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkRenderDetail: false,
      changeNextRenderInforContent: false,
      ExcerciseTeamNoteName: "",
      ExcerciseTeamNoteLogo: "",
      ExcerciseTeamNoteNumberQuestion: "",
      checkRemoveTeamNoteItemIsOpen: false
    };
  }

  openCheckRemoveTeamNoteItemModal = () => {
    this.setState({
      checkRemoveTeamNoteItemIsOpen: true
    });
  };

  closeCheckRemoveTeamNoteItemModal = () => {
    this.setState({
      checkRemoveTeamNoteItemIsOpen: false
    });
  };

  componentDidMount = () => {
    if (this.props.TeamNoteType === "with-excercise") {
      axios
        .post("./getexcerciseinfortocreateteamnote", {
          ExcerciseTeamNoteID: this.props.ExcerciseTeamNoteID
        })
        .then(res => {
          // console.log("data gửi về đây ", res.data);

          if (res.data.returnExcerciseInfor === "exist-excercise") {
            this.setState({
              ExcerciseTeamNoteName: res.data.ExcerciseName,
              ExcerciseTeamNoteLogo: res.data.ExcerciseLogo,
              ExcerciseTeamNoteNumberQuestion: res.data.ExcerciseNumberQuestion
            });
          } else if (res.data.returnExcerciseInfor === "non-exist-excercise") {
            this.setState({
              ExcerciseTeamNoteName: "",
              ExcerciseTeamNoteLogo: "",
              ExcerciseTeamNoteNumberQuestion: ""
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  setChangeToNextRenderNoneOutDateContent = () => {
    if (this.state.changeNextRenderInforContent) {
      this.setState({
        changeNextRenderInforContent: false
      });
    } else {
      this.setState({
        changeNextRenderInforContent: true
      });
    }
  };

  sendToRemoveTeamNoteFromNonOutDateList = () => {
    this.props.socket.emit("send-to-remove-team-note-item-from-non-out-date", {
      TeamID: this.props.TeamID,
      TeamNoteID: this.props.TeamNoteID
    });
    this.closeCheckRemoveTeamNoteItemModal();
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___notes____content_____non-out-date______content_______non-out-date-item">
        {this.state.changeNextRenderInforContent === false ? (
          <div className="user-team_team-menu-and-content__content___notes____content_____non-out-date______content_______non-out-date-item_______content">
            <div
              style={{
                fontWeight: "bold",
                textAlign: "left",
                height: "44px",
                overflow: "auto",
                wordWrap: "break-word",
                wordBreak: "break-word",
                width: "100%"
              }}
            >
              <span>{this.props.TeamNoteName}</span>
            </div>
            <div className="user-team_team-menu-and-content__content___notes____content_____non-out-date______content_______non-out-date-item_______create-and-end-date">
              <div>
                <span>Ngày tạo: {this.props.TeamNoteCreateDate}</span>
              </div>
              <div>
                <span>Hết hạn: {this.props.TeamNoteEndDate}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="user-team_team-menu-and-content__content___notes____content_____non-out-date______content_______non-out-date-item_______content">
            <div
              style={{
                textAlign: "left",
                height: "44px",
                overflow: "auto",
                wordWrap: "break-word",
                wordBreak: "break-word",
                width: "100%"
              }}
            >
              <span>
                <span style={{ fontWeight: "bold" }}>Mô tả:</span>
                &nbsp;
                {this.props.TeamNoteDescription}
              </span>
            </div>
            {this.props.TeamNoteType === "with-excercise" ? (
              <div className="user-team_team-menu-and-content__content___notes____content_____non-out-date______content_______non-out-date-item_______with-excercise">
                <div>
                  <i className="material-icons"> {"link"} </i>
                </div>
                <div>
                  <span style={{ color: "blue", fontWeight: "bold" }}>
                    Kèm:{" "}
                  </span>
                </div>
                <div className="user-team_team-menu-and-content__content___notes____content_____non-out-date______content_______non-out-date-item_______excercise-with-infor">
                  <div>
                    <img
                      src={this.state.ExcerciseTeamNoteLogo}
                      alt="excercise-logo"
                    />
                  </div>
                  <div>
                    <span>{this.state.ExcerciseTeamNoteName} </span>
                  </div>
                  <div>
                    <span>
                      {this.state.ExcerciseTeamNoteNumberQuestion}
                      &nbsp;câu
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
        <div className="user-team_team-menu-and-content__content___notes____content_____non-out-date______content_______non-out-date-item_______change-content-and-delete">
          <div onClick={() => this.setChangeToNextRenderNoneOutDateContent()}>
            <i className="material-icons">{"arrow_forward"}</i>
          </div>
          {this.props.CheckMemberIsAdmin ? (
            <div onClick={() => this.openCheckRemoveTeamNoteItemModal()}>
              <span>Xóa</span>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        {/*============================================================================================================================= */}

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
              userSelect: "none",
              zIndex: "3"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkRemoveTeamNoteItemIsOpen}
          onRequestClose={this.closeCheckRemoveTeamNoteItemModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn có chắc chắn muốn xóa Ghi chú này của nhóm với tư cách là Quản
              trị viên không???{" "}
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckRemoveTeamNoteItemModal()}
          >
            Ấn nhầm!!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToRemoveTeamNoteFromNonOutDateList()}
          >
            Chắc chắn!!!
          </button>
        </Modal>
      </div>
    );
  }
}
