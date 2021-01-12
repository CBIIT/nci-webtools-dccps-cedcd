import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Tab.css';

export default function Tab(props) {
  const userSession = useSelector(state => state.user);
  const cohortId = useSelector(state => state.cohortIDReducer);
  let name;
  let url;
  let target;
  
  if(props.value === 0){
    name="Home";
    url="/home";
  }
  else if(props.value === 1){
    name="Search Cohorts";
    url="/select";
  }
  else if(props.value === 2){
    name="Enrollment Counts";
    url="/enrollment";
  }
  else if(props.value === 3){
    name="Cancer Counts";
    url="/cancer";
  }
  else if(props.value === 4){
    name="Biospecimen Counts";
    url="/biospecimen";
  }
  else if(props.value === 5){
    name="About";
    url="/about";
  }
  else if(props.value === 6){
    name="Contact Us";
    url="/contact"
  }
  else if(props.value === 7){
    let cohorts = userSession ? userSession.cohorts : [];

    if (cohortId)
      url = `/cohort/questionnaire/${cohortId}`;
    else if (cohorts.length === 1)
      url = `/cohort/questionnaire/${cohorts[0].id}`;
    else if (cohorts.length > 1)
      url = '/cohort/questionnaire';
    else
      url = '/home';
    
    name="Questionnaire"
    target = "_self"
  }
  else{
    name="Home";
    url="home";
  }

  let cls = url === props.active ? "active" : "";
  return (<li className={cls}>
      {!target && <Link to={url} id={props.id} onClick={props.onClick}><span>{name}</span></Link>}
      {target && <a href={url} target={target}><span>{name}</span></a>}
      {window.innerWidth > 800 && <span className="arrow down"></span>}
    </li>);
}
