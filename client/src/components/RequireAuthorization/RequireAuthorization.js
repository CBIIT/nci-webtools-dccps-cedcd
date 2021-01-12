import React from 'react';
import { useSelector } from 'react-redux';
import Unauthorized from '../Unauthorized/Unauthorized'

export default function RequireAuthorization({role, children}) {
    const user = useSelector(state => state.user);
    const isAuthorized = user && (!role || user.role === role);

    return isAuthorized
        ? <>{children}</>
        : <Unauthorized />
}