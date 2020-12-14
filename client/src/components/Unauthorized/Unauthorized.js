import React from 'react';

export default function Unauthorized(props) {
    return <>
        <div className="text-center">
            <h1>Unauthorized</h1>
            <p>You are not authorized to view this resource. Please log in as an authorized user. </p>
        </div>
    </>
}