import React from "react";

export default function ResourceNotFound() {
  return (
    <div>
      <h1 className="welcome pg-title">Page Not Found</h1>
      <p className="welcome">The page you requested could not be found.</p>

      <p className="welcome">
        <a href="/home">Return to the home page.</a>
      </p>
    </div>
  );
}
