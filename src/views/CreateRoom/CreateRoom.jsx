import React, { Component } from "react";
import { connect } from "react-redux";
import { NavigationBar } from "../../components";
import * as styles from "./CreateRoom.scss";
import Dropzone from "react-dropzone";
import { Redirect } from "react-router-dom";
import * as createroomActions from "../../modules/createroom";

const defaultProps = {};
const propTypes = {};

const mapStateToProps = state => {
  return {
    status: state.createroom.status,
    data: state.createroom.data
  };
};

const mapDispatchToProps = dispatch => ({
  getAdmin: roomId => dispatch(createroomActions.getAdmin(roomId)),
  getRoom: roomId => dispatch(createroomActions.getRoom(roomId)),
  setRoom: data => dispatch(createroomActions.setRoom(data)),
  updateRoom: data => dispatch(createroomActions.updateRoom(data))
});

class CreateRoom extends Component {
  state = {
    files: [],
    title: "",
    writer: "",
    password: "",
    isDone: false
  };

  componentDidMount() {
    const { updateRoomId } = this.props;
    console.log("업데이트 인가?[" + updateRoomId + "]");

    //Room 정보 Update할 경우
    if (updateRoomId) {
      //1. User Token이 Master인지 조회
      this.props.getAdmin(updateRoomId);

      if (this.props.data.admin) {
        //2. Room 정보 가져와서 셋팅
        this.props.getRoom(updateRoomId).then(() => {
          this.setState({
            files: this.props.data.files,
            title: this.props.data.title,
            writer: this.props.data.writer,
            password: this.props.data.password
          });
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps Event");
  }

  onDrop(files) {
    this.setState({
      files
    });
  }

  /**
   * 관리자가 생성/수정 버튼 클릭 시 발생하는 fn
   */
  handleUpload = () => {
    console.log("업로드 버튼");
    const { files, title, writer, password } = this.state;

    if (!files || !title || !writer) {
      let strBuffer = "";
      strBuffer += !files ? "파일 업로드 " : "";
      strBuffer += !title ? "제목 " : "";
      strBuffer += !writer ? "작성자 " : "";
      strBuffer += " 입력하세요.";
      alert(strBuffer);
      return false;
    }

    //FormData 형식으로 Data 가공
    const formData = new FormData();
    formData.append("file", files);
    formData.append("title", title);
    formData.append("writer", writer);
    formData.append("password", password);

    this.props.setRoom(formData).then(() => {
      if (this.props.status === "SUCCEED_CREATE_ROOM")
        this.setState({ isDone: true });
    });
  };

  /**
   *관리자가 input element에 value 입력시(onChange Event) state에 저장하는 함수
   *name property에 따른 code 분기
   */
  handleOnChange = event => {
    var comp = event.target.name;
    switch (comp) {
      case "title":
        this.setState({ title: event.target.value });
        break;
      case "writer":
        this.setState({ writer: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      default:
        return;
    }
  };

  /**
   * 사용자가 취소 버튼 시 뒤로가기 동작 fn
   */
  canclePage = () => {
    this.props.history.push("/");
    console.log("취소동작");
  };

  /**
   * submit 하는 button form
   */
  submitform = () => {
    return (
      <div name="submitform">
        <button name="btn_ok" onClick={this.handleUpload}>
          생성
        </button>
        <button name="btn_cancle" onClick={this.canclePage}>
          취소
        </button>
      </div>
    );
  };

  /**
   * input form
   */
  inputform = () => {
    return (
      <div name="inputform">
        <input
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.handleOnChange}
          placeholder="방 이름"
        />
        <input
          name="writer"
          type="text"
          value={this.state.writer}
          onChange={this.handleOnChange}
          placeholder="작성자"
        />
        <input
          name="password"
          type="password"
          value={this.state.password}
          onChange={this.handleOnChange}
          placeholder="비밀번호"
        />
      </div>
    );
  };

  /**
   * file upload form
   */
  uploadform = () => {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} accept=".pdf">
            <p>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {this.state.files.map(f => (
              <li key={f.name}>
                {f.name} - {f.size} bytes
              </li>
            ))}
          </ul>
        </aside>
      </section>
    );
  };

  render() {
    const redirect = this.state.isDone ? (
      <Redirect to="/Room" />
    ) : (
      <NavigationBar />
    );

    return (
      <div>
        <div name="head">{redirect}</div>
        <div name="body">
          <div name="upload_rect">
            {this.uploadform()}
            <div name="input_rect">{this.inputform()}</div>
          </div>
          <div name="submit_rect">{this.submitform()}</div>
        </div>
      </div>
    );
  }
}

CreateRoom.defaultProps = defaultProps;
CreateRoom.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRoom);
