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
import ReviewCohort from '../Admin/ReviewCohort'
import NewCohort from '../Admin/AddNewCohort'
import SelectCohort from '../SelectCohort/SelectCohort';
import NewUser from '../Admin/AddNewUser'
import Unauthorized from '../Unauthorized/Unauthorized';


class MainContent extends Component {
  constructor(props) {
    super(props)
  }

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
        <Route exact path={match + '/cohort/questionnaire/:id'} render={() => <QuestionnaireLoader setAdmin={this.props.setAdmin} />} />
        <Route exact path={match + '/cohort'} component={Information} />
        <Route path={match + '/cohort/select'} component={SelectCohort} />
        <Route path={match + '/admin/managecohort'} render={() => <ManageCohort setAdmin={this.props.setAdmin} />} />
        <Route path={match + '/admin/viewcohort/:id'} render={() => <ReviewCohort setAdmin={this.props.setAdmin} />} />
        <Route path={match + '/admin/newcohort'} component={NewCohort} />
        <Route path={match + '/admin/newuser'} component={NewUser} />
        <Route path={match + '/unauthorized'} component={Unauthorized} />
      </Switch>
    );
  }
}

export default MainContent;