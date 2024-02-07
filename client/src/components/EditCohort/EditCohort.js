import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Select from "react-select";
import { connect } from "react-redux";
import RequireAuthorization from "../RequireAuthorization/RequireAuthorization";
import Messenger from "../Snackbar/Snackbar";
import "./EditCohort.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class EditCohort extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      submitted: false,
      background_gray: false,
      list_error: "",
      name_error: "",
      acronym_error: "",
      type_error: "",
      notes_error: "",
      cohort: "",
      cohortName: "",
      cohortAcronym: "",
      id: "",
      type: "",
      outdated: false,
      ownerOptions: null,
      cohortList: [],
      cohortOwners: [],
      cohortOwnerMap: {},
      notes: "",
      isFetching: false,
      successMsg: false,
      failureMsg: false,
    };

    this.handleAcronymChange = this.handleAcronymChange.bind(this);
    this.handleMultiChange = this.handleMultiChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleOutdated = this.handleOutdated.bind(this);
  }

  handleAcronymChange(option) {
    const selectedCohort = this.state.cohortList.find((e) => e.value === option.value);
    const owners = this.state.cohortOwnerMap[option.value] || [];

    this.setState((state) => {
      return {
        id: selectedCohort.value,
        cohort: option,
        cohortName: selectedCohort.name,
        cohortAcronym: selectedCohort.cohort_acronym,
        type:
          selectedCohort.type === "Survivor"
            ? { value: "Survivor", label: "Survivor Cohort" }
            : { value: "Etiology", label: "Etiology Cohort" },
        outdated: selectedCohort.outdated,
        cohortOwners: owners.map((e) => {
          return this.state.ownerOptions.find((owner) => e === owner.value);
        }),
        notes: selectedCohort.notes,
        status: selectedCohort.status,
      };
    });
  }

  handleMultiChange(option) {
    this.setState((state) => {
      return {
        cohortOwners: option,
      };
    });
  }

  handleSelectChange(option) {
    this.setState((state) => {
      return {
        type: option,
      };
    });
  }

  componentDidMount = () => {
    this.setOptions();
  };

  setOptions = () => {
    this.setState({ isFetching: true });
    let reqBody = {};

    Promise.all([
      fetch(
        "/api/cohort/edit_list",
        {
          method: "POST",
          body: JSON.stringify(reqBody),
          header: {
            "Content-Type": "application/json",
          },
        },
        [],
      ),
      fetch(
        "/api/cohort/owners",
        {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: {
            "Content-Type": "application/json",
          },
        },
        [],
      ),
    ])
      .then(([cohortRes, ownerRes]) => {
        return Promise.all([cohortRes.json(), ownerRes.json()]);
      })
      .then(([cohortResult, ownerResult]) => {
        var cohorts = cohortResult.data.list;
        cohorts = cohorts.filter(
          (e) =>
            e.status === "published" ||
            cohorts.find((j) => e.cohort_acronym === j.cohort_acronym && j.status === "published") === undefined,
        );
        const toAddCohorts = [];
        var map = {};
        cohorts.map((cohort) => {
          if (!toAddCohorts.find((e) => e.cohort_acronym === cohort.cohort_acronym)) {
            toAddCohorts.push({
              ...cohort,
              value: cohort.id,
              label: `${cohort.name} (${cohort.cohort_acronym})`,
            });

            if (cohort.user_id) map = { ...map, [cohort.id]: [cohort.user_id] };
          } else if (cohort.user_id) map[cohort.id].push(cohort.user_id);
        });

        const owners = ownerResult.data.list;
        const toAddOwners = [];

        owners.map((owner) => {
          const name = owner.first_name + " " + owner.last_name + " (" + owner.email + ")";
          const option = {
            value: owner.id,
            label: name,
            name: owner.first_name + " " + owner.last_name,
            email: owner.email,
          };
          toAddOwners.push(option);
        });

        this.setState({ ownerOptions: toAddOwners, cohortList: toAddCohorts, cohortOwnerMap: map, isFetching: false });
      });
  };

  handleModalClick = () => {
    this.setState({
      background_gray: false,
    });
  };

  handleCancel = () => {
    window.location.assign(window.location.origin + "/admin/managecohort/");
  };

  handleChange(field, event) {
    let dict = {};
    dict[field] = event.target.value;
    this.setState(dict);
  }

  handleOutdated() {
    this.setState({ outdated: !this.state.outdated });
  }

  sendEmail(userName, userEmail) {
    let reqBody = {
      templateData: {
        user: userName,
        cohort: "<li>" + this.state.cohortName + " (" + this.state.cohortAcronym + ")</li>",
        website: window.location.origin,
      },
      email: userEmail,
      template: "/templates/email-new-cohort-template.html",
      topic: "New cohort assigned to your CEDCD User Account",
    };
    fetch("/api/cohort/sendUserEmail", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result && result.status === 200) {
          //let timedMessage = setTimeout(() => { setSuccessMsg(true) }, 4000)
          //clearTimeout(timedMessage)
        } else {
          //let timedMessage = setTimeout(() => { setFailureMsg(true) }, 4000)
          //clearTimeout(timedMessage)
        }
      });
  }

  setSuccessMsg = () => {
    this.setState({
      successMsg: false,
    });
  };

  setFailureMsg = () => {
    this.setState({
      failureMsg: false,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    //check required field
    const state = Object.assign({}, this.state);

    let errors = 0;
    let cohortList;
    let reqBody = {};
    fetch("/api/cohort/list", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        cohortList = result.data.list;
        state.list_error = "";
        state.name_error = "";
        state.acronym_error = "";
        state.type_error = "";
        state.notes_error = "";

        if (!state.cohort) {
          state.list_error = " Required field";
          errors += 1;
        }

        if (state.cohortName === null || !state.cohortName) {
          state.name_error = " Required field";
          errors += 1;
        } else if (state.cohortName.length > 500) {
          state.name_error = " Max length of 500 characters";
          errors += 1;
        }

        if (state.cohortAcronym === null || !state.cohortAcronym) {
          state.acronym_error = " Required field";
          errors += 1;
        } else if (state.cohortAcronym.length > 100) {
          state.acronym_error = " Max length of 100 characters";
          errors += 1;
        }

        if (!state.type) {
          state.type_error = " Required field";
          errors += 1;
        }

        // if (state.name_error === "" || state.acronym_error === "") {
        //   cohortList.map((cohort) => {
        //     if (state.cohortName.trim() === cohort.name.trim()) {
        //       state.name_error = " Cohort already exists";
        //       errors += 1;
        //     }

        //     if (state.cohortAcronym.trim() === cohort.cohort_acronym.trim()) {
        //       state.acronym_error = " Acronym already exists";
        //       errors += 1;
        //     }
        //   });
        // }

        let ownerIDs = [];

        if (state.cohortOwners != null) {
          state.cohortOwners.map((owner) => {
            ownerIDs.push(owner.value);
          });
        }
        if ((state.notes !== null || !state.notes) && state.notes.length > 2000) {
          state.notes_error = " Max length of 2000 characters";
          errors += 1;
        }

        if (errors > 0) {
          this.setState(state);
        } else {
          //submit
          let reqBody = {
            id: state.cohort.value,
            cohortName: state.cohortName,
            cohortAcronym: state.cohortAcronym,
            cohortType: state.type.value,
            cohortOwners: ownerIDs,
            // outdated: state.outdated,
            notes: state.notes,
            createBy: this.props.user,
          };

          fetch("/api/cohort/update", {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.status === 200) {
                state.submitted = true;
                state.successMsg = true;
                this.setState(state);

                if (state.cohortOwners != null) {
                  state.cohortOwners.map((owner) => {
                    this.sendEmail(owner.name, owner.email);
                  });
                }
              } else {
                state.submitted = true;
                state.failureMsg = true;
                this.setState(state);
              }
              setTimeout(() => {
                this.setState({
                  submitted: !this.state.submitted,
                  background_gray: true,
                });
                this.setOptions();
              }, 1500);
            });
        }
      });
  };

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

    const org_cls = "contact-us-field";
    const submit_cls = this.state.background_gray ? "message-mid fade-away" : "message-mid";
    const success_back = this.state.background_gray ? "modal" : "non-modal";
    return (
      <>
        {this.state.successMsg && (
          <Messenger
            message="Your changes were saved."
            severity="success"
            open={true}
            changeMessage={this.setSuccessMsg}
          />
        )}
        {this.state.failureMsg && (
          <Messenger
            message="Your changes could not be saved."
            severity="warning"
            open={true}
            changeMessage={this.setFailureMsg}
          />
        )}
        <div className="col-md-12">
          <div id="myModal" className={success_back} onClick={this.handleModalClick}>
            <div className={submit_cls} style={{ textAlign: "center", borderRadius: "10px" }}>
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
          <div id="newCohortForm" className="row pop-form">
            <div id="contact-main" className="col">
              <div id="contactt-header" className="col-md-12">
                <p className="welcome p-0">
                  <NavLink to="/admin/managecohort">
                    <i className="fas fa-chevron-left mr-2" />
                    Back to Manage Cohorts
                  </NavLink>
                </p>
                <h1 className="pg-title">Edit Cohort</h1>
              </div>
              <div id="contact-col-1" className="col-md-6 contact-col">
                <Form onSubmit={this.handleSubmit}>
                  <p id="ctl11_rg_errorMsg" className="bg-danger"></p>
                  <Form.Group id="ctl11_div_cohortList">
                    <Form.Label className="oneLineLabel" htmlFor="cu_firstName">
                      Cohort<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    {this.state.list_error !== "" && (
                      <Form.Label style={{ color: "red" }}> {this.state.list_error}</Form.Label>
                    )}
                    <div style={{ width: "90%" }}>
                      <Select
                        name="cohort"
                        value={this.state.cohort}
                        options={this.state.cohortList.map((e) => {
                          return { value: e.value, label: e.label };
                        })}
                        onChange={this.handleAcronymChange}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group id="ctl11_div_cohortName">
                    <Form.Label className="oneLineLabel" htmlFor="cu_firstName">
                      Cohort Name
                    </Form.Label>
                    {this.state.name_error !== "" && (
                      <Form.Label style={{ color: "red" }}> {this.state.name_error}</Form.Label>
                    )}
                    <input
                      className="form-control"
                      placeholder="Cohort Name"
                      name="cu_firstName"
                      type="text"
                      id="cu_firstName"
                      value={this.state.cohortName}
                      disabled={true}
                    />
                  </Form.Group>
                  <Form.Group id="ctl11_div_cohortAcronym">
                    <Form.Label className="oneLineLabel" htmlFor="cu_lastName">
                      Cohort Acronym
                    </Form.Label>
                    {this.state.acronym_error !== "" && (
                      <Form.Label style={{ color: "red" }}> {this.state.acronym_error}</Form.Label>
                    )}
                    <input
                      className="form-control"
                      placeholder="Cohort Acronym"
                      name="cu_lastName"
                      type="text"
                      id="cu_lastName"
                      value={this.state.cohortAcronym}
                      disabled={true}
                    />
                  </Form.Group>
                  <Form.Group id="ctl11_div_cohortType">
                    <Form.Label className="oneLineLabel" htmlFor="cu_type">
                      Cohort Type<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    {this.state.type_error !== "" && (
                      <Form.Label style={{ color: "red" }}> {this.state.type_error}</Form.Label>
                    )}
                    <div style={{ width: "90%" }}>
                      <Select
                        name="type"
                        value={this.state.type}
                        options={[
                          { value: "Etiology", label: "Etiology Cohort" },
                          { value: "Survivor", label: "Survivor Cohort" },
                        ]}
                        onChange={this.handleSelectChange}
                        isDisabled={!this.state.id}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group id="ctl11_div_organization" className={org_cls}>
                    <Form.Label className="oneLineLabel" htmlFor="cu_organization">
                      Cohort Owner(s)
                    </Form.Label>
                    <div style={{ width: "90%" }}>
                      <Select
                        name="owners"
                        isMulti="true"
                        value={this.state.cohortOwners}
                        options={this.state.ownerOptions}
                        onChange={this.handleMultiChange}
                        isDisabled={!this.state.id}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group id="ctl11_div_message">
                    <Form.Label className="oneLineLabel" htmlFor="cu_message">
                      Notes{" "}
                    </Form.Label>
                    {this.state.notes_error !== "" && (
                      <Form.Label style={{ color: "red", paddingLeft: "5px" }}> {this.state.notes_error}</Form.Label>
                    )}
                    <textarea
                      className="form-control"
                      placeholder="Max of 2000 characters"
                      name="cu_message"
                      rows="4"
                      cols="20"
                      id="cu_message"
                      value={this.state.notes}
                      onChange={(e) => this.handleChange("notes", e)}
                      disabled={!this.state.id}
                    />
                  </Form.Group>
                  <Form.Check
                    type="checkbox"
                    id="outdated"
                    label="Cohort outdated"
                    checked={this.state.outdated}
                    // onClick={this.handleOutdated}
                    disabled={true}
                    title={"Only available for published cohorts"}
                  />
                  <div className="bttn-group" style={{ width: "90%" }}>
                    <Button variant="primary" type="submit" value="Submit" className="col-lg-2 col-md-6 float-right">
                      Submit
                    </Button>
                    <Button variant="secondary" className="col-lg-2 col-md-6 float-right" onClick={this.handleCancel}>
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = function ({ user }) {
  return {
    user: user.id,
  };
};

export default connect(mapStateToProps)(EditCohort);
