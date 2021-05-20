import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSession, fetchUser } from '../../reducers/user';
// import './login-button.css'

export default function SessionModal({warningTime}) {
    const userSession = useSelector(state => state.user);
    const isLoggedIn = Object.keys(userSession).length > 0;
    const dispatch = useDispatch();
    const remainingMs = isLoggedIn
        ? (userSession.expires - new Date().getTime())
        : 0;

    if (isLoggedIn && remainingMs < 0) {
        // window.location.reload();
    }
    
    new Date().getTime()
    
    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(fetchUser());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const refreshUserSession = () => {
        dispatch(updateUserSession());
    }

    // console.dir('in header: ',userSession)
    const logout = async e => {
        e.preventDefault();
        // can not use normal 301 response, since session is not properly cleared
        const response = await fetch('/api/logout');
        window.location.href = `${await response.json()}?TARGET=${window.location.origin}`;
    }



    return (
        <div>
            { remainingMs }
            <button onClick={refreshUserSession}>Refresh</button>
            <pre>{JSON.stringify(userSession, null, 2)}</pre>

        </div>
    )

    /*
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
                                    href="#"
                                    onClick={logout}
                                    style={{ margin: '5px' }}
                                    target="_self">
                                    Logout
                                </a>
                            </> || <>
                                    <a
                                        className="login-button"
                                        href="/private/external"
                                        style={{ margin: '5px' }}
                                        target="_self">
                                        External Login
                                </a>
                                    <a
                                        className="login-button"
                                        href="/private/internal"
                                        style={{ margin: '5px' }}
                                        target="_self">
                                        NIH Login
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
                                href="#"
                                onClick={logout}
                                style={{ margin: '5px' }}
                                target="_self">
                                Logout
                            </a>
                        </div> 
                        || 
                        <div className="col-12">
                            <a
                                className="login-button float-right"
                                href="/private/internal"
                                style={{ margin: '5px' }}
                                target="_self">
                                NIH Login
                            </a>
                            <a
                                className="login-button float-right"
                                href="/private/external"
                                style={{ margin: '5px' }}
                                target="_self">
                                External Login
                            </a>
                        </div>
                    }
                </div>
            </div>  
        </div>
    )
    */
}