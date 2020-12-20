import RemoveCircle from '@material-ui/icons/RemoveCircle';
import NotListedLocationTwoToneIcon from '@material-ui/icons/NotListedLocationTwoTone';


import MusicBoxInput from "./MusicBoxInput";
import TransitionHover from './IconHovered'
import React, {Component} from 'react';

class InputHeader extends Component {
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

export default InputHeader;
