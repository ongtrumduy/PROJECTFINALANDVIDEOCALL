import React from "react";

import de110 from "../../../../Main/Image-Icons/de110.PNG";
export default class ExcercisesPrivateDetailItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { checkOwnedExcerciseItem: false };
  }

  changeCheckOwnedExcerciseItem = () => {
    if (this.state.checkOwnedExcerciseItem) {
      this.setState({
        checkOwnedExcerciseItem: false
      });
    } else {
      this.setState({
        checkOwnedExcerciseItem: true
      });
    }
  };

  render() {
    return (
      <div className="user-excercises_all-list__private-list___private-item">
        <div
          className="user-excercises_all-list__private-list___private-item_____backtoprivatelist"
          onClick={() =>
            this.props.updateRenderExcercisePrivateControl("privatelist")
          }
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Quay lại</span>
          </div>
        </div>
        <div className="user-excercises_all-list__private-list___private-item_____excercise-logo-and-content">
          <div className="user-excercises_all-list__private-list___private-item_____excercise-logo">
            <img src={de110} />
            <p>Mô tả: fkasjfakakakakakakakak</p>
          </div>
          <div className="user-excercises_all-list__private-list___private-item_____excercise-content">
            <div>
              <p>Tên Bộ đề - Bài tập &nbsp;&nbsp; : Kiến quốc vĩ nghiệp</p>
              <p>Số lượng câu hỏi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : 20</p>
              <p>Loại Bộ đề - Bài tập &nbsp; : Công khai</p>
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
                  <div className="user-excercises_all-list__private-list___private-item____button-choose">
                    <div>
                      <i className="material-icons">{"done"}</i>
                    </div>
                    <div>
                      <span> Đã sở hữu</span>
                    </div>
                  </div>
                )) || (
                  <div className="user-excercises_all-list__private-list___private-item____button-choose">
                    <div>
                      <i className="material-icons">{"add"}</i>
                    </div>
                    <div>
                      <span> Thêm Bộ đề - Bài tập</span>
                    </div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
