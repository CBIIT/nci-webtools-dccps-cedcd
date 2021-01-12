import React, { useState, useContext, useEffect } from "react";
import { useSelector } from 'react-redux';
import "./NavBar.scss";
import Tab from "../Tab/Tab";
import TourBox from "../Tour/TourBox";

const NavBar = (props) => {
  const userSession = useSelector(state => state.user);
  //const [loggedin, setLogin] = useState(false)
  const logout = async () => {
    // can not use normal 301 response, since session is not properly cleared
    // setLogin(false)
    const response = await fetch('/api/logout');
    window.location.href = `${await response.json()}?TARGET=${window.location.origin}`;
  }
  const [showSubMenu, setSubMenuShow] = useState(true)
  const [miniDropdownContent, setContent] = useState('none')

  const toggleSubMenu = () => {
    console.log(showSubMenu);
    setSubMenuShow(!showSubMenu)
  }

  let active = '/' + window.location.pathname.split('/')[1];
  if (active === '/')
    active = '/home'

  return <>
    <div className="d-block d-md-none">
      <div>
        <ul id="mainNav">
          <Tab
            id="homeTab"
            value={0}
            currTab={props.currTab}
            active={active}
            onClick={() => props.onClick(0)}
          />
          <li className='icon' onClick={toggleSubMenu}><a href='#' style={{ height: '100%', color: 'white' }}>&#9776;</a></li>
        </ul>
        {showSubMenu &&
          <div className="m-0 p-0" style={{ backgroundColor: '#135B5D'}}>
            <ul id='subNav'>
              <Tab
                id="searchCohortsTab"
                value={1}
                currTab={props.currTab}
                active={active}
                onClick={() => props.onClick(1)}
              />
              <Tab
                id="enrollmentCountTab"
                value={2}
                currTab={props.currTab}
                active={active}
                onClick={() => props.onClick(2)}
              />
              <Tab
                id="cancerCountTab"
                value={3}
                currTab={props.currTab}
                active={active}
                onClick={() => props.onClick(3)}
              />
              <Tab
                id="biospecimenCountTab"
                value={4}
                currTab={props.currTab}
                active={active}
                onClick={() => props.onClick(4)}
              />
              <Tab
                id="aboutTab"
                value={5}
                currTab={props.currTab}
                active={active}
                onClick={() => props.onClick(5)}
              />
              <Tab
                id="contactTab"
                value={6}
                currTab={props.currTab}
                active={active}
                onClick={() => props.onClick(6)}
              />
              {/*<TourBox currTab={this.props.currTab}  />*/}
              {userSession && /CohortAdmin/.test(userSession.role) &&
                  <Tab
                    id="newCohortTab"
                    value={7}
                    currTab={props.currTab}
                    onClick={() => props.onClick(7)}
                  /> 
              }
              {/* use target=_self to enforce apache login rules (force normal navigation) */}
              {userSession && /SystemAdmin/.test(userSession.role) &&
                <li className="miniDropdown" onClick={() => setContent(miniDropdownContent == 'none' ? 'flex' : 'none')} style={{ paddingLeft: '0' }}>
                  <div id="miniDropHeader" >
                    <a style={{ paddingLeft: '10px' }} target="_self" href="#">
                      Admin
              </a>
                    <div style={{ display: miniDropdownContent, flexDirection: 'column', justifyContent: 'space-evenly', paddingLeft: '0px', maring: '0' }}>
                      <a className='miniLink' style={{ height: '30px', lineHeight: '1.8em', paddingLeft: '15px', }} target="_self" href="/admin/managecohort">Manage Cohorts</a>
                      <a className='miniLink' style={{ height: '30px', lineHeight: '1.8em', paddingLeft: '15px', }} target="_self" href="/admin/manageuser">Manage Users</a>
                    </div>
                  </div>
                </li>
              }
              {userSession ? <>
                <li><a href='#' onClick={logout}>Log out</a></li>
              </> : <>
                <li><a href='/login/external' >External Login</a></li>
                <li><a href='/login/internal' >NIH Login</a></li>
              </>}
            </ul>
          </div>
        }
      </div>
    </div>
    <div className="d-none d-md-block">
      <div className='topnav'>
        <ul id="mainNav">
          <Tab
            id="homeTab"
            value={0}
            currTab={props.currTab}
            active={active}
            onClick={() => props.onClick(0)}
          />

          <Tab
            id="searchCohortsTab"
            value={1}
            currTab={props.currTab}
            active={active}
            onClick={() => props.onClick(1)}
          />
          <Tab
            id="enrollmentCountTab"
            value={2}
            currTab={props.currTab}
            active={active}
            onClick={() => props.onClick(2)}
          />
          <Tab
            id="cancerCountTab"
            value={3}
            currTab={props.currTab}
            active={active}
            onClick={() => props.onClick(3)}
          />
          <Tab
            id="biospecimenCountTab"
            value={4}
            currTab={props.currTab}
            active={active}
            onClick={() => props.onClick(4)}
          />
          <Tab
            id="aboutTab"
            value={5}
            currTab={props.currTab}
            active={active}
            onClick={() => props.onClick(5)}
          />
          <Tab
            id="contactTab"
            value={6}
            currTab={props.currTab}
            active={active}
            onClick={() => props.onClick(6)}
          />
          <TourBox currTab={props.currTab} />
          {userSession && /CohortAdmin/.test(userSession.role) &&
            <Tab
              id="newCohortTab"
              value={7}
              currTab={props.currTab}
              onClick={() => props.onClick(7)}
            />
          }
          {/* use target=_self to enforce apache login rules (force normal navigation) */}
          {userSession && /SystemAdmin/.test(userSession.role) &&
            <li className="dropdown" style={{ padding: "0px", margin: "0px" }}  >

              <div id="dropHeader" style={{ margin: "0px", paddingLeft: "0px" }} >
                <a target="_self" href="/admin/managecohort" style={{ height: '100%', marginTop: '0px', marginBottom: '0', paddingLeft: '15px', paddingRight: '15px', paddingBottom: "0px" }} >
                  Admin
            </a>
                <div className="admindropdown-content" style={{ margin: "1px" }}>
                  <a style={{ justifyContent: 'left' }} target="_self" href="/admin/managecohort">Manage Cohorts</a>
                  <div className="dropdown-divider" style={{ margin: "0px" }} ></div>
                  <a style={{ justifyContent: 'left' }} target="_self" href="/admin/manageuser">Manage Users</a>
                </div>
              </div>
            </li>
          }
          <li className='icon' onClick={toggleSubMenu}><a style={{ height: '100%', color: 'white' }}>&#9776;</a></li>
        </ul>
      </div>
    </div>
  </>;
}

export default NavBar;
