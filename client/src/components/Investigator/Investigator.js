import React from 'react'
import allactions from '../../actions'
import validator from '../../validators'
import {useSelector, useDispatch} from 'react-redux'

const Investigator = ({id, name, institution, email, isRequired, callback, errors, displayStyle}) => {
    const getValidationResult = (value, requiredOrNot, type) => {
        switch(type){
            case 'phone':
                return validator.phoneValidator(value)
            /*
            case 'date': 
                return validator.dateValidator(value, requiredOrNot)
            case 'number':
                return validator.numberValidator(value, requiredOrNot, false)
            case 'year':
                return validator.yearValidator(value, requiredOrNot)
            case 'url': 
                return validator.urlValidator(value)
            */
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
    const idx = id.split('_')[1]
    return <div id={id} className='col-md-12' style={{paddingLeft: '0', marginBottom: '10px'}}>
                <div className='col-md-12' style={{marginBottom: '4px'}}>
                    <span className='col-md-2' style={{lineHeight: '2em', paddingLeft: '0'}}>Name</span>
                    <span className='col-md-6'>
                        <input className='form-control' name={name} value={cohort.investigators[idx].name} onChange={(e) => dispatch(allactions.cohortActions.investigatorName(idx, e.target.value))} onBlur={(e) => {populateErrors(name, e.target.value, isRequired, 'string')}}/>
                    </span>
                    {errors[name] ? <span className='col-md-4' style={{color: 'red', display: displayStyle}}>{errors[name]}</span> : ''}
                </div>
                <div  className='col-md-12' style={{marginBottom: '4px'}}>
                    <span className='col-md-2'  style={{lineHeight: '2em', paddingLeft: '0'}}>Institution</span>
                    <span className='col-md-6'>
                        <input className='form-control' name={institution} value={cohort.investigators[idx].institution} onChange={(e) => dispatch(allactions.cohortActions.investigatorInstitution(idx, e.target.value))} onBlur={(e) => {populateErrors(institution, e.target.value, isRequired, 'string')}}/>
                    </span>
                    {errors[institution] ? <span className='col-md-4' style={{color: 'red', display: displayStyle}}>{errors[institution]}</span> : ''}
                </div>
                <div  className='col-md-12' style={{marginBottom: '4px'}}>
                    <span className='col-md-2'  style={{lineHeight: '2em', paddingLeft: '0'}}>Email</span>
                    <span className='col-md-6'>
                        <input className='form-control' type='email' name={email} value={cohort.investigators[idx].email} onChange={(e) => dispatch(allactions.cohortActions.investigatorEmail(idx, e.target.value))} onBlur={(e) => {populateErrors(email, e.target.value, isRequired, 'email')}}/>
                    </span>
                    {errors[email] ? <span className='col-md-4' style={{color: 'red', display: displayStyle}}>{errors[email]}</span> : ''}
                </div>
            </div>
}

export default Investigator