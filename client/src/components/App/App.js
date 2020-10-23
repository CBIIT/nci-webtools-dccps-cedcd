import React, { Component } from 'react';
import './App.css';
import NavBar from '../NavBar/NavBar';
import ContactBox from '../ContactBox/ContactBox';
import MainContent from '../MainContent/MainContent';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currTab: 0
    };
  }

  handleClick(i) {
    localStorage.clear();
    this.setState({ currTab: i });
  }

  componentDidMount() {
    this.updateTab();
    window.onlocationchange = () => setTimeout(_ => this.updateTab(), 100);
  }

  updateTab() {
    let path = window.location.pathname;
    if (path.indexOf("/home") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 0 });
      }, 100);
    }
    else if (path.indexOf("/select") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 1 });
      }, 100);
    }
    else if (path.indexOf("/enrollment") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 2 });
      }, 100);
    }
    else if (path.indexOf("/cancer") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 3 });
      }, 100);
    }
    else if (path.indexOf("/biospecimen") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 4 });
      }, 100);
    }
    else if (path.indexOf("/about") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 5 });
      }, 100);
    } else if (path.indexOf("/managecohort") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 8 });
      }, 100);
    }
    else {
      setTimeout(() => {
        this.setState({ currTab: 0 });
      }, 100);
    }
  }

  render() {
    let content = (
      <MainContent />
    );
    return (
      <div>
        <ScrollToTop />
        <div id="mainNavBar">
          <div id="mainNavBar-inner">
            <NavBar currTab={this.state.currTab} showHelp={this.handleHelp} onClick={(i) => this.handleClick(i)} />
          </div>
        </div>
        <div id="cedcd-main-content" className="row">
          <ContactBox />
          {content}
          <div className="clearFix"></div>
        </div>
      </div>
    );
  }
}

export default App;
