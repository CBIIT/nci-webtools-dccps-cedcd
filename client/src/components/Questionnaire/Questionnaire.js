import React from 'react'
import QuestionnaireHeader from '../QuestionnaireHeader/QuestionnaireHeader'
const Questionnaire = ({...props}) => {
    return <div>
        <QuestionnaireHeader activeSection={props.activeSection} handler={props.handler} />
        {React.cloneElement(props.children, {sectionPicker: props.handler})}
    </div>
}

export default Questionnaire