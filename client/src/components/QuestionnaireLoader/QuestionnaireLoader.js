import React, { useState, useEffect } from 'react'
import Questionnaire from '../Questionnaire/Questionnaire'
import CohortForm from '../CohortForm/CohortForm'
import EnrollmentCountsForm from '../EnrollmentCounts/EnrollmentCountsForm'
import MajorContentForm from '../MajorContentForm/MajorContentForm'
import CancerInfoForm from '../CancerInfoForm/CancerInfoForm'
import Message from '../Message/Message'
import MortalityForm from '../MortalityForm/MortalityForm'
import SpecimenForm from '../SpecimenForm/SpecimenForm'
import DataLinkageForm from '../DataLinkageForm/DataLinkageForm'
//import { defaultProps } from 'react-select/src/Select'

const Content = ({currentSection, readOnlyOrNot = false, sectionJumper = f=>f}) => {
    switch (currentSection) {
        case 'A':
            return <CohortForm sectionPicker={sectionJumper} isReadOnly={readOnlyOrNot} />
        case 'B':
            return <EnrollmentCountsForm sectionPicker={sectionJumper} isReadOnly={readOnlyOrNot} />
        case 'C':
            return <MajorContentForm sectionPicker={sectionJumper} isReadOnly={readOnlyOrNot} />
        case 'D':
            return <CancerInfoForm sectionPicker={sectionJumper} isReadOnly={readOnlyOrNot} />
        case 'E':
            return <MortalityForm sectionPicker={sectionJumper} isReadOnly={readOnlyOrNot} />
        case 'F':
            return <DataLinkageForm sectionPicker={sectionJumper} isReadOnly={readOnlyOrNot} />
        case 'G':
            return <SpecimenForm isReadOnly={readOnlyOrNot} />
        default:
            return <Message isReadOnly={readOnlyOrNot} />
    }
}

const QuestionnaireLoader = (props) => {
    const [current, setCurrent] = useState('A')
    useEffect(() => {
        props.isReadOnly ? props.setAdmin(1) : props.setAdmin(2)
    }, [])
    return <Questionnaire activeSection={current} handler={(section) => setCurrent(section)} isReadOnly={props.isReadOnly} >
        <Content currentSection={current}  readOnlyOrNot={props.isReadOnly} sectionJumper={(section) => setCurrent(section)}/>
    </Questionnaire>
}

export default QuestionnaireLoader