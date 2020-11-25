import React, {useState} from 'react'
import {useSelector, useDispatch}  from 'react-redux'
import {specimenActions} from '../../actions'
import Messenger from '../Snackbar/Snackbar'
import Reminder from '../Tooltip/Tooltip'
import CenterModal from '../Modal/Modal'

const SpecimenForm = ({...props}) => {
    const specimen = useSelector(state => state.specimenReducer)
    const section = useSelector(state => state.sectionReducer)

    const dispatch = useDispatch()
    const [activePanel, setActivePanel] = useState('panelA')

    const handleSave = () => {
        /* if(Object.entries(errors).length === 0)
             saveEnrollment(79)
         else{
             //setDisplay('block')
             if(window.confirm('there are validation errors, are you sure to save?'))
                 saveEnrollment(79)
         }*/
     }
 
     const handleSaveContinue = () => {
         /*
         if(Object.entries(errors).length === 0|| window.confirm('there are validation errors, are you sure to save and proceed?')){
             saveEnrollment(79, true)}
             */
     }
    return <div id='cancerInfoContainer' className='col-md-12'>
        <div className='col-md-12' style={{display: 'flex', flexDirection: 'column'}}>           
            <div style={{marginTop: '15px'}}>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelA' ? '' : 'panelA')}>part one</div>
                <div className={activePanel === 'panelA' ? 'panel-active' : 'panellet'} style={{padding: '0'}}>
                    <div><label>G.16 Specimen Counts</label></div>
                    <p style={{fontSize: '16px'}}>Please complete this table with the number of individuals with biospecimens available in your current inventory. If you do not have exact counts, please enter approximate counts. (Note, please record the number of individual participants for whom there are available samples– NOT the number of aliquots.) </p>
                    <table className='table table-stripe table-responsive'>
                        <thead>
                            <tr>
                                <th className='col-sm-1' style={{textAlign: 'center'}}>ICD-9</th>
                                <th className='col-sm-1' style={{textAlign: 'center'}}> ICD-10</th>
                                <th className='col-sm-3' style={{textAlign: 'center'}}>Cancer Site/Type</th>
                                <th className='col-sm-1' style={{textAlign: 'center'}}>Serum and/or Plasma</th>
                                <th className='col-sm-1' style={{textAlign: 'center'}}>Buffy Coat and/or Lymphocytes</th>
                                <th className='col-sm-1' style={{textAlign: 'center'}}>Saliva and/or Buccal</th>
                                <th className='col-sm-1' style={{textAlign: 'center'}}>Urine</th>
                                <th className='col-sm-1' style={{textAlign: 'center'}}>Feces</th>
                                <th className='col-sm-1' style={{textAlign: 'center'}}>Tumor Tissue Fresh/Frozen</th>
                                <th className='col-sm-1' style={{textAlign: 'center'}}>Tumor Tissue FFPE</th>
                            </tr>
                        </thead>
                        <tbody>

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