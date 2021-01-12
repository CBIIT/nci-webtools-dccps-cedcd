import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import QuestionnaireHeader from '../QuestionnaireHeader/QuestionnaireHeader'
import Unauthorized from '../Unauthorized/Unauthorized';
import { fetchCohort } from '../../reducers/cohort';
import SelectCohort from '../SelectCohort/SelectCohort';

const Questionnaire = ({ ...props }) => {
    const dispatch = useDispatch();
    const cohortID = useSelector(state => state.cohortIDReducer) || window.location.pathname.split('/').pop();
    const userSession = useSelector(state => state.user);
    const isAuthorized = userSession && (userSession.role === 'CohortAdmin' || userSession.role === 'SystemAdmin');
    const hasAccess = userSession && (userSession.role === 'SystemAdmin' || userSession.cohorts.map(c => +c.id).includes(+cohortID));

    useEffect(() => { cohortID && dispatch(fetchCohort(cohortID)) }, [cohortID]);

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