import React, { useRef } from 'react';
import classNames from 'classnames'
import './collapsable-panels.scss';

export const CollapsiblePanel = ({
    className = '',
    panelName = '',
    activePanel = '',
    panelTitle = '',
    onClick = () => {},
    children = [],
    condition = false,
}) => { 
    const isActive = (activePanel && panelName && activePanel === panelName) || condition;
    const divRef = useRef();

    return (
        <div className={className} ref={divRef}>
            <button type="button" 
                className={classNames('cedcd-btn',  isActive && 'active')} 
                aria-expanded={isActive} 
                aria-controls="more" 
                onClick={e => {
                    e.preventDefault();
                    onClick();
                    setTimeout(() => {
                        const { offsetTop } = divRef.current;
                        window.scrollTo(0, offsetTop);
                    }, 100);
                }}>
                <span className="triangle"></span><b>{panelTitle}</b> 
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


export const CollapsiblePanelContainer = ({
    children = []
}) => {
    return (
        // container
        <div className="collapsable-panel-container">
            { children }
        </div>
    )
}