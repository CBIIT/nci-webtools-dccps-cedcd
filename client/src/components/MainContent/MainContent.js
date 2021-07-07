import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import Details from '../Details/Details';
import Enrollment from '../Enrollment/Enrollment';
import Cancer from '../Cancer/Cancer';
import Biospecimen from '../Biospecimen/Biospecimen';
import About from '../About/About';
import Information from '../Information/Information';
import Contact from '../Contact/Contact';
import Questionnaire from '../Questionnaire/Questionnaire';
import ManageCohort from '../Admin/ManageCohort'
import NewCohort from '../Admin/AddNewCohort'
import SelectCohort from '../SelectCohort/SelectCohort';
import ManageUser from '../Admin/ManageUser'
import EditUser from '../Admin/EditUser'
import CohortActivity from '../Admin/CohortActivity'
import Unauthorized from '../Unauthorized/Unauthorized';
import ResourceNotFound from '../ResourceNotFound/ResourceNotFound';
import RequireAuthorization from '../RequireAuthorization/RequireAuthorization';
import './MainContent.css';


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
        <Route exact path={match + '/'} component={(props) => 
          <Home onClickLink={this.props.onClickLink} {...props} />
        }/>

        <Route path={match + '/home'} component={(props) => (
          <Home timestamp={new Date().toString()} onClickLink={this.props.onClickLink}  {...props} />
        )} />
        <Route path={match + '/select'} component={(props) => (
          <Details timestamp={new Date().toString()} {...props} />
        )} />
        <Route exact path={match + '/enrollment'} component={Enrollment} />
        <Route exact path={match + '/cancer'} component={Cancer} />
        <Route exact path={match + '/biospecimen'} component={Biospecimen} />
        <Route exact path={match + '/about'} component={About} />
        <Route exact path={match + '/contact'} component={Contact} />
        <Route exact path={match + '/cohort/questionnaire'} render={() => 
          <RequireAuthorization role={["SystemAdmin", "CohortAdmin"]}>
            <SelectCohort />
          </RequireAuthorization>
        } />
        <Route exact path={match + '/cohort/questionnaire/:id'} render={() => 
          <RequireAuthorization role={["SystemAdmin", "CohortAdmin"]}>
            <Questionnaire />
          </RequireAuthorization>
        } />
        <Route exact path={match + '/cohort'} component={Information} />
        <Route exact path={match + '/admin/managecohort'} render={() => 
          <RequireAuthorization role="SystemAdmin">
            <ManageCohort />
          </RequireAuthorization>
        } />
        <Route exact path={match + '/admin/viewcohort/:id/'} render={() => 
          <RequireAuthorization role="SystemAdmin">
            <Questionnaire isReadOnly />
          </RequireAuthorization>} />
        <Route exact path={match + '/admin/manageuser'} render={() => 
          <RequireAuthorization role="SystemAdmin">
            <ManageUser />
          </RequireAuthorization>
        } />
        <Route exact path={match + '/admin/newcohort'} render={() => 
          <RequireAuthorization role="SystemAdmin">
            <NewCohort />
          </RequireAuthorization>
        } />
        <Route exact path={match + '/admin/newuser'} render={() => 
          <RequireAuthorization role="SystemAdmin">
            <EditUser isNew={true} />
          </RequireAuthorization>
        } />
        <Route exact path={match + '/admin/edituser/:id'} render={() => 
          <RequireAuthorization role="SystemAdmin">
            <EditUser isNew={false} />
          </RequireAuthorization>
        } />
        <Route exact path={match + '/admin/activitylog/:abbreviation'} render={() => 
          <RequireAuthorization role="SystemAdmin">
            <CohortActivity />
          </RequireAuthorization>
        } />
        <Route path={match + '/unauthorized'} component={Unauthorized} />
        <Route path="*" component={ResourceNotFound} />
      </Switch>
    );
  }
}

export default MainContent;