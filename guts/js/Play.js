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
    // $('body').css('background-image', 'repeating-linear-gradient(' + numRan(360) + 'deg, ' +
    //   randomColorChange() + ' ' + numRan(100) + '%, ' +
    //   randomColorChange() + ' ' + numRan(100) + '%, ' +
    //   randomColorChange() + ' ' + numRan(100)+ '%)');
    robomodeBackground();
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
  },

  stageFlip() {
    // console.log('CURRENT PLAY MODE: ' + currentPlayMode);
    if (bankerOn) {
      bankSelectorS1 = randomizer(bankerArray); bankSelectorS2 = randomizer(bankerArray);
      sceneSetter(bankerArray,bankSelectorS1,bankSelectorS2);
    } else if (setOn) {
      console.log('SET BANK: ' + setBank.toUpperCase);
      console.log('SET BANK1: ' + bankSelectorS1);
      console.log('SET BANK2: ' + bankSelectorS2);
      sceneSetter(setsArray,bankSelectorS1,bankSelectorS2);
    } else if (bankNumber) {
      bankSelectorS1 = bankNumber; bankSelectorS2 = bankNumber;
      sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
    } else {
      bankSelectorS1 = randomizer(banksInUse); bankSelectorS2 = randomizer(banksInUse);
      sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
    }
  }

};
