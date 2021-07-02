import React from "react";

export default class ExcercisesPrivateListContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <p style={{ fontWeight: "bold" }}>
          Bạn cần nhập đúng mã của Bộ đề - Bài tập riêng tư này ở chỗ tìm kiếm
          để có thể xem !!!!
        </p>
      </div>
    );
  }
}
