import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import NotListedLocationTwoToneIcon from '@material-ui/icons/NotListedLocationTwoTone';

import TransitionHover from './IconHovered'

import "./MusicBox.css";
import "./checkbox.scss";
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
      <div>
        <div className="MuseNetComponent">
          <div key={"interactive-"+this.props.item.title}
               onClick={this.handleClick}>
               <RemoveCircle color="secondary" />
          </div>
          <div>
            {this.props.item.title}
          </div>
          <div>
          <TransitionHover>add_circle</TransitionHover>
          </div>
          <div>
            <NotListedLocationTwoToneIcon fontSize="large" color="primary" />
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
    const relevant = this.props.invokedMenuItems.map(item => {
      return(
          <MuseNetInput
            key={"input-"+item.title}
            clickback={this.dissmissMenuItem }
            item={item}
            updateValue={this.updateValue}
            />
      );
    })

    return (
      <div className="music-box">
        <div className="playarea">
          <div className="submit-form">
            <Input
              placeholder="Enter email..."
              />
            <Button
              variant="contained"
              color="primary">
              Gogo</Button>
          </div>
          {relevant}
        </div>
      </div>
    );
  }
}

export default MusicBox;
