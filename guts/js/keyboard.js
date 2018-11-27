// keyboard

// used for Cursor Key FX
// maybe find alternative to this, Mousetrap should work, right?
kd.run(function () { kd.tick(); });

$(document).ready(function() {

  // $('body').css('background-color', randomColorChange());

    startup();

    $('.logo a').click(function() {
      $(this).fadeOut(function() {
        $('.logo').remove();
        Scene.stageSetup();
      });
    });

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // KEY INPUT (Mousetrap.js) https://craig.is/killing/mice
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // *** SCREENSAVER ***
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // *** BANK & FX SELECTOR ***
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // FX MODE [ ` ]
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("`", function() {
    if (sampledFilterOn == 1) {
      console.log('SAMPLED FILTER: APPLIED', "\n---------------------------------");
      $(stgSelect).css('filter', sampledFilter);
      if (stgSelect == 'all') {
        $(s1).css('filter', sampledFilter);
        $(s2).css('filter', sampledFilter);
      } else {
        $(stgSelect).css('filter', sampledFilter);
      }
    }
  });

  Mousetrap.bind("~", function() {
    console.log('FILTERS: CLEARED');
    if (stgSelect == 'all') {
      $(s1).add(s2).css('-webkit-filter', 'none');
    } else {
      $(stgSelect).css('-webkit-filter', 'none');
    }
    filtersOnString = "";
    filtersOn = [];
    saturateOn = 0; hueShiftOn = 0; blurryOn = 0; invertOn = 0;
  });

  // function findEffectInArray(element) {
  //   return element.effect === effectName;
  // }

  // Kaleidoscope
  if(app.settings.effects.kaleidoscope.enabled) {
    Mousetrap.bind(app.settings.effects.kaleidoscope.filterKey, function() {
      if(!kaleidoscopeOn) {
        console.log(appFX.kaleidoscope.name + ': ON');
        kaleidoscopeOn = 1;
        Effects.buildKaleidoscope();
        Effects.fxChecker();
      } else {
        kaleidoscopeOn = 0;
        console.log('REMOVING KALEIDOSCOPE: ' + stgSelect);
        $(s1).add(s2)
          .removeClass(app.settings.effects.kaleidoscope.name);
        $(s1 + ' > div').add(s2 + ' > div')
          .detach().css('mix-blend-mode','normal');
          $(s2).css('mix-blend-mode','');
      }
    });
  }

  /* SameSame */
  if(app.settings.effects.sameSame.enabled) {
    Mousetrap.bind(app.settings.effects.sameSame.filterKey, function() {
      if(!sameSameOn) {
        sameSameOn = 1;
        console.log('FX: SAMESAME ON');
        Effects.sameSame();
        $(s2).addClass('same-same');
      } else {
        console.log('FX: SAMESAME OFF');
        sameSameOn = 0;
        $(s2).removeClass('same-same');
      }
    });
  }

  // STG FADE
  if(app.settings.effects.stgFade.enabled) {
    Mousetrap.bind(app.settings.effects.stgFade.filterKey, function() {
      if(!stgFadeOn) {
      console.log('FX: FADER ON');
      stgFadeOn = 1;
      } else {
      console.log('FX: FADER OFF');
      stgFadeOn = 0;

      }
    });
  }

  /* Invert */
  if(app.settings.effects.invert.enabled) {
    Mousetrap.bind(app.settings.effects.invert.filterKey, function() {
      if(!invertOn) {
        invertOn = 1;
        console.log('FX: INVERT ON');
        Filter.invert();
      } else {
        console.log('FX: INVERT OFF');
        invertOn = 0;
        $(s1).add(s2).css('-webkit-filter', 'none');
        filtersOn[3] = "";
        filtersOnString = "";
        filtersOn.forEach(function(element) {
          filtersOnString += element + " ";
        });
      }
    });
  }

  // FILTERS

  // SATURATE
  if(app.settings.effects.saturator.enabled) {
    Mousetrap.bind(app.settings.effects.saturator.filterKey, function() {
      if(!saturateOn) {
        saturateOn = 1;
        console.log('FX: SATURATE ON');
        Filter.saturator();
      } else {
        console.log('FX: SATURATE OFF');
        saturateOn = 0;
        $(s1).add(s2).css('-webkit-filter', 'none');
        filtersOn[0] = "";
        filtersOnString = "";
        filtersOn.forEach(function(element) {
          filtersOnString += element + " ";
        });
      }
    });
  }

  /* HueShift */
  if(app.settings.effects.hueShift.enabled) {
    Mousetrap.bind(app.settings.effects.hueShift.filterKey, function() {
    if(!hueShiftOn) {
      hueShiftOn = 1;
      console.log('FX: HUESHIFT ON');
      Filter.hueShift();
    } else {
      console.log('FX: HUESHIFT OFF');
      hueShiftOn = 0;
      $(s1).add(s2).css('-webkit-filter', 'none');
      filtersOn[1] = "";
      filtersOnString = "";
      filtersOn.forEach(function(element) {
        filtersOnString += element + " ";
      });
    }
  });
}

  /* Blurry */
  if(app.settings.effects.blurry.enabled) {
    Mousetrap.bind(app.settings.effects.blurry.filterKey, function() {
    if(!blurryOn) {
      blurryOn = 1;
      console.log('FX: BLURRY ON');
      Filter.blurry();
    } else {
      console.log('FX: BLURRY OFF');
      blurryOn = 0;
      $(s1).add(s2).css('-webkit-filter', 'none');
      filtersOn[2] = "";
      filtersOnString = "";
      filtersOn.forEach(function(element) {
        filtersOnString += element + " ";
      });
    }
  });
}

// BLEND MODES SWITCHER
Mousetrap.bind('alt+,', function() {
  if(!blendModesOn) {
  console.log('BLEND MODES: ON');
  blendModesOn = !blendModesOn;
  Filter.blendModeSwitcher(0);

  if (blendModeRandomOn) {
    blendModeRandomOn = !blendModeRandomOn;
    console.log('RANDOM BLEND MODE: OFF');
    $(s2).css('mix-blend-mode', 'screen');
  }

  } else {
    console.log('BLEND MODES: OFF');
  blendModesOn = !blendModesOn;
  $(s2).css('mix-blend-mode', 'screen');
  blendCounter = null;
  }
});

// BLEND MODES SWITCHER CYCLE
Mousetrap.bind('alt+.', function() {
  if(blendModesOn) {
    // blendCounter++;
    Filter.blendModeSwitcher(blendCounter++);
  }
});

// BLEND MODES SWITCHER RANDOM
Mousetrap.bind('alt+/', function() {
  if (!blendModeRandomOn) {
    blendModeRandomOn = 1;
    console.log('RANDOM BLEND MODE: ON', "\n---------------------------------");
  } else {
    blendModeRandomOn = 0;
    console.log('RANDOM BLEND MODE: OFF', "\n---------------------------------");
    $(s2).css('mix-blend-mode', 'screen');
  }
});

// FILTER SAMPLE [ SHIFT ] [ RETURN ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Mousetrap.bind('shift+return', function() {
  console.log('FILTERS: SAMPLED');
  sampledFilterOn = 1;
  sampledFilter = "";
  sampledFilter = $(s1).css('filter');
  console.log('FILTERS SAMPLED: ' + sampledFilter);
});


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** STAGE PARAMETERS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// STAGE SELECT [ - ] [ = ] [ DEL ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("-", function() {
    console.log('STG1 SELECTED');
    stgSelect = s1;
    stgNotSelected = s2;
  });

  Mousetrap.bind("=", function() {
    console.log('STG2 SELECTED');
    stgSelect = s2;
    stgNotSelected = s1;
  });

  Mousetrap.bind("backspace", function() {
    console.log('All STG 1+2 SELECTED');
    stgSelect = "all";
  });

// STAGE ON/OFF [ SHIFT ] + [ - ], [ = ], [ DEL ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // QUICK SETUP / STG1+STG2+BLEND+STAGEFLIP
  Mousetrap.bind("alt+backspace", function() {
    console.log('QUICKSTART');
    Mousetrap.trigger('_');
    Mousetrap.trigger('+');
    Mousetrap.trigger('shift+backspace');
    Mousetrap.trigger('space');
  });

  // STAGE 1 ON [ SHIFT ] + [ - ]
  Mousetrap.bind("_", function() {
    console.log('STAGE 1 : ON');
    if(!stageOneOn) {
      stageOneOn = 1;
      $(s1).addClass('on');
      $(s1).removeClass('off');
    } else {
      stageOneOn = 0;
      $(s1).addClass('off');
      $(s1).removeClass('on');
      console.log('STAGE 1 : OFF');
    }
  });

  // STAGE 2 ON [ SHIFT ] + [ = ]
  Mousetrap.bind("+", function() {
    console.log('STAGE 2 : ON');
    if(!stageTwoOn) {
      stageTwoOn = 1;
      $(s2).addClass('on').removeClass('off');
    } else {
      stageTwoOn = 0;
      $(s2).addClass('off').removeClass('on');
      console.log('STAGE 2 : OFF');
    }
  });

  // STAGE 1 + 2 BLEND [ SHIFT ] + [ DEL ]
  Mousetrap.bind("shift+backspace", function() {
    $(s2).toggleClass('blend');
    console.log('S2 Blend to S1');
  });

// STAGE OPACITY [ ALT ] + [ - ], [ = ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // OPACITY OUT SELECTED STAGE [ ALT ] + [ - ]
  Mousetrap.bind("alt+-", function() {
    opacity2 = opacity2 - .1;
    $(stgSelect).css('opacity',opacity2);
    if (opacity2 <= 0) { opacity2 = 0; return; }
  });

  // OPACITY IN SELECTED STAGE [ ALT ] + [ - ]
  Mousetrap.bind("alt+=", function() {
    opacity2 = opacity2 + .1;
    $(stgSelect).css('opacity',opacity2);
    if (opacity2 >= 1) { opacity2 = 1; return; }
  });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** GRID SIZES & PAUSE ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// STAGE SIZE [ \ ], [ | ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// STAGE 1
  Mousetrap.bind("\\", function() {
    if($(s1).css('background-repeat') == 'repeat') {
      $(s1).css('background-repeat', 'no-repeat');
      $(s1).css(sf);
      console.log('something no-repeating');
    } else if($(s1).css('background-repeat') == 'no-repeat') {
      $(s1).css('background-repeat', 'repeat');
      $(s1).css(st);
      console.log('something repeating');
    }
  });

// STAGE 2
  Mousetrap.bind("|", function() {
    if($(s2).css('background-repeat') == 'repeat') {
      $(s2).css('background-repeat', 'no-repeat');
      $(s2).css(sf);
      console.log('something no-repeating');
    } else if($(s2).css('background-repeat') == 'no-repeat') {
      $(s2).css('background-repeat', 'repeat');
      $(s2).css(st);
      console.log('something repeating');
    }
  });

// SCENE FULLSCREEN [ [ ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("[", function() {

    if (!sceneFullscreenOn) {
      console.log("SCENE FULLSCREEN: ON", "\n---------------------------------");
      sceneFullscreenOn = 1;

      if (sceneFullscreenOn) { Scene.screenFullscreen(); }

    } else {
      console.log("SCENE FULLSCREEN: OFF", "\n---------------------------------");
      sceneFullscreenOn = 0;

      if (!sceneFullscreenOn) { $(s1).add(s2).css(st); }

    }

  });

// SCENE PAUSE [ ] ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("]", function() {

    // NEW STAGE PAUSE
    if(!scenePauseOn) {
        scenePauseOn = 1;
        console.log('SCENE PAUSE: ON');
        console.log('SAMPLER INDEX: ' + samplerIndex);
        pausedSamplerIndex = samplerIndex;
        console.log('PAUSED SAMPLER INDEX: ' + pausedSamplerIndex, "\n---------------------------------");
        pausedStg1 = gifSelectorS1;
        pausedStg2 = gifSelectorS2;
        pausedBankStg1 = bankSelectorS1;
        pausedBankStg2 = bankSelectorS2;

    } else {
        scenePauseOn = 0;

        if (samplerIndex == (sampledScenes.scene.length - 1)) {
          console.log('SOMTHING SHOULD FIX HERE FOR THE LAST CLIP');
          console.log('SAMPLER INDEX: ' + samplerIndex);
          samplerIndex = -1;
        } else {
          samplerIndex = pausedSamplerIndex;
          console.log('SAMPLER INDEX: ' + samplerIndex);
          console.log('UNPAUSED SAMPLER INDEX: ' + pausedSamplerIndex);
        }

        console.log('SCENE PAUSE: OFF');
        pausedStg1 = "";
        pausedStg2 = "";
        pausedBankStg1 = null;
        pausedBankStg2 = null;

    }

  });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** SEQUENCERS, BANKER & SETS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// BANKER ON/OFF/CLEAR [ ' ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("'", function() {

    if(!bankerOn) {
      console.log('BANKER: CREATING');
      initialStartUp = 0;
      bankerOn = 1;
      bankerArray = [];
    } else {
      console.log('BANKER: REMOVING');
      bankerOn = 0;
      bankerArray = [];
    }
  });

  // BANKER SETS ON/OFF [ ' ]
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  /*
  function search(nameKey, myArray){
      for (var i=0; i < myArray.length; i++) {
          if (myArray[i].name === nameKey) {
              return myArray[i];
          }
      }
  }
  var array = [
      { name:"string 1", value:"this", other: "that" },
      { name:"string 2", value:"this", other: "that" }
  ];
  var resultObject = search("string 1", array);
  */

    findEnabledBanks();

    /*
      this goes through the bank object and
      puts all the enabled banks into a new
      array called ** arr_enabledBanks **
    */
    function findEnabledBanks() {
      arr_enabledBanks = [];
      console.log('FIND ENABLED BANKS');
      bankAmount = banks.bank.length;
      console.log('TOTAL BANK AMOUNT: ' + bankAmount);
      banks.bank.forEach(function(element) {
        if (element.enabled === true) {
          arr_enabledBanks.push(element);
        }
      });
      console.log('ENABLED BANKS AMOUNT: ' + arr_enabledBanks.length, "\n---------------------------------");
      createTriggerArray(arr_enabledBanks);
    }

    /*
    this one takes an array parameter ENABLEDBANKS
    and filters out all the banker set key triggers
    into a new array **triggerArray**
    */
    function createTriggerArray(array) {
      alltriggerArray = new Set();
      console.log('CREATIING: BANKER SET KEY TRIGGER ARRAY', "\n---------------------------------");
      for (i = 0; i < array.length; i++) {
        for (j = 0; j < array[i].gifs.length; j++) {
          array[i].gifs[j].bank = array[i].id;
          // console.log('what is this?? ' + array[i].gifs[j].bank);
          alltriggerArray.add(array[i].gifs[j].set);
        }
      }
      triggerArray = [...alltriggerArray];
      bankerSetKeyTriggers(arr_enabledBanks);
    }

    // multiBankerSetObject = {};
    // multiBankerSetObject.multiBankerSetArray = []
    /* creates an array of all the gifs for
    the particular bank
    */
    function justMakeSoloKeyTrigger(key, array) {
      singleBankerSet = [];
      console.log('SOLO KEY MAKER');
      console.log('THI SIS THE ARRAY: '+ arr_enabledBanks[0].id);

      console.log('AND YOU CLICKED ' + key, "\n---------------------------------");
      for (i = 0; i < array.length; i++) {
        // console.log('ID or bank # ' + array[i].id);
        for (j = 0; j < array[i].gifs.length; j++) {
          // add gif bank number
          array[i].gifs[j].bank = arr_enabledBanks[0].id;
          if (array[i].gifs[j].set == key) {
            setBank = array[i].id;
            singleBankerSet.push(array[i].gifs[j]);
          }
        }

        // console.log('singleBankerSet: ' + singleBankerSet.length);
        // multiBankerSetObject.multiBankerSetArray.push(singleBankerSet);

      }

      if(!setOn) {
        // setBank = singleBankerSet;
        console.log(setBank);
        setOn = 1;
      } else {
        console.log('BANKER SET: OFF', "\n---------------------------------");
        setOn = 0;
      }
    }

  /*
  This function takes the triggerArray
  and makes key triggers for the available Banker Sets
  */
  function bankerSetKeyTriggers(array) {

    bankerSetStorage = new Set();
      for(let i = 0; i < triggerArray.length; i++) {
        Mousetrap.bind("alt+" + triggerArray[i], function() {
          console.log('CLICK: BANKER SET ' + triggerArray[i], "\n---------------------------------");
          justMakeSoloKeyTrigger(triggerArray[i], arr_enabledBanks);
          bankerSetStorage.add(triggerArray[i]);
        });
      }
  }

// SAMPLER [ RETURN, ENTER ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind('return', function() {
    console.log('SCENE SAMPLED', "\n---------------------------------");

    if (samplerCounter == null ) { samplerCounter = 0; } else { ++samplerCounter; }

    sampledScenes.scene.push(
      {
        stages: [
  		    { "bank" : $(s1).attr('bank'), "location" : $(s1).attr('location'), "gif" : $(s1).attr('gif'), "size" : $(s1).attr('size'), "repeat" : $(s1).attr('repeat'), "blend" : $(s1).attr('blend') },
          { "bank" : $(s2).attr('bank'), "location" : $(s2).attr('location'), "gif" : $(s2).attr('gif'), "size" : $(s2).attr('size'), "repeat" : $(s2).attr('repeat'), "blend" : $(s2).attr('blend') },
        ]
      }
    );
  });

// SAMPLER PLAY [ ; ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // INITIATE SAMPLER
  Mousetrap.bind(';', function() {
    if (sampledScenes.scene.length && !samplerOn) {
    // if (!samplerOn) {

      console.log('SAMPLER: ON', "\n---------------------------------");
      samplerOn = 1;
      samplerIndex = -1;
    }
  });

// SAMPLER OFF / CLEAR [ SHIFT ] + [ ; ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind(":", function() {
    samplerOn = 0;
    samplerIndex = -1;
    console.log('SAMPLER: STOP', "\n---------------------------------");
  });

  Mousetrap.bind("alt+;", function() {
    samplerOn = 0;
    samplerIndex = -1;
    console.log('SAMPLER: STOP & CLEAR', "\n---------------------------------");
    sampledScenes.scene = [];
  });

// SEQUENCER ON/OFF [ SHIFT ] + [ ; ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // Mousetrap.bind('"', function() {
  //   sequencerOn = 0;
  //   curSequencerIndex = -1;
  //   console.log('SEQUENCER STOP!!');
  // });

// SEQUENCER > STORY MODE ON/OFF [ SHIFT ] + [ ' ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("alt+'", function() {
    console.log('SEQUENCER MODE INITIATED');
    if(!storyModeOn) {
      console.log('SEQUENCER: ON');
      storyModeOn = 1;
    } else {
      console.log('SEQUENCER: OFF');
      storyModeOn = 0;
      Mousetrap.trigger('"');
      sequencerOn = 0;
      curSequencerIndex = -1;
    }
    console.log("---------------------------------");
  });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** ROBOMODE ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// STAGEFLIP [ SPACEBAR ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    Mousetrap.bind("space", function() {

        if(!startUpKey) {

          console.log('STARTUP KEY IS STARTING THE APP', "\n---------------------------------");
          startUpKey = 1;
          giy = 1;
          Scene.stageSetup();
          $('.title-page').fadeOut('slow', function() { $(this).remove(); });

        } else {

          if (samplerOn) {
            console.log('THIS IS WHERE WE DELETE YOU');
            sampledScenes.scene.splice(samplerIndex,1);
            console.log(sampledScenes);
            --samplerIndex;
            return false;
          }

          console.log('STAGE FLIPPED', "\n---------------------------------");
          Play.stageFlip();

        }
    });

// ROBOMODE [ SHIFT ] + [ . ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    Mousetrap.bind(">", function() {
      if(!robomodeOn) {
        giy = 0;
        console.log('INITIAL STARTUP ENDS NOW');
        console.log('RoboMode ON');
        robomodeOn = 1;
        Play.startRobomode(beatTime);
        Play.clearBeatTime();
      } else {
        giy = 1;
        Play.stopRobomode();
        robomodeOn = 0;
      }
    });

// GPS SET [ SHIFT ] + [ . ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("<", function() {
    Play.setGPS();
  });

// GPS SPEEDS [ , ] [ . ] [ / ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    // GPS - HALF TIME [ , ]
    Mousetrap.bind(",", function() {
      if(robomodeOn == 1) {
        beatTime = (beatTime/2);
        Play.clearBeatTime();
        console.log('GPS[1/2] :' + beatTime);
      }
    });

    // GPS - RoboFill [ . ]
    Mousetrap.bind(".", function() {
      if(robomodeOn == 1) {
        if(roboFillOn == 0) {
          previousGps = beatTime;
          roboFillOn = 1;
          beatTime = (beatTime / 8);
          console.log('previousGps: ' + previousGps);
          console.log('GPS - Super Fill ON :' + beatTime);
          Play.clearBeatTime();
        } else {
          roboFillOn = 0;
          beatTime = previousGps;
          Play.clearBeatTime();
          console.log('GPS - Super Fill OFF :' + beatTime);
          console.log('back to previousGps: ' + previousGps);
        }
      }
    });

    // GPS - X2 [ / ]
    Mousetrap.bind("/", function() {
      if(robomodeOn == 1) {
        beatTime = (beatTime*2);
        Play.clearBeatTime();
        console.log('GPS[x2] :' + beatTime);
      }
    });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// CURSOR KEY EFFECTS [ UP ], [ DOWN ], [ LEFT ], [ RIGHT ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // BLUR - Down Arrow
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  kd.DOWN.down(function () {
    if (effectAmount >= blurAmount) { return false; }
    if (stgSelect == 'all') {
      $(s1).add(s2).css('-webkit-filter','blur(' + (effectAmount++) + 'px)');
    } else {
      $(stgSelect).css('-webkit-filter','blur(' + (effectAmount++) + 'px)');
    }
  });
  kd.DOWN.up(function () { $(s1).add(s2).css(filterClear); effectAmount = 0; });

  // SATURATE - Up Arrow
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  kd.UP.down(function () {
    if (effectAmount >= saturateAmount) { return false; }
    if (stgSelect == 'all') {
      $(s1).add(s2).css('-webkit-filter','saturate(' + (effectAmount++) + ')');
    } else {
      $(stgSelect).css('-webkit-filter','saturate('+ (effectAmount++) + ')');
    }
  });
  kd.UP.up(function () { $(s1).add(s2).css(filterClear); effectAmount = 0; });

  // INVERT - Right Arrow
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  kd.RIGHT.down(function () {
    if (stgSelect == 'all') {
      $(s1).add(s2).css('-webkit-filter','invert(' + (effectAmount++) + ')');
    } else {
      $(stgSelect).css('-webkit-filter','invert(' + (effectAmount++) + ')');
    }
  });
  kd.RIGHT.up(function () { $(s1).add(s2).css(filterClear); effectAmount = 0; });

  // HUE ROTATE - Left Arrow
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  kd.LEFT.down(function () {
    if (effectAmount >= 360) { return false; }
    if (stgSelect == 'all') {
      $(s1).add(s2).css('-webkit-filter','hue-rotate(' + (effectAmount++) + 'deg)');
    } else {
      $(stgSelect).css('-webkit-filter','hue-rotate(' + (effectAmount++) + 'deg)');
    }
  });
  kd.LEFT.up(function () { $(s1).add(s2).css(filterClear); effectAmount = 0; });

  // KILL SWITCH
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  Mousetrap.bind("alt+ctrl+esc", function() {
    console.log('KILL SWITCH: ENABLED');
    localStorage.setItem('killSwitch','killed');
    localStorage.setItem('stg1Bank', currentScene.stage[0].bank);
    localStorage.setItem('stg2Bank', currentScene.stage[1].bank);
    localStorage.setItem('stg1Gif', currentScene.stage[0].name);
    localStorage.setItem('stg2Gif', currentScene.stage[1].name);
    localStorage.setItem('stg1Location', currentScene.stage[0].location);
    localStorage.setItem('stg2Location', currentScene.stage[1].location);
    localStorage.setItem('stg1BgSize', currentScene.stage[0].bgSize);
    localStorage.setItem('stg2BgSize', currentScene.stage[1].bgSize);
    localStorage.setItem('stg1Blend', currentScene.stage[0].blendMode);
    localStorage.setItem('stg2Blend', currentScene.stage[1].blendMode);
    localStorage.setItem('stg1Filter', currentScene.stage[0].filter);
    localStorage.setItem('stg2Filter', currentScene.stage[1].filter);
    localStorage.setItem('stg1Repeat', currentScene.stage[0].repeat);
    localStorage.setItem('stg2Repeat', currentScene.stage[1].repeat);
    stgStore = localStorage.getItem('killSwitch');
    location.reload();
  });

  // SELECTING BANKS
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // Check for enabled Banks
  createEnabledBankers();
  function createEnabledBankers() {
    console.log('CHECKING FOR: ENABLED BANKS');
    banks.bank.forEach(function(element, index) {

      if (element.enabled === true) {
        console.log('BANK ' + element.id + ': ENABLED');
        enabledBankersArray.push(element);
      }

    });
    enabledBankers();
    console.log("---------------------------------");
  }

  bankerStorageSet = new Set();

  function enabledBankers() {
    for(let i = 0; i < enabledBankersArray.length; i++) {
      Mousetrap.bind(enabledBankersArray[i].trigger, function() {
        bankNumber = enabledBankersArray[i].id;
        console.log('S1 BANK SELECTED: ' + bankNumber);
        var numberKey = bankNumber;
        createGiyTriggers(bankNumber);

        if(bankerOn == 1) {

          if (bankerStorageSet.has(bankNumber)) {
            bankerStorageSet.delete(bankNumber);
            console.log('BANK ' + bankNumber + ': REMOVED FROM BANKER', "\n---------------------------------");
            bankerArray = [...bankerStorageSet];
            console.log(bankerArray);

            if (bankerArray.length === 0) {
              Mousetrap.trigger("'");
            }
            return false;
          }

          bankerStorageSet.add(bankNumber);
          bankerArray = [...bankerStorageSet];
          console.log('BANK ' + bankNumber + ': ADDED TO BANKER', "\n---------------------------------");;
          console.log(bankerArray);

        } else {
          console.log('BANK SELECTED: ' + bankNumber, "\n---------------------------------");
          bankSelected = true;
        }

      });
    }
  }

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// GIY:  KEYBOARD TRIGGERS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  createGiyTriggers(bankNumber);

  function createGiyTriggers(bankNumber) {
    console.log('CREATING: GIY TRIGGERS', "\n---------------------------------");
    // Reset the trigger buttons (A-Z)
    for ( i = 0; i < giyTriggerArray.length; i++) {
      Mousetrap.unbind(giyTriggerArray[i]);
      Mousetrap.unbind(giyTriggerArray[i].toUpperCase());
    }

    singleBankTriggerArray = [];

    banks.bank[bankNumber].gifs.forEach(function(element, index) {
      if (banks.bank[bankNumber].gifs[index].trigger !== null) {
        singleBankTriggerArray.push(element);
      }
    });
    singleBankTriggers();
  }

  function singleBankTriggers() {
    console.log('CREATING: SINGLE BANK TRIGGERS', "\n---------------------------------");
    singleBankTriggerArray.forEach(function(element, index) {

      Mousetrap.bind(singleBankTriggerArray[index].trigger, function() {
        console.log('HI ' + singleBankTriggerArray[index].trigger);
        cacheBuster =  new Date().getTime();
        bgCenters = ".gif?" + cacheBuster + ") center center";
        $(s1).css({
          'background': bankLocation + singleBankTriggerArray[index].location + singleBankTriggerArray[index].name + bgCenters
        });
        if (sceneFullscreenOn) { Scene.screenFullscreen(); return false; }
        $(s1).css(this[randomizer(stageArray)]);
      });

      Mousetrap.bind(singleBankTriggerArray[index].trigger.toUpperCase(), function() {
        cacheBuster =  new Date().getTime();
        bgCenters = ".gif?" + cacheBuster + ") center center";
        $(s2).css({
          'background': bankLocation + singleBankTriggerArray[index].location + singleBankTriggerArray[index].name + bgCenters
        });
        if (sceneFullscreenOn) { Scene.screenFullscreen(); return false; }
        $(s2).css(this[randomizer(stageArray)]);
      });
    });
  }

}); /* END DOM READY */
