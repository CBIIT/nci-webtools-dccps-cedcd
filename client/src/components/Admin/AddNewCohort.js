import { red } from '@material-ui/core/colors';
import React, { Component, useEffect } from 'react';
import Select from 'react-select';
import { UserSessionContext } from '../../index';
import Unauthorized from '../Unauthorized/Unauthorized';
import './AddNewCohort.css';

class AddNewCohort extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      submitted: false,
      background_gray: false,
      name_error: "",
      acronym_error: "",
      notes_error: "",
      cohortName: "",
      cohortAcronym: "",
      ownerOptions: null,
      cohortOwners: [],
      notes: "",
      isFetching: false
    };

    this.handleMultiChange = this.handleMultiChange.bind(this);
  }

  handleMultiChange(option) {
    this.setState(state => {
      return {
        cohortOwners: option
      };
    });
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

  sendEmail(userName, userEmail) {
    let reqBody = {
      templateData: {
        user: userName,
        cohortName: this.state.cohortName,
        cohortAcronym: this.state.cohortAcronym,
        website: window.location.origin
      },
      email: userEmail,
      topic: 'CEDCD Cohort assigned to your account - ' + this.state.cohortAcronym,
    };
    fetch('/api/cohort/sendEmail', {
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



  handleSubmit = async (event) => {

    event.preventDefault();
    //check required field
    const state = Object.assign({}, this.state);
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
        state.notes_error = ''
        console.log(cohortList)

        if (state.cohortName === null || !state.cohortName) {
          state.name_error = 'required field'
          errors += 1
        }
        else if (state.cohortName.length > 500) {
          state.name_error = 'max length of 500 characters'
          errors += 1
        }

        if (state.cohortAcronym === null || !state.cohortAcronym) {
          state.acronym_error = 'required field'
          errors += 1
        }
        else if (state.cohortAcronym.length > 100) {
          state.acronym_error = 'max length of 100 characters'
          errors += 1
        }

        if (state.name_error === '' || state.acronym_error === '') {
          cohortList.map((cohort) => {
            if (state.cohortName === cohort.cohort_name) {
              state.name_error = 'cohort already exists'
              errors += 1;
            }

            if (state.cohortAcronym === cohort.cohort_acronym) {
              state.acronym_error = 'acronym already exists'
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
        if ((state.notes !== null || !state.notes) && state.notes.length > 500) {
          state.notes_error = 'max length of 500 characters'
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
            cohortOwners: ownerIDs,
            notes: state.notes
          };
          fetch('/api/cohort/add', {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())

          state.submitted = true;
          this.setState(state);
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
              cohortOwners: [],
              notes: ""
            });
          }, 1500);

          if (state.cohortOwners != null) {

            state.cohortOwners.map((owner) => {

              this.sendEmail(owner.name, owner.email)
            })
          }
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
    return <UserSessionContext.Consumer>
      {userSession => (
        !(userSession && userSession.role === 'SystemAdmin') &&
        <Unauthorized /> ||
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
                <h1 className="pg-title">Add New Cohort</h1>
              </div>
              <div id="contact-col-1" className="col-md-6 contact-col">
                <form onSubmit={this.handleSubmit}>
                  <p id="ctl11_rg_errorMsg" className="bg-danger"></p>
                  <div id="ctl11_div_cohortName">
                    <label className="oneLineLabel" htmlFor="cu_firstName">Cohort Name <span className="required">*</span></label>
                    {this.state.name_error !== '' && <label style={{ color: 'red' }}>{this.state.name_error}</label>}
                    <input name="cu_firstName" type="text" id="cu_firstName" value={this.state.cohortName} onChange={(e) => this.handleChange("cohortName", e)} />
                  </div>
                  <div id="ctl11_div_cohortAcronym">
                    <label className="oneLineLabel" htmlFor="cu_lastName">Cohort Acronym <span className="required">*</span></label>
                    {this.state.acronym_error !== '' && <label style={{ color: 'red' }}>{this.state.acronym_error}</label>}
                    <input name="cu_lastName" type="text" id="cu_lastName" value={this.state.cohortAcronym} onChange={(e) => this.handleChange("cohortAcronym", e)} />
                  </div>
                  <div id="ctl11_div_organization" className={org_cls}>
                    <label className="oneLineLabel" htmlFor="cu_organization">Cohort Owner(s) </label>
                    <div style={{ width: '90%' }}>
                      <Select name='owners' isMulti='true' value={this.state.cohortOwners} options={this.state.ownerOptions} onChange={this.handleMultiChange} />
                    </div>
                  </div>
                  <div id="ctl11_div_message">
                    <label className="oneLineLabel" htmlFor="cu_message">Notes </label>
                    {this.state.notes_error !== '' && <label style={{ color: 'red', paddingLeft: '5px' }}>{this.state.notes_error}</label>}
                    <textarea name="cu_message" rows="4" cols="20" id="cu_message" value={this.state.notes} onChange={(e) => this.handleChange("notes", e)} />
                  </div>
                  <div className="bttn-group">
                    <input type="submit" className="bttn_submit" value="Submit" />
                    <a id="ctl11_fg_cancelBtn" className="bttn_cancel" href="javascript:void(0);" onClick={this.handleCancel}>Cancel</a>
                  </div>
                </form>
              </div>
              <div id="contact-col-2" className="col-md-6 contact-col">
                <h2>General Instructions</h2>
                <p>For new Cohort, <span className="required" style={{ fontWeight: "bold" }}>*</span> fileds information are required.</p>
              </div>
            </div>
          </div>
        </div>
      )}</UserSessionContext.Consumer>;
  }
}

export default AddNewCohort;