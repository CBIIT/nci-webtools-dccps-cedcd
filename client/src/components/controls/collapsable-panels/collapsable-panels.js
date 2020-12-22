import React from 'react';
import './collapsable-panels.scss';

export const CollapsablePanel = ({
    panelName = '',
    activePanel = '',
    panelTitle = '',
    onClick = () => {},
    children = [],
    condition = false
}) => { 

    return (
        <div>
            <button type="button" 
                className={'cedcd-btn ' + ((activePanel && panelName && activePanel === panelName) || condition ? 'active' : '')} 
                aria-expanded={(activePanel && panelName && activePanel === panelName) || condition} 
                aria-controls="more" 
                onClick={onClick}>
                <span className="triangle"></span>{ panelTitle }
            </button>
            <div className="cohortInfoBody" 
                id="more" 
                aria-hidden={(activePanel && panelName && activePanel === panelName) || condition ? 'false' : 'true'} 
                style={{
                    display: (activePanel && panelName && activePanel === panelName) || condition ? 'block' : 'none'
                }}>
                <div className={(activePanel && panelName && activePanel === panelName) || condition ? 'panel-active' : 'panellet'}>
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