import React, { useState, useContext, useEffect } from "react";
import "./NavBar.css";
import Tab from "../Tab/Tab";
import TourBox from "../Tour/TourBox";
import { UserSessionContext } from '../../index';

  const NavBar = (props) => {
    const userSession = useContext(UserSessionContext);
    //const [loggedin, setLogin] = useState(false)
    const logout = async () => {
        // can not use normal 301 response, since session is not properly cleared
       // setLogin(false)
        const response = await fetch('/api/logout');
        window.location.href = await response.json();
        
    }
    const [miniMenu, setMiniMenu] = useState(false)
    const [showSubMenu, setSubMenuShow] = useState(false)
    const [miniDropdownContent, setContent] = useState('none')
    useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    })

  const handleResize = () => {
    window.innerWidth <= 800 ? setMiniMenu(true) : setMiniMenu(false)
  }

  const toggleSubMenu = () => {
      setSubMenuShow(!showSubMenu)
    }

    let active = '/' + window.location.pathname.split('/')[1];
    if(active === '/')
      active = '/home'

    return (
      miniMenu || window.innerWidth <= 800 ? 
      <div>
        <ul id="mainNav">
          <Tab
            id="homeTab"
            value={0}
            currTab={props.currTab}
            active={active}
            onClick={() => props.onClick(0)}
          />
          <li className='icon' onClick={toggleSubMenu}><a href='#' style={{height: '100%', color: 'white'}}>&#9776;</a></li>
        </ul>
        {showSubMenu ? 
          <div className='col-sm-12' style={{width: '100%', backgroundColor: '#135B5D', margin: '0', padding: '0'}}>
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
          {
            props.isAdmin === 2 ?
          <Tab
            id="newCohortTab"
            value={7}
            currTab={props.currTab}
            onClick={() => props.onClick(7)}
          /> : ''
          }
          {/* use target=_self to enforce apache login rules (force normal navigation) */}
          { props.isAdmin === 1 ? 
          <li className="miniDropdown" onClick={()=> setContent(miniDropdownContent== 'none' ? 'flex' : 'none')} style={{paddingLeft: '0'}}>
            <div id="miniDropHeader" >
              <a style={{paddingLeft: '10px'}} target="_self" href="/admin/managecohort">
                Admin
              </a>
              <div style={{display: miniDropdownContent, flexDirection: 'column', justifyContent: 'space-evenly',  backgroundColor: 'black', paddingLeft: '10px', maring: '0'}}>
                <a className='miniLink' style={{height: '30px', lineHeight: '1.8em'}} target="_self" href="/admin/newcohort">Add New Cohort</a>
                <a className='miniLink' style={{height: '30px', lineHeight: '1.8em'}} target="_self" href="/admin/managecohort">Manage Cohorts</a>
                <a className='miniLink' style={{height: '30px', lineHeight: '1.8em'}} target="_self" href="/admin/newuser">Add Cohort Owners</a>
              </div>
            </div>
          </li> : ''
          }
          {userSession && <li><a href='#' onClick={logout}>Log out</a></li> || <li><a href='/login/external' >External Login</a></li>}
          {!userSession && <li><a href='/login/internal' >NIH Login</a></li> }
            </ul>
          </div>
          : ''
        }   
      </div>
       : 
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
        <TourBox currTab={props.currTab}  />
        {
          props.isAdmin === 2 ?
        <Tab
          id="newCohortTab"
          value={7}
          currTab={props.currTab}
          onClick={() => props.onClick(7)}
        /> : ''
        }
        {/* use target=_self to enforce apache login rules (force normal navigation) */}
        { props.isAdmin === 1 ? 
        <li className="dropdown">
          <div id="dropHeader" style={{ marginTop: "8px" }}>
            <a target="_self" href="/admin/managecohort" className="dropbtn">
              Admin
            </a>
            <div className="dropdown-content">
              <a target="_self" href="/admin/newcohort">Add New Cohort</a>
              <a target="_self" href="/admin/managecohort">Manage Cohorts</a>
              <a target="_self" href="/admin/newuser">Add Cohort Owners</a>
            </div>
          </div>
        </li> 
        : ''
        }
       <li className='icon' onClick={toggleSubMenu}><a style={{height: '100%', color: 'white'}}>&#9776;</a></li>
      </ul>
      </div>
    );
  }

export default NavBar;
