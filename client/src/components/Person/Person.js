import React, {useEffect} from 'react'
import validator from '../../validators'
import allactions from '../../actions'
import {useSelector, useDispatch} from 'react-redux'
import Reminder from '../Tooltip/Tooltip'
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

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

    const showValue = () => {

        if(name === 'contacterName' && cohort.clarification_contact === 1){
            return false
        }
        

        if(name === 'collaboratorName' && cohort.sameAsSomeone !== -1){
            return false
        }

        return true
    }


    useEffect(() => {
        dispatch(allactions.cohortActions.completerName(cohort.completerName))
    }, [])

    return (
        <Col sm="12">
            <Form.Group as={Row} className="mb-1">
                <Form.Label column sm={4} style={{ fontWeight: 'normal' }}>
                    Name<span style={{color: 'red'}}>*</span>
                </Form.Label>
                <Col sm="6">
                    {errors[name] && displayStyle ? 
                        <Reminder message={errors[name]}>
                            <Form.Control type="text" 
                                style={{ border: '1px solid red' }} 
                                placeholder='(Max of 100 characters)' 
                                maxLength="100"
                                name={name} 
                                value={showValue() ? cohort[name] : ''} 
                                onChange={e => 
                                    dispatch(allactions.cohortActions[name](e.target.value))
                                } 
                                onBlur={e => 
                                    populateErrors(name, e.target.value, true, 'string')
                                } />
                        </Reminder> : 
                        <Form.Control type="text"
                            placeholder='(Max of 100 characters)' 
                            maxLength="100"
                            name={name} 
                            value={showValue() ? cohort[name] : ''} 
                            onChange={e => 
                                dispatch(allactions.cohortActions[name](e.target.value))
                            } 
                            onBlur={e => 
                                populateErrors(name, e.target.value, true, 'string')
                            }
                            readOnly={disabled} />
                    }  
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1">
                <Form.Label column sm={4} style={{ fontWeight: 'normal' }}>
                    Position with the cohort<span style={{color: 'red'}}>*</span>
                </Form.Label>
                <Col sm="6">
                    {errors[position] && displayStyle ? 
                        <Reminder message={errors[position]}>
                            <Form.Control type="text"
                                style={{ border: '1px solid red' }} 
                                placeholder='(Max of 100 characters)' 
                                maxLength="100" 
                                name={position} 
                                value={showValue() ? cohort[position] : ''} 
                                onChange={e => 
                                    dispatch(allactions.cohortActions[position](e.target.value))
                                } 
                                onBlur={e => 
                                    populateErrors(position, e.target.value, true, 'string')
                                } />
                        </Reminder> : 
                        <Form.Control type="text"
                            placeholder='(Max of 100 characters)' 
                            maxLength="100" 
                            name={position} 
                            value={showValue() ? cohort[position] : ''} 
                            onChange={e => 
                                dispatch(allactions.cohortActions[position](e.target.value))
                            } 
                            onBlur={e => 
                                populateErrors(position, e.target.value, true, 'string')
                            }  
                            readOnly={disabled} />
                    }
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1">
                <Form.Label column sm={4} style={{ fontWeight: 'normal' }}>
                    Phone
                </Form.Label>
                <Col sm="6">
                    <InputGroup>
                        <Form.Control type="text"
                            maxLength="10"
                            style={{ width: '20%' }} 
                            title='country code' 
                            value={cohort[type]} 
                            onChange={e => {
                                dispatch(allactions.cohortActions.country_code(type, e.target.value)); 
                                dispatch(allactions.cohortActions[phone]( processPhoneNumber(e.target.value, cohort[phone]))); 
                                if(cohort[phone]) {
                                    populateErrors(phone, cohort[phone], true, 'phone', e.target.value);
                                } else {
                                    dispatch(allactions.cohortErrorActions[phone](true));
                                }
                            }} 
                            onBlur={e => {
                                if (/^\+\s*$/.test(e.target.value)) {
                                    dispatch(allactions.cohortActions.country_code(type, '+1'));
                                }
                            }}
                            readOnly={disabled} />
                        {errors[phone] && displayStyle ? 
                            <Reminder message={errors[phone]}>
                                <Form.Control type="text" 
                                    style={{ border: '1px solid red', width: '80%' }} 
                                    placeholder={cohort[type] === '+1' ? '(10 digits for USA)' : '(Max of 100 characters)'} 
                                    maxLength="100" 
                                    name={phone} 
                                    value={ showValue() ? cohort[phone] : ''} 
                                    onChange={e => 
                                        dispatch(allactions.cohortActions[phone](processPhoneNumber(cohort[type], e.target.value)))
                                    } 
                                    onBlur={e => 
                                        populateErrors(phone, e.target.value, true, 'phone', cohort[type])
                                    } />
                            </Reminder> :
                            <Form.Control type="text" 
                                style={{ width: '80%' }}
                                placeholder={cohort[type] === '+1' ? '(10 digits for USA)' : '(Max of 100 characters)'} 
                                maxLength="100" 
                                name={phone} 
                                value={showValue() ? cohort[phone] : ''} 
                                onChange={e => 
                                    dispatch(allactions.cohortActions[phone](processPhoneNumber(cohort[type], e.target.value)))
                                } 
                                onBlur={e => 
                                    populateErrors(phone, e.target.value, true, 'phone', cohort[type])
                                }  
                                readOnly={disabled} />
                        }
                    </InputGroup>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-1">
                <Form.Label column sm={4} style={{ fontWeight: 'normal' }}>
                    Email<span style={{color: 'red'}}>*</span>
                </Form.Label>
                <Col sm="6">
                    {errors[email] && displayStyle ? 
                        <Reminder message={errors[email]}>
                            <Form.Control type="text" 
                                style={{ border: '1px solid red' }} 
                                placeholder="(Max of 100 characters)"
                                maxLength="100" 
                                name={email} 
                                value={showValue() ? cohort[email] : ''} 
                                onChange={e => 
                                    dispatch(allactions.cohortActions[email](e.target.value))
                                } 
                                onBlur={e => 
                                    populateErrors(email, e.target.value, true, 'email')
                                } />
                        </Reminder> :
                        <Form.Control type="text" 
                            placeholder="(Max of 100 characters)" 
                            maxLength="100" 
                            name={email} 
                            value={showValue() ? cohort[email] : ''} 
                            onChange={e => 
                                dispatch(allactions.cohortActions[email](e.target.value))
                            } 
                            onBlur={e => 
                                populateErrors(email, e.target.value, true, 'email')}
                            readOnly={disabled} />
                    }
                </Col>
            </Form.Group> 
        </Col>
    )
}

export default Person