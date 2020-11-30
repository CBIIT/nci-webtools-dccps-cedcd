import React, { useContext } from 'react'
import ReviewCohortHeader from './ReviewCohortHeader'
import Unauthorized from '../Unauthorized/Unauthorized';
import { UserSessionContext } from '../../index';

const ReviewQuestionnaire = ({ ...props }) => {
    const userSession = useContext(UserSessionContext);
    const isAuthorized = (process.env.NODE_ENV === 'development')
        || (userSession && userSession.role === 'SystemAdmin');

    return isAuthorized && <div>
        <ReviewCohortHeader activeSection={props.activeSection} handler={props.handler} />
        {React.cloneElement(props.children, { sectionPicker: props.handler })}
    </div> || <Unauthorized />;
}

export default ReviewQuestionnaire