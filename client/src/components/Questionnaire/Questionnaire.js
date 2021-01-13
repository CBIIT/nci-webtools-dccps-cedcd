import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import QuestionnaireHeader from '../QuestionnaireHeader/QuestionnaireHeader'
import Unauthorized from '../Unauthorized/Unauthorized';
import { fetchCohort } from '../../reducers/cohort';
import { updateUserSession } from '../../reducers/user';
import { initializeLookup } from '../../reducers/lookupReducer';
import SelectCohort from '../SelectCohort/SelectCohort';

const Questionnaire = ({ ...props }) => {
    const dispatch = useDispatch();
    const getCohortId = () => +window.location.pathname.split('/').pop();
    const cohortID = getCohortId();
    const userSession = useSelector(state => state.user);
    const cohort = useSelector(state => state.cohort);
    const location = useLocation();

    const isAuthorized = userSession && (userSession.role === 'CohortAdmin' || userSession.role === 'SystemAdmin');
    const hasAccess = userSession && (userSession.role === 'SystemAdmin' || (userSession.cohorts || []).map(c => +c.id).includes(cohortID));

    useEffect(() => {
        let cohortID = location.pathname.split('/').pop();
        if (cohortID) {
            if (!cohort || !cohort.id || cohortID !== +cohort.id) {
                dispatch(fetchCohort(cohortID));
                dispatch(updateUserSession());
            }
            dispatch(initializeLookup());
        }
    }, [location]);

    if (!isAuthorized)
        return <Unauthorized />

    else if (!hasAccess)
        return <SelectCohort />

    return <div>
        <QuestionnaireHeader activeSection={props.activeSection} handler={props.handler} isReadOnly={props.isReadOnly} />
        {React.cloneElement(props.children, { sectionPicker: props.handler, userId: userSession ? userSession.id : '' })}
    </div>;
}

export default Questionnaire