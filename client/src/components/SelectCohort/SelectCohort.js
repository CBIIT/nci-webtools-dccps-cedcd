import React, {useState} from 'react';
import { UserSessionContext } from '../../index';
import Unauthorized from '../Unauthorized/Unauthorized';
import Select from 'react-select';
import {Redirect} from 'react-router-dom'

export default function SelectCohort() {
    const isUnauthorized = user => !user || !user.role;
    const [cohort,setCohort] = useState(null)

    const handleChange = (event) => {   
 
        setCohort(event.label)
        window.location.assign(window.location.origin + '/cohort/questionnaire/' + event.value)
    }

    return <UserSessionContext.Consumer>
        {user => isUnauthorized(user)
            ? <Unauthorized />
            : <div>
                <h1 className="welcome pg-title">Select a Cohort</h1>
                <p class="welcome">
                    Your user account is associated with multiple cohorts. Please select the cohort you wish to update from the list below.
                </p>

                <div className='col-md-12'>
                    <Select 
                        name='cohorts'
                        options={user.cohorts.map(cohort => ({label: cohort.acronym + ' - ' + cohort.name, value: cohort.id}))}
                        onChange={handleChange} 
                    />
                </div>
            </div>
        }
    </UserSessionContext.Consumer>
}

