import React, { Component } from "react";
import { Document, Page } from "react-pdf";
import * as styles from "./Pdf.scss";
import { Link } from "react-router-dom";

class Pdf extends Component {
  state = {
    numPages: null,
    pageNumber: 1
  };

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  handlePrev = () => {
    if (this.state.pageNumber <= 1) return;

    this.setState({ pageNumber: this.state.pageNumber - 1 });
  };

  handleNext = () => {
    if (this.state.pageNumber >= this.state.numPages) return;
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  };

  handleOnSelect = event => {
    event.stopPropagation();
    const select_text = window.getSelection().toString();
    console.log("select된 text[" + select_text + "]");
  };

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <div>
        <div
          className={styles.pdf_view}
          name="pdf_view"
          onMouseUp={this.handleOnSelect}
          onMouseDown={this.test}
        >
          <Document
            file="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
            onLoadSuccess={this.onDocumentLoad}
          >
            <Page pageNumber={pageNumber} width={500} />
          </Document>
        </div>
        <div className={styles.information_rect} name="information_rect">
          <input />
          <div type="text">By 작성자</div>
          <div type="text">Updated September 2, 2018</div>
        </div>
        <div className={styles.pdf_moverect} name="pdf_moverect">
          <div className={styles.left} onClick={this.handlePrev}>
            <Link to="/create">Prev</Link>
          </div>
          <div className={styles.left}>
            {pageNumber}/{numPages}
          </div>
          <div className={styles.left} onClick={this.handleNext}>
            <Link to="/create">Next</Link>
          </div>
          <button>링크</button>
          <button>전체화면</button>
        </div>
      </div>
    );
  }
}

export default Pdf;
