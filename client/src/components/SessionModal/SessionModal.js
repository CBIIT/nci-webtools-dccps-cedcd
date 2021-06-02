import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserSession, fetchUser } from '../../reducers/user';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import './login-button.css'

// note: the warning threshold should be a value under the default session timeout
// otherwise, you will always see the warning
export default function SessionModal({warningThresholds = [300, 180, 60], checkInterval = 60}) {
    const userSession = useSelector(state => state.user);
    const isLoggedIn = Object.keys(userSession).length > 0;
    const [remainingTime, setRemainingTime] = useState(getRemainingTime());
    const [showWarning, setShowWarning] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // todo: use websockets instead
        const userTimerInterval = setInterval(updateRemainingTime, 100);
        const sessionCheckInterval = setInterval(fetchUserSession, 1000 * checkInterval);
        window.addEventListener('storage', syncRemainingTime);
        window.localStorage.setItem('cedcd.remainingTime', remainingTime);

        // log out if session has expired
        if (userSession && userSession.expires < new Date().getTime()) {
            logout();
        }

        return () => {
            clearInterval(userTimerInterval);
            clearInterval(sessionCheckInterval);
            window.removeEventListener('storage', syncRemainingTime);
        }
    }, [userSession, checkInterval]);

    function syncRemainingTime(event) {
        if (event.storageArea === localStorage &&
            event.key === 'cedcd.remainingTime') {
            setRemainingTime(Number(event.newValue));
            fetchUserSession();
        }
    }

    function updateRemainingTime() {
        const remaining = getRemainingTime();

        if (isLoggedIn) {
            if (warningThresholds.includes(Math.floor(remaining))) {
                setShowWarning(remaining >= 0);
            }

            if (remaining < 0) {
                fetchUserSession();
            }
        }

        setRemainingTime(remaining);
    }

    function getRemainingTime() {
        return isLoggedIn
            ? (userSession.expires - new Date().getTime()) / 1000
            : 0;
    }

    function fetchUserSession() {
        dispatch(fetchUser());
    }

    function refreshUserSession() {
        setShowWarning(false);
        dispatch(updateUserSession());
    }

    async function logout(e) {
        if (e) {
            e.preventDefault();
        }
        // can not use normal 301 response, since session is not properly cleared
        const response = await fetch('/api/logout');
        window.location.href = `${await response.json()}?TARGET=${window.location.origin}`;
    }

    function formatTime(seconds) {
        const parts = [
            seconds / 60,
            seconds % 60
        ];

        return parts
            .map(n => Math.floor(n))
            .map(e => String(e).padStart(2, '0'))
            .join(':');
    }

    return <>
        {/* {remainingTime} */}
        <Modal show={isLoggedIn && showWarning} backdrop="static" keyboard={false}>
            <Modal.Header>
                <Modal.Title>Warning: Session Timeout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div class="p-5">
                    Your session wil expire in {formatTime(remainingTime)}. Please select an option below.
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={_ => setShowWarning(false)}>
                Dismiss
            </Button>
            <Button variant="primary" onClick={refreshUserSession}>
                Extend My Session
            </Button>
            </Modal.Footer>
        </Modal>
    </>;
}