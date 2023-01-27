import React, { useState, useEffect } from 'react'
import { useHistory, NavLink } from "react-router-dom";
import Select from 'react-select';
import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../controls/modal/modal'
import Unauthorized from '../Unauthorized/Unauthorized';
import RequireAuthorization from '../RequireAuthorization/RequireAuthorization';
import './AddNewCohort.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const EditUser = ({ ...props }) => {

    const [activeStatus, setActiveStatus] = useState('Y');
    const [allCohortList, setAllCohortList] = useState(null)
    const [cohortList, setCohortList] = useState([]);
    const [currentUser, setCurrentUser] = useState({
        email: '',
        login_type: ''
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
    const [loginType, setLoginType] = useState('');
    const [initial, setInitial] = useState({});

    const isNew = props.isNew;
    const LOGIN_EMAIL_ERR_MSG = "Existing user email & login type";

    const userId = window.location.pathname.split('/').pop();

    // const lookup = useSelector(state => state.lookupReducer)

    const isNull = v => ['', "", undefined, null].includes(v)


    const [errors, setErrors] = useState({
        email_error: '',
        firstName_error: '',
        lastName_error: '',
       // userName_error: '',
        userRole_error: '',
        cohortList_error: '',
        loginType_error: '',
    })

    useEffect(() => {
        //  setAllCohortList(lookup.allcohortlist.map((item, idx) => ({ value: item.acronym, label: item.acronym, name: item.name })))
        // const allCohorts = lookup.allcohortlist.map((item, idx) => ({ value: item.acronym, label: item.acronym, name: item.name }))

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

                const allCohorts = (result.data.cohortList).map((item, idx) => ({ value: item.acronym, label: item.acronym, name: item.name }))

                setAllCohortList(allCohorts)


                if (+resultStatus === 1) {
                    setUserEmail(data.email)
                    setLoginType(data.login_type)
                    setFirstName(data.first_name)
                    setLastName(data.last_name)
                    setUserName(data.user_name || '')
                    setUserRole(data.user_role)
                    setActiveStatus(data.active_status)
                    const initialAcronym = []
                    if (data.cohort_list) {

                        const list = data.cohort_list.split(',').map((item, idx) => ({ value: item, label: item }))
                        const toAdd = []

                        if (data.user_role !== 'Admin') {
                            list.map((cohort) => {
                                const object = allCohorts.find(item => item.value === cohort.value)
                                initialAcronym.push(object.value)
                                toAdd.push(object)
                            })
                        }

                        setCohortList(toAdd)
                    }
                    setCurrentUser({ email: data.email, login_type: data.login_type })

                    setInitial({
                        email: data.email,
                        login_type: data.login_type,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        user_name: data.user_name,
                        user_role: data.user_role,
                        active_status: data.activeStatus,
                        active_status: data.active_status,
                        cohort_list: initialAcronym.sort()
                    })
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
            let alls = (result.data.cohortList).map((item, idx) => ({ value: item.acronym, label: item.acronym, name: item.name }))
            setAllCohortList(alls)


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
        setUserEmail('')
        setLoginType('')
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
            template: '/templates/email-owner-template.html',
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
            login_type: loginType,
            first_name: firstName,
            last_name: lastName,
            user_name: userName ? userName: loginType ==='NIH'? firstName||lastName : userEmail,
            user_role: userRole,
            active_status: activeStatus,
            cohort_list: cohortList ? Object.values(cohortList).map((item, idx) => item.label) : [],
        }

        userInfo.cohort_list.sort()

        if (validateInput()) {
            let uid = isNew ? 0 : userId

            if (JSON.stringify(initial) !== JSON.stringify(userInfo)) {
                setInitial(userInfo)
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
                        if(activeStatus === 'Y') {
                            sendEmail()
                        }
                        if (isNew) resetState()
                    } else {
                        setFailureMsg(true)
                    }
                };
                saveData();
            }
            else
                setSuccessMsg(true)
        }
        else {
            setModalShow(true)
        }

    }

    const validateInput = () => {
        let copy = { ...errors }

        copy.email_error = validator.emailValidator(userEmail)
        copy.loginType_error = isNull(loginType) ? 'Missing required field' : ''
        copy.firstName_error = isNull(firstName) ? 'Missing required field' : ''
        copy.lastName_error = isNull(lastName) ? 'Missing required field' : ''
       // copy.userName_error = isNull(userName) ? 'Missing required field' : ''
        copy.userRole_error = isNull(userRole) ? 'Missing required field' : ''

        if ((isNull(copy.loginType_error) && currentUser.login_type !== loginType) ||
        (isNull(copy.email_error) && currentUser.email !== userEmail) || isNew) {
            if (existingList.some(item => item.login_type === loginType && item.email === userEmail)) {
               // if (existingList.some(item => item.email === userEmail)) {
                    copy.email_error = LOGIN_EMAIL_ERR_MSG
                    copy.loginType_error = LOGIN_EMAIL_ERR_MSG
              //  }
            }
        }


        setErrors(copy);

        return !Object.values(copy).some(x => (x !== undefined && x !== '' && x !== null));
    }

    const goBack = () => {
        history.push(`/admin/manageuser`);
    }


    return (
        <div id='editUserContainer' className='col-md-12'>
            {successMsg && <Messenger message='Your changes were saved.' severity='success' open={true} changeMessage={setSuccessMsg} />}
            {failureMsg && <Messenger message='Your changes could not be saved.' severity='warning' open={true} changeMessage={setFailureMsg} />}

            <CenterModal
                show={modalShow}
                title={<span>Validation Errors</span>}
                body={<div className="my-3">There are validation errors. Please fix these issues before updating records.</div>}
                footer={<div>
                    <Button className="col-lg-2 col-md-6" variant="primary" onClick={() => setModalShow(false)} >OK</Button>
                </div>}
            />

            <div id="editUserForm" className="row pop-form col-md-12">
                <div id="edituser-main" className="col">
                    <div id="edituser-header" className="col-md-12">
                        <p className="welcome p-0">
                            <NavLink to="/admin/manageuser">
                                <i className="fas fa-chevron-left mr-2" />
                    Back to Manage Users
                </NavLink>
                        </p>
                        {isNew ? <h1 className="pg-title">Add User </h1> : <h1 className="pg-title"> Edit User </h1>}
                    </div>
                    {nonExistUser ? <div className="col-md-12 col-6">
                        <div className="col-md-12 col-6"> <h4> Non existing user id</h4> </div>
                        <div className="bttn-group col-md-4 col-xs-6">
                            <input type='button' className='col-md-1 col-xs-6 btn btn-primary'
                                value="Cancel" onClick={goBack} style={{ paddingLeft: '20' }} />
                        </div></div>
                        :
                        <div id="edituser-col-1" className="col-md-6 col-6">
                            <Form>
                                <p id="ctl11_rg_errorMsg" className="bg-danger"></p>
                                {/* <Form.Group id="ctl11_div_userName" className="px-0 my-3 col-md-12 col-12">
                                    <Form.Label className="col-md-12 col-12" htmlFor="user_name" style={{ paddingLeft: '0' }}>User Account Name<span style={{ color: 'red' }}>*</span></Form.Label>
                                    {errors.userName_error !== '' && <Form.Label style={{ color: 'red' }}>{errors.userName_error}</Form.Label>}
                                    <span className="col-md-12 col-12" style={{ paddingLeft: '0' }}>
                                        <input className="form-control" name="user_userName" type="text" placeholder='Max of 100 characters'
                                            id="user_userName" value={userName} maxLength="100"
                                            onChange={(e) => { setUserName(e.target.value); if (errors.userName_error !== '') setErrors({ ...errors, userName_error: '' }) }} />
                                    </span>
                                </Form.Group> */}

                                <Form.Group id="ctl11_div_loginType" className="pl-0 my-3 col-md-12 col-12" >
                                    <Form.Label className="col-md-12 col-12" htmlFor="login_type" style={{ paddingLeft: '0' }}>Login Type<span style={{ color: 'red' }}>*</span></Form.Label>
                                    {errors.loginType_error !== '' && <Form.Label style={{ color: 'red' }}>{errors.loginType_error}</Form.Label>}
                                    <Col sm="6" className="d-flex justify-content-between align-self-center">
                                        <Form.Check type='radio' inline>
                                            <Form.Check.Input
                                                type='radio'
                                                value="Login.gov"
                                                checked={loginType === 'Login.gov'}
                                                onChange={(e) => {
                                                    setLoginType(e.target.value); 
                                                    if (errors.loginType_error !== ''){
                                                        if (LOGIN_EMAIL_ERR_MSG.valueOf() === errors.loginType_error){
                                                            setErrors({ ...errors, email_error: '' , loginType_error: '' });
                                                        } else{
                                                            setErrors({ ...errors, loginType_error: '' })
                                                        }
                                                    }
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Login.gov
                                            </Form.Check.Label>
                                        </Form.Check>

                                        <Form.Check type='radio' inline>
                                            <Form.Check.Input
                                                type='radio'
                                                value="NIH"
                                                checked={loginType === 'NIH'}
                                                onChange={(e) => {
                                                    setLoginType(e.target.value);

                                                    if (errors.loginType_error !== '') {
                                                        if (LOGIN_EMAIL_ERR_MSG.valueOf() === errors.loginType_error ) {
                                                            setErrors({ ...errors, email_error: '' , loginType_error: '' });
                                                        } else {
                                                            setErrors({ ...errors, loginType_error: '' })
                                                        }
                                                    }

                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                NIH &nbsp; &nbsp;
                                            </Form.Check.Label>
                                        </Form.Check>

                                    </Col>
                                </Form.Group>

                                <Form.Group id="ctl11_div_userEmail" className="px-0 my-3 col-md-12 col-12">
                                    <Form.Label className="col-md-12 col-12" htmlFor="user_email" style={{ paddingLeft: '0' }}>Account Email<span style={{ color: 'red' }}>*</span></Form.Label>
                                    {errors.email_error !== '' && <Form.Label style={{ color: 'red' }}>{errors.email_error}</Form.Label>}
                                    <span className="col-md-12 col-12" style={{ paddingLeft: '0' }}><input className="form-control" name="user_email" type="email" id="user_email" value={userEmail}
                                        placeholder='Valid email address' maxLength="100"
                                        onChange={(e) => {
                                            setUserEmail(e.target.value);
                                            if (errors.email_error !== '') {
                                                if (LOGIN_EMAIL_ERR_MSG.valueOf() === errors.email_error ) {
                                                    setErrors({ ...errors, email_error: '' , loginType_error: ''});
                                                } else {
                                                    setErrors({ ...errors, email_error: '' })
                                                }
                                            }
                                        }
                                        } />
                                    </span>
                                </Form.Group>

                                <Form.Group id="ctl11_div_lastName" className="px-0 my-3 col-md-12 col-12">
                                    <Form.Label className="col-md-12 col-12" htmlFor="user_lastName" style={{ paddingLeft: '0' }}>Last Name<span style={{ color: 'red' }}>*</span></Form.Label>
                                    {errors.lastName_error !== '' && <Form.Label style={{ color: 'red' }}>{errors.lastName_error}</Form.Label>}
                                    <span className="col-md-12 col-12" style={{ paddingLeft: '0' }}><input className="form-control" name="user_lastName" type="text" placeholder='Max of 50 characters'
                                        id="user_lastName" value={lastName} maxLength="50"
                                        onChange={(e) => { setLastName(e.target.value); if (errors.lastName_error !== '') setErrors({ ...errors, lastName_error: '' }) }} />
                                    </span>
                                </Form.Group>
                                <Form.Group id="ctl11_div_firstName" className="px-0 my-3 col-md-12 col-12">
                                    <Form.Label className="col-md-12 col-12" htmlFor="user_firstName" style={{ paddingLeft: '0' }}>First Name<span style={{ color: 'red' }}>*</span></Form.Label>
                                    {errors.firstName_error !== '' && <Form.Label style={{ color: 'red' }}>{errors.firstName_error}</Form.Label>}
                                    <span className="col-md-12 col-12" style={{ paddingLeft: '0' }}><input className="form-control" name="user_firstName" type="text" placeholder='Max of 50 characters'
                                        id="user_firstName" value={firstName} maxLength="50"
                                        onChange={(e) => { setFirstName(e.target.value); if (errors.firstName_error !== '') setErrors({ ...errors, firstName_error: '' }) }} />
                                    </span>
                                </Form.Group>
                                <Form.Group id="ctl11_div_userRole" className="pl-0 my-3 col-md-12 col-12" >
                                    <Form.Label className="col-md-12 col-12" htmlFor="user_role" style={{ paddingLeft: '0' }}>Role<span style={{ color: 'red' }}>*</span></Form.Label>
                                    {errors.userRole_error !== '' && <Form.Label style={{ color: 'red' }}>{errors.userRole_error}</Form.Label>}
                                    <Col sm="6" className="d-flex justify-content-between align-self-center">

                                        <Form.Check type='radio' inline>
                                            <Form.Check.Input
                                                type='radio'
                                                value="Cohort Owner"
                                                checked={userRole === 'Cohort Owner'}
                                                onChange={(e) => {
                                                    setUserRole(e.target.value); setCohortList([]);
                                                    if (errors.userRole_error !== '') setErrors({ ...errors, userRole_error: '' })
                                                }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Cohort Owner
                                            </Form.Check.Label>
                                        </Form.Check>

                                        <Form.Check type='radio' inline>
                                            <Form.Check.Input
                                                type='radio'
                                                value="Admin"
                                                checked={userRole === 'Admin'}
                                                onChange={(e) => { 
                                                    setUserRole(e.target.value); 
                                                    if (errors.userRole_error !== '') setErrors({ ...errors, userRole_error: '' }) }}
                                            />
                                            <Form.Check.Label style={{ fontWeight: 'normal' }}>
                                                Admin
                                            </Form.Check.Label>
                                        </Form.Check>

                                    </Col>
                                </Form.Group>

                                <Form.Group className="pl-0 my-3 col-md-12 col-12" style={{ paddingLeft: '0' }}>

                                    <Form.Label className="pl-0 col-md-12 col-12">Cohort</Form.Label>

                                    {userRole === 'Admin' ?
                                        <div className="px-0 col-md-12 col-12" >
                                            <span className="px-0 col-md-12 col-12">
                                                <input className="form-control" type="text" value="All" readOnly />
                                            </span>

                                        </div>
                                        :
                                        <div className="col-md-12 col-12 px-0">
                                            <div className="col-md-12 col-12 px-0">
                                                <Select name='owners' isMulti='true' value={cohortList} options={allCohortList} onChange={handleMultiChange} />
                                            </div>
                                        </div>
                                    }
                                </Form.Group>
                                <Form.Group className="pl-0 my-3 col-md-12 col-sm-12 col-12" style={{ paddingLeft: '0' }}>
                                    <div className="pl-0 col-md-12 col-12">
                                        <span className="col-md-12 col-12" style={{ paddingLeft: '0', paddingRight: '10' }}><input type='checkbox' name='active_status' checked={activeStatus ? activeStatus === 'Y' : true}
                                            onChange={(e) => { activeStatus === 'Y' ? setActiveStatus('N') : setActiveStatus('Y') }} />{' '} Active
                                        </span>
                                    </div>
                                </Form.Group>
                                <div className="pl-0 my-3 col-md-12 col-sm-12 col-12" style={{ paddingLeft: '0' }}>
                                    <Button
                                        variant="primary"
                                        value="Save"
                                        className="col-lg-2 col-md-6 float-right"
                                        onClick={handleSave}>
                                        Save
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="col-lg-2 col-md-6 float-right"
                                        onClick={goBack}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form>

                            {/* <div className="bttn-group col-md-12 col-xs-12">
                                <Button 
                                    variant="primary"
                                    value="Save" 
                                    className="col-lg-2 col-md-6 float-right"
                                    onClick={handleSave}>
                                    Save
                                </Button>
                                <Button 
                                    variant="secondary" 
                                    className="col-lg-2 col-md-6 float-right" 
                                    onClick={goBack}>
                                    Cancel
                                </Button>
                            </div> */}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default EditUser;