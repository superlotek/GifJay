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
    robomodeBackground();
    if (bankerOn) { playMode('banker');
      } else if (samplerOn) { playMode('sampler');
      } else if (sequencerOn) { playMode('sequencer');
      } else if (setOn) { playMode('sets');
      } else { playMode('default');
    }
    
    if(stgFadeOn) { Effects.stgFade(); }
    if(sameSameOn) { Effects.sameSame(); }

    if(filters.filter[0].on) { Filter.genericFilter(0); }
    if(filters.filter[1].on) { Filter.genericFilter(1); }
    if(filters.filter[2].on) { Filter.genericFilter(2); }
    if(filters.filter[3].on) { Filter.genericFilter(3); }
  },

  stageFlip() {
    // console.log('CURRENT PLAY MODE: ' + currentPlayMode);
    if (bankerStageSetupOn) {
      console.log('BANKER STAGE FLIP');
      bankSelectorS1 = randomizer(bankerStageArrayS1); bankSelectorS2 = randomizer(bankerStageArrayS2);
      sceneSetter(bankerArray,bankSelectorS1,bankSelectorS2);
      return;
    } else if (bankerOn) {

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
