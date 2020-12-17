import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import CohortForm from './SectionDetails/CohortForm'
import EnrollmentCountsForm from './SectionDetails/EnrollmentCountsForm'
import MajorContentForm from './SectionDetails/MajorContentForm'
import CancerInfoForm from './SectionDetails/CancerInfoForm'
import Message from '../Message/Message'
import MortalityForm from './SectionDetails/MortalityForm'
import SpecimenForm from './SectionDetails/Specimens'
import DataLinkageForm from './SectionDetails/DataLinkageForm'

import ReviewQuestionnaire from './ReviewQuestionnaire'

const getChild = (sectionName) => {
    switch(sectionName){
        case 'A':
            return <CohortForm />
        case 'B': 
            return <EnrollmentCountsForm />
        case 'C':
            return <MajorContentForm />
        case 'D':
            return <CancerInfoForm />
        case 'E':
            return  <MortalityForm />
        case 'F':
            return <DataLinkageForm />
        case 'G':
            return <SpecimenForm />
        default: 
            return <Message />
    }
}

const content = (currentSection, handleClick, status) => {
   /* switch (currentSection) {
        case 'A':
            return <ReviewQuestionnaire activeSection={currentSection} handler={(section) => handleClick(section)} cohortStatus={status}>
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
    */
   return <ReviewQuestionnaire activeSection={currentSection} handler={(section) => handleClick(section)} cohortStatus={status}>
       {getChild(currentSection)}
   </ReviewQuestionnaire>
}

const ReviewCohort = (...props) => {
    const [current, setCurrent] = useState('A')
    const {status} = useParams()
    return content(current, setCurrent, status)
}

export default ReviewCohort