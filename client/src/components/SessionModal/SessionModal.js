import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSession, fetchUser } from '../../reducers/user';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import './login-button.css'

// note: the warning threshold should be a value under the default session timeout
// otherwise, you will always see the warning
export default function SessionModal({showWarningThreshold = 300, checkInterval = 60}) {
    const userSession = useSelector(state => state.user);
    const isLoggedIn = Object.keys(userSession).length > 0;
    const [remainingTime, setRemainingTime] = useState(getRemainingTime());
    const [showWarning, setShowWarning] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        // todo: use websockets instead
        const userTimerInterval = setInterval(updateRemainingTime, 100);
        const sessionCheckInterval = setInterval(checkUserSession, 1000 * checkInterval);
        window.addEventListener('storage', syncRemainingTime);
        window.localStorage.setItem('cedcd.remainingTime', remainingTime);

        return () => {
            clearInterval(userTimerInterval);
            clearInterval(sessionCheckInterval);
            window.removeEventListener('storage', syncRemainingTime);
        }
    }, [userSession, checkInterval]);

    function syncRemainingTime(event) {
        if (event.storageArea != localStorage) return;
        if (event.key === 'cedcd.remainingTime') {
            setRemainingTime(Number(event.newValue));
            checkUserSession();
        }
    }

    function updateRemainingTime() {
        const remaining = getRemainingTime();

        if (isLoggedIn) {
            setShowWarning(remaining >= 0 && remaining < showWarningThreshold);
            if (remaining < 0) 
                checkUserSession();
        }

        setRemainingTime(remaining);
    }

    function getRemainingTime() {
        return isLoggedIn
            ? (userSession.expires - new Date().getTime()) / 1000
            : 0;
    }

    function checkUserSession() {
        dispatch(fetchUser());
    }

    function refreshUserSession() {
        setShowWarning(isLoggedIn && remainingTime < showWarningThreshold);
        dispatch(updateUserSession());
    }

    // console.dir('in header: ',userSession)
    async function logout(e) {
        e.preventDefault();
        // can not use normal 301 response, since session is not properly cleared
        const response = await fetch('/api/logout');
        window.location.href = `${await response.json()}?TARGET=${window.location.origin}`;
    }

    return (
        <Modal show={isLoggedIn && showWarning} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Warning: Session Timeout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="p-5">
                    Your session is about to expire. Please select an option below.
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={logout}>
                Log Out
            </Button>
            <Button variant="primary" onClick={refreshUserSession}>
                Extend My Session
            </Button>
            </Modal.Footer>
        </Modal>
    );
}