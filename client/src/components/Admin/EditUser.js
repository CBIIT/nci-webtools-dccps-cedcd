import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import allactions from '../../actions'
import validator from '../../validators'
import Messenger from '../Snackbar/Snackbar'
import CenterModal from '../Modal/Modal'
import Select from 'react-select';
import { UserSessionContext } from '../../index';
import Unauthorized from '../Unauthorized/Unauthorized';
import './AddNewCohort.css';
import StateManager from 'react-select'

const EditUser = ({ ...props }) => {

    const [userProfile, setUserProfile] = useState({
        email: '',
        first_name: '',
        last_ame: '',
        user_role: '',
        cohort_list: '',
        active_status: '',
        last_login: ''
    })

    const userId = window.location.pathname.split('/').pop();

    const [pageLoaded, setPageLoaded] = useState(false)

    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [proceed, setProceed] = useState(false)
    const [saved, setSaved] = useState(false)


    const radioError = 'please choose one'

    const [errors, setErrors] = useState({}
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
                        }

                        console.log(userProfile)
                    }

                })
        }
    }, [])


    return <UserSessionContext.Consumer>
        {userSession => (
            !(process.env.NODE_ENV === 'development' || (userSession && userSession.role === 'SystemAdmin')) &&
            <Unauthorized /> ||
            <div id='editUserContainer' className='col-md-12'>
                <div id="editUserForm" className="row pop-form">
                    <div id="edituser-main" className="col">
                        <div id="edituser-header" className="col-md-12">
                            <h1 className="pg-title">Edit User</h1>
                        </div>
                        <div id="edituser-col-1" className="col-md-12 col-6">
                            <form >
                                <p id="ctl11_rg_errorMsg" className="bg-danger"></p>
                                <div id="ctl11_div_userEmail" className=" my-3 col-md-12 col-12">
                                    <label className="col-md-12 col-12" htmlFor="user_email" style={{ paddingLeft: '0' }}>Account Email<span className="required">*</span></label>
                                    {userProfile.email_error !== '' && <label style={{ color: 'red' }}>{userProfile.email_error}</label>}
                                    <input style={{ paddingLeft: '0' }} className="col-md-4 col-12" name="user_email" type="text" id="user_email" value={userProfile.email} onChange={(e) => this.handleChange("email", e)} />
                                </div>
                                <div id="ctl11_div_lastName" className=" my-3 col-md-12 col-12">
                                    <label className="col-md-12 col-12" htmlFor="user_lastName" style={{ paddingLeft: '0' }}>Last Name <span className="required">*</span></label>
                                    {userProfile.acronym_error !== '' && <label style={{ color: 'red' }}>{userProfile.acronym_error}</label>}
                                    <input style={{ paddingLeft: '0' }} className="col-md-4 col-12" name="user_lastName" type="text" id="user_lastName" value={userProfile.last_name} onChange={(e) => this.handleChange("lastNmae", e)} />
                                </div>
                                <div id="ctl11_div_firstName" className=" my-3 col-md-12 col-12">
                                    <label className="col-md-12 col-12" htmlFor="user_firstName" style={{ paddingLeft: '0' }}>First Name<span className="required">*</span></label>
                                    {userProfile.name_error !== '' && <label style={{ color: 'red' }}>{userProfile.name_error}</label>}
                                    <input style={{ paddingLeft: '0' }} className="col-md-4 col-12" name="user_firstName" type="text" id="user_firstName" value={userProfile.first_name} onChange={(e) => this.handleChange("role", e)} />
                                </div>
                                <div id="ctl11_div_firstName" className=" my-3 col-md-12 col-12" >
                                    <label className="col-md-12 col-12" htmlFor="user_role" style={{ paddingLeft: '0' }}>Role<span className="required">*</span></label>
                                    {userProfile.name_error !== '' && <label style={{ color: 'red' }}>{userProfile.name_error}</label>}
                                    <div className='col-md-2 col-6' style={{ paddingLeft: '0' }}>
                                        <span ><input type='radio' style={{ marign: 'auto' }} name='bioRepeatedSampleSameIndividual' checked={userProfile.user_role === 'Admin'} width='40'
                                            onClick={() => { setUserProfile() }} />{" "}Admin</span>
                                    </div>
                                    <div className='col-md-2 col-6' style={{ paddingLeft: '0' }}>
                                        <span ><input type='radio' style={{ marign: 'auto' }} name='bioRepeatedSampleSameIndividual' checked={userProfile.user_role !== 'Admin'} width='60'
                                            onClick={() => { }} />{' '}Cohort Owner</span>
                                    </div>
                                </div>
                                <div id="ctl11_div_organization" className="my-3 col-md-12 col-12">
                                    <label className="col-md-12 col-12" htmlFor="cu_organization" style={{ paddingLeft: '0' }}>Cohort </label>
                                    {userProfile.user_role === 'Admin' ?
                                        <div className="col-md-6 col-12" style={{ paddingLeft: '0', width: '90%' }}>
                                            <input style={{ paddingLeft: '0' }} className="col-md-4 col-12" value="All" readOnly />
                                        </div>

                                        :
                                        <div className="col-md-6 col-12" style={{ paddingLeft: '0', width: '90%' }}>
                                            <Select name='owners' isMulti='true' value={userProfile.cohortAcronyms} options={userProfile.cohort_list} />
                                        </div>
                                    }
                                </div>
                                <div id="ctl11_div_message" className=" my-3 col-md-12 col-12">

                                    <input type='checkbox' name='active_status' checked={userProfile.active_status === 'Y'}
                                        onChange={(e) => { }} />{' '} Active

                                </div>
                                <div className="bttn-group">
                                    <input type="submit" className="bttn_submit" value="Submit" />
                                </div>

                            </form>
                        </div>

                    </div>
                </div>

            </div>
        )}</UserSessionContext.Consumer>
}

export default EditUser;