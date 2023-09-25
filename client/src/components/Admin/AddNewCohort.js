import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import { connect } from 'react-redux';
import RequireAuthorization from '../RequireAuthorization/RequireAuthorization';
import Messenger from '../Snackbar/Snackbar'
import './AddNewCohort.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class AddNewCohort extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      submitted: false,
      background_gray: false,
      name_error: "",
      acronym_error: "",
      type_error: "",
      notes_error: "",
      cohortName: "",
      cohortAcronym: "",
      type: "",
      active: true,
      ownerOptions: null,
      cohortOwners: [],
      notes: "",
      isFetching: false,
      successMsg: false,
      failureMsg: false
    };

    this.handleMultiChange = this.handleMultiChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleActive = this.handleActive.bind(this);
  }

  handleMultiChange(option) {
    this.setState(state => {
      return {
        cohortOwners: option
      };
    });
  }

  handleSelectChange(option) {
    this.setState(state => {
      return {
        type: option
      }
    })
  }


  componentDidMount = () => {
    this.setState({ isFetching: true });
    let reqBody = {
    };

    fetch('/api/cohort/owners', {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    }, [])
      .then(res => res.json())
      .then(result => {
        const owners = result.data.list
        const toAddOwners = []

        owners.map((owner) => {
          const name = owner.first_name + ' ' + owner.last_name + ' (' + owner.email + ')'
          const option = { value: owner.id, label: name, name: owner.first_name + ' ' + owner.last_name, email: owner.email }
          toAddOwners.push(option)
        })

        this.setState({ ownerOptions: toAddOwners, isFetching: false })
      })
  }

  handleModalClick = () => {
    this.setState({
      background_gray: false
    })
  }

  handleCancel = () => {
    window.location.assign(window.location.origin + '/admin/managecohort/')
  }

  handleChange(field, event) {
    let dict = {};
    dict[field] = event.target.value;
    this.setState(dict);
  }

  handleActive() {
    this.setState({ active: !this.state.active })
  }

  sendEmail(userName, userEmail) {
    let reqBody = {
      templateData: {
        user: userName,
        cohort: '<li>' + this.state.cohortName + ' (' + this.state.cohortAcronym + ')</li>',
        website: window.location.origin,
      },
      email: userEmail,
      template: '/templates/email-new-cohort-template.html',
      topic: 'New cohort assigned to your CEDCD User Account',
    };
    fetch('/api/cohort/sendUserEmail', {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        if (result && result.status === 200) {
          //let timedMessage = setTimeout(() => { setSuccessMsg(true) }, 4000)
          //clearTimeout(timedMessage)
        }
        else {
          //let timedMessage = setTimeout(() => { setFailureMsg(true) }, 4000)
          //clearTimeout(timedMessage)
        }
      })
  }

  setSuccessMsg = () => {
    this.setState({
      successMsg: false
    })
  }

  setFailureMsg = () => {
    this.setState({
      failureMsg: false
    })
  }


  handleSubmit = async (event) => {

    event.preventDefault();

    //check required field
    const state = Object.assign({}, this.state);
    console.log(state)
    let errors = 0;
    let cohortList;
    let reqBody = {
    };
    fetch('/api/cohort/list', {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(result => {
        cohortList = result.data.list
        state.name_error = ''
        state.acronym_error = ''
        state.type_error = ''
        state.notes_error = ''

        if (state.cohortName === null || !state.cohortName) {
          state.name_error = ' Required field'
          errors += 1
        }
        else if (state.cohortName.length > 500) {
          state.name_error = ' Max length of 500 characters'
          errors += 1
        }

        if (state.cohortAcronym === null || !state.cohortAcronym) {
          state.acronym_error = ' Required field'
          errors += 1
        }
        else if (state.cohortAcronym.length > 100) {
          state.acronym_error = ' Max length of 100 characters'
          errors += 1
        }

        if (!state.type) {
          state.type_error = " Required field"
          errors += 1
        }


        if (state.name_error === '' || state.acronym_error === '') {
          cohortList.map((cohort) => {

            if (state.cohortName.trim() === cohort.name.trim()) {
              state.name_error = ' Cohort already exists'
              errors += 1;
            }

            if (state.cohortAcronym.trim() === cohort.cohort_acronym.trim()) {
              state.acronym_error = ' Acronym already exists'
              errors += 1;
            }
          })
        }

        let ownerIDs = []


        if (state.cohortOwners != null) {
          state.cohortOwners.map((owner) => {

            ownerIDs.push(owner.value)
          })
        }
        if ((state.notes !== null || !state.notes) && state.notes.length > 2000) {
          state.notes_error = ' Max length of 2000 characters'
          errors += 1
        }

        if (errors > 0) {
          this.setState(state);
        }
        else {

          //submit
          let reqBody = {
            cohortName: state.cohortName,
            cohortAcronym: state.cohortAcronym,
            cohortType: state.type.value,
            cohortOwners: ownerIDs,
            active: state.active ? "Active" : "Inactive",
            notes: state.notes,
            createBy: this.props.user
          };

          console.log(reqBody)
          fetch('/api/cohort/add', {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(result => {

              if (result.status === 200) {
                state.submitted = true;
                state.successMsg = true;
                this.setState(state);


                if (state.cohortOwners != null) {
                  state.cohortOwners.map((owner) => {
                    this.sendEmail(owner.name, owner.email)
                  })
                }
              }
              else {
                state.submitted = true;
                state.failureMsg = true;
                this.setState(state);
              }
              setTimeout(() => {
                this.setState({
                  submitted: !this.state.submitted,
                  background_gray: true,
                  cohortName_required: false,
                  cohortAcronym_required: false,
                  org_required: false,
                  message_required: false,
                  cohortName: "",
                  cohortAcronym: "",
                  type: "",
                  cohortOwners: [],
                  notes: ""
                });
              }, 1500);

            })

        }
      });

  }

  render() {
    let cls = ["pop-content"];
    let shadow = "";
    if (this.state.open) {
      cls.push("open");
      shadow = "shadow";
    }

    let dropCLS = "dropdown filter-component btn-group filter-component-div";
    if (this.state.open) {
      dropCLS = dropCLS + " open";
    }

    let org_cls = this.state.org_required ? "contact-us-field field-required" : "contact-us-field";

    const submit_cls = this.state.background_gray ? "message-mid fade-away" : "message-mid";
    const success_back = this.state.background_gray ? "modal" : "non-modal";
    return <>
      {this.state.successMsg && <Messenger message='Your changes were saved.' severity='success' open={true} changeMessage={this.setSuccessMsg} />}
      {this.state.failureMsg && <Messenger message='Your changes could not be saved.' severity='warning' open={true} changeMessage={this.setFailureMsg} />}
      <div className='col-md-12'>
        <div id="myModal" className={success_back} onClick={this.handleModalClick}>
          <div className={submit_cls} style={{ textAlign: "center", "border-radius": "10px" }}>
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <h3>Message sent successfully!</h3>
            </div>
          </div>
        </div>
        <div id="newCohortForm" className="row pop-form">
          <div id="contact-main" className="col">
            <div id="contactt-header" className="col-md-12">
              <p className="welcome p-0">
                <NavLink to="/admin/managecohort">
                  <i className="fas fa-chevron-left mr-2" />
                  Back to Manage Cohorts
                </NavLink>
              </p>
              <h1 className="pg-title">Add New Cohort</h1>
            </div>
            <div id="contact-col-1" className="col-md-6 contact-col">
              <Form onSubmit={this.handleSubmit}>
                <p id="ctl11_rg_errorMsg" className="bg-danger"></p>
                <Form.Group id="ctl11_div_cohortName">
                  <Form.Label className="oneLineLabel" htmlFor="cu_firstName">Cohort Name<span style={{ color: 'red' }}>*</span></Form.Label>
                  {this.state.name_error !== '' && <Form.Label style={{ color: 'red' }}> {this.state.name_error}</Form.Label>}
                  <input className="form-control" placeholder="Max of 500 characters" name="cu_firstName" type="text" id="cu_firstName" value={this.state.cohortName} onChange={(e) => this.handleChange("cohortName", e)} />
                </Form.Group>
                <Form.Group id="ctl11_div_cohortAcronym">
                  <Form.Label className="oneLineLabel" htmlFor="cu_lastName">Cohort Acronym<span style={{ color: 'red' }}>*</span></Form.Label>
                  {this.state.acronym_error !== '' && <Form.Label style={{ color: 'red' }}> {this.state.acronym_error}</Form.Label>}
                  <input className="form-control" placeholder="Max of 100 characters" name="cu_lastName" type="text" id="cu_lastName" value={this.state.cohortAcronym} onChange={(e) => this.handleChange("cohortAcronym", e)} />
                </Form.Group>
                <Form.Group id="ctl11_div_cohortType">
                  <Form.Label className="oneLineLabel" htmlFor="cu_type">Cohort Type<span style={{ color: 'red' }}>*</span></Form.Label>
                  {this.state.type_error !== '' && <Form.Label style={{ color: 'red' }}> {this.state.type_error}</Form.Label>}
                  <div style={{ width: '90%' }}>
                    <Select name='type' value={this.state.type} options={[
                      { value: "Etiology", label: "Etiology Cohort" },
                      { value: "Survivor", label: "Survivor Cohort" },
                    ]} onChange={this.handleSelectChange} />
                  </div>
                </Form.Group>
                <Form.Group id="ctl11_div_organization" className={org_cls}>
                  <Form.Label className="oneLineLabel" htmlFor="cu_organization">Cohort Owner(s)</Form.Label>
                  <div style={{ width: '90%' }}>
                    <Select name='owners' isMulti='true' value={this.state.cohortOwners} options={this.state.ownerOptions} onChange={this.handleMultiChange} />
                  </div>
                </Form.Group>
                <Form.Group id="ctl11_div_message">
                  <Form.Label className="oneLineLabel" htmlFor="cu_message">Notes </Form.Label>
                  {this.state.notes_error !== '' && <Form.Label style={{ color: 'red', paddingLeft: '5px' }}> {this.state.notes_error}</Form.Label>}
                  <textarea className="form-control" placeholder="Max of 2000 characters" name="cu_message" rows="4" cols="20" id="cu_message" value={this.state.notes} onChange={(e) => this.handleChange("notes", e)} />
                </Form.Group>
                <Form.Check
                  type="checkbox"
                  id="active"
                  label="Active"
                  checked={this.state.active}
                  onClick={this.handleActive}
                />
                <div className="bttn-group" style={{ width: '90%' }}>
                  <Button
                    variant="primary"
                    type="submit"
                    value="Submit"
                    className="col-lg-2 col-md-6 float-right">
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    className="col-lg-2 col-md-6 float-right"
                    onClick={this.handleCancel}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
            <div id="contact-col-2" className="col-md-6 contact-col">
              <h2>General Instructions</h2>
              <p>For new Cohort, <span className="required" style={{ fontWeight: "bold" }}>*</span> fields are required.</p>
            </div>
          </div>
        </div>
      </div>
    </>;
  }
}


const mapStateToProps = function ({ user }) {
  return {
    user: user.id
  }
}

export default connect(mapStateToProps)(AddNewCohort);