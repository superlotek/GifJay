// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** MIDI ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

midiKeys = {
  'commands' : [
    // { 'name': 'Quick Stage Setup', 'trigger': 'alt+backspace', 'device': 144, 'controller': 62, 'value': 0 },
    // { 'name': 'Startup/SceneFlip', 'trigger': 'space', 'device': 144, 'controller': 63, 'value': 0 },
    // { 'name': 'Show/Hide STG1', 'trigger': '_', 'device': 144, 'controller': 64, 'value': 0 },
    // { 'name': 'Show/Hide STG2', 'trigger': '+', 'device': 144, 'controller': 65, 'value': 0 },
    // { 'name': 'Set GPS', 'trigger': '<', 'device': 144, 'controller': 99, 'value': 0 },
    // { 'name': 'Start/Stop Robomode', 'trigger': '>', 'device': 144, 'controller': 98, 'value': 0 },
    // { 'name': 'GPS X2', 'trigger': ',', 'device': 144, 'controller': 101, 'value': 0 },
    // { 'name': 'GPS /2', 'trigger': '/', 'device': 144, 'controller': 100, 'value': 0 },
    // { 'name': 'Scene Fullscreen', 'trigger': '[', 'device': 144, 'controller': 60, 'value': 0 },
    // { 'name': 'Scene Fullscreen', 'trigger': '[', 'device': 128, 'controller': 60, 'value': 0 },
    // { 'name': 'Scene Pause', 'trigger': ']', 'device': 128, 'controller': 61, 'value': 0 },
    // { 'name': 'Scene Pause', 'trigger': ']', 'device': 144, 'controller': 61, 'value': 0 },
    // { 'name': 'STG1 Select', 'trigger': '-', 'device': 144, 'controller': 91, 'value': 0 },
    // { 'name': 'STG2 Select', 'trigger': '=', 'device': 144, 'controller': 92, 'value': 0 },
    // { 'name': 'STG1+2 Select', 'trigger': 'backspace', 'device': 144, 'controller': 93, 'value': 0 },

    // { 'name': 'Bank 1 Select', 'trigger': '!', 'device': 134, 'controller': 53, 'value': 0 },
    // { 'name': 'Bank 2 Select', 'trigger': '@', 'device': 134, 'controller': 54, 'value': 0 },
    // { 'name': 'Bank 3 Select', 'trigger': '#', 'device': 134, 'controller': 55, 'value': 0 },
    // { 'name': 'Bank 4 Select', 'trigger': '$', 'device': 134, 'controller': 56, 'value': 0 },
    // { 'name': 'Bank 5 Select', 'trigger': '%', 'device': 134, 'controller': 57, 'value': 0 },
    // { 'name': 'Bank 6 Select', 'trigger': '^', 'device': 135, 'controller': 53, 'value': 0 },
    // { 'name': 'Bank 7 Select', 'trigger': '&', 'device': 135, 'controller': 54, 'value': 0 },
    // { 'name': 'Bank 8 Select', 'trigger': '*', 'device': 135, 'controller': 55, 'value': 0 },
    // { 'name': 'Bank 9 Select', 'trigger': '(', 'device': 135, 'controller': 56, 'value': 0 },
    // { 'name': 'Bank 0 Select', 'trigger': ')', 'device': 135, 'controller': 57, 'value': 0 },

    // // { 'name': 'Filter: Kaleidoscope', 'trigger': '1', 'device': 144, 'controller': 52, 'value': 0 },
    // // { 'name': 'Filter: Kaleidoscope', 'trigger': '3', 'device': 146, 'controller': 52, 'value': 0 },
    // // { 'name': 'Filter: Kaleidoscope', 'trigger': '4', 'device': 147, 'controller': 52, 'value': 0 },

    // // { 'name': 'Banker Start/Clear', 'trigger': '\'', 'device': 144, 'controller': 82, 'value': 0 },
    // { 'name': 'Banker Start/Clear', 'trigger': '\'', 'device': 128, 'controller': 82, 'value': 0 },
    // { 'name': 'Sampler Start', 'trigger': ';', 'device': 144, 'controller': 83, 'value': 0 },
    // { 'name': 'Sampler Start', 'trigger': ';', 'device': 128, 'controller': 83, 'value': 0 },
    // { 'name': 'Sampler Stop', 'trigger': ':', 'device': 144, 'controller': 84, 'value': 0 },
    // { 'name': 'Sampler Stop', 'trigger': ':', 'device': 128, 'controller': 84, 'value': 0 },
    // { 'name': 'Sampler Clear', 'trigger': 'alt+;', 'device': 144, 'controller': 85, 'value': 0 },
    // { 'name': 'Sampler Clear', 'trigger': 'alt+;', 'device': 128, 'controller': 85, 'value': 0 },
    // { 'name': 'Sample', 'trigger': 'return', 'device': 128, 'controller': 81, 'value': 0 },

    // { 'name': 'GIY: a', 'trigger': 'a', 'device': 128, 'controller': 53, 'value': 0 },
    // { 'name': 'GIY: b', 'trigger': 'b', 'device': 128, 'controller': 54, 'value': 0 },
    // { 'name': 'GIY: c', 'trigger': 'c', 'device': 128, 'controller': 55, 'value': 0 },
    // { 'name': 'GIY: d', 'trigger': 'd', 'device': 128, 'controller': 56, 'value': 0 },
    // { 'name': 'GIY: e', 'trigger': 'e', 'device': 128, 'controller': 57, 'value': 0 },
    // { 'name': 'GIY: f', 'trigger': 'f', 'device': 129, 'controller': 53, 'value': 0 },
    // { 'name': 'GIY: g', 'trigger': 'g', 'device': 129, 'controller': 54, 'value': 0 },
    // { 'name': 'GIY: h', 'trigger': 'h', 'device': 129, 'controller': 55, 'value': 0 },
    // { 'name': 'GIY: i', 'trigger': 'i', 'device': 129, 'controller': 56, 'value': 0 },
    // { 'name': 'GIY: j', 'trigger': 'j', 'device': 129, 'controller': 57, 'value': 0 },
    // { 'name': 'GIY: k', 'trigger': 'k', 'device': 130, 'controller': 53, 'value': 0 },
    // { 'name': 'GIY: l', 'trigger': 'l', 'device': 130, 'controller': 54, 'value': 0 },
    // { 'name': 'GIY: m', 'trigger': 'm', 'device': 130, 'controller': 55, 'value': 0 },
    // { 'name': 'GIY: n', 'trigger': 'n', 'device': 130, 'controller': 56, 'value': 0 },
    // { 'name': 'GIY: o', 'trigger': 'o', 'device': 130, 'controller': 57, 'value': 0 },
    // { 'name': 'GIY: p', 'trigger': 'p', 'device': 131, 'controller': 53, 'value': 0 },
    // { 'name': 'GIY: q', 'trigger': 'q', 'device': 131, 'controller': 54, 'value': 0 },
    // { 'name': 'GIY: r', 'trigger': 'r', 'device': 131, 'controller': 55, 'value': 0 },
    // { 'name': 'GIY: s', 'trigger': 's', 'device': 131, 'controller': 56, 'value': 0 },
    // { 'name': 'GIY: t', 'trigger': 't', 'device': 131, 'controller': 57, 'value': 0 },
    // { 'name': 'GIY: u', 'trigger': 'u', 'device': 132, 'controller': 53, 'value': 0 },
    // { 'name': 'GIY: v', 'trigger': 'v', 'device': 132, 'controller': 54, 'value': 0 },
    // { 'name': 'GIY: w', 'trigger': 'w', 'device': 132, 'controller': 55, 'value': 0 },
    // { 'name': 'GIY: x', 'trigger': 'x', 'device': 132, 'controller': 56, 'value': 0 },
    // { 'name': 'GIY: y', 'trigger': 'y', 'device': 132, 'controller': 57, 'value': 0 },
    // { 'name': 'GIY: z', 'trigger': 'z', 'device': 133, 'controller': 53, 'value': 0 }
  ]
}


var midi;
var log = document.getElementById("midi-log");

if (appz.midiOn === true) {
  init();
}

function init() {
  navigator.requestMIDIAccess().then( onSuccess, onFailure ); //get midi access
}

function onSuccess( access ) {
  console.log('MIDI: DETECTED / LOADED', "\n---------------------------------");
  midi = access;
  var inputs = midi.inputs;

  //connect to first device found
  if(inputs.size > 0) {
    var iterator = inputs.values(); // returns an iterator that loops over all inputs
    var input = iterator.next().value; // get the first input
    input.onmidimessage = handleMIDIMessage;
  }
}

function onFailure( err ) {
  logText("MIDI Init Error. Error code: " + err.code, "\n---------------------------------");
}

function handleMIDIMessage(event){

  //event.data & event.receivedTime are populated
  //event.data has 3 components:
  //0) The device id
  //1) The controller id
  //2) The controller value (typically in the range 0 - 127)

  // console.log(event.data);


  if (event.data[1] == 99) { Mousetrap.trigger("<"); }
  if (event.data[1] == 98) { Mousetrap.trigger(">"); }

  if (event.data[1] == 127) { Mousetrap.trigger("alt+ctrl+esc"); }

  if (event.data[1] == 100) { Mousetrap.trigger(","); }
  if (event.data[1] == 101) { Mousetrap.trigger("."); }
  if (event.data[1] == 102) { Mousetrap.trigger("/"); }
  // if (event.data[1] == 146) { Mousetrap.trigger(","); }
  // if (event.data[1] == 102) { Mousetrap.trigger("."); }
  // if (event.data[1] == 100) { Mousetrap.trigger("/"); }

  if (event.data[1] == 48) { Mousetrap.trigger("1"); }
  if (event.data[1] == 49) { Mousetrap.trigger("2"); }
  if (event.data[1] == 50) { Mousetrap.trigger("3"); }
  if (event.data[1] == 51) { Mousetrap.trigger("4"); }

  if (event.data[1] == 52) { Mousetrap.trigger("7"); }
  if (event.data[1] == 53) { Mousetrap.trigger("8"); }
  if (event.data[1] == 54) { Mousetrap.trigger("9"); }
  if (event.data[1] == 55) { Mousetrap.trigger("0"); }
  if (event.data[1] == 56) { Mousetrap.trigger("~"); }

  if (event.data[1] == 70) { Mousetrap.trigger("-"); }
  if (event.data[1] == 71) { Mousetrap.trigger("="); }
  if (event.data[1] == 72) { Mousetrap.trigger("backspace"); }

  if (event.data[1] == 80) { Mousetrap.trigger("]"); }
  if (event.data[1] == 81) { Mousetrap.trigger("["); }
  if (event.data[1] == 82) { Mousetrap.trigger("'"); }
  if (event.data[1] == 83) { Mousetrap.trigger("ctrl+'"); }

  if (event.data[1] == 90) { Mousetrap.trigger("space"); }

  /*
  Loop through all the simple MIDI commands
  */
  midiKeys.commands.forEach(function(element, index) {
  console.log('name: ' + element.name);

  // console.log('device ' + element.device);
  // console.log('controller: ' + element.controller);
  // console.log('trigger: ' + element.trigger);
  // console.log('index: ' + index);

  if (event.data[0] == midiKeys.commands[index].device && event.data[1] == midiKeys.commands[index].controller) {
    Mousetrap.trigger(midiKeys.commands[index].trigger);
  }

});


}


