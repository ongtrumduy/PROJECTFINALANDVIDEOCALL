import React from "react";
import Draggable from "react-draggable";

export default class TeamFiles extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Draggable bounds="body">
        <div>
          <p>Đây là giao diện các files trong nhóm</p>
        </div>
      </Draggable>
    );
  }
}
