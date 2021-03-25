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
            'chopin',
            'mozart',
            'rachmaninoff',
            'country',
            'bach',
            'beethoven',
            'thebeatles',
            'franksinatra',
            'tchaikovsky'
          ],
          default: 'beethoven',
          info_title: "The style of music for MuseNet to select.",
          info_body: "",
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
          ],
          default: ['piano'],
          info_title: "MuseNet will attempt to generate a song with the checked instruments.",
          info_body: "",
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
          info_title: "Higher value = more randomness in generation",
          info_body: "A higher temperature will lead to more experimental outputs, while a smaller temperature might lead to overfitting.",

        },
        {
          title: "Length",
          interactive: true,
          stowed: false,
          toParam: "length",
          inputType: "slider",
          min: 1,
          max: 6,
          default: 5,
          info_title: "Higher value = longer output",
          info_body: "Automatically request output from MuseNet this many times.",
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
          info_title: "Higher values = more scrunity of musical generations",
          info_body: "Define the minimum percentage confidence that a given generation is of a suitable quality. Only the best for you!",
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
          info_title: "Lower values = more sensitive to repeats",
          info_body: "When scanning for chunks of repeated music, set the window size of a chunk to this many seconds.",
        },
        {
          title: "Repetition Detection",
          interactive: true,
          stowed: true,
          toParam: "repeat_percentage",
          inputType: "slider",
          min: 0,
          max: 1,
          default: .15,
          info_title: "Lower values = more unique musical sections",
          info_body: "Define the cutoff for the maximum percentage of a generation that can contain repeated sections.",
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
