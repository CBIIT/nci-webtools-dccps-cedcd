import React, { useContext } from 'react'
import QuestionnaireHeader from '../QuestionnaireHeader/QuestionnaireHeader'
import Unauthorized from '../Unauthorized/Unauthorized';
import { UserSessionContext } from '../../index';

const Questionnaire = ({...props}) => {
    const userSession = useContext(UserSessionContext);
    const isAuthorized = (process.env.NODE_ENV === 'development')
        || (userSession && userSession.role === 'CohortAdmin');

    return isAuthorized && <div>
        <QuestionnaireHeader activeSection={props.activeSection} handler={props.handler} />
        {React.cloneElement(props.children, {sectionPicker: props.handler, userId: userSession.id})}
    </div> || <Unauthorized />;
}

export default Questionnaire