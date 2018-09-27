import React, { Component } from "react";
import { Document, Page } from "react-pdf";

class Pdf extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  };

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };

  handlePrev = () => {
    this.setState({ pageNumber: this.state.pageNumber - 1 });
  };

  handleNext = () => {
    this.setState({ pageNumber: this.state.pageNumber + 1 });
  };

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <div>
        <div name="pdf_view">
          <Document
            file="https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf"
            onLoadSuccess={this.onDocumentLoad}
          >
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
        <div name="information_rect">
          <input value="제목" />
          <div type="text">By 작성자</div>
          <div type="text">Updated September 2, 2018</div>
        </div>
        <div name="pdf_moverect">
          <li onClick={this.handlePrev}>
            <a href="#">Prev</a>
          </li>
          <p>
            Page {pageNumber}
            of
            {numPages}
          </p>
          <li onClick={this.handleNext}>
            <a href="#">Next</a>
          </li>
          <button>링크</button>
          <button>전체화면</button>
        </div>
      </div>
    );
  }
}

export default Pdf;
