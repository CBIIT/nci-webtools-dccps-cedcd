import React, { Component } from 'react';
import './AddNewUser.css';

class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      submitted: false,
      background_gray: false,
      firstname_required: false,
      lastname_required: false,
      org_required: false,
      email_required: false,
      message_required: false,
      email_invalid: false,
      phone_invalid: false,
      firstname: "",
      lastname: "",
      organization: "",
      phone: "",
      email: "",
      type: "CohortOwner",
      message: ""
    };
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  }

  handleModalClick = () => {
    this.setState({
      background_gray: false
    })
  }

  handleClear = () => {
    this.setState({
      firstname_required: false,
      lastname_required: false,
      org_required: false,
      email_required: false,
      message_required: false,
      email_invalid: false,
      phone_invalid: false,
      firstname: "",
      lastname: "",
      organization: "",
      phone: "",
      email: "",
      type: "CohortOwner",
      message: ""
    });
  }

  handleChange(field, event) {
    let dict = {};
    dict[field] = event.target.value;
    this.setState(dict);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //check required field
    const state = Object.assign({}, this.state);
    state.firstname_required = state.firstname.trim() === "";
    state.lastname_required = state.lastname.trim() === "";
    state.org_required = state.organization.trim() === "";
    state.email_required = state.email.trim() === "";
    state.message_required = state.message.trim() === "";

    //Check validity of email and phone number
    if (state.email.trim().search(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) === -1) {

      state.email_invalid = true;

    }
    else {
      state.email_invalid = false;
    }

    //Check validity of phone number if one is given
    //if(state.phone.trim() !== "" && state.phone.trim().search(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) === -1){


    if (state.phone.trim().search(/^[+]?([0-9]|[-])*$/) === -1 || state.phone.length > 20) {

      state.phone_invalid = true;
    }
    else {
      state.phone_invalid = false;
    }

    if (state.firstname_required || state.lastname_required || state.org_required || state.email_required || state.message_required || state.email_invalid || state.phone_invalid) {
      this.setState(state);
    }
    else {
      //submit
      let reqBody = {
        firstname: state.firstname,
        lastname: state.lastname,
        organization: state.organization,
        phone: state.phone,
        email: state.email,
        type: state.type,
        message: state.message
      };
      fetch('./api/contact/add', {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
      /*.then(result => {
        let data = result.data;
        state.submitted = data === "sent";
        this.setState(state);
      });*/
      state.submitted = true;
      this.setState(state);
      setTimeout(() => {
        this.setState({
          submitted: !this.state.submitted,
          background_gray: true,
          firstname_required: false,
          lastname_required: false,
          org_required: false,
          email_required: false,
          message_required: false,
          email_invalid: false,
          phone_invalid: false,
          firstname: "",
          lastname: "",
          organization: "",
          phone: "",
          email: "",
          type: "CohortOwner",
          message: ""
        });
      }, 1500);
    }

  }

  render() {
    let cls = ["pop-content"];
    let shadow = "";
    if (this.state.open) {
      cls.push("open");
      shadow = "shadow";
    }
    let firstname_cls = this.state.firstname_required ? "newUser-field field-required" : "newUser-field";
    let lastname_cls = this.state.lastname_required ? "newUser-field field-required" : "newUser-field";
    let org_cls = this.state.org_required ? "newUser-field field-required" : "newUser-field";
    let email_cls = this.state.email_required ? "newUser-field field-required" : (this.state.email_invalid ? "newUser-field field-invalid" : "newUser-field");
    let message_cls = this.state.message_required ? "newUser-field field-required" : "newUser-field";
    let phone_cls = this.state.phone_invalid ? "newUser-field field-invalid" : "newUser-field"
    const submit_cls = this.state.background_gray ? "message-mid fade-away" : "message-mid";
    const success_back = this.state.background_gray ? "modal" : "non-modal";
    return (
      <div>

        <div id="myModal" className={success_back} onClick={this.handleModalClick}>
          <div className={submit_cls} style={{ textAlign: "center", "border-radius": "10px" }}>
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body">
              <h3>New User is created successfully! User has to request login credential if he/she doesn't have yet.</h3>
            </div>
          </div>
        </div>
        <div id="contactForm" className="row pop-form">
          <div id="contact-main" className="col">
            <div id="contact-header" className="col-md-12">
              <h1 className="pg-title">Add New User</h1>
            </div>
            <div id="contact-col-1" className="col-md-6 contact-col">
              <form onSubmit={this.handleSubmit}>
                <p id="ctl11_rg_errorMsg" className="bg-danger"></p>
                <div id="ctl11_div_firstname" className={firstname_cls}>
                  <label className="oneLineLabel" htmlFor="cu_firstName">First Name <span className="required">*</span></label>
                  <input name="cu_firstName" type="text" id="cu_firstName" value={this.state.firstname} onChange={(e) => this.handleChange("firstname", e)} />
                </div>
                <div id="ctl11_div_lastname" className={lastname_cls}>
                  <label className="oneLineLabel" htmlFor="cu_lastName">Last Name <span className="required">*</span></label>
                  <input name="cu_lastName" type="text" id="cu_lastName" value={this.state.lastname} onChange={(e) => this.handleChange("lastname", e)} />
                </div>
                <div id="ctl11_div_organization" className={org_cls}>
                  <label className="oneLineLabel" htmlFor="cu_organization">Organization <span className="required">*</span></label>
                  <input name="cu_organization" type="text" id="cu_organization" value={this.state.organization} onChange={(e) => this.handleChange("organization", e)} />
                </div>
                <div id="ctl11_div_phone" className={phone_cls}>
                  <label className="oneLineLabel" htmlFor="cu_phone">Phone Number</label>
                  <input name="cu_phone" type="text" id="cu_phone" placeholder="" value={this.state.phone} onChange={(e) => this.handleChange("phone", e)} />
                </div>
                <div id="ctl11_div_email" className={email_cls}>
                  <label className="oneLineLabel" htmlFor="cu_email">Email <span className="required">*</span></label>
                  <input name="cu_email" type="text" id="cu_email" value={this.state.email} onChange={(e) => this.handleChange("email", e)} />
                </div>
                <div id="div_type" className="newUser-field">
                  <label className="oneLineLabel" htmlFor="cu_type">User Type <span className="required">*</span></label>
                  <select name="cu_type" id="cu_type" className="textEntrySmall" value={this.state.type} onChange={(e) => this.handleChange("type", e)}>
                    <option value="CohortOwner">Cohort Owner </option>
                    <option value="CohortAdmin">Cohort Admin </option>
                  </select>
                </div>
                <div id="ctl11_div_message" className={message_cls}>
                  <label className="oneLineLabel" htmlFor="cu_message">Brief Message to new user </label>
                  <textarea name="cu_message" rows="4" cols="20" id="cu_message" value={this.state.message} onChange={(e) => this.handleChange("message", e)} />
                </div>
                <div className="bttn-group">
                  <input type="submit" className="bttn_submit" value="Submit" />
                  <a id="ctl11_fg_cancelBtn" className="bttn_cancel" href="javascript:void(0);" onClick={this.handleClear}>Clear</a>
                </div>
              </form>
            </div>
            <div id="contact-col-2" className="col-md-6 contact-col">
              <h2>General Instructions</h2>
              <p>For new CEDCD users, <span className="required" style={{ fontWeight: "bold" }}>*</span> fileds information are required. </p>
              <p> Once new user is created successfully in CEDCD system, new user has to request login credential if he/she doesn't have yet</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddNewUser;