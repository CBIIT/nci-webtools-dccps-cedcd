import React, { Component } from 'react';
import './NavBar.css';
import Tab from '../Tab/Tab';

class NavBar extends Component {

  renderTab(i){
    return (
      <Tab value={i} currTab={this.props.currTab} onClick={() => this.props.onClick(i)}/>
    );
  }

  render() {
    return (
      <ul id="mainNav">
        {this.renderTab(0)}
        {this.renderTab(1)}
        {this.renderTab(2)}
        {this.renderTab(3)}
        {this.renderTab(4)}
        {this.renderTab(5)}
      </ul>
    );
  }
}

export default NavBar;
