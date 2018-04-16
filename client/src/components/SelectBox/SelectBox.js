import React, { Component } from 'react';
import './SelectBox.css';

class SelectBox extends Component {

  render() {
    return (
      <span className="select-checkbox">
      	<input type="checkbox" onChange={this.props.onClick} checked={this.props.checked}/>
      </span>
    );
  }
}

export default SelectBox;