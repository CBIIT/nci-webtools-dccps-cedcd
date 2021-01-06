import React, { useContext } from 'react'
import ReviewCohortHeader from './ReviewCohortHeader'
import Unauthorized from '../Unauthorized/Unauthorized';
import { UserSessionContext } from '../../index';

const ReviewQuestionnaire = ({ ...props }) => {
    const userSession = useContext(UserSessionContext);
    const isAuthorized = userSession && userSession.role === 'SystemAdmin';

    return isAuthorized && <div>
        <ReviewCohortHeader activeSection={props.activeSection} handler={props.handler} currentStatus={props.cohortStatus} />
        {React.cloneElement(props.children, { sectionPicker: props.handler, cohortStatus: props.cohortStatus })}
    </div> || <Unauthorized />;
}

export default ReviewQuestionnaire