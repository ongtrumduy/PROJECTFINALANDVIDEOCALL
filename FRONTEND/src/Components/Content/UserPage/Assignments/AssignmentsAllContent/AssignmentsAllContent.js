import React from "react";
import axios from "axios";
import Modal from "react-modal";

import AssignmentsAllUnfinishedList from "../AssignmentUnOrFinished/AssignmentsAllUnfinishedList";
import AssignmentsAllFinishedList from "../AssignmentUnOrFinished/AssignmentsAllFinishedList";

export default class AssignmentsAllContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkRenderUnfinished: false,
      checkRenderFinished: false,
      AssignmentChoiceID: "",
      checkTurnInAssignmentSuccessIsOpen: false,
      checkNonDidExcericseOfAssignmentIsOpen: false,
      checkHaveZeroScoreOfAssignmentIsOpen: false,
      checkHaveNonChoiceAssignmentToTurnInIsOpen: false
    };
  }

  openCheckTurnInAssignmentSuccessModal = () => {
    this.setState({
      checkTurnInAssignmentSuccessIsOpen: true
    });
  };

  closeCheckTurnInAssignmentSuccessModal = () => {
    this.setState({
      checkTurnInAssignmentSuccessIsOpen: false
    });
  };

  openCheckNonDidExcericseOfAssignmentModal = () => {
    this.setState({
      checkNonDidExcericseOfAssignmentIsOpen: true
    });
  };

  closeCheckNonDidExcericseOfAssignmentModal = () => {
    this.setState({
      checkNonDidExcericseOfAssignmentIsOpen: false
    });
  };

  openCheckHaveZeroScoreOfAssignmentModal = () => {
    this.setState({
      checkHaveZeroScoreOfAssignmentIsOpen: true
    });
  };

  closeCheckHaveZeroScoreOfAssignmentModal = () => {
    this.setState({
      checkHaveZeroScoreOfAssignmentIsOpen: false
    });
  };

  openCheckHaveNonChoiceAssignmentToTurnInModal = () => {
    this.setState({
      checkHaveNonChoiceAssignmentToTurnInIsOpen: true
    });
  };

  closeCheckHaveNonChoiceAssignmentToTurnInModal = () => {
    this.setState({
      checkHaveNonChoiceAssignmentToTurnInIsOpen: false
    });
  };

  setChangeRenderUnfinishedExcerciseContent = () => {
    if (this.state.checkRenderUnfinished) {
      this.setState({
        checkRenderUnfinished: false
      });
    } else {
      this.setState({
        checkRenderUnfinished: true
      });
    }
  };

  setChangeRenderFinishedExcerciseContent = () => {
    if (this.state.checkRenderFinished) {
      this.setState({
        checkRenderFinished: false
      });
    } else {
      this.setState({
        checkRenderFinished: true
      });
    }
  };

  setChooseAssignmentToTurnIn = assigmentChoiceID => {
    this.setState({
      AssignmentChoiceID: assigmentChoiceID
    });
  };

  sendToTurnInAssginment = () => {
    if (this.state.AssignmentChoiceID === "") {
      this.openCheckHaveNonChoiceAssignmentToTurnInModal();
    } else {
      axios
        .post("./sendtoturninassginmentofmember", {
          AssignmentID: this.state.AssignmentChoiceID,
          MemberID: this.props.MemberID
        })
        .then(res => {
          // console.log("về đây đi em ", res.data);
          if (res.data.checkResTurnIn === "turn-in-success") {
            this.props.socket.emit(
              "receive-to-update-assignment-unfinished-list",
              {
                MemberID: this.props.MemberID
              }
            );
            this.props.socket.emit(
              "receive-to-update-assignment-finished-list",
              {
                MemberID: this.props.MemberID
              }
            );
            this.openCheckTurnInAssignmentSuccessModal();
          } else if (res.data.checkResTurnIn === "non-did-excercise") {
            this.openCheckNonDidExcericseOfAssignmentModal();
          } else if (res.data.checkResTurnIn === "have-zero-score") {
            this.openCheckHaveZeroScoreOfAssignmentModal();
          }
        });
    }
  };

  sendToFinishAssignmentWithZeroScore = () => {
    axios
      .post("./sendtoturninassginmentofmemberwithzeroscore", {
        AssignmentID: this.state.AssignmentChoiceID,
        MemberID: this.props.MemberID
      })
      .then(res => {
        // console.log("về đây đi em ", res.data);
        if (res.data.checkResTurnIn === "turn-in-success") {
          this.props.socket.on("receive-to-update-assignment-unfinished-list", {
            MemberID: this.props.MemberID
          });
          this.props.socket.on("receive-to-update-assignment-finished-list", {
            MemberID: this.props.MemberID
          });
          this.closeCheckHaveZeroScoreOfAssignmentModal();
          this.openCheckTurnInAssignmentSuccessModal();
        }
      });
  };

  render() {
    return (
      <div className="user-assignments_all__list">
        <div className="user-assignments_all__list___title-and-turnin">
          <div className="user-assignments_all__list___title-and-turnin____title">
            <p>Bài tập-Bộ đề được giao</p>
          </div>
          <div className="user-assignments_all__list___title-and-turnin____turnin">
            <button onClick={() => this.sendToTurnInAssginment()}>
              Nộp bài
            </button>
          </div>
        </div>
        <div className="user-assignments_all__list___content">
          <div className="user-assignments_all__list___content_____unfinished">
            <div className="user-assignments_all__list___content____unfinished_____show-content-button">
              <div>
                <i className="material-icons">
                  {this.state.checkRenderUnfinished
                    ? "expand_more"
                    : "chevron_right"}
                </i>
              </div>
              <div
                onClick={() => this.setChangeRenderUnfinishedExcerciseContent()}
              >
                <p>Chưa hoàn thành</p>
              </div>
            </div>

            {this.state.checkRenderUnfinished ? (
              <AssignmentsAllUnfinishedList
                MemberID={this.props.MemberID}
                socket={this.props.socket}
                updateRenderAssignmentsControl={
                  this.props.updateRenderAssignmentsControl
                }
                setChooseAssignmentAndExcerciseToDoExcericse={
                  this.props.setChooseAssignmentAndExcerciseToDoExcericse
                }
                setChooseAssignmentToTurnIn={this.setChooseAssignmentToTurnIn}
                AssignmentChoiceID={this.state.AssignmentChoiceID}
              />
            ) : (
              <div></div>
            )}
          </div>

          <div className="user-assignments_all__list___content_____finished">
            <div className="user-assignments_all__list___content____finished_____show-content-button">
              <div>
                <i className="material-icons">
                  {this.state.checkRenderFinished
                    ? "expand_more"
                    : "chevron_right"}
                </i>
              </div>
              <div
                onClick={() => this.setChangeRenderFinishedExcerciseContent()}
              >
                <p>Đã hoàn thành</p>
              </div>
            </div>

            {this.state.checkRenderFinished ? (
              <AssignmentsAllFinishedList
                MemberID={this.props.MemberID}
                socket={this.props.socket}
                updateRenderAssignmentsControl={
                  this.props.updateRenderAssignmentsControl
                }
                setChooseAssignmentAndExcerciseToDoExcericse={
                  this.props.setChooseAssignmentAndExcerciseToDoExcericse
                }
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>

        {/*============================================================================================================================= */}

        <Modal
          style={{
            overlay: { position: "fixed", zIndex: "1000" },
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
          isOpen={this.state.checkNonDidExcericseOfAssignmentIsOpen}
          onRequestClose={this.closeCheckNonDidExcericseOfAssignmentModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chưa từng làm Bài tập-Bộ đề này !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckNonDidExcericseOfAssignmentModal()}
          >
            ĐÃ rõ
          </button>
        </Modal>

        {/*============================================================================================================================= */}

        <Modal
          style={{
            overlay: { position: "fixed", zIndex: "1000" },
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
          isOpen={this.state.checkTurnInAssignmentSuccessIsOpen}
          onRequestClose={this.closeCheckTurnInAssignmentSuccessModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>Bạn đã nộp bài thành công !!!</p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckTurnInAssignmentSuccessModal()}
          >
            OKiii
          </button>
        </Modal>

        {/*============================================================================================================================= */}

        <Modal
          style={{
            overlay: { position: "fixed", zIndex: "1000" },
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
          isOpen={this.state.checkHaveNonChoiceAssignmentToTurnInIsOpen}
          onRequestClose={this.closeCheckHaveNonChoiceAssignmentToTurnInModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chưa chọn Bài tập nào để nộp cả !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() =>
              this.closeCheckHaveNonChoiceAssignmentToTurnInModal()
            }
          >
            OKiii
          </button>
        </Modal>

        {/*============================================================================================================================= */}

        <Modal
          style={{
            overlay: { position: "fixed", zIndex: "1000" },
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
          isOpen={this.state.checkHaveZeroScoreOfAssignmentIsOpen}
          onRequestClose={this.closeCheckHaveZeroScoreOfAssignmentModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chưa làm đúng câu nào trong Bài tập-Bộ đề này, bạn có muốn làm
              lại không hay nộp luôn????{" "}
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckHaveZeroScoreOfAssignmentModal()}
          >
            Để làm lại
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.sendToFinishAssignmentWithZeroScore()}
          >
            Vẫn cứ nộp
          </button>
        </Modal>
      </div>
    );
  }
}
