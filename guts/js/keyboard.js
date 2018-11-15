// keyboard

// used for Cursor Key FX
// maybe find alternative to this, Mousetrap should work, right?
kd.run(function () { kd.tick(); });

$(document).ready(function() {

  $('body').css('background-color', randomColorChange());

    startup();

    $('.logo a').click(function() {
      $(this).fadeOut(function() {
        $('.logo').remove();
        stageSetup();
      });
    });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// KEY INPUT (Mousetrap.js) https://craig.is/killing/mice
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** SCREENSAVER ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("shift+space", function() {

    if(!screensaver) {

      console.log('SCREENSAVER ON');
      screensaver = 1;
      roboScreen();

    } else {

      console.log('SCREENSAVER OFF');
      screensaver = 0;
      localStorage.setItem('killSwitch','killed');
      stageParameters();
      localStorage.setItem('stg1Bank',$(s1).attr('bank'));
      localStorage.setItem('stg2Bank',$(s2).attr('bank'));
      localStorage.setItem('stg1Gif',$(s1).attr('gif'));
      localStorage.setItem('stg2Gif',$(s2).attr('gif'));
      localStorage.setItem('stg1Repeat',$(s1).attr('repeat'));
      localStorage.setItem('stg2Repeat',$(s2).attr('repeat'));
      localStorage.setItem('stg1Size',$(s1).attr('size'));
      localStorage.setItem('stg2Size',$(s2).attr('size'));
      localStorage.setItem('stg1Blend',$(s1).attr('blend'));
      localStorage.setItem('stg2Blend',$(s2).attr('blend'));

      var bgSize2 = $(s2).attr('size');
      stgStore = localStorage.getItem('killSwitch');
      location.reload();
    }
  });

timerSaves = [];

  Mousetrap.bind("alt+/", function() {
      console.log('TIMER MODE!');
      var start = new Date();
      var gleek = start.getTime();
      timerSaves.push(gleek);
  });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** BANK & FX SELECTOR ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// FX MODE [ ` ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("`", function() {
    if (sampledFilterOn == 1) {
      console.log('SAMPLED FILTER: APPLIED');
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
      $(s1).css('-webkit-filter', 'none');
      $(s2).css('-webkit-filter', 'none');
    } else {
      $(stgSelect).css('-webkit-filter', 'none');
    }
    // $(stgSelect).css('-webkit-filter', 'none');
    filtersOnString = "";
    filtersOn = [];
    saturateOn = 0; hueShiftOn = 0; blurryOn = 0; invertOn = 0;
  });

  function findEffectInArray(element) {
    return element.effect === effectName;
  }

  // Kaleidoscope
if(app.settings.effects.kaleidoscope.enabled) {
  Mousetrap.bind(app.settings.effects.kaleidoscope.filterKey, function() {
    if(!kaleidoscopeOn) {
      console.log(appFX.kaleidoscope.name + ': ON');
      kaleidoscopeOn = 1;
      buildKaleidoscope();
      fxChecker();
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

  /* RoboChop */
if(app.settings.effects.roboChop.enabled) {
  Mousetrap.bind(app.settings.effects.roboChop.filterKey, function() {
    if(!roboChopOn) {
      roboChopOn = 1;
      console.log('RoboChop ON');
    } else {
      $('.robochop > div').remove();
      $(stgSelect).removeClass('robochop');
      console.log('RoboChop OFF');
      roboChopOn = 0;
    }
  });
}

  /* SameSame */
if(app.settings.effects.sameSame.enabled) {
  Mousetrap.bind(app.settings.effects.sameSame.filterKey, function() {
    if(!sameSameOn) {
      sameSameOn = 1;
      console.log('FX: SAMESAME ON');
      sameSame();
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

// SWITCHEROO
if(app.settings.effects.switcheroo.enabled) {
Mousetrap.bind(app.settings.effects.switcheroo.filterKey, function() {
  if(!switcherooOn) {
  console.log('FX: SWITCHEROO ON');
  switcherooOn = !switcherooOn;
  } else {
  console.log('FX: SWITCHEROO OFF');
  switcherooOn = !switcherooOn;
  }
});
}

  /* Invert */
  if(app.settings.effects.invert.enabled) {
    Mousetrap.bind(app.settings.effects.invert.filterKey, function() {
      if(!invertOn) {
        invertOn = 1;
        console.log('FX: INVERT ON');
        invert();
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

  if(app.settings.effects.saturator.enabled) {
    Mousetrap.bind(app.settings.effects.saturator.filterKey, function() {
    if(!saturateOn) {
      saturateOn = 1;
      console.log('FX: SATURATE ON');
      saturator();
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
      hueShift();
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
      blurry();
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
      console.log('SCENE FULLSCREEN: ON');
      sceneFullscreenOn = 1;

      if (sceneFullscreenOn) { screenFullscreen(); }

    } else {
      console.log('SCENE FULLSCREEN: OFF');
      sceneFullscreenOn = 0;

      if (!sceneFullscreenOn) {
        $(s1).css(st);
        $(s2).css(st);
      }

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
        console.log('PAUSED SAMPLER INDEX: ' + pausedSamplerIndex);
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
          // samplerIndex = pausedSamplerIndex;
          // samplerIndex--;
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
      console.log('CREATING BANKER');
      initialStartUp = 0;
      bankerOn = 1;
      bankerArray = [];
    } else {
      console.log('REMOVING BANKER');
      bankerOn = 0;
      bankerArray = [];
    }
  });

// BANKER SETS ON/OFF [ ' ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// bankerSets = {};
// bankerSets.set = [];
//   for (i=0; i < banks.bank[0].gifs.length; i++) {
//     if (banks.bank[0].gifs[i].set) {
//       // bankerSets.set = [];
//       bankerSets.set[i] = {
//         bank: banks.bank[0].id,
//         trigger: banks.bank[0].gifs[i].set,
//         gifs: []
//       }
//         for (j=0; j < banks.bank[0].gifs.length; j++ ) {
//           if (banks.bank[0].gifs[i].set) {
//             bankerSets.set[i].gifs[j] = {
//               name: banks.bank[0].gifs[i].name
//             }
//           }
//         }
//         // bank: banks.bank[0].id,
//         // trigger: banks.bank[0].gifs[i].set
//         // gif: banks.bank[0].gifs[i].name
//     }
//   }

  /*

  bankerSets = {
  	"set" : [
  		{
  			"name" : "set1",
  			"trigger" : "a",
  			"bank" : 0,
  			"gifs" : [
  				{ "name" : "bathbomb-boomerang_o"},
  				{ "name" : "cruz-lights-3"},
  				{ "name" : "spinning_trail_eye_crop_o"},
  				{ "name" : "star_trails"}
  			]
  		},

  */

  // This creates the keyboard commands that map to the Banker Set letters
  bankerSets.set.forEach(function(element) {
    setsArray.push(element.trigger);
  });

  for(let i = 0; i < setsArray.length; i++) {

    Mousetrap.bind("alt+" + setsArray[i], function() {

      if(!setOn) {
        // Sets the bank number that this Banker Set is referencing
        setBank = bankerSets.set[i].bank;

        // setArray = [];
        // Array to store the Banker Set gifs so they can be randomized

        bankerSets.set[i].gifs.forEach(function(element) {
          bankerSetStorage.scenes.push(
            { location: element.location, name: element.name }
          );
        });

        setOn = 1;

        console.log('BANKER SET: [' + setsArray[i] +  '] LOADING');

      } else {
        console.log('BANKER SET: OFF');
        setOn = 0;
        setArray = {};
      }
    });

  }

// SAMPLER [ RETURN, ENTER ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind('return', function() {
    console.log('SCENE SAMPLED');

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

      console.log('SAMPLER: ON');
      samplerOn = 1;
      samplerIndex = -1;
    }
  });

// SAMPLER OFF / CLEAR [ SHIFT ] + [ ; ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind(":", function() {
    samplerOn = 0;
    samplerIndex = -1;
    console.log('SAMPLER: STOP');
  });

  Mousetrap.bind("alt+;", function() {
    samplerOn = 0;
    samplerIndex = -1;
    console.log('SAMPLER: STOP & CLEAR');
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
  });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** ROBOMODE ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// STAGEFLIP [ SPACEBAR ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    Mousetrap.bind("space", function() {

        if(!startUpKey) {

          console.log('STARTUP KEY IS STARTING THE APP');
          startUpKey = 1;
          giy = 1;
          stageSetup();
          $('.title-page').fadeOut('slow', function() { $(this).remove(); });

        } else {

          console.log('StageFlip');
          stageFlip();

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
        startRobomode(beatTime);
        clearBeatTime();
      } else {
        giy = 1;
        stopRobomode();
        robomodeOn = 0;
      }
    });

// GPS SET [ SHIFT ] + [ . ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("<", function() {
    setGPS();
  });

// GPS SPEEDS [ , ] [ . ] [ / ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    // GPS - HALF TIME [ , ]
    Mousetrap.bind(",", function() {
      if(robomodeOn == 1) {
        beatTime = (beatTime/2);
        clearBeatTime();
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
          clearBeatTime();
        } else {
          roboFillOn = 0;
          beatTime = previousGps;
          clearBeatTime();
          console.log('GPS - Super Fill OFF :' + beatTime);
          console.log('back to previousGps: ' + previousGps);
        }
      }
    });

    // GPS - X2 [ / ]
    Mousetrap.bind("/", function() {
      if(robomodeOn == 1) {
        beatTime = (beatTime*2);
        clearBeatTime();
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
      $(s1).css('-webkit-filter','blur(' + (effectAmount++) + 'px)');
      $(s2).css('-webkit-filter','blur(' + (effectAmount++) + 'px)');
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
      $(s1).css('-webkit-filter','saturate(' + (effectAmount++) + ')');
      $(s2).css('-webkit-filter','saturate(' + (effectAmount++) + ')');
    } else {
      $(stgSelect).css('-webkit-filter','saturate('+ (effectAmount++) + ')');
    }
  });
  kd.UP.up(function () { $(s1).add(s2).css(filterClear); effectAmount = 0; });

  // INVERT - Right Arrow
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  kd.RIGHT.down(function () {
    if (stgSelect == 'all') {
      $(s1).css('-webkit-filter','invert(' + (effectAmount++) + ')');
      $(s2).css('-webkit-filter','invert(' + (effectAmount++) + ')');
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
      $(s1).css('-webkit-filter','hue-rotate(' + (effectAmount++) + 'deg)');
      $(s2).css('-webkit-filter','hue-rotate(' + (effectAmount++) + 'deg)');
    } else {
      $(stgSelect).css('-webkit-filter','hue-rotate(' + (effectAmount++) + 'deg)');
    }
  });
  kd.LEFT.up(function () { $(s1).add(s2).css(filterClear); effectAmount = 0; });

  // KILL SWITCH
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    Mousetrap.bind("alt+ctrl+esc", function() {
      console.log('KILL SWITCH ENABLED');
      localStorage.setItem('killSwitch','killed');

      stageParameters();

      localStorage.setItem('stg1Bank',$(s1).attr('bank'));
      localStorage.setItem('stg2Bank',$(s2).attr('bank'));
      localStorage.setItem('stg1Gif',$(s1).attr('gif'));
      localStorage.setItem('stg2Gif',$(s2).attr('gif'));
      localStorage.setItem('stg1Repeat',$(s1).attr('repeat'));
      localStorage.setItem('stg2Repeat',$(s2).attr('repeat'));
      localStorage.setItem('stg1Size',$(s1).attr('size'));
      localStorage.setItem('stg2Size',$(s2).attr('size'));
      localStorage.setItem('stg1Blend',$(s1).attr('blend'));
      localStorage.setItem('stg2Blend',$(s2).attr('blend'));

      var bgSize2 = $(s2).attr('size');

      stgStore = localStorage.getItem('killSwitch');
      location.reload();
    });

  // SELECTING BANKS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    var bankSelectKeyArray = [')','!','@','#','$','%','^','&','*','('];
    for(let i = 0; i < bankSelectKeyArray.length; i++) {
        Mousetrap.bind(bankSelectKeyArray[i], function() {
          bankNumber = i; console.log('S1 BANK SELECTED : ' + bankNumber);
          var numberKey = bankNumber;
          createGiyTriggers(bankNumber);

          if(bankerOn == 1) {
            bankerArray.push(bankNumber);
            console.log('BANK ' + numberKey + ' : ADDED TO BANKS'); console.log(bankerArray);
          } else {
            console.log('BANK SELECTED : ' + bankNumber);
            bankSelected = true;
          }
        });
    }

  // OVERLAYS
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    var overlaySelectKeyArray = ['¡','™','£','¢','∞','§','¶','•','ª','º'];
    for(let i = 0; i < overlaySelectKeyArray.length; i++) {
        Mousetrap.bind(overlaySelectKeyArray[i], function() {

          if(!overlayOn) {
            // $('.overlays').css('background', 'none');

            overlayNumber = i+1; console.log('OVERLAY SELECTED : ' + overlayNumber);
            $('.overlays').css('background', 'url(overlays/overlay_' + i + '.gif)');
            $('.overlays').css('background-size', 'cover');

            overlayOn = 1;
            // $('.overlays').css('animation-name', 'overlayScale');

          } else {

            overlayOn = 0;
            $('.overlays').css('background', 'none');

          }

        });
    }

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// GIY:  KEYBOARD TRIGGERS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

createGiyTriggers(bankNumber);
  function createGiyTriggers(bankNumber) {
    // Reset the trigger buttons (A-Z)
    for ( i = 0; i < giyTriggerArray.length; i++) {
      Mousetrap.unbind(giyTriggerArray[i]);
    }
    singleBankTriggerArray = [];
    availableTriggers.bank[bankNumber].gifs.forEach(function(element, index) {
    	singleBankTriggerArray.push(element);
      cacheBuster =  new Date().getTime();
      bgCenters = ".gif?" + cacheBuster + ") center center";
      Mousetrap.bind(singleBankTriggerArray[index].trigger, function() {
        $(s1).css({
          'background': bankLocation + availableTriggers.bank[bankNumber].gifs[index].location + availableTriggers.bank[bankNumber].gifs[index].name + bgCenters
        });
        $(s1).css(this[randomizer(stageArray)]);
      });
      Mousetrap.bind(singleBankTriggerArray[index].trigger.toUpperCase(), function() {
        $(s2).css({
          'background': bankLocation + availableTriggers.bank[bankNumber].gifs[index].location + availableTriggers.bank[bankNumber].gifs[index].name + bgCenters
        });
        $(s2).css(this[randomizer(stageArray)]);
      });
    });
  }

}); /* END DOM READY */
