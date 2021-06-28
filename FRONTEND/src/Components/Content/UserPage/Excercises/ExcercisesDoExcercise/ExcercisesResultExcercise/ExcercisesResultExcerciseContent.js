import React from "react";

export default class ExcercisesResultExcerciseContent extends React.Component {
  render() {
    return (
      <div className="user-excercises_do-excercise__result-excercise">
        <div className="user-excercises_do-excercise__result-excercise___title">
          <p>Kết quả làm Bộ đề - Bài tập</p>
        </div>
        <div className="user-excercises_do-excercise__result-excercise___content">
          <p>
            Tên Bộ đề - Bài tập
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            {this.props.ExcerciseName}
          </p>
          <p>
            Loại Bộ đề - Bài tập
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            {this.props.ExcerciseType === "public" ? "Công khai" : "Riêng tư"}
          </p>
          <p>
            Số lượng câu hỏi của Bộ đề - Bài tập :&nbsp;
            {this.props.ExcerciseNumberQuestion} câu
          </p>
          <p>
            Số câu trả lời đúng
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            {this.props.ExcerciseMemberDidResult} câu/&nbsp;
            {this.props.ExcerciseNumberQuestion} câu
          </p>
          <p>
            Thời gian làm bài
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
            {this.props.TimeToDoExcercise} phút
          </p>
        </div>
        <div className="user-excercises_do-excercise__result-excercise___button-choose">
          <input
            type="button"
            value="Quay trở lại danh sách Bài tập - Bộ đề"
            onClick={() =>
              this.props.updateRenderExcerciseControl("excerciseall")
            }
          />
          <input
            type="button"
            value="Xem lại phần làm Bài tập - Bộ đề này"
            onClick={() =>
              this.props.updateRenderExcerciseDoExcerciseControl(
                "excerciseresultdidexcercise"
              )
            }
          />
        </div>
      </div>
    );
  }
}
