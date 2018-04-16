import React, { Component } from 'react';
import Tab from './Tab'

class TabBoard extends Component {

  renderTab(i){
    return (
      <Tab value={i} currTab={this.props.currTab} onClick={() => this.props.onClick(i)}/>
    );
  }

  render() {
    return (
      <ul className="nav nav-tabs">
        {this.renderTab(0)}
        {this.renderTab(1)}
        {this.renderTab(2)}
        {this.renderTab(3)}
        {this.renderTab(4)}
        {this.renderTab(5)}
        {this.renderTab(6)}
      </ul>
    );
  }
}

export default TabBoard;