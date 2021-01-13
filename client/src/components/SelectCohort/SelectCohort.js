import React from 'react';
import { useSelector } from 'react-redux';
import RequireAuthorization from '../RequireAuthorization/RequireAuthorization';
import Select from 'react-select';
import { useHistory } from 'react-router-dom'

export default function SelectCohort() {
    const user = useSelector(state => state.user);
    const history = useHistory();

    return <RequireAuthorization role="CohortAdmin">
        <div>
            <h1 className="welcome pg-title">Select a Cohort</h1>
            <p className="welcome">
                Please select the cohort you wish to update from the list below.
            </p>

            <div className="col-md-12">
                <Select
                    options={user.cohorts.map(({acronym, name, id}) => ({ label: `${acronym} - ${name}`, value: id }))}
                    onChange={e => history.push(`/cohort/questionnaire/${e.value}`)}
                />
            </div>
        </div>
    </RequireAuthorization>
}

