// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** PLAY ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

var beatClick = 0;

const Play = {


  setGPS() {
    console.log('GPS: SET');
    var d = new Date();
    var t = d.getTime();
    beatTime = t - lastClick;
    lastClick = t;
    beatClick++

    console.log('lastClick: ' + lastClick);

    if (beatTime < beatTimeMinimum) {
      console.log('GPS TOO LOW');
      beatTime = beatTimeMinimum;
    }

    if (beatClick === 2) {
      console.log('final click');
      beatClick = 0;
      window.opener.$('.gps-data').html(window.opener.convertBeatTime(beatTime));
    } else {
      window.opener.$('.gps-data').html('...');
    }

    console.log('GPS: ' + beatTime, "\n---------------------------------");
    // var converto = beatTime / 1000;
    // gleep = window.opener.convertBeatTime(beatTime);
    // window.opener.$('.gps-data').text(window.opener.convertBeatTime(beatTime));
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
    Init.robomodeBackground();
    if (bankerOn) { this.playMode('banker');
      } else if (samplerOn) { this.playMode('sampler');
      } else if (sequencerOn) { this.playMode('sequencer');
      } else if (setOn) { this.playMode('sets');
      } else { this.playMode('default');
    }

    if(barTenderOn && scenePauseOn) { Effects.barTender(); console.log('right here') }
    if(mutatorOn) { Effects.mutator(); }
    if(stgFadeOn) { Effects.stgFade(); }
    if(sameSameOn) { Effects.sameSame(); }

    for (i=0; i < filters.filter.length; i++) {
      if(filters.filter[i].on) { Filter.applyFilter(i); }
    }
  },

  stageFlip() {
    // console.log('CURRENT PLAY MODE: ' + currentPlayMode);

    Filter.colorPalette();

    if (bankerStageSetupOn) {

      console.log('BANKER STAGE FLIP');
      bankSelectorS1 = Init.randomizer(bankerStageArrayS1); bankSelectorS2 = Init.randomizer(bankerStageArrayS2);
      sceneSetter(bankerArray,bankSelectorS1,bankSelectorS2);
      return;

    } else if (bankerOn) {

      bankSelectorS1 = Init.randomizer(bankerArray); bankSelectorS2 = Init.randomizer(bankerArray);
      sceneSetter(bankerArray,bankSelectorS1,bankSelectorS2);

    } else if (sequencerOn) {

      console.log('STAGEFLIP: SEQUENCER');
      seqNum = selectedSequence.scene.length;

      $(s1).css('background', bankLocation + selectedSequence.scene[curSequencerIndex].gifs[0].location + selectedSequence.scene[curSequencerIndex].gifs[0].name + bgCenter);
      $(s2).css('background', bankLocation + selectedSequence.scene[curSequencerIndex].gifs[1].location + selectedSequence.scene[curSequencerIndex].gifs[1].name + bgCenter);
      ++curSequencerIndex;
      if (curSequencerIndex == (seqNum)) {
        curSequencerIndex = 0
      }


    } else if (setOn) {

      // console.log('SET BANK: ' + setBank.toUpperCase);
      // console.log('SET BANK1: ' + bankSelectorS1);
      // console.log('SET BANK2: ' + bankSelectorS2);
      sceneSetter(setArray,bankSelectorS1,bankSelectorS2);

    } else if (bankNumber) {

      bankSelectorS1 = bankNumber; bankSelectorS2 = bankNumber;
      sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);

    } else {
      bankSelectorS1 = bankNumber; bankSelectorS2 = bankNumber;
      // bankSelectorS1 = randomizer(banksInUse); bankSelectorS2 = randomizer(banksInUse);
      sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
    }
  },

  playMode(playType) {

  switch(playType) {

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-

    // Banker
    case 'banker':
      currentPlayMode = 'banker';

      if (samplerOn) {
        this.playMode('sampler');
      } else {

        if (bankerStageArrayS1.length && bankerStageArrayS2.length) {
          bankSelectorS1 = Init.randomizer(bankerStageArrayS1); bankSelectorS2 = Init.randomizer(bankerStageArrayS2);
          sceneSetter(bankerArray, bankSelectorS1, bankSelectorS2);
          return;
        }

        if (bankerStageArrayS1.length) {
          bankSelectorS1 = Init.randomizer(bankerStageArrayS1);
          sceneSetter(bankerArray, bankSelectorS1, bankSelectorS2);
          return;
        }

        if (bankerStageArrayS2.length) {
          bankSelectorS2 = Init.randomizer(bankerStageArrayS2);
          sceneSetter(bankerArray, bankSelectorS1, bankSelectorS2);
          return;
        }

        bankSelectorS1 = Init.randomizer(bankerArray); bankSelectorS2 = Init.randomizer(bankerArray);
        sceneSetter(bankerArray, bankSelectorS1, bankSelectorS2);
      }

      Filter.colorPalette();

      break;

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-

    // Sets
    case 'sets':
      // console.log('PLAY MODE: Sets');
      currentPlayMode = 'sets';
      // bankSelectorS1 = setBank; bankSelectorS2 = setBank;
      sceneSetter(setArray,bankSelectorS1,bankSelectorS2);
      // sceneSetter(singleBankerSet, bankSelectorS1, bankSelectorS2);
      break;

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-

    // SEQUENCER
    case 'sequencer':
      // console.log('PLAY MODE: Sequencer');
      currentPlayMode = 'sequencer';

      console.log('CHECKING FOR SEQUENCED BANKS');
      // console.log(letterNumber);
      console.log("selectedSequence", selectedSequence);
      seqNum = selectedSequence.scene.length;
      console.log('curSequencerIndex', curSequencerIndex);
      console.log(seqNum);

      if (randomOn) {
        rando = Init.numRan(seqNum);
        console.log("rando", rando);
        $(s1).css('background', bankLocation + selectedSequence.scene[rando].gifs[0].location + selectedSequence.scene[rando].gifs[0].name + bgCenter);
        $(s2).css('background', bankLocation + selectedSequence.scene[rando].gifs[1].location + selectedSequence.scene[rando].gifs[1].name + bgCenter);
        return;
      }

        if (scenePauseOn) {
          // gifSelectorS1 = pausedStg1;
          // gifSelectorS2 = pausedStg2;
          // bankSelectorS1 = pausedBankStg1;
          // bankSelectorS2 = pausedBankStg2;
          return;
        }


      $(s1).css('background', bankLocation + selectedSequence.scene[curSequencerIndex].gifs[0].location + selectedSequence.scene[curSequencerIndex].gifs[0].name + bgCenter);
      $(s2).css('background', bankLocation + selectedSequence.scene[curSequencerIndex].gifs[1].location + selectedSequence.scene[curSequencerIndex].gifs[1].name + bgCenter);
      // vleep = Init.randomizer(stageArray);
      // console.log(vleep);
      $(s1).css(Init.randomizer(stageArray));
      $(s2).css(Init.randomizer(stageArray));

      ++curSequencerIndex;

      if (curSequencerIndex == (seqNum)) {
        curSequencerIndex = 0
      }


      if (sceneFullscreenOn) { Scene.screenFullscreen(); }

      break;

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-

    // SAMPLER
    case 'sampler':
      // console.log('PLAY MODE: Sampler');
      currentPlayMode = 'sampler';

      if (scenePauseOn) {
        samplerIndex = pausedSamplerIndex;

      } else {

        if (sampledScenes.scene.length === 0) {
          console.log('SWITCH TO ANOTHER MODE');
          Mousetrap.trigger(':');
          return false;
        }

        if (samplerIndex == (sampledScenes.scene.length - 1)) { samplerIndex = -1; }
        ++samplerIndex;
      }

      if (blendModeRandomOn) {
        // need to find way to add Blend Mode
      }

      if (randomOn) {
        console.log('RANDOM ON???');
        samplerIndex = Init.numRan(sampledScenes.scene.length);
      } else {
        smpldScn = sampledScenes.scene[samplerIndex];
      }

      smpldScn = sampledScenes.scene[samplerIndex];

      if (kaleidoscopeOn) {

        $(s1 + '.kaleidoscope > div').css({
          'background' : bankLocation + smpldScn.stages[0].location + smpldScn.stages[0].gif + bgCenter,
          'background-repeat' : smpldScn.stages[0].repeat,
          'background-size' : smpldScn.stages[0].size
        });
        $(s2 + '.kaleidoscope > div').css({
          'background' : bankLocation + smpldScn.stages[1].location + smpldScn.stages[1].gif + bgCenter,
          'background-repeat' : smpldScn.stages[1].repeat,
          'background-size' : smpldScn.stages[1].size
        });
        $(s2).css('background', 'none !important');
        $(s2 + '.kaleidoscope').css('mix-blend-mode', Init.randomizer(appz.blendModeArray));
        $(s1 + '.kaleidoscope > div').add(s2 + '.kaleidoscope > div').css(sf);

      } else {

        $(s1).css({
            'background' : bankLocation + smpldScn.stages[0].location + smpldScn.stages[0].gif + bgCenter,
            'background-repeat' : smpldScn.stages[0].repeat,
            'background-size' : smpldScn.stages[0].size,
            'mix-blend-mode' : smpldScn.stages[0].blend,
             "filter" : smpldScn.stages[0].filter
          });

          $(s2).css({
              'background' : bankLocation + smpldScn.stages[1].location + smpldScn.stages[1].gif + bgCenter,
              'background-repeat' : smpldScn.stages[1].repeat,
              'background-size' : smpldScn.stages[1].size,
              'mix-blend-mode' : smpldScn.stages[1].blend,
              "filter" : smpldScn.stages[1].filter
            });

        if (sceneFullscreenOn) { Scene.screenFullscreen(); }

      }

      break;

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-

    default:
      // console.log('PLAY MODE: RoboMode');

      Filter.colorPalette();

      currentPlayMode = 'robomode';
      bankSelectorS1 = bankNumber;
      bankSelectorS2 = bankNumber;
      // bankSelectorS1 = Init.randomizer(banksInUse);
      // bankSelectorS2 = Init.randomizer(banksInUse);
      sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
    }
}


};
