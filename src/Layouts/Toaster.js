
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import React, {Component} from 'react';

class Toast extends Component {
  constructor(props){
    super(props)

    this.close = this.props.showToaster.bind(this)
  }

  handleClick(bool){
    this.close(bool)
  }

  render(){
    const visible = this.props.open ? "block" : "none";

    return (
        <div style={{display: visible}}>
            <Alert
              severity="info"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    this.handleClick(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
            <AlertTitle>{this.props.title}</AlertTitle>
            {this.props.body}
            </Alert>
        </div>
      );
  }
}

export default Toast;
