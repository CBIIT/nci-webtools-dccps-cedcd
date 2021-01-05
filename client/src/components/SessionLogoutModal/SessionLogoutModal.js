import React, { useContext, useState, useEffect } from 'react';
import Modal from '../controls/modal/modal';
import { UserSessionContext } from '../../index';

export default function SessionLogoutModal() {
    const userSession = useContext(UserSessionContext);
    const initialRemainingTime = 1000 * 60 * 15;
    const remainingTimeThreshold = 1000 * 60 * 5;
    const [remainingTime, setRemainingTime] = useState(initialRemainingTime);

    const formatMinutes = ms => `${String(Math.floor(ms / 1000 / 60)).padStart(2, '0')}:${String(Math.floor((ms / 1000) % 60)).padStart(2, '0')}`;

    useEffect(() => {
        function onClick() {
            if (userSession && remainingTime > remainingTimeThreshold)
                resetRemainingTime();
        }
        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    })

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            if (userSession) {
                console.log({remainingTime, remainingTimeThreshold})
                let newRemainingTime = Math.max(0, remainingTime - 1000);
                setRemainingTime(newRemainingTime)
                if (newRemainingTime <= 0)
                    logout();
            }
        }, 1000);
        return () => window.clearInterval(intervalId);
    }, [remainingTime]);

    async function resetRemainingTime() {
        const response = await fetch(`/private/${userSession.loginType}`);
        setRemainingTime(initialRemainingTime);
    }

    async function logout() {
        const response = await fetch('/api/logout');
        window.location.href = await response.json();
    }

    return !userSession ? null : <Modal
        show={remainingTime < remainingTimeThreshold}
        title="Session Timeout"
        body={<p>Your session will expire in {formatMinutes(remainingTime)}. Any unsaved changes will be lost when your session expires.</p>}
        footer={<button className="btn btn-primary mx-2" onClick={e => resetRemainingTime()}>Keep My Session Alive</button>}
        handleClose={() => {}}
    />
}