import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import classNames from "classnames";
import "./Tooltip.scss";

export default function Reminder(props) {
  return (
    <OverlayTrigger
      trigger={props.trigger}
      overlay={
        <Tooltip
          className={classNames(
            !props.info && "tooltip-danger",
            props.viewCohort && "tooltip-viewcohort",
            props.cancerCounts && "tooltip-cancercounts",
            props.disabled && "tooltip-disabled",
            props.info && "tooltip-info",
          )}
          id="tooltip"
          placement={props.placement || "top"}>
          {props.message}
        </Tooltip>
      }>
      {props.addspan ? <span className="p-0 m-0">{props.children}</span> : props.children}
    </OverlayTrigger>
  );
}

/*

import React from 'react'
import {
    createMuiTheme,
    MuiThemeProvider
} from "@material-ui/core/styles";
import Tooltip from '@material-ui/core/Tooltip'
import Zoom from '@material-ui/core/Zoom';

const defaultTheme = createMuiTheme();
const theme = createMuiTheme({
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: '13px',
                color: 'white',
                backgroundColor: "red"
            }
        }
    }
});


const Reminder = ({ ...props }) => {
    return props.tooltipDisabled
        ? props.children
        : <MuiThemeProvider theme={defaultTheme}>
            <MuiThemeProvider theme={theme}>
                <Tooltip title={props.message} TransitionComponent={Zoom} {...props}>
                    {props.children}
                </Tooltip>
            </MuiThemeProvider>
        </MuiThemeProvider>
}

export default Reminder

*/
