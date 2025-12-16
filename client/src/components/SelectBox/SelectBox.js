import React, { Component } from "react";
import "./SelectBox.css";

class SelectBox extends Component {
  render() {
    return (
      <span className="select-checkbox">
        <label htmlFor={this.props.id} className="invisibleLabel">
          {this.props.label}
        </label>
        <input
          id={this.props.id}
          aria-label={this.props.label}
          type="checkbox"
          onChange={this.props.onClick}
          checked={this.props.checked}
        />
      </span>
    );
  }
}

export default SelectBox;
