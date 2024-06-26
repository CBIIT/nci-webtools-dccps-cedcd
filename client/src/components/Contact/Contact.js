import React, { Component } from "react";
import "./Contact.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class Contact extends Component {
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
      topic: "1",
      message: "",
    };
  }

  handleClick = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleModalClick = () => {
    this.setState({
      background_gray: false,
    });
  };

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
      topic: "1",
      message: "",
    });
  };

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
    if (
      state.email
        .trim()
        .search(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ) === -1
    ) {
      state.email_invalid = true;
    } else {
      state.email_invalid = false;
    }

    //Check validity of phone number if one is given
    //if(state.phone.trim() !== "" && state.phone.trim().search(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/) === -1){

    if (state.phone.trim().search(/^[+]?([0-9]|[-])*$/) === -1 || state.phone.length > 20) {
      state.phone_invalid = true;
    } else {
      state.phone_invalid = false;
    }

    if (
      state.firstname_required ||
      state.lastname_required ||
      state.org_required ||
      state.email_required ||
      state.message_required ||
      state.email_invalid ||
      state.phone_invalid
    ) {
      this.setState(state);
    } else {
      //submit
      let reqBody = {
        firstname: state.firstname,
        lastname: state.lastname,
        organization: state.organization,
        phone: state.phone,
        email: state.email,
        topic: state.topic,
        message: state.message,
      };
      fetch("./api/contact/add", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
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
          topic: "1",
          message: "",
        });
      }, 1500);
    }
  };

  render() {
    let cls = ["pop-content"];
    let shadow = "";
    if (this.state.open) {
      cls.push("open");
      shadow = "shadow";
    }
    let firstname_cls = this.state.firstname_required ? "contact-us-field field-required" : "contact-us-field";
    let lastname_cls = this.state.lastname_required ? "contact-us-field field-required" : "contact-us-field";
    let org_cls = this.state.org_required ? "contact-us-field field-required" : "contact-us-field";
    let email_cls = this.state.email_required
      ? "contact-us-field field-required"
      : this.state.email_invalid
      ? "contact-us-field field-invalid"
      : "contact-us-field";
    let message_cls = this.state.message_required ? "contact-us-field field-required" : "contact-us-field";
    let phone_cls = this.state.phone_invalid ? "contact-us-field field-invalid" : "contact-us-field";
    const submit_cls = this.state.background_gray ? "message-mid fade-away" : "message-mid";
    const success_back = this.state.background_gray ? "modal" : "non-modal";
    return (
      <div>
        <div id="myModal" className={success_back} onClick={this.handleModalClick}>
          <div className={submit_cls} style={{ "textAlign": "center", "borderRadius": "10px" }}>
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <h3>Message sent successfully!</h3>
            </div>
          </div>
        </div>
        <div id="contactForm" className="row pop-form">
          <div id="contact-main" className="col">
            <div id="contact-header" className="col-md-12">
              <h1 className="pg-title">Contact Us</h1>
            </div>
            <div id="contact-col-1" className="col-md-6 contact-col">
              <form onSubmit={this.handleSubmit}>
                <p id="ctl11_rg_errorMsg" className="bg-danger"></p>
                <div id="ctl11_div_firstname" className={firstname_cls}>
                  <label className="oneLineLabel" htmlFor="cu_firstName">
                    First Name <span className="required">*</span>
                  </label>
                  <input
                    className="w-100"
                    name="cu_firstName"
                    type="text"
                    id="cu_firstName"
                    value={this.state.firstname}
                    onChange={(e) => this.handleChange("firstname", e)}
                  />
                </div>
                <div id="ctl11_div_lastname" className={lastname_cls}>
                  <label className="oneLineLabel" htmlFor="cu_lastName">
                    Last Name <span className="required">*</span>
                  </label>
                  <input
                    className="w-100"
                    name="cu_lastName"
                    type="text"
                    id="cu_lastName"
                    value={this.state.lastname}
                    onChange={(e) => this.handleChange("lastname", e)}
                  />
                </div>
                <div id="ctl11_div_organization" className={org_cls}>
                  <label className="oneLineLabel" htmlFor="cu_organization">
                    Organization <span className="required">*</span>
                  </label>
                  <input
                    className="w-100"
                    name="cu_organization"
                    type="text"
                    id="cu_organization"
                    value={this.state.organization}
                    onChange={(e) => this.handleChange("organization", e)}
                  />
                </div>
                <div id="ctl11_div_phone" className={phone_cls}>
                  <label className="oneLineLabel" htmlFor="cu_phone">
                    Phone Number
                  </label>
                  <input
                    className="w-100"
                    name="cu_phone"
                    type="text"
                    id="cu_phone"
                    placeholder=""
                    value={this.state.phone}
                    onChange={(e) => this.handleChange("phone", e)}
                  />
                </div>
                <div id="ctl11_div_email" className={email_cls}>
                  <label className="oneLineLabel" htmlFor="cu_email">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    className="w-100"
                    name="cu_email"
                    type="text"
                    id="cu_email"
                    value={this.state.email}
                    onChange={(e) => this.handleChange("email", e)}
                  />
                </div>
                <div id="div_topic" className="contact-us-field">
                  <label className="oneLineLabel" htmlFor="cu_topic">
                    Topic <span className="required">*</span>
                  </label>
                  <select
                    name="cu_topic"
                    id="cu_topic"
                    className="textEntrySmall w-100"
                    value={this.state.topic}
                    onChange={(e) => this.handleChange("topic", e)}>
                    <option value="1">General CEDCD Inquiry</option>
                    <option value="2">Report a Bug</option>
                    <option value="3">Question for NCI CEDCD Researcher Team</option>
                    <option value="4">Other Issues</option>
                  </select>
                </div>
                <div id="ctl11_div_message" className={message_cls}>
                  <label className="oneLineLabel" htmlFor="cu_message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    className="w-100"
                    name="cu_message"
                    rows="4"
                    cols="20"
                    id="cu_message"
                    value={this.state.message}
                    onChange={(e) => this.handleChange("message", e)}
                  />
                </div>
                <div className="bttn-group">
                  <Button variant="primary" type="submit" value="Submit" className="col-lg-2 col-md-6 float-right">
                    Submit
                  </Button>
                  <Button variant="secondary" className="col-lg-2 col-md-6 float-right" onClick={this.handleClear}>
                    Clear
                  </Button>
                </div>
              </form>
            </div>
            <div id="contact-col-2" className="col-md-6 contact-col">
              <h2>General Inquiries</h2>
              <p>
                For questions about the website or the CEDCD project, fill out the contact form. To help us respond to
                your query, please provide as much detail as possible.
              </p>
              <h2>Website Technical Assistance</h2>
              <p>For technical issues or bugs, include the following information:</p>
              <ul>
                <li>Platform (i.e., PC, Mac)</li>
                <li>Operating system (i.e., Windows XP, Windows 7, Mac OS X)</li>
                <li>Browser name and version (i.e., Internet Explorer 6, Chrome 18)</li>
              </ul>
              <h2>Contacting a Specific Cohort</h2>
              <p>
                You can find contact info for each cohort on their{" "}
                <Link to="/select" style={{ fontWeight: "bold" }}>
                  Cohort Profile{" "}
                </Link>
                page.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
