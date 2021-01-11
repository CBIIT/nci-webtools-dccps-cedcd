import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CohortForm from '../CohortForm/CohortForm'
import EnrollmentCountsForm from '../EnrollmentCounts/EnrollmentCountsForm'
import MajorContentForm from '../MajorContentForm/MajorContentForm'
import CancerInfoForm from '../CancerInfoForm/CancerInfoForm'
import MortalityForm from '../MortalityForm/MortalityForm'
import DataLinkageForm from '../DataLinkageForm/DataLinkageForm'
import SpecimenForm from '../SpecimenForm/SpecimensForm'
import Message from '../Message/Message'
import Messenger from '../Snackbar/Snackbar'
import ReviewQuestionnaire from './ReviewQuestionnaire'
import allactions from '../../actions';

const getChild = (sectionName, props) => {
    switch (sectionName) {
        case 'A':
            return <CohortForm {...props} />
        case 'B':
            return <EnrollmentCountsForm {...props} />
        case 'C':
            return <MajorContentForm {...props} />
        case 'D':
            return <CancerInfoForm {...props} />
        case 'E':
            return <MortalityForm {...props} />
        case 'F':
            return <DataLinkageForm {...props} />
        case 'G':
            return <SpecimenForm {...props} />
        default:
            return <Message />
    }
}

export default function ReviewCohort(props) {
    const { status } = useParams()
    const dispatch = useDispatch();

    // todo: replace with the following:
    // const cohortId = useSelector(state => state.adminCohortIDReducer)
    // and initialize cohortID when url state changes
    const cohortId = +window.location.pathname.split('/').pop();
    useEffect(() => { dispatch(allactions.cohortIDAction.setCohortId(cohortId)) }, []);

    const [currentSection, setCurrentSection] = useState('A')
    const [successMsg, setSuccessMsg] = useState(false)
    const [failureMsg, setFailureMsg] = useState(false)
    const [message, setMessage] = useState('')
    const [userEmails, setEmails] = useState('')


    const sendEmail = () => {
        let reqBody = {
            // firstname:'joe',
            //  lastname:'zhao',
            // organization:'NIH',
            //  phone:'',
            email: userEmails,
            topic: 'test',
            message: 'this is test on sending email'
        };
        fetch('/api/questionnaire/sendEmail', {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(result => {
                if (result && result.status === 200) {
                    setMessage('email was sent')
                    let timedMessage = setTimeout(() => { setSuccessMsg(true) }, 4000)
                    clearTimeout(timedMessage)
                }
                else {
                    setMessage('email failed to be sent')
                    let timedMessage = setTimeout(() => { setFailureMsg(true) }, 4000)
                    clearTimeout(timedMessage)
                }
            })
    }

    const resetCohortStatus = (cohortID, nextStatus) => {
        if (['new', 'draft', 'published', 'submitted', 'returned', 'in review'].includes(nextStatus)) {
            fetch(`/api/questionnaire/reset_cohort_status/${cohortID}/${nextStatus}`, {
                method: "POST"
            }).then(res => res.json())
                .then(result => {
                    if (result && result.status === 200) {
                        setMessage('Your changes were saved.')
                        setSuccessMsg(true)
                        sendEmail()
                    }
                    else {
                        setMessage('Your changes could not be saved.')
                        setFailureMsg(true)
                    }
                })
        }
    }

    const handleApprove = () => {
        resetCohortStatus(cohortId, 'published')
    }

    const handleReject = () => {
        resetCohortStatus(cohortId, 'returned')
    }

    return <>
        {successMsg && <Messenger message={message} severity='success' open={true} changeMessage={setSuccessMsg} />}
        {failureMsg && <Messenger message={message} severity='warning' open={true} changeMessage={setFailureMsg} />}

        <ReviewQuestionnaire activeSection={currentSection} handler={setCurrentSection} cohortStatus={status}>
            {getChild(currentSection, { isReadOnly: true, cohortId, handleApprove, handleReject })}
        </ReviewQuestionnaire>
    </>
}
