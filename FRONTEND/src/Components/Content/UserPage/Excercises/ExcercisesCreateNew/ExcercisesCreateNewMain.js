import React from "react";
import axios from "axios";

import Modal from "react-modal";

import de111 from "../../../../Main/Image-Icons/de111.PNG";
import de222 from "../../../../Main/Image-Icons/de222.PNG";
import de333 from "../../../../Main/Image-Icons/de333.PNG";
import de444 from "../../../../Main/Image-Icons/de444.PNG";
import de555 from "../../../../Main/Image-Icons/de555.PNG";
import de666 from "../../../../Main/Image-Icons/de666.PNG";
import de777 from "../../../../Main/Image-Icons/de777.PNG";
import de888 from "../../../../Main/Image-Icons/de888.PNG";
import de999 from "../../../../Main/Image-Icons/de999.PNG";
import de110 from "../../../../Main/Image-Icons/de110.PNG";
import de120 from "../../../../Main/Image-Icons/de120.PNG";
import de130 from "../../../../Main/Image-Icons/de130.PNG";
import de140 from "../../../../Main/Image-Icons/de140.PNG";
import de150 from "../../../../Main/Image-Icons/de150.PNG";
import de160 from "../../../../Main/Image-Icons/de160.PNG";
import de170 from "../../../../Main/Image-Icons/de170.PNG";
import de180 from "../../../../Main/Image-Icons/de180.PNG";
import de190 from "../../../../Main/Image-Icons/de190.PNG";
import de211 from "../../../../Main/Image-Icons/de211.PNG";
import de212 from "../../../../Main/Image-Icons/de212.PNG";
import de213 from "../../../../Main/Image-Icons/de213.PNG";
import de214 from "../../../../Main/Image-Icons/de214.PNG";
import de215 from "../../../../Main/Image-Icons/de215.PNG";
import de216 from "../../../../Main/Image-Icons/de216.PNG";
import de217 from "../../../../Main/Image-Icons/de217.PNG";

export default class ExcercisesCreateNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setExcerciseLogoChoose: de111,
      ExcerciseName: "",
      ExcerciseDescription: "",
      ExcerciseNumberQuestion: "1",
      ExcerciseType: "public",
      ExcerciseID: "",
      modalHavedExcerciseNameIsOpen: false,
      modalNonExcerciseNameIsOpen: false,
      modalConfirmCreateIsOpen: false,
      modalTooMoreIsOpen: false
    };
  }

  openHavedExcerciseNameModal = () => {
    this.setState({
      modalHavedExcerciseNameIsOpen: true
    });
  };

  closeHavedExcerciseNameModal = () => {
    this.setState({
      modalHavedExcerciseNameIsOpen: false
    });
  };

  openValidateExcerciseNameModal = () => {
    this.setState({
      modalNonExcerciseNameIsOpen: true
    });
  };

  closeValidateExcerciseNameModal = () => {
    this.setState({
      modalNonExcerciseNameIsOpen: false
    });
  };

  openConfirmCreateModal = () => {
    this.setState({
      modalConfirmCreateIsOpen: true
    });
  };

  closeConfirmCreateModal = () => {
    this.setState({
      modalConfirmCreateIsOpen: false
    });
  };

  openTooMoreModal = () => {
    this.setState({
      modalTooMoreIsOpen: true
    });
  };

  closeTooMoreModal = () => {
    this.setState({
      modalTooMoreIsOpen: false
    });
  };

  handleChooseExcerciseLogo = event => {
    this.setState({
      setExcerciseLogoChoose: event.target.value
    });
  };

  handleValueCreateNewExcercise = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (
      this.state.ExcerciseNumberQuestion >= 10 &&
      !this.state.checkTooMoreQuestion
    ) {
      this.openTooMoreModal();
      this.setState({
        checkTooMoreQuestion: true
      });
    }
  };

  sendToCheckCreateNewExcercise = () => {
    axios
      .post("/checktocreatenewexcercise", {
        ExcerciseName: this.state.ExcerciseName
      })
      .then(res => {
        // console.log("Về cái res data xem ", res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-check-create-excercise") {
          this.setState({
            ExcerciseID: res.data.ExcerciseID
          });
          this.openConfirmCreateModal();
        } else if (res.data.checkValidate === "excercisename") {
          this.openValidateExcerciseNameModal();
        } else {
          this.openHavedExcerciseNameModal();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCreateNewExcercise = event => {
    this.sendToCheckCreateNewExcercise();

    event.preventDefault();
  };

  changeToCreateNewQAContent = () => {
    this.props.setExcerciseContentToCreateQAContent(
      this.state.ExcerciseName,
      this.state.ExcerciseDescription,
      this.state.ExcerciseNumberQuestion,
      this.state.ExcerciseType,
      this.state.setExcerciseLogoChoose
    );
    this.timeout = setTimeout(() => {
      this.props.updateRenderExcerciseCreateNewControl("createnewQAcontent");
    }, 800);
  };

  componentWillUnmount = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  };

  createNewExcerciseForm = () => {
    return (
      <div className="user-excercises_create-new__main">
        <div
          className="user-excercises_create-new__main___backtoexcerciseall"
          onClick={() =>
            this.props.updateRenderExcerciseControl("excerciseall")
          }
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Quay lại</span>
          </div>
        </div>
        <form onSubmit={event => this.handleCreateNewExcercise(event)}>
          <div className="user-excercises_create-new__main___excercise">
            <div className="user-excercises_create-new__main___excercise____form">
              <div>
                <p>Tên Bộ đề - Bài tập</p>
                <input
                  type="text"
                  name="ExcerciseName"
                  maxLength="120"
                  onChange={event => this.handleValueCreateNewExcercise(event)}
                  placeholder="Nhập tên nhóm..."
                />
                <p>Mô tả nội dung</p>
                <input
                  type="text"
                  name="ExcerciseDescription"
                  maxLength="120"
                  onChange={event => this.handleValueCreateNewExcercise(event)}
                  placeholder="Nhập mô tả..."
                />
                <p>
                  Số lượng câu hỏi: &nbsp;
                  <span>{this.state.ExcerciseNumberQuestion}</span>
                </p>
                <input
                  type="range"
                  min="1"
                  max="20"
                  name="ExcerciseNumberQuestion"
                  onChange={event => this.handleValueCreateNewExcercise(event)}
                  value={this.state.ExcerciseNumberQuestion}
                />
                <p>Chọn chế độ hiển thị Bộ đề</p>
                <div className="user-excercises_create__excercise___form____radio-button">
                  <div>
                    <input
                      type="radio"
                      name="ExcerciseType"
                      value="public"
                      defaultChecked
                      onChange={event =>
                        this.handleValueCreateNewExcercise(event)
                      }
                    />
                  </div>
                  <span>Công khai</span>

                  <div>
                    <input
                      type="radio"
                      name="ExcerciseType"
                      value="private"
                      onChange={event =>
                        this.handleValueCreateNewExcercise(event)
                      }
                    />
                  </div>
                  <span>Riêng tư</span>
                </div>

                <p>Chọn logo cho Bộ đề - Bài tập </p>
                <select
                  value={this.state.setExcerciseLogoChoose}
                  onChange={event => this.handleChooseExcerciseLogo(event)}
                >
                  <option value={de111}>Ảnh 1</option>
                  <option value={de222}>Ảnh 2</option>
                  <option value={de333}>Ảnh 3</option>
                  <option value={de444}>Ảnh 4</option>
                  <option value={de555}>Ảnh 5</option>
                  <option value={de666}>Ảnh 6</option>
                  <option value={de777}>Ảnh 7</option>
                  <option value={de888}>Ảnh 8</option>
                  <option value={de999}>Ảnh 9</option>
                  <option value={de110}>Ảnh 10</option>
                  <option value={de120}>Ảnh 11</option>
                  <option value={de130}>Ảnh 12</option>
                  <option value={de140}>Ảnh 13</option>
                  <option value={de150}>Ảnh 14</option>
                  <option value={de160}>Ảnh 15</option>
                  <option value={de170}>Ảnh 16</option>
                  <option value={de180}>Ảnh 17</option>
                  <option value={de190}>Ảnh 18</option>
                  <option value={de211}>Ảnh 19</option>
                  <option value={de212}>Ảnh 20</option>
                  <option value={de213}>Ảnh 21</option>
                  <option value={de214}>Ảnh 22</option>
                  <option value={de215}>Ảnh 23</option>
                  <option value={de216}>Ảnh 24</option>
                  <option value={de217}>Ảnh 25</option>
                </select>
              </div>

              <div className="user-excercises_create__excercise___form____create-button">
                <input type="submit" value="Xác nhận tạo" />
              </div>
            </div>

            <div className="user-excercises_create__excercise___excercise-logo">
              <div>
                <img
                  alt="excercise-excercise-logo"
                  src={this.state.setExcerciseLogoChoose}
                />
              </div>
              <div>
                <p>Ảnh logo của Bộ đề - Bài tập</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.createNewExcerciseForm()}
        {this.allModalWillRender()}
      </div>
    );
  }

  allModalWillRender = () => {
    return (
      <div>
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
          isOpen={this.state.modalTooMoreIsOpen}
          onRequestClose={this.closeTooMoreModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>CẢNH BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Số câu hỏi của Bài tập lựa chọn quá nhiều có thể khiến bạn mất
              nhiều thời gian cho quá trình tạo. Bạn nên cân nhắc khi lựa chọn.
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeTooMoreModal()}
          >
            Đã rõ !!!
          </button>
        </Modal>
        {/*================================================================================================== */}
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
          isOpen={this.state.modalConfirmCreateIsOpen}
          onRequestClose={this.closeConfirmCreateModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Sau khi Xác nhận bạn sẽ đến với quá trình tạo nội dung cho các Câu
              hỏi và Các đáp án của Bộ đề - Bài tập này. Ấn đồng ý để tiếp tục
              quá trình !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeConfirmCreateModal()}
          >
            Hủy bỏ
          </button>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.changeToCreateNewQAContent()}
          >
            Đồng ý
          </button>
        </Modal>
        {/*================================================================================================== */}
        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.modalNonExcerciseNameIsOpen}
          onRequestClose={this.closeValidateExcerciseNameModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chưa nhập tên của Bộ đề - Bài tập này. Đó là thông tin bắt
              buộc !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeValidateExcerciseNameModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>
        {/*================================================================================================== */}
        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.modalHavedExcerciseNameIsOpen}
          onRequestClose={this.closeHavedExcerciseNameModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>THÔNG BÁO</p>
            <p style={{ fontWeight: "bold" }}>
              Tên của Bộ đề - Bài tập này đã tồn tại. Vui lòng chọn một tên khác
              cho bộ đề
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeHavedExcerciseNameModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>
      </div>
    );
  };
}
