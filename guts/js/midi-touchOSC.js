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

if (event.data[1] == 16) {
  console.log(event.data[2]);
  s1SaturateString = "saturate(" + event.data[2] + ")";
  if (event.data[2] == 0) {
    console.log('YAH!!!');
    $(stgSelect).css('-webkit-filter', 'saturate(1)');
  }

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
  // $(s1).css('opacity', event.data[2] * .0127);
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
  // $(s1).css('-webkit-filter','hue-rotate(' + (event.data[2]*2.83) + 'deg)')
}

if (event.data[1] == 18) {
  console.log(event.data[2]);
  // $(s1).css('opacity', event.data[2] * .0127);
  // $(s1).css('-webkit-filter','blur(' + (event.data[2]*.078) + 'px)')
  // blurryOn = 1;
  // console.log('FX: BLUR ON');
  // blurry();
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

if (event.data[1] == 19) {
  console.log(event.data[2]);

  // $(s1).css('opacity', event.data[2] * .0127);
  // $(s1).css('-webkit-filter','invert(' + (event.data[2]*.78) + '%)')
  // console.log(event.data[2]*.078);
  // invertOn = 1;
  // console.log('FX: INVERT ON');
  // invert();

}


if (event.data[1] == 62 && event.data[0] == 144) {
  Mousetrap.trigger('alt+backspace');
}

if (event.data[1] == 63 && event.data[0] == 128) {
  Mousetrap.trigger('space');
}

if (event.data[1] == 64 && event.data[0] == 144) {
  Mousetrap.trigger('_');
}

if (event.data[1] == 65 && event.data[0] == 144) {
  Mousetrap.trigger('+');
}
if (event.data[1] == 64 && event.data[0] == 144 && event.data[1] == 65 && event.data[0] == 144) {
  Mousetrap.trigger('backspace');
}

if (event.data[1] == 99 && event.data[0] == 144) {
  Mousetrap.trigger('<');
}

if (event.data[1] == 98 && event.data[0] == 144) {
  Mousetrap.trigger('>');
}

if (event.data[1] == 101 && event.data[0] == 144) {
  Mousetrap.trigger(',');
}
if (event.data[1] == 100 && event.data[0] == 144) {
  Mousetrap.trigger('/');
}
if (event.data[1] == 50 && event.data[0] == 151) {
  Mousetrap.trigger('1');
}
if (event.data[1] == 50 && event.data[0] == 135) {
  Mousetrap.trigger('1');
}





  if (event.data.length === 3) {
    // logText('controller id: ' + event.data[1] +  ', value: ' + event.data[2]);
  }
}
