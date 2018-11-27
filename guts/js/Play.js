// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** PLAY ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Play = {

  setGPS() {
    console.log('GPS: SET');
    var d = new Date();
    var t = d.getTime();
    beatTime = t - lastClick;
    lastClick = t;
    console.log('GPS: ' + beatTime, "\n---------------------------------");
  },

  clearBeatTime() {
    clearInterval(gpsTimer);
    gpsTimer = setInterval(function() {
      Play.startRobomode(beatTime);
    }, beatTime);
  },

  stopRobomode() {
    clearInterval(gpsTimer);
    robomodeOn = 0;
    console.log('ROBOMODE: OFF', "\n---------------------------------");
  },

  startRobomode() {
    $('body').css('background-image', 'repeating-linear-gradient(' + numRan(360) + 'deg, ' +
      randomColorChange() + ' ' + numRan(100) + '%, ' +
      randomColorChange() + ' ' + numRan(100) + '%, ' +
      randomColorChange() + ' ' + numRan(100)+ '%)');
    if (bankerOn) { playMode('banker');
      } else if (samplerOn) { playMode('sampler');
      } else if (sequencerOn) { playMode('sequencer');
      } else if (setOn) { playMode('sets');
      } else { playMode('default');
    }
    if(stgFadeOn) { Effects.stgFade(); }
    if(saturateOn) { Filter.saturator(); }
    if(sameSameOn) { Effects.sameSame(); }
    if(hueShiftOn) { Filter.hueShift(); }
    if(blurryOn) { Filter.blurry(); }
    if(invertOn) { Filter.invert(); }
  }

};
