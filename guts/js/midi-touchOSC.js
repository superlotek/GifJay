var midi;
var log = document.getElementById("midi-log");
init();

function init() {
  navigator.requestMIDIAccess().then( onSuccess, onFailure ); //get midi access
}

function onSuccess( access ) {

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
  logText("MIDI Init Error. Error code: " + err.code);
}

function handleMIDIMessage(event){

  //event.data & event.receivedTime are populated
  //event.data has 3 components:
  //0) The device id
  //1) The controller id
  //2) The controller value (typically in the range 0 - 127)

  console.log(event.data);

/* GIY PLAY */
if (event.data[0] == 128 && event.data[1] == 53) {
  console.log('YEAH!! - A');
    cacheBuster =  new Date().getTime();
    bgCenters = ".gif?" + cacheBuster + ") center center";
    $(s1).css('background', bankLocation + availableTriggers[0].location + availableTriggers[0].name + bgCenters);
    $(s1).add(s2).css(this[randomizer(stageArray)]);
}
if (event.data[0] == 128 && event.data[1] == 54) {
  console.log('YEAH!! - B');
  cacheBuster =  new Date().getTime();
  bgCenters = ".gif?" + cacheBuster + ") center center";
  $(s1).css('background', bankLocation + availableTriggers[1].location + availableTriggers[1].name + bgCenters);
  $(s1).add(s2).css(this[randomizer(stageArray)]);
}
if (event.data[0] == 128 && event.data[1] == 55) {
  console.log('YEAH!! - C');
  cacheBuster =  new Date().getTime();
  bgCenters = ".gif?" + cacheBuster + ") center center";
  $(s1).css('background', bankLocation + availableTriggers[2].location + availableTriggers[2].name + bgCenters);
  $(s1).add(s2).css(this[randomizer(stageArray)]);
}

/* FILTERS */

if (event.data[1] == 16) {
  console.log(event.data[2]);
  s1SaturateString = "saturate(" + event.data[2] + ")";
  if (stgSelect == "all") {
    $(s1).css('-webkit-filter', s1SaturateString);
    $(s2).css('-webkit-filter', s2SaturateString);
    addFilter(0, s2SaturateString);
  } else {
    addFilter(0, s1SaturateString);
    $(stgSelect).css('-webkit-filter', filtersOnString);
  }
}

if (event.data[1] == 17) {
  console.log(event.data[2]);
  s1HueshiftValue = event.data[2] * 2.83;
  s2HueshiftValue = event.data[2] * 2.83;
  console.log('HUE: ' + event.data[2] * 2.83);
  s1HueshiftString = "hue-rotate(" + s1HueshiftValue + "deg)";
  s2HueshiftString = "hue-rotate(" + s2HueshiftValue + "deg)";
  if (stgSelect == "all") {
    console.log('FX HUESHIFT: STG 1+2');
    $(s1).css('-webkit-filter', s1HueshiftString);
    $(s2).css('-webkit-filter', s2HueshiftString);
  } else {
    addFilter(1, s1HueshiftString)
    $(stgSelect).css('-webkit-filter', filtersOnString);
  }
}

if (event.data[1] == 18) {
  console.log(event.data[2]);
  s1BlurValue = event.data[2] * (blurAmount/127);
  s2BlurValue = event.data[2] * (blurAmount/127);
  s1BlurString = "blur(" + s1BlurValue + "px)";
  s2BlurString = "blur(" + s2BlurValue + "px)";
  if (stgSelect == "all") {
    console.log('FX BLURRY: STG 1+2');
    $(s1).css('-webkit-filter','blur(' + s1BlurValue + 'px');
    $(s2).css('-webkit-filter','blur(' + s2BlurValue + 'px');
  } else {
    $(stgSelect).css('-webkit-filter','blur(' + numRan(10) + 'px');
    addFilter(2, s1BlurString);
    $(stgSelect).css('-webkit-filter', filtersOnString);
  }
}

/*
Loop through all the simple MIDI commands

midiKeys.commands.forEach(function(element, index) {
	console.log('device ' + element.device);
	console.log('controller: ' + element.controller);
	console.log('trigger: ' + element.trigger);
	console.log('name: ' + element.name);
	console.log('index: ' + index);

  if (event.data[0] == midiKeys.commands[index].device && event.data[1] == midiKeys.commands[index].controller) {
    Mousetrap.trigger(midiKeys.commands[index].trigger);
}


});
*/

/* QUICK STAGE SETUP */
if (event.data[0] == midiKeys.commands[0].device && event.data[1] == midiKeys.commands[0].controller) {
  Mousetrap.trigger(midiKeys.commands[0].trigger);
}

/* STARTUP / SCENEFLIP */
if (event.data[0] == midiKeys.commands[1].device && event.data[1] == midiKeys.commands[1].controller) {
  Mousetrap.trigger(midiKeys.commands[1].trigger);
}

/* SHOW/HIDE STG1 */
if (event.data[0] == midiKeys.commands[2].device && event.data[1] == midiKeys.commands[2].controller) {
  Mousetrap.trigger(midiKeys.commands[2].trigger);
}

/* SHOW/HIDE STG2 */
if (event.data[0] == midiKeys.commands[3].device && event.data[1] == midiKeys.commands[3].controller) {
  Mousetrap.trigger(midiKeys.commands[3].trigger);
}

/* SET GPS */
if (event.data[0] == midiKeys.commands[4].device && event.data[1] == midiKeys.commands[4].controller) {
  Mousetrap.trigger(midiKeys.commands[4].trigger);
}

/* START/STOP ROBOMODE */
if (event.data[0] == midiKeys.commands[5].device && event.data[1] == midiKeys.commands[5].controller) {
  Mousetrap.trigger(midiKeys.commands[5].trigger);
}

/* GPS X2 */
if (event.data[0] == midiKeys.commands[6].device && event.data[1] == midiKeys.commands[6].controller) {
  Mousetrap.trigger(midiKeys.commands[6].trigger);
}

/* GPS /2 */
if (event.data[0] == midiKeys.commands[7].device && event.data[1] == midiKeys.commands[7].controller) {
  Mousetrap.trigger(midiKeys.commands[7].trigger);
}



// if (event.data[1] == 99 && event.data[0] == 144) {
//   Mousetrap.trigger('<');
// }
//
// if (event.data[1] == 98 && event.data[0] == 144) {
//   Mousetrap.trigger('>');
// }

// if (event.data[1] == 101 && event.data[0] == 144) {
//   Mousetrap.trigger(',');
// }
// if (event.data[1] == 100 && event.data[0] == 144) {
//   Mousetrap.trigger('/');
// }

// if (event.data[1] == 50 && event.data[0] == 151) {
//   Mousetrap.trigger('1');
// }
// if (event.data[1] == 50 && event.data[0] == 135) {
//   Mousetrap.trigger('1');
// }
//
// if (event.data[1] == 64 && event.data[0] == 144 && event.data[1] == 65 && event.data[0] == 144) {
//   Mousetrap.trigger('backspace');
// }


}
