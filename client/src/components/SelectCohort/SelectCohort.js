import React from 'react';
import { UserSessionContext } from '../../index';
import Unauthorized from '../Unauthorized/Unauthorized';

export default function SelectCohort() {
    const isUnauthorized = user => !user || !user.role;

    return <UserSessionContext.Consumer>
        {user => isUnauthorized(user)
            ? <Unauthorized />
            : <div>
                <h1 className="welcome pg-title">Select a Cohort</h1>
                <p class="welcome">
                    Your user account is associated with multiple cohorts. Please select the cohort you wish to update from the list below. 
                </p>
                <ul>
                    {user.cohorts.map(c =>
                        <li>
                            <a href={`/cohort/questionnaire/${c.id}`}>
                                <strong>{c.acronym}</strong> - {c.name} 
                                <small className="text-muted ml-2">({c.status})</small>
                            </a>
                        </li>
                    )}
                </ul>
            </div>
        }
    </UserSessionContext.Consumer>
}

