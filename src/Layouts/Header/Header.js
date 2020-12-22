import IconButton from '@material-ui/core/IconButton';
import FormatIndentIncrease from '@material-ui/icons/FormatIndentIncrease';
import FormatIndentDecrease from '@material-ui/icons/FormatIndentDecrease';
import Mood from  '@material-ui/icons/Mood';
import React, {Component} from 'react'

 import TransitionHover from '../IconHovered'


class Header extends Component {
  render(){
    let conditional_icon = this.props.sidebarOpen ?
    <TransitionHover><FormatIndentDecrease color="secondary"/></TransitionHover>:
    <TransitionHover><FormatIndentIncrease color="secondary"/></TransitionHover>;

    return (
      <div className="header">
        <div className="header-content">
          <div className="sidebar-toggler">

            <IconButton onClick={this.props.toggleSidebar} className="sidebar-toggle">{conditional_icon}</IconButton>

          </div>
          <div className="mood">
            <Mood />
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
