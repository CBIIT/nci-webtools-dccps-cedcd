import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../Modal/Modal'
import Select from 'react-select';
import { UserSessionContext } from '../../index';
import Unauthorized from '../Unauthorized/Unauthorized';
import CohortList from '../CohortList/CohortList';
import './AddNewCohort.css';
import StateManager from 'react-select'
import { clone } from 'winston/lib/winston/common'

const EditUser = ({ ...props }) => {

    const [userProfile, setUserProfile] = useState({
        email: '',
        first_name: '',
        last_name: '',
        user_role: '',
        cohort_list: '',
        active_status: ''
    })
    /*
        const [email, setEmail] = useState(userProfile.email);
        const [lastName, setLastName] = useState(userProfile.last_name);
        const [firstName, setFirstName] = useState(userProfile.first_name);
        const [userRole, setUserRole] = useState(userProfile.user_role);
        const [cohortList, setCohortList] = useState(userProfile.cohort_list);
        const [activeStatus, setActiveStatus] = useState(userProfile.active_status);*/
    const [userEmail, setUserEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [cohortList, setCohortList] = useState([]);
    const [activeStatus, setActiveStatus] = useState('');
    const [cohort, setCohort] = useState([])

    const userId = window.location.pathname.split('/').pop();

    const [pageLoaded, setPageLoaded] = useState(false)

    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [saved, setSaved] = useState(false)
    const lookup = useSelector(state => state.lookupReducer)


    const radioError = 'please choose one'

    const [errors, setErrors] = useState({
        email_error: '',
        firstName_error: '',
        lastName_error: '',
        name_error: ''
    }
    )


    useEffect(() => {
        if (!pageLoaded) {
            fetch(`/api/managecohort/getUserProfile/${userId}`, {
                method: 'POST',
            }).then(res => res.json())
                .then(result => {
                    console.log(result)
                    if (result.data.info[0] !== undefined) {
                        const data = result.data.info[0]
                        let resultStatus = result.data.result[0].total
                        console.log(data)
                        console.log(resultStatus)

                        if (+resultStatus === 1) {

                            setUserProfile(data)
                            setUserEmail(data.email)
                            setFirstName(data.first_name)
                            setLastName(data.last_name)
                            setUserRole(data.user_role)
                            setActiveStatus(data.active_status)
                            setCohortList(data.cohort_list.split(','))
                        }

                        console.log({ userEmail })
                    }

                })
        }
    }, [])


    const handleSave = () => {

        const userInfo = {
            email: { userEmail },
            first_name: { firstName },
            last_name: { lastName },
            user_role: { userRole },
            cohort_list: { cohortList },
            active_status: { activeStatus }
        }
        /*
const userInfo = {
    email,
    firstName,
    lastName,
    userRole,
    cohortList,
    activeStatus
} */
        const copy = { ...userProfile, emial: userEmail, first_name: firstName, last_name: lastName, user_role: userRole, active_status: activeStatus }

        console.log(userInfo)
        console.log(copy)
        console.log(firstName)

        if (validateInput()) {
            console.log(JSON.stringify(copy))
            fetch(`/api/managecohort/updateUserProfile/${userId}`, {
                method: "POST",
                body: JSON.stringify(copy),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(result => {
                    if (result.status === 200) {
                        setSuccessMsg(true)
                    } else {
                        setFailureMsg(true)
                    }
                })
        }
        else {
            setModalShow(true)

        }
    }

    const cohortLookup = {
        allCohort: lookup.cohort
    }

    const validateInput = () => {

        console.log(userProfile)
        let copy = { ...errors }

        copy.email_error = validator.emailValidator(userEmail, true, false)

        setErrors(copy);

        return !Object.values(copy).some(x => (x !== undefined && x !== ''));
    }
    const goBack = () => {
        props.history.goBack();
    }

    const handleCohortClick = (v, allIds, e) => {
        let cohort = { ...cohortList };
        if (v) {
            let idx = cohort.indexOf(v.id);
            if (idx > -1) {
                //remove element
                cohort.splice(idx, 1);
            }
            else {
                //add element
                cohort.push(v.id);
            }
        }
        else {
            //click on the "all cohort"

            cohort = [];
            if (e.target.checked) {
                cohort = allIds;
            }
        }

    }




    return <UserSessionContext.Consumer>
        {userSession => (
            !(process.env.NODE_ENV === 'development' || (userSession && userSession.role === 'SystemAdmin')) &&
            <Unauthorized /> ||
            <div id='editUserContainer' className='col-md-12'>
                {successMsg && <Messenger message='update succeeded' severity='success' open={true} changeMessage={setSuccessMsg} />}
                {failureMsg && <Messenger message='update failed' severity='warning' open={true} changeMessage={setFailureMsg} />}
                <div id="editUserForm" className="row pop-form">
                    <div id="edituser-main" className="col">
                        <div style={{ padding: '10 10' }}>
                            <a className="back" href="/admin/manageuser" target="_self" onClick={goBack}><i className="fas fa-chevron-left"></i>&nbsp;<span>Back to Manage Users</span></a>
                        </div>

                        <div id="edituser-header" className="col-md-12">
                            <h1 className="pg-title">Edit User</h1>
                        </div>
                        <div id="edituser-col-1" className="col-md-12 col-6">
                            <form >
                                <p id="ctl11_rg_errorMsg" className="bg-danger"></p>
                                <div id="ctl11_div_userEmail" className=" my-3 col-md-12 col-12">
                                    <label className="col-md-12 col-12" htmlFor="user_email" style={{ paddingLeft: '0' }}>Account Email<span className="required">*</span></label>
                                    {errors.email_error !== '' && <label style={{ color: 'red' }}>{errors.email_error}</label>}
                                    <input style={{ paddingLeft: '0' }} className="col-md-4 col-12" name="user_email" type="text" id="user_email" value={userEmail}
                                        onChange={(e) => setUserEmail(e.target.value)} />
                                </div>
                                <div id="ctl11_div_lastName" className=" my-3 col-md-12 col-12">
                                    <label className="col-md-12 col-12" htmlFor="user_lastName" style={{ paddingLeft: '0' }}>Last Name <span className="required">*</span></label>
                                    {errors.lastName_error !== '' && <label style={{ color: 'red' }}>{errors.lastName_error}</label>}
                                    <input style={{ paddingLeft: '0' }} className="col-md-4 col-12" name="user_lastName" type="text" id="user_lastName" value={lastName}
                                        onChange={(e) => setLastName(e.target.value)} />
                                </div>
                                <div id="ctl11_div_firstName" className=" my-3 col-md-12 col-12">
                                    <label className="col-md-12 col-12" htmlFor="user_firstName" style={{ paddingLeft: '0' }}>First Name<span className="required">*</span></label>
                                    {errors.firstName_error !== '' && <label style={{ color: 'red' }}>{errors.firstName_error}</label>}
                                    <input style={{ paddingLeft: '0' }} className="col-md-4 col-12" name="user_firstName" type="text" id="user_firstName" value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div id="ctl11_div_firstName" className=" my-3 col-md-12 col-12" >
                                    <label className="col-md-12 col-12" htmlFor="user_role" style={{ paddingLeft: '0' }}>Role<span className="required">*</span></label>
                                    {errors.name_error !== '' && <label style={{ color: 'red' }}>{errors.name_error}</label>}
                                    <div className='col-md-2 col-6' style={{ paddingLeft: '0' }} onChange={(e) => setUserRole(e.target.value)} >
                                        <span ><input type='radio' style={{ marign: 'auto' }} name={userRole} value="Admin" checked={userRole === 'Admin'}
                                        /> Admin</span>
                                    </div>
                                    <div className='col-md-2 col-6' style={{ paddingLeft: '0' }} onChange={(e) => setUserRole(e.target.value)}  >
                                        <span ><input type='radio' style={{ marign: 'auto' }} name={userRole} value="Cohort Owner" checked={userRole !== 'Admin'}
                                        />{' '}Cohort Owner</span>
                                    </div>
                                </div>
                                <div id="ctl11_div_organization" className="my-3 col-md-12 col-12">
                                    <label className="col-md-12 col-12" htmlFor="cu_organization" style={{ paddingLeft: '0' }}>Cohort </label>
                                    {userRole === 'Admin' ?
                                        <div className="col-md-6 col-12" style={{ paddingLeft: '0', width: '90%' }}>
                                            <input style={{ paddingLeft: '0' }} className="col-md-4 col-12" value="All" readOnly />
                                        </div>

                                        :
                                        <div className="col-md-6 col-12" style={{ paddingLeft: '0', width: '90%' }}>
                                            <Select name={cohortLookup.allCohort} isMulti='true' value={cohortList} options={cohortList} />
                                            <span>{cohortList.toString()} </span>
                                            <div className="col-sm-6 filterCol last">
                                                <CohortList values={cohortList} displayMax="4" onClick={handleCohortClick} all_cohorts={false} />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div id="ctl11_div_message" className=" my-3 col-md-12 col-12">

                                    <input type='checkbox' name='active_status' checked={activeStatus === 'Y'}
                                        onChange={(e) => { activeStatus === 'Y' ? setActiveStatus('N') : setActiveStatus('Y') }} />{' '} Active

                                </div>
                                <div className="bttn-group">
                                    <input type="submit" className="bttn_submit" value="Save" onClick={handleSave} />
                                </div>

                            </form>
                        </div>

                    </div>
                </div>

            </div>
        )}</UserSessionContext.Consumer>
}

export default EditUser;