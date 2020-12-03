import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserSessionContext } from '../../index';
import './Tab.css';

export default function Tab(props) {
  const userSession = useContext(UserSessionContext);

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
    name="Questionnaire"
    url = userSession && userSession.cohorts && userSession.cohorts[0]
      ? `/cohort/questionnaire/${userSession.cohorts[0]}`
      : 'home'
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
