import React from "react";
import axios from "axios";

export default class TeamNotesCreateNewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamNoteName: "",
      TeamNoteDescription: "",
      TeamNoteEndDate: "",
      CheckWithExcercise: false,
      CheckTrueExcerciseWithNote: false,
      CheckChooseExcicseWithNote: false,
      ExcerciseTeamNoteID: "",
      ExcerciseTeamNoteName: "",
      ExcerciseTeamNoteLogo: null,
      ExcerciseTeamNoteNumberQuestion: "",
      ExcerciseChooseTeamNoteID: ""
    };
  }

  handleValueCreateNewTeamNote = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (event.target.name === "ExcerciseTeamNoteID") {
      let excerciseTeamNoteID = event.target.value;
      if (excerciseTeamNoteID.length >= 30) {
        if (this.textExcerciseIdRef.current) {
          clearTimeout(this.textExcerciseIdRef.current);
        }

        this.textExcerciseIdRef.current = setTimeout(() => {
          this.sendToFindTrueExcerciseInforToTeamNote(excerciseTeamNoteID);
        }, 800);
      }
    }
  };

  handleValueCheckWithExcercise = event => {
    if (!this.state.CheckWithExcercise) {
      this.setState({
        [event.target.name]: event.target.value,
        CheckWithExcercise: true,
        checkValidate: ""
      });
    } else {
      this.setState({
        [event.target.name]: "none-with-excercise",
        CheckWithExcercise: false,
        CheckTrueExcerciseWithNote: false,
        CheckChooseExcicseWithNote: false,
        ExcerciseTeamNoteID: "",
        checkValidate: ""
      });
    }
  };

  sendToFindTrueExcerciseInforToTeamNote = excerciseTeamNoteID => {
    axios
      .post("./getexcerciseinfortocreateteamnote", {
        ExcerciseTeamNoteID: excerciseTeamNoteID
      })
      .then(res => {
        console.log("data gửi về đây ", res.data);

        if (res.data.returnExcerciseInfor === "exist-excercise") {
          this.setState({
            ExcerciseTeamNoteName: res.data.ExcerciseName,
            ExcerciseTeamNoteLogo: res.data.ExcerciseLogo,
            ExcerciseTeamNoteNumberQuestion: res.data.ExcerciseNumberQuestion,
            CheckTrueExcerciseWithNote: true,
            checkValidate: ""
          });
        } else if (res.data.returnExcerciseInfor === "non-exist-excercise") {
          this.setState({
            ExcerciseTeamNoteName: "",
            ExcerciseTeamNoteLogo: "",
            ExcerciseTeamNoteNumberQuestion: "",
            CheckTrueExcerciseWithNote: false,
            CheckChooseExcicseWithNote: false,
            checkValidate: "non-exist-excercise"
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendToCreateNewTeamNote = () => {
    if (
      this.state.TeamNoteType === "with-excercise" &&
      this.state.CheckChooseExcicseWithNote === false
    ) {
      this.setState({
        checkValidate: "add-choose-excercise"
      });
    } else {
      axios
        .post("/createnewteamnotecontent", {
          TeamNoteName: this.state.TeamNoteName,
          TeamNoteDescription: this.state.TeamNoteDescription,
          TeamNoteEndDate: this.state.TeamNoteEndDate,
          TeamNoteType: this.state.TeamNoteType,
          TeamID: this.props.TeamID,
          ExcerciseTeamNoteID: this.state.ExcerciseChooseTeamNoteID
        })
        .then(res => {
          console.log("Đổ dữ liệu để tạo", res.data);
          this.setState({
            checkValidate: res.data.checkValidate
          });
          if (res.data.checkValidate === "success-create-note") {
            this.props.socket.emit("receive-to-update-new-team-note-content", {
              TeamID: this.props.TeamID
            });

            setTimeout(() => {
              this.props.closeCheckCreateNewNoteModal();
            }, 1000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  handleCreateNewTeamNote = event => {
    this.sendToCreateNewTeamNote();

    event.preventDefault();
  };

  checkValidateCreateNewTeamNote = type => {
    switch (type) {
      case "success-create-note":
        return <span>Ghi chú của bạn đã được tạo thành công !!!</span>;
      case "non-pass-end-date":
        return <small>Ngày hết hạn của bạn không hợp lệ </small>;
      case "note-end-date":
        return <small>Ngày hết hạn không được để trống </small>;
      case "team-note-name":
        return <small>Tên ghi chú không được để trống </small>;
      case "add-choose-excercise":
        return <small>Bạn chưa thêm Bộ đề lựa chọn !!!!!</small>;
      case "non-exist-excercise":
        return <small>Không có bộ đề nào trùng khớp !!!!!</small>;
      case "exist-excercise-name":
        return <small>Tên của Ghi chú này đã tồn tại rồi !!!!!</small>;
      default:
    }
  };

  renderValidateNotify = type => {
    if (this.state.checkValidate === type) {
      return <div>{this.checkValidateCreateNewTeamNote(type)}</div>;
    }
  };

  addChooseExcerciseToTeamNote = () => {
    this.setState({
      CheckChooseExcicseWithNote: true,
      ExcerciseChooseTeamNoteID: this.state.ExcerciseTeamNoteID
    });
  };

  removeChooseExcerciseToTeamNote = () => {
    this.setState({
      CheckChooseExcicseWithNote: false,
      ExcerciseChooseTeamNoteID: ""
    });
  };

  createNewTeamNoteForm = () => {
    return (
      <div className="user-team_team-menu-and-content__content___notes____create-new">
        <form onSubmit={event => this.handleCreateNewTeamNote(event)}>
          <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form">
            <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______form">
              <div>
                <p>Tên ghi chú - công việc</p>
                <input
                  type="text"
                  name="TeamNoteName"
                  maxLength="120"
                  onChange={event => this.handleValueCreateNewTeamNote(event)}
                  placeholder="Nhập tên ghi chú..."
                />
                <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______response-create-note_______validate">
                  {this.renderValidateNotify("team-note-name")}
                </div>

                <p>Mô tả nội dung </p>
                <input
                  type="text"
                  name="TeamNoteDescription"
                  maxLength="200"
                  onChange={event => this.handleValueCreateNewTeamNote(event)}
                  placeholder="Nhập mô tả..."
                />

                <p>Ngày hết hạn </p>
                <input
                  type="date"
                  name="TeamNoteEndDate"
                  onChange={event => this.handleValueCreateNewTeamNote(event)}
                  value={this.state.ReminderEndDate}
                />
              </div>
              <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______response-create-note_______validate">
                {this.renderValidateNotify("note-end-date")}
                {this.renderValidateNotify("non-pass-end-date")}
              </div>

              <div>
                <input
                  style={{ cursor: "pointer" }}
                  type="checkbox"
                  name="TeamNoteType"
                  value="with-excercise"
                  onChange={event => this.handleValueCheckWithExcercise(event)}
                />
                <span style={{ fontWeight: "bold" }}>Kèm Bộ đề - Bài tập</span>
              </div>
              <div
                style={
                  this.state.TeamNoteType === "with-excercise"
                    ? { display: "inline" }
                    : { display: "none" }
                }
                className="user-team_team-menu-and-content__content___notes____create-new_____create-form______input-ID"
              >
                <input
                  type="text"
                  name="ExcerciseTeamNoteID"
                  placeholder="Nhập ID của Bộ đề - Bài tập"
                  ref={ref => {
                    this.textExcerciseIdRef = ref;
                  }}
                  maxLength="50"
                  value={this.state.ExcerciseTeamNoteID}
                  onChange={event => this.handleValueCreateNewTeamNote(event)}
                />
              </div>
              <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______response-create-note_______validate">
                {this.renderValidateNotify("non-exist-excercise")}
              </div>

              <div
                style={
                  this.state.CheckTrueExcerciseWithNote
                    ? { display: "flex" }
                    : { display: "none" }
                }
                className="user-team_team-menu-and-content__content___notes____create-new_____create-form______excercise-content"
              >
                <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______excercise-content_______content">
                  <div>
                    <img
                      src={this.state.ExcerciseTeamNoteLogo}
                      alt="excercise-logo"
                    />
                  </div>
                  <div>
                    <span>{this.state.ExcerciseTeamNoteName}</span>
                  </div>
                  <div>
                    <span>{this.state.ExcerciseTeamNoteNumberQuestion}</span>
                  </div>
                </div>
                <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______excercise-content_______add-and-remove-button">
                  {this.state.CheckChooseExcicseWithNote ? (
                    <i
                      onClick={() => this.removeChooseExcerciseToTeamNote()}
                      className="material-icons"
                    >
                      {"check"}
                    </i>
                  ) : (
                    <i
                      onClick={() => this.addChooseExcerciseToTeamNote()}
                      className="material-icons"
                    >
                      {"add"}
                    </i>
                  )}
                </div>
              </div>
            </div>
            <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______response-create-note_______validate">
              {this.renderValidateNotify("add-choose-excercise")}
            </div>
            <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______response-create-note">
              {this.renderValidateNotify("success-create-note")}
              {this.renderValidateNotify("exist-excercise-name")}
            </div>
            <div className="user-team_team-menu-and-content__content___notes____create-new_____create-form______submit-create-note">
              <input type="submit" value="Tạo Ghi chú" />
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return <div>{this.createNewTeamNoteForm()}</div>;
  }
}
