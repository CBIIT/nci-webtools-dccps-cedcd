import React from 'react';

export default function Header({ props }) {

    return (
        <div id="header">

            <div id="header-inner" style={{display: 'flex'}}>
                <a href="/" style={{ border: '0' }}>
                    <img
                        src="/assets/img/logo_CEDCD_white.png"
                        id="ctl09_mastLogo"
                        alt="Cancer Epidemiology Descriptive Cohort Database"
                        style={{ marginLeft: '0px', marginTop: '6px' }}
                    />
                </a>

                <div style={{marginLeft: '10%', marginTop: '20px'}}>
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
            </div>

        </div>

        </div>
    )
}