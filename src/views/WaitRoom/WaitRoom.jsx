import React, { Component } from "react";
import { connect } from "react-redux";
import { NavigationBar } from "../../components";
import * as styles from "./WaitRoom.scss";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {};
};

class WaitRoom extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <div className={styles.body}>
          <center>
            <h1>지금 바로 시작해보세요!</h1>
          </center>
          <div>
            <div className={styles.create} name="wait_manager">
              <div>
                <p>강연생성하기</p>
                <p>
                  강연 준비중이신가요?
                  <br />
                  쌍방향 커뮤니케이션 툴로
                  <br />
                  신세계를 경험해보세요!
                </p>
              </div>
              <button>MAKE</button>
            </div>
            <div className={styles.create} name="wait_guest">
              <div>
                <p>강연 참여하기</p>
                <p>
                  강연에 참석하셨나요?
                  <br />
                  링크를 통해 누구나
                  <br />
                  간편하게 들어오세요!
                </p>
              </div>
              <button>JOIN</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WaitRoom.defaultProps = defaultProps;
WaitRoom.propTypes = propTypes;

export default connect(mapStateToProps)(WaitRoom);
