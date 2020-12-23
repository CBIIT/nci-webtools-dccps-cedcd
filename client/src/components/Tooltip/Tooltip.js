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


const Reminder = ({...props}) => {
    return  <MuiThemeProvider theme={defaultTheme}>
        <MuiThemeProvider theme={theme}>
            <Tooltip title={props.message} TransitionComponent={Zoom} {...props}>
            {props.children}
            </Tooltip>
        </MuiThemeProvider>
    </MuiThemeProvider>
}

export default Reminder