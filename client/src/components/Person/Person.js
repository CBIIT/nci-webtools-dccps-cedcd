import React, {useEffect} from 'react'
import validator from '../../validators'
import allactions from '../../actions'
import {useSelector, useDispatch} from 'react-redux'
import Reminder from '../Tooltip/Tooltip'

import "react-datepicker/dist/react-datepicker.css";

const Person =({id, type, name, position, phone, email, colWidth, errors, disabled, displayStyle, leftPadding}) => {
    const cohort = useSelector(state => state.cohortReducer)
    const dispatch = useDispatch()
    const getValidationResult = (value, requiredOrNot, type, countryCode) => {
        switch(type){
            case 'phone':
                return validator.phoneValidator(countryCode, value)
            case 'date': 
                return validator.dateValidator(value, requiredOrNot)
            case 'number':
                return validator.numberValidator(value, requiredOrNot, false)
            case 'year':
                return validator.yearValidator(value, requiredOrNot)
            case 'url': 
                return validator.urlValidator(value)
            case 'email':
                return validator.emailValidator(value)
            default: 
                return validator.stringValidator(value, requiredOrNot)
        }
    }
    
    const populateErrors = (fieldName, value, requiredOrNot, valueType, countryCode) => {
        const result = getValidationResult(value, requiredOrNot, valueType, countryCode)
        if(result) {
            dispatch(allactions.cohortErrorActions[fieldName](false, result))
        }else{
            dispatch(allactions.cohortErrorActions[fieldName](true))
        }
    }
    
    const processPhoneNumber = (countryCode, telNum) => {
        if(/^\+\s*0*1\s*$/.test(countryCode)){
            if(/^\d{10}$/.test(telNum.trim())){
                if(errors[phone]) dispatch(allactions.cohortErrorActions[phone](true))
                return telNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
            }
           else{
                //dispatch(allactions.cohortErrorActions[phone](false, 'invalid USA phone number'))
                return telNum
            }
        }
        else
            return telNum
    }

    useEffect(() => {
        dispatch(allactions.cohortActions.completerName(cohort.completerName))
    }, [])

    return window.innerWidth <= 1000 ?  <div id={id} className='col-md-12'>
            <div className='col-xs-12' style={{paddingLeft: '0', marginBottom: '5px'}}>
                <div className='col-xs-12' style={{paddingLeft: '0', marginBottom: '5px'}}>Name<span style={{color: 'red'}}>*</span></div>
                {errors[name] && displayStyle ? <Reminder message={errors[name]}><div className='col-xs-12' style={{padding: '0'}}>
                <input style={{border: '1px solid red'}} className='form-control' name={name}  placeholder='Max of 100 characters' maxLength='100' value={cohort[name]} onChange={e => dispatch(allactions.cohortActions[name](e.target.value))} onBlur={(e) => {populateErrors(name, e.target.value, true, 'string')}}/></div></Reminder> : <div className='col-md-12' style={{padding: '0'}}>
                <input className='form-control' name={name} value={cohort[name]}  placeholder='Max of 100 characters' maxLength='100' onChange={e => dispatch(allactions.cohortActions[name](e.target.value))} onBlur={(e) => {populateErrors(name, e.target.value, true, 'string')}} disabled={disabled}/></div>}  
            </div>
            <div className='col-xs-12' style={{paddingLeft: '0', marginBottom: '5px'}}>
                <div className='col-xs-12' style={{paddingLeft: '0', marginBottom: '5px'}}>Position with the cohort<span style={{color: 'red'}}>*</span></div>
                {errors[position] && displayStyle ? <Reminder message={errors[position]}><div className='col-xs-12' style={{padding: '0'}}>
                <input style={{border: '1px solid red'}} className='form-control' name={position} placeholder='Max of 100 characters' maxLength='100' value={cohort[position]} onChange={e => dispatch(allactions.cohortActions[position](e.target.value))} onBlur={(e) => {populateErrors(position, e.target.value, true, 'string')}}/></div></Reminder> : <div className='col-md-12' style={{padding: '0'}}>
                <input className='form-control' placeholder='Max of 100 characters' maxLength='100' name={position} value={cohort[position]} onChange={e => dispatch(allactions.cohortActions[position](e.target.value))} onBlur={(e) => {populateErrors(position, e.target.value, true, 'string')}} disabled={disabled}/></div>}  
            </div>
            <div className='col-xs-12' style={{paddingLeft: '0', marginBottom: '5px'}}>
                <div className='col-xs-12' style={{paddingLeft: '0', marginBottom: '5px'}}>Phone</div>
                    <div className='col-xs-12' style={{padding: '0', margin: '0'}}><input maxLength='10' className='form-control' title='country code' value={cohort[type]} onChange={e => {dispatch(allactions.cohortActions.country_code(type, e.target.value)); populateErrors(phone, cohort[phone], true, 'phone', e.target.value); dispatch(allactions.cohortActions[phone]( processPhoneNumber(e.target.value, cohort[phone])))}} onBlur={e =>{ 
                        if(/^\+\s*$/.test(e.target.value))dispatch(allactions.cohortActions.country_code(type, '+1'))}
                    } disabled={disabled}/></div>
                    {errors[phone] && displayStyle ? <Reminder message={errors[phone]}><div className='col-xs-12' style={{padding: '0', margin: '0'}}><input style={{border: '1px solid red'}} className='form-control' placeholder={cohort[type] === '+1' ? '10 digits for USA' : 'Max of 100 characters'} maxLength='100' name={phone} value={cohort[phone]} onChange={e => dispatch(allactions.cohortActions[phone](processPhoneNumber(cohort[type], e.target.value)))} onBlur={(e) => {populateErrors(phone, e.target.value, true, 'phone', cohort[type])}}/></div></Reminder> : <div className='col-xs-12' style={{padding: '0', margin: '0'}}><input className='form-control' placeholder={cohort[type] === '+1' ? '10 digits for USA' : 'Max of 100 characters'} maxLength='100' name={phone} value={cohort[phone]} onChange={e => dispatch(allactions.cohortActions[phone](processPhoneNumber(cohort[type], e.target.value)))} onBlur={(e) => populateErrors(phone, e.target.value, true, 'phone', cohort[type])}  disabled={disabled}/></div>} 
            </div>
            <div className='col-xs-12' style={{paddingLeft: '0', marginBottom: '5px'}}>
                <div className='col-xs-12' style={{paddingLeft: '0', marginBottom: '5px'}}>Email<span style={{color: 'red'}}>*</span></div>
                {errors[email] && displayStyle ? <Reminder message={errors[email]}><div className='col-xs-12' style={{padding: '0'}}>
                <input style={{border: '1px solid red'}} placeholder='Max of 100 characters' maxLength='100' className='form-control' name={email} value={cohort[email]} onChange={e => dispatch(allactions.cohortActions[email](e.target.value))} onBlur={(e) => {populateErrors(email, e.target.value, true, 'string')}}/></div></Reminder> : <div className='col-md-12' style={{padding: '0'}}>
                <input className='form-control' placeholder='Max of 100 characters' maxLength='100' name={email} value={cohort[email]} onChange={e => dispatch(allactions.cohortActions[email](e.target.value))} onBlur={(e) => {populateErrors(email, e.target.value, true, 'string')}} disabled={disabled}/></div>}  
            </div>
    </div>
     : 
    <div id={id} className={'col-md-'+colWidth} style={{marginLeft: '0', paddingLeft: leftPadding}}>                        
            <div className='col-md-12' style={{paddingLeft: '0', marginBottom: '4px'}}>
                <span className='col-md-5' style={{lineHeight: '2em', paddingLeft: '0'}}>Name<span style={{color: 'red'}}>*</span></span>
                {errors[name] && displayStyle ? <Reminder message={errors[name]}><span className='col-md-7'>
                <input style={{border: '1px solid red'}} placeholder='Max of 100 characters' maxLength='100' className='form-control' name={name} value={cohort[name]} onChange={e => dispatch(allactions.cohortActions[name](e.target.value))} onBlur={(e) => {populateErrors(name, e.target.value, true, 'string')}}/></span></Reminder> : <span className='col-md-7'>
                <input className='form-control' placeholder='Max of 100 characters' maxLength='100' name={name} value={cohort[name]} onChange={e => dispatch(allactions.cohortActions[name](e.target.value))} onBlur={(e) => {populateErrors(name, e.target.value, true, 'string')}} disabled={disabled}/></span>}  
            </div>
            <div  className='col-md-12' style={{paddingLeft: '0', marginBottom: '4px'}}>
                <span className='col-md-5' style={{lineHeight: '2em', paddingLeft: '0'}}>Position with the cohort<span style={{color: 'red'}}>*</span></span>
                {errors[position] && displayStyle ? <Reminder message={errors[position]}><span className='col-md-7'>
                <input style={{border: '1px solid red'}} placeholder='Max of 100 characters' maxLength='100' className='form-control' name={position} value={cohort[position]} onChange={e => dispatch(allactions.cohortActions[position](e.target.value))} onBlur={(e) => {populateErrors(position, e.target.value, true, 'string')}}/></span></Reminder> : <span className='col-md-7'><input className='form-control' placeholder='Max of 100 characters' maxLength='100' name={position} value={cohort[position]} onChange={e => dispatch(allactions.cohortActions[position](e.target.value))} onBlur={(e) => {populateErrors(position, e.target.value, true, 'string')}}  disabled={disabled}/></span>}
            </div>
            <div  className='col-md-12' style={{paddingLeft: '0', marginBottom: '4px'}}>
                <span className='col-md-5' style={{ paddingLeft: '0', lineHeight: '2em'}}>Phone</span>
                <span className='col-md-7'>
                    <span className='col-md-2' style={{padding: '0', margin: '0'}}><input maxLength='10' className='form-control' style={{padding: '5px'}} title='country code' value={cohort[type]} onChange={e => {dispatch(allactions.cohortActions.country_code(type, e.target.value)); dispatch(allactions.cohortActions[phone]( processPhoneNumber(e.target.value, cohort[phone]))); if(cohort[phone]) {populateErrors(phone, cohort[phone], true, 'phone', e.target.value)} else {dispatch(allactions.cohortErrorActions[phone](true))}}} onBlur={e =>{ 
                        if(/^\+\s*$/.test(e.target.value))dispatch(allactions.cohortActions.country_code(type, '+1'))}
                    } disabled={disabled}/></span>
                   {errors[phone] && displayStyle ? <Reminder message={errors[phone]}><span className='col-md-10' style={{padding: '0', margin: '0'}}><input style={{border: '1px solid red'}} className='form-control' placeholder={cohort[type] === '+1' ? '10 digits for USA' : 'Max of 100 characters'}  name={phone} value={cohort[phone]} onChange={e => dispatch(allactions.cohortActions[phone](processPhoneNumber(cohort[type], e.target.value)))} onBlur={(e) => {populateErrors(phone, e.target.value, true, 'phone', cohort[type])}}/></span></Reminder> : <span className='col-md-10' style={{padding: '0', margin: '0'}}><input className='form-control' placeholder={cohort[type] === '+1' ? '10 digits for USA' : 'Max of 100 characters'} name={phone} value={cohort[phone]} onChange={e => dispatch(allactions.cohortActions[phone](processPhoneNumber(cohort[type], e.target.value)))} onBlur={(e) => populateErrors(phone, e.target.value, true, 'phone', cohort[type])}  disabled={disabled}/></span>}
                </span> 
            </div>
            <div className='col-md-12'  style={{paddingLeft: '0'}}>
                <span className='col-md-5' style={{lineHeight: '2em', paddingLeft: '0'}}>Email<span style={{color: 'red'}}>*</span></span>
                {errors[email] && displayStyle ? <Reminder message={errors[email]}><span className='col-md-7'>
                <input style={{border: '1px solid red'}} placeholder='Max of 100 characters' maxLength='100' className='form-control' type='phone' name={email} value={cohort[email]} onChange={e => dispatch(allactions.cohortActions[email](e.target.value))} onBlur={(e) => {populateErrors(email, e.target.value, true, 'email')}}/></span></Reminder> : <span className='col-md-7'>
                <input className='form-control' placeholder='Max of 100 characters' maxLength='100' type='phone' name={email} value={cohort[email]} onChange={e => dispatch(allactions.cohortActions[email](e.target.value))} onBlur={(e) => {populateErrors(email, e.target.value, true, 'email')}}  disabled={disabled}/></span>}
            </div>    
        </div>
}

export default Person