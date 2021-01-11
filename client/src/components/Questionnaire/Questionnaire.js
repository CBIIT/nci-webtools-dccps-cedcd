import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import QuestionnaireHeader from '../QuestionnaireHeader/QuestionnaireHeader'
import Unauthorized from '../Unauthorized/Unauthorized';
import { UserSessionContext } from '../../index';
import { fetchCohort } from '../../reducers/cohort';

const Questionnaire = ({ ...props }) => {
    const dispatch = useDispatch();
    const cohortID = useSelector(state => state.cohortIDReducer) || window.location.pathname.split('/').pop();
    const userSession = useContext(UserSessionContext);
    const isAuthorized = userSession 
        && userSession.role === 'CohortAdmin' 
        && userSession.cohorts.map(c => +c.id).includes(+cohortID);

    useEffect(() => { cohortID && dispatch(fetchCohort(cohortID)) }, [cohortID]);

    return isAuthorized && <div>
        <QuestionnaireHeader activeSection={props.activeSection} handler={props.handler} isReadOnly={props.isReadOnly} />
        {React.cloneElement(props.children, { sectionPicker: props.handler, userId: userSession ? userSession.id : '' })}
    </div> || <Unauthorized />;
}

export default Questionnaire