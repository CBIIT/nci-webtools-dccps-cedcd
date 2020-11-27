import React, {useState, useEffect} from 'react'
import Questionnaire from '../Questionnaire/Questionnaire'
import CohortForm from '../CohortForm/CohortForm'
import EnrollmentCountsForm from '../EnrollmentCounts/EnrollmentCountsForm'
import MajorContentForm from '../MajorContentForm/MajorContentForm'
import CancerInfoForm from '../CancerInfoForm/CancerInfoForm'
import Message from '../Message/Message'
import MortalityForm from '../MortalityForm/MortalityForm'
import DataLinkageForm from '../DataLinkageForm/DataLinkageForm'
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
        case 'E':
            return <Questionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <MortalityForm />
            </Questionnaire>
        case 'F':
            return <Questionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <DataLinkageForm />
            </Questionnaire>
        default :
            return <Questionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <Message />
            </Questionnaire>
    }
}

const QuestionnaireLoader = (props) => {
    const [current, setCurrent] = useState('A')
    useEffect(() => {
        props.setAdmin(2)
    }, [])
    return content(current, setCurrent)
}

export default QuestionnaireLoader