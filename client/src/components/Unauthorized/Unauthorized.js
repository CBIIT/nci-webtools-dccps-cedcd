import React from 'react';

export default function Unauthorized(props) {
    return <>
        <div className="text-center">
            <h1>Unauthorized</h1>
            <p>You are not authorized to view this resource. Please log in as a user with the appropriate authorization. </p>
        </div>
    </>
}