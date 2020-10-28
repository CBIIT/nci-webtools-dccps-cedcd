import React, {useState} from 'react'
import Questionnaire from '../Questionnaire/Questionnaire'
import CohortForm from '../CohortForm/CohortForm'
import EnrollmentCountsForm from '../EnrollmentCounts/EnrollmentCountsForm'
import MajorContentForm from '../MajorContentForm/MajorContentForm'
import CancerInfoForm from '../CancerInfoForm/CancerInfoForm'
import Message from '../Message/Message'
const content = (currentSection, handleClick) => {
    switch(currentSection){
        case 'A':
            return <Questionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <CohortForm />
            </Questionnaire>
        case 'B':
            return <Questionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <EnrollmentCountsForm />
            </Questionnaire>
        case 'C':
            return <Questionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <MajorContentForm />
            </Questionnaire>
        case 'D':
            return <Questionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <CancerInfoForm />
            </Questionnaire>
        default :
            return <Questionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <Message />
            </Questionnaire>
    }
}

const QuestionnaireLoader = () => {
    const [current, setCurrent] = useState('A')
    return content(current, setCurrent)
}

export default QuestionnaireLoader