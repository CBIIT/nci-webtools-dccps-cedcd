import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker';
import classNames from 'classnames'
import allactions from '../../actions'
import { loadCohort } from '../../reducers/cancerInfoReducer';
import { parseISO, format } from 'date-fns';

const CancerInfoForm = ({ ...props }) => {
    const dispatch = useDispatch();
    const lookup = useSelector(state => state.lookupReducer)
    const { counts, form, cohort } = useSelector(state => state.cancerInfoReducer);
   
    const section = useSelector(state => state.sectionReducer)
    const cohortId = useSelector(state => state.cohortIDReducer)
    const cohortStatus = useSelector(state => state.cohortStatusReducer)

    const [activePanel, setActivePanel] = useState('panelA')
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const setCount = (key, value) => dispatch(allactions.cancerInfoActions.setCancerCount(key, value));
    const setFormValue = (key, value) => {
        setErrors(getValidationErrors({...form, [key]: value}));
        dispatch(allactions.cancerInfoActions.setCancerInfoFormValue(key, value))
    };

    const lookupMap = {
        female: lookup && lookup.gender.find(e => e.gender === 'Female').id,
        male: lookup && lookup.gender.find(e => e.gender === 'Male').id,
        incident: lookup && lookup.case_type.find(e => e.case_type === 'incident').id,
        prevalent: lookup && lookup.case_type.find(e => e.case_type === 'prevalent').id,
    }
    //const cohortId = +window.location.pathname.split('/').pop();

    useEffect(() => {
        // load existing cohort
        if (!cohort || +cohort.id !== +cohortId)
            dispatch(loadCohort(cohortId));
    }, []);

    useEffect(() => {
        // once cohort is loaded, populate form
        if (!cohort || !Object.keys(cohort).length || !lookup) 
            return;
            
        let {cancer_count: count, cancer_info: info} = cohort;
        info = {...info[0]} || {};

        // do not rely on the Date(dateString) constructor, as it is inconsistent across browsers
        if (info.ci_confirmed_cancer_date) {
            let date = parseISO(info.ci_confirmed_cancer_date)
            info.ci_confirmed_cancer_date = date !== 'Invalid Date' ? date : null;
        }

        // if no ci_cancer_treatment_data is provided, clear related inputs
        if (+info.ci_cancer_treatment_data === 0) {
            info.ci_treatment_data_surgery = 0;
            info.ci_treatment_data_radiation = 0;
            info.ci_treatment_data_chemotherapy = 0;
            info.ci_treatment_data_hormonal_therapy = 0;
            info.ci_treatment_data_bone_stem_cell = 0;
            info.ci_treatment_data_other = 0;
            info.ci_treatment_data_other_specify = '';

            info.ci_data_source_admin_claims = 0;
            info.ci_data_source_electronic_records = 0;
            info.ci_data_source_chart_abstraction = 0;
            info.ci_data_source_patient_reported = 0;
            info.ci_data_source_other = 0;
            info.ci_data_source_other_specify = '';
        }

        for (let key in info)
            setFormValue(key, info[key]);

        const counts = [];

        // merge unique columns into single key
        for (let {cohort_id, cancer_id, gender_id, case_type_id, cancer_counts} of count) {
            counts.push({
                key: [cohort_id, cancer_id, gender_id, case_type_id].join('_'),
                value: cancer_counts
            })    
        }

        // populate non-existent counts with 0
        for (let c of lookup.cancer) {
            for (let gender of [lookupMap.male, lookupMap.female]) {
                for (let type of [lookupMap.prevalent, lookupMap.incident]) {
                    let key = [cohortId, c.id, gender, type].join('_');
                    if (!counts.find(c => c.key === key))
                        counts.push({key, value: 0})
                }
            }
        }

        // dispatch updated counts
        counts.forEach(c => setCount(c.key, c.value));
    }, [cohort, lookup]);


    function getValidationErrors(form) {
        const isNull =  v =>['', undefined, null].includes(v)
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

            ci_treatment_data_surgery:  +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_surgery),
            ci_treatment_data_radiation:  +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_radiation),
            ci_treatment_data_chemotherapy:  +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_chemotherapy),
            ci_treatment_data_hormonal_therapy: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_hormonal_therapy),
            ci_treatment_data_bone_stem_cell: +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_bone_stem_cell),
            ci_treatment_data_other:  +form.ci_cancer_treatment_data === 1 && isNull(form.ci_treatment_data_other),
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

    async function handleSave() {
        let errors = getValidationErrors(form);
        let hasErrors = Object.entries(errors).length > 0;
        setErrors(errors);
        setSubmitted(true);

        // todo: replace window.confirm/alert with either modals or toasts
        if (!hasErrors || (hasErrors && window.confirm('There are validation errors, are you sure to save?'))) {
            try {
                let info = {...form};

                if (info.ci_confirmed_cancer_date) {
                    const dateTime = info.ci_confirmed_cancer_date.getTime();
                    info.ci_confirmed_cancer_date = format(dateTime, 'yyyy-MM-dd');
                    info.ci_confirmed_cancer_year = format(dateTime, 'yyyy');
                } else {
                    info.ci_confirmed_cancer_date = null;
                    info.ci_confirmed_cancer_year = null;
                }

                await fetch(`/api/questionnaire/update_cancer_info/${cohortId}`, {
                    method: 'POST', 
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify([info])
                }).then(r => r.json());

                await fetch(`/api/questionnaire/update_cancer_count/${cohortId}`, {
                    method: 'POST', 
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify(Object.entries(counts).map(([key, value]) => {
                        let [cohort_id, cancer_id, gender_id, case_type_id] = key.split('_');
                        let cancer_counts = value;
                        return {cohort_id, cancer_id, gender_id, case_type_id, cancer_counts}
                    }))
                }).then(r => r.json());

                await fetch(`/api/questionnaire/cohort/${cohortId}`, {
                    method: 'POST', 
                    headers: {'content-type': 'application/json'},
                    body: JSON.stringify({
                        cohort_edit_status: [{
                            page_code: 'D',
                            status: hasErrors ? 'incomplete' : 'complete'
                        }]
                    })
                }).then(r => r.json());

                dispatch(loadCohort(cohortId));
                window.alert('Your information has been saved.');

            } catch (e) {
                console.log(e);
                window.alert('There was an error processing your request. Please try again later.')
            } finally {
                dispatch(allactions.sectionActions.setSectionStatus(
                    'D', 
                    hasErrors ? 'incomplete' : 'complete')
                )
            }
        }
    }

    async function handleSaveContinue() {
        await handleSave();
        props.sectionPicker('E');
    }

    function CheckedInput({value, name, type, label, className, disabled, onChange}) {
        return <div className={classNames(className || type, disabled && 'disabled')}>
            <label>
                <input 
                    type={type} 
                    name={name} 
                    checked={disabled ? false : form[name] == value} 
                    value={value}
                    disabled={disabled}
                    onChange={e => {
                        setFormValue(
                            e.target.name,
                            type === 'checkbox' 
                                ? (e.target.checked ? 1 : 0)
                                : e.target.value
                        );
                        if (onChange)
                            onChange(e);
                    }} />
                {label}
            </label>
        </div>
    }

    return lookup && <div id="cancerInfoContainer" className="p-3">
        <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>Cancer Counts</div>
        <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'}>
            <div className="my-3">
                <label className="d-block">D.1 Cancer Counts</label>
                <div>Please enter the number of participants with these cancers by sex.</div>
            </div>
            <div className="overflow-auto mb-4">
                <table className='table table-condensed table-nowrap table-valign-middle'>
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
                            const keyPrefix =  `${cohortId}_${c.id}`;
                            const inputKeys = [
                                `${keyPrefix}_${lookupMap.male}_${lookupMap.prevalent}`,
                                `${keyPrefix}_${lookupMap.female}_${lookupMap.prevalent}`,
                                `${keyPrefix}_${lookupMap.male}_${lookupMap.incident}`,
                                `${keyPrefix}_${lookupMap.female}_${lookupMap.incident}`,
                            ];

                            return <tr key={keyPrefix}>
                                <td className={c.icd9 ? "bg-light" : "bg-grey"}>{c.icd9}</td>
                                <td className={c.icd10 ? "bg-light" : "bg-grey"}>{c.icd10}</td>
                                <td className="bg-light">{c.cancer}</td>
                                {inputKeys.map(key => 
                                    <td key={key} className={classNames("p-0", submitted && errors[key] && "has-error")}>
                                        <input 
                                            className="form-control border-0 p-0 bg-transparent text-right"
                                            type="number"  
                                            min="0"
                                            name={key} 
                                            value={counts[key] || 0} 
                                            onChange={ev => setCount(ev.target.name, Math.abs(parseInt(ev.target.value) || 0))} 
                                        />
                                    </td>
                                )}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}>Cancer Information</div>
        <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'}>
            <form>
                <div className={classNames("form-group", submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                        D.2 Most recent date confirmed cancer case ascertainment:
                    </label>
                    <DatePicker 
                        id="ci_confirmed_cancer_date" 
                        className="form-control readonly" 
                        selected={form.ci_confirmed_cancer_date} 
                        onChange={value => setFormValue('ci_confirmed_cancer_date', value)}
                    />
                </div>

                <div className={"form-group"}>
                    <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                        D.3 How were your cancer cases ascertained?
                    </label>

                    {[
                        {type: 'checkbox', value: 1, name: 'ci_ascertained_self_reporting', label: 'Self-report'},
                        {type: 'checkbox', value: 1, name: 'ci_ascertained_tumor_registry', label: 'Cancer registry'},
                        {type: 'checkbox', value: 1, name: 'ci_ascertained_medical_records', label: 'Medical record review'},
                        {type: 'checkbox', value: 1, name: 'ci_ascertained_other', label: 'Other (please specify)'},
                    ].map((props, index) => <CheckedInput {...props} key={`d3-${index}`} />)}

                    {+form.ci_ascertained_other === 1 && <div className={classNames("form-group", submitted && errors.ci_ascertained_other_specify && "has-error")}>
                        <textarea 
                            className="form-control resize-vertical" 
                            name="ci_ascertained_other_specify" 
                            value={form.ci_ascertained_other_specify || ''} 
                            onChange={e => setFormValue(e.target.name, e.target.value)} 
                            maxlength={300}
                        />
                        <span class="help-block">300 Characters Max</span>
                    </div>}
                </div>


                <div className={classNames("form-group", submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                        D.4 Did you collect information about cancer recurrence?
                    </label>
                    {[
                        {value: 0, name: 'ci_cancer_recurrence', type: 'radio', label: 'No'},
                        {value: 1, name: 'ci_cancer_recurrence', type: 'radio', label: 'Yes'},
                    ].map((props, index) => <CheckedInput {...props} key={`d4-${index}`} />)}
                </div>

                <div className={classNames("form-group", submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                        D.5 Do you have second/subsequent primary cancer diagnoses?
                    </label>
                    {[
                        {value: 0, name: 'ci_second_primary_diagnosis', type: 'radio', label: 'No'},
                        {value: 1, name: 'ci_second_primary_diagnosis', type: 'radio', label: 'Yes'},
                    ].map((props, index) => <CheckedInput {...props} key={`d5-${index}`} />)}
                </div>


                <div className={classNames("form-group", submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                        D.6 Do you have cancer treatment data?
                    </label>
                    {[
                        {value: 0, name: 'ci_cancer_treatment_data', type: 'radio', label: 'No (Go to D.6c'},
                        {value: 1, name: 'ci_cancer_treatment_data', type: 'radio', label: 'Yes'},
                    ].map((props, index) => <CheckedInput {...props} key={`d6-${index}`} onChange={e => {
                        if (+e.target.value === 0) {
                            // clear related inputs if "no" is checked
                            let info = {}
                            info.ci_treatment_data_surgery = 0;
                            info.ci_treatment_data_radiation = 0;
                            info.ci_treatment_data_chemotherapy = 0;
                            info.ci_treatment_data_hormonal_therapy = 0;
                            info.ci_treatment_data_bone_stem_cell = 0;
                            info.ci_treatment_data_other = 0;
                            info.ci_treatment_data_other_specify = '';
                
                            info.ci_data_source_admin_claims = 0;
                            info.ci_data_source_electronic_records = 0;
                            info.ci_data_source_chart_abstraction = 0;
                            info.ci_data_source_patient_reported = 0;
                            info.ci_data_source_other = 0;
                            info.ci_data_source_other_specify = '';

                            for (let key in info) {
                                setFormValue(key, info[key])
                            }
                        }
                    }} />)}
                </div>

                <div className="ml-4">
                    
                    <div className={"form-group"}>
                        <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                            D.6a Specify the treatment information you have:
                        </label>

                        {[
                            {type: 'checkbox', value: 1, name: 'ci_treatment_data_surgery', label: 'Surgery'},
                            {type: 'checkbox', value: 1, name: 'ci_treatment_data_radiation', label: 'Radiation'},
                            {type: 'checkbox', value: 1, name: 'ci_treatment_data_chemotherapy', label: 'Chemotherapy'},
                            {type: 'checkbox', value: 1, name: 'ci_treatment_data_hormonal_therapy', label: 'Hormonal therapy'},
                            {type: 'checkbox', value: 1, name: 'ci_treatment_data_bone_stem_cell', label: 'Bone marrow/stem cell transplant'},
                            {type: 'checkbox', value: 1, name: 'ci_treatment_data_other', label: 'Other (please specify)'},
                        ].map((props, index) => <CheckedInput {...props} disabled={+form.ci_cancer_treatment_data === 0} key={`d6a-${index}`} />)}

                        {+form.ci_treatment_data_other === 1 && 
                            <div className={classNames("mb-2", submitted && errors.ci_treatment_data_other_specify && "has-error")}>
                                <textarea 
                                    className="form-control resize-vertical" 
                                    name="ci_treatment_data_other_specify" 
                                    disabled={+form.ci_cancer_treatment_data === 0}
                                    value={form.ci_treatment_data_other_specify || ''} 
                                    onChange={e => setFormValue(e.target.name, e.target.value)} 
                                    maxlength={200}
                                />
                                <span class="help-block">200 Characters Max</span>
                            </div>}
                    </div>

                    <div className={"form-group"}>
                        <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                            D.6b Specify the data sources the treatment information is from:
                        </label>

                        {[
                            {type: 'checkbox', value: 1, name: 'ci_data_source_admin_claims', label: 'Administrative claims data'},
                            {type: 'checkbox', value: 1, name: 'ci_data_source_electronic_records', label: 'Electronic health record'},
                            {type: 'checkbox', value: 1, name: 'ci_data_source_chart_abstraction', label: 'Chart abstraction'},
                            {type: 'checkbox', value: 1, name: 'ci_data_source_patient_reported', label: 'Patient-reported questionnaire'},
                            {type: 'checkbox', value: 1, name: 'ci_data_source_other', label: 'Other (please specify)'},
                        ].map((props, index) => <CheckedInput {...props} disabled={+form.ci_cancer_treatment_data === 0} key={`d6b-${index}`} />)}

                        {+form.ci_data_source_other === 1 && <div className={classNames("mb-2", submitted && errors.ci_data_source_other_specify && "has-error")}>
                            <textarea 
                                className="form-control  resize-vertical" 
                                name="ci_data_source_other_specify" 
                                disabled={+form.ci_cancer_treatment_data === 0}
                                value={form.ci_data_source_other_specify || ''} 
                                onChange={e => setFormValue(e.target.name, e.target.value)} 
                                maxlength={200}
                            />
                            <span class="help-block">200 Characters Max</span>
                        </div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                            D.6c Would it be possible to collect treatment information from medical records or other sources?
                        </label>
                        {[
                            {value: 0, name: 'ci_collect_other_information', type: 'radio', label: 'No'},
                            {value: 1, name: 'ci_collect_other_information', type: 'radio', label: 'Yes'},
                        ].map((props, index) => <CheckedInput {...props} key={`d6c-${index}`} />)}                        
                    </div>
                </div>


                <div className={classNames("form-group", submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                        D.7 Do you have cancer staging data?
                    </label>
                    {[
                        {value: 0, name: 'ci_cancer_staging_data', type: 'radio', label: 'No'},
                        {value: 1, name: 'ci_cancer_staging_data', type: 'radio', label: 'Yes'},
                    ].map((props, index) => <CheckedInput {...props} key={`d7-${index}`} />)}
                </div>                


                <div className={classNames("form-group", submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                        D.8 Do you have tumor grade data?
                    </label>
                    {[
                        {value: 0, name: 'ci_tumor_grade_data', type: 'radio', label: 'No'},
                        {value: 1, name: 'ci_tumor_grade_data', type: 'radio', label: 'Yes'},
                    ].map((props, index) => <CheckedInput {...props} key={`d8-${index}`} />)}
                </div>                

                <div className={classNames("form-group", submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                        D.9 Do you have tumor genetic markers data?
                    </label>
                    {[
                        {value: 0, name: 'ci_tumor_genetic_markers_data', type: 'radio', label: 'No'},
                        {value: 1, name: 'ci_tumor_genetic_markers_data', type: 'radio', label: 'Yes (please describe)'},
                    ].map((props, index) => <CheckedInput {...props} key={`d9-${index}`} />)}


                    {+form.ci_tumor_genetic_markers_data === 1 && 
                        <div className={classNames(submitted && errors.ci_tumor_genetic_markers_data_describe && "has-error")}>
                            <textarea 
                                className="form-control resize-vertical" 
                                name="ci_tumor_genetic_markers_data_describe" 
                                length="40" 
                                value={form.ci_tumor_genetic_markers_data_describe} 
                                onChange={e => setFormValue(e.target.name, e.target.value)} 
                                maxlength={200}
                            />
                            <span class="help-block">200 Characters Max</span>
                        </div>}
                </div>

                <div className={classNames("form-group", submitted && errors.ci_confirmed_cancer_date && "has-error")}>
                    <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                        D.10 Were cancer cases histologically confirmed?
                    </label>
                    {[
                        {value: 0, name: 'ci_histologically_confirmed', type: 'radio', label: 'No'},
                        {value: 1, name: 'ci_histologically_confirmed', type: 'radio', label: 'Some'},
                        {value: 2, name: 'ci_histologically_confirmed', type: 'radio', label: 'All'},
                    ].map((props, index) => <CheckedInput {...props} key={`d10-${index}`} />)}
                </div>

                <div className={"form-group"}>
                    <label htmlFor="ci_confirmed_cancer_date" className="d-block">
                        D.11 Do you have histological and/or molecular cancer subtyping?
                    </label>

                    {[
                        {type: 'checkbox', value: 1, name: 'ci_cancer_subtype_histological', label: 'Histological'},
                        {type: 'checkbox', value: 1, name: 'ci_cancer_subtype_molecular', label: 'Molecular'},
                    ].map((props, index) => <CheckedInput {...props} key={`d11-${index}`} />)}
                </div>                

            </form>

        </div>

        {/* <pre>{JSON.stringify(form, null, 2)}</pre> */}
       {/* please update your code if you don't like my code
        <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={() => props.sectionPicker('C')}>Go Back</button>
            <div>
                <button className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
                <button className="btn btn-primary" onClick={handleSaveContinue}>Save &amp; Continue</button>
            </div>
        </div>
      */}
    
        <div style={{position: 'relative'}}>
            <span  onClick={() => props.sectionPicker('C')} style={{position: 'relative', float: 'left'}}>
                <input type='button' className='btn btn-primary' value='Previous' />
            </span>
            <span style={{position: 'relative', float: 'right'}}>
                <span onClick={handleSave}>
                    <input type='button' className='btn btn-primary' value='Save' />
                </span>
                <span onClick={handleSaveContinue}>
                    <input type='button' className='btn btn-primary' value='Save & Continue' />
                </span>
                <span onClick={() => alert('submitted')}>
                    <input type='button' className='btn btn-primary' value='Submit For Review' disabled = {cohortStatus === 'published' || section.A === 'incomplete' || section.B === 'incomplete' || section.C === 'incomplete' || section.D === 'incomplete' || section.E === 'incomplete' || section.F === 'incomplete' || section.G === 'incomplete'}/>
                </span> 
            </span>
        </div> 
    </div>
}

export default CancerInfoForm