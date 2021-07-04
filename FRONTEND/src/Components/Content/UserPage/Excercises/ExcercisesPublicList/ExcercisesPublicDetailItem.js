import React from "react";

import Modal from "react-modal";
import axios from "axios";

export default class ExcercisesPublicDetailItem extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.axiosmounted = false;
    this.state = {
      checkPublicExcerciseItem: false,
      checkAddSuccessExcerciseItemIsOpen: false,
      checkRemoveSuccesExcerciseItemIsOpen: false,
      ExcerciseName: "",
      ExcerciseDescription: "",
      ExcerciseLogo: "",
      ExcerciseType: "",
      ExcerciseNumberQuestion: "",
      ExcerciseID: "",
      checkLoadingExcerciseDetailItem: false
    };
  }

  componentDidMount = () => {
    this.axiosmounted = true;

    axios
      .post("/getexcercisepublicdetailitem", {
        ExcerciseID: this.props.ExcerciseID,
        MemberID: this.props.MemberID
      })
      .then(res => {
        if (this.axiosmounted) {
          // console.log("lấy dữ liệu trả về", res.data);
          if (res.data.CheckExcerciseItemInOwned) {
            this.setState({
              ExcerciseName: res.data.ExcerciseInfor.ExcerciseName,
              ExcerciseDescription:
                res.data.ExcerciseInfor.ExcerciseDescription,
              ExcerciseLogo: res.data.ExcerciseInfor.ExcerciseLogo,
              ExcerciseType: res.data.ExcerciseInfor.ExcerciseType,
              ExcerciseNumberQuestion:
                res.data.ExcerciseInfor.ExcerciseNumberQuestion,
              ExcerciseID: res.data.ExcerciseInfor.ExcerciseID,
              checkPublicExcerciseItem: true
            });
          } else {
            this.setState({
              ExcerciseName: res.data.ExcerciseInfor.ExcerciseName,
              ExcerciseDescription:
                res.data.ExcerciseInfor.ExcerciseDescription,
              ExcerciseLogo: res.data.ExcerciseInfor.ExcerciseLogo,
              ExcerciseType: res.data.ExcerciseInfor.ExcerciseType,
              ExcerciseNumberQuestion:
                res.data.ExcerciseInfor.ExcerciseNumberQuestion,
              ExcerciseID: res.data.ExcerciseInfor.ExcerciseID,
              checkPublicExcerciseItem: false
            });
          }
        }
      })
      .catch(error => console.log(error));

    this.timeout = setTimeout(() => {
      this.setState({
        checkLoadingExcerciseDetailItem: true
      });
    }, 900);

    this.mounted = true;

    this.props.socket.on("update-status-excercise-item", data => {
      if (this.mounted) {
        if (data.checkValidate === "add-success") {
          this.setState({
            checkPublicExcerciseItem: true
          });
        } else if (data.checkValidate === "remove-success") {
          this.setState({
            checkPublicExcerciseItem: false
          });
        }
      }
    });
  };

  componentWillUnmount = () => {
    this.axiosmounted = false;
    this.mounted = false;
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
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

  changeCheckPublicExcerciseItem = () => {
    if (this.state.checkPublicExcerciseItem) {
      this.removeExcerciseItemToPublicList();
    } else {
      this.addExcerciseItemToPublicList();
    }
  };

  addExcerciseItemToPublicList = () => {
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
            checkPublicExcerciseItem: true
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

  removeExcerciseItemToPublicList = () => {
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
            checkPublicExcerciseItem: false
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

  seenExcerciseItemScoreBoard = () => {
    this.props.getExcercisePublicIDMemberChoice(this.props.ExcerciseID);
    this.props.updateRenderExcercisePublicControl("publicitemscoreboard");
  };

  renderExcercisePublicDetailItemContent = () => {
    return (
      <div>
        <div
          className="user-excercises_all-list__public-list___public-item_____backtopubliclist"
          onClick={() =>
            this.props.updateRenderExcercisePublicControl("publiclist")
          }
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Quay lại</span>
          </div>
        </div>
        <div className="user-excercises_all-list__public-list___public-item_____excercise-logo-and-content">
          <div className="user-excercises_all-list__public-list___public-item_____excercise-logo">
            <img src={this.state.ExcerciseLogo} alt="excercise-logo" />
            <p>
              <span>Mã: </span>
              {this.state.ExcerciseID}
            </p>{" "}
          </div>
          <div className="user-excercises_all-list__public-list___public-item_____excercise-content">
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
                  this.state.checkPublicExcerciseItem
                    ? { backgroundColor: "chocolate" }
                    : { backgroundColor: "white" }
                }
                onClick={() => this.changeCheckPublicExcerciseItem()}
              >
                {(this.state.checkPublicExcerciseItem && (
                  <div className="user-excercises_all-list__public-list___public-item____button-choose">
                    <div>
                      <i className="material-icons">{"done"}</i>
                    </div>
                    <div>
                      <span> Đã sở hữu</span>
                    </div>
                  </div>
                )) || (
                  <div className="user-excercises_all-list__public-list___public-item____button-choose">
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
                style={{ margin: "0 0 0 40px" }}
                onClick={() => this.seenExcerciseItemScoreBoard()}
              >
                <div className="user-excercises_all-list__public-list___public-item____button-choose">
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
      <div>
        {this.state.checkLoadingExcerciseDetailItem ? (
          <div className="user-excercises_all-list__public-list___public-item">
            {this.renderExcercisePublicDetailItemContent()}{" "}
          </div>
        ) : (
          <p style={{ color: "blue", fontWeight: "bold", userSelect: "none" }}>
            Đang lấy dữ liệu chi tiết của Bộ đề-Bài tập...
          </p>
        )}
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
