import IconButton from '@material-ui/core/IconButton';
import FormatIndentIncrease from '@material-ui/icons/FormatIndentIncrease';
import FormatIndentDecrease from '@material-ui/icons/FormatIndentDecrease';
import React, {Component} from 'react'


class Header extends Component {
  render(){
    let conditional_icon = this.props.sidebarOpen ? <FormatIndentDecrease />: <FormatIndentIncrease />;

    return (
      <div className="header">
        <div>
          <IconButton onClick={this.props.toggleSidebar} className="sidebar-toggle">{conditional_icon}</IconButton>
        </div>
        <div>
          1click2music.com
        </div>
      </div>
    );
  }
}
export default Header;
