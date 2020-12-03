import React from 'react'
import allactions from '../../actions'
import validator from '../../validators'
import {useSelector, useDispatch} from 'react-redux'
import Reminder from '../Tooltip/Tooltip'

//import "react-datepicker/dist/react-datepicker.css";
import './Investigator.css'

const Investigator = ({id, name, institution, email, handleRemove, errors, displayStyle}) => {
    const getValidationResult = (value, requiredOrNot, type) => {
        switch(type){
            case 'phone':
                return validator.phoneValidator(value)
            case 'email':
                return validator.emailValidator(value)
            default: 
                return validator.stringValidator(value, requiredOrNot)
        }
    }
    
    const populateErrors = (index, fieldName, value, requiredOrNot, valueType) => {
        const result = getValidationResult(value, requiredOrNot, valueType)
        if(result) {
            dispatch(allactions.cohortErrorActions[fieldName](index, false, result))
        }else{
            dispatch(allactions.cohortErrorActions[fieldName](index, true))
        }
    }

    const cohort = useSelector(state => state.cohortReducer)
    const dispatch = useDispatch()
    const idx = id.split('_')[1]

    return <div id={id} className='col-md-12' style={{paddingLeft: '0', marginBottom: '15px'}}>
                <div className='col-md-12' style={{border: '1px solid lightgray'}}>
                    {idx !== '0' ? <div className='col-md-12 inspectorheader'><span className='inspectorClose' onClick={() =>handleRemove(idx)}>Remove</span></div> : <div className='col-md-12 inspectorheader'></div>}
                    <div className='col-md-12' style={{paddingLeft: '0', marginTop: '5px', marginBottom: '5px'}}>
                        <span className='col-md-2' style={{lineHeight: '2em', paddingLeft: '0'}}>Name<span style={{color: 'red'}}>*</span></span>
                        {errors[name] && displayStyle ? <Reminder message={errors[name]}><span className='col-md-9'>
                        <input style={{border: '1px solid red'}} className='form-control' name={name} value={cohort.investigators[idx].name} onChange={(e) => dispatch(allactions.cohortActions.investigatorName(idx, e.target.value))} onBlur={(e) => {populateErrors(idx, 'investigatorName', e.target.value, true, 'string')}}/></span></Reminder> : <span className='col-md-9'><input className='form-control' name={name} value={cohort.investigators[idx].name} onChange={(e) => dispatch(allactions.cohortActions.investigatorName(idx, e.target.value))} onBlur={(e) => {populateErrors(idx, 'investigatorName', e.target.value, true, 'string')}}/></span> }
                    </div>
                    <div  className='col-md-12' style={{paddingLeft: '0', marginBottom: '4px'}}>
                        <span className='col-md-2'  style={{lineHeight: '2em', paddingLeft: '0'}}>Institution<span style={{color: 'red'}}>*</span></span>
                        {errors[institution] && displayStyle ? <Reminder message={errors[institution]}><span className='col-md-9'>
                        <input style={{border: '1px solid red'}} className='form-control' name={institution} value={cohort.investigators[idx].institution} onChange={(e) => dispatch(allactions.cohortActions.investigatorInstitution(idx, e.target.value))} onBlur={(e) => {populateErrors(idx, 'investigatorInstitution', e.target.value, true, 'string')}}/></span></Reminder> : <span className='col-md-9'>
                        <input className='form-control' name={institution} value={cohort.investigators[idx].institution} onChange={(e) => dispatch(allactions.cohortActions.investigatorInstitution(idx, e.target.value))} onBlur={(e) => {populateErrors(idx, 'investigatorInstitution', e.target.value, true, 'string')}}/></span> }
                    </div>
                    <div  className='col-md-12' style={{paddingLeft: '0', marginBottom: '18px'}}>
                        <span className='col-md-2'  style={{lineHeight: '2em', paddingLeft: '0'}}>Email<span style={{color: 'red'}}>*</span></span>
                        {errors[email] && displayStyle ? <Reminder message={errors[email]}><span className='col-md-9'>
                        <input style={{border: '1px solid red'}} className='form-control' type='email' name={email} value={cohort.investigators[idx].email} onChange={(e) => dispatch(allactions.cohortActions.investigatorEmail(idx, e.target.value))} onBlur={(e) => {populateErrors(idx, 'investigatorEmail', e.target.value, true, 'email')}}/></span></Reminder> : <span className='col-md-9'>
                        <input className='form-control' type='email' name={email} value={cohort.investigators[idx].email} onChange={(e) => dispatch(allactions.cohortActions.investigatorEmail(idx, e.target.value))} onBlur={(e) => {populateErrors(idx, 'investigatorEmail', e.target.value, true, 'email')}}/></span>}
                    </div>
                </div>
            </div>
}

export default Investigator