import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import allactions from '../../actions'


const MajorContentForm = ({...props}) => {
    const majorContent = useSelector(state => state.majorContentReducer)
    return <div>
        <div className='col-md-offset-1 col-md-10' style={{display: 'flex', flexDirection: 'column', width: '80%'}}>           
            <h1 style={{marginTop: '10px', color: 'blue'}}>Data on Major Content Domains</h1>
            <div style={{backgroundColor: 'grey', color: 'white', marginBottom: '20px'}}>
                C.{' '} Please specify whether you collected data within these major content domains. Baseline refers to deta collected at or near enrollment into the cohort
            </div>
            <div>
                <form>
                    <table className='table table-stripe table-responsive table-borderless'>
                        <thead>
                            <tr>
                                <th className='col-sm-4' style={{textAlign: 'center'}}>Did you collect data on</th>
                                <th className='col-sm-4' style={{textAlign: 'center'}}>Collected at baseline</th>
                                <th className='col-sm-4' style={{textAlign: 'center'}}>Collected during follow-up</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                            <tr>
                                <td><span>C.1 Socio-economic Status</span></td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusBaseLine())} />{' '} Yes</span>
                                </td>
                                <td> 
                                    <span className='col-sm-offset-2 col-sm-4'><input type='radio' name='seStatusBaseLine' checked={majorContent.seStatusFollowUp === 0} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} No</span>
                                    <span className='col-sm-4'><input type='radio' name='seStatusFollowUp' checked={majorContent.seStatusBaseLine === 1} onChange = {() => dispatchEvent(allactions.majorContentActions.setSeStatusFollowUp())} />{' '} Yes</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>
}

export default MajorContentForm