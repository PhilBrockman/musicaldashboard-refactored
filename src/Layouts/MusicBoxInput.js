import "./MusicBox.css"

import Slider from '@material-ui/core/Slider';
import React, {Component} from 'react'

import defaults from './defaultMenuItems'
const options = defaults.to_arr(defaults.menu_items())

class MusicBoxInput extends Component {
  constructor(props){
    super(props)

    this.updateValue = this.props.updateValue.bind(this)
  }

  handleChange(event, val){
    this.updateValue(this.props.item.title, val)
  }

  handleSelectionChange(event){
    this.updateValue(this.props.item.title, event.target.value)
  }

  handleCheckboxChange(event, currentValue){
    const target = event.target.value
    let update
    if(Array.isArray(currentValue)){
      if(currentValue.includes(target)){
        update = currentValue.filter(item => item !== target)
      } else {
        update =  currentValue.concat(target);
      }
    } else {
      update = [target]
    }
    this.updateValue(this.props.item.title, update)
    // this.updateValue(this.props.item.title, event.target.value)
  }

  render() {
    const specific_item = options.find(item => item.title===this.props.item.title);

    if(specific_item.inputType === "slider"){
      const step_size = specific_item.max < 3 ? .01 : 1;

      return(
        <div>
        <Slider
          value={this.props.item.value}
          min={specific_item.min}
          max={specific_item.max}
          onChange={(e,val) => this.handleChange(e,val)}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="auto"
          step={step_size}/>
        </div>
        );
    } else {
      if(specific_item.inputType === "select"){
        const option_list = specific_item.options.map(option => (
          <option
            value={option}
            key={"option-"+option}>
              {option}
          </option>
        ))
        return(
          <div>
            <select
              value={this.props.item.value}
              onChange={event => this.handleSelectionChange(event)} >
              {option_list}
            </select>
          </div>
        );
      }if(specific_item.inputType === "checkboxinput"){
        const current_value = this.props.item.value;
        const option_list = specific_item.options.map(option => {
          const style = Array.isArray(current_value) && current_value.includes(option) ? "active" : "inactive";

          return(
            <div
              key={"checkbox-"+option}
              className={style}>
                <input
                  type="checkbox"
                  id={option}
                  value={option}
                  onChange={(event) => this.handleCheckboxChange(event, current_value)}
                  checked={style==="active"} />
                <label className="custom-control-label" htmlFor={option}>
                  {option}
                </label>
            </div>
          );
        });
        return (
          <div key="aoeu" className="custom-control custom-checkbox ">
            {option_list}
          </div>
        );
      }
    }
  }
}

export default MusicBoxInput;
