import React, {useState} from 'react'
import {useSelector, useDispatch}  from 'react-redux'
import allactions from '../../actions'
import Messenger from '../Snackbar/Snackbar'
import Reminder from '../Tooltip/Tooltip'
import CenterModal from '../Modal/Modal'

import './SpecimenForm.css'

const SpecimenForm = ({...props}) => {
    const specimen = useSelector(state => state.specimenReducer)
    const section = useSelector(state => state.sectionReducer)
    const dispatch = useDispatch()

    const [saved, setSaved] = useState(false)
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [hasErrors, setHasErrors] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [activePanel, setActivePanel] = useState('panelA')

    const saveSpecimen = (id=79) => {
        fetch(`/api/questionnaire/update_specimen/${id}`,{
            method: "POST",
            body: JSON.stringify(specimen),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
    /*
                if(result.status === 200){
                    if(Object.entries(errors).length === 0)
                        dispatch(allactions.sectionActions.setSectionStatus('G', 'complete'))
                    else{
                        dispatch(allactions.sectionActions.setSectionStatus('G', 'incomplete'))
                    }

                    if(!proceed){
                        setSuccessMsg(true) 
                    }
                    else
                        props.sectionPicker('B')
                }else{
                    setFailureMsg(true)
                }
        */
                console.log(result)
            })
    }
    const handleSave = () => {
        /* if(Object.entries(errors).length === 0)
             saveEnrollment(79)
         else{
             //setDisplay('block')
             if(window.confirm('there are validation errors, are you sure to save?'))
                 saveEnrollment(79)
         }*/
         saveSpecimen(79)
     }
 
     const handleSaveContinue = () => {
         /*
         if(Object.entries(errors).length === 0|| window.confirm('there are validation errors, are you sure to save and proceed?')){
             saveEnrollment(79, true)}
             */
     }
/*
     const confirmSaveStay = () => {
        cohort.sectionAStatus='incomplete'
        dispatch(allactions.cohortActions.setSectionAStatus('incomplete'));
        saveCohort(79);setModalShow(false)
    }

    const confirmSaveContinue = () => {
        cohort.sectionAStatus='incomplete'
        dispatch(allactions.cohortActions.setSectionAStatus('incomplete'))
        saveCohort(79, true);setModalShow(false)
    }
*/
    return <div id='cancerInfoContainer' className='col-md-12'>
{/*}
        {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg}/>}
        {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
        <CenterModal show={modalShow} handleClose={() => setModalShow(false)} handleContentSave={proceed ? confirmSaveContinue : confirmSaveStay} />
*/}
        <div className='col-md-12' style={{display: 'flex', flexDirection: 'column'}}>           
            <div style={{marginTop: '15px'}}>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>part one</div>
                <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'} style={{padding: '0'}}>
                    <div><label>G.16 Specimen Counts</label></div>
                    <p style={{fontSize: '16px'}}>Please complete this table with the number of individuals with biospecimens available in your current inventory. If you do not have exact counts, please enter approximate counts. (Note, please record the number of individual participants for whom there are available samples– NOT the number of aliquots.) </p>
                    <table className='table table-stripe table-responsive'>
                        <thead>
                            <tr>
                                <th className='col-sm-1 center' >ICD-9</th>
                                <th className='col-sm-1 center' > ICD-10</th>
                                <th className='col-sm-3 center' >Cancer Site/Type</th>
                                <th className='col-sm-1 center' >Serum and/or Plasma</th>
                                <th className='col-sm-1 center' >Buffy Coat and/or Lymphocytes</th>
                                <th className='col-sm-1 center' >Saliva and/or Buccal</th>
                                <th className='col-sm-1 center' >Urine</th>
                                <th className='col-sm-1 center' >Feces</th>
                                <th className='col-sm-1 center' >Tumor Tissue Fresh/Frozen</th>
                                <th className='col-sm-1 center' >Tumor Tissue FFPE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                               <td></td>
                               <td></td>
                               <td>No Cancer</td>
                                <td><input className='inputWriter center'   name='29-1' value={specimen.counts['29-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('29-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='29-2' value={specimen.counts['29-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('29-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='29-3' value={specimen.counts['29-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('29-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='29-4' value={specimen.counts['29-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('29-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='29-5' value={specimen.counts['29-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('29-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='29-6' value={specimen.counts['29-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('29-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='29-7' value={specimen.counts['29-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('29-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>141-149</td>
                               <td>C00-C14</td>
                               <td>Oropharyngeal</td>
                                <td><input className='inputWriter center'   name='2-1' value={specimen.counts['2-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('2-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='2-2' value={specimen.counts['2-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('2-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='2-3' value={specimen.counts['2-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('2-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='2-4' value={specimen.counts['2-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('2-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='2-5' value={specimen.counts['2-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('2-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='2-6' value={specimen.counts['2-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('2-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='2-7' value={specimen.counts['2-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('2-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>150</td>
                               <td>C15</td>
                               <td>Esophagus</td>
                                <td><input className='inputWriter center'   name='3-1' value={specimen.counts['3-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('3-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='3-2' value={specimen.counts['3-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('3-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='3-3' value={specimen.counts['3-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('3-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='3-4' value={specimen.counts['3-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('3-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='3-5' value={specimen.counts['3-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('3-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='3-6' value={specimen.counts['3-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('3-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='3-7' value={specimen.counts['3-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('3-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>151</td>
                               <td>C16</td>
                               <td>Stomach</td>
                                <td><input className='inputWriter center'   name='4-1' value={specimen.counts['4-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('4-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='4-2' value={specimen.counts['4-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('4-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='4-3' value={specimen.counts['4-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('4-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='4-4' value={specimen.counts['4-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('4-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='4-5' value={specimen.counts['4-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('4-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='4-6' value={specimen.counts['4-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('4-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='4-7' value={specimen.counts['4-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('4-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>152</td>
                               <td>C17</td>
                               <td>Small intestine</td>
                                <td><input className='inputWriter center'   name='5-1' value={specimen.counts['5-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('5-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='5-2' value={specimen.counts['5-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('5-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='5-3' value={specimen.counts['5-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('5-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='5-4' value={specimen.counts['5-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('5-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='5-5' value={specimen.counts['5-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('5-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='5-6' value={specimen.counts['5-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('5-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='5-7' value={specimen.counts['5-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('5-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>153</td>
                               <td>C18</td>
                               <td>Colon</td>
                                <td><input className='inputWriter center'   name='6-1' value={specimen.counts['6-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('6-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='6-2' value={specimen.counts['6-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('6-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='6-3' value={specimen.counts['6-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('6-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='6-4' value={specimen.counts['6-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('6-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='6-5' value={specimen.counts['6-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('6-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='6-6' value={specimen.counts['6-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('6-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='6-7' value={specimen.counts['6-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('6-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>154</td>
                               <td>C19-C21</td>
                               <td>Rectum and anus</td>
                                <td><input className='inputWriter center'   name='7-1' value={specimen.counts['7-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('7-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='7-2' value={specimen.counts['7-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('7-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='7-3' value={specimen.counts['7-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('7-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='7-4' value={specimen.counts['7-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('7-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='7-5' value={specimen.counts['7-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('7-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='7-6' value={specimen.counts['7-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('7-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='7-7' value={specimen.counts['7-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('7-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>155</td>
                               <td>C22</td>
                               <td>Liver and intrahepatic bile ducts</td>
                                <td><input className='inputWriter center'   name='8-1' value={specimen.counts['8-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('8-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='8-2' value={specimen.counts['8-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('8-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='8-3' value={specimen.counts['8-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('8-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='8-4' value={specimen.counts['8-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('8-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='8-5' value={specimen.counts['8-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('8-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='8-6' value={specimen.counts['8-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('8-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='8-7' value={specimen.counts['8-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('8-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>156</td>
                               <td>C23, C24</td>
                               <td>Gallbladder and extrahepatic bile ducts</td>
                                <td><input className='inputWriter center'   name='9-1' value={specimen.counts['9-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('9-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='9-2' value={specimen.counts['9-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('9-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='9-3' value={specimen.counts['9-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('9-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='9-4' value={specimen.counts['9-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('9-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='9-5' value={specimen.counts['9-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('9-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='9-6' value={specimen.counts['9-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('9-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='9-7' value={specimen.counts['9-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('9-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>157</td>
                               <td>C25</td>
                               <td>Pancreas</td>
                                <td><input className='inputWriter center'   name='10-1' value={specimen.counts['10-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('10-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='10-2' value={specimen.counts['10-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('10-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='10-3' value={specimen.counts['10-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('10-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='10-4' value={specimen.counts['10-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('10-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='10-5' value={specimen.counts['10-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('10-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='10-6' value={specimen.counts['10-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('10-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='10-7' value={specimen.counts['10-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('10-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>162</td>
                               <td>C34</td>
                               <td>Lung and bronchus</td>
                                <td><input className='inputWriter center'   name='11-1' value={specimen.counts['11-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('11-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='11-2' value={specimen.counts['11-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('11-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='11-3' value={specimen.counts['11-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('11-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='11-4' value={specimen.counts['11-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('11-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='11-5' value={specimen.counts['11-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('11-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='11-6' value={specimen.counts['11-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('11-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='11-7' value={specimen.counts['11-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('11-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>170</td>
                               <td>C40, C41</td>
                               <td>Bone</td>
                                <td><input className='inputWriter center'   name='12-1' value={specimen.counts['12-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('12-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='12-2' value={specimen.counts['12-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('12-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='12-3' value={specimen.counts['12-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('12-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='12-4' value={specimen.counts['12-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('12-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='12-5' value={specimen.counts['12-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('12-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='12-6' value={specimen.counts['12-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('12-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='12-7' value={specimen.counts['12-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('12-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>172</td>
                               <td>C43</td>
                               <td>Melanoma (excluding mucosal sites)</td>
                                <td><input className='inputWriter center'   name='13-1' value={specimen.counts['13-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('13-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='13-2' value={specimen.counts['13-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('13-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='13-3' value={specimen.counts['13-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('13-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='13-4' value={specimen.counts['13-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('13-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='13-5' value={specimen.counts['13-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('13-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='13-6' value={specimen.counts['13-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('13-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='13-7' value={specimen.counts['13-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('13-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>174-175</td>
                               <td>C50</td>
                               <td>Invasive Breast Cancer</td>
                                <td><input className='inputWriter center'   name='14-1' value={specimen.counts['14-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('14-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='14-2' value={specimen.counts['14-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('14-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='14-3' value={specimen.counts['14-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('14-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='14-4' value={specimen.counts['14-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('14-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='14-5' value={specimen.counts['14-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('14-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='14-6' value={specimen.counts['14-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('14-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='14-7' value={specimen.counts['14-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('14-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>233</td>
                               <td>D05.1</td>
                               <td>Ductal carcinoma in situ of breast </td>
                                <td><input className='inputWriter center'   name='15-1' value={specimen.counts['15-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('15-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='15-2' value={specimen.counts['15-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('15-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='15-3' value={specimen.counts['15-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('15-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='15-4' value={specimen.counts['15-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('15-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='15-5' value={specimen.counts['15-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('15-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='15-6' value={specimen.counts['15-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('15-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='15-7' value={specimen.counts['15-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('15-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>180</td>
                               <td>C53</td>
                               <td>Cervix (Squamous cell carcinoma, Adenocarcinoma)</td>
                                <td><input className='inputWriter center'   name='16-1' value={specimen.counts['16-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('16-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='16-2' value={specimen.counts['16-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('16-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='16-3' value={specimen.counts['16-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('16-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='16-4' value={specimen.counts['16-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('16-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='16-5' value={specimen.counts['16-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('16-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='16-6' value={specimen.counts['16-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('16-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='16-7' value={specimen.counts['16-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('16-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>233</td>
                               <td>D06.1</td>
                               <td>Cervical carcinoma in situ (CIN II/III, CIS, AIS)</td>
                                <td><input className='inputWriter center'   name='17-1' value={specimen.counts['17-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('17-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='17-2' value={specimen.counts['17-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('17-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='17-3' value={specimen.counts['17-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('17-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='17-4' value={specimen.counts['17-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('17-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='17-5' value={specimen.counts['17-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('17-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='17-6' value={specimen.counts['17-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('17-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='17-7' value={specimen.counts['17-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('17-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>182</td>
                               <td>C54</td>
                               <td>Corpus, body of uterus</td>
                                <td><input className='inputWriter center'   name='18-1' value={specimen.counts['18-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('18-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='18-2' value={specimen.counts['18-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('18-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='18-3' value={specimen.counts['18-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('18-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='18-4' value={specimen.counts['18-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('18-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='18-5' value={specimen.counts['18-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('18-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='18-6' value={specimen.counts['18-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('18-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='18-7' value={specimen.counts['18-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('18-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>183</td>
                               <td>C56</td>
                               <td>Ovary, fallopian tube, broad ligament</td>
                                <td><input className='inputWriter center'   name='19-1' value={specimen.counts['19-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('19-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='19-2' value={specimen.counts['19-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('19-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='19-3' value={specimen.counts['19-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('19-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='19-4' value={specimen.counts['19-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('19-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='19-5' value={specimen.counts['19-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('19-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='19-6' value={specimen.counts['19-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('19-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='19-7' value={specimen.counts['19-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('19-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>185</td>
                               <td>C61</td>
                               <td>Prostate</td>
                                <td><input className='inputWriter center'   name='20-1' value={specimen.counts['20-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('20-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='20-2' value={specimen.counts['20-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('20-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='20-3' value={specimen.counts['20-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('20-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='20-4' value={specimen.counts['20-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('20-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='20-5' value={specimen.counts['20-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('20-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='20-6' value={specimen.counts['20-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('20-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='20-7' value={specimen.counts['20-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('20-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>188</td>
                               <td>C67</td>
                               <td>Bladder</td>
                                <td><input className='inputWriter center'   name='21-1' value={specimen.counts['21-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('21-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='21-2' value={specimen.counts['21-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('21-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='21-3' value={specimen.counts['21-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('21-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='21-4' value={specimen.counts['21-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('21-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='21-5' value={specimen.counts['21-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('21-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='21-6' value={specimen.counts['21-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('21-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='21-7' value={specimen.counts['21-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('21-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>189</td>
                               <td>C64-C66, C68</td>
                               <td>Kidney and other unspecified urinary organs </td>
                                <td><input className='inputWriter center'   name='22-1' value={specimen.counts['22-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('22-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='22-2' value={specimen.counts['22-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('22-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='22-3' value={specimen.counts['22-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('22-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='22-4' value={specimen.counts['22-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('22-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='22-5' value={specimen.counts['22-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('22-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='22-6' value={specimen.counts['22-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('22-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='22-7' value={specimen.counts['22-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('22-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>191</td>
                               <td>C71</td>
                               <td>Brain</td>
                                <td><input className='inputWriter center'   name='23-1' value={specimen.counts['23-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('23-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='23-2' value={specimen.counts['23-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('23-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='23-3' value={specimen.counts['23-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('23-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='23-4' value={specimen.counts['23-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('23-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='23-5' value={specimen.counts['23-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('23-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='23-6' value={specimen.counts['23-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('23-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='23-7' value={specimen.counts['23-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('23-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>193</td>
                               <td>C73</td>
                               <td>Thyroid</td>
                                <td><input className='inputWriter center'   name='24-1' value={specimen.counts['24-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('24-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='24-2' value={specimen.counts['24-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('24-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='24-3' value={specimen.counts['24-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('24-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='24-4' value={specimen.counts['24-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('24-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='24-5' value={specimen.counts['24-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('24-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='24-6' value={specimen.counts['24-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('24-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='24-7' value={specimen.counts['24-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('24-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>201</td>
                               <td>C81</td>
                               <td>Hodgkin Lymphoma </td>
                                <td><input className='inputWriter center'   name='25-1' value={specimen.counts['25-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('25-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='25-2' value={specimen.counts['25-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('25-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='25-3' value={specimen.counts['25-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('25-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='25-4' value={specimen.counts['25-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('25-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='25-5' value={specimen.counts['25-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('25-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='25-6' value={specimen.counts['25-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('25-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='25-7' value={specimen.counts['25-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('25-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>200, 202</td>
                               <td>C82-85</td>
                               <td>Non-Hodgkin Lymphoma</td>
                                <td><input className='inputWriter center'   name='26-1' value={specimen.counts['26-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('26-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='26-2' value={specimen.counts['26-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('26-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='26-3' value={specimen.counts['26-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('26-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='26-4' value={specimen.counts['26-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('26-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='26-5' value={specimen.counts['26-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('26-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='26-6' value={specimen.counts['26-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('26-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='26-7' value={specimen.counts['26-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('26-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>203</td>
                               <td>C90</td>
                               <td>Myeloma</td>
                                <td><input className='inputWriter center'   name='27-1' value={specimen.counts['27-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('27-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='27-2' value={specimen.counts['27-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('27-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='27-3' value={specimen.counts['27-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('27-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='27-4' value={specimen.counts['27-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('27-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='27-5' value={specimen.counts['27-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('27-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='27-6' value={specimen.counts['27-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('27-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='27-7' value={specimen.counts['27-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('27-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td>204-208</td>
                               <td>C91-95</td>
                               <td>Leukemia</td>
                                <td><input className='inputWriter center'   name='28-1' value={specimen.counts['28-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('28-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='28-2' value={specimen.counts['28-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('28-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='28-3' value={specimen.counts['28-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('28-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='28-4' value={specimen.counts['28-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('28-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='28-5' value={specimen.counts['28-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('28-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='28-6' value={specimen.counts['28-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('28-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='28-7' value={specimen.counts['28-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('28-7', e.target.value))} /></td>
                            </tr>
                            <tr>
                               <td></td>
                               <td></td>
                               <td>All Other Cancers</td>
                                <td><input className='inputWriter center'   name='1-1' value={specimen.counts['1-1']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('1-1', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='1-2' value={specimen.counts['1-2']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('1-2', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='1-3' value={specimen.counts['1-3']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('1-3', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='1-4' value={specimen.counts['1-4']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('1-4', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='1-5' value={specimen.counts['1-5']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('1-5', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='1-6' value={specimen.counts['1-6']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('1-6', e.target.value))} /></td>
                                <td><input className='inputWriter center'   name='1-7' value={specimen.counts['1-7']} onChange={e=>dispatch(allactions.specimenActions.setSpecimenCount('1-7', e.target.value))} /></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
            <div sytle={{position: 'relative'}}>
                <span  onClick={() => props.sectionPicker('F')} style={{position: 'relative', float: 'left'}}>
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
                {section.A === 'complete' && section.B === 'complete' && section.C === 'complete' && section.D === 'complete' && section.E === 'complete' && section.F === 'complete' && section.G === 'complete' ? <span><input type='button' className='btn btn-primary' value='Submit For Review' /></span> : ''}
            </div> 
        </div>
    </div>
}

export default SpecimenForm