// MAIN

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// INITS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function randomColorChange() {
    return '#'+(Math.floor(Math.random()*16777216)&0xFFFFFF).toString(16);
}

function randomizer(arrayName) {
  var randomArraySelector = arrayName[Math.floor(Math.random()*arrayName.length)];
  return randomArraySelector;
}

function numRan(ranNum) {
  var ranNumGen = Math.floor(Math.random()*ranNum);
  return ranNumGen;
}

function killSwitch() {
  localStorage.setItem('killSwitch','unkilled');
  console.log('GifJay KILL SWITCH SUCCESSFUL');
  stageSetup();
  $(s1).add(s2).addClass('on');
  stageOneOn, stageTwoOn = 1;
  $(s1).css('background', bankLocation + localStorage.getItem('stg1Bank') + '/' + localStorage.getItem('stg1Gif') + bgCenter);
  $(s2).css('background', bankLocation + localStorage.getItem('stg2Bank') + '/' + localStorage.getItem('stg2Gif') + bgCenter);
  $(s1).css('background-repeat', localStorage.getItem('stg1Repeat'));
  $(s2).css('background-repeat', localStorage.getItem('stg2Repeat'));
  $(s1).css('background-size', localStorage.getItem('stg1Size'));
  $(s2).css('background-size', localStorage.getItem('stg2Size'));
  $(s1).css('mix-blend-mode', localStorage.getItem('stg1Blend'));
  $(s2).css('mix-blend-mode', localStorage.getItem('stg2Blend'));
  $(s2).addClass('blend');
}

function startup() {
  banks.bank.forEach(function(gleep) {
    if (gleep.enabled) {
      banksInUse.push(gleep.id);
    }
  });

  bankNumber = randomizer(banksInUse);
  console.log('BANK NUMBER: ' + bankNumber);

  if(localStorage.getItem('killSwitch') == 'killed') {
    killSwitch();
  } else {
    console.log('GifJay ' + version + ' Starting Up');
    $('<div class="logo"><img src="guts/img/gifjay_logo_white_small.png"></div>').appendTo('body');
    $('.logo img').delay(500).fadeIn('slow').delay(1500).fadeOut('slow', function() { titlePage();  });
  }
}

function titlePage() {

  console.log('TITLE PAGE: ' + titlePageOn);

  if(!titlePageOn) {
    console.log('NO TITLE PAGE');
    return;
  } else {
    console.log('TITLE PAGE COMING ON');
    $('<div class="title-page"></div>').css('background-image','url(titles/' + titlePageName + ')').appendTo('body').fadeIn('slow');
  }

}

function stageSetup() {
  console.log('Stage 1 + 2 Setup');

  banks.bank.forEach(function(gleep) {
    if (gleep.enabled) {
      banksInUse.push(gleep.id);
    }
  });
  console.log("BANKS IN USE: " + banksInUse);

  if(giy) {
    console.log('BANK NUMBER : ' + bankNumber);
    console.log('Setting up for GIY');

    if(!bankNumber) {
      console.log('GIY: RANDOM BANKS');
      bankSelectorS1 = randomizer(banksInUse);
      bankSelectorS2 = randomizer(banksInUse);
      sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);

    } else {
      console.log('GIY: BANK NUMBER');
      bankSelectorS1 = bankNumber;
      bankSelectorS2 = bankNumber;
      sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
    }

  } else {
    bankSelectorS1 = randomizer(banksInUse);
    bankSelectorS2 = randomizer(banksInUse);
    sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
  }

    stageParameters();
    console.log('bankSelectorS1: ' + bankSelectorS1);
    console.log('bankSelectorS2: ' + bankSelectorS2);

}

function stageParameters() {
  $(s1).attr({stage:1,bank:bankSelectorS1, location:gifSelectorS1.location, gif:gifSelectorS1.gif,repeat:$(s1).
    css('background-repeat'),size:$(s1).css('background-size'),blend:$(s1).css('mix-blend-mode')});
  $(s2).attr({stage:2,bank:bankSelectorS2, location:gifSelectorS2.location, gif:gifSelectorS2.gif,repeat:$(s2).
    css('background-repeat'),size:$(s2).css('background-size'),blend:$(s2).css('mix-blend-mode')});
}

function screenFullscreen() {
  console.log('SCENE FULLSCREEN');
  $(s1).css(sf);
  $(s2).css(sf);
}

function setGPS() {
  console.log('GPS SET');
  var d = new Date();
  var t = d.getTime();
  beatTime = t - lastClick;
  lastClick = t;
  console.log('GPS: ' + beatTime)
}

/*
*********************************************
**  M A I N  R O B O M O D E  E N G I N E  **
*********************************************
*/

function sceneSetter(arrayName, banker1, banker2) {

  // Setting up for random GIFs
  // choose 2 random banks
  bankSelectorS1 = banker1;
  bankSelectorS2 = banker2;
  bankBuilderS1 = [];
  bankBuilderS2 = [];

  if (setOn) {
    if(bankerOn) {
      console.log('NO NO BANKERS HERE');
      Mousetrap.trigger('\'');
      return false;
    }

    arrayName.forEach(function(element, index) {
      bankBuilderS1.push({
        gif: element.name,
        location: element.location,
      });
    });

    arrayName.forEach(function(element, index) {
      bankBuilderS2.push({
        gif: element.name,
        location: element.location,
      });
    });

    if (sceneFullscreenOn) { screenFullscreen(); }

  } else {

  banks.bank[bankSelectorS1].gifs.forEach(function(element) {
    bankBuilderS1.push({
      gif: element.name,
      location: element.location,
      type: element.type
    });
  });

  banks.bank[bankSelectorS2].gifs.forEach(function(element) {
    bankBuilderS2.push({
      gif: element.name,
      location: element.location,
      type: element.type
    });
  });

}

  // Selecting 2 random gifs
  gifSelectorS1 = randomizer(bankBuilderS1);
  gifSelectorS2 = randomizer(bankBuilderS2);

  if (blendModeRandomOn) {
    $(s2).css('mix-blend-mode', blendModeSwitcherArray[numRan(blendModeSwitcherArray.length)]);
  }

  if (currentPlayMode == 'sampler') {
    console.log('You should definitely be switching to Sampler by now!!');
    currentPlayMode = "sampler";
  }

  if (currentPlayMode != 'robomode') {

        if (sceneFullscreenOn) { screenFullscreen(); }

        // CHECKING FOR SCENE PAUSE
        if (scenePauseOn) {
          gifSelectorS1 = pausedStg1;
          gifSelectorS2 = pausedStg2;
          bankSelectorS1 = pausedBankStg1;
          bankSelectorS2 = pausedBankStg2;
        }

        // CHECKING FOR BANKER
        if (bankerOn) {
          if (sceneFullscreenOn) { screenFullscreen(); }
        }

        if (gifSelectorS1.gif === gifSelectorS2.gif) {
          console.log("WE'VE GOT A DUPE!!!");
          $(s1).css('background', bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter);
          $(s2).css('background', bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter);
          $(s1).css('background-repeat', 'repeat');
          $(s2).css('background-repeat', 'no-repeat');
          $(s2).css('background-size', 'cover');
          return false;
        }

        // SET THE SCENE
        // $(s1).css({'background':bankLocation + gifSelectorS1.location + gifSelectorS1.name + bgCenter });
        // $(s2).css({'background':bankLocation + gifSelectorS2.location + gifSelectorS2.name + bgCenter });
        // $(s1).css(this[randomizer(stageArray)]);
        // $(s2).css(this[randomizer(stageArray)]);
        // $(s2).css('opacity', '1');

        // This setups up before RoboMode
        $(stgSelect).css('background', bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter);
        $(stgNotSelected).css('background', bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter);
        $(stgNotSelected).css(this[randomizer(stageArray)]);
        $(stgSelect).css(this[randomizer(stageArray)]);

        if (sceneFullscreenOn) { screenFullscreen(); }

  } else {

        if (scenePauseOn) {
          gifSelectorS1 = pausedStg1;
          gifSelectorS2 = pausedStg2;
          bankSelectorS1 = pausedBankStg1;
          bankSelectorS2 = pausedBankStg2;
        }

        if (setOn) {
          gifSelectorS1 = randomizer(bankerSetStorage.scenes);
          gifSelectorS2 = randomizer(bankerSetStorage.scenes);
          console.log('SET ON 2 IN SCENE SETTER');
        }

        // SET THE SCENE
        $(s1).css({'background':bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter });
        $(s2).css({'background':bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter });
        $(s1).css(this[randomizer(stageArray)]);
        $(s2).css(this[randomizer(stageArray)]);
        // $(s2).css('opacity', '1');

        if (sceneFullscreenOn) { screenFullscreen(); }

  }

  currentScene.stage[0].bank = bankSelectorS1;
  currentScene.stage[1].bank = bankSelectorS2;
  currentScene.stage[0].location = gifSelectorS1.location;
  currentScene.stage[1].location = gifSelectorS2.location;
  currentScene.stage[0].name = gifSelectorS1.gif;
  currentScene.stage[1].name = gifSelectorS2.gif;
  currentScene.stage[0].blendMode = $(s1).css('mix-blend-mode');
  currentScene.stage[1].blendMode = $(s2).css('mix-blend-mode');
  currentScene.stage[0].filter = $(s1).css('filter');
  currentScene.stage[1].filter = $(s2).css('filter');

  Effects.fxChecker();

}

function playMode(playType) {

  switch(playType) {

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-

    // Banker
    case 'banker':
      console.log('PLAY MODE: Banker');
      currentPlayMode = 'banker';

      if (samplerOn) {
        playMode('sampler');
      } else {
        // if (stgSelect == s1 || s2) { bankSelectorS1 = randomizer(bankerArray); bankSelectorS2 = randomizer(bankerArray); }
        // if (stgSelect == "all") { bankSelectorS1 = randomizer(bankerArray); bankSelectorS2 = randomizer(bankerArray); }
        bankSelectorS1 = randomizer(bankerArray); bankSelectorS2 = randomizer(bankerArray);
        sceneSetter(bankerArray, bankSelectorS1, bankSelectorS2);
      }

      break;

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-

    // Sets
    case 'sets':
      console.log('PLAY MODE: Sets');
      currentPlayMode = 'sets';
      bankSelectorS1 = setBank; bankSelectorS2 = setBank;
      // sceneSetter(setArray,bankSelectorS1,bankSelectorS2);
      sceneSetter(singleBankerSet, bankSelectorS1, bankSelectorS2);
      break;

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-

    // SEQUENCER
    case 'sequencer':
      console.log('PLAY MODE: Sequencer');
      currentPlayMode = 'sequencer';

      if (sequenceNumber == sequencer.sequences[letterNumber].trigger ) {
        console.log('ITS A MATCH!!');

        var seqNum = sequencer.sequences[letterNumber].scenes.length;
        var someGif = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.gif;
        var someBank = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.bank;
        var someLocation = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.location;
        var someGif2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.gif;
        var someBank2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.bank;
        var someLocation2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.location;
        var someParam = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.parameters.repeat;
        var someParam2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.parameters.repeat;
        var someFX = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.parameters.fx;
        var someFX2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.parameters.fx;

        ++curSequencerIndex;

        if (kaleidoscopeOn) {

          $(s1 + '.kaleidoscope > div').css('background', bankLocation + someBank +
            someLocation + someGif + bgCenter);
          $(s2 + '.kaleidoscope > div').css('background', bankLocation + someBank2 +
            someLocation2 + someGif2 + bgCenter);

        } else {

          $(s1).css('background', bankLocation + someBank + someLocation + someGif + bgCenter);
          if(someParam == 'no-repeat') { $(s1).css(sf); } else { $(s1).css(st); }
          $(s2).css('background', bankLocation + someBank2 + someLocation2 + someGif2 + bgCenter);
          if(someParam2 == 'no-repeat') { $(s2).css(sf); } else { $(s2).css(st); }

        }

        if (curSequencerIndex == (seqNum)) {
          curSequencerIndex = 0
        }
      }

      break;

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-

    // SAMPLER LOVE
    case 'sampler':
      console.log('PLAY MODE: Sampler');
      currentPlayMode = 'sampler';

      if (scenePauseOn) {
        samplerIndex = pausedSamplerIndex;

      } else {

        if (sampledScenes.scene.length === 0) {
          console.log('SWITCH TO ANOTHER MODE');
          Mousetrap.trigger('alt+;');
          return false;
        }

        if (samplerIndex == (sampledScenes.scene.length - 1)) { samplerIndex = -1; }
        ++samplerIndex;
      }

      console.log("samplerIndex : " + samplerIndex);
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
        $(s2 + '.kaleidoscope').css('mix-blend-mode', randomizer(blendModeArray));
        $(s1 + '.kaleidoscope > div').add(s2 + '.kaleidoscope > div').css(sf);

      } else {

        $(s1).css({
            'background' : bankLocation + smpldScn.stages[0].location + smpldScn.stages[0].gif + bgCenter,
            'background-repeat' : smpldScn.stages[0].repeat,
            'background-size' : smpldScn.stages[0].size,
            'mix-blend-mode' : smpldScn.stages[0].blend
          });

          $(s2).css({
              'background' : bankLocation + smpldScn.stages[1].location + smpldScn.stages[1].gif + bgCenter,
              'background-repeat' : smpldScn.stages[1].repeat,
              'background-size' : smpldScn.stages[1].size,
              'mix-blend-mode' : smpldScn.stages[1].blend
            });

        if (sceneFullscreenOn) { screenFullscreen(); }

      }

      break;

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-

    default:
      console.log('PLAY MODE: RoboMode');
      currentPlayMode = 'robomode';
      bankSelectorS1 = randomizer(banksInUse);
      bankSelectorS2 = randomizer(banksInUse);
      sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
    }
}

// ROBOMODE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function stageFlip() {
  console.log('CURRENT PLAY MODE: ' + currentPlayMode);
  if (bankerOn) {
    bankSelectorS1 = randomizer(bankerArray); bankSelectorS2 = randomizer(bankerArray);
    sceneSetter(bankerArray,bankSelectorS1,bankSelectorS2);

  } else if (setOn) {
    // setBank = bankerSets.set[i].bank;
    console.log('AHH YEAH< YOU MADE IT');
    console.log('SET BANK: ' + setBank);
    console.log('SET BANK1: ' + bankSelectorS1);
    console.log('SET BANK2: ' + bankSelectorS2);

    // bankSelectorS1 = bankNumber; bankSelectorS2 = bankNumber;
    sceneSetter(setsArray,bankSelectorS1,bankSelectorS2);

  } else if (bankNumber) {

    bankSelectorS1 = bankNumber; bankSelectorS2 = bankNumber;
    sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);

  } else {
    bankSelectorS1 = randomizer(banksInUse); bankSelectorS2 = randomizer(banksInUse);
    sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
  }

  stageParameters();

}

function startRobomode() {

  $('body').css('background-image', 'repeating-linear-gradient(' + numRan(360) + 'deg, ' +
    randomColorChange() + ' ' + numRan(100) + '%, ' +
    randomColorChange() + ' ' + numRan(100) + '%, ' +
    randomColorChange() + ' ' + numRan(100)+ '%)');

// CHECKING PLAY MODE
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  if (bankerOn) {
    playMode('banker');

  } else if (samplerOn) {
    playMode('sampler');

  } else if (sequencerOn) {
    playMode('sequencer');

  } else if (setOn) {
    playMode('sets');

  } else {
    playMode('default');

  }
  stageParameters();

// CHECKING FOR FX & FILTERS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  if(stgFadeOn) { Effects.stgFade(); }
  if(saturateOn) { Filter.saturator(); }
  if(sameSameOn) { Effects.sameSame(); }
  if(hueShiftOn) { Filter.hueShift(); }
  if(blurryOn) { Filter.blurry(); }
  if(invertOn) { Filter.invert(); }

  // add asset info to data-type attributes
  stageParameters();

}
// END OF ROBOMODE

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function stopRobomode() {
  clearInterval(gpsTimer);
  robomodeOn = 0;
  console.log('RoboMode OFF');
}

function clearBeatTime() {
  clearInterval(gpsTimer);
  gpsTimer = setInterval(function() {
    startRobomode(beatTime);
  }, beatTime);
}

// SCREENSAVER
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function roboScreen() {
  console.log('INITIATING SCREENSAVER FUNCTION');
  Mousetrap.trigger('space');
  stageOneOn = 1;
  $(s1).addClass('on');
  $(s1).removeClass('off');
  stageTwoOn = 1;
  $(s2).addClass('on');
  $(s2).removeClass('off');
  $(s2).toggleClass('blend');
  robomodeOn = 1;
  startRobomode(beatTime);
  clearBeatTime();
}
