import "./Randomize.css"
import Casino from '@material-ui/icons/Casino';
import TransitionHover from '../IconHovered'
import React, {Component} from 'react'

class Randomizer extends Component {
  constructor(props){
    super(props);

    this.updateValue = this.props.updateValue.bind(this)
    this.toggleMenuItem = this.props.toggleMenuItems.bind(this)
    this.randomizeState = this.props.randomizeState.bind(this)
  }

  handleClick(){
    this.randomizeState();
  }

  render(){
    return (
      <div className={'shaker ' + this.props.scale}>
        <TransitionHover>
          <Casino onClick={() => this.handleClick()} color="secondary" />
        </TransitionHover>
      </div>
    );
  }
}

export default Randomizer;
