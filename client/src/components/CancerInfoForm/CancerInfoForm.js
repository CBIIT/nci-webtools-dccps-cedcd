import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DatePicker from 'react-datepicker';
import classNames from 'classnames'
import allactions from '../../actions'

const CancerInfoForm = ({ ...props }) => {
    const dispatch = useDispatch();
    const lookup = useSelector(state => state.lookupReducer)
    const { counts, form } = useSelector(state => state.cancerInfoReducer);
    const setFormValue = (key, value) => dispatch(allactions.cancerInfoActions.setCancerInfoFormValue(key, value));
    const setCount = (key, value) => dispatch(allactions.cancerInfoActions.setCancerCount(key, value));
    const lookupMap = {
        female: lookup && lookup.gender.find(e => e.gender === 'Female').id,
        male: lookup && lookup.gender.find(e => e.gender === 'Male').id,
        incident: lookup && lookup.case_type.find(e => e.case_type === 'incident').id,
        prevalent: lookup && lookup.case_type.find(e => e.case_type === 'prevalent').id,
    }
    const cohortId = 79;

    const [activePanel, setActivePanel] = useState('panelA')
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const getValidationErrors = (form) => {
        const isNull =  v =>['', undefined, null].includes(v)
        const errors = {
            ci_confirmed_cancer_year: isNull(form.ci_confirmed_cancer_year),

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

    const handleSave = () => {
        const errors = getValidationErrors(form);
        console.log(errors);




        /* if(Object.entries(errors).length === 0)
             saveEnrollment(79)
         else{
             //setDisplay('block')
             if(window.confirm('there are validation errors, are you sure to save?'))
                 saveEnrollment(79)
         }*/



    }

    const handleSaveContinue = () => {
        handleSave();
        props.sectionPicker('E');

        /*
        if(Object.entries(errors).length === 0|| window.confirm('there are validation errors, are you sure to save and proceed?')){
            saveEnrollment(79, true)}
            */
    }

    return lookup && <div id="cancerInfoContainer" className="p-3">
        <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>Cancer Counts (D.1)</div>
        <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'}>
            <p className="strong mt-3">D.1 Cancer Counts</p>
            <p>Please enter the number of participants with these cancers by sex </p>
            <div className="overflow-x-auto mb-4">
                <table className='table table-nowrap table-valign-middle'>
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
                                <td>{c.icd9}</td>
                                <td>{c.icd10}</td>
                                <td>{c.cancer}</td>
                                {inputKeys.map(key => 
                                    <td className="p-0" key={key}>
                                        <input 
                                            class="form-control input-lg border-0 text-right" 
                                            type="number"  
                                            min="0"
                                            name={key} 
                                            value={counts[key]} 
                                            onChange={ev => setCount(ev.target.name, ev.target.value)} 
                                        />
                                    </td>
                                )}
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>

        <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}>Cancer Information (D.2 - D.11)</div>
        <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'}>
            <form class="form-horizontal mt-3">
                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.2</strong>
                        Most recent date confirmed cancer case ascertainment:
                    </label>
                    <div className="col-md-6">
                        <DatePicker id="d2" className='form-control mr-3' />
                        (MM/DD/YYYY)
                    </div>
                </div>
                ci_confirmed_cancer_year



                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.3</strong>
                        How were your cancer cases ascertained?
                    </label>
                    <div className="col-md-6">
                        <div className="row mb-2">
                            <div className="col-md-6 radio">Self-report</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_ascertained_self_reporting" checked={+form.ci_ascertained_self_reporting === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_ascertained_self_reporting" checked={+form.ci_ascertained_self_reporting === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Cancer registry</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_ascertained_tumor_registry" checked={+form.ci_ascertained_tumor_registry === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}/>No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_ascertained_tumor_registry" checked={+form.ci_ascertained_tumor_registry === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)}/>Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Medical record review</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_ascertained_medical_records"  checked={+form.ci_ascertained_medical_records === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_ascertained_medical_records"  checked={+form.ci_ascertained_medical_records === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Other</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_ascertained_other" checked={+form.ci_ascertained_other === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_ascertained_other" checked={+form.ci_ascertained_other === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes, specify</label>
                            </div>
                        </div>

                        {+form.ci_ascertained_other === 1 && <div className="row mb-2">
                            <div className="col-md-6">
                                <input className="form-control" name="ci_ascertained_other_specify" value={form.ci_ascertained_other_specify} onChange={e => setFormValue(e.target.name, e.target.value)} />
                            </div>
                        </div>}
                    </div>
                </div>


                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.4</strong>
                        Did you collect information about cancer recurrence?
                    </label>
                    <div className="col-md-6">
                        <div className="row mb-2">
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_cancer_recurrence" checked={+form.ci_cancer_recurrence === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_cancer_recurrence" checked={+form.ci_cancer_recurrence === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>
                    </div>
                </div>
                


                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.5</strong>
                        Do you have second/subsequent primary cancer diagnoses?
                    </label>
                    <div className="col-md-6">
                        <div className="row mb-2">
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_second_primary_diagnosis" checked={+form.ci_second_primary_diagnosis === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_second_primary_diagnosis" checked={+form.ci_second_primary_diagnosis === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>
                    </div>
                </div>
                


                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.6</strong>
                        Do you have cancer treatment data?
                    </label>
                    <div className="col-md-6">
                        <div className="row mb-2">
                            <div className="col-md-4 radio">
                                <label><input type="radio"  name="ci_cancer_treatment_data"  checked={+form.ci_cancer_treatment_data === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}/>No (Go to D.6c)</label>
                            </div>
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_cancer_treatment_data"  checked={+form.ci_cancer_treatment_data === 1}  value="1" onChange={e => setFormValue(e.target.name, e.target.value)}/>Yes</label>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.6a</strong>
                        Specify the treatment information you have:
                    </label>
                    <div className="col-md-6">

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Surgery</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_surgery" checked={+form.ci_treatment_data_surgery === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_surgery" checked={+form.ci_treatment_data_surgery === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Radiation</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_radiation" checked={+form.ci_treatment_data_radiation === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_radiation" checked={+form.ci_treatment_data_radiation === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Chemotherapy</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_chemotherapy" checked={+form.ci_treatment_data_chemotherapy === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_chemotherapy" checked={+form.ci_treatment_data_chemotherapy === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Hormonal therapy</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_hormonal_therapy" checked={+form.ci_treatment_data_hormonal_therapy === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}  />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_hormonal_therapy" checked={+form.ci_treatment_data_hormonal_therapy === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>

                        
                        <div className="row mb-2">
                            <div className="col-md-6 radio">Bone marrow/stem cell transplant</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_bone_stem_cell" checked={+form.ci_treatment_data_bone_stem_cell === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}/>No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_bone_stem_cell" checked={+form.ci_treatment_data_bone_stem_cell === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>                        

                        
                        <div className="row mb-2">
                            <div className="col-md-6 radio">Other</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_other" checked={+form.ci_treatment_data_other === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_treatment_data_other" checked={+form.ci_treatment_data_other === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes, specify</label>
                            </div>
                        </div>                        

                        {+form.ci_treatment_data_other === 1 && <div className="row mb-2">
                            <div className="col-md-6">
                                <input className="form-control" name="ci_treatment_data_other_specify" value={form.ci_treatment_data_other_specify} onChange={e => setFormValue(e.target.name, e.target.value)} />
                            </div>
                        </div>}                        

                    </div>
                </div>

                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.6b</strong>
                        Specify the data sources the treatment information is from: 
                    </label>
                    <div className="col-md-6">

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Administrative claims data</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_data_source_admin_claims" checked={+form.ci_data_source_admin_claims === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}  />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_data_source_admin_claims" checked={+form.ci_data_source_admin_claims === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Electronic health record</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_data_source_electronic_records" checked={+form.ci_data_source_electronic_records === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}/>No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_data_source_electronic_records" checked={+form.ci_data_source_electronic_records === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)}/>Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Chart abstraction</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_data_source_chart_abstraction" checked={+form.ci_data_source_chart_abstraction === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}/>No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_data_source_chart_abstraction" checked={+form.ci_data_source_chart_abstraction === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)}/>Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Patient-reported questionnaire</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_data_source_patient_reported" checked={+form.ci_data_source_patient_reported === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_data_source_patient_reported" checked={+form.ci_data_source_patient_reported === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)}/>Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Other</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_data_source_other" checked={+form.ci_data_source_other === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-3 radio">
                            <label><input type="radio" name="ci_data_source_other" checked={+form.ci_data_source_other === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes, specify</label>
                            </div>
                        </div>

                        
                        {+form.ci_data_source_other === 1 && <div className="row mb-2">
                            <div className="col-md-6">
                                <input className="form-control" name="ci_data_source_other_specify" value={form.ci_data_source_other_specify} onChange={e => setFormValue(e.target.name, e.target.value)} />
                            </div>
                        </div>}      
                    </div>
                </div>                



                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.6c</strong>
                        Would it be possible to collect treatment information from medical records or other sources?
                    </label>
                    <div className="col-md-6">
                        <div className="row mb-2">
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_collect_other_information" checked={+form.ci_collect_other_information === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_collect_other_information"  checked={+form.ci_collect_other_information === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>
                    </div>                    
                </div>     
 

                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.7</strong>
                        Do you have cancer staging data?
                    </label>
                    <div className="col-md-6">
                        <div className="row mb-2">
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_cancer_staging_data" checked={+form.ci_cancer_staging_data === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}/>No</label>
                            </div>
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_cancer_staging_data" checked={+form.ci_cancer_staging_data === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)}/>Yes</label>
                            </div>
                        </div>
                    </div>                    
                </div>     

                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.8</strong>
                        Do you have tumor grade data?
                    </label>
                    <div className="col-md-6">
                        <div className="row mb-2">
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_tumor_grade_data"  checked={+form.ci_tumor_grade_data === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_tumor_grade_data"  checked={+form.ci_tumor_grade_data === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>
                    </div>          
                </div>     
                


                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.9</strong>
                        Do you have tumor genetic markers data?
                    </label>
                    <div className="col-md-6">
                        <div className="row mb-2">
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_tumor_genetic_markers_data"  checked={+form.ci_tumor_genetic_markers_data === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)} />No</label>
                            </div>
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_tumor_genetic_markers_data"  checked={+form.ci_tumor_genetic_markers_data === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)} />Yes</label>
                            </div>
                        </div>
                    </div>          
                </div>     
                

                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.10</strong>
                        Were cancer cases histologically confirmed?
                    </label>
                    <div className="col-md-6">
                        <div className="row mb-2">
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_histologically_confirmed" checked={+form.ci_histologically_confirmed === 2} value="2" onChange={e => setFormValue(e.target.name, e.target.value)} />All</label>
                            </div>
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_histologically_confirmed" checked={+form.ci_histologically_confirmed === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)}  />Some</label>
                            </div>
                            <div className="col-md-4 radio">
                                <label><input type="radio" name="ci_histologically_confirmed" checked={+form.ci_histologically_confirmed === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}  />None</label>
                            </div>
                        </div>
                    </div>          
                </div>
                

                <div class="row mb-4 py-3 hover-highlight">
                    <label htmlFor="d2" className="col-md-6 control-label text-left font-weight-normal">
                        <strong className="mr-1">D.11</strong>
                        Do you have cancer subtyping?
                    </label>
                    <div className="col-md-6">

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Histological</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_cancer_subtype_histological" checked={+form.ci_cancer_subtype_histological === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}  />No</label>
                            </div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_cancer_subtype_histological" checked={+form.ci_cancer_subtype_histological === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)}  />Yes</label>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-6 radio">Molecular</div>
                            <div className="col-md-3 radio">
                                <label><input type="radio" name="ci_cancer_subtype_molecular" checked={+form.ci_cancer_subtype_molecular === 0} value="0" onChange={e => setFormValue(e.target.name, e.target.value)}  />No</label>
                            </div>
                            <div className="col-md-3 radio">
                            <label><input type="radio" name="ci_cancer_subtype_molecular" checked={+form.ci_cancer_subtype_molecular === 1} value="1" onChange={e => setFormValue(e.target.name, e.target.value)}  />Yes</label>
                            </div>
                        </div>

                    </div>          
                </div>

            </form>
        </div>

        <pre>{JSON.stringify(form, null, 2)}</pre>

        <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={() => props.sectionPicker('C')}>Go Back</button>
            <div>
                <button className="btn btn-primary mr-2" onClick={handleSave}>Save</button>
                <button className="btn btn-primary" onClick={handleSaveContinue}>Save &amp; Continue</button>
            </div>
        </div>
    </div>
}

export default CancerInfoForm