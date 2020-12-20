import "./MenuItems.css"

import Icon from '@material-ui/core/Icon';
import React, {Component} from 'react'

class InteractiveMenuItem extends Component {
  constructor(props){
    super(props);
    this.dissmissMenuItem = this.props.clickback.bind(this)
  }

  handleClick = (e) => {
    e.stopPropagation()
    this.dissmissMenuItem(this.props.title)
  }

  render(){
    const style = this.props.stowed ? "interactive" : "interactive exit";
    return (
      <div key={"interactive-"+this.props.title}
           className={style}
           onClick={this.handleClick}>
           <Icon color="primary">add_circle</Icon>
          {this.props.children}
      </div>
    );
  }
}

class MenuItem extends Component {
  constructor(props){
    super(props);

    this.clickback = this.props.clickback.bind(this)
  }
    render(){
    let innerContent;

    let recurse = this.props.item.hasOwnProperty("children") ?
    <MenuItems
      key={"menu-"+this.props.item.title}
      menuOpen={this.props.menuOpen}
      invokedMenuItems={this.props.invokedMenuItems}
      clickback={this.clickback}>
    {this.props.item.children}
    </MenuItems> :
                                      "";

    let icon    = this.props.item.hasOwnProperty("icon") ?  <Icon>{this.props.item.icon.name}</Icon>: "";

    //determine displaying all text or just label
    if(this.props.menuOpen){
      innerContent = (
        <div className="menuItemContainer">
          <div className="label">
            {icon}
            <div>
            {this.props.item.title}
            </div>
          </div>
          <div className="offset">
            {recurse}
          </div>
        </div>
      );
    } else {
      innerContent = (
        <span>
          <div className="label">
            {icon}
          </div>
        </span>
      );
    }

    innerContent = (
      <div className="menuItem">
      {innerContent}
      </div>
    );

    if(this.props.item.hasOwnProperty("stowed")){
        return (
          <InteractiveMenuItem
            title={this.props.item.title}
            clickback={this.clickback}
            invokedMenuItems={this.props.invokedMenuItems}
            stowed={!this.props.invokedMenuItems.map(item => item.title).includes(this.props.item.title)}>
              {innerContent}
          </InteractiveMenuItem>
        );
    } else {
      return innerContent;
    };
  }
}

class MenuItems extends Component {
  constructor(props){
    super(props);
    this.clickback = this.props.clickback.bind(this)
  }
  render(){
    let items = this.props.children.map((item) => (
      <MenuItem
        invokedMenuItems={this.props.invokedMenuItems}
        key={'parent-'+item.title}
        menuOpen={this.props.menuOpen}
        item={item}
        clickback={this.props.clickback}
      >
        {this.props.invokedMenuItems.length}
      </MenuItem>
    ));

    return items;
  }
}

export default MenuItems
// dissmissMenuItem={this.handleMenuItemDismissal}
