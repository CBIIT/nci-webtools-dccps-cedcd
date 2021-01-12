import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../controls/modal/modal'
import Unauthorized from '../Unauthorized/Unauthorized';
import RequireAuthorization from '../RequireAuthorization/RequireAuthorization';
import './AddNewCohort.css';

const EditUser = ({ ...props }) => {

    const [activeStatus, setActiveStatus] = useState('Y');
    const [allCohortList, setAllCohortList] = useState(null)
    const [cohortList, setCohortList] = useState([]);
    const [currentUser, setCurrentUser] = useState({
        email: '',
        user_name: ''
    });
    const [existingList, setExistingList] = useState([]);
    const [failureMsg, setFailureMsg] = useState(false);
    const [firstName, setFirstName] = useState('');
    const history = useHistory();
    const [lastName, setLastName] = useState('');
    const [modalShow, setModalShow] = useState(false);
    const [nonExistUser, setNonExistUser] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');

    const isNew = props.isNew;

    const userId = window.location.pathname.split('/').pop();

    const lookup = useSelector(state => state.lookupReducer)

    const isNull = v => ['', "", undefined, null].includes(v)


    const [errors, setErrors] = useState({
        email_error: '',
        firstName_error: '',
        lastName_error: '',
        userName_error: '',
        userRole_error: '',
        cohortList_error: ''
    })

    useEffect(() => {
        setAllCohortList(lookup.allcohortlist.map((item, idx) => ({ value: item.acronym, label: item.acronym, name: item.name })))
        const allCohorts = lookup.allcohortlist.map((item, idx) => ({ value: item.acronym, label: item.acronym, name: item.name }))

        const fetchUserData = async function () {
            const result = await fetch(`/api/managecohort/getUserProfile/${userId}`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => res.json());

            if (result.data.info[0] !== undefined) {
                const data = result.data.info[0]
                setExistingList(result.data.emailList)
                let resultStatus = result.data.result[0].total


                if (+resultStatus === 1) {
                    setUserEmail(data.email)
                    setFirstName(data.first_name)
                    setLastName(data.last_name)
                    setUserName(data.user_name || '')
                    setUserRole(data.user_role)
                    setActiveStatus(data.active_status)
                    if (data.cohort_list) {

                        const list = data.cohort_list.split(',').map((item, idx) => ({ value: item, label: item }))
                        const toAdd = []

                        list.map((cohort) => {

                            const object = allCohorts.find(item => item.value === cohort.value)
                            toAdd.push(object)
                        })

                        setCohortList(toAdd)
                    }
                    setCurrentUser({ email: data.email, user_name: data.user_name })
                }
            } else {
                setNonExistUser(true)
            }
        };

        const fetchExistingData = async function () {
            const result = await fetch(`/api/managecohort/getUserProfile/0`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => res.json());
            setExistingList(result.data.emailList)
        };

        if (!isNew) {
            fetchUserData();
        } else {
            fetchExistingData();
        }

    }, [])

    const handleMultiChange = (option) => {
        setCohortList(option)
    }

    const resetState = () => {
        setUserName('')
        setUserEmail('')
        setFirstName('')
        setLastName('')
        setUserName('')
        setUserRole('')
        setActiveStatus('')
        setCohortList([])
    }

    const sendEmail = () => {

        let html = ''

        if (cohortList && cohortList.length > 0) {

            cohortList.map((cohort) => {
                html += '<li>Cohort: ' + cohort.name + ' (' + cohort.value + ')</li>\n\t'
            })
        }
        else
            html += '<li>No cohorts associated with your account</li>'

        let reqBody = {
            templateData: {
                user: firstName + ' ' + lastName,
                cohort: html.trim(),
                website: window.location.origin,
            },
            email: userEmail,
            topic: 'Cohort(s) Assignment changes on your CEDCD User Account',
        };
        fetch('/api/cohort/sendUserEmail', {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result && result.status === 200) {
                    //let timedMessage = setTimeout(() => { setSuccessMsg(true) }, 4000)
                    //clearTimeout(timedMessage)
                }
                else {
                    //let timedMessage = setTimeout(() => { setFailureMsg(true) }, 4000)
                    //clearTimeout(timedMessage)
                }
            })
    }


    const handleSave = () => {

        const userInfo = {
            email: userEmail,
            first_name: firstName,
            last_name: lastName,
            user_name: userName,
            user_role: userRole,
            cohort_list: cohortList ? Object.values(cohortList).map((item, idx) => item.label) : [],
            active_status: activeStatus
        }

        if (validateInput()) {
            let uid = isNew ? 0 : userId
            const saveData = async function () {
                const result = await fetch(`/api/managecohort/updateUserProfile/${uid}`, {
                    method: "POST",
                    body: JSON.stringify(userInfo),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json());
                if (result.status === 200) {
                    setSuccessMsg(true)
                    sendEmail()
                    if (isNew) resetState()
                } else {
                    setFailureMsg(true)
                }
            };
            saveData();
        }
        else {
            setModalShow(true)
        }

    }

    const validateInput = () => {
        let copy = { ...errors }

        copy.email_error = validator.emailValidator(userEmail, true, false)
        copy.firstName_error = isNull(firstName) ? 'Missing required field' : ''
        copy.lastName_error = isNull(lastName) ? 'Missing required field' : ''
        copy.userName_error = isNull(userName) ? 'Missing required field' : ''
        copy.userRole_error = isNull(userRole) ? 'Missing required field' : ''

        if ((isNull(copy.email_error) && currentUser.email !== userEmail) || isNew) {
            if (existingList.some(item => item.email === userEmail)) copy.email_error = 'Existing email'
        }
        if (isNull(copy.userName_error) && currentUser.user_name !== userName || isNew) {
            if (existingList.some(item => item.user_name === userName)) copy.userName_error = 'Existing user name'
        }

        setErrors(copy);    

        return !Object.values(copy).some(x => (x !== undefined && x !== '' && x !== null));
    }

    const goBack = () => {
        history.push(`/admin/manageuser`);
    }


    return <RequireAuthorization role="SystemAdmin">
            <div id='editUserContainer' className='col-md-12'>
                {successMsg && <Messenger message='Your changes were saved.' severity='success' open={true} changeMessage={setSuccessMsg} />}
                {failureMsg && <Messenger message='Your changes could not be saved.' severity='warning' open={true} changeMessage={setFailureMsg} />}

                <CenterModal
                    show={modalShow}
                    title={<span>Confirmation Required</span>}
                    body={<div className="my-3">There are validation errors. Please fix these issues before updating records.</div>}
                    footer={<div>
                        <button className="btn btn-primary mx-2" onClick={() => setModalShow(false)} >OK</button>
                    </div>}
                />

                <div id="editUserForm" className="row pop-form col-md-12">
                    <div id="edituser-main" className="col">
                        <div id="edituser-header" className="col-md-12">
                            {isNew ? <h1 className="pg-title">Add User </h1> : <h1 className="pg-title"> Edit User </h1>}
                        </div>
                        {nonExistUser ? <div className="col-md-12 col-6">
                            <div className="col-md-12 col-6"> <h4> Non existing user id</h4> </div>
                            <div className="bttn-group col-md-4 col-xs-6">
                                <input type='button' className='col-md-1 col-xs-6 btn btn-primary'
                                    value="Cancel" onClick={goBack} style={{ paddingLeft: '20' }} />
                            </div></div>
                            :
                            <div id="edituser-col-1" className="col-md-12 col-12">
                                <form >
                                    <p id="ctl11_rg_errorMsg" className="bg-danger"></p>
                                    <div id="ctl11_div_userName" className=" my-3 col-md-12 col-12">
                                        <label className="col-md-12 col-12" htmlFor="user_name" style={{ paddingLeft: '0' }}>User Account Name <span className="required">*</span></label>
                                        {errors.userName_error !== '' && <label style={{ color: 'red' }}>{errors.userName_error}</label>}
                                        <span className="col-md-4 col-12" style={{ paddingLeft: '0' }}>
                                            <input className="form-control" name="user_userName" type="text" placeholder='Max of 100 characters'
                                                id="user_userName" value={userName} maxLength="100"
                                                onChange={(e) => { setUserName(e.target.value); if (errors.userName_error !== '') setErrors({ ...errors, userName_error: '' }) }} />
                                        </span>
                                    </div>
                                    <div id="ctl11_div_userEmail" className=" my-3 col-md-12 col-12">
                                        <label className="col-md-12 col-12" htmlFor="user_email" style={{ paddingLeft: '0' }}>Email<span className="required">*</span></label>
                                        {errors.email_error !== '' && <label style={{ color: 'red' }}>{errors.email_error}</label>}
                                        <span className="col-md-4 col-12" style={{ paddingLeft: '0' }}><input className="form-control" name="user_email" type="email" id="user_email" value={userEmail}
                                            placeholder='Valid email address' maxLength="100"
                                            onChange={(e) => {
                                                setUserEmail(e.target.value);
                                                if (errors.email_error !== '') setErrors({ ...errors, email_error: '' })
                                            }} />
                                        </span>
                                    </div>

                                    <div id="ctl11_div_lastName" className=" my-3 col-md-12 col-12">
                                        <label className="col-md-12 col-12" htmlFor="user_lastName" style={{ paddingLeft: '0' }}>Last Name <span className="required">*</span></label>
                                        {errors.lastName_error !== '' && <label style={{ color: 'red' }}>{errors.lastName_error}</label>}
                                        <span className="col-md-4 col-12" style={{ paddingLeft: '0' }}><input className="form-control" name="user_lastName" type="text" placeholder='Max of 50 characters'
                                            id="user_lastName" value={lastName} maxLength="50"
                                            onChange={(e) => { setLastName(e.target.value); if (errors.lastName_error !== '') setErrors({ ...errors, lastName_error: '' }) }} />
                                        </span>
                                    </div>
                                    <div id="ctl11_div_firstName" className=" my-3 col-md-12 col-12">
                                        <label className="col-md-12 col-12" htmlFor="user_firstName" style={{ paddingLeft: '0' }}>First Name<span className="required">*</span></label>
                                        {errors.firstName_error !== '' && <label style={{ color: 'red' }}>{errors.firstName_error}</label>}
                                        <span className="col-md-4 col-12" style={{ paddingLeft: '0' }}><input className="form-control" name="user_firstName" type="text" placeholder='Max of 50 characters'
                                            id="user_firstName" value={firstName} maxLength="50"
                                            onChange={(e) => { setFirstName(e.target.value); if (errors.firstName_error !== '') setErrors({ ...errors, firstName_error: '' }) }} />
                                        </span>
                                    </div>
                                    <div id="ctl11_div_firstName" className=" my-3 col-md-12 col-12" >
                                        <label className="col-md-12 col-12" htmlFor="user_role" style={{ paddingLeft: '0' }}>Role<span className="required">*</span></label>
                                        {errors.userRole_error !== '' && <label style={{ color: 'red' }}>{errors.userRole_error}</label>}
                                        <div className='col-md-2 col-6' style={{ paddingLeft: '0' }} >
                                            <span ><input type='radio' style={{ marign: 'auto' }} name={userRole} value="Admin"
                                                checked={userRole === 'Admin'} onChange={(e) => { setUserRole(e.target.value); if (errors.userRole_error !== '') setErrors({ ...errors, userRole_error: '' }) }} /> Admin</span>
                                        </div>
                                        <div className='col-md-2 col-6' style={{ paddingLeft: '0' }} >
                                            <span ><input type='radio' style={{ marign: 'auto' }} name={userRole} value="Cohort Owner"
                                                checked={userRole === 'Cohort Owner'} onChange={(e) => {
                                                    setUserRole(e.target.value); setCohortList([]);
                                                    if (errors.userRole_error !== '') setErrors({ ...errors, userRole_error: '' })
                                                }} />{' '}Cohort Owner</span>
                                        </div>
                                    </div>

                                    <div className="my-3 col-md-12 col-12" style={{ paddingLeft: '0' }}>

                                        <div className="col-md-12 col-12" > <label >Cohort </label>
                                        </div>

                                        {userRole === 'Admin' ?
                                            <div className="col-md-6 col-6" >
                                                <span className="col-md-4 col-12" style={{ paddingLeft: '0' }}>
                                                    <input className="form-control" type="text" value="All" readOnly />
                                                </span>

                                            </div>
                                            :
                                            <div className="col-md-12 col-12" style={{ paddingLeft: '0', width: '90%' }}>
                                                <div className="col-md-5 col-6" style={{ width: '90%' }}>
                                                    <Select name='owners' isMulti='true' value={cohortList} options={allCohortList} onChange={handleMultiChange} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <div className=" my-3 col-md-12 col-sm-12 col-12" style={{ paddingLeft: '0' }}>
                                        <div className=" col-md-4 col-6">
                                            <span className="col-md-4 col-12" style={{ paddingLeft: '0', paddingRight: '10' }}><input type='checkbox' name='active_status' checked={activeStatus === 'Y'}
                                                onChange={(e) => { activeStatus === 'Y' ? setActiveStatus('N') : setActiveStatus('Y') }} />{' '} Active
                                        </span>
                                        </div>
                                    </div>
                                </form>

                                <div className="bttn-group col-md-4 col-xs-6">
                                    <input type='button' className='col-md-2 col-xs-6 btn btn-primary'
                                        value="Save" onClick={handleSave} style={{ paddingLeft: '40', paddingRight: '20' }} />

                                    <input type='button' className='col-md-1 col-xs-6 btn btn-primary'
                                        value="Cancel" onClick={goBack} style={{ paddingLeft: '20' }} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </RequireAuthorization>
}

export default EditUser;