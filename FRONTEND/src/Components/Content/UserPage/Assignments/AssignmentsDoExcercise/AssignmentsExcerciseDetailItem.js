import React from "react";
import axios from "axios";

import Modal from "react-modal";

// import de110 from "../../../../Main/Image-Icons/de110.PNG";
export default class AssignmentsExcerciseDetailItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkPublicExcerciseItem: true,
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
      .post("/getexcercisepublicdetailitem", {
        ExcerciseID: this.props.ExcerciseID,
        MemberID: this.props.MemberID
      })
      .then(res => {
        if (res.data.CheckExcerciseItemInOwned) {
          this.setState({
            ExcerciseName: res.data.ExcerciseInfor.ExcerciseName,
            ExcerciseDescription: res.data.ExcerciseInfor.ExcerciseDescription,
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
            ExcerciseDescription: res.data.ExcerciseInfor.ExcerciseDescription,
            ExcerciseLogo: res.data.ExcerciseInfor.ExcerciseLogo,
            ExcerciseType: res.data.ExcerciseInfor.ExcerciseType,
            ExcerciseNumberQuestion:
              res.data.ExcerciseInfor.ExcerciseNumberQuestion,
            ExcerciseID: res.data.ExcerciseInfor.ExcerciseID,
            checkPublicExcerciseItem: false
          });
        }
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

  sendToBeginStartDoExcercise = () => {
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
          B???n c???n ch???n th???i gian l??m B??? ????? - B??i t???p trong bao l??u ???? !!!
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
            <span>Quay l???i</span>
          </div>
        </div>
        <div className="user-excercises_all-list__owned-list___owned-item_____excercise-logo-and-content">
          <div className="user-excercises_all-list__owned-list___owned-item_____excercise-logo">
            <img src={this.state.ExcerciseLogo} alt="excercise-logo" />
            <p>M??: {this.state.ExcerciseID}</p>
          </div>
          <div className="user-excercises_all-list__owned-list___owned-item_____excercise-content">
            <div>
              <p>
                <span> T??n B??? ????? - B??i t???p &nbsp;&nbsp;&nbsp;:</span>{" "}
                {this.state.ExcerciseName}
              </p>
              <p>
                <span>
                  M?? t???
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  :{" "}
                </span>
                {this.state.ExcerciseDescription}
              </p>
              <p>
                <span>
                  {" "}
                  S??? l?????ng c??u h???i &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :{" "}
                </span>

                {this.state.ExcerciseNumberQuestion}
              </p>
              <p>
                <span> Lo???i B??? ????? - B??i t???p &nbsp;&nbsp; : </span>

                {this.state.ExcerciseType === "public"
                  ? "C??ng khai"
                  : "Ri??ng tu"}
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
                      <span> ???? s??? h???u</span>
                    </div>
                  </div>
                )) || (
                  <div className="user-excercises_all-list__public-list___public-item____button-choose">
                    <div>
                      <i className="material-icons">{"add"}</i>
                    </div>
                    <div>
                      <span> Th??m B??? ????? - B??i t???p</span>
                    </div>
                  </div>
                )}
              </button>

              <button
                style={
                  this.state.checkPublicExcerciseItem
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
                    <span>&nbsp;L??m B??i t???p - B??? ?????</span>
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
                    <span> Xem x???p h???ng</span>
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
            <p style={{ fontWeight: "bold", color: "red" }}>TH??NG B??O</p>
            <p style={{ fontWeight: "bold" }}>
              B???n ???? th??m th??nh c??ng B??? ????? - B??i t???p n??y v??o danh s??ch s??? h???u!!!
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
            <p style={{ fontWeight: "bold", color: "red" }}>TH??NG B??O</p>
            <p style={{ fontWeight: "bold" }}>
              Khi nh???n b???t ?????u l??m b??i b???n s??? chuy???n sang giao di???n l??m b??i v??
              b???t ?????u l??m c??c c??u h???i c?? trong B??? ????? - B??i t???p. B???n ???? s???n s??ng
              ???
            </p>
            <select
              style={{ cursor: "pointer", outline: "none" }}
              value={this.state.TimeToDoExcercise}
              onChange={event => this.hanldeValueTimeToDoExcercise(event)}
            >
              <option value="0">Ch???n th???i gian l??m b??i</option>
              <option value="1">1 ph??t</option>
              <option value="15">15 ph??t</option>
              <option value="30">30 ph??t</option>
              <option value="45">45 ph??t</option>
              <option value="60">60 ph??t</option>
            </select>
          </div>
          <div>{this.validateTimeToConfirmDoExcercise()}</div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeConfirmDoExcercisesChoiceModal()}
          >
            Suy ngh?? l???i!!!
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToBeginStartDoExcercise()}
          >
            B???t ?????u l??m b??i!!!
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
            <p style={{ fontWeight: "bold", color: "red" }}>TH??NG B??O</p>
            <p style={{ fontWeight: "bold" }}>
              B???n ???? x??a th??nh c??ng B??? ????? - B??i t???p n??y t??? danh s??ch s??? h???u!!!
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
