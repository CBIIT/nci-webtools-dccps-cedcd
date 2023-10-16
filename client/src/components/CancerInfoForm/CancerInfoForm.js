import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import classNames from "classnames";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { postJSON } from "../../services/query";
import allactions from "../../actions";
import { fetchCohort } from "../../reducers/cohort";
import { parseISO, format } from "date-fns";
import QuestionnaireFooter from "../QuestionnaireFooter/QuestionnaireFooter";
import ValidationModal from "../controls/modal/modal";
import ReviewModal from "../controls/modal/modal";
import Messenger from "../Snackbar/Snackbar";
import Reminder from "../Tooltip/Tooltip";
import { CollapsiblePanelContainer, CollapsiblePanel } from "../controls/collapsable-panels/collapsable-panels";
import { setHasUnsavedChanges } from "../../reducers/unsavedChangesReducer";
import "./CancerInfoForm.css";
import { locale } from "moment";

const { setCancerCount, mergeCancerCounts, mergeCancerInfoFormValues } = allactions.cancerInfoActions;

const inputTypes = [
  { sex: "female", ethnicityType: "hispanic" },
  { sex: "male", ethnicityType: "hispanic" },
  { sex: "female", ethnicityType: "nothispanic" },
  { sex: "male", ethnicityType: "nothispanic" },
  { sex: "female", ethnicityType: "unkonwnEthnicity" },
  { sex: "male", ethnicityType: "unkonwnEthnicity" },
];

const CancerInfoForm = ({ ...props }) => {
  const dispatch = useDispatch();
  const cohort = useSelector((state) => state.cohort);
  const lookup = useSelector((state) => state.lookupReducer);
  const { counts, form } = useSelector((state) => state.cancerInfoReducer);
  const isReadOnly = props.isReadOnly;

  const cohortId = useSelector((state) => state.cohortIDReducer) || props.cohortId;
  const cohortStatus = useSelector((state) => state.cohortStatusReducer);
  const userSession = useSelector((state) => state.user);

  const [activePanel, setActivePanel] = useState("panelA");
  const [errors, setErrors] = useState({});
  const [cancerSelected, setCancerSelected] = useState(21);
  const [subTotals, setSubTotals] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [failureMsg, setFailureMsg] = useState(false);
  const [message, setMessage] = useState({ show: false, type: null, content: null });
  const updateMessage = (state) => setMessage({ ...message, ...state });
  const [modal, setModal] = useState({ show: false });
  const [reviewModalShow, setReviewModalShow] = useState(false);
  const updateModal = (state) => setModal({ ...modal, ...state });
  const setCount = (key, value) => dispatch(setCancerCount(key, value));
  const setFormValue = (key, value) => {
    const formValues = getUpdatedFormValues({ ...form, [key]: value });
    setErrors(getValidationErrors(formValues));
    dispatch(mergeCancerInfoFormValues(formValues));
  };
  const history = useHistory();

  const lookupMap = {
    female: lookup && lookup.gender.find((e) => e.gender === "Female"),
    male: lookup && lookup.gender.find((e) => e.gender === "Male"),
    hispanic: lookup && lookup.ethnicity.find((e) => e.ethnicity === "Hispanic or Latino"),
    nothispanic: lookup && lookup.ethnicity.find((e) => e.ethnicity === "Not Hispanic or Latino"),
    unkonwnEthnicity: lookup && lookup.ethnicity.find((e) => e.ethnicity === "Unknown/Not Reported Ethnicity"),
    race_american: lookup && lookup.race.find((e) => e.race === "American Indian/Alaska Native"),
    race_asian: lookup && lookup.race.find((e) => e.race === "Asian"),
    race_black: lookup && lookup.race.find((e) => e.race === "Black or African American"),
    race_morerace: lookup && lookup.race.find((e) => e.race === "More Than One Race"),
    race_native: lookup && lookup.race.find((e) => e.race === "Native Hawaiian or Other Pacific Islander"),
    race_white: lookup && lookup.race.find((e) => e.race === "White"),
    race_unknown: lookup && lookup.race.find((e) => e.race === "Unknown or Not Reported"),
    incident: lookup && lookup.case_type.find((e) => e.case_type === "incident"),
    prevalent: lookup && lookup.case_type.find((e) => e.case_type === "prevalent"),
  };

  useEffect(() => {
    // once cohort is loaded, populate form
    if (!cohort || !Object.keys(cohort).length || !lookup) return;

    let { cancer_count: cancerCount, cancer_info: cancerInfo } = cohort;

    // populate counts
    const counts = {};
    const totals = {};

    // key : cohort-id_cancer-id_race-id_ethnicity-id_gender-id_case-type

    cancerCount.map((item) => {
      let key = [
        item.cohort_id,
        item.cancer_id,
        item.race_id,
        item.ethnicity_id,
        item.gender_id,
        item.case_type_id,
      ].join("_");
      let cancer_key = [item.cohort_id, item.cancer_id].join("_");
      let cancer_race_key = [item.cohort_id, item.cancer_id, item.race_id].join("_");
      let cancer_eth_sex_key = [item.cohort_id, item.cancer_id, item.ethnicity_id, item.gender_id].join("_");
      let value = parseInt(item.cancer_counts || 0) < 0 ? 0 : parseInt(item.cancer_counts || 0);
      counts[key] = value;
      totals[cancer_key] = value + (totals[cancer_key] || 0);
      totals[cancer_race_key] = value + (totals[cancer_race_key] || 0);
      totals[cancer_eth_sex_key] = value + (totals[cancer_eth_sex_key] || 0);
    });

    setSubTotals(totals);

    // process form data
    const formValues = getUpdatedFormValues({ ...cancerInfo[0] });
    // console.log({ formValues })

    dispatch(mergeCancerCounts(counts));
    dispatch(mergeCancerInfoFormValues(formValues));
  }, [cohort, lookup]);

  const updateSelectedCancerCounts = (ev) => {
    let key = ev.target.name;
    let deltaVal = Math.abs(parseInt(ev.target.value) || 0) - (counts[key] || 0);
    counts[key] = Math.abs(parseInt(ev.target.value) || 0);
    setCount(ev.target.name, Math.abs(parseInt(ev.target.value) || 0));
    dispatch(setHasUnsavedChanges(true));

    refreshTotals(key, deltaVal);
  };

  const refreshTotals = (key, deltaVal) => {
    let totals = subTotals;
    let keyArr = key.split("_");
    let cancer_key = [keyArr[0], keyArr[1]].join("_");
    let cancer_race_key = [keyArr[0], keyArr[1], keyArr[2]].join("_");
    let cancer_eth_sex_key = [keyArr[0], keyArr[1], keyArr[3], keyArr[4]].join("_");

    totals[cancer_key] = deltaVal + (totals[cancer_key] || 0);
    totals[cancer_race_key] = deltaVal + (totals[cancer_race_key] || 0);
    totals[cancer_eth_sex_key] = deltaVal + (totals[cancer_eth_sex_key] || 0);

    setSubTotals(totals);
  };

  const sendEmail = (template, topic) => {
    fetch("/api/questionnaire/select_admin_info", {
      method: "POST",
      body: JSON.stringify({ id: cohortId }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result && result.status === 200) {
          result.data.map((admin) => {
            let reqBody = {
              templateData: {
                user: admin.first_name + " " + admin.last_name,
                cohortName: admin.name,
                cohortAcronym: admin.acronym,
                website: window.location.origin,
                publishDate: new Date().toLocaleString("en-US", { timeZone: "UTC" }) + " UTC",
              },
              email: admin.email,
              template: template,
              topic: topic + admin.acronym,
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
          });
        }
      });
  };

  const resetCohortStatus = (cohortID, nextStatus) => {
    let userId = userSession.id;

    if (["new", "draft", "published", "submitted", "rejected", "in review"].includes(nextStatus)) {
      fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}/${userId}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result && result.status === 200) {
            dispatch({ type: "SET_COHORT_STATUS", value: nextStatus });
            dispatch(fetchCohort(cohortID));
            if (nextStatus === "submitted")
              sendEmail("/templates/email-admin-review-template.html", "CEDCD Cohort Submitted - ");
            setReviewModalShow(false);
            updateMessage({
              show: true,
              type: "success",
              content: `The cohort has been submitted.`,
            });
          } else {
            updateMessage({
              show: true,
              type: "warning",
              content: `The cohort could not be submitted due to an internal error.`,
            });
          }
        });
    }
  };

  function getUpdatedFormValues(form) {
    let formUpdates = { ...form };

    // do not rely on the Date(dateString) constructor, as it is inconsistent across browsers
    if (form.ci_confirmed_cancer_date && form.ci_confirmed_cancer_date.constructor !== Date) {
      const date = parseISO(form.ci_confirmed_cancer_date);
      formUpdates.ci_confirmed_cancer_date = date !== "Invalid Date" ? date : null;
    }

    if (+form.ci_ascertained_other === 0) {
      formUpdates.ci_ascertained_other_specify = "";
    }

    if (+form.ci_treatment_data_other === 0) {
      formUpdates.ci_treatment_data_other_specify = "";
    }

    if (+form.ci_data_source_other === 0) {
      formUpdates.ci_data_source_other_specify = "";
    }

    if (+form.ci_cancer_treatment_data === 0) {
      formUpdates.ci_treatment_data_surgery = 0;
      formUpdates.ci_treatment_data_radiation = 0;
      formUpdates.ci_treatment_data_chemotherapy = 0;
      formUpdates.ci_treatment_data_hormonal_therapy = 0;
      formUpdates.ci_treatment_data_bone_stem_cell = 0;
      formUpdates.ci_treatment_data_other = 0;
      formUpdates.ci_treatment_data_other_specify = "";

      formUpdates.ci_data_source_admin_claims = 0;
      formUpdates.ci_data_source_electronic_records = 0;
      formUpdates.ci_data_source_chart_abstraction = 0;
      formUpdates.ci_data_source_patient_reported = 0;
      formUpdates.ci_data_source_other = 0;
      formUpdates.ci_data_source_other_specify = "";
    }

    if (+form.ci_tumor_genetic_markers_data === 0) {
      formUpdates.ci_tumor_genetic_markers_data_describe = "";
    }

    return formUpdates;
  }

  function getValidationErrors(form) {
    const isNull = (v) => ["", undefined, null].includes(v);
    const errors = {
      ci_confirmed_cancer_date: isNull(form.ci_confirmed_cancer_date),

      ci_ascertained_type:
        [
          form.ci_ascertained_self_reporting,
          form.ci_ascertained_tumor_registry,
          form.ci_ascertained_medical_records,
          form.ci_ascertained_other,
        ].filter(Boolean).length === 0,
      ci_ascertained_other_specify: +form.ci_ascertained_other === 1 && isNull(form.ci_ascertained_other_specify),

      ci_cancer_recurrence: isNull(form.ci_cancer_recurrence),
      ci_second_primary_diagnosis: isNull(form.ci_second_primary_diagnosis),
      ci_cancer_treatment_data: isNull(form.ci_cancer_treatment_data),

      ci_treatment_data_type:
        +form.ci_cancer_treatment_data === 1 &&
        [
          form.ci_treatment_data_surgery,
          form.ci_treatment_data_radiation,
          form.ci_treatment_data_chemotherapy,
          form.ci_treatment_data_hormonal_therapy,
          form.ci_treatment_data_bone_stem_cell,
          form.ci_treatment_data_other,
        ].filter(Boolean).length === 0,
      ci_treatment_data_other_specify:
        +form.ci_cancer_treatment_data === 1 &&
        +form.ci_treatment_data_other === 1 &&
        isNull(form.ci_treatment_data_other_specify),

      ci_data_source_type:
        +form.ci_cancer_treatment_data === 1 &&
        [
          form.ci_data_source_admin_claims,
          form.ci_data_source_electronic_records,
          form.ci_data_source_chart_abstraction,
          form.ci_data_source_patient_reported,
          form.ci_data_source_other,
        ].filter(Boolean).length === 0,
      ci_data_source_other_specify:
        +form.ci_cancer_treatment_data === 1 &&
        +form.ci_data_source_other === 1 &&
        isNull(form.ci_data_source_other_specify),

      ci_collect_other_information: isNull(form.ci_collect_other_information),
      ci_cancer_staging_data: isNull(form.ci_cancer_staging_data),
      ci_tumor_grade_data: isNull(form.ci_tumor_grade_data),
      ci_tumor_genetic_markers_data: isNull(form.ci_tumor_genetic_markers_data),
      ci_tumor_genetic_markers_data_describe:
        +form.ci_tumor_genetic_markers_data === 1 && isNull(form.ci_tumor_genetic_markers_data_describe),
      ci_histologically_confirmed: isNull(form.ci_histologically_confirmed),
    };

    for (const key in errors) if (!errors[key]) delete errors[key];

    return errors;
  }

  function handleSave() {
    let errors = getValidationErrors(form);
    let hasErrors = Object.entries(errors).length > 0;
    setErrors(errors);
    setSubmitted(true);

    async function onConfirm() {
      updateModal({ show: false });
      await saveCohort();
    }

    if (!hasErrors) {
      onConfirm();
    } else {
      updateModal({
        show: true,
        footer: (
          <div className="w-100 text-sm-right text-center">
            <Button variant="secondary" onClick={(e) => updateModal({ show: false })}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              Save
            </Button>
          </div>
        ),
      });
    }
  }
  function handleSaveContinue() {
    let errors = getValidationErrors(form);
    let hasErrors = Object.entries(errors).length > 0;
    setErrors(errors);
    setSubmitted(true);

    async function onConfirm() {
      updateModal({ show: false });
      await saveCohort();
      props.sectionPicker("E");
    }

    if (!hasErrors) {
      onConfirm();
    } else {
      updateModal({
        show: true,
        footer: (
          <div className="w-100 text-sm-right text-center">
            <Button variant="secondary" onClick={(e) => updateModal({ show: false })}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onConfirm}>
              Save
            </Button>
          </div>
        ),
      });
    }
  }

  const handleSubmitForReview = () => {
    setReviewModalShow(true);
  };

  async function saveCohort() {
    let errors = getValidationErrors(form);
    let hasErrors = Object.entries(errors).length > 0;
    setErrors(errors);
    setSubmitted(true);

    try {
      let info = { ...form };
      let id = +cohortId;

      if (info.ci_confirmed_cancer_date) {
        const dateTime = info.ci_confirmed_cancer_date.getTime();
        info.ci_confirmed_cancer_date = format(dateTime, "yyyy-MM-dd");
        info.ci_confirmed_cancer_year = format(dateTime, "yyyy");
      } else {
        info.ci_confirmed_cancer_date = null;
        info.ci_confirmed_cancer_year = null;
      }

      const cancerCounts = Object.entries(counts).map(([key, value]) => {
        let [cohort_id, cancer_id, race_id, ethnicity_id, gender_id, case_type_id] = key.split("_");
        let cancer_counts = value;
        return { cohort_id, cancer_id, race_id, ethnicity_id, gender_id, case_type_id, cancer_counts };
      });

      const result = await postJSON(`/api/questionnaire/update_cancer_info/${id}`, [info]);
      if (result && result.data) {
        const { duplicated_cohort_id, status } = result.data;
        if (status && status != cohortStatus) {
          dispatch({ type: "SET_COHORT_STATUS", value: status });
          if (duplicated_cohort_id && +duplicated_cohort_id !== id) id = duplicated_cohort_id;
        }
        let sectionStatusList = result.data.sectionStatusList;
        if (sectionStatusList && sectionStatusList.length > 0)
          sectionStatusList.forEach((item, idx) => {
            dispatch(allactions.sectionActions.setSectionStatus(item.page_code, item.status));
          });
      }
      await postJSON(`/api/questionnaire/update_cancer_count/${id}`, cancerCounts);

      await postJSON(`/api/questionnaire/cohort/${id}`, {
        cohort_edit_status: [
          {
            page_code: "D",
            status: hasErrors ? "incomplete" : "complete",
          },
        ],
      });

      if (id != cohortId) {
        dispatch(setHasUnsavedChanges(false));
        dispatch(allactions.cohortIDAction.setCohortId(id));
        history.push(window.location.pathname.replace(/\d+$/, id));
        // window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, id));
      }

      dispatch(fetchCohort(id));
      setSuccessMsg(true);
    } catch (e) {
      console.log(e);
      setFailureMsg(true);
    } finally {
      dispatch(allactions.sectionActions.setSectionStatus("D", hasErrors ? "incomplete" : "complete"));
    }
  }

  function CheckedInput({ value, name, type, label, className = "", disabled, onChange }) {
    return (
      <Form.Check
        type={type}
        name={name}
        checked={form[name] === value}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          if (isReadOnly) return false;
          setFormValue(e.target.name, type === "checkbox" ? (e.target.checked ? 1 : 0) : +e.target.value);
          dispatch(setHasUnsavedChanges(true));
          if (onChange) onChange(e);
        }}
        readOnly={isReadOnly}
        label={label}
        id={`${name}_${value}`}
      />
    );
  }

  function CheckedInputs({ options, props }) {
    return options.map((option, i) => <CheckedInput key={`${option.name}_${option.value}`} {...option} {...props} />);
  }

  return (
    lookup && (
      <Container>
        {successMsg && (
          <Messenger message="Your changes were saved." severity="success" open={true} changeMessage={setSuccessMsg} />
        )}
        {failureMsg && (
          <Messenger
            message="Your changes could not be saved."
            severity="warning"
            open={true}
            changeMessage={setFailureMsg}
          />
        )}
        {message.show && (
          <Messenger
            message={message.content}
            severity={message.type}
            open={true}
            changeMessage={(_) => updateMessage({ show: false })}
          />
        )}
        <Form>
          <CollapsiblePanelContainer>
            <CollapsiblePanel
              condition={activePanel === "panelA"}
              onClick={() => setActivePanel(activePanel === "panelA" ? "" : "panelA")}
              panelTitle="Cancer Counts">
              <div className="my-3">
                <Form.Label>D.1 Cancer Counts</Form.Label>
                <div>
                  {" "}
                  Please select each cancer type below and enter its participant counts by ethnicity, race and sex.
                </div>
              </div>
              <div className="mb-4 ml-1">
                <ButtonGroup className="ml-0 p-1">
                  {lookup.cancer
                    .filter((i) => i.cancer !== "No Cancer")
                    .sort((a, b) =>
                      (a.cancer === "All Other Cancers" ? "ZAll Other Cancers" : a.cancer).localeCompare(
                        b.cancer === "All Other Cancers" ? "ZAll Other Cancers" : b.cancer,
                      ),
                    )
                    .map((c) => {
                      let preKey = `${cohortId}_${c.id}`;
                      let subtotal = `${subTotals[preKey] || 0}`;
                      let subtotalStr = parseInt(subtotal).toLocaleString();
                      let cancerName = c.cancer.length < 19 ? c.cancer : c.cancer.slice(0, 16) + "...";
                      let message = (
                        <h5 style={{ fontSize: "1rem", textAlign: "left" }}>
                          {c.cancer} <br></br>
                          ICD-9: {c.icd9 || "n/a"}
                          <br></br>
                          ICD-10: {c.icd10 || "n/a"} <br></br>
                          Total cancer counts: {subtotalStr}
                        </h5>
                      );

                      return (
                        <span className="col-lg-2 col-md-4 col-sm-6 m-0 p-0" style={{ flex: 1, height: "34px" }}>
                          <Reminder cancerCounts={true} message={message} key={preKey}>
                            <Button
                              className="btn btn-cancer-form "
                              style={{ width: "95%", height: "95%" }}
                              key={preKey}
                              onClick={() => setCancerSelected(c.id)}
                              active={c.id === cancerSelected}>
                              {cancerName} (
                              {parseInt(subtotal) === 0 ? (
                                c.id === cancerSelected ? (
                                  0
                                ) : (
                                  <span style={{ color: "#9E9E9E" }}>0</span>
                                )
                              ) : (
                                subtotalStr
                              )}
                              )
                            </Button>
                          </Reminder>
                        </span>
                      );
                    })}
                </ButtonGroup>
              </div>
              <div className="table-responsive mb-4">
                <Table bordered condensed className="table-valign-middle">
                  <thead>
                    <tr>
                      <th rowSpan="3" style={{ fontSize: "1.5rem", paddingRight: "0", width: "15%" }}>
                        Racial Categories
                      </th>
                      {lookup.cancer
                        .filter((i) => i.cancer !== "No Cancer")
                        .map((i) => {
                          if (i.id === parseInt(`${cancerSelected}`)) {
                            return (
                              <th colSpan="6" className="cancer-table-head " key={i.id}>
                                {" "}
                                <b>
                                  {" "}
                                  {i.cancer} ( ICD-9: {i.icd9} / ICD-10: {i.icd10} ){" "}
                                </b>
                              </th>
                            );
                          }
                        })}
                      <th rowSpan="3" style={{ width: "10%", textAlign: "center" }}>
                        Total
                      </th>
                    </tr>
                    <tr>
                      {inputTypes.map(({ ethnicityType }, i) => {
                        if (i % 2 === 0)
                          return (
                            <th colSpan="2" className="text-center" key={i}>
                              {lookupMap[ethnicityType].ethnicity}
                            </th>
                          );
                      })}
                    </tr>
                    <tr>
                      {inputTypes.map(({ sex }, i) => {
                        return (
                          <th className="text-center" key={i}>
                            {lookupMap[sex].gender}s
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {lookup.race.map((c) => {
                      const keyPrefix = `${cohortId}_${cancerSelected}_${c.id}`;
                      const inputKeys = inputTypes.map(
                        ({ sex, caseType = "prevalent", ethnicityType = "unkonwnEthnicity" }) =>
                          `${keyPrefix}_${lookupMap[ethnicityType].id}_${lookupMap[sex].id}_${lookupMap[caseType].id}`,
                      );

                      return (
                        <tr key={keyPrefix}>
                          <td className="text-nowrap bg-light-grey">{c.race}</td>
                          {inputKeys.map((key, i) => (
                            <td key={key} className={classNames("p-0", submitted && errors[key] && "has-error")}>
                              <Form.Control
                                className="input-number"
                                title={`Cancer Site/Type: ${c.cancer} - ${inputTypes[i].ethnicityType} ${inputTypes[i].sex} cases `}
                                aria-label={`Cancer Site/Type: ${c.cancer} - ${inputTypes[i].ethnicityType} ${inputTypes[i].sex} cases `}
                                type="number"
                                min="0"
                                name={key}
                                value={counts[key] || 0}
                                onChange={(ev) => updateSelectedCancerCounts(ev)}
                                readOnly={isReadOnly}
                              />
                            </td>
                          ))}
                          <td className="text-right bg-light-grey">
                            {subTotals[keyPrefix] ? subTotals[keyPrefix].toLocaleString() : 0}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td className="text-nowrap bg-light-grey">
                        <b>Total</b>
                      </td>
                      {inputTypes.map(({ sex, ethnicityType }, i) => {
                        let subTotalPre = `${cohortId}_${cancerSelected}`;
                        let subtotal_key = `${subTotalPre}_${lookupMap[ethnicityType].id}_${lookupMap[sex].id}`;

                        return (
                          <td className="text-right bg-light-grey" key={i}>
                            {subTotals[subtotal_key] ? subTotals[subtotal_key].toLocaleString() : 0}
                          </td>
                        );
                      })}

                      <td className="text-right bg-light-grey">
                        {subTotals[`${cohortId}_${cancerSelected}`]
                          ? subTotals[`${cohortId}_${cancerSelected}`].toLocaleString()
                          : 0}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </CollapsiblePanel>

            <CollapsiblePanel
              condition={activePanel === "panelB"}
              onClick={() => setActivePanel(activePanel === "panelB" ? "" : "panelB")}
              panelTitle="Cancer Information">
              <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label htmlFor="ci_confirmed_cancer_date" className="required-label">
                  D.2 Please enter the most recent date when confirmed cancer cases were ascertained:
                </Form.Label>

                <div className="w-50">
                  <Reminder message="Required Field" disabled={!errors.ci_confirmed_cancer_date} placement="right">
                    <DatePicker
                      id="ci_confirmed_cancer_date"
                      className="form-control"
                      selected={form.ci_confirmed_cancer_date}
                      readOnly={isReadOnly}
                      maxDate={new Date()}
                      onChange={(value) => setFormValue("ci_confirmed_cancer_date", value)}
                    />
                  </Reminder>
                </div>
                {/* {submitted && errors.ci_confirmed_cancer_date && <span className="help-block">Required Field.</span>} */}
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <span className="required-label">D.3 How were your cancer cases ascertained?</span>
                  <span className="font-weight-normal"> (Select all that apply)</span>
                </Form.Label>
                {submitted && errors.ci_ascertained_type && <span className="ml-3 text-danger">Required Field</span>}

                <div className="mb-3">
                  <CheckedInputs
                    options={[
                      { type: "checkbox", value: 1, name: "ci_ascertained_self_reporting", label: "Self-report" },
                      { type: "checkbox", value: 1, name: "ci_ascertained_tumor_registry", label: "Cancer registry" },
                      {
                        type: "checkbox",
                        value: 1,
                        name: "ci_ascertained_medical_records",
                        label: "Medical record review",
                      },
                      { type: "checkbox", value: 1, name: "ci_ascertained_other", label: "Other (please specify)" },
                    ]}
                  />
                </div>

                <div className={classNames(submitted && errors.ci_ascertained_other_specify && "has-error")}>
                  <Reminder message="Required Field" disabled={!errors.ci_ascertained_other_specify}>
                    <Form.Control
                      as="textarea"
                      className="resize-vertical"
                      aria-label="How were your cancer cases ascertained?"
                      name="ci_ascertained_other_specify"
                      value={form.ci_ascertained_other_specify || ""}
                      onChange={(e) => setFormValue(e.target.name, e.target.value)}
                      placeholder="Max of 300 Characters"
                      maxLength={300}
                      readOnly={isReadOnly}
                      disabled={+form.ci_ascertained_other !== 1}
                    />
                  </Reminder>
                  {/* {submitted && errors.ci_ascertained_other_specify && <span className="help-block">Required Field.</span>} */}
                </div>
              </Form.Group>

              <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label className="required-label">
                  D.4 Did you collect information about cancer recurrence?
                </Form.Label>
                {submitted && errors.ci_cancer_recurrence && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs
                  options={[
                    { value: 0, name: "ci_cancer_recurrence", type: "radio", label: "No" },
                    { value: 1, name: "ci_cancer_recurrence", type: "radio", label: "Yes" },
                  ]}
                />
              </Form.Group>

              <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label className="required-label">
                  D.5 Do you have second/subsequent primary cancer diagnoses?
                </Form.Label>
                {submitted && errors.ci_second_primary_diagnosis && (
                  <span className="ml-3 text-danger">Required Field</span>
                )}

                <CheckedInputs
                  options={[
                    { value: 0, name: "ci_second_primary_diagnosis", type: "radio", label: "No" },
                    { value: 1, name: "ci_second_primary_diagnosis", type: "radio", label: "Yes" },
                  ]}
                />
              </Form.Group>

              <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label className="required-label">D.6 Do you have cancer treatment data?</Form.Label>
                {submitted && errors.ci_cancer_treatment_data && (
                  <span className="ml-3 text-danger">Required Field</span>
                )}

                <CheckedInputs
                  options={[
                    {
                      value: 0,
                      name: "ci_cancer_treatment_data",
                      type: "radio",
                      label: "No (skip the next two questions)",
                    },
                    { value: 1, name: "ci_cancer_treatment_data", type: "radio", label: "Yes" },
                  ]}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <span className="required-label">D.6a Specify the treatment information you have:</span>
                  <span className="font-weight-normal"> (Select all that apply)</span>
                </Form.Label>
                {submitted && errors.ci_treatment_data_type && <span className="ml-3 text-danger">Required Field</span>}

                <div className="mb-3">
                  <CheckedInputs
                    props={{ disabled: +form.ci_cancer_treatment_data === 0 }}
                    options={[
                      { type: "checkbox", value: 1, name: "ci_treatment_data_surgery", label: "Surgery" },
                      { type: "checkbox", value: 1, name: "ci_treatment_data_radiation", label: "Radiation" },
                      { type: "checkbox", value: 1, name: "ci_treatment_data_chemotherapy", label: "Chemotherapy" },
                      {
                        type: "checkbox",
                        value: 1,
                        name: "ci_treatment_data_hormonal_therapy",
                        label: "Hormonal therapy",
                      },
                      {
                        type: "checkbox",
                        value: 1,
                        name: "ci_treatment_data_bone_stem_cell",
                        label: "Bone marrow/stem cell transplant",
                      },
                      { type: "checkbox", value: 1, name: "ci_treatment_data_other", label: "Other (please specify)" },
                    ]}
                  />
                </div>

                <div className={classNames(submitted && errors.ci_treatment_data_other_specify && "has-error")}>
                  <Reminder message="Required Field" disabled={!errors.ci_treatment_data_other_specify}>
                    <Form.Control
                      as="textarea"
                      className="resize-vertical"
                      aria-label="Specify the treatment information you have"
                      name="ci_treatment_data_other_specify"
                      disabled={+form.ci_cancer_treatment_data === 0}
                      value={form.ci_treatment_data_other_specify || ""}
                      onChange={(e) => setFormValue(e.target.name, e.target.value)}
                      placeholder="Max of 200 Characters"
                      maxLength={200}
                      readOnly={isReadOnly}
                      disabled={+form.ci_treatment_data_other !== 1}
                    />
                  </Reminder>
                  {/* {submitted && errors.ci_treatment_data_other_specify && <span className="help-block">Required Field.</span>} */}
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <span className="required-label">
                    D.6b Specify the data sources the treatment information is from:
                  </span>
                  <span className="font-weight-normal"> (Select all that apply)</span>
                </Form.Label>
                {submitted && errors.ci_data_source_type && <span className="ml-3 text-danger">Required Field</span>}

                <div className="mb-3">
                  <CheckedInputs
                    props={{ disabled: +form.ci_cancer_treatment_data === 0 }}
                    options={[
                      {
                        type: "checkbox",
                        value: 1,
                        name: "ci_data_source_admin_claims",
                        label: "Administrative claims data",
                      },
                      {
                        type: "checkbox",
                        value: 1,
                        name: "ci_data_source_electronic_records",
                        label: "Electronic health record",
                      },
                      {
                        type: "checkbox",
                        value: 1,
                        name: "ci_data_source_chart_abstraction",
                        label: "Chart abstraction",
                      },
                      {
                        type: "checkbox",
                        value: 1,
                        name: "ci_data_source_patient_reported",
                        label: "Patient-reported questionnaire",
                      },
                      { type: "checkbox", value: 1, name: "ci_data_source_other", label: "Other (please specify)" },
                    ]}
                  />
                </div>

                <div className={classNames(submitted && errors.ci_data_source_other_specify && "has-error")}>
                  <Reminder message="Required Field" disabled={!errors.ci_data_source_other_specify}>
                    <Form.Control
                      as="textarea"
                      className="resize-vertical"
                      name="ci_data_source_other_specify"
                      aria-label="Specify the data sources the treatment information is from"
                      disabled={+form.ci_cancer_treatment_data === 0}
                      value={form.ci_data_source_other_specify || ""}
                      onChange={(e) => setFormValue(e.target.name, e.target.value)}
                      placeholder="Max of 200 Characters"
                      maxLength={200}
                      readOnly={isReadOnly}
                      disabled={+form.ci_data_source_other !== 1}
                    />
                  </Reminder>
                  {/* {submitted && errors.ci_data_source_other_specify && <span className="help-block">Required Field.</span>} */}
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label className="required-label">
                  D.6c Would it be possible to collect treatment information from medical records or other sources?
                </Form.Label>
                {submitted && errors.ci_collect_other_information && (
                  <span className="ml-3 text-danger">Required Field</span>
                )}

                <CheckedInputs
                  options={[
                    { value: 0, name: "ci_collect_other_information", type: "radio", label: "No" },
                    { value: 1, name: "ci_collect_other_information", type: "radio", label: "Yes" },
                  ]}
                />
              </Form.Group>

              <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label className="required-label">D.7 Do you have cancer staging data?</Form.Label>
                {submitted && errors.ci_cancer_staging_data && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs
                  options={[
                    { value: 0, name: "ci_cancer_staging_data", type: "radio", label: "No" },
                    { value: 1, name: "ci_cancer_staging_data", type: "radio", label: "Yes" },
                  ]}
                />
              </Form.Group>

              <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label className="required-label">D.8 Do you have tumor grade data?</Form.Label>
                {submitted && errors.ci_tumor_grade_data && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs
                  options={[
                    { value: 0, name: "ci_tumor_grade_data", type: "radio", label: "No" },
                    { value: 1, name: "ci_tumor_grade_data", type: "radio", label: "Yes" },
                  ]}
                />
              </Form.Group>

              <Form.Group
                className={classNames(submitted && errors.ci_tumor_genetic_markers_data_describe && "has-error")}>
                <Form.Label className="required-label">D.9 Do you have tumor genetic markers data?</Form.Label>
                {submitted && errors.ci_tumor_genetic_markers_data && (
                  <span className="ml-3 text-danger">Required Field</span>
                )}

                <div className="mb-3">
                  <CheckedInputs
                    options={[
                      { value: 0, name: "ci_tumor_genetic_markers_data", type: "radio", label: "No" },
                      {
                        value: 1,
                        name: "ci_tumor_genetic_markers_data",
                        type: "radio",
                        label: "Yes (please describe)",
                      },
                    ]}
                  />
                </div>

                <div className={classNames(submitted && errors.ci_tumor_genetic_markers_data_describe && "has-error")}>
                  <Reminder message="Required Field" disabled={!errors.ci_tumor_genetic_markers_data_describe}>
                    <Form.Control
                      as="textarea"
                      className="resize-vertical"
                      name="ci_tumor_genetic_markers_data_describe"
                      aria-label="Do you have tumor genetic markers data? Please describe:"
                      length="40"
                      value={form.ci_tumor_genetic_markers_data_describe || ""}
                      onChange={(e) => setFormValue(e.target.name, e.target.value)}
                      placeholder="Max of 200 Characters"
                      maxLength={200}
                      readOnly={isReadOnly}
                      disabled={+form.ci_tumor_genetic_markers_data !== 1}
                    />
                  </Reminder>
                  {/* {submitted && errors.ci_tumor_genetic_markers_data_describe && <span className="help-block">Required Field.</span>} */}
                </div>
              </Form.Group>

              <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label className="required-label">D.10 Were cancer cases histologically confirmed?</Form.Label>
                {submitted && errors.ci_histologically_confirmed && (
                  <span className="ml-3 text-danger">Required Field</span>
                )}

                <CheckedInputs
                  options={[
                    { value: 0, name: "ci_histologically_confirmed", type: "radio", label: "All" },
                    { value: 1, name: "ci_histologically_confirmed", type: "radio", label: "Some" },
                    { value: 2, name: "ci_histologically_confirmed", type: "radio", label: "None" },
                  ]}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  D.11 Do you have histological and/or molecular cancer subtyping?
                  <span className="font-weight-normal"> (Select all that apply)</span>
                </Form.Label>

                <CheckedInputs
                  options={[
                    { type: "checkbox", value: 1, name: "ci_cancer_subtype_histological", label: "Histological" },
                    { type: "checkbox", value: 1, name: "ci_cancer_subtype_molecular", label: "Molecular" },
                  ]}
                />
              </Form.Group>
            </CollapsiblePanel>
          </CollapsiblePanelContainer>
        </Form>

        <ValidationModal show={modal.show} footer={modal.footer} />
        <ReviewModal
          show={reviewModalShow}
          title={<span>Submit for Review</span>}
          body={
            <span>
              This cohort questionnaire will be locked against further modifications once you submit it for review. Are
              you sure you want to continue?
            </span>
          }
          footer={
            <div>
              <Button variant="secondary" className="col-lg-2 col-md-6" onClick={(_) => setReviewModalShow(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                className="col-lg-2 col-md-6"
                onClick={(_) => resetCohortStatus(cohortId, "submitted")}>
                Submit
              </Button>
            </div>
          }
        />

        <QuestionnaireFooter
          isAdmin={isReadOnly}
          handlePrevious={(_) => props.sectionPicker("C")}
          handleNext={(_) => props.sectionPicker("E")}
          handleSave={handleSave}
          handleSaveContinue={handleSaveContinue}
          handleSubmitForReview={handleSubmitForReview}
        />
      </Container>
    )
  );
};

export default CancerInfoForm;
