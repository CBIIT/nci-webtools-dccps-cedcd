import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import RequireAuthorization from "../RequireAuthorization/RequireAuthorization";
import Select from "react-select";
import { useHistory } from "react-router-dom";
import allactions from "../../actions";

export default function SelectCohort() {
  const user = useSelector((state) => state.user);
  //const dispatch = useDispatch();
  const history = useHistory();
  /* useEffect(() => {
        batch(() => {
            dispatch(allactions.cohortActions.setHasLoaded(false));
            dispatch(allactions.enrollmentCountActions.setHasLoaded(false));
            dispatch(allactions.majorContentActions.setHasLoaded(false));
            dispatch(allactions.mortalityActions.setHasLoaded(false));
            dispatch(allactions.dataLinkageActions.setHasLoaded(false));
            dispatch(allactions.specimenActions.setSpecimenLoaded(false));
            })
    }, []) */
  return (
    <div>
      <h1 className="welcome pg-title">Select a Cohort</h1>
      <p className="welcome">
        {user.cohorts.length
          ? "Please select the cohort you wish to update from the list below."
          : "Your user account is not associated with any cohorts. Please contact an administrator to grant access to your questionnaire."}
      </p>

      <div className="col-md-12">
        <Select
          options={user.cohorts.map(({ acronym, name, id }) => ({ label: `${acronym} - ${name}`, value: id }))}
          onChange={(e) => history.push(`/cohort/questionnaire/${e.value}`)}
        />
      </div>
    </div>
  );
}
