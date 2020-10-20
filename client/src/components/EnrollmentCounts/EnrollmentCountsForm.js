import React, {useState, useEffect} from 'react'
//import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import allactions from '../../actions'
const EnrollmentCountsForm = ({...props}) => {
    const enrollmentCount = useSelector(state => state.enrollmentCountsReducer)
    //const [cell141, setCell141] = useState(enrollmentCount['141'])
    //const [cell811, setCell811] = useState(enrollmentCount['811'])
    const dispatch = useDispatch()
    //const {handleSubmit, register, errors} = useForm()
    
    function updateCells(cellid, amount){
        let [firstid, ...rest] = cellid
        let rowtotalid = firstid+'41'
        let coltotalid = 8+rest.join('')
        let originalCellAmount = parseInt(enrollmentCount[cellid] * -1) || 0
        let originalRowTotal = parseInt(enrollmentCount[rowtotalid]) || 0
        let originalGrantTotal = parseInt(enrollmentCount['841']) || 0
        let originalColTotal = parseInt(enrollmentCount[coltotalid]) || 0
        let currentAmountString = amount
        let currentAmount = parseInt(amount) || 0
        let delta = currentAmount + originalCellAmount
        dispatch(allactions.enrollmentCountActions.updateEnrollmentCounts(cellid, currentAmountString))
        dispatch(allactions.enrollmentCountActions.updateTotals(rowtotalid, originalRowTotal+delta))
        dispatch(allactions.enrollmentCountActions.updateTotals(coltotalid, originalColTotal+delta))
        dispatch(allactions.enrollmentCountActions.updateTotals('841', originalGrantTotal+delta))
    }

    const handleSave = () => {

    }
    return <div id='enrollmentCountContainer' className='col-md-12'>
            <div className='col-md-offset-1 col-md-10' style={{display: 'flex', flexDirection: 'column'}}>
                <h1 style={{marginTop: '10px', color: 'blue'}}>Enrollment Counts</h1>
            
                <div style={{backgroundColor: 'grey', color: 'white', marginBottom: '20px'}}>
                    B.{' '} <b>Enrollment Counts</b>(Record actual, not planned, recruitment counts )
                </div>
            <div>
                <form  style={{boxSizing: 'border-box'}}>
                    <div style={{marginTop: '10px'}}>
                        <span><label htmlFor='confirmDate'>B.1{' '}Racial Categories</label></span>
                    </div>
                    <table className='table-stripe table-responsive'>
                        <thead>
                            <tr>
                                <th rowSpan='3' style={{fontSize: '1.5rem', paddingRight: '0', width: '15%'}}>Racial Categories</th>
                                <th colSpan='9' style={{textAlign: 'center'}}>Ethnictiy Categories</th>
                                <th rowSpan='3' style={{width: '10%', textAlign: 'center'}}>Total</th>
                            </tr>
                            <tr>
                                <th colSpan='3' style={{textAlign: 'center'}}>Non Hispanic or Latino</th>
                                <th colSpan='3' style={{textAlign: 'center'}}>Hispanic or Latino</th>
                                <th colSpan='3' style={{textAlign: 'center'}}>Unknown/not reported ethnicity</th>
                            </tr>
                            <tr>
                                <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Female</th>
                                <th style={{fontSize: '1.4rem', textAlign: 'center'}}>male</th>
                                <th style={{fontSize: '1.4rem', paddingRight: '0'}}>unknown</th>
                                <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Female</th>
                                <th style={{fontSize: '1.4rem', textAlign: 'center'}}>male</th>
                                <th  style={{fontSize: '1.4rem', paddingRight: '0'}}>unknown</th>
                                <th style={{fontSize: '1.4rem', textAlign: 'center'}}>Female</th>
                                <th style={{fontSize: '1.4rem', textAlign: 'center'}}>male</th>
                                <th style={{fontSize: '1.4rem', paddingRight: '0'}}>unknown</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th style={{fontSize: '1.2rem', backgroundColor: '01857b', color: 'white'}}>American Indian / Alaska Native</th>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='111'  value={enrollmentCount['111']} onChange={(e) => updateCells('111', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='112'  value={enrollmentCount['112']} onChange={(e) => updateCells('112', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='113'  value={enrollmentCount['113']} onChange={(e) => updateCells('113', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='121'  value={enrollmentCount['121']} onChange={(e) => updateCells('121', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='122'  value={enrollmentCount['122']} onChange={(e) => updateCells('122', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='123'  value={enrollmentCount['123']} onChange={(e) => updateCells('123', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='131'  value={enrollmentCount['131']} onChange={(e) => updateCells('131', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='132'  value={enrollmentCount['132']} onChange={(e) => updateCells('132', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='133'  value={enrollmentCount['133']} onChange={(e) => updateCells('133', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='141'  value={enrollmentCount['141']} /></td>
                            </tr>

                            <tr>
                                <th style={{fontSize: '1.2rem',  backgroundColor: '01857b', color: 'white', paddingTop: '14px', paddingBottom: '14px'}}>Asian</th>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='211'  value={enrollmentCount['211']} onChange={(e) => updateCells('211', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='212'  value={enrollmentCount['212']} onChange={(e) => updateCells('212', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='213'  value={enrollmentCount['213']} onChange={(e) => updateCells('213', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='221'  value={enrollmentCount['221']} onChange={(e) => updateCells('221', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='222'  value={enrollmentCount['222']} onChange={(e) => updateCells('222', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='223'  value={enrollmentCount['223']} onChange={(e) => updateCells('223', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='231'  value={enrollmentCount['231']} onChange={(e) => updateCells('231', e.target.value)}/></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='232'  value={enrollmentCount['232']} onChange={(e) => updateCells('232', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='233'  value={enrollmentCount['233']} onChange={(e) => updateCells('233', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='241'  value={enrollmentCount['241']} /></td>
                            </tr>

                            <tr>
                                <th style={{fontSize: '1.1rem', backgroundColor: '01857b', color: 'white'}}>Native Hawaiian or other pacific islander</th>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='311'  value={enrollmentCount['311']} onChange={(e) => updateCells('311', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='312'  value={enrollmentCount['312']} onChange={(e) => updateCells('312', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='313'  value={enrollmentCount['313']} onChange={(e) => updateCells('313', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='321'  value={enrollmentCount['321']} onChange={(e) => updateCells('321', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='322'  value={enrollmentCount['322']} onChange={(e) => updateCells('322', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='323'  value={enrollmentCount['323']} onChange={(e) => updateCells('323', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='331'  value={enrollmentCount['331']} onChange={(e) => updateCells('331', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='332'  value={enrollmentCount['332']} onChange={(e) => updateCells('332', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='333'  value={enrollmentCount['333']} onChange={(e) => updateCells('333', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='341'  value={enrollmentCount['341']} /></td>
                            </tr>

                            <tr>
                                <th style={{fontSize: '1.2rem', backgroundColor: '01857b', color: 'white'}}>Black or African American</th>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='411'  value={enrollmentCount['411']} onChange={(e) => updateCells('411', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='412'  value={enrollmentCount['412']} onChange={(e) => updateCells('412', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='413'  value={enrollmentCount['413']} onChange={(e) => updateCells('413', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='421'  value={enrollmentCount['421']} onChange={(e) => updateCells('421', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='422'  value={enrollmentCount['422']} onChange={(e) => updateCells('422', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='423'  value={enrollmentCount['423']} onChange={(e) => updateCells('423', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='431'  value={enrollmentCount['431']} onChange={(e) => updateCells('431', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='432'  value={enrollmentCount['432']} onChange={(e) => updateCells('432', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='433'  value={enrollmentCount['433']} onChange={(e) => updateCells('433', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='441'  value={enrollmentCount['441']} /></td>
                            </tr>

                            <tr>
                                <th style={{fontSize: '1.2rem', backgroundColor: '01857b', color: 'white', paddingTop: '14px', paddingBottom: '14px'}}>white</th>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='511'  value={enrollmentCount['511']} onChange={(e) => updateCells('511', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='512'  value={enrollmentCount['512']} onChange={(e) => updateCells('512', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='513'  value={enrollmentCount['513']} onChange={(e) => updateCells('513', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='521'  value={enrollmentCount['521']} onChange={(e) => updateCells('521', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='522'  value={enrollmentCount['522']} onChange={(e) => updateCells('522', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='523'  value={enrollmentCount['523']} onChange={(e) => updateCells('523', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='531'  value={enrollmentCount['531']} onChange={(e) => updateCells('531', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='532'  value={enrollmentCount['532']} onChange={(e) => updateCells('532', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='533'  value={enrollmentCount['533']} onChange={(e) => updateCells('533', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='541'  value={enrollmentCount['541']} /></td>
                            </tr>

                            <tr>
                                <th style={{fontSize: '1.3rem', backgroundColor: '01857b', color: 'white', paddingTop: '14px', paddingBottom: '14px'}}>More than one race</th>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='611'  value={enrollmentCount['611']} onChange={(e) => updateCells('611', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='612'  value={enrollmentCount['612']} onChange={(e) => updateCells('612', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='613'  value={enrollmentCount['613']} onChange={(e) => updateCells('613', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='621'  value={enrollmentCount['621']} onChange={(e) => updateCells('621', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='622'  value={enrollmentCount['622']} onChange={(e) => updateCells('622', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='623'  value={enrollmentCount['623']} onChange={(e) => updateCells('623', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='631'  value={enrollmentCount['631']} onChange={(e) => updateCells('631', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='632'  value={enrollmentCount['632']} onChange={(e) => updateCells('632', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='633'  value={enrollmentCount['633']} onChange={(e) => updateCells('633', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='641'  value={enrollmentCount['641']} /></td>
                            </tr>

                            <tr>
                                <th style={{fontSize: '1.2rem', backgroundColor: '01857b', color: 'white'}}>Unknown or not reported</th>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='711'  value={enrollmentCount['711']} onChange={(e) => updateCells('711', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='712'  value={enrollmentCount['712']} onChange={(e) => updateCells('712', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='713'  value={enrollmentCount['713']} onChange={(e) => updateCells('713', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='721'  value={enrollmentCount['721']} onChange={(e) => updateCells('721', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='722'  value={enrollmentCount['722']} onChange={(e) => updateCells('722', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='723'  value={enrollmentCount['723']} onChange={(e) => updateCells('723', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='731'  value={enrollmentCount['731']} onChange={(e) => updateCells('731', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='732'  value={enrollmentCount['732']} onChange={(e) => updateCells('732', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='733'  value={enrollmentCount['733']} onChange={(e) => updateCells('733', e.target.value)} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='741'  value={enrollmentCount['741']} /></td>
                            </tr>

                            <tr>
                                <th style={{backgroundColor: '01857b', color: 'white'}}>Total</th>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='811'  value={enrollmentCount['811']} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='812'  value={enrollmentCount['812']} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='813'  value={enrollmentCount['813']} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='821'  value={enrollmentCount['821']} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='822'  value={enrollmentCount['822']} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='823'  value={enrollmentCount['823']} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='831'  value={enrollmentCount['831']} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='832'  value={enrollmentCount['832']} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='833'  value={enrollmentCount['833']} /></td>
                                <td style={{padding: '0'}}><input className='inputWriter' style={{fontSize: '1.2rem', textAlign: 'center'}} name='841'  value={enrollmentCount['841']} /></td>
                            </tr>                            
                        </tbody>
                    </table>
                    <div style={{marginTop: '10px'}}>
                        <span><label htmlFor='confirmDate'>B.2{' '}Most recent date enrollment counts were confirmed&nbsp;&nbsp;&nbsp;&nbsp;</label></span>
                        <span><input name='confirmDate'  style={{fontSize: '1.2rem', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '1px solid grey', outline: 'none', background: 'transparent'}} placeholder='(MM/DD/YYYY)'/></span>
                    </div>

                </form>
            </div>
            <div style={{position: 'relative'}}>
                <span  onClick={() => props.sectionPicker('A')} style={{position: 'relative', float: 'left'}}>
                    <input type='button' className='btn btn-primary' value='Go Back' />
                </span>
                <span style={{position: 'relative', float: 'right'}}>
                <span onClick={handleSave}>
                    <input type='button' className='btn btn-primary' value='Save' />
                </span>
                <span onClick={() => props.sectionPicker('C')}>
                    <input type='button' className='btn btn-primary' value='Save & Continue' />
                </span>
                </span>
            </div> 
            </div>
    </div>
}

export default EnrollmentCountsForm