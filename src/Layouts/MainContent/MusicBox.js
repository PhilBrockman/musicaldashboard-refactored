import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import NotListedLocationTwoToneIcon from '@material-ui/icons/NotListedLocationTwoTone';

import TransitionHover from './IconHovered'

import "./MusicBox.css";
import "./checkbox.scss";
import "./MuseNetComponent.css"
import MusicBoxInput from "./MusicBoxInput";

import React, {Component} from 'react';

class MuseNetInput extends Component {
  constructor(props){
    super(props);
    this.dissmissItem = this.props.clickback.bind(this)
    this.updateValue  = this.props.updateValue.bind(this)
  }

  handleClick = (e) => {
    e.stopPropagation()
    this.dissmissItem(this.props.item.title)
  }

  render(){
    return (
      <div className="MuseNetComponent">
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
            <TransitionHover>
              <NotListedLocationTwoToneIcon color="primary" />
            </TransitionHover>
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

class MusicBox extends Component {
  constructor(props) {
    super(props);

    this.dissmissMenuItem = this.props.clickback.bind(this);
    this.updateValue      = this.props.updateValue.bind(this)
  }

  render() {
    let relevant = this.props.invokedMenuItems.map(item => {
      return(
          <MuseNetInput
            key={"input-"+item.title}
            clickback={this.dissmissMenuItem }
            item={item}
            updateValue={this.updateValue}
            />
      );
    })

    if(relevant.length === 0){
      relevant =
        (<div className="placeholder">Customize your song</div>);
    }

    return (
      <div className="music-box">
        <div className="submit-form centered-header">
          <Input
            placeholder="Enter email..."
            />
          <Button
            variant="contained"
            color="primary">
            create</Button>
        </div>
        <div className="playarea">
          {relevant}
        </div>
      </div>
    );
  }
}

export default MusicBox;
