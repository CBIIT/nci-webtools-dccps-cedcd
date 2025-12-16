import React, { useState } from "react";
import TabBoard from "../Details/TabBoard";
import BoxBoard from "../Details/BoxBoard";

const ViewCohortData = ({ ...props }) => {
  const cohortId = props.id;
  const [currTab, setCurrtab] = useState(0);

  return (
    <div>
      <div className="container">
        <p>
          The Cohort Overview compares the cohort design and the types of data and specimens collected across the
          cohorts you selected. To view more information about a specific cohort, select the acronym of the cohort at
          the top of the table.
        </p>
      </div>
      <div id="data-table" className="level2 col-md-12 container">
        <div id="table-header" className="container">
          <div>
            <div id="cohortDetailTabs">
              <TabBoard currTab={currTab} onClick={(i) => setCurrtab(i)} />
            </div>
          </div>
        </div>
        <div className="container">
          <BoxBoard cohorts={cohortId} currTab={currTab} />
        </div>
      </div>
    </div>
  );
};

export default ViewCohortData;
