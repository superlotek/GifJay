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

    if (event.data[1] == 12) {
      console.log(event.data[2]);
      // $(s1).css('opacity', event.data[2] * .0127);
      $(s1).css('-webkit-filter','saturate(' + event.data[2] + ')')
    }

if (event.data[1] == 12) {
      console.log(event.data[2]);
      // $(s1).css('opacity', event.data[2] * .0127);
      $(s1).css('-webkit-filter','saturate(' + event.data[2] + ')')
    } 

if (event.data[1] == 16) {
      console.log(event.data[2]);
      // $(s1).css('opacity', event.data[2] * .0127);
      $(s1).css('-webkit-filter','saturate(' + event.data[2] + ')')
    } 

if ((event.data[1] == 39 && event.data[2] == 127) && (event.data[1] == 50 && event.data[2] == 127)) {
      console.log(event.data[2]);
      // $(s1).css('opacity', event.data[2] * .0127);
      $(s1).css('display', 'none');
      alert('yup');
    } 



    if (event.data[1] == 37 && event.data[2] == 64) {
      Mousetrap.trigger('>');
    }
    if (event.data[1] == 60 && event.data[2] == 1) {
      Mousetrap.trigger('8');
    }
    if (event.data[1] == 43 && event.data[2] == 1) {
      Mousetrap.trigger('.');
    }



      if (event.data.length === 3) {
        // logText('controller id: ' + event.data[1] +  ', value: ' + event.data[2]);
      }
    }