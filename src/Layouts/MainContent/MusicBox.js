import TextField from '@material-ui/core/TextField';
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

class MusicBox extends Component {
  constructor(props) {
    super(props);

    this.dissmissMenuItem = this.props.clickback.bind(this);
    this.updateValue      = this.props.updateValue.bind(this);
    this.resetState       = this.props.resetState.bind(this);
    this.randomizeState   = this.props.randomizeState.bind(this);

    this.state = {
      error_text: null
    }
  }

  resetStateHandler(event) {
    this.resetState();
  }

  send_gen(parameters){
    if(!document.getElementById("email").value.includes("@")){
      this.setState({error_text: "invalid email format"})
      return;
    }

    var dict = {}
    options.forEach(item => {
      let found_item = parameters.find(spec => item.title===spec.title);
      console.log(item.title + " | found | " + found_item)
      dict[item.toParam] = found_item ? found_item.value : item.default;
    })

    dict["email"] = document.getElementById("email").value
    const action = "https://1click2music.com/app/make_song/pretty"

    console.log(JSON.stringify(dict))

    fetch(action, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dict)
    }).then(response => {
      if (response.status ===  200){
        let success_url = "https://www.1click2music.com/sent_email"
        window.location.href = (success_url);
      }
    })
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


    let scale = !this.props.invokedMenuItems.length > 0 ? "only-element" : "";


    return (
      <div className="music-box">
        <div className="submit-form centered-header">
          <TransitionHover>
            <FiberNewTwoToneIcon color="secondary" onClick={(event) => this.resetStateHandler()} />
          </TransitionHover>
          <TextField
            className="inputemail"
            placeholder="Enter email..."
            id="email"
            helperText={this.state.error_text}
            label={this.state.error_text === null ? "": "Error"}
            variant="outlined"
            fullWidth
            />
          <Button
            variant="contained"
            className="submitbutton"
            onClick={() => this.send_gen(this.props.invokedMenuItems)}>
            create
          </Button>
          <div className="shaker-container">
            <Randomizer
              updateValue={this.updateValue}
              toggleMenuItems={this.dissmissMenuItem}
              randomizeState={this.randomizeState}/>
          </div>
        </div>
        <div className={"playarea " + scale}>
          {relevant}
        </div>
      </div>
    );
  }
}

export default MusicBox;
