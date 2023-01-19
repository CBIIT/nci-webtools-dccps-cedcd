import React from 'react';
import { useSelector } from 'react-redux';
import './login-button.css'


export default function Header(props) {
    const userSession = useSelector(state => state.user);
    const isLoggedIn = Object.keys(userSession).length > 0;
    // console.dir('in header: ',userSession)
    // const logout = async e => {
    //     e.preventDefault();
    //     // can not use normal 301 response, since session is not properly cleared
    //     const response = await fetch('/api/logout');
    //     console.log("  logout function ");
    //     console.dir(response.json());
    //     console.log(`${window.location.origin}`);
    //     window.location.href = `${await response.json()}?TARGET=${window.location.origin}`;
    // }

    return (
        <div>
            <div className="d-none d-md-block">
                <div id="header">
                    <div id="header-inner" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <a href="/" style={{ border: '0' }}>
                            <img
                                src="/assets/img/logo_CEDCD_white.png"
                                id="ctl09_mastLogo"
                                alt="Cancer Epidemiology Descriptive Cohort Database"
                                style={{ marginLeft: '0px', marginTop: '6px' }}
                            />
                        </a>
        
                        <div style={{ marginLeft: '10%', marginTop: '20px' }}>
                            {isLoggedIn && <>
                                <a
                                    className="login-button"
                                    href="/api/logout"
                                    style={{ margin: '5px' }}
                                    target="_self">
                                    Logout
                                </a>
                            </> || <>
                                    <a
                                        className="login-button"
                                        href="/api/login"
                                        style={{ margin: '5px' }}
                                        target="_self">
                                        Login
                                </a>
                                </>}
                        </div>
                    </div>
                </div>      
            </div>
            <div className="d-block d-md-none">
                <div className="row">
                    {isLoggedIn && 
                        <div className="col-12">
                            <a
                                className="login-button float-right"
                                href="/api/logout"
                                style={{ margin: '5px' }}
                                target="_self">
                                Logout
                            </a>
                        </div> 
                        || 
                        <div className="col-12">
                            <a
                                className="login-button float-right"
                                href="/api/login"
                                style={{ margin: '5px' }}
                                target="_self">
                                Login
                            </a>
                        </div>
                    }
                </div>
            </div>  
        </div>
    )
}