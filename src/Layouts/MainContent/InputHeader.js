import RemoveCircle from '@material-ui/icons/RemoveCircle';
import NotListedLocationTwoToneIcon from '@material-ui/icons/NotListedLocationTwoTone';

import MusicBoxInput from "./MusicBoxInput";
import TransitionHover from '../IconHovered'
import React, {Component} from 'react';

import IconButton from '@material-ui/core/IconButton';
import Toast from "../Toaster";

import defaults from '../../defaultMenuItems'
const options = defaults.to_arr(defaults.menu_items())

class InputHeader extends Component {
  constructor(props){
    super(props);
    this.dissmissItem = this.props.clickback.bind(this)
    this.updateValue  = this.props.updateValue.bind(this)
    this.state = {
      open: false,
    }
    this.st = this.boundShowToaster.bind(this)
  }

  handleClick = (e) => {
    e.stopPropagation()
    this.dissmissItem(this.props.item.title)
  }

  boundShowToaster(bool) {
    this.setState(prevState => {
      return {
        ...prevState,
        open: bool,
      };
    })
  }

  render(){
    const specific_item = options.find(item => item.title===this.props.item.title);
    return (
      <div className="MuseNetComponent">

      <Toast
        open={this.state.open}
        setOpen={this.state.setOpen}
        showToaster={this.st}
        title={specific_item.info_title}
        body={specific_item.info_body}
        />
        <div className="mnc-header centered-header">
          <div>
            <TransitionHover>
              <RemoveCircle
                color="secondary"
                key={"interactive-"+this.props.item.title}
                onClick={this.handleClick} />
            </TransitionHover>
          </div>
          <div>
            {this.props.item.title}
          </div>
          <div>
            <IconButton
              onClick={() => this.boundShowToaster(!this.state.open)}>
                <TransitionHover>
                  <NotListedLocationTwoToneIcon color="secondary" />
                </TransitionHover>
            </IconButton>
          </div>
        </div>
        <MusicBoxInput
          item={this.props.item}
          updateValue={this.updateValue}
          />
      </div>
    );
  }
}

export default InputHeader;
