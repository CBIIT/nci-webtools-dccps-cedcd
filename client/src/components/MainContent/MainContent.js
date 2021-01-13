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
import SelectCohort from '../SelectCohort/SelectCohort';
import ManageUser from '../Admin/ManageUser'
import EditUser from '../Admin/EditUser'
import Unauthorized from '../Unauthorized/Unauthorized';
import ResourceNotFound from '../ResourceNotFound/ResourceNotFound';


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
        <Route exact path={match + '/enrollment'} component={Enrollment} />
        <Route exact path={match + '/cancer'} component={Cancer} />
        <Route exact path={match + '/biospecimen'} component={Biospecimen} />
        <Route exact path={match + '/about'} component={About} />
        <Route path={match + '/contact'} component={Contact} />
        <Route exact path={match + '/cohort/questionnaire'} component={SelectCohort} />
        <Route exact path={match + '/cohort/questionnaire/:id'} render={() => <QuestionnaireLoader setAdmin={this.props.setAdmin} />} />
        <Route exact path={match + '/cohort'} component={Information} />
        <Route path={match + '/admin/managecohort'} render={() => <ManageCohort setAdmin={this.props.setAdmin} />} />
     {/*}  <Route path={match + '/admin/viewcohort/:id/'} render={() => <ReviewCohort setAdmin={this.props.setAdmin} />} /> */}
        <Route exact path={match + '/admin/viewcohort/:id/'} render={() => <QuestionnaireLoader setAdmin={this.props.setAdmin} isReadOnly={true} />} />
        <Route exact path={match + '/admin/manageuser'} render={() => <ManageUser setAdmin={this.props.setAdmin} />} />
        <Route exact path={match + '/admin/newcohort'} render={() => <NewCohort setAdmin={this.props.setAdmin} />} />
        <Route exact path={match + '/admin/newuser'} render={() => <EditUser setAdmin={this.props.setAdmin} isNew={true} />} />
        <Route exact path={match + '/admin/edituser/:id'} render={() => <EditUser setAdmin={this.props.setAdmin} isNew={false} />} />
        <Route path={match + '/unauthorized'} component={Unauthorized} />
        <Route path="*" component={ResourceNotFound} />
      </Switch>
    );
  }
}

export default MainContent;