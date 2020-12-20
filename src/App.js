import './App.css';
import './index.css';
import "./Layouts/Sidebar/SideBar.css"

import Header from './Layouts/Header/Header';
import MenuItems from "./Layouts/Sidebar/MenuItems"
import MusicBox from "./Layouts/MainContent/MusicBox"
import React, {Component} from 'react'

import defaults from './defaultMenuItems'


function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      menuItems: defaults.initialState(),
      sidebarOpen: false,
    };

    this.handleViewSidebar = this.handleViewSidebar.bind(this);
    this.handleMenuItemDismissal = this.handleMenuItemDismissal.bind(this);
    this.updateMenuItemValue = this.updateMenuItemValue.bind(this);
    this.resetState = this.resetState.bind(this)
    this.randomizeState = this.randomizeState.bind(this)
  }

  resetState(){
    this.setState(prevState => {
      return {
        ...prevState,
        menuItems: defaults.initialState(),
      }
    });
  }


  randomizeState(){
    console.log(this.state)
    const options = defaults.to_arr(defaults.menu_items());

    const randTitle = options[Math.floor(Math.random()*options.length)].title

    const newState = options.map(item => {
      let notStowed = Math.random() < .5 || item.title === randTitle;
      let value = item.default

      if(notStowed) {
        switch (item.inputType) {
          case "slider":
            value = Math.random()*(item.max - item.min)+item.min;
            if (item.max < 3){
              value = Math.round(value*100)/100
            } else {
              value = Math.ceil(value)
            }
            break;
          case "select":
            value = item.options[Math.floor(Math.random()*item.options.length)];
            break;
          case "checkboxinput":
            value = getRandomSubarray(item.options, 3);
            break;
          default:
            console.log('>> broke')
            break;
        }
      }

      return {
           title: item.title,
           stowed: !notStowed,
           value: value,
      }
    })

    this.setState( {
      menuItems: newState,
      sidebarOpen: true,

    }, () => console.log(this.state))


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

        <div className={sidebarClass}>
          <MenuItems
            invokedMenuItems={exploded_menu_items}
            menuOpen={this.state.sidebarOpen}
            clickback={this.handleMenuItemDismissal}>
            {defaults.menu_items()}
          </MenuItems>
        </div>
        
        <div className="content-area">
          <MusicBox
            invokedMenuItems={exploded_menu_items}
            clickback={this.handleMenuItemDismissal}
            updateValue={this.updateMenuItemValue}
            resetState={this.resetState}
            randomizeState={this.randomizeState}/>
        </div>
      </div>
    );
  }
}

export default App;
