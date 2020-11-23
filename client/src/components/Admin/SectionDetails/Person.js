import React, { useEffect } from 'react'
import validator from '../../../validators'
import allactions from '../../../actions'
import { useSelector, useDispatch } from 'react-redux'

const Person = ({ id, type, name, position, phone, email, colWidth, callback, errors, displayStyle, leftPadding }) => {
    const cohort = useSelector(state => state.cohortReducer)
    const dispatch = useDispatch()
    const getValidationResult = (value, requiredOrNot, type, countryCode) => {
        switch (type) {
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
        if (result) {
            let shadow = { ...errors }
            shadow[fieldName] = result
            callback(shadow)
        } else {
            if (errors[fieldName]) {
                let shadow = { ...errors }
                delete shadow[fieldName]
                callback(shadow)
            }

        }
    }

    const processPhoneNumber = (countryCode, telNum) => {
        if (/^\+\s*0*1\s*$/.test(countryCode) && /^\d{10}$/.test(telNum.trim()))
            return telNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
        else
            return telNum
    }

    useEffect(() => {
        dispatch(allactions.cohortActions.completerName(cohort.completerName))
    }, [])

    return <div id={id} className={'col-md-' + colWidth} style={{ marginLeft: '0', paddingLeft: leftPadding }}>
        <div className='col-md-12' style={{ marginBottom: '4px' }}>
            <span className='col-md-5' style={{ lineHeight: '2em', paddingLeft: '0' }}>Name<span style={{ color: 'red' }}>*</span></span>
            <span className='col-md-7'>
                <input className='form-control' name={name} value={cohort[name]} readOnly />
            </span>
        </div>
        <div className='col-md-12' style={{ marginBottom: '4px' }}>
            <span className='col-md-5' style={{ lineHeight: '2em', paddingLeft: '0' }}>Position with the cohort<span style={{ color: 'red' }}>*</span></span>
            <span className='col-md-7'>
                <input className='form-control' name={position} value={cohort[position]} readOnly />
            </span>
        </div>
        {/*
            <div className='col-md-12'>
                <span className='col-md-offset-5 col-md-7'>
                    <input type='checkbox' /> {' '}international phone number
                </span>
            </div>
            */}
        <div className='col-md-12' style={{ marginBottom: '4px' }}>
            <span className='col-md-5' style={{ paddingLeft: '0', lineHeight: '2em' }}>Phone(country code & tel#)</span>
            <span className='col-md-7'>
                <span className='col-md-2' style={{ padding: '0', margin: '0' }}><input className='form-control' style={{ padding: '5px' }} value={cohort[type]} readOnly /></span>
                <span className='col-md-10' style={{ padding: '0', margin: '0' }}><input className='form-control' placeholder='10 digits for USA' type='phone' name={phone} value={cohort[phone]} readOnly /></span>
            </span>
        </div>
        <div className='col-md-12'>
            <span className='col-md-5' style={{ lineHeight: '2em', paddingLeft: '0' }}>Email<span style={{ color: 'red' }}>*</span></span>
            <span className='col-md-7'>
                <input className='form-control' type='phone' name={email} value={cohort[email]} readOnly />
            </span>
        </div>
    </div>
}

export default Person