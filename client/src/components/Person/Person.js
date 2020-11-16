import React, {useEffect} from 'react'
import validator from '../../validators'
import allactions from '../../actions'
import {useSelector, useDispatch} from 'react-redux'

const Person =({id, name, position, phone, email, colWidth, callback, errors, displayStyle, leftPadding}) => {
    const getValidationResult = (value, requiredOrNot, type) => {
        switch(type){
            case 'phone':
                return validator.phoneValidator(value)
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
    
    const populateErrors = (fieldName, value, requiredOrNot, valueType) => {
        const result = getValidationResult(value, requiredOrNot, valueType)
        if(result) {
            let shadow = {...errors}
            shadow[fieldName] = result
            callback(shadow)
        }else{
            if(errors[fieldName]){
                let shadow = {...errors}
                delete shadow[fieldName] 
                callback(shadow) 
            }
            
        }
    }
    const cohort = useSelector(state => state.cohortReducer)
    const dispatch = useDispatch()

    const processPhoneNumber = (telNum) => {
        if(/^\d{10}$/.test(telNum.trim()))
            return telNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        else
            return telNum
    }

    useEffect(() => {
        dispatch(allactions.cohortActions.completerName(cohort.completerName))
    }, [])

    return <div id={id} className={'col-md-'+colWidth} style={{marginLeft: '0', paddingLeft: leftPadding}}>                           
            <div className='col-md-12' style={{marginBottom: '4px'}}>
                <span className='col-md-5' style={{lineHeight: '2em', paddingLeft: '0'}}>Name<span style={{color: 'red'}}>*</span></span>
                <span className='col-md-7'>
                    <input className='form-control' name={name} value={cohort[name]} onChange={e => dispatch(allactions.cohortActions[name](e.target.value))} onBlur={(e) => {populateErrors(name, e.target.value, true, 'string')}}/>
                </span>
            </div>
            {errors[name] ? <div><span className='col-md-offset-5 col-md-7' style={{color: 'red', display: displayStyle}}>{errors[name]}</span></div> : ''}
            <div  className='col-md-12' style={{marginBottom: '4px'}}>
                <span className='col-md-5' style={{lineHeight: '2em', paddingLeft: '0'}}>Position with the cohort<span style={{color: 'red'}}>*</span></span>
                <span className='col-md-7'>
                    <input className='form-control' name={position} value={cohort[position]} onChange={e => dispatch(allactions.cohortActions[position](e.target.value))} onBlur={(e) => {populateErrors(position, e.target.value, true, 'string')}}/>
                </span>
            </div>
            {errors[position] ? <div><span className='col-md-offset-5 col-md-7' style={{color: 'red', display: displayStyle}}>{errors[position]}</span></div> : ''}
            <div  className='col-md-12' style={{marginBottom: '4px'}}>
                <span className='col-md-5' style={{lineHeight: '2em', paddingLeft: '0'}}>Phone</span>
                <span className='col-md-7'>
                    <input className='form-control' placeholder='10 digits' type='phone' name={phone} value={cohort[phone]} onChange={e => dispatch(allactions.cohortActions[phone](processPhoneNumber(e.target.value)))} onBlur={(e) => {populateErrors(phone, e.target.value, true, 'phone')}}/>
                </span>
            </div>
            {errors[phone] ? <div><span className='col-md-offset-5 col-md-7' style={{color: 'red', display: displayStyle}}>{errors[phone]}</span></div> : ''}
            <div className='col-md-12'>
                <span className='col-md-5' style={{lineHeight: '2em', paddingLeft: '0'}}>Email<span style={{color: 'red'}}>*</span></span>
                <span className='col-md-7'>
                    <input className='form-control' type='phone' name={email} value={cohort[email]} onChange={e => dispatch(allactions.cohortActions[email](e.target.value))} onBlur={(e) => {populateErrors(email, e.target.value, true, 'email')}}/>
                </span>
            </div>
            {errors[email] ? <div><span className='col-md-offset-5 col-md-7' style={{color: 'red', display: displayStyle}}>{errors[email]}</span></div> : ''} 
        </div>
}

export default Person