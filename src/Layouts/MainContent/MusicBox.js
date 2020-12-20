import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FiberNewTwoToneIcon from '@material-ui/icons/FiberNewTwoTone';

import TransitionHover from '../IconHovered'

import "./MusicBox.css";
import "./checkbox.scss";
import "./MuseNetComponent.css"
import Randomizer from "./Randomize"
import InputHeader from "./InputHeader"

import React, {Component} from 'react';


import defaults from '../../defaultMenuItems'
const options = defaults.to_arr(defaults.menu_items())

function send_gen(parameters){
  let musenet_options = (parameters.map(item => {
    let found_item = options.find(spec => item.title===spec.title);
    return [found_item.toParam, item.value]
  }))

  musenet_options = {
    ...musenet_options,
    email: document.getElementById("email").value,
  }

  const action = "https://www.1click2music.com/app/make_song"

  var xhr = new XMLHttpRequest();
  xhr.open("POST", action, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(musenet_options));
  xhr.onload = function() {
    console.log("HELLO")
    console.log(this.responseText);
    var data = JSON.parse(this.responseText);
    console.log(data);
  }

}

class MusicBox extends Component {
  constructor(props) {
    super(props);

    this.dissmissMenuItem = this.props.clickback.bind(this);
    this.updateValue      = this.props.updateValue.bind(this);
    this.resetState       = this.props.resetState.bind(this);
    this.randomizeState   = this.props.randomizeState.bind(this);
  }

  resetStateHandler(event) {
    this.resetState();
  }

  render() {
    let gen_and_send
    let relevant = this.props.invokedMenuItems.map(item => {
      return(
          <InputHeader
            key={"input-"+item.title}
            clickback={this.dissmissMenuItem }
            item={item}
            updateValue={this.updateValue}
            />
      );
    })

    if(relevant.length === 0){
      relevant =  (<div className="placeholder"></div>);
      gen_and_send = null;
    } else{
      gen_and_send = (
        <div className="options-have-been-selected">
          <span className="refresher">
            <TransitionHover>
              <FiberNewTwoToneIcon color="secondary" onClick={(event) => this.resetStateHandler()} />
            </TransitionHover>
          </span>
          <span>
            <Input
              className="inputemail"
              placeholder="Enter email..."
              id="email"
              />
            <Button
              variant="contained"
              className="submitbutton"
              onClick={() => send_gen(this.props.invokedMenuItems)}>
              create</Button>
          </span>
        </div>
        );
    }

    let scale = null
    if(!gen_and_send){
      scale = "only-element"
    }

    return (
      <div className="music-box">
        <div className="submit-form centered-header">
          {gen_and_send}

          <Randomizer
            scale={scale}
            updateValue={this.updateValue}
            toggleMenuItems={this.dissmissMenuItem}
            randomizeState={this.randomizeState}/>
        </div>
        <div className="playarea">
          {relevant}
        </div>
      </div>
    );
  }
}

export default MusicBox;
