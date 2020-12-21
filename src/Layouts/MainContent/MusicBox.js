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

// this.setState({ loading: true }, () => {
//     Axios.get('/endpoint')
//       .then(result => this.setState({
//         loading: false,
//         data: [...result.data],
//       }));
//   });

class MusicBox extends Component {
  constructor(props) {
    super(props);

    this.dissmissMenuItem = this.props.clickback.bind(this);
    this.updateValue      = this.props.updateValue.bind(this);
    this.resetState       = this.props.resetState.bind(this);
    this.randomizeState   = this.props.randomizeState.bind(this);

    this.state = {
      loading: false,
      response_status: null,
    }
  }

  resetStateHandler(event) {
    this.resetState();
  }

  send_gen(parameters){
    var dict = {}
    options.forEach(item => {
      let found_item = parameters.find(spec => item.title===spec.title);
      console.log(item.title + " | found | " + found_item)
      dict[item.toParam] = found_item ? found_item.value : item.default;
    })

    dict["email"] = document.getElementById("email").value
    const action = "http://0.0.0.0:5000/app/make_song/pretty"

    console.log(JSON.stringify(dict))

    this.setState({loading: true}, () => {
      fetch(action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dict)
      }).then(response => this.setState({
        loading: false,
        response_status: response.status,
      }))
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
          {this.state.loading} {this.state.response_status}
          <span>
            <Input
              className="inputemail"
              placeholder="Enter email..."
              id="email"
              />
            <Button
              variant="contained"
              className="submitbutton"
              onClick={() => this.send_gen(this.props.invokedMenuItems)}>
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
