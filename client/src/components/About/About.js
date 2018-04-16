import React, { Component } from 'react';
import './About.css';

class About extends Component {

  render() {
      return (
        <div id="about-main" className="clearfix">
          <div id="about-header" className="col-md-12">
            <h2 className="pg-title">About</h2>
          </div>
          
          <div id="about-col-1" className="col-md-9 about-col">
            <h2>What the CEDCD is and its purpose</h2>
            <p>The Cancer Epidemiology Descriptive Cohort Database (CEDCD) contains descriptive information about cohort studies that follow groups of persons over time for cancer incidence, mortality, and other health outcomes.   The CEDCD is a searchable database that contains general study information (e.g., eligibility criteria and size), the type of data collected at baseline, cancer sites, number of participants diagnosed with cancer, and biospecimen information. All data included in this database are aggregated for each cohort; there are no individual level data. The goal of the CEDCD is to facilitate collaboration and highlight the opportunities for research within existing cohort studies.</p>
            <h2>How information is collected</h2>
            <p>Information in the CEDCD has been provided with approval from the cohort Principal Investigators (PIs). Cohort PIs may request correction of their information by clicking Contact Us on the right. Annual updates are scheduled to begin in 2017. The date the data were collected/last updated is listed in the cohort description.  PIs who are interested in providing information about cohorts that are not currently included are encouraged to contact NCI by clicking Contact Us on the right.</p>
            <h2>Who we are</h2>
            <p>The CEDCD was developed through a contract with Westat and is maintained by the Epidemiology and Genomics Research Program (EGRP), located in the Division of Cancer Control and Population Sciences, National Cancer Institute's (NCI's), National Institutes of Health.</p>
            <p>EGRP supports scientific collaborations that pool the large quantity of available data and biospecimens in cohort studies for research in cancer etiology, prevention, and control. <a href="https://epi.grants.cancer.gov/" target="_blank"><u>Learn more about EGRP</u>.</a></p>
          </div>
          
          <div id="about-col-2" className="col-md-3 about-col">
            <h2>Resource Links</h2>
            <h3>Useful Links</h3>
            <ul>
              <li><a href="https://epi.grants.cancer.gov/cohorts.html" target="_blank">EGRP Cancer Epidemiology Cohorts</a></li>
              <li><a href="https://epi.grants.cancer.gov/Consortia/cohort.html" target="_blank">NCI Cohort Consortium</a></li>
              <li><a href="http://epi.grants.cancer.gov/funding/" target="_blank">EGRP Funding &amp; Grants</a></li>
              <li><a href="https://biolincc.nhlbi.nih.gov/home/ " target="_blank">NHLBI BioLINCC</a></li>
              <li><a href="https://www.maelstrom-research.org/" target="_blank">Maelstrom</a></li>
              <li><a href="https://www.phenxtoolkit.org/index.php" target="_blank">PhenX Toolkit</a></li>
              <li><a href="https://www.bioshare.eu/" target="_blank">BioSHaRE</a></li>
              <li>Know of other related resources that should be included here? </li>
            </ul>
          </div>

        </div>
      );
  }
}

export default About;