var midi;
var log = document.getElementById("midi-log");

if (midiOn === true) {
  init();
}


function init() {
  navigator.requestMIDIAccess().then( onSuccess, onFailure ); //get midi access
}

function onSuccess( access ) {
  console.log('MIDI detected!');
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
// if (event.data[0] == 128 && event.data[1] == 53) {
//   console.log('YEAH!! - A');
//   Mousetrap.trigger('a');
// }
// if (event.data[0] == 128 && event.data[1] == 54) {
//   console.log('YEAH!! - B');
//   cacheBuster =  new Date().getTime();
//   bgCenters = ".gif?" + cacheBuster + ") center center";
//   $(s1).css('background', bankLocation + availableTriggers[1].location + availableTriggers[1].name + bgCenters);
//   $(s1).add(s2).css(this[randomizer(stageArray)]);
// }
// if (event.data[0] == 128 && event.data[1] == 55) {
//   console.log('YEAH!! - C');
//   cacheBuster =  new Date().getTime();
//   bgCenters = ".gif?" + cacheBuster + ") center center";
//   $(s1).css('background', bankLocation + availableTriggers[2].location + availableTriggers[2].name + bgCenters);
//   $(s1).add(s2).css(this[randomizer(stageArray)]);
// }

/* FILTERS */
if (event.data[1] == 16) {
  s1SaturateString = "saturate(" + event.data[2] + ")";
  addFilter(0, s1SaturateString);
  $(s1).css('-webkit-filter', filtersOnString);
}

if (event.data[1] == 20) {
  s2SaturateString = "saturate(" + event.data[2] + ")";
  $(s2).css('-webkit-filter', s2SaturateString);
    // addFilter(0, s1SaturateString);
}

if (event.data[1] == 17) {
  s1HueshiftValue = event.data[2] * 2.83;
  s1HueshiftString = "hue-rotate(" + s1HueshiftValue + "deg)";
  addFilter(1, s1HueshiftString)
  $(s1).css('-webkit-filter', filtersOnString);
}

if (event.data[1] == 21) {
  s2HueshiftValue = event.data[2] * 2.83;
  s2HueshiftString = "hue-rotate(" + s2HueshiftValue + "deg)";
  $(s2).css('-webkit-filter', s2HueshiftString);
  // addFilter(1, s1HueshiftString)
}

if (event.data[1] == 18) {
  s1BlurValue = event.data[2] * (blurAmount/127);
  s1BlurString = "blur(" + s1BlurValue + "px)";
  addFilter(2, s1BlurString);
  $(stgSelect).css('-webkit-filter', filtersOnString);
}

if (event.data[1] == 22) {
  s2BlurValue = event.data[2] * (blurAmount/127);
  s2BlurString = "blur(" + s2BlurValue + "px)";
  $(s2).css('-webkit-filter','blur(' + s2BlurValue + 'px');
  // addFilter(2, s1BlurString);
}

if (event.data[1] == 19) {
  s1InvertValue = event.data[2] * .78;
  s1InvertString = "invert(" + s1InvertValue + "%)";
  addFilter(2, s1InvertString);
  $(s1).css('-webkit-filter', filtersOnString);
}

if (event.data[1] == 23) {
  s2InvertValue =  event.data[2] * .78;
  s2InvertString = "invert(" + s2InvertValue + "%)";
  $(s2).css('-webkit-filter','invert(' + s2InvertValue + '%');
  // addFilter(2, s1BlurString);
}

/*
Loop through all the simple MIDI commands
*/
midiKeys.commands.forEach(function(element, index) {
  // console.log('name: ' + element.name);

	// console.log('device ' + element.device);
	// console.log('controller: ' + element.controller);
	// console.log('trigger: ' + element.trigger);
	// console.log('index: ' + index);

  if (event.data[0] == midiKeys.commands[index].device && event.data[1] == midiKeys.commands[index].controller) {
    Mousetrap.trigger(midiKeys.commands[index].trigger);
}


});

}
