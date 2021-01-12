import React from 'react'
import ReviewCohortHeader from './ReviewCohortHeader'
import RequireAuthorization from '../RequireAuthorization/RequireAuthorization'

const ReviewQuestionnaire = ({ ...props }) => {
    return <RequireAuthorization role="SystemAdmin">
        <div>
            <ReviewCohortHeader activeSection={props.activeSection} handler={props.handler} currentStatus={props.cohortStatus} />
            {React.cloneElement(props.children, { sectionPicker: props.handler, cohortStatus: props.cohortStatus })}
        </div>
    </RequireAuthorization>;
}

export default ReviewQuestionnaire