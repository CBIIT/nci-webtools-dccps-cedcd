import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch, batch} from 'react-redux'
import allactions from '../../actions'


const MajorContentForm = ({...props}) => {
    const majorContent = useSelector(state => state.majorContentReducer)
    const dispatch = useDispatch()
    const [activePanel, setActivePanel] = useState('panelA')
    const [saved, setSaved] = useState(false)
    const [errors, setErrors] = useState({
        seStatusBaseLine: true,
        seStatusFollowUp: true,
        educationBaseLine: true,
        educationFollowUp: true,
        maritalStatusBaseLine: true,
        maritalStatusFollowUp: true,
        originBaseLine: true,
        originFollowUp: true,
        empStatusBaseLine: true,
        empStatusFollowUp: true,
        insuranceStatusBaseLine: true,
        insuranceStatusFollowUp: true,
        anthropometryBaseLine: true,
        anthropometryFollowUp: true,
        dietaryBaseLine: true,
        dietaryFollowUp: true,
        supplementBaseLine: true,
        supplementFollowUp: true,
        medicineBaseLine: true,
        medicineFollowUp: true,
        prescriptionBaseLine: true,
        prescriptionFollowUp: true,
        nonprescriptionBaseLine: true,
        nonprescriptionFollowUp: true,
        alcoholBaseLine: true,
        alcoholFollowUp: true,
        cigaretteBaseLine: true,
        cigaretteFollowUp: true,

        cigarBaseLine: true,
        cigarFollowUp: true,
        pipeBaseLine: true,
        pipeFollowUp: true,
        tobaccoBaseLine: true,
        tobaccoFollowUp: true,
        ecigarBaseLine: true,
        ecigarFollowUp: true,
        noncigarOtherBaseLine: true,
        noncigarOtherFollowUp: true,

        noncigarBaseLineSpecify: true,
        noncigarFollowUpSpecify: true,
        physicalBaseLine: true,
        physicalFollowUp: true,
        sleepBaseLine: true,
        sleepFollowUp: true,
        reproduceBaseLine: true,
        reproduceFollowUp: true,
        reportedHealthBaseLine: true,
        reportedHealthFollowUp: true,
        lifeBaseLine: true,
        lifeFollowUp: true,
        socialSupportBaseLine: true,
        socialSupportFollowUp: true,
        cognitionBaseLine: true,
        cognitionFollowUp: true,
        depressionBaseLine: true,
        depressionFollowUp: true,
        psychosocialBaseLine: true,
        psychosocialFollowUp: true,
        fatigueBaseLine: true,
        fatigueFollowUp: true,
        cancerHistoryBaseLine: true,
        cancerHistoryFollowUp: true,
        cancerPedigreeBaseLine: true,
        cancerPedigreeFollowUp: true,
        physicalMeasureBaseLine: true,
        physicalMeasureFollowUp: true,
        exposureBaseLine: true,
        exposureFollowUp: true,
        residenceBaseLine: true,
        residenceFollowUp: true,
        diabetesBaseLine: true,
        diabetesFollowUp: true,
        strokeBaseLine: true,
        strokeFollowUp: true,
        copdBaseLine: true,
        copdFollowUp: true,
        cardiovascularBaseLine: true,
        cardiovascularFollowUp: true,
        osteoporosisBaseLine: true,
        osteoporosisFollowUp: true,
        mentalBaseLine: true,
        mentalFollowUp: true,
        cognitiveDeclineBaseLine: true,
        cognitiveDeclineFollowUp: true, 
        cancerToxicity: true,
        cancerLateEffects: true,
        cancerSymptom: true,
        cancerOther: true,
        cancerOtherSpecify: true
    })
    

    useEffect(() => {
        if(!majorContent.hasLoaded){
            fetch('/api/questionnaire/major_content/79', {
                method: 'POST'
            }).then(res => res.json())
            .then(result => {
                console.dir(result)
                let content = result.data.counts
                let cancerInfo = result.data.cancerInfo
                let shadow = {...errors}
                let changed = false
                batch(()=> {
                    dispatch(allactions.majorContentActions.setSeStatusBaseLine(content[0].baseline))
                    dispatch(allactions.majorContentActions.setSeStatusFollowUp(content[0].followup))
                    dispatch(allactions.majorContentActions.setEducationBaseLine(content[1].baseline))
                    dispatch(allactions.majorContentActions.setEducationFollowUp(content[1].followup))
                    dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(content[2].baseline))
                    dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(content[2].followup))
                    dispatch(allactions.majorContentActions.setOriginBaseLine(content[3].baseline))
                    dispatch(allactions.majorContentActions.setOriginFollowUp(content[3].followup))
                    dispatch(allactions.majorContentActions.setEmpStatusBaseLine(content[4].baseline))
                    dispatch(allactions.majorContentActions.setEmpStatusFollowUp(content[4].followup))
                    dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(content[5].baseline))
                    dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(content[5].followup))
                    dispatch(allactions.majorContentActions.setAnthropometryBaseLine(content[6].baseline))
                    dispatch(allactions.majorContentActions.setAnthropometryFollowUp(content[6].followup))
                    dispatch(allactions.majorContentActions.setDietaryBaseLine(content[7].baseline))
                    dispatch(allactions.majorContentActions.setDietaryFollowUp(content[7].followup))
                    dispatch(allactions.majorContentActions.setSupplementBaseLine(content[8].baseline))
                    dispatch(allactions.majorContentActions.setSupplementFollowUp(content[8].followup))
                    dispatch(allactions.majorContentActions.setMedicineBaseLine(content[9].baseline))
                    dispatch(allactions.majorContentActions.setMedicineFollowUp(content[9].followup))
                    dispatch(allactions.majorContentActions.setPrescriptionBaseLine(content[10].baseline))
                    dispatch(allactions.majorContentActions.setPrescriptionFollowUp(content[10].followup))
                    dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(content[11].baseline))
                    dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(content[11].followup))
                    dispatch(allactions.majorContentActions.setAlcoholBaseLine(content[12].baseline))
                    dispatch(allactions.majorContentActions.setAlcoholFollowUp(content[12].followup))
                    dispatch(allactions.majorContentActions.setCigaretteBaseLine(content[13].baseline))
                    dispatch(allactions.majorContentActions.setCigaretteFollowUp(content[13].followup))
                    dispatch(allactions.majorContentActions.setCigarBaseLine(content[14].baseline))
                    dispatch(allactions.majorContentActions.setCigarFollowUp(content[14].followup))
                    dispatch(allactions.majorContentActions.setPipeBaseLine(content[15].baseline))
                    dispatch(allactions.majorContentActions.setPipeFollowUp(content[15].followup))
                    dispatch(allactions.majorContentActions.setTobaccoBaseLine(content[16].baseline))
                    dispatch(allactions.majorContentActions.setTobaccoFollowUp(content[16].followup))
                    dispatch(allactions.majorContentActions.setEcigarBaseLine(content[17].baseline))
                    dispatch(allactions.majorContentActions.setEcigarFollowUp(content[17].followup))
                    dispatch(allactions.majorContentActions.setNoncigarOtherBaseLine(content[18].baseline))
                    dispatch(allactions.majorContentActions.setNoncigarOtherFollowUp(content[18].followup))
                    dispatch(allactions.majorContentActions.setPhysicalBaseLine(content[19].baseline))
                    dispatch(allactions.majorContentActions.setPhysicalFollowUp(content[19].followup))
                    dispatch(allactions.majorContentActions.setSleepBaseLine(content[20].baseline))
                    dispatch(allactions.majorContentActions.setSleepFollowUp(content[20].followup))
                    dispatch(allactions.majorContentActions.setReproduceBaseLine(content[21].baseline))
                    dispatch(allactions.majorContentActions.setReproduceFollowUp(content[21].followup))
                    dispatch(allactions.majorContentActions.setReportedHealthBaseLine(content[22].baseline))
                    dispatch(allactions.majorContentActions.setReportedHealthFollowUp(content[22].followup))
                    dispatch(allactions.majorContentActions.setLifeBaseLine(content[23].baseline))
                    dispatch(allactions.majorContentActions.setLifeFollowUp(content[23].followup))
                    dispatch(allactions.majorContentActions.setSocialSupportBaseLine(content[24].baseline))
                    dispatch(allactions.majorContentActions.setSocialSupportFollowUp(content[24].followup))
                    dispatch(allactions.majorContentActions.setCognitionBaseLine(content[25].baseline))
                    dispatch(allactions.majorContentActions.setCognitionFollowUp(content[25].followup))
                    dispatch(allactions.majorContentActions.setDepressionBaseLine(content[26].baseline))
                    dispatch(allactions.majorContentActions.setDepressionFollowUp(content[26].followup))
                    dispatch(allactions.majorContentActions.setPsychosocialBaseLine(content[27].baseline))
                    dispatch(allactions.majorContentActions.setPsychosocialFollowUp(content[27].followup))
                    dispatch(allactions.majorContentActions.setFatigueBaseLine(content[28].baseline))
                    dispatch(allactions.majorContentActions.setFatigueFollowUp(content[28].followup))
                    dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(content[29].baseline))
                    dispatch(allactions.majorContentActions.setCancerHistoryFollowUp(content[29].followup))
                    dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(content[30].baseline))
                    dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(content[30].followup))

                    dispatch(allactions.majorContentActions.setExposureBaseLine(content[31].baseline))
                    dispatch(allactions.majorContentActions.setExposureFollowUp(content[31].followup))
                    dispatch(allactions.majorContentActions.setResidenceBaseLine(content[32].baseline))
                    dispatch(allactions.majorContentActions.setResidenceFollowUp(content[32].followup))
                    dispatch(allactions.majorContentActions.setDiabetesBaseLine(content[33].baseline))
                    dispatch(allactions.majorContentActions.setDiabetesFollowUp(content[33].followup))
                    dispatch(allactions.majorContentActions.setStrokeBaseLine(content[34].baseline))
                    dispatch(allactions.majorContentActions.setStrokeFollowUp(content[34].followup))
                    dispatch(allactions.majorContentActions.setCopdBaseLine(content[35].baseline))
                    dispatch(allactions.majorContentActions.setCopdFollowUp(content[35].followup))
                    dispatch(allactions.majorContentActions.setCardiovascularBaseLine(content[36].baseline))
                    dispatch(allactions.majorContentActions.setCardiovascularFollowUp(content[36].followup))
                    dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(content[37].baseline))
                    dispatch(allactions.majorContentActions.setOsteoporosisFollowUp(content[37].followup))
                    dispatch(allactions.majorContentActions.setMentalBaseLine(content[38].baseline))
                    dispatch(allactions.majorContentActions.setMentalFollowUp(content[38].followup))
                    dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(content[39].baseline))
                    dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(content[39].followup))
                    dispatch(allactions.majorContentActions.setCancerToxicity(cancerInfo.cancerToxicity))
                    dispatch(allactions.majorContentActions.setCancerLateEffects(cancerInfo.cancerLateEffects))
                    dispatch(allactions.majorContentActions.setCancerSymptom(cancerInfo.cancerSymptom))
                    dispatch(allactions.majorContentActions.setCancerOther(cancerInfo.cancerOther))
                    dispatch(allactions.majorContentActions.setCancerOtherSpecify(cancerInfo.setCancerOtherSpecify))
                    dispatch(allactions.majorContentActions.setHasLoaded(true))
                })//end of batch

                if(content[0].baseline in [0, 1]){shadow.seStatusBaseLine = false; changed = true;}
                if(content[0].followup in [0, 1]){shadow.seStatusFollowUp = false; changed = true;}
                if(content[1].baseline in [0, 1]){shadow.educationBaseLine = false; changed = true;}
                if(content[1].followup in [0, 1]){shadow.educationFollowUp = false; changed = true;}
                if(content[2].baseline in [0, 1]){shadow.maritalStatusBaseLine = false; changed = true;}
                if(content[2].followup in [0, 1]){shadow.maritalStatusFollowUp = false; changed = true;}
                if(content[3].baseline in [0, 1]){shadow.originBaseLine = false; changed = true;}
                if(content[3].followup in [0, 1]){shadow.originFollowUp = false; changed = true;}
                if(content[4].baseline in [0, 1]){shadow.empStatusBaseLine = false; changed = true;}
                if(content[4].followup in [0, 1]){shadow.empStatusFollowUp = false; changed = true;}
                if(content[5].baseline in [0, 1]){shadow.insuranceStatusBaseLine = false; changed = true;}
                if(content[5].followup in [0, 1]){shadow.insuranceStatusFollowUp = false; changed = true;}
                if(content[6].baseline in [0, 1]){shadow.anthropometryBaseLine = false; changed = true;}
                if(content[6].followup in [0, 1]){shadow.anthropometryFollowUp = false; changed = true;}
                if(content[7].baseline in [0, 1]){shadow.dietaryBaseLine = false; changed = true;}
                if(content[7].followup in [0, 1]){shadow.dietaryFollowUp = false; changed = true;}
                if(content[8].baseline in [0, 1]){shadow.supplementBaseLine = false; changed = true;}
                if(content[8].followup in [0, 1]){shadow.supplementFollowUp = false; changed = true;}
                if(content[9].baseline in [0, 1]){shadow.medicineBaseLine = false; changed = true;}
                if(content[9].followup in [0, 1]){shadow.medicineFollowUp = false; changed = true;}
                if(content[10].baseline in [0, 1]){shadow.prescriptionBaseLine = false; changed = true;}
                if(content[10].followup in [0, 1]){shadow.prescriptionFollowUp = false; changed = true;}
                if(content[11].baseline in [0, 1]){shadow.nonprescriptionBaseLine = false; changed = true;}
                if(content[11].followup in [0, 1]){shadow.nonprescriptionFollowUp = false; changed = true;}
                if(content[12].baseline in [0, 1]){shadow.alcoholBaseLine = false; changed = true;}
                if(content[12].followup in [0, 1]){shadow.alcoholFollowUp = false; changed = true;}
                if(content[13].baseline in [0, 1]){shadow.cigaretteBaseLine = false; changed = true;}
                if(content[13].followup in [0, 1]){shadow.cigaretteFollowUp = false; changed = true;}
                if(content[14].baseline || content[15].baseline || content[16].baseline || content[17].baseline || content[18].baseline)
                {shadow.nonCigarBaseLine = false; changed = true;}
                if(content[14].followup || content[15].followup || content[16].followup || content[17].followup || content[18].followup)
                {shadow.nonCigarFollowup = false; changed = true;}
                if(content[19].baseline in [0, 1]){shadow.physicalBaseLine = false; changed = true;}
                if(content[19].followup in [0, 1]){shadow.physicalFollowUp = false; changed = true;}
                if(content[20].baseline in [0, 1]){shadow.sleepBaseLine = false; changed = true;}
                if(content[20].followup in [0, 1]){shadow.sleepFollowUp = false; changed = true;}
                if(content[21].baseline in [0, 1]){shadow.reproduceBaseLine = false; changed = true;}
                if(content[21].followup in [0, 1]){shadow.reproduceFollowUp = false; changed = true;}
                if(content[22].baseline in [0, 1]){shadow.reportedHealthBaseLine = false; changed = true;}
                if(content[22].followup in [0, 1]){shadow.reportedHealthFollowUp = false; changed = true;}
                if(content[23].baseline in [0, 1]){shadow.lifeBaseLine = false; changed = true;}
                if(content[23].followup in [0, 1]){shadow.lifeFollowUp = false; changed = true;}
                if(content[24].baseline in [0, 1]){shadow.socialSupportBaseLine = false; changed = true;}
                if(content[24].followup in [0, 1]){shadow.socialSupportFollowUp = false; changed = true;}
                if(content[25].baseline in [0, 1]){shadow.cognitionBaseLine = false; changed = true;}
                if(content[25].followup in [0, 1]){shadow.cognitionFollowUp = false; changed = true;}
                if(content[26].baseline in [0, 1]){shadow.depressionBaseLine = false; changed = true;}
                if(content[26].followup in [0, 1]){shadow.depressionFollowUp = false; changed = true;}
                if(content[27].baseline in [0, 1]){shadow.psychosocialBaseLine = false; changed = true;}
                if(content[27].followup in [0, 1]){shadow.psychosocialFollowUp = false; changed = true;}
                if(content[28].baseline in [0, 1]){shadow.fatigueBaseLine = false; changed = true;}
                if(content[28].followup in [0, 1]){shadow.fatigueFollowUp = false; changed = true;}
                if(content[29].baseline in [0, 1]){shadow.cancerHistoryBaseLine = false; changed = true;}
                if(content[29].followup in [0, 1]){shadow.cancerHistoryFollowUp = false; changed = true;}
                if(content[30].baseline in [0, 1]){shadow.cancerPedigreeBaseLine = false; changed = true;}
                if(content[30].followup in [0, 1]){shadow.cancerPedigreeFollowUp = false; changed = true;}

                if(content[31].baseline in [0, 1]){shadow.exposureBaseLine = false; changed = true;}
                if(content[31].followup in [0, 1]){shadow.exposureFollowUp = false; changed = true;}
                if(content[32].baseline in [0, 1]){shadow.residenceBaseLine = false; changed = true;}
                if(content[32].followup in [0, 1]){shadow.residenceFollowUp = false; changed = true;}
                if(content[33].baseline in [0, 1]){shadow.diabetesBaseLine = false; changed = true;}
                if(content[33].followup in [0, 1]){shadow.diabetesFollowUp = false; changed = true;}
                if(content[34].baseline in [0, 1]){shadow.strokeBaseLine = false; changed = true;}
                if(content[34].followup in [0, 1]){shadow.strokeFollowUp = false; changed = true;}
                if(content[35].baseline in [0, 1]){shadow.copdBaseLine = false; changed = true;}
                if(content[35].followup in [0, 1]){shadow.copdFollowUp = false; changed = true;}
                if(content[36].baseline in [0, 1]){shadow.cardiovascularBaseLine = false; changed = true;}
                if(content[36].followup in [0, 1]){shadow.cardiovascularFollowUp = false; changed = true;}
                if(content[37].baseline in [0, 1]){shadow.osteoporosisBaseLine = false; changed = true;}
                if(content[37].followup in [0, 1]){shadow.osteoporosisFollowUp = false; changed = true;}
                if(content[38].baseline in [0, 1]){shadow.mentalBaseLine = false; changed = true;}
                if(content[38].followup in [0, 1]){shadow.mentalFollowUp = false; changed = true;}
                if(content[39].baseline in [0, 1]){shadow.cognitiveDeclineBaseLine = false; changed = true;}
                if(content[39].followup in [0, 1]){shadow.cognitiveDeclineFollowUp = false; changed = true;}
                if(content[40].baseline in [0, 1]){shadow.physicalMeasureBaseLine = false; changed = true;}
                if(content[40].followup in [0, 1]){shadow.physicalMeasureFollowUp = false; changed = true;}

                if(cancerInfo.cancerToxicity || cancerInfo.cancerSymptom || cancerInfo.cancerLateEffects || cancerInfo.cancerOther)
                {shadow.otherCancerConditions = false; changed = true;}
                if(changed) setErrors(shadow)
            })//end of then
        }//end of if
    }, [])

    const saveMajorContent = (id, proceed=false) => {
        fetch(`/api/questionnaire/update_major_content/${id}`, {
            method: 'POST',
            body: JSON.stringify(majorContent),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result.status)
           if(result.status === 200){
                console.log('success')
                
                if(Object.entries(errors).length === 0)
                    dispatch(allactions.sectionActions.setSectionStatus('C', 'complete'))
                else{
                    dispatch(allactions.sectionActions.setSectionStatus('C', 'incomplete'))
                }

                if(!proceed)
                    alert('Data was successfully saved')
                else
                    props.sectionPicker('D')
            }else{
                alert(result.message) 
            }
           
        })
    }

    const handleSave = () => {
        setSaved(true)
        let hasErrors = false
        for(let k of Object.keys(errors)){ hasErrors |= errors[k]}
        if(!hasErrors){
            majorContent.sectionCStatus='complete'
            dispatch(allactions.majorContentActions.setSectionCStatus('complete'))
            saveMajorContent(79)
        }
        else{
            //setDisplay('block')
            if(window.confirm('there are validation errors, are you sure to save?')){
                majorContent.sectionCStatus='incomplete'
                dispatch(allactions.majorContentActions.setSectionCStatus('incomplete'))
                saveMajorContent(79)
            }
        }
    }

    const handleSaveContinue = () => {
        if(Object.entries(errors).length === 0){
            majorContent.sectionCStatus='complete'
            dispatch(allactions.majorContentActions.setSectionCStatus('complete'))
            saveMajorContent(79, true)
        }
        else{
            if(window.confirm('there are validation errors, are you sure to save?')){
                majorContent.sectionAStatus='incomplete'
                dispatch(allactions.majorContentActions.setSectionCStatus('incomplete'))
                saveMajorContent(79, true)
            }
        }
    }

    return <div className='col-md-12'>
        <div className='col-md-12' style={{display: 'flex', flexDirection: 'column'}}>           
            <div style={{marginTop: '20px', marginBottom: '20px'}}>
                <span>Please specify whether you collected data within these major content domains. Baseline refers to deta collected at or near enrollment into the cohort</span>
            </div>
            <div>
                <form>
                    <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}><span>Major Content Domains</span></div>
                    <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'} style={{padding: 0}}>
                    <table className='table table-stripe table-responsive table-borderless'>
                        <thead>
                            <tr>
                                <th className='col-sm-5' style={{textAlign: 'center'}}>Did you collect data on</th>
                                <th className='col-sm-3' style={{textAlign: 'center'}}>Collected at baseline<span style={{color: 'red'}}>*</span></th>
                                <th className='col-sm-3' style={{textAlign: 'center'}}>Collected during follow-up<span style={{color: 'red'}}>*</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td style={{backgroundColor: errors.seStatusBaseLine && saved ? 'lightcoral' : 'white'}} > 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setSeStatusBaseLine(0)); setErrors({...errors, seStatusBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setSeStatusBaseLine(1)); setErrors({...errors, seStatusBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.seStatusFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setSeStatusFollowUp(0)); setErrors({...errors, seStatusFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setSeStatusFollowUp(1)); setErrors({...errors, seStatusFollowUp: false})}}/>{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.2 Education Level</span></td>
                                <td style={{backgroundColor: errors.educationBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='educationBaseLine' checked={majorContent.educationBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setEducationBaseLine(0)); setErrors({...errors, educationBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='educationBaseLine' checked={majorContent.educationBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setEducationBaseLine(1)); setErrors({...errors, educationBaseLine: false})}}/>{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.educationFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='educationFollowUp' checked={majorContent.educationFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setEducationFollowUp(0)); setErrors({...errors, educationFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='educationFollowUp' checked={majorContent.educationFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setEducationFollowUp(1)); setErrors({...errors, educationFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.3 Marital Status</span></td>
                                <td style={{backgroundColor: errors.maritalStatusBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(0)); setErrors({...errors, maritalStatusBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='maritalStatusBaseLine' checked={majorContent.maritalStatusBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setMaritalStatusBaseLine(1)); setErrors({...errors, maritalStatusBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.maritalStatusFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(0)); setErrors({...errors, maritalStatusFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='maritalStatusFollowUp' checked={majorContent.maritalStatusFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setMaritalStatusFollowUp(1)); setErrors({...errors, maritalStatusFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.4 Language/Country origin</span></td>
                                <td style={{backgroundColor: errors.originBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='originBaseLine' checked={majorContent.originBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setOriginBaseLine(0)); setErrors({...errors, originBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='originBaseLine' checked={majorContent.originBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setOriginBaseLine(1)); setErrors({...errors, originBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.originFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='originFollowUp' checked={majorContent.originFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setOriginFollowUp(0)); setErrors({...errors, originFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='originFollowUp' checked={majorContent.originFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setOriginFollowUp(1)); setErrors({...errors, originFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.5 Employment Status</span></td>
                                <td style={{backgroundColor: errors.empStatusBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='empStatusBaseLine' checked={majorContent.empStatusBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setEmpStatusBaseLine(0)); setErrors({...errors, empStatusBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='empStatusBaseLine' checked={majorContent.empStatusBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setEmpStatusBaseLine(1)); setErrors({...errors, empStatusBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.empStatusFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setEmpStatusFollowUp(0)); setErrors({...errors, empStatusFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='empStatusFollowUp' checked={majorContent.empStatusFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setEmpStatusFollowUp(1)); setErrors({...errors, empStatusFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.6 Health Insurance Status</span></td>
                                <td style={{backgroundColor: errors.insuranceStatusBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(0)); setErrors({...errors, insuranceStatusBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='insuranceStatusBaseLine' checked={majorContent.insuranceStatusBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setInsuranceStatusBaseLine(1)); setErrors({...errors, insuranceStatusBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.insuranceStatusFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(0)); setErrors({...errors, insuranceStatusFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='insuranceStatusFollowUp' checked={majorContent.insuranceStatusFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setInsuranceStatusFollowUp(1)); setErrors({...errors, insuranceStatusFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>

                            <tr>
                                <td><span>C.7 Anthropometry(e.g. weight, height)</span></td>
                                <td style={{backgroundColor: errors.anthropometryBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setAnthropometryBaseLine(0)); setErrors({...errors, anthropometryBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='anthropometryBaseLine' checked={majorContent.anthropometryBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setAnthropometryBaseLine(1)); setErrors({...errors, anthropometryBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.anthropometryFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setAnthropometryFollowUp(0)); setErrors({...errors, anthropometryFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='anthropometryFollowUp' checked={majorContent.anthropometryFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setAnthropometryFollowUp(1)); setErrors({...errors, anthropometryFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.8 Dietary Intake</span></td>
                                <td style={{backgroundColor: errors.dietaryBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setDietaryBaseLine(0)); setErrors({...errors, dietaryBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='dietaryBaseLine' checked={majorContent.dietaryBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setDietaryBaseLine(1)); setErrors({...errors, dietaryBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.dietaryFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setDietaryFollowUp(0)); setErrors({...errors, dietaryFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='dietaryFollowUp' checked={majorContent.dietaryFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setDietaryFollowUp(1)); setErrors({...errors, dietaryFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.9 Dietary Supplement Use</span></td>
                                <td style={{backgroundColor: errors.supplementBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='supplementBaseLine' checked={majorContent.supplementBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setSupplementBaseLine(0)); setErrors({...errors, supplementBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='supplementBaseLine' checked={majorContent.supplementBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setSupplementBaseLine(1)); setErrors({...errors, supplementBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.supplementFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='supplementFollowUp' checked={majorContent.supplementFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setSupplementFollowUp(0)); setErrors({...errors, supplementFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='supplementFollowUp' checked={majorContent.supplementFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setSupplementFollowUp(1)); setErrors({...errors, supplementFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C.10 Complementary and Alternative Medicine</span></td>
                                <td style={{backgroundColor: errors.medicineBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='medicineBaseLine' checked={majorContent.medicineBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setMedicineBaseLine(0)); setErrors({...errors, medicineBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='medicineBaseLine' checked={majorContent.medicineBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setMedicineBaseLine(1)); setErrors({...errors, medicineBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.medicineFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='medicineFollowUp' checked={majorContent.medicineFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setMedicineFollowUp(0)); setErrors({...errors, medicineFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='medicineFollowUp' checked={majorContent.medicineFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setMedicineFollowUp(1)); setErrors({...errors, medicineFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C.11 Prescription Medication Use(not related to cancer treatment)</span></td>
                                <td style={{backgroundColor: errors.prescriptionBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setPrescriptionBaseLine(0)); setErrors({...errors, prescriptionBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='prescriptionBaseLine' checked={majorContent.prescriptionBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setPrescriptionBaseLine(1)); setErrors({...errors, prescriptionBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.prescriptionFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setPrescriptionFollowUp(0)); setErrors({...errors, prescriptionFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='prescriptionFollowUp' checked={majorContent.prescriptionFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setPrescriptionFollowUp(1)); setErrors({...errors, prescriptionFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C.12 Non-prescription Medication Use(not related to cancer treatment)</span></td>
                                <td style={{backgroundColor: errors.nonprescriptionBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(0)); setErrors({...errors, nonprescriptionBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='nonprescriptionBaseLine' checked={majorContent.nonprescriptionBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setNonprescriptionBaseLine(1)); setErrors({...errors, nonprescriptionBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.nonprescriptionFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(0)); setErrors({...errors, nonprescriptionFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='nonprescriptionFollowUp' checked={majorContent.nonprescriptionFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setNonprescriptionFollowUp(1)); setErrors({...errors, nonprescriptionFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C. 13 Alcohol Consumption</span></td>
                                <td style={{backgroundColor: errors.alcoholBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setAlcoholBaseLine(0)); setErrors({...errors, alcoholBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='alcoholBaseLine' checked={majorContent.alcoholBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setAlcoholBaseLine(1)); setErrors({...errors, alcoholBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.alcoholFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setAlcoholFollowUp(0)); setErrors({...errors, alcoholFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='alcoholFollowUp' checked={majorContent.alcoholFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setAlcoholFollowUp(1)); setErrors({...errors, alcoholFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C. 14 Cigarette Smoking</span></td>
                                <td style={{backgroundColor: errors.cigaretteBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setCigaretteBaseLine(0)); setErrors({...errors, cigaretteBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cigaretteBaseLine' checked={majorContent.cigaretteBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setCigaretteBaseLine(1)); setErrors({...errors, cigaretteBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.cigaretteFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setCigaretteFollowUp(0)); setErrors({...errors, cigaretteFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cigaretteFollowUp' checked={majorContent.cigaretteFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setCigaretteFollowUp(1)); setErrors({...errors, cigaretteFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C. 15 Use of tobacco products other than cigarettes</span></td>
                                <td style={{backgroundColor: (errors.cigarBaseLine && errors.pipeBaseLine && errors.tobaccoBaseLine && errors.ecigarBaseLine && errors.noncigarOtherBaseLine) && saved ? 'lightcoral' : 'white'}}> 
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='cigarBaseLine' checked={majorContent.cigarBaseLine === 1} onClick = {(e) => {dispatch(allactions.majorContentActions.setCigarBaseLine(e.target.checked ? 1 : 0)); setErrors({...errors, cigarBaseLine: !e.target.checked})}} /></span>
                                        <span className='col-sm-10'>Cigars</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='pipeBaseLine' checked={majorContent.pipeBaseLine === 1} onClick = {(e) => {dispatch(allactions.majorContentActions.setPipeBaseLine(e.target.checked ? 1 : 0)); setErrors({...errors, pipeBaseLine: !e.target.checked})}} /></span>
                                        <span className='col-sm-10'>Pipes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='tobaccoBaseLine' checked={majorContent.tobaccoBaseLine === 1} onClick = {(e) => {dispatch(allactions.majorContentActions.setTobaccoBaseLine(e.target.checked ? 1 : 0)); setErrors({...errors, tobaccoBaseLine: !e.target.checked})}} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>Chewing Tabacco</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='ecigarBaseLine' checked={majorContent.ecigarBaseLine === 1} onClick = {(e) => {dispatch(allactions.majorContentActions.setEcigarBaseLine(e.target.checked ? 1 : 0)); setErrors({...errors, ecigarBaseLine: !e.target.checked})}} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>E-cigarettes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='noncigarOtherBaseLine' checked={majorContent.noncigarOtherBaseLine === 1} onClick = {(e) => {dispatch(allactions.majorContentActions.setNoncigarOtherBaseLine(e.target.checked ? 1 : 0)); setErrors({...errors, noncigarOtherBaseLine: !e.target.checked})}} /></span>
                                        <span className='col-sm-2' style={{fontSize: '1.4rem'}}>Other</span>
                                        {
                                            majorContent.noncigarOtherBaseLine ? 
                                            <span className='col-sm-8'>
                                                <span className='col-sm-1' style={{paddingLeft: '0'}}></span>
                                                <span className='col-sm-10' style={{fontSize: '1.4rem'}}>
                                                    <input name='noncigarBaseLineSpecify' className='inputUnderscore' value={majorContent.noncigarBaseLineSpecify} onClick={e=>dispatch(allactions.majorContentActions.setNoncigarBaseLineSpecify(e.target.value))} />
                                                </span>
                                            </span> : ''
                                        }
                                    </div>
                                       
                                </td>
                                <td style={{backgroundColor: (errors.cigarFollowUp && errors.pipeFollowUp && errors.tobaccoFollowUp && errors.ecigarFollowUp && errors.noncigarOtherFollowUp) && saved ? 'lightcoral' : 'white'}}> 
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='cigarFollowUp' checked={majorContent.cigarFollowUp} onClick = {(e) => {dispatch(allactions.majorContentActions.setCigarFollowUp(e.target.checked ? 1 : 0)); setErrors({...errors, cigarFollowUp: !e.target.checked})}} /></span>
                                        <span className='col-sm-10'>Cigars</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='pipeFollowUp' checked={majorContent.pipeFollowUp} onClick = {(e) => {dispatch(allactions.majorContentActions.setPipeFollowUp(e.target.checked ? 1 : 0)); setErrors({...errors, pipeFollowUp: !e.target.checked})}} /></span>
                                        <span className='col-sm-10'>Pipes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='tobaccoFollowUp' checked={majorContent.tobaccoFollowUp} onClick = {(e) => {dispatch(allactions.majorContentActions.setTobaccoFollowUp(e.target.checked ? 1 : 0)); setErrors({...errors, tobaccoFollowUp: !e.target.checked})}} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>Chewing Tabacco</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='ecigarFollowUp' checked={majorContent.ecigarFollowUp} onClick = {(e) => {dispatch(allactions.majorContentActions.setEcigarFollowUp(e.target.checked ? 1 : 0)); setErrors({...errors, ecigarFollowUp: !e.target.checked})}} /></span>
                                        <span className='col-sm-10' style={{fontSize: '1.4rem'}}>E-cigarettes</span>
                                    </div>
                                    <div className='col-sm-offset-2 col-sm-10'>
                                        <span className='col-sm-1' style={{paddingLeft: '0'}}>
                                        <input type='checkbox' name='noncigarOtherFollowUp' checked={majorContent.noncigarOtherFollowUp} onClick = {(e) => {dispatch(allactions.majorContentActions.setNoncigarOtherFollowUp(e.target.checked ? 1 : 0)); setErrors({...errors, noncigarOtherFollowUp: !e.target.checked})}} /></span>
                                        <span className='col-sm-2' style={{fontSize: '1.4rem'}}>Other</span>
                                        {
                                            majorContent.noncigarOtherFollowUp ? 
                                            <div className='col-sm-8'>
                                                <span className='col-sm-1' style={{paddingLeft: '0'}}></span>
                                                <span className='col-sm-10' style={{fontSize: '1.4rem'}}>
                                                    <input name='noncigarFollowUpSpecify' className='inputUnderscore' value={majorContent.noncigarFollowUpSpecify} onClick={e=>dispatch(allactions.majorContentActions.setNoncigarFollowUpSpecify(e.target.value))} />
                                                </span>
                                            </div> : ''
                                        }   
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.16 Physical activity</span></td>
                                <td style={{backgroundColor: errors.physicalBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalBaseLine' checked={majorContent.physicalBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setPhysicalBaseLine(0)); setErrors({...errors, physicalBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='physicalBaseLine' checked={majorContent.physicalBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setPhysicalBaseLine(1)); setErrors({...errors, physicalBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.physicalFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalFollowUp' checked={majorContent.physicalFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setPhysicalFollowUp(0)); setErrors({...errors, physicalFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='physicalFollowUp' checked={majorContent.physicalFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setPhysicalFollowUp(1)); setErrors({...errors, physicalFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.17 Sleep habits</span></td>
                                <td style={{backgroundColor: errors.sleepBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='sleepBaseLine' checked={majorContent.sleepBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setSleepBaseLine(0)); setErrors({...errors, sleepBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='sleepBaseLine' checked={majorContent.sleepBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setSleepBaseLine(1)); setErrors({...errors, sleepBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.sleepFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='sleepFollowUp' checked={majorContent.sleepFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setSleepFollowUp(0)); setErrors({...errors, sleepFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='sleepFollowUp' checked={majorContent.sleepFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setSleepFollowUp(1)); setErrors({...errors, sleepFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.18 Reproductive history</span></td>
                                <td style={{backgroundColor: errors.reproduceBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setReproduceBaseLine(0)); setErrors({...errors, reproduceBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='reproduceBaseLine' checked={majorContent.reproduceBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setReproduceBaseLine(1)); setErrors({...errors, reproduceBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.reproduceFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setReproduceFollowUp(0)); setErrors({...errors, reproduceFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='reproduceFollowUp' checked={majorContent.reproduceFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setReproduceFollowUp(1)); setErrors({...errors, reproduceFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.19 Self-reported health</span></td>
                                <td style={{backgroundColor: errors.reportedHealthBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setReportedHealthBaseLine(0)); setErrors({...errors, reportedHealthBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='reportedHealthBaseLine' checked={majorContent.reportedHealthBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setReportedHealthBaseLine(1)); setErrors({...errors, reportedHealthBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.reportedHealthFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setReportedHealthFollowUp(0)); setErrors({...errors, reportedHealthFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='reportedHealthFollowUp' checked={majorContent.reportedHealthFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setReportedHealthFollowUp(1)); setErrors({...errors, reportedHealthFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.20 Quality of life</span></td>
                                <td style={{backgroundColor: errors.lifeBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='lifeBaseLine' checked={majorContent.lifeBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setLifeBaseLine(0)); setErrors({...errors, lifeBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='lifeBaseLine' checked={majorContent.lifeBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setLifeBaseLine(1)); setErrors({...errors, lifeBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.lifeFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='lifeFollowUp' checked={majorContent.lifeFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setLifeFollowUp(0)); setErrors({...errors, lifeFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='lifeFollowUp' checked={majorContent.lifeFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setLifeFollowUp(1)); setErrors({...errors, lifeFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.21 Social support</span></td>
                                <td style={{backgroundColor: errors.socialSupportBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setSocialSupportBaseLine(0)); setErrors({...errors, socialSupportBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='socialSupportBaseLine' checked={majorContent.socialSupportBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setSocialSupportBaseLine(1)); setErrors({...errors, socialSupportBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.socialSupportFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setSocialSupportFollowUp(0)); setErrors({...errors, socialSupportFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='socialSupportFollowUp' checked={majorContent.socialSupportFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setSocialSupportFollowUp(1)); setErrors({...errors, socialSupportFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>

                            <tr>
                                <td><span>C.22 Cognitive function</span></td>
                                <td style={{backgroundColor: errors.cognitionBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setCognitionBaseLine(0)); setErrors({...errors, cognitionBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cognitionBaseLine' checked={majorContent.cognitionBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setCognitionBaseLine(1)); setErrors({...errors, cognitionBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.cognitionFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setCognitionFollowUp(0)); setErrors({...errors, cognitionFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cognitionFollowUp' checked={majorContent.cognitionFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setCognitionFollowUp(1)); setErrors({...errors, cognitionFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.23 Depression</span></td>
                                <td style={{backgroundColor: errors.depressionBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='depressionBaseLine' checked={majorContent.depressionBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setDepressionBaseLine(0)); setErrors({...errors, depressionBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='depressionBaseLine' checked={majorContent.depressionBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setDepressionBaseLine(1)); setErrors({...errors, depressionBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.depressionFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.depressionFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setDepressionFollowUp(0)); setErrors({...errors, depressionFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.depressionFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setDepressionFollowUp(1)); setErrors({...errors, depressionFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.24 Other psycosocial variables</span></td>
                                <td style={{backgroundColor: errors.psychosocialBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setPsychosocialBaseLine(0)); setErrors({...errors, psychosocialBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='psychosocialBaseLine' checked={majorContent.psychosocialBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setPsychosocialBaseLine(1)); setErrors({...errors, psychosocialBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.psychosocialFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setPsychosocialFollowUp(0)); setErrors({...errors, psychosocialFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='psychosocialFollowUp' checked={majorContent.psychosocialFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setPsychosocialFollowUp(1)); setErrors({...errors, psychosocialFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>

                            <tr>
                                <td><span>C.25 Fatigue</span></td>
                                <td style={{backgroundColor: errors.fatigueBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setFatigueBaseLine(0)); setErrors({...errors, fatigueBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='fatigueBaseLine' checked={majorContent.fatigueBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setFatigueBaseLine(1)); setErrors({...errors, fatigueBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.fatigueFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setFatigueFollowUp(0)); setErrors({...errors, fatigueFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='fatigueFollowUp' checked={majorContent.fatigueFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setFatigueFollowUp(1)); setErrors({...errors, fatigueFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>

                            <tr>
                                <td><span>C.26 Family history of cancer</span></td>
                                <td style={{backgroundColor: errors.cancerHistoryBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(0)); setErrors({...errors, cancerHistoryBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cancerHistoryBaseLine' checked={majorContent.cancerHistoryBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setCancerHistoryBaseLine(1)); setErrors({...errors, cancerHistoryBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.cancerHistoryFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setCancerHistoryFollowUp(0)); setErrors({...errors, cancerHistoryFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cancerHistoryFollowUp' checked={majorContent.cancerHistoryFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setCancerHistoryFollowUp(1)); setErrors({...errors, cancerHistoryFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.27 Family history of cancer with pedigrees</span></td>
                                <td style={{backgroundColor: errors.cancerPedigreeBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(0)); setErrors({...errors, cancerPedigreeBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='cancerPedigreeBaseLine' checked={majorContent.cancerPedigreeBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setCancerPedigreeBaseLine(1)); setErrors({...errors, cancerPedigreeBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.cancerPedigreeFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cancerPedigreeFollowUp' checked={majorContent.cancerPedigreeFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(0)); setErrors({...errors, cancerPedigreeFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='depressionFollowUp' checked={majorContent.cancerPedigreeFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setCancerPedigreeFollowUp(1)); setErrors({...errors, cancerPedigreeFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                            <td><span>C.28 Physical function measures (e.g. grip strength, gait speed, etc.)</span></td>
                                <td style={{backgroundColor: errors.physicalMeasureBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalMeasureBaseLine' checked={majorContent.physicalMeasureBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setPhysicalMeasureBaseLine(0)); setErrors({...errors, physicalMeasureBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='physicalMeasureBaseLine' checked={majorContent.physicalMeasureBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setPhysicalMeasureBaseLine(1)); setErrors({...errors, physicalMeasureBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.physicalMeasureFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='physicalMeasureFollowUp' checked={majorContent.physicalMeasureFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setPhysicalMeasureFollowUp(0)); setErrors({...errors, physicalMeasureFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='physicalMeasureFollowUp' checked={majorContent.physicalMeasureFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setPhysicalMeasureFollowUp(1)); setErrors({...errors, physicalMeasureFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C.29 Environmental or occupational exposures(e.g. air contaminants/quality, occupational exposures and history, water source)</span></td>
                                <td style={{backgroundColor: errors.exposureBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='exposureBaseLine' checked={majorContent.exposureBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setExposureBaseLine(0)); setErrors({...errors, exposureBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='exposureBaseLine' checked={majorContent.exposureBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setExposureBaseLine(1)); setErrors({...errors, exposureBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.exposureFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='exposureFollowUp' checked={majorContent.exposureFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setExposureFollowUp(0)); setErrors({...errors, exposureFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='exposureFollowUp' checked={majorContent.exposureFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setExposureFollowUp(1)); setErrors({...errors, exposureFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span style={{fontSize: '1.4rem'}}>C.30 Residential history information(zip code, GIS) over time</span></td>
                                <td style={{backgroundColor: errors.residenceBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='residenceBaseLine' checked={majorContent.residenceBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setResidenceBaseLine(0)); setErrors({...errors, residenceBaseLine: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='residenceBaseLine' checked={majorContent.residenceBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setResidenceBaseLine(1)); setErrors({...errors, residenceBaseLine: false})}} />{' '} Yes</span>
                                </td>
                                <td style={{backgroundColor: errors.residenceFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='residenceFollowUp' checked={majorContent.residenceFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setResidenceFollowUp(0)); setErrors({...errors, residenceFollowUp: false})}} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='residenceFollowUp' checked={majorContent.residenceFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setResidenceFollowUp(1)); setErrors({...errors, residenceFollowUp: false})}} />{' '} Yes</span>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                        <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}><span>Other Medical Condition</span>s</div>
                            <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'} style={{padding: 0}}>
                                <table className='table table-stripe table-responsive table-borderless'>
                                    <tbody>
                                    <tr style={{backgroundColor: '#01857b', color: 'white'}}>
                                        <th colSpan='3'>
                                            <span>C.30 Other Medical Conditions</span>
                                        </th>
                                    </tr>
                                    <tr style={{backgroundColor: '#01857b', color: 'white'}}>
                                        <th className='col-sm-5' style={{textAlign: 'center'}}>Did you collect data on</th>
                                        <th className='col-sm-3' style={{textAlign: 'center'}}>Collected at baseline<span style={{color: 'red'}}>*</span></th>
                                        <th className='col-sm-3' style={{textAlign: 'center'}}>Collected during follow-up<span style={{color: 'red'}}>*</span></th>
                                    </tr>

                                    <tr>
                                        <td><span>a. Diabetes</span></td>
                                        <td style={{backgroundColor: errors.diabetesBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setDiabetesBaseLine(0)); setErrors({...errors, diabetesBaseLine: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='diabetesBaseLine' checked={majorContent.diabetesBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setDiabetesBaseLine(1)); setErrors({...errors, diabetesBaseLine: false})}} />{' '} Yes</span>
                                        </td>
                                        <td style={{backgroundColor: errors.diabetesFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setDiabetesFollowUp(0)); setErrors({...errors, diabetesFollowUp: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='diabetesFollowUp' checked={majorContent.diabetesFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setDiabetesFollowUp(1)); setErrors({...errors, diabetesFollowUp: false})}} />{' '} Yes</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>b. Stroke</span></td>
                                        <td style={{backgroundColor: errors.strokeBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='strokeBaseLine' checked={majorContent.strokeBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setStrokeBaseLine(0)); setErrors({...errors, strokeBaseLine: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='strokeBaseLine' checked={majorContent.strokeBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setStrokeBaseLine(1)); setErrors({...errors, strokeBaseLine: false})}} />{' '} Yes</span>
                                        </td>
                                        <td style={{backgroundColor: errors.strokeFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='strokeFollowUp' checked={majorContent.strokeFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setStrokeFollowUp(0)); setErrors({...errors, strokeFollowUp: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='depressstrokeFollowUpionFollowUp' checked={majorContent.strokeFollowUp === 1} onChange = {() =>{dispatch(allactions.majorContentActions.setStrokeFollowUp(1)); setErrors({...errors, strokeFollowUp: false})}} />{' '} Yes</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>c. COPD and/or emphysema</span></td>
                                        <td style={{backgroundColor: errors.copdBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='copdBaseLine' checked={majorContent.copdBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setCopdBaseLine(0)); setErrors({...errors, copdBaseLine: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='copdBaseLine' checked={majorContent.copdBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setCopdBaseLine(1)); setErrors({...errors, copdBaseLine: false})}} />{' '} Yes</span>
                                        </td>
                                        <td style={{backgroundColor: errors.copdFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='copdFollowUp' checked={majorContent.copdFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setCopdFollowUp(0)); setErrors({...errors, copdFollowUp: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='copdFollowUp' checked={majorContent.copdFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setCopdFollowUp(1)); setErrors({...errors, copdFollowUp: false})}} />{' '} Yes</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><span>d. Cardiovascular disease</span></td>
                                        <td style={{backgroundColor: errors.cardiovascularBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setCardiovascularBaseLine(0)); setErrors({...errors, cardiovascularBaseLine: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='cardiovascularBaseLine' checked={majorContent.cardiovascularBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setCardiovascularBaseLine(1)); setErrors({...errors, cardiovascularBaseLine: false})}} />{' '} Yes</span>
                                        </td>
                                        <td style={{backgroundColor: errors.cardiovascularFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setCardiovascularFollowUp(0)); setErrors({...errors, cardiovascularFollowUp: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='cardiovascularFollowUp' checked={majorContent.cardiovascularFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setCardiovascularFollowUp(1)); setErrors({...errors, cardiovascularFollowUp: false})}} />{' '} Yes</span>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td><span>e. Osteoporosis</span></td>
                                        <td style={{backgroundColor: errors.osteoporosisBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(0)); setErrors({...errors, osteoporosisBaseLine: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='osteoporosisBaseLine' checked={majorContent.osteoporosisBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setOsteoporosisBaseLine(1)); setErrors({...errors, osteoporosisBaseLine: false})}} />{' '} Yes</span>
                                        </td>
                                        <td style={{backgroundColor: errors.osteoporosisFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='osteoporosisFollowUp' checked={majorContent.osteoporosisFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setOsteoporosisFollowUp(0)); setErrors({...errors, osteoporosisFollowUp: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='osteoporosisFollowUp' checked={majorContent.osteoporosisFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setOsteoporosisFollowUp(1)); setErrors({...errors, osteoporosisFollowUp: false})}} />{' '} Yes</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span>f. Mental health</span></td>
                                        <td style={{backgroundColor: errors.mentalBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='mentalBaseLine' checked={majorContent.mentalBaseLine === 0} onChange = {() => {dispatch(allactions.majorContentActions.setMentalBaseLine(0)); setErrors({...errors, mentalBaseLine: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='mentalBaseLine' checked={majorContent.mentalBaseLine === 1} onChange = {() => {dispatch(allactions.majorContentActions.setMentalBaseLine(1)); setErrors({...errors, mentalBaseLine: false})}} />{' '} Yes</span>
                                        </td>
                                        <td style={{backgroundColor: errors.mentalFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='mentalFollowUp' checked={majorContent.mentalFollowUp === 0} onChange = {() => {dispatch(allactions.majorContentActions.setMentalFollowUp(0)); setErrors({...errors, mentalFollowUp: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='mentalFollowUp' checked={majorContent.mentalFollowUp === 1} onChange = {() => {dispatch(allactions.majorContentActions.setMentalFollowUp(1)); setErrors({...errors, mentalFollowUp: false})}} />{' '} Yes</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><span style={{fontSize: '1.4rem'}}>g. Cognitive decline</span></td>
                                        <td style={{backgroundColor: errors.cognitiveDeclineBaseLine && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 0} onClick = {() => {dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(0)); setErrors({...errors, cognitiveDeclineBaseLine: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='cognitiveDeclineBaseLine' checked={majorContent.cognitiveDeclineBaseLine === 1} onClick = {() => {dispatch(allactions.majorContentActions.setCognitiveDeclineBaseLine(1)); setErrors({...errors, cognitiveDeclineBaseLine: false})}} />{' '} Yes</span>
                                        </td>
                                        <td style={{backgroundColor: errors.cognitiveDeclineFollowUp && saved ? 'lightcoral' : 'white'}}> 
                                            <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 0} onClick = {() => {dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(0)); setErrors({...errors, cognitiveDeclineFollowUp: false})}} />{' '} No</span>
                                            <span className='col-sm-4'><input type='radio' name='cognitiveDeclineFollowUp' checked={majorContent.cognitiveDeclineFollowUp === 1} onClick = {() => {dispatch(allactions.majorContentActions.setCognitiveDeclineFollowUp(1)); setErrors({...errors, cognitiveDeclineFollowUp: false})}} />{' '} Yes</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}><span>Cancer Related Conditions</span></div>
                        <div className={activePanel === 'panelC' ? 'panel-active' : 'panellet'} style={{padding: 0}}>
                            <table className='table table-stripe table-responsive table-borderless'>
                                <tbody>
                                    <tr style={{backgroundColor: '#01857b', color: 'white'}}>
                                        <th colSpan='3'>
                                            <span>C.31 Cancer related conditions</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <td colSpan='3' style={{backgroundColor: errors.cancerToxicity && errors.cancerLateEffects && errors.cancerSymptom && errors.cancerOther && saved ? 'lightcoral' : 'white'}}>
                                            <div><span>Do you have information on the following cancer related conditions?<span style={{color: 'red'}}>*</span></span></div>
                                            <div className='col-sm-12'>
                                                <span className='col-sm-1' style={{padding: '0', margin: '0', width: '40px'}}><input type='checkbox' checked={majorContent.cancerToxicity === 1} onChange={
                                                    e => {dispatch(allactions.majorContentActions.setCancerToxicity(e.target.checked ? 1 : 0)); setErrors({...errors, cancerToxicity: !e.target.checked})}
                                                }/></span>
                                                <span className='col-sm-7' style={{padding: '0', margin: '0'}}>Acute treatment-related toxicity (e.g., diarrhea, nephrotoxicity)</span>
                                            </div>
                                            <div className='col-sm-12'>
                                                <span className='col-sm-1' style={{padding: '0', margin: '0', width: '40px'}}><input type='checkbox' checked={majorContent.cancerLateEffects === 1} onChange={
                                                    e => {dispatch(allactions.majorContentActions.setCancerLateEffects(e.target.checked ? 1 : 0));setErrors({...errors, cancerLateEffects: !e.target.checked})}
                                                }/></span>
                                                <span className='col-sm-7' style={{paddingLeft: '0'}}>Late effects of treatment (e.g., cardiotoxicity, lymphedema)</span>
                                            </div>
                                            <div className='col-sm-12'>
                                                <span className='col-sm-1' style={{padding: '0', margin: '0', width: '40px'}}><input type='checkbox' checked={majorContent.cancerSymptom === 1} onChange={
                                                    e => {dispatch(allactions.majorContentActions.setCancerSymptom(e.target.checked ? 1 : 0)); setErrors({...errors, cancerSymptom: !e.target.checked})}
                                                }/></span>
                                                <span className='col-sm-7' style={{paddingLeft: '0'}}>Symptom management (e.g., fatigue, pain, sexual dysfunction)</span>
                                            </div>
                                            <div className='col-sm-12'>
                                                <span className='col-sm-1' style={{padding: '0', margin: '0', width: '40px'}}><input type='checkbox' checked={majorContent.cancerOther === 1} onChange={
                                                    e => {dispatch(allactions.majorContentActions.setCancerOther(e.target.checked ? 1 : 0)); setErrors({...errors, cancerOther: !e.target.checked})}
                                                }/></span>
                                                <span className='col-sm-1' style={{paddingLeft: '0', width: '25px'}}>Other</span>
                                                {
                                                    majorContent.cancerOther === 1 ? 
                                                    <span className='col-sm-3'><input className='inputUnderscore' name='cancerOtherSpecify' onChange={(e) => dispatch(allactions.majorContentActions.setCancerOtherSpecify(e.target.value))} /></span> : ''
                                                }
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </form>
                <div style={{position: 'relative'}}>
                    <span  onClick={() => props.sectionPicker('B')} style={{position: 'relative', float: 'left'}}>
                        <input type='button' className='btn btn-primary' value='Go Back' />
                    </span>
                    <span style={{position: 'relative', float: 'right'}}>
                        <span onClick={handleSave}>
                            <input type='button' className='btn btn-primary' value='Save' />
                        </span>
                        <span onClick={handleSaveContinue}>
                            <input type='button' className='btn btn-primary' value='Save & Continue' />
                        </span>
                    </span>
                </div>
            </div>
        </div>
    </div>
}

export default MajorContentForm