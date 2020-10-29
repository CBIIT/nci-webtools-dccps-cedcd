import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import allactions from '../../actions'

const CancerInfoForm = ({...props}) => {
    const cancerInfo = useSelector(state => state.cancerInfoReducer)
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
                    <table className='table table-stripe table-responsive'>
                        <thead>
                            <tr><td colSpan='7'>D.1 Cancer Counts Please enter the number of participants with these cancer by sex</td></tr>
                            <tr>
                                <th className='col-sm-1' style={{textAlign: 'center'}}>ICD-9</th>
                                <th className='col-sm-1' style={{textAlign: 'center'}}> ICD-10</th>
                                <th className='col-sm-3' style={{textAlign: 'center'}}>Cancer Site/Type</th>
                                <th className='col-sm-3' colSpan='2' style={{textAlign: 'center'}}>Male</th>
                                <th  className='col-sm-3' colSpan='2' style={{textAlign: 'center'}}>Female</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan='3'></td>
                                <td style={{textAlign: 'center'}}>Prevalent Cases</td>
                                <td style={{textAlign: 'center'}}>Incident Cases</td>
                                <td style={{textAlign: 'center'}}>Prevalent Cases</td>
                                <td style={{textAlign: 'center'}}>Incident Cases</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>141-149</td>
                                <td style={{textAlign: 'center'}}>C00-C14</td>
                                <td style={{textAlign: 'center'}}>Oropharyngeal</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='2-2-1' value={cancerInfo['2-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('2-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='2-2-2' value={cancerInfo['2-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('2-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='2-1-1' value={cancerInfo['2-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('2-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='2-1-2' value={cancerInfo['2-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('2-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>150</td>
                                <td style={{textAlign: 'center'}}>C15</td>
                                <td style={{textAlign: 'center'}}>Esophagus</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='3-2-1' value={cancerInfo['3-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('3-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='3-2-2' value={cancerInfo['3-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('3-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='3-1-1' value={cancerInfo['3-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('3-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='3-1-2' value={cancerInfo['3-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('3-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>151</td>
                                <td style={{textAlign: 'center'}}>C16</td>
                                <td style={{textAlign: 'center'}}>Stomach</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='4-2-1' value={cancerInfo['4-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('4-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='4-2-2' value={cancerInfo['4-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('4-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='4-1-1' value={cancerInfo['4-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('4-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='4-1-2' value={cancerInfo['4-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('4-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>152</td>
                                <td style={{textAlign: 'center'}}>C17</td>
                                <td style={{textAlign: 'center'}}>Small intestine</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='5-2-1' value={cancerInfo['5-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('5-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='5-2-2' value={cancerInfo['5-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('5-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='5-1-1' value={cancerInfo['5-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('5-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='5-1-2' value={cancerInfo['5-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('5-1-2', e.target.value))} /></td>
                            </tr>

                            <tr>
                                <td style={{textAlign: 'center'}}>153</td>
                                <td style={{textAlign: 'center'}}>C18</td>
                                <td style={{textAlign: 'center'}}>Colon</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='6-2-1' value={cancerInfo['6-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('6-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='6-2-2' value={cancerInfo['6-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('6-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='6-1-1' value={cancerInfo['6-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('6-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='6-1-2' value={cancerInfo['6-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('6-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>154</td>
                                <td style={{textAlign: 'center'}}>C19-C21</td>
                                <td style={{textAlign: 'center'}}>Rectum and anus</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='7-2-1' value={cancerInfo['7-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('7-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='7-2-2' value={cancerInfo['7-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('7-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='7-1-1' value={cancerInfo['7-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('7-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='7-1-2' value={cancerInfo['7-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('7-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>155</td>
                                <td style={{textAlign: 'center'}}>C22</td>
                                <td style={{textAlign: 'center'}}>Liver and intrahepatic bile ducts</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='8-2-1' value={cancerInfo['8-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('8-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='8-2-2' value={cancerInfo['8-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('8-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='8-1-1' value={cancerInfo['8-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('8-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='8-1-2' value={cancerInfo['8-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('8-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>156</td>
                                <td style={{textAlign: 'center'}}>C23, C24</td>
                                <td style={{textAlign: 'center'}}>Gallbladder and extrahepatic bile ducts</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='9-2-1' value={cancerInfo['9-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('9-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='9-2-2' value={cancerInfo['9-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('9-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='9-1-1' value={cancerInfo['9-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('9-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='9-1-2' value={cancerInfo['9-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('9-1-2', e.target.value))} /></td>
                            </tr>

                            <tr>
                                <td style={{textAlign: 'center'}}>157</td>
                                <td style={{textAlign: 'center'}}>C25</td>
                                <td style={{textAlign: 'center'}}>Pancreas</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='10-2-1' value={cancerInfo['10-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('10-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='10-2-2' value={cancerInfo['10-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('10-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='10-1-1' value={cancerInfo['10-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('10-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='10-1-2' value={cancerInfo['10-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('10-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>162</td>
                                <td style={{textAlign: 'center'}}>C34</td>
                                <td style={{textAlign: 'center'}}>Lung and bronchus</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='11-2-1' value={cancerInfo['11-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('11-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='11-2-2' value={cancerInfo['11-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('11-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='11-1-1' value={cancerInfo['11-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('11-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='11-1-2' value={cancerInfo['11-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('11-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>170</td>
                                <td style={{textAlign: 'center'}}>C40,C41</td>
                                <td style={{textAlign: 'center'}}>Bone</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='12-2-1' value={cancerInfo['12-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('12-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='12-2-2' value={cancerInfo['12-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('12-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='12-1-1' value={cancerInfo['12-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('12-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='12-1-2' value={cancerInfo['12-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('12-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>172</td>
                                <td style={{textAlign: 'center'}}>C43</td>
                                <td style={{textAlign: 'center'}}>Melanoma (excluding mucosal sites)</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='13-2-1' value={cancerInfo['13-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('13-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='13-2-2' value={cancerInfo['13-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('13-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='13-1-1' value={cancerInfo['13-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('13-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='13-1-2' value={cancerInfo['13-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('13-1-2', e.target.value))} /></td>
                            </tr>

                            <tr>
                                <td style={{textAlign: 'center'}}>174-175</td>
                                <td style={{textAlign: 'center'}}>C50</td>
                                <td style={{textAlign: 'center'}}>Invasive Breast Cancer</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='14-2-1' value={cancerInfo['14-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('14-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='14-2-2' value={cancerInfo['14-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('14-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='14-1-1' value={cancerInfo['14-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('14-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='14-1-2' value={cancerInfo['14-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('14-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>233</td>
                                <td style={{textAlign: 'center'}}>D05.1</td>
                                <td style={{textAlign: 'center'}}>Ductal carcinoma in situ of breast </td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='15-2-1' value={cancerInfo['15-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('15-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='15-2-2' value={cancerInfo['15-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('15-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='15-1-1' value={cancerInfo['15-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('15-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='15-1-2' value={cancerInfo['15-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('15-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>180</td>
                                <td style={{textAlign: 'center'}}>C53</td>
                                <td style={{textAlign: 'center', fontSize: '1.4rem'}}>Cervix (Squamous cell carcinoma, Adenocarcinoma)</td>
                                <td style={{verticalAlign: 'middle'}}><input className='inputWriter'  style={{textAlign: 'center'}} name='16-2-1' value={cancerInfo['16-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('16-2-1', e.target.value))} /></td>
                                <td style={{verticalAlign: 'middle'}}><input className='inputWriter'  style={{textAlign: 'center'}} name='16-2-2' value={cancerInfo['16-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('16-2-2', e.target.value))} /></td>
                                <td style={{verticalAlign: 'middle'}}><input className='inputWriter'  style={{textAlign: 'center'}} name='16-1-1' value={cancerInfo['16-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('16-1-1', e.target.value))} /></td>
                                <td style={{verticalAlign: 'middle'}}><input className='inputWriter'  style={{textAlign: 'center'}} name='16-1-2' value={cancerInfo['16-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('16-1-2', e.target.value))} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelB' ? '' : 'panelB')}>part two</div>
                <div className={activePanel === 'panelB' ? 'panel-active' : 'panellet'} style={{padding: '0'}}>
                    <table style={{marginBottom: '10px'}}>
                        <thead>
                            <tr>
                                <th className='col-sm-1' style={{textAlign: 'center'}}>ICD-9</th>
                                <th className='col-sm-1' style={{textAlign: 'center'}}> ICD-10</th>
                                <th className='col-sm-3' style={{textAlign: 'center'}}>Cancer Site/Type</th>
                                <th className='col-sm-3' colSpan='2' style={{textAlign: 'center'}}>Male</th>
                                <th  className='col-sm-3' colSpan='2' style={{textAlign: 'center'}}>Female</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan='3'></td>
                                <td style={{textAlign: 'center'}}>Prevalent Cases</td>
                                <td style={{textAlign: 'center'}}>Incident Cases</td>
                                <td style={{textAlign: 'center'}}>Prevalent Cases</td>
                                <td style={{textAlign: 'center'}}>Incident Cases</td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>233</td>
                                <td style={{textAlign: 'center'}}>D06.1</td>
                                <td style={{textAlign: 'center'}}>Cervical carcinoma in situ (CIN II/III, CIS, AIS)</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='17-2-1' value={cancerInfo['17-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('17-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='17-2-2' value={cancerInfo['17-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('17-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='17-1-1' value={cancerInfo['17-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('17-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='17-1-2' value={cancerInfo['17-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('17-1-2', e.target.value))} /></td>
                            </tr>

                            <tr>
                                <td style={{textAlign: 'center'}}>182</td>
                                <td style={{textAlign: 'center'}}>C54</td>
                                <td style={{textAlign: 'center'}}>Corpus, body of uterus</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='18-2-1' value={cancerInfo['18-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('18-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='18-2-2' value={cancerInfo['18-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('18-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='18-1-1' value={cancerInfo['18-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('18-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='18-1-2' value={cancerInfo['18-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('18-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>183</td>
                                <td style={{textAlign: 'center'}}>C56</td>
                                <td style={{textAlign: 'center'}}>Ovary, fallopian tube, broad ligament</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='19-2-1' value={cancerInfo['19-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('19-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='19-2-2' value={cancerInfo['19-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('19-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='19-1-1' value={cancerInfo['19-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('19-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='19-1-2' value={cancerInfo['19-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('19-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>185</td>
                                <td style={{textAlign: 'center'}}>C61</td>
                                <td style={{textAlign: 'center'}}>Prostate</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='20-2-1' value={cancerInfo['20-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('20-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='20-2-2' value={cancerInfo['20-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('20-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='20-1-1' value={cancerInfo['20-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('20-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='20-1-2' value={cancerInfo['20-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('20-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>188</td>
                                <td style={{textAlign: 'center'}}>C67</td>
                                <td style={{textAlign: 'center'}}>Bladder</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='21-2-1' value={cancerInfo['21-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('21-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='21-2-2' value={cancerInfo['21-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('21-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='21-1-1' value={cancerInfo['21-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('21-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='21-1-2' value={cancerInfo['21-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('21-1-2', e.target.value))} /></td>
                            </tr>

                            <tr>
                                <td style={{textAlign: 'center'}}>189</td>
                                <td style={{textAlign: 'center'}}>C64-C66, C68</td>
                                <td style={{textAlign: 'center'}}>Kidney and other unspecified urinary organs </td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='22-2-1' value={cancerInfo['22-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('22-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='22-2-2' value={cancerInfo['22-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('22-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='22-1-1' value={cancerInfo['22-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('22-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='22-1-2' value={cancerInfo['22-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('22-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>191</td>
                                <td style={{textAlign: 'center'}}>C71</td>
                                <td style={{textAlign: 'center'}}>Brain</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='23-2-1' value={cancerInfo['23-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('23-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='23-2-2' value={cancerInfo['23-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('23-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='23-1-1' value={cancerInfo['23-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('23-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='23-1-2' value={cancerInfo['23-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('23-1-2', e.target.value))} /></td>
                            </tr>

                            <tr>
                                <td style={{textAlign: 'center'}}>193</td>
                                <td style={{textAlign: 'center'}}>C73</td>
                                <td style={{textAlign: 'center'}}>Thyroid</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='24-2-1' value={cancerInfo['24-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('24-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='24-2-2' value={cancerInfo['24-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('24-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='24-1-1' value={cancerInfo['24-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('24-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='24-1-2' value={cancerInfo['24-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('24-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>201</td>
                                <td style={{textAlign: 'center'}}>C81</td>
                                <td style={{textAlign: 'center'}}>Hodgkin Lymphoma </td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='25-2-1' value={cancerInfo['25-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('25-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='25-2-2' value={cancerInfo['25-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('25-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='25-1-1' value={cancerInfo['25-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('25-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='25-1-2' value={cancerInfo['25-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('25-1-2', e.target.value))} /></td>
                            </tr>

                            <tr>
                                <td style={{textAlign: 'center'}}>200, 202</td>
                                <td style={{textAlign: 'center'}}>C82-85</td>
                                <td style={{textAlign: 'center'}}>Non-Hodgkin Lymphoma</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='26-2-1' value={cancerInfo['26-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('26-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='26-2-2' value={cancerInfo['26-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('26-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='26-1-1' value={cancerInfo['26-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('26-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='26-1-2' value={cancerInfo['26-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('26-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>203</td>
                                <td style={{textAlign: 'center'}}>C90</td>
                                <td style={{textAlign: 'center'}}>Myeloma</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='27-2-1' value={cancerInfo['27-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('27-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='27-2-2' value={cancerInfo['27-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('27-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='27-1-1' value={cancerInfo['27-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('27-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='27-1-2' value={cancerInfo['27-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('27-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td style={{textAlign: 'center'}}>204-208</td>
                                <td style={{textAlign: 'center'}}>C91-95</td>
                                <td style={{textAlign: 'center'}}>Leukemia</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='28-2-1' value={cancerInfo['28-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('28-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='28-2-2' value={cancerInfo['28-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('28-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='28-1-1' value={cancerInfo['28-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('28-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='28-1-2' value={cancerInfo['28-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('28-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td colSpan='2' style={{textAlign: 'center'}}></td>
                                <td style={{textAlign: 'center'}}>All Other Cancers</td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='1-2-1' value={cancerInfo['1-2-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('1-2-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='1-2-2' value={cancerInfo['1-2-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('1-2-2', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='1-1-1' value={cancerInfo['1-1-1']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('1-1-1', e.target.value))} /></td>
                                <td><input className='inputWriter'  style={{textAlign: 'center'}} name='1-1-2' value={cancerInfo['1-1-2']} onChange={e=>dispatch(allactions.cancerInfoActions.setCancerCount('1-1-2', e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td colSpan='3'>D.2 Most recent date confirmed cancer case ascertainment</td>
                                <td colSpan='4'><input className='inputUnderscore' value='' onChange={f=>f} />(MM/DD/YYYY)</td>
                            </tr>
                            <tr>
                                <td colSpan='3' style={{verticalAlign: 'middle'}}>D.3 How were your cancer cases ascertained</td>
                                <td colSpan='4'>
                                    <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column'}}>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-3' style={{marginLeft: '0', paddingLeft: '0'}}>self-reported</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-3' style={{marginLeft: '0', paddingLeft: '0'}}> cancer registry</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-4' style={{marginLeft: '0', paddingLeft: '0'}}> medical record review</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-1' style={{marginLeft: '0', paddingLeft: '0'}}> other</span><span className='col-sm-3'><input className='col-sm-12 inputUnderscore' /></span></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='3'>D.4 Did you collect infromation about cancer recurrence</td>
                                <td colSpan='4'>
                                    <span className='col-sm-2'><input type='radio' name='cancerRecurrenceInfo' />{' '} No</span>
                                    <span className='col-sm-5'><input type='radio' name='cancerRecurrenceInfo' />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='3'>D.5 Do you have second/subsequent primary cancer diagnoses</td>
                                <td colSpan='4'>
                                    <span className='col-sm-2'><input type='radio' name='cancerDiagnosis' />{' '} No</span>
                                    <span className='col-sm-5'><input type='radio' name='cancerDiagnosis' />{' '} Yes</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='accordion' onClick={() => setActivePanel(activePanel === 'panelC' ? '' : 'panelC')}>part three</div>
                <div className={activePanel === 'panelC' ? 'panel-active' : 'panellet'} style={{padding: '0'}}>
                    <table style={{marginBottom: '10px'}}>
                        <tbody>
                            <tr>
                                <td colSpan='3'>D.6 Do you have cancer treatment data</td>
                                <td colSpan='4'>
                                    <span className='col-sm-2'><input type='radio' name='cancerTreatmentInfo' />{' '} No</span>
                                    <span className='col-sm-5'><input type='radio' name='cancerTreatmentInfo' />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='3' style={{verticalAlign: 'middle'}}>D.6a Specify the treatment information you have</td>
                                <td colSpan='4'>
                                    <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column'}}>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-3' style={{marginLeft: '0', paddingLeft: '0'}}>Surgery</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-3' style={{marginLeft: '0', paddingLeft: '0'}}> Radiation</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-4' style={{marginLeft: '0', paddingLeft: '0'}}> Chemotherapy</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-4' style={{marginLeft: '0', paddingLeft: '0'}}> Hormonal therapy</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-5' style={{marginLeft: '0', paddingLeft: '0'}}> Bone marrow/stem cell transplant</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-1' style={{marginLeft: '0', paddingLeft: '0'}}> other</span><span className='col-sm-3'><input className='col-sm-12 inputUnderscore' /></span></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='3' style={{verticalAlign: 'middle'}}>D.6b Specify the data sources the treatment information is from</td>
                                <td colSpan='4'>
                                    <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column'}}>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-5' style={{marginLeft: '0', paddingLeft: '0'}}>Administrative claims data</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-5' style={{marginLeft: '0', paddingLeft: '0'}}> Electronic health record</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-5' style={{marginLeft: '0', paddingLeft: '0'}}> Chart abstraction</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-5' style={{marginLeft: '0', paddingLeft: '0'}}> Patient-reported questionnaire</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-1' style={{marginLeft: '0', paddingLeft: '0'}}> other</span><span className='col-sm-3'><input className='col-sm-12 inputUnderscore' /></span></li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='3'>D.6c Would it be possible to collect treatment information from medical records or other sources</td>
                                <td colSpan='4'>
                                    <span className='col-sm-2'><input type='radio' name='fromMedicalRecords' />{' '} No</span>
                                    <span className='col-sm-5'><input type='radio' name='fromMedicalRecords' />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='3'>D.7 Do you have cancer staging data</td>
                                <td colSpan='4'>
                                    <span className='col-sm-2'><input type='radio' name='hasStagingData' />{' '} No</span>
                                    <span className='col-sm-5'><input type='radio' name='hasStagingData' />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='3'>D.8 Do you have tumor grade data</td>
                                <td colSpan='4'>
                                    <span className='col-sm-2'><input type='radio' name='hasGradeData' />{' '} No</span>
                                    <span className='col-sm-5'><input type='radio' name='hasGradeData' />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='3'>D.9 Do you have tumor genetic markers data</td>
                                <td colSpan='4'>
                                    <span className='col-sm-2'><input type='radio' name='hasMarkersData' />{' '} No</span>
                                    <span className='col-sm-2'><input type='radio' name='hasMarkersData' />{' '} Yes</span>
                                    <span className='col-sm-4'><input className='inputUnderscore' name='markerData' style={{margin: '0'}}/></span>
                                    <span style={{color: 'red'}}>please specify</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='3'>D.10 Were cancer cases histologically confirmed</td>
                                <td colSpan='4'>
                                    <span className='col-sm-3'><input type='radio' name='caseConfirmed' />{' '} All</span>
                                    <span className='col-sm-3'><input type='radio' name='caseConfirmed' />{' '} Some</span>
                                    <span className='col-sm-3'><input type='radio' name='caseConfirmed' />{' '} None</span>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan='3' style={{verticalAlign: 'middle'}}>D.11	Do you have cancer subtyping</td>
                                <td colSpan='4'>
                                    <ul style={{listStyle: 'none', display: 'flex', flexDirection: 'column'}}>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-5' style={{marginLeft: '0', paddingLeft: '0'}}>Histological</span></li>
                                        <li><span className='col-sm-1'><input type='checkbox' /></span><span className='col-sm-5' style={{marginLeft: '0', paddingLeft: '0'}}>Molecular</span></li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{position: 'relative'}}>
                    <span  onClick={() => props.sectionPicker('C')} style={{position: 'relative', float: 'left'}}>
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

export default CancerInfoForm