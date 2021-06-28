import React from "react";

import Modal from "react-modal";
import axios from "axios";

export default class ExcercisesOwnedDetailItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkOwnedExcerciseItem: true,
      checkConfirmDoExcercisesChoiceIsOpen: false,
      checkAddSuccessExcerciseItemIsOpen: false,
      checkRemoveSuccesExcerciseItemIsOpen: false,
      checkTimeToDoExcercise: false,
      TimeToDoExcercise: "0",
      ExcerciseName: "",
      ExcerciseDescription: "",
      ExcerciseLogo: "",
      ExcerciseType: "",
      ExcerciseNumberQuestion: "",
      ExcerciseID: ""
    };
  }

  componentDidMount = () => {
    axios
      .post("/getexcerciseownedetailitem", {
        ExcerciseID: this.props.ExcerciseID,
        MemberID: this.props.MemberID
      })
      .then(res => {
        this.setState({
          ExcerciseName: res.data.ExcerciseInfor.ExcerciseName,
          ExcerciseDescription: res.data.ExcerciseInfor.ExcerciseDescription,
          ExcerciseLogo: res.data.ExcerciseInfor.ExcerciseLogo,
          ExcerciseType: res.data.ExcerciseInfor.ExcerciseType,
          ExcerciseNumberQuestion:
            res.data.ExcerciseInfor.ExcerciseNumberQuestion,
          ExcerciseID: res.data.ExcerciseInfor.ExcerciseID
        });
      })
      .catch(error => console.log(error));

    this.mounted = true;

    this.props.socket.on("update-status-excercise-item", data => {
      if (this.mounted) {
        if (data.checkValidate === "add-success") {
          this.setState({
            checkOwnedExcerciseItem: true
          });
        } else if (data.checkValidate === "remove-success") {
          this.setState({
            checkOwnedExcerciseItem: false
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.mounted = false;
  };

  openConfirmDoExcercisesChoiceModal = () => {
    this.setState({
      checkConfirmDoExcercisesChoiceIsOpen: true
    });
  };

  closeConfirmDoExcercisesChoiceModal = () => {
    this.setState({
      checkConfirmDoExcercisesChoiceIsOpen: false
    });
  };

  openCheckAddSuccessExcerciseItemModal = () => {
    this.setState({
      checkAddSuccessExcerciseItemIsOpen: true
    });
  };

  closeCheckAddSuccessExcerciseItemModal = () => {
    this.setState({
      checkAddSuccessExcerciseItemIsOpen: false
    });
  };
  openCheckRemoveSuccessExcerciseItemModal = () => {
    this.setState({
      checkRemoveSuccessExcerciseItemIsOpen: true
    });
  };

  closeCheckRemoveSuccessExcerciseItemModal = () => {
    this.setState({
      checkRemoveSuccessExcerciseItemIsOpen: false
    });
  };

  changeCheckOwnedExcerciseItem = () => {
    if (this.state.checkOwnedExcerciseItem) {
      this.removeExcerciseItemToOwnedList();
    } else {
      this.addExcerciseItemToOwnedList();
    }
  };

  addExcerciseItemToOwnedList = () => {
    axios
      .post("/addexcerciseitemtoownedlist", {
        ExcerciseID: this.state.ExcerciseID,
        MemberID: this.props.MemberID,
        ExcerciseType: this.state.ExcerciseType
      })
      .then(res => {
        // console.log(res.data);
        if (res.data.checkValidate === "add-success") {
          this.setState({
            checkOwnedExcerciseItem: true
          });
          this.openCheckAddSuccessExcerciseItemModal();
        }
      })
      .catch(error => console.log(error));

    this.props.socket.emit("add-new-excercise-item", {
      ExcerciseID: this.state.ExcerciseID,
      MemberID: this.props.MemberID,
      ExcerciseType: this.state.ExcerciseType
    });
  };

  removeExcerciseItemToOwnedList = () => {
    axios
      .post("/removeexcerciseitemtoownedlist", {
        ExcerciseID: this.state.ExcerciseID,
        MemberID: this.props.MemberID,
        ExcerciseType: this.state.ExcerciseType
      })
      .then(res => {
        // console.log(res.data);
        if (res.data.checkValidate === "remove-success") {
          this.setState({
            checkOwnedExcerciseItem: false
          });
          this.openCheckRemoveSuccessExcerciseItemModal();
        }
      })
      .catch(error => console.log(error));

    this.props.socket.emit("remove-owned-excercise-item", {
      ExcerciseID: this.state.ExcerciseID,
      MemberID: this.props.MemberID,
      ExcerciseType: this.state.ExcerciseType
    });
  };

  hanldeValueTimeToDoExcercise = event => {
    this.setState({
      TimeToDoExcercise: event.target.value
    });
  };

  sentToBeginStartDoExcercise = () => {
    if (this.state.TimeToDoExcercise === "0") {
      this.setState({
        checkTimeToDoExcercise: true
      });
    } else {
      this.props.updateRenderExcerciseControl("excercisedoexcercise");
      this.props.getExcerciseOwnedIDMemberChoice(this.props.ExcerciseID);
      this.props.getExcerciseIDAndTimeMemberChoice(
        this.props.ExcerciseID,
        this.state.TimeToDoExcercise
      );
    }
  };

  seenExcerciseItemScoreBoard = () => {
    this.props.getExcerciseOwnedIDMemberChoice(this.props.ExcerciseID);
    this.props.updateRenderExcerciseOwnedControl("owneditemscoreboard");
  };

  validateTimeToConfirmDoExcercise = () => {
    if (this.state.checkTimeToDoExcercise) {
      return (
        <small style={{ color: "red" }}>
          Bạn cần chọn thời gian làm Bộ đề - Bài tập trong bao lâu đã !!!
        </small>
      );
    }
  };

  renderExcerciseOWnedDetailItemContent = () => {
    return (
      <div>
        <div
          className="user-excercises_all-list__owned-list___owned-item_____backtoownedlist"
          onClick={() =>
            this.props.updateRenderExcerciseOwnedControl("ownedlist")
          }
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Quay lại</span>
          </div>
        </div>
        <div className="user-excercises_all-list__owned-list___owned-item_____excercise-logo-and-content">
          <div className="user-excercises_all-list__owned-list___owned-item_____excercise-logo">
            <img src={this.state.ExcerciseLogo} alt="excercise-logo" />
            <p>Mã: {this.state.ExcerciseID}</p>
          </div>
          <div className="user-excercises_all-list__owned-list___owned-item_____excercise-content">
            <div>
              <p>
                <span> Tên Bộ đề - Bài tập &nbsp;&nbsp;&nbsp;:</span>{" "}
                {this.state.ExcerciseName}
              </p>
              <p>
                <span>
                  Mô tả
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  :{" "}
                </span>
                {this.state.ExcerciseDescription}
              </p>
              <p>
                <span>
                  {" "}
                  Số lượng câu hỏi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :{" "}
                </span>

                {this.state.ExcerciseNumberQuestion}
              </p>
              <p>
                <span> Loại Bộ đề - Bài tập &nbsp;&nbsp; : </span>

                {this.state.ExcerciseType === "public"
                  ? "Công khai"
                  : "Riêng tu"}
              </p>
            </div>
            <div>
              <button
                style={
                  this.state.checkOwnedExcerciseItem
                    ? { backgroundColor: "chocolate" }
                    : { backgroundColor: "white" }
                }
                onClick={() => this.changeCheckOwnedExcerciseItem()}
              >
                {(this.state.checkOwnedExcerciseItem && (
                  <div className="user-excercises_all-list__owned-list___owned-item____button-choose">
                    <div>
                      <i className="material-icons">{"done"}</i>
                    </div>
                    <div>
                      <span> Đã sở hữu</span>
                    </div>
                  </div>
                )) || (
                  <div className="user-excercises_all-list__owned-list___owned-item____button-choose">
                    <div>
                      <i className="material-icons">{"add"}</i>
                    </div>
                    <div>
                      <span> Thêm Bộ đề - Bài tập</span>
                    </div>
                  </div>
                )}
              </button>
              <button
                style={
                  this.state.checkOwnedExcerciseItem
                    ? {
                        backgroundColor: "white",
                        margin: "0 0 0 60px"
                      }
                    : { display: "none" }
                }
                onClick={() => this.openConfirmDoExcercisesChoiceModal()}
              >
                <div className="user-excercises_all-list__owned-list___owned-item____button-choose">
                  <div>
                    <i className="material-icons">{"border_color"}</i>
                  </div>
                  <div>
                    <span>&nbsp;Làm Bài tập - Bộ đề</span>
                  </div>
                </div>
              </button>
              <button
                style={{ margin: "0 0 0 40px" }}
                onClick={() => this.seenExcerciseItemScoreBoard()}
              >
                <div className="user-excercises_all-list__owned-list___owned-item____button-choose">
                  <div>
                    <i className="material-icons">{"assessment"}</i>
                  </div>
                  <div>
                    <span> Xem xếp hạng</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="user-excercises_all-list__owned-list___owned-item">
        {this.renderExcerciseOWnedDetailItemContent()}

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
          isOpen={this.state.checkAddSuccessExcerciseItemIsOpen}
          onRequestClose={this.closeCheckAddSuccessExcerciseItemModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn đã thêm thành công Bộ đề - Bài tập này vào danh sách sở hữu!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckAddSuccessExcerciseItemModal()}
          >
            <span>OKIII</span>
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
          isOpen={this.state.checkConfirmDoExcercisesChoiceIsOpen}
          onRequestClose={this.closeConfirmDoExcercisesChoiceModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Khi nhấn bắt đầu làm bài bạn sẽ chuyển sang giao diện làm bài và
              bắt đầu làm các câu hỏi có trong Bộ đề - Bài tập. Bạn đã sắn sàng
              ???
            </p>
            <select
              style={{ cursor: "pointer", outline: "none" }}
              value={this.state.TimeToDoExcercise}
              onChange={event => this.hanldeValueTimeToDoExcercise(event)}
            >
              <option value="0">Chọn thời gian làm bài</option>
              <option value="1">1 phút</option>
              <option value="15">15 phút</option>
              <option value="30">30 phút</option>
              <option value="45">45 phút</option>
              <option value="60">60 phút</option>
            </select>
          </div>
          <div>{this.validateTimeToConfirmDoExcercise()}</div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeConfirmDoExcercisesChoiceModal()}
          >
            Suy nghĩ lại!!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sentToBeginStartDoExcercise()}
          >
            Bắt đầu làm bài!!!
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
          isOpen={this.state.checkRemoveSuccessExcerciseItemIsOpen}
          onRequestClose={this.closeCheckRemoveSuccessExcerciseItemModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn đã xóa thành công Bộ đề - Bài tập này từ danh sách sở hữu!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckRemoveSuccessExcerciseItemModal()}
          >
            <span>OKIII</span>
          </button>
        </Modal>
      </div>
    );
  }
}
