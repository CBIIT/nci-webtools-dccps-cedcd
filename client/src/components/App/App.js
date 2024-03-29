import React, { Component } from "react";
import "./App.css";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";
import ContactBox from "../ContactBox/ContactBox";
import MainContent from "../MainContent/MainContent";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import SessionModal from "../SessionModal/SessionModal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currTab: 0,
      admin: 0,
    };
  }

  handleClick(i) {
    localStorage.clear();
    this.setState({ currTab: i });
  }

  handleAdmin(v) {
    this.setState({ admin: v });
  }
  componentDidMount() {
    this.updateTab();
    window.addEventListener("popstate", () => setTimeout(() => this.updateTab(), 100), false);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", () => {
      alert(window.location.pathname);
    });
  }

  updateTab() {
    let path = window.location.pathname;

    if (path.indexOf("/home") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 0 });
      }, 100);
    } else if (path.indexOf("/select") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 1 });
      }, 100);
    } else if (path.indexOf("/enrollment") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 2 });
      }, 100);
    } else if (path.indexOf("/cancer") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 3 });
      }, 100);
    } else if (path.indexOf("/biospecimen") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 4 });
      }, 100);
    } else if (path.indexOf("/about") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 5 });
      }, 100);
    } else if (path.indexOf("/cohort/questionnaire") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 7 });
      }, 100);
    } else if (path.indexOf("/admin/managecohort") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 8 });
      }, 100);
    } else if (path.indexOf("/admin/manage") >= 0) {
      setTimeout(() => {
        this.setState({ currTab: 8 });
      }, 100);
    } else {
      setTimeout(() => {
        this.setState({ currTab: 0 });
      }, 100);
    }
  }

  render() {
    let content = <MainContent />;
    return (
      <div>
        <ScrollToTop />
        <Header />
        <SessionModal />
        <div id="mainNavBar">
          <div id="mainNavBar-inner">
            <NavBar currTab={this.state.currTab} showHelp={this.handleHelp} onClick={(i) => this.handleClick(i)} />
          </div>
        </div>
        <div id="cedcd-main-content" className="row">
          <ContactBox />
          <MainContent onClickLink={(i) => this.handleClick(i)} />
          <div className="clearFix"></div>
        </div>
      </div>
    );
  }
}

export default App;
