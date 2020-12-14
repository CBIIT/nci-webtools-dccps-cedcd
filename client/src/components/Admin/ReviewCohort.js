import React, { useState, useEffect } from 'react'
import CohortForm from './SectionDetails/CohortForm'
import EnrollmentCountsForm from './SectionDetails/EnrollmentCountsForm'
import MajorContentForm from './SectionDetails/MajorContentForm'
import CancerInfoForm from './SectionDetails/CancerInfoForm'
import Message from '../Message/Message'
import MortalityForm from './SectionDetails/MortalityForm'
import SpecimenForm from './SectionDetails/Specimens'
import DataLinkageForm from './SectionDetails/DataLinkageForm'

import ReviewQuestionnaire from './ReviewQuestionnaire'


const content = (currentSection, handleClick) => {
    switch (currentSection) {
        case 'A':
            return <ReviewQuestionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <CohortForm />
            </ReviewQuestionnaire>
        case 'B':
            return <ReviewQuestionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <EnrollmentCountsForm />
            </ReviewQuestionnaire>
        case 'C':
            return <ReviewQuestionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <MajorContentForm />
            </ReviewQuestionnaire>
        case 'D':
            return <ReviewQuestionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <CancerInfoForm />
            </ReviewQuestionnaire>
        case 'E':
            return <ReviewQuestionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <MortalityForm />
            </ReviewQuestionnaire>
        case 'F':
            return <ReviewQuestionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <DataLinkageForm />
            </ReviewQuestionnaire>
        case 'G':
            return <ReviewQuestionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <SpecimenForm />
            </ReviewQuestionnaire>
        default:
            return <ReviewQuestionnaire activeSection={currentSection} handler={(section) => handleClick(section)}>
                <Message />
            </ReviewQuestionnaire>
    }
}

const ReviewCohort = (...props) => {
    const [current, setCurrent] = useState('A')
    return content(current, setCurrent)
}

export default ReviewCohort