
import './App.css';
import "./Layouts/Sidebar/SideBar.css"

import Header from './Layouts/Header/Header';
import MenuItems from "./Layouts/Sidebar/MenuItems"
import MusicBox from "./Layouts/MainContent/MusicBox"
import React, {Component} from 'react'

import defaults from './defaultMenuItems'

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      menuItems: defaults.initialState(),
      sidebarOpen: true,
    };

    this.handleViewSidebar = this.handleViewSidebar.bind(this);
    this.handleMenuItemDismissal = this.handleMenuItemDismissal.bind(this);
    this.updateMenuItemValue = this.updateMenuItemValue.bind(this);
  }

  handleMenuItemDismissal(title){
    let newMenuItemsState = Object.assign([], this.state.menuItems);
    const itemIdx = newMenuItemsState.findIndex(item => item.title===title);

    newMenuItemsState[itemIdx] = {
      ...newMenuItemsState[itemIdx],
      stowed: !newMenuItemsState[itemIdx].stowed
    };

    this.setState(prevState => {
      return {
        ...prevState,
        menuItems: newMenuItemsState
      }
    });
  }

  updateMenuItemValue(title, newValue){
    let newMenuItemsState = Object.assign([], this.state.menuItems);
    const itemIdx = newMenuItemsState.findIndex(item => item.title===title);

    newMenuItemsState[itemIdx] = {
      ...newMenuItemsState[itemIdx],
      value: newValue,
    };

    this.setState(prevState => {
      return {
        ...prevState,
        menuItems: newMenuItemsState
      }
    });
  }



  handleViewSidebar(){
    this.setState(prevState => {
      return{
        ...prevState,
        sidebarOpen: !this.state.sidebarOpen,
      }
    });
  }

  render(){
    var sidebarClass = this.state.sidebarOpen ? 'sidebar open' : 'sidebar closed';
    var exploded_menu_items = this.state.menuItems.filter(item => !item.stowed)

    return (
      <div className="App">
        <Header toggleSidebar={this.handleViewSidebar} sidebarOpen={this.state.sidebarOpen} />
        <div className="content-area">
          <div className={sidebarClass}>
            <MenuItems
              invokedMenuItems={exploded_menu_items}
              menuOpen={this.state.sidebarOpen}
              clickback={this.handleMenuItemDismissal}>
              {defaults.menu_items()}
            </MenuItems>
          </div>
          <MusicBox
            invokedMenuItems={exploded_menu_items}
            clickback={this.handleMenuItemDismissal}
            updateValue={this.updateMenuItemValue} />
        </div>
      </div>
    );
  }
}

export default App;
