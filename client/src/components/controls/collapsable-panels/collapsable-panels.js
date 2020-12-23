import React from 'react';
import classNames from 'classnames'
import './collapsable-panels.scss';

export const CollapsablePanel = ({
    className = '',
    panelName = '',
    activePanel = '',
    panelTitle = '',
    onClick = () => {},
    children = [],
    condition = false,
}) => { 
    const isActive = (activePanel && panelName && activePanel === panelName) || condition;

    return (
        <div className={className}>
            <button type="button" 
                className={classNames('cedcd-btn',  isActive && 'active')} 
                aria-expanded={isActive} 
                aria-controls="more" 
                onClick={onClick}>
                <span className="triangle"></span>{ panelTitle }
            </button>
            <div className="px-5 py-4" 
                id="more" 
                aria-hidden={isActive ? 'false' : 'true'} 
                style={{
                    display: isActive ? 'block' : 'none',
                    background: 'rgba(238,248,247,1.00)'
                }}>
                <div style={{overflow: 'hidden'}}>
                    { children }
                </div>
            </div>
        </div>
    )
}


export const CollapsablePanelContainer = ({
    children = []
}) => {

    return(
        // container
        <div className="collapsable-panel-container row">
            <div id="attachments" className="cohortInfo col-md-12">
                { children }
            </div>
        </div>
    )
}