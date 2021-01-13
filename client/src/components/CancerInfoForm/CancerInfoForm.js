import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker';
import classNames from 'classnames'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { postJSON } from '../../services/query';
import allactions from '../../actions'
import { fetchCohort } from '../../reducers/cohort';
import { parseISO, format } from 'date-fns';
import QuestionnaireFooter from '../QuestionnaireFooter/QuestionnaireFooter'
import ValidationModal from '../controls/modal/modal';
import Messenger from '../Snackbar/Snackbar'
import Reminder from '../Tooltip/Tooltip'
import { CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { setHasUnsavedChanges } from '../../reducers/unsavedChangesReducer';
import './CancerInfoForm.css'

const {
    setCancerCount,
    mergeCancerCounts,
    mergeCancerInfoFormValues,
} = allactions.cancerInfoActions;

const CancerInfoForm = ({ ...props }) => {
    const dispatch = useDispatch();
    const cohort = useSelector(state => state.cohort)
    const lookup = useSelector(state => state.lookupReducer)
    const { counts, form } = useSelector(state => state.cancerInfoReducer);
    const isReadOnly = props.isReadOnly;

    const cohortId = useSelector(state => state.cohortIDReducer) || props.cohortId;
    const cohortStatus = useSelector(state => state.cohortStatusReducer)

    const [activePanel, setActivePanel] = useState('panelA')
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modal, setModal] = useState({ show: false });
    const updateModal = state => setModal({ ...modal, ...state });
    const setCount = (key, value) => dispatch(setCancerCount(key, value));
    const setFormValue = (key, value) => {
        const formValues = getUpdatedFormValues({ ...form, [key]: value });
        setErrors(getValidationErrors(formValues));
        dispatch(mergeCancerInfoFormValues(formValues));
    };

    const lookupMap = {
        female: lookup && lookup.gender.find(e => e.gender === 'Female'),
        male: lookup && lookup.gender.find(e => e.gender === 'Male'),
        incident: lookup && lookup.case_type.find(e => e.case_type === 'incident'),
        prevalent: lookup && lookup.case_type.find(e => e.case_type === 'prevalent'),
    }

    useEffect(() => {
        // once cohort is loaded, populate form
        if (!cohort || !Object.keys(cohort).length || !lookup)
            return;

        let {
            cancer_count: cancerCount,
            cancer_info: cancerInfo
        } = cohort;

        // populate counts
        const counts = {};

        for (let cancer of lookup.cancer) {
            for (let gender of [lookupMap.male, lookupMap.female]) {
                for (let caseType of [lookupMap.prevalent, lookupMap.incident]) {
                    const entry = cancerCount.find(count =>
                        +count.cohort_id === +cohortId &&
                        count.cancer_id === cancer.id &&
                        count.gender_id === gender.id &&
                        count.case_type_id === caseType.id
                    );
                    const key = [cohortId, cancer.id, gender.id, caseType.id].join('_');
                    const value = entry ? Math.abs(parseInt(entry.cancer_counts) || 0) : 0;
                    counts[key] = value;
                }
            }
        }

        // process form data
        const formValues = getUpdatedFormValues({ ...cancerInfo[0] });
        // console.log({ formValues })

        dispatch(mergeCancerCounts(counts));
        dispatch(mergeCancerInfoFormValues(formValues));

    }, [cohort, lookup]);

    const resetCohortStatus = (cohortID, nextStatus) => {
        if (['new', 'draft', 'published', 'submitted', 'returned', 'in review'].includes(nextStatus)) {
            fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}`, {
                method: "POST"
            }).then(res => res.json())
                .then(result => {
                    if (result && result.status === 200) {
                        dispatch(({ type: 'SET_COHORT_STATUS', value: nextStatus }))
                    }
                })
        }
    }

    function getUpdatedFormValues(form) {
        let formUpdates = { ...form };

        // do not rely on the Date(dateString) constructor, as it is inconsistent across browsers
        if (form.ci_confirmed_cancer_date && form.ci_confirmed_cancer_date.constructor !== Date) {
            const date = parseISO(form.ci_confirmed_cancer_date)
            console.log(date);
            formUpdates.ci_confirmed_cancer_date = date !== 'Invalid Date' ? date : null;
        }

        if (+form.ci_ascertained_other === 0) {
            formUpdates.ci_ascertained_other_specify = '';
        }

        if (+form.ci_treatment_data_other === 0) {
            formUpdates.ci_treatment_data_other_specify = '';
        }

        if (+form.ci_data_source_other === 0) {
            formUpdates.ci_data_source_other_specify = '';
        }

        if (+form.ci_cancer_treatment_data === 0) {
            formUpdates.ci_treatment_data_surgery = 0;
            formUpdates.ci_treatment_data_radiation = 0;
            formUpdates.ci_treatment_data_chemotherapy = 0;
            formUpdates.ci_treatment_data_hormonal_therapy = 0;
            formUpdates.ci_treatment_data_bone_stem_cell = 0;
            formUpdates.ci_treatment_data_other = 0;
            formUpdates.ci_treatment_data_other_specify = '';

            formUpdates.ci_data_source_admin_claims = 0;
            formUpdates.ci_data_source_electronic_records = 0;
            formUpdates.ci_data_source_chart_abstraction = 0;
            formUpdates.ci_data_source_patient_reported = 0;
            formUpdates.ci_data_source_other = 0;
            formUpdates.ci_data_source_other_specify = '';
        }

        if (+form.ci_tumor_genetic_markers_data === 0) {
            formUpdates.ci_tumor_genetic_markers_data_describe = '';
        }

        return formUpdates;
    }

    function getValidationErrors(form) {
        const isNull = v => ['', undefined, null].includes(v)
        const errors = {
            ci_confirmed_cancer_date: isNull(form.ci_confirmed_cancer_date),

            ci_ascertained_type: [
                form.ci_ascertained_self_reporting,
                form.ci_ascertained_tumor_registry,
                form.ci_ascertained_medical_records,
                form.ci_ascertained_other,
            ].filter(Boolean).length === 0,
            ci_ascertained_other_specify: +form.ci_ascertained_other === 1
                && isNull(form.ci_ascertained_other_specify),

            ci_cancer_recurrence: isNull(form.ci_cancer_recurrence),
            ci_second_primary_diagnosis: isNull(form.ci_second_primary_diagnosis),
            ci_cancer_treatment_data: isNull(form.ci_cancer_treatment_data),

            ci_treatment_data_type: +form.ci_cancer_treatment_data === 1 && [
                form.ci_treatment_data_surgery,
                form.ci_treatment_data_radiation,
                form.ci_treatment_data_chemotherapy,
                form.ci_treatment_data_hormonal_therapy,
                form.ci_treatment_data_bone_stem_cell,
                form.ci_treatment_data_other,
            ].filter(Boolean).length === 0,
            ci_treatment_data_other_specify: +form.ci_cancer_treatment_data === 1
                && +form.ci_treatment_data_other === 1
                && isNull(form.ci_treatment_data_other_specify),

            ci_data_source_type: +form.ci_cancer_treatment_data === 1 && [
                form.ci_data_source_admin_claims,
                form.ci_data_source_electronic_records,
                form.ci_data_source_chart_abstraction,
                form.ci_data_source_patient_reported,
                form.ci_data_source_other,
            ].filter(Boolean).length === 0,
            ci_data_source_other_specify: +form.ci_cancer_treatment_data === 1
                && +form.ci_data_source_other === 1
                && isNull(form.ci_data_source_other_specify),

            ci_collect_other_information: isNull(form.ci_collect_other_information),
            ci_cancer_staging_data: isNull(form.ci_cancer_staging_data),
            ci_tumor_grade_data: isNull(form.ci_tumor_grade_data),
            ci_tumor_genetic_markers_data: isNull(form.ci_tumor_genetic_markers_data),
            ci_tumor_genetic_markers_data_describe: +form.ci_tumor_genetic_markers_data === 1
                && isNull(form.ci_tumor_genetic_markers_data_describe),
            ci_histologically_confirmed: isNull(form.ci_histologically_confirmed),
        };

        for (let key in errors)
            if (!errors[key])
                delete errors[key];

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
                footer: <div>
                    <button className="btn btn-light mx-2" onClick={e => updateModal({ show: false })}>Cancel</button>
                    <button className="btn btn-primary mx-2" onClick={onConfirm}>Save</button>
                </div>
            })
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
            props.sectionPicker('E');
        }

        if (!hasErrors) {
            onConfirm();
        } else {
            updateModal({
                show: true,
                footer: <div>
                    <button className="btn btn-light mx-2" onClick={e => updateModal({ show: false })}>Cancel</button>
                    <button className="btn btn-primary mx-2" onClick={onConfirm}>Save and Continue</button>
                </div>
            });
        }
    }

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
                info.ci_confirmed_cancer_date = format(dateTime, 'yyyy-MM-dd');
                info.ci_confirmed_cancer_year = format(dateTime, 'yyyy');
            } else {
                info.ci_confirmed_cancer_date = null;
                info.ci_confirmed_cancer_year = null;
            }

            const cancerCounts = Object.entries(counts).map(([key, value]) => {
                let [cohort_id, cancer_id, gender_id, case_type_id] = key.split('_');
                let cancer_counts = value;
                return { cohort_id, cancer_id, gender_id, case_type_id, cancer_counts }
            })

            const result = await postJSON(`/api/questionnaire/update_cancer_info/${id}`, [info]);
            if (result && result.data) {
                const { duplicated_cohort_id: newCohortId, status } = result.data;
                // console.log("new id: "+newCohortId)
                // console.log("new stats: "+status)
                if (status && status != cohortStatus) {
                    dispatch(({ type: 'SET_COHORT_STATUS', value: status }))
                    dispatch(fetchCohort(newCohortId)) /* if result.data.status present, duplicated_cohort_id is too */
                } else {
                    
                    if (newCohortId && +newCohortId !== id) {
                        id = newCohortId;
                    }
                }
            }

            await postJSON(`/api/questionnaire/update_cancer_count/${id}`, cancerCounts);

            await postJSON(`/api/questionnaire/cohort/${id}`, {
                cohort_edit_status: [{
                    page_code: 'D',
                    status: hasErrors ? 'incomplete' : 'complete'
                }]
            });

            if (id != cohortId) {
                dispatch(allactions.cohortIDAction.setCohortId(id));
                window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, id));
            }

            dispatch(fetchCohort(id));
            dispatch(setHasUnsavedChanges(false));
            setSuccessMsg(true);

        } catch (e) {
            console.log(e);
            setFailureMsg(true);
        } finally {
            dispatch(allactions.sectionActions.setSectionStatus(
                'D',
                hasErrors ? 'incomplete' : 'complete')
            )
        }
    }

    function CheckedInput({ value, name, type, label, className = '', disabled, onChange }) {
        return (
            <Form.Check
                type={type}
                name={name}
                checked={form[name] === value}
                value={value}
                disabled={disabled}
                onChange={e => {
                    if (isReadOnly)
                        return false;
                    setFormValue(
                        e.target.name,
                        type === 'checkbox'
                            ? (e.target.checked ? 1 : 0)
                            : +e.target.value
                    );
                    dispatch(setHasUnsavedChanges(true));
                    if (onChange)
                        onChange(e);
                }}
                readOnly={isReadOnly}
                label={label}
                id={`${name}_${value}`} />
        );
    }

    function CheckedInputs({ options, props }) {
        return options.map((option, i) => 
            <CheckedInput 
                key={`${option.name}_${option.value}`} 
                {...option}
                {...props} />
        )
    }

    return lookup && <Form id="cancerInfoContainer" className="p-3 px-5">
        {successMsg && <Messenger message='Your changes were saved.' severity='success' open={true} changeMessage={setSuccessMsg} />}
        {failureMsg && <Messenger message='Your changes could not be saved.' severity='warning' open={true} changeMessage={setFailureMsg} />}
        <CollapsiblePanel
            condition={activePanel === 'panelA'}
            onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}
            panelTitle="Cancer Counts">
            <div className="my-3">
                <Form.Label>D.1 Cancer Counts</Form.Label>
                <div>Please enter the number of participants with these cancers by sex.</div>
            </div>
            <div className="table-responsive mb-4">
                <Table bordered condensed className="table-valign-middle">
                    <thead>
                        <tr>
                            <th className="text-center" rowSpan={2}>ICD-9</th>
                            <th className="text-center" rowSpan={2}>ICD-10</th>
                            <th className="text-center" rowSpan={2}>Cancer Site/Type</th>
                            <th className="text-center" colSpan={2}>Males</th>
                            <th className="text-center" colSpan={2}>Females</th>
                        </tr>
                        <tr>
                            <th className="text-center">Prevalent Cases</th>
                            <th className="text-center">Incident Cases</th>
                            <th className="text-center">Prevalent Cases</th>
                            <th className="text-center">Incident Cases</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lookup.cancer.map(c => {
                            const keyPrefix = `${cohortId}_${c.id}`;
                            const inputTypes = [
                                { sex: 'male', caseType: 'prevalent' },
                                { sex: 'male', caseType: 'incident' },
                                { sex: 'female', caseType: 'prevalent' },
                                { sex: 'female', caseType: 'incident' },
                            ]

                            const inputKeys = inputTypes.map(({ sex, caseType }) =>
                                `${keyPrefix}_${lookupMap[sex].id}_${lookupMap[caseType].id}`
                            );

                            return <tr key={keyPrefix}>
                                <td className={classNames("text-nowrap", c.icd9 ? "bg-light-grey" : "bg-grey")}>{c.icd9}</td>
                                <td className={classNames("text-nowrap", c.icd10 ? "bg-light-grey" : "bg-grey")}>{c.icd10}</td>
                                <td className="text-nowrap bg-light-grey">{c.cancer}</td>
                                {inputKeys.map((key, i) =>
                                    <td key={key} className={classNames("p-0", submitted && errors[key] && "has-error")}>
                                        <Form.Control
                                            className="input-number"
                                            title={`Cancer Site/Type: ${c.cancer} - ${inputTypes[i].caseType} ${inputTypes[i].sex} cases `}
                                            aria-label={`Cancer Site/Type: ${c.cancer} - ${inputTypes[i].caseType} ${inputTypes[i].sex} cases `}
                                            type="number"
                                            min="0"
                                            name={key}
                                            value={counts[key] || 0}
                                            onChange={ev => {
                                                setCount(ev.target.name, Math.abs(parseInt(ev.target.value) || 0));
                                                dispatch(setHasUnsavedChanges(true));
                                            }}
                                            readOnly={isReadOnly}
                                        />
                                    </td>
                                )}
                            </tr>
                        })}
                    </tbody>
                </Table>
            </div>
        </CollapsiblePanel>

        <CollapsiblePanel
            condition={activePanel === 'panelB'}
            onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}
            panelTitle="Cancer Information">

            <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label htmlFor="ci_confirmed_cancer_date"  className="required-label">
                    D.2 Please enter the most recent date when confirmed cancer cases were ascertained:
                    </Form.Label>

                <div className="w-50">
                    <Reminder message="Required Field" disabled={!errors.ci_confirmed_cancer_date} placement="right">
                        <DatePicker
                            id="ci_confirmed_cancer_date"
                            className="form-control"
                            selected={form.ci_confirmed_cancer_date}
                            readOnly={isReadOnly}
                            onChange={value => setFormValue('ci_confirmed_cancer_date', value)}
                        />
                    </Reminder>
                </div>
                {/* {submitted && errors.ci_confirmed_cancer_date && <span className="help-block">Required Field.</span>} */}
            </Form.Group>

            <Form.Group>
                <Form.Label className="required-label">
                    D.3 How were your cancer cases ascertained? <small>(Select all that apply)</small>
                </Form.Label>
                {submitted && errors.ci_ascertained_type && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs options={[
                    { type: 'checkbox', value: 1, name: 'ci_ascertained_self_reporting', label: 'Self-report' },
                    { type: 'checkbox', value: 1, name: 'ci_ascertained_tumor_registry', label: 'Cancer registry' },
                    { type: 'checkbox', value: 1, name: 'ci_ascertained_medical_records', label: 'Medical record review' },
                    { type: 'checkbox', value: 1, name: 'ci_ascertained_other', label: 'Other (please specify)' },
                ]} />

                <div className={classNames(submitted && errors.ci_ascertained_other_specify && "has-error")}>
                    <Reminder message="Required Field" disabled={!errors.ci_ascertained_other_specify}>
                        <Form.Control
                            as="textarea"
                            className="resize-vertical"
                            aria-label="How were your cancer cases ascertained?"
                            name="ci_ascertained_other_specify"
                            value={form.ci_ascertained_other_specify || ''}
                            onChange={e => setFormValue(e.target.name, e.target.value)}
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

                <CheckedInputs options={[
                    { value: 0, name: 'ci_cancer_recurrence', type: 'radio', label: 'No' },
                    { value: 1, name: 'ci_cancer_recurrence', type: 'radio', label: 'Yes' },
                ]} />
            </Form.Group>

            <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label className="required-label">
                    D.5 Do you have second/subsequent primary cancer diagnoses?
                </Form.Label>
                {submitted && errors.ci_second_primary_diagnosis && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs options={[
                    { value: 0, name: 'ci_second_primary_diagnosis', type: 'radio', label: 'No' },
                    { value: 1, name: 'ci_second_primary_diagnosis', type: 'radio', label: 'Yes' },
                ]} />
            </Form.Group>


            <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label className="required-label">
                    D.6 Do you have cancer treatment data?
                </Form.Label>
                {submitted && errors.ci_cancer_treatment_data && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs options={[
                    { value: 0, name: 'ci_cancer_treatment_data', type: 'radio', label: 'No (skip the next two questions)' },
                    { value: 1, name: 'ci_cancer_treatment_data', type: 'radio', label: 'Yes' },
                ]} />
            </Form.Group>


            <Form.Group>
                <Form.Label className="required-label">
                    D.6a Specify the treatment information you have <small>(Select all that apply)</small>:
                </Form.Label>
                {submitted && errors.ci_treatment_data_type && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs 
                    props={{disabled: +form.ci_cancer_treatment_data === 0}}
                    options={[
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_surgery', label: 'Surgery' },
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_radiation', label: 'Radiation' },
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_chemotherapy', label: 'Chemotherapy' },
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_hormonal_therapy', label: 'Hormonal therapy' },
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_bone_stem_cell', label: 'Bone marrow/stem cell transplant' },
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_other', label: 'Other (please specify)' },
                    ]} />

                <div className={classNames(submitted && errors.ci_treatment_data_other_specify && "has-error")}>
                    <Reminder message="Required Field" disabled={!errors.ci_treatment_data_other_specify}>
                        <Form.Control
                            as="textarea"
                            className="resize-vertical"
                            aria-label="Specify the treatment information you have"
                            name="ci_treatment_data_other_specify"
                            disabled={+form.ci_cancer_treatment_data === 0}
                            value={form.ci_treatment_data_other_specify || ''}
                            onChange={e => setFormValue(e.target.name, e.target.value)}
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
                <Form.Label className="required-label">
                    D.6b Specify the data sources the treatment information is from <small>(Select all that apply)</small>:
                </Form.Label>
                {submitted && errors.ci_data_source_type && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs 
                    props={{disabled: +form.ci_cancer_treatment_data === 0}}
                    options={[
                        { type: 'checkbox', value: 1, name: 'ci_data_source_admin_claims', label: 'Administrative claims data' },
                        { type: 'checkbox', value: 1, name: 'ci_data_source_electronic_records', label: 'Electronic health record' },
                        { type: 'checkbox', value: 1, name: 'ci_data_source_chart_abstraction', label: 'Chart abstraction' },
                        { type: 'checkbox', value: 1, name: 'ci_data_source_patient_reported', label: 'Patient-reported questionnaire' },
                        { type: 'checkbox', value: 1, name: 'ci_data_source_other', label: 'Other (please specify)' },
                    ]} />

                <div className={classNames(submitted && errors.ci_data_source_other_specify && "has-error")}>
                    <Reminder message="Required Field" disabled={!errors.ci_data_source_other_specify}>
                        <Form.Control
                            as="textarea"
                            className="resize-vertical"
                            name="ci_data_source_other_specify"
                            aria-label="Specify the data sources the treatment information is from"
                            disabled={+form.ci_cancer_treatment_data === 0}
                            value={form.ci_data_source_other_specify || ''}
                            onChange={e => setFormValue(e.target.name, e.target.value)}
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
                {submitted && errors.ci_collect_other_information && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs options={[
                    { value: 0, name: 'ci_collect_other_information', type: 'radio', label: 'No' },
                    { value: 1, name: 'ci_collect_other_information', type: 'radio', label: 'Yes' },
                ]} />
            </Form.Group>


            <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label className="required-label">
                    D.7 Do you have cancer staging data?
                </Form.Label>
                {submitted && errors.ci_cancer_staging_data && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs options={[
                    { value: 0, name: 'ci_cancer_staging_data', type: 'radio', label: 'No' },
                    { value: 1, name: 'ci_cancer_staging_data', type: 'radio', label: 'Yes' },
                ]} />
            </Form.Group>


            <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                <Form.Label className="required-label">
                    D.8 Do you have tumor grade data?
                </Form.Label>
                {submitted && errors.ci_tumor_grade_data && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs options={[
                    { value: 0, name: 'ci_tumor_grade_data', type: 'radio', label: 'No' },
                    { value: 1, name: 'ci_tumor_grade_data', type: 'radio', label: 'Yes' },
                ]} />
            </Form.Group>

            <Form.Group className={classNames(submitted && errors.ci_tumor_genetic_markers_data_describe && "has-error")}>
                <Form.Label className="required-label">
                    D.9 Do you have tumor genetic markers data?
                </Form.Label>
                {submitted && errors.ci_tumor_genetic_markers_data && <span className="ml-3 text-danger">Required Field</span>}
                
                <CheckedInputs options={[
                    { value: 0, name: 'ci_tumor_genetic_markers_data', type: 'radio', label: 'No' },
                    { value: 1, name: 'ci_tumor_genetic_markers_data', type: 'radio', label: 'Yes (please describe)' },
                ]} />

                <div className={classNames(submitted && errors.ci_tumor_genetic_markers_data_describe && "has-error")}>
                    <Reminder message="Required Field" disabled={!errors.ci_tumor_genetic_markers_data_describe}>
                        <Form.Control
                            as="textarea"
                            className="resize-vertical"
                            name="ci_tumor_genetic_markers_data_describe"
                            aria-label="Do you have tumor genetic markers data? Please describe:"
                            length="40"
                            value={form.ci_tumor_genetic_markers_data_describe || ''}
                            onChange={e => setFormValue(e.target.name, e.target.value)}
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
                <Form.Label className="required-label">
                    D.10 Were cancer cases histologically confirmed?
                </Form.Label>
                {submitted && errors.ci_histologically_confirmed && <span className="ml-3 text-danger">Required Field</span>}

                <CheckedInputs options={[
                    { value: 0, name: 'ci_histologically_confirmed', type: 'radio', label: 'No' },
                    { value: 1, name: 'ci_histologically_confirmed', type: 'radio', label: 'Some' },
                    { value: 2, name: 'ci_histologically_confirmed', type: 'radio', label: 'All' },
                ]} />
            </Form.Group>

            <Form.Group>
                <Form.Label>
                    D.11 Do you have histological and/or molecular cancer subtyping? <small>(Select all that apply)</small>
                </Form.Label>

                <CheckedInputs options={[
                    { type: 'checkbox', value: 1, name: 'ci_cancer_subtype_histological', label: 'Histological' },
                    { type: 'checkbox', value: 1, name: 'ci_cancer_subtype_molecular', label: 'Molecular' },
                ]} />
            </Form.Group>
        </ CollapsiblePanel>

        <ValidationModal show={modal.show} footer={modal.footer} />

        <QuestionnaireFooter
            isAdmin={isReadOnly}
            handlePrevious={_ => props.sectionPicker('C')}
            handleNext={_ => props.sectionPicker('E')} 
            handleSave={handleSave}
            handleSaveContinue={handleSaveContinue}
            handleSubmitForReview={_ => resetCohortStatus(cohortId, 'submitted')}
        />
    </Form>
}

export default CancerInfoForm