import React from "react";

import Modal from "react-modal";
import axios from "axios";

export default class ExcercisesPublicItemScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.axiosmounted = false;
    this.state = {
      CurrentExcerciseItemResultList: [],
      NumberScoreItemOnPage: "6",
      NumberIndexScoreItemOnPage: "5",
      CurrentIndexScoreItemPage: "1",
      CurrentIndexOfIndexScoreItemPage: "1",
      checkValidatePrevLeft: true,
      checkValidateNextRight: false,
      overIndexScoreItemIsOpen: false,
      AllNumberOfScoreItemOnPageList: [],
      checkLoadingExcerciseItemScoreBoard: false
    };
  }

  opencheckOverIndexScoreItemModal = () => {
    this.setState({
      overIndexScoreItemIsOpen: true
    });
  };

  closecheckOverIndexScoreItemModal = () => {
    this.setState({
      overIndexScoreItemIsOpen: false
    });
  };

  componentDidMount = () => {
    this.axiosmounted = true;

    axios
      .post("/getexcericseitemscoreboard", {
        ExcerciseID: this.props.ExcerciseID,
        NumberScoreItemOnPage: this.state.NumberScoreItemOnPage,
        NumberIndexScoreItemOnPage: this.state.NumberIndexScoreItemOnPage,
        CurrentIndexScoreItemPage: this.state.CurrentIndexScoreItemPage,
        CurrentIndexOfIndexScoreItemPage: this.state
          .CurrentIndexOfIndexScoreItemPage
      })
      .then(res => {
        if (this.axiosmounted) {
          const allNumberOfScoreItemOnPageList = [];
          const scoreItemListLength = res.data.AllNumberExcerciseResult;

          const allNumberOfScoreItem = Math.ceil(
            scoreItemListLength / Number(this.state.NumberScoreItemOnPage)
          );

          for (let i = 1; i <= allNumberOfScoreItem; i++) {
            allNumberOfScoreItemOnPageList.push(i + "");
          }
          this.setState({
            AllNumberOfScoreItemOnPageList: allNumberOfScoreItemOnPageList,
            CurrentExcerciseItemResultList:
              res.data.CurrentExcerciseItemResultList
          });
        }
      })
      .catch(error => console.log(error));

    this.timeout = setTimeout(() => {
      this.setState({
        checkLoadingExcerciseItemScoreBoard: true
      });
    }, 800);
  };

  renderIndexOfScoreItemList = () => {
    const currentIndexOfIndexScoreItemPage = Number(
      this.state.CurrentIndexOfIndexScoreItemPage
    );
    const numberIndexScoreItemOnPage = Number(
      this.state.NumberIndexScoreItemOnPage
    );

    const indexOfLastIndexScoreItem =
      currentIndexOfIndexScoreItemPage * numberIndexScoreItemOnPage;

    const indexOfFirstIndexScoreItem =
      indexOfLastIndexScoreItem - numberIndexScoreItemOnPage;

    const currentIndexOfChoiceIndexScoreItemList = this.state.AllNumberOfScoreItemOnPageList.slice(
      indexOfFirstIndexScoreItem,
      indexOfLastIndexScoreItem
    );

    const allNumberOfIndexOfScoreItem = Math.ceil(
      this.state.AllNumberOfScoreItemOnPageList.length /
        numberIndexScoreItemOnPage
    );

    if (
      (this.state.AllNumberOfScoreItemOnPageList.length %
        numberIndexScoreItemOnPage ===
        0 &&
        currentIndexOfIndexScoreItemPage === allNumberOfIndexOfScoreItem) ||
      currentIndexOfChoiceIndexScoreItemList.length < 5
    ) {
      return (
        <div className="user-excercises_all__public-list___control____index-item">
          {currentIndexOfChoiceIndexScoreItemList.map(numberindexitem => (
            <div
              style={
                this.state.CurrentIndexScoreItemPage === numberindexitem
                  ? { color: "blue", border: "groove" }
                  : { color: "black" }
              }
              key={numberindexitem}
              id={numberindexitem}
              onClick={event => this.chooseIndexScoreItemPage(event)}
            >
              {numberindexitem}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="user-excercises_all__public-list___control____index-item">
          {currentIndexOfChoiceIndexScoreItemList.map(numberindexitem => (
            <div
              style={
                this.state.CurrentIndexScoreItemPage === numberindexitem
                  ? { color: "blue", border: "groove" }
                  : { color: "black" }
              }
              key={numberindexitem}
              id={numberindexitem}
              onClick={event => this.chooseIndexScoreItemPage(event)}
            >
              {numberindexitem}
            </div>
          ))}
          <span>...</span>
        </div>
      );
    }
  };

  chooseIndexScoreItemPage = event => {
    let currentIndexScoreItemPage = event.target.id;

    axios
      .post("./getexcericseitemscoreboard", {
        ExcerciseID: this.props.ExcerciseID,
        NumberScoreItemOnPage: this.state.NumberScoreItemOnPage,
        NumberIndexScoreItemOnPage: this.state.NumberIndexScoreItemOnPage,
        CurrentIndexScoreItemPage: currentIndexScoreItemPage,
        CurrentIndexOfIndexScoreItemPage: this.state
          .CurrentIndexOfIndexScoreItemPage
      })
      .then(res => {
        this.setState({
          CurrentIndexScoreItemPage: currentIndexScoreItemPage,
          CurrentExcerciseItemResultList:
            res.data.CurrentExcerciseItemResultList
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  selectIndexForRenderExcerciseScoreItem = () => {
    return (
      <div
        className="user-excercises_all__public-list___control"
        style={{ margin: "40px 0 0 0" }}
      >
        <div>
          <i
            style={
              this.state.checkValidatePrevLeft
                ? { color: "gray" }
                : { color: "blue" }
            }
            onClick={() => this.prevToIndexScoreItemOnLeft()}
            className="material-icons"
          >
            &#xe5c4;
          </i>
        </div>
        {this.renderIndexOfScoreItemList()}
        <div>
          <i
            style={
              this.state.checkValidateNextRight
                ? { color: "gray" }
                : { color: "blue" }
            }
            onClick={() => this.nextToIndexScoreItemOnRight()}
            className="material-icons"
          >
            &#xe5c8;
          </i>
        </div>
      </div>
    );
  };

  prevToIndexScoreItemOnLeft = () => {
    const numberIndexScoreItemOnPage = Number(
      this.state.NumberIndexScoreItemOnPage
    );

    if (!this.state.checkValidatePrevLeft) {
      if (Number(this.state.CurrentIndexOfIndexScoreItemPage) + "" === "1") {
        this.setState({
          checkValidatePrevLeft: true
        });
      } else {
        this.setState({
          CurrentIndexOfIndexScoreItemPage:
            Number(this.state.CurrentIndexOfIndexScoreItemPage) - 1 + "",
          checkValidateNextRight: false,
          CurrentIndexScoreItemPage:
            (Number(this.state.CurrentIndexOfIndexScoreItemPage) - 2) *
              numberIndexScoreItemOnPage +
            1 +
            ""
        });
      }
    } else {
      this.opencheckOverIndexScoreItemModal();
    }
  };

  nextToIndexScoreItemOnRight = () => {
    const numberIndexScoreItemOnPage = Number(
      this.state.NumberIndexScoreItemOnPage
    );

    const allNumberOfIndexOfScoreItem = Math.ceil(
      this.state.AllNumberOfScoreItemOnPageList.length /
        numberIndexScoreItemOnPage
    );

    if (!this.state.checkValidateNextRight) {
      if (
        Number(this.state.CurrentIndexOfIndexScoreItemPage) ===
        allNumberOfIndexOfScoreItem
      ) {
        this.setState({
          checkValidateNextRight: true
        });
      } else {
        this.setState({
          checkValidatePrevLeft: false,
          CurrentIndexOfIndexScoreItemPage:
            Number(this.state.CurrentIndexOfIndexScoreItemPage) + 1 + "",
          CurrentIndexScoreItemPage:
            Number(this.state.CurrentIndexOfIndexScoreItemPage) *
              numberIndexScoreItemOnPage +
            1 +
            ""
        });
      }
    } else {
      this.opencheckOverIndexScoreItemModal();
    }
  };

  returnExcerciseItemDetailContent = () => {
    this.props.getExcercisePublicIDMemberChoice(this.props.ExcerciseID);
    this.props.updateRenderExcercisePublicControl("publicitem");
  };

  renderExcerciseItemScoreBoard = () => {
    return (
      <div>
        <div className="user-excercises_all-list__public-list___public-item_____table-list">
          <table>
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ Tên - ID</th>
                <th>Ngày làm bài</th>
                <th>Thời gian làm</th>
                <th>Điểm số</th>
                <th>Số lần làm</th>
              </tr>
            </thead>
            <tbody>
              {this.state.CurrentExcerciseItemResultList.map(
                (excerciseitem, excerciseindex) => (
                  <tr key={excerciseindex}>
                    <td>
                      {Number(excerciseindex) +
                        1 +
                        (Number(this.state.CurrentIndexScoreItemPage) - 1) *
                          Number(this.state.NumberScoreItemOnPage)}
                    </td>
                    <td>
                      {excerciseitem.MemberFullName}-{excerciseitem.MemberID}
                    </td>
                    <td>{excerciseitem.MemberDidExcerciseDate}</td>
                    <td>{excerciseitem.MemberDidExcerciseMinute} phút</td>
                    <td>
                      {excerciseitem.MemberDidHighestScore}/
                      {excerciseitem.MemberDidExcerciseNumberQuestion} câu
                    </td>
                    <td> {excerciseitem.MemberDidExcerciseTimes}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  renderExcercisePublicItemScoreBoardContent = () => {
    return (
      <div style={{ userSelect: "none" }}>
        <div
          className="user-excercises_all-list__public-list___public-item_____backtopublicitem"
          onClick={() => this.returnExcerciseItemDetailContent()}
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Quay lại</span>
          </div>
        </div>
        {this.state.CurrentExcerciseItemResultList.length !== 0 ? (
          <div>
            {this.renderExcerciseItemScoreBoard()}
            {this.selectIndexForRenderExcerciseScoreItem()}
          </div>
        ) : (
          <div style={{ fontWeight: "bold" }}>
            <p>Chưa có ai làm bài tập bộ đề này!!!!!</p>
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div style={{ userSelect: "none" }}>
        {this.state.checkLoadingExcerciseItemScoreBoard ? (
          <div>{this.renderExcercisePublicItemScoreBoardContent()}</div>
        ) : (
          <p style={{ color: "blue", fontWeight: "bold" }}>
            Đang lấy dữ liệu Bảng xếp hạng của Bộ đề-Bài tập...
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
          isOpen={this.state.overIndexScoreItemIsOpen}
          onRequestClose={this.closecheckOverIndexScoreItemModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮC NHỞ</p>
            <p style={{ fontWeight: "bold" }}>Đã hết danh sách rồi bạn ạ!!!!</p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closecheckOverIndexScoreItemModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>
      </div>
    );
  }
}
