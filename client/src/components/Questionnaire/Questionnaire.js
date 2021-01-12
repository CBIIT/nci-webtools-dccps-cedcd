import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import QuestionnaireHeader from '../QuestionnaireHeader/QuestionnaireHeader'
import Unauthorized from '../Unauthorized/Unauthorized';
import { fetchCohort } from '../../reducers/cohort';
import { updateUserSession } from '../../reducers/user';
import { initializeLookup } from '../../reducers/lookupReducer';
import SelectCohort from '../SelectCohort/SelectCohort';
import allactions from '../../actions'

const Questionnaire = ({ ...props }) => {
    const dispatch = useDispatch();
    const getCohortId = () => +window.location.pathname.split('/').pop();
    const cohortID = useSelector(state => +state.cohortIDReducer) || getCohortId();
    const userSession = useSelector(state => state.user);
    const isAuthorized = userSession && (userSession.role === 'CohortAdmin' || userSession.role === 'SystemAdmin');
    const hasAccess = userSession && (userSession.role === 'SystemAdmin' || (userSession.cohorts || []).map(c => +c.id).includes(getCohortId()));

    useEffect(() => {
        let id = getCohortId();
        if (!cohortID || id !== cohortID)
            dispatch(allactions.cohortIDAction.setCohortId(id));
    }, []);

    useEffect(() => { 
        if (getCohortId()) {
            dispatch(fetchCohort(getCohortId())) 
            dispatch(updateUserSession());
            dispatch(initializeLookup());
        }
    }, [cohortID]);

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