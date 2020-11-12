import React, { useContext } from 'react';
import { UserSessionContext } from '../../index';


export default function Header({ props }) {
    const userSession = useContext(UserSessionContext);
    const logout = async e => {
        e.preventDefault();
        // can not use normal 301 response, since session is not properly cleared
        const response = await fetch('/api/logout');
        window.location.href = await response.json();
    }

    return (
        <div id="header">

            <div id="header-inner" style={{display: 'flex', justifyContent: 'space-between'}}>
                <a href="/" style={{ border: '0' }}>
                    <img
                        src="/assets/img/logo_CEDCD_white.png"
                        id="ctl09_mastLogo"
                        alt="Cancer Epidemiology Descriptive Cohort Database"
                        style={{ marginLeft: '0px', marginTop: '6px' }}
                    />
                </a>

                <div style={{marginLeft: '10%', marginTop: '20px'}}>
                    {userSession && <>
                        <a
                            className="login-button"
                            href="#"
                            onClick={logout}
                            style={{ margin: '5px' }}
                            target="_self">
                            Logout
                        </a>
                    </> || <>
                        <a
                            className="login-button"
                            href="/cohort/questionnaire/13"
                            style={{ margin: '5px' }}
                            target="_self">
                            Cohort Login
                        </a>
                        <a
                            className="login-button"
                            href="/admin/managecohort"
                            style={{ margin: '5px' }}
                            target="_self">
                            Admin Login
                        </a>
                    </>}
            </div>

        </div>

        </div>
    )
}