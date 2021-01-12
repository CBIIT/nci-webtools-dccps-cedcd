import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import RequireAuthorization from '../RequireAuthorization/RequireAuthorization';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'

export default function SelectCohort() {
    const [cohort, setCohort] = useState(null)
    const user = useSelector(state => state.user);

    const handleChange = (event) => {
        setCohort(event.label)
        window.location.assign(window.location.origin + '/cohort/questionnaire/' + event.value)
    }

    return <RequireAuthorization role="CohortAdmin">
        <div>
            <h1 className="welcome pg-title">Select a Cohort</h1>
            <p class="welcome">
                Please select the cohort you wish to update from the list below.
                </p>

            <div className='col-md-12'>
                <Select
                    name='cohorts'
                    options={user.cohorts.map(cohort => ({ label: cohort.acronym + ' - ' + cohort.name, value: cohort.id }))}
                    onChange={handleChange}
                />
            </div>
        </div>
    </RequireAuthorization>
}

