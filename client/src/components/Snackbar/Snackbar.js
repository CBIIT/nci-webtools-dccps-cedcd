import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

const Messenger = ({ ...props }) => {
  const [open, setOpen] = useState(props.open);
  //setOpen(props.open)
  const handleClose = () => {
    setOpen(false);
  };

  setTimeout(() => props.changeMessage(false), 4000);

  const useStyles = makeStyles((theme) => ({
    root: {
      "width": "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  }));
  const classes = useStyles();
  const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

  return (
    <div className="col-md-8">
      <div className={classes.root}>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={props.severity} style={{ fontSize: "16px" }}>
            {props.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default Messenger;
