import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './MainContent.css';
import Home from '../Home/Home';
import Details from '../Details/Details';
import Enrollment from '../Enrollment/Enrollment';
import Cancer from '../Cancer/Cancer';
import Biospecimen from '../Biospecimen/Biospecimen';
import About from '../About/About';
import Information from '../Information/Information';
import Contact from '../Contact/Contact';
import QuestionnaireLoader from '../QuestionnaireLoader/QuestionnaireLoader'
import ManageCohort from '../Admin/ManageCohort'
import NewCohort from '../Admin/AddNewCohort'
import NewUser from '../Admin/AddNewUser'

class MainContent extends Component {

  render() {
    let match = window.location.pathname;
    if (match.startsWith('/cedcd')) {
      match = "/cedcd";
    }
    else {
      match = "";
    }
    return (
      <Switch>
        <Route exact path={match + '/'} component={Home} />
        <Route path={match + '/home'} component={(props) => (
          <Home timestamp={new Date().toString()} {...props} />
        )} />
        <Route path={match + '/select'} component={(props) => (
          <Details timestamp={new Date().toString()} {...props} />
        )} />
        <Route path={match + '/enrollment'} component={Enrollment} />
        <Route path={match + '/cancer'} component={Cancer} />
        <Route path={match + '/biospecimen'} component={Biospecimen} />
        <Route path={match + '/about'} component={About} />
        <Route path={match + '/contact'} component={Contact} />
        <Route exact path={match + '/questionnaire'} component={QuestionnaireLoader} />
        <Route path={match + '/cohort'} component={Information} />
        <Route path={match + '/managecohort'} component={ManageCohort} />
        <Route path={match + '/newcohort'} component={NewCohort} />
        <Route path={match + '/newuser'} component={NewUser} />
      </Switch>
    );
  }
}

export default MainContent;