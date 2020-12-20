class defaults {
  static menu_items() {
  return(
    [{
      title: 'Vanilla MuseNet',
      icon: { name: 'subject' },
      children: [{
          title: "Composer",
          interactive: true,
          stowed: true,
          toParam: "composer",
          inputType: "select",
          options: [
            "bach",
            "mozart"
          ]
        },
        {
          title: "Instruments",
          interactive: true,
          stowed: true,
          toParam: "instrumentation",
          inputType: "checkboxinput",
          options: [
            'piano',
            'strings',
            'winds',
            'drums',
            'harp',
            'guitar',
            'bass',
          ]
        },
      ]
    },
    {
      title: "Shape & Form",
      icon: { name: "playlist_add" },
      children: [
        {
          title: "Temperature",
          interactive: true,
          stowed: true,
          toParam: "temp",
          inputType: "slider",
          min: .5,
          max: 1.5,
          default: .9,

        },
        {
          title: "Length",
          interactive: true,
          stowed: true,
          toParam: "length",
          inputType: "slider",
          min: 1,
          max: 6,
          default: 5,
        },
      ]
    },
    {
      title: 'Fine Tuning',
      icon: { name: 'queue_music' },
      children: [
        {
          title: "Quality Control",
          interactive: true,
          stowed: true,
          toParam: "cutoff",
          inputType: "slider",
          min: 0,
          max: 1,
          default: .6,
        },
        {
          title: "Clip Length",
          interactive: true,
          stowed: true,
          toParam: "clip_length",
          inputType: "slider",
          min: 2,
          max: 20,
          default: 5,
        },
        {
          title: "Repetition Detection",
          interactive: true,
          stowed: true,
          toParam: "repeat_percentage",
          inputType: "slider",
          inverted: true,
          min: 0,
          max: 1,
          default: .15,
        },
      ]
    },
    ]);
  }

  static test(){
    return "aoeu"
  }

  static flatten(arr) {
    if (arr.filter(e => Array.isArray(e)).length > 0) {
      return this.flatten(arr.flat());
    } else {
      return arr;
    }
  }

  static interactive_menu_items(obj) {
    if(obj.hasOwnProperty("children")) {
      return obj.children.map(item => this.interactive_menu_items(item));
    } else {
      if (obj.hasOwnProperty("interactive")) {
        return obj;
      } else {
        return null;
      }
    }
  }

  static to_arr(){
    return this.flatten(this.menu_items().map(item => this.interactive_menu_items(item)).filter(item => item != null))
  }

  static initialState(){
    return this.to_arr().map(item=> ({
      title: item.title,
      stowed: item.stowed,
      value: item.default
    }))
  }
}



export default defaults;
