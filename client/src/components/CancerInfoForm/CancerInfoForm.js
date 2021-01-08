import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker';
import classNames from 'classnames'
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import allactions from '../../actions'
import { loadCohort } from '../../reducers/cancerInfoReducer';
import { parseISO, format } from 'date-fns';
import CenterModal from '../controls/modal/modal';
import Messenger from '../Snackbar/Snackbar'
import Reminder from '../Tooltip/Tooltip'
import { CollapsiblePanel } from '../controls/collapsable-panels/collapsable-panels';
import { fetchCohort } from '../../reducers/cohort';
import './CancerInfoForm.css'

const {
    setCancerCount,
    mergeCancerCounts,
    mergeCancerInfoFormValues,
} = allactions.cancerInfoActions;

const CancerInfoForm = ({ ...props }) => {
    const dispatch = useDispatch();
    const lookup = useSelector(state => state.lookupReducer)
    const { counts, form, cohort } = useSelector(state => state.cancerInfoReducer);
    const isReadOnly = props.isReadOnly;

    const section = useSelector(state => state.sectionReducer)
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
        // load existing cohort if needed
        if (!cohort || +cohort.id !== +cohortId)
            dispatch(loadCohort(cohortId));
    }, []);

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
        console.log({ formValues })

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

            ci_ascertained_self_reporting: isNull(form.ci_ascertained_self_reporting),
            ci_ascertained_tumor_registry: isNull(form.ci_ascertained_tumor_registry),
            ci_ascertained_medical_records: isNull(form.ci_ascertained_medical_records),
            ci_ascertained_other: isNull(form.ci_ascertained_other),
            ci_ascertained_other_specify: +form.ci_ascertained_other === 1
                && isNull(form.ci_ascertained_other_specify),

            ci_cancer_recurrence: isNull(form.ci_cancer_recurrence),
            ci_second_primary_diagnosis: isNull(form.ci_second_primary_diagnosis),
            ci_cancer_treatment_data: isNull(form.ci_cancer_treatment_data),

            ci_treatment_data_surgery: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_surgery),
            ci_treatment_data_radiation: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_radiation),
            ci_treatment_data_chemotherapy: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_chemotherapy),
            ci_treatment_data_hormonal_therapy: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_hormonal_therapy),
            ci_treatment_data_bone_stem_cell: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_bone_stem_cell),
            ci_treatment_data_other: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_other),
            ci_treatment_data_other_specify: +form.ci_cancer_treatment_data === 1
                && +form.ci_treatment_data_other === 1
                && isNull(form.ci_treatment_data_other_specify),

            ci_data_source_admin_claims: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_data_source_admin_claims),
            ci_data_source_electronic_records: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_data_source_electronic_records),
            ci_data_source_chart_abstraction: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_data_source_chart_abstraction),
            ci_data_source_patient_reported: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_data_source_patient_reported),
            ci_data_source_other: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_data_source_other),
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
            ci_cancer_subtype_histological: isNull(form.ci_cancer_subtype_histological),
            ci_cancer_subtype_molecular: isNull(form.ci_cancer_subtype_molecular),
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
                header: <span>Confirmation Required</span>,
                body: <div>There were validation errors. Do you still wish to save your current progress?</div>,
                footer: <div>
                    <button className="btn btn-secondary mx-2" onClick={e => updateModal({ show: false })}>Cancel</button>
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
                header: <span>Confirmation Required</span>,
                body: <div>There were validation errors. Do you still wish to save your current progress and continue to the next section?</div>,
                footer: <div>
                    <button className="btn btn-secondary mx-2" onClick={e => updateModal({ show: false })}>Cancel</button>
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

            await fetch(`/api/questionnaire/update_cancer_info/${id}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify([info])
            }).then(r => r.json())
                .then(result => {
                    if (result && result.data) {
                        const { duplicated_cohort_id: newCohortId, status } = result.data;
                        // console.log("new id: "+newCohortId)
                        // console.log("new stats: "+status)
                        if (status && status != cohortStatus){
                            dispatch(({type: 'SET_COHORT_STATUS', value: status})) 
                            dispatch(fetchCohort(newCohortId)) /* if result.data.status present, duplicated_cohort_id is too */
                        } else{
                        if (newCohortId && +newCohortId !== id){
                                id = newCohortId;
                                dispatch(allactions.cohortIDAction.setCohortId(newCohortId))
                                window.history.pushState(null, 'Cancer Epidemiology Descriptive Cohort Database (CEDCD)', window.location.pathname.replace(/\d+$/, result.data.duplicated_cohort_id))
                            }
                        }
                        //dispatch({ type: 'SET_COHORT_STATUS', value: status })
                    }
                });

            await fetch(`/api/questionnaire/update_cancer_count/${id}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(Object.entries(counts).map(([key, value]) => {
                    let [cohort_id, cancer_id, gender_id, case_type_id] = key.split('_');
                    let cancer_counts = value;
                    return { cohort_id, cancer_id, gender_id, case_type_id, cancer_counts }
                }))
            }).then(r => r.json());

            await fetch(`/api/questionnaire/cohort/${id}`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    cohort_edit_status: [{
                        page_code: 'D',
                        status: hasErrors ? 'incomplete' : 'complete'
                    }]
                })
            }).then(r => r.json());

            dispatch(loadCohort(id));
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
                checked={disabled ? false : +form[name] === +value}
                value={value}
                disabled={disabled}
                onChange={e => {
                    if (isReadOnly) 
                        return false;
                    setFormValue(
                        e.target.name,
                        type === 'checkbox'
                            ? (e.target.checked ? 1 : 0)
                            : e.target.value
                    );
                    if (onChange)
                        onChange(e);
                }}
                readOnly={isReadOnly} 
                label={label}
                id={`${name}_${value}`} />
        );
    }

    return lookup && <Form id="cancerInfoContainer" className="p-3 px-5">
        {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
        {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
        <CollapsiblePanel
            condition={activePanel === 'panelA'}
            onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}
            panelTitle="Cancer Counts">
            <div className="my-3">
                <Form.Label>D.1 Cancer Counts</Form.Label>
                <div>Please enter the number of participants with these cancers by sex.</div>
            </div>
            <div className="table-responsive mb-4">
                <Table striped bordered condensed>
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
                                            onChange={ev => setCount(ev.target.name, Math.abs(parseInt(ev.target.value) || 0))}
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
                    <Form.Label htmlFor="ci_confirmed_cancer_date">
                        D.2 Please enter the most recent date when confirmed cancer cases were ascertained: *
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
                    <Form.Label>
                        D.3 How were your cancer cases ascertained? <small>(Select all that apply)</small>
                    </Form.Label>

                    {[
                        { type: 'checkbox', value: 1, name: 'ci_ascertained_self_reporting', label: 'Self-report' },
                        { type: 'checkbox', value: 1, name: 'ci_ascertained_tumor_registry', label: 'Cancer registry' },
                        { type: 'checkbox', value: 1, name: 'ci_ascertained_medical_records', label: 'Medical record review' },
                        { type: 'checkbox', value: 1, name: 'ci_ascertained_other', label: 'Other (please specify)' },
                    ].map((props, index) => <CheckedInput {...props} key={`d3-${index}`} />)}

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
                    <Form.Label>
                        D.4 Did you collect information about cancer recurrence?
                    </Form.Label>
                    {[
                        { value: 0, name: 'ci_cancer_recurrence', type: 'radio', label: 'No' },
                        { value: 1, name: 'ci_cancer_recurrence', type: 'radio', label: 'Yes' },
                    ].map((props, index) => <CheckedInput {...props} key={`d4-${index}`} />)}
                </Form.Group>

                <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <Form.Label>
                        D.5 Do you have second/subsequent primary cancer diagnoses?
                    </Form.Label>
                    {[
                        { value: 0, name: 'ci_second_primary_diagnosis', type: 'radio', label: 'No' },
                        { value: 1, name: 'ci_second_primary_diagnosis', type: 'radio', label: 'Yes' },
                    ].map((props, index) => <CheckedInput {...props} key={`d5-${index}`} />)}
                </Form.Group>


                <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <Form.Label>
                        D.6 Do you have cancer treatment data?
                    </Form.Label>
                    {[
                        { value: 0, name: 'ci_cancer_treatment_data', type: 'radio', label: 'No (skip the next two questions)' },
                        { value: 1, name: 'ci_cancer_treatment_data', type: 'radio', label: 'Yes' },
                    ].map((props, index) => <CheckedInput {...props} key={`d6-${index}`} />)}
                </Form.Group>


                <Form.Group>
                    <Form.Label>
                        D.6a Specify the treatment information you have <small>(Select all that apply)</small>:
                    </Form.Label>

                    {[
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_surgery', label: 'Surgery' },
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_radiation', label: 'Radiation' },
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_chemotherapy', label: 'Chemotherapy' },
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_hormonal_therapy', label: 'Hormonal therapy' },
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_bone_stem_cell', label: 'Bone marrow/stem cell transplant' },
                        { type: 'checkbox', value: 1, name: 'ci_treatment_data_other', label: 'Other (please specify)' },
                    ].map((props, index) => <CheckedInput {...props} disabled={+form.ci_cancer_treatment_data === 0} key={`d6a-${index}`} />)}

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
                    <Form.Label>
                        D.6b Specify the data sources the treatment information is from <small>(Select all that apply)</small>:
                    </Form.Label>

                    {[
                        { type: 'checkbox', value: 1, name: 'ci_data_source_admin_claims', label: 'Administrative claims data' },
                        { type: 'checkbox', value: 1, name: 'ci_data_source_electronic_records', label: 'Electronic health record' },
                        { type: 'checkbox', value: 1, name: 'ci_data_source_chart_abstraction', label: 'Chart abstraction' },
                        { type: 'checkbox', value: 1, name: 'ci_data_source_patient_reported', label: 'Patient-reported questionnaire' },
                        { type: 'checkbox', value: 1, name: 'ci_data_source_other', label: 'Other (please specify)' },
                    ].map((props, index) => <CheckedInput {...props} disabled={+form.ci_cancer_treatment_data === 0} key={`d6b-${index}`} />)}

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
                    <Form.Label>
                        D.6c Would it be possible to collect treatment information from medical records or other sources?
                    </Form.Label>
                    {[
                        { value: 0, name: 'ci_collect_other_information', type: 'radio', label: 'No' },
                        { value: 1, name: 'ci_collect_other_information', type: 'radio', label: 'Yes' },
                    ].map((props, index) => <CheckedInput {...props} key={`d6c-${index}`} />)}
                </Form.Group>


                <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <Form.Label>
                        D.7 Do you have cancer staging data?
                    </Form.Label>
                    {[
                        { value: 0, name: 'ci_cancer_staging_data', type: 'radio', label: 'No' },
                        { value: 1, name: 'ci_cancer_staging_data', type: 'radio', label: 'Yes' },
                    ].map((props, index) => <CheckedInput {...props} key={`d7-${index}`} />)}
                </Form.Group>


                <Form.Group className={classNames(submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <Form.Label>
                        D.8 Do you have tumor grade data?
                    </Form.Label>
                    {[
                        { value: 0, name: 'ci_tumor_grade_data', type: 'radio', label: 'No' },
                        { value: 1, name: 'ci_tumor_grade_data', type: 'radio', label: 'Yes' },
                    ].map((props, index) => <CheckedInput {...props} key={`d8-${index}`} />)}
                </Form.Group>

                <Form.Group className={classNames(submitted && errors.ci_tumor_genetic_markers_data_describe && "has-error")}>
                    <Form.Label>
                        D.9 Do you have tumor genetic markers data?
                    </Form.Label>
                    {[
                        { value: 0, name: 'ci_tumor_genetic_markers_data', type: 'radio', label: 'No' },
                        { value: 1, name: 'ci_tumor_genetic_markers_data', type: 'radio', label: 'Yes (please describe)' },
                    ].map((props, index) => <CheckedInput {...props} key={`d9-${index}`} />)}

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
                    <Form.Label>
                        D.10 Were cancer cases histologically confirmed?
                    </Form.Label>
                    {[
                        { value: 0, name: 'ci_histologically_confirmed', type: 'radio', label: 'No' },
                        { value: 1, name: 'ci_histologically_confirmed', type: 'radio', label: 'Some' },
                        { value: 2, name: 'ci_histologically_confirmed', type: 'radio', label: 'All' },
                    ].map((props, index) => <CheckedInput {...props} key={`d10-${index}`} />)}
                </Form.Group>

                <Form.Group>
                    <Form.Label>
                        D.11 Do you have histological and/or molecular cancer subtyping? <small>(Select all that apply)</small>
                    </Form.Label>

                    {[
                        { type: 'checkbox', value: 1, name: 'ci_cancer_subtype_histological', label: 'Histological' },
                        { type: 'checkbox', value: 1, name: 'ci_cancer_subtype_molecular', label: 'Molecular' },
                    ].map((props, index) => <CheckedInput {...props} key={`d11-${index}`} />)}
                </Form.Group>
        </ CollapsiblePanel>

        <CenterModal
            show={modal.show}
            title={modal.title || <span>Confirmation Required</span>}
            body={modal.body || <div>There were validation errors. Do you still wish to save your current progress?</div>}
            footer={modal.footer || <div>
                <button className="btn btn-secondary mx-2" onClick={e => updateModal({ show: false })}>Cancel</button>
                <button className="btn btn-primary mx-2" onClick={e => updateModal({ show: false })}>Save</button>
            </div>}
        />
        {<div style={{ position: 'relative' }} className="my-4">
            <span className='col-md-6 col-xs-12' style={{ position: 'relative', float: 'left', paddingLeft: '0', paddingRight: '0' }}>
                <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Previous' onClick={() => props.sectionPicker('C')} />
                <input type='button' className='col-md-3 col-xs-6 btn btn-primary' value='Next' onClick={() => props.sectionPicker('E')} />
            </span>

            {!isReadOnly ? <>
                <span className='col-md-6 col-xs-12' style={{ position: 'relative', float: window.innerWidth <= 1000 ? 'left' : 'right', paddingLeft: '0', paddingRight: '0' }}>
                    <span className='col-xs-4' onClick={handleSave} style={{ margin: '0', padding: '0' }}>
                        <input type='button' className='col-xs-12 btn btn-primary' value='Save' disabled={['submitted', 'in review'].includes(cohortStatus)} />
                    </span>
                    <span className='col-xs-4' onClick={handleSaveContinue} style={{ margin: '0', padding: '0' }}>
                        <input type='button' className='col-xs-12 btn btn-primary' value='Save & Continue' disabled={['submitted', 'in review'].includes(cohortStatus)} style={{ marginRight: '5px', marginBottom: '5px' }} />
                    </span>
                    <span className='col-xs-4' onClick={() => resetCohortStatus(cohortId, 'submitted')} style={{ margin: '0', padding: '0' }}><input type='button' className='col-xs-12 btn btn-primary' value='Submit For Review' disabled={['published', 'submitted', 'in review'].includes(cohortStatus) || section.A === 'incomplete' || section.B === 'incomplete' || section.C === 'incomplete' || section.D === 'incomplete' || section.E === 'incomplete' || section.F === 'incomplete' || section.G === 'incomplete'} /></span>
                </span>
            </> : <>
                <span className='col-md-6 col-xs-12' style={{ position: 'relative', paddingLeft: '0', paddingRight: '0' }}>
                    <input type='button' className='col-md-3 col-xs-6 btn btn-primary' style={{float: 'right'}} value='Approve' disabled />
                    <input type='button' className='col-md-3 col-xs-6 btn btn-primary' style={{float: 'right'}} value='Reject' disabled />
                </span>            
            </>}
        </div>}
    </Form>
}

export default CancerInfoForm