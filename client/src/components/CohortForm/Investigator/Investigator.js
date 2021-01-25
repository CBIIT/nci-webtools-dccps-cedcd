import React from 'react'
import allactions from '../../../actions'
import validator from '../../../validators'
import {useSelector, useDispatch} from 'react-redux'
import Reminder from '../../Tooltip/Tooltip'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setHasUnsavedChanges } from '../../../reducers/unsavedChangesReducer';

//import "react-datepicker/dist/react-datepicker.css";
import './Investigator.css'

const Investigator = ({id, name, institution, email, handleRemove, errors, disabled=false, displayStyle}) => {
    const getValidationResult = (value, requiredOrNot, type) => {
        switch(type){
            case 'phone':
                return validator.phoneValidator(value)
            case 'email':
                return validator.emailValidator(value, requiredOrNot)
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

    return (
        <Form id={id}>
            <Col sm="12" className="py-3 px-0" style={{ border: '1px solid lightgray' }}>
                <Col sm="6" className="pl-0">
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="6" style={{ fontWeight: 'normal' }}>
                            <span className="pl-3">Name<span style={{ color: 'red' }}>*</span></span>
                        </Form.Label>
                        <Col sm="6">
                            {errors[name] && displayStyle ? 
                                <Reminder message={errors[name]}>
                                    <Form.Control type="text" className='text-capitalize'
                                        style={{ border: '1px solid red' }} 
                                        placeholder="Max of 100 characters"
                                        maxLength="100" 
                                        name={name} 
                                        value={cohort.investigators[idx].name} 
                                        onChange={e => {
                                            dispatch(allactions.cohortActions.investigatorName(idx, e.target.value));
                                            dispatch(setHasUnsavedChanges(true));
                                        }} 
                                        onBlur={e => 
                                            populateErrors(idx, 'investigatorName', e.target.value, true, 'string')
                                        } />
                                </Reminder> : 
                                <Form.Control type="text" className='text-capitalize'
                                    placeholder='Max of 100 characters' 
                                    maxLength='100' 
                                    name={name} 
                                    value={cohort.investigators[idx].name} 
                                    onChange={e => {
                                        dispatch(allactions.cohortActions.investigatorName(idx, e.target.value));
                                        dispatch(setHasUnsavedChanges(true));
                                    }} 
                                    onBlur={e => 
                                        populateErrors(idx, 'investigatorName', e.target.value, true, 'string')
                                    }
                                    readOnly={disabled} />
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="6" style={{ fontWeight: 'normal' }}>
                            <span className="pl-3">Institution<span style={{color: 'red'}}>*</span></span>
                        </Form.Label>
                        <Col sm="6">
                            {errors[institution] && displayStyle ? 
                            <Reminder message={errors[institution]}>
                                <Form.Control type="text" className='text-capitalize'
                                    style={{ border: '1px solid red' }} 
                                    placeholder="Max of 100 characters" 
                                    maxLength='100' 
                                    name={institution} 
                                    value={cohort.investigators[idx].institution} 
                                    onChange={e => {
                                        dispatch(allactions.cohortActions.investigatorInstitution(idx, e.target.value));
                                        dispatch(setHasUnsavedChanges(true));
                                    }} 
                                    onBlur={e => 
                                        populateErrors(idx, 'investigatorInstitution', e.target.value, true, 'string')
                                    } />
                            </Reminder> : 
                            <Form.Control type="text" className='text-capitalize'
                                placeholder="Max of 100 characters"
                                maxLength="100" 
                                name={institution} 
                                value={cohort.investigators[idx].institution} 
                                onChange={e => {
                                    dispatch(allactions.cohortActions.investigatorInstitution(idx, e.target.value));
                                    dispatch(setHasUnsavedChanges(true));
                                }}
                                onBlur={e => 
                                    populateErrors(idx, 'investigatorInstitution', e.target.value, true, 'string')}
                                readOnly={disabled} />
                            }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-1">
                        <Form.Label column sm="6" style={{ fontWeight: 'normal' }}>
                            <span className="pl-3">Email<span style={{color: 'red'}}>*</span></span>
                        </Form.Label>
                        <Col sm="6">
                            {errors[email] && displayStyle ? 
                                <Reminder message={errors[email]}>
                                    <Form.Control type="email"
                                        style={{ border: '1px solid red' }} 
                                        placeholder="Max of 100 characters" 
                                        maxLength="100" 
                                        type='email' 
                                        name={email} 
                                        value={cohort.investigators[idx].email} 
                                        onChange={e => {
                                            dispatch(allactions.cohortActions.investigatorEmail(idx, e.target.value));
                                            dispatch(setHasUnsavedChanges(true));
                                        }} 
                                        onBlur={e => 
                                            populateErrors(idx, 'investigatorEmail', e.target.value, true, 'email')
                                        } />
                                </Reminder> : 
                                <Form.Control type="email"
                                    placeholder="Max of 100 characters"
                                    maxLength="100"  
                                    name={email} 
                                    value={cohort.investigators[idx].email} 
                                    onChange={e => {
                                        dispatch(allactions.cohortActions.investigatorEmail(idx, e.target.value));
                                        dispatch(setHasUnsavedChanges(true));
                                    }} 
                                    onBlur={e=> 
                                        populateErrors(idx, 'investigatorEmail', e.target.value, true, 'email')
                                    } 
                                    readOnly={disabled} />
                            }
                        </Col>
                    </Form.Group>
                </Col>
                <Col sm="6">
                    {(idx !== '0' && !disabled) && 
                        <div className="inspectorClose float-right" style={{ color: 'blue' }} 
                            onClick={() => handleRemove(idx)}>
                            Remove
                        </div>
                    }
                </Col>
            </Col>
        </Form>
    )
}

export default Investigator