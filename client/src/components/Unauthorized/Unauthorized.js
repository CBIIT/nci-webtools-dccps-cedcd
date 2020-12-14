import React from 'react';

export default function Unauthorized() {
    return <>
        <h1 className="welcome pg-title">
            Unauthorized
        </h1>
        <p class="welcome">
            You are not authorized to access this resource. Please log in as an authorized user.
        </p>
    </>
}