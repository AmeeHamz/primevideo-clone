import React from "react";
import "./SuccessMessage.css";

export class SuccessMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showBlock: true
    };
  }

  hideBox() {
    this.setState({
      showBlock: false
    });
  }

  render() {
    const styles = this.state.showBlock
      ? { display: "block" }
      : { display: "none" };
    return (
      <div>
        <div className="body-box" style={styles}>
          <div className="header-box">
            <div onClick={this.hideBox.bind(this)}>
              <i className="fas fa-times-circle exit-button" />
            </div>
          </div>
          <div className="content-box">
            <i className="content-icon fas fa-check-circle" />
            <div className="content-text">{this.props.message}</div>
          </div>
        </div>
      </div>
    );
  }
}
