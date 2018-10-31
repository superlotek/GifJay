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

  Mousetrap.bind("~", function() {

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

  /* Black / White */
  if(app.settings.effects.blackAndWhite.enabled) {
    Mousetrap.bind(app.settings.effects.blackAndWhite.filterKey, function() {
      if(!blackWhiteOn) {
        blackWhiteOn = 1;
        console.log('FX: B/W ON');
        blackWhite();
      } else {
        console.log('FX: B/W OFF');
        blackWhiteOn = 0;
        $(s1).add(s2).css('-webkit-filter', 'none')
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
      $(s1).add(s2).css('-webkit-filter', 'none')
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
      $(s1).add(s2).css('-webkit-filter', 'none')
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
      $(s1).add(s2).css('-webkit-filter', 'none')
    }
  });
}

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
// *** GRID SIZES & LOCKS ***
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

    // NEW STAGE LOCK OR PAUSE
    if(!stageLockOn) {
        stageLockOn = 1;
        console.log('SCENE PAUSE: ON');

        pausedStg1 = gifSelectorS1;
        pausedStg2 = gifSelectorS2;
        pausedBankStg1 = bankSelectorS1;
        pausedBankStg2 = bankSelectorS2;

    } else {
        stageLockOn = 0;
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

gleep = [];
banks.bank[0].gifs.forEach(function(glip) {
	console.log(glip.set);
	if (glip.set == 'd') {
		gleep.push(glip.name);
  }

});

  bankerSets.set.forEach(function(durk, index) {
    setsArray.push(durk.trigger);
  });

  for(let i = 0; i < setsArray.length; i++) {

    Mousetrap.bind("alt+" + setsArray[i], function() {

      if(!setOn) {
        setBank = bankerSets.set[i].bank;

        setArray = [];
        bankerSets.set[i].gifs.forEach(function(slees) {
          setArray.push(slees.name);
        });

        setOn = 1;

        console.log('BANKER SET: [' + setsArray[i] +  '] LOADING');

      } else {
        console.log('BANKER SET: OFF');
        setOn = 0;
        setArray = [];
      }
    });

  }

// SAMPLER [ RETURN, ENTER ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind('return', function() {
    console.log('SAMPLED');
    var stageSave = $(s1).attr('stage');
    var bankSave = $(s1).attr('bank');
    var gifSave = $(s1).attr('gif');
    var bgSize = $(s1).attr('size');
    var repeatSave = $(s1).attr('repeat');
    var stageSave2 = $(s2).attr('stage');
    var bankSave2 = $(s2).attr('bank');
    var gifSave2 = $(s2).attr('gif');
    var bgSize2 = $(s2).attr('size');
    var repeatSave2 = $(s2).attr('repeat');
    var blendSave = $(s1).attr('blend');
    var blendSave2 = $(s2).attr('blend');

    samplerStg1.push([[bankSave],[gifSave],[repeatSave],[bgSize],[blendSave]]);
    samplerStg2.push([[bankSave2],[gifSave2],[repeatSave2],[bgSize2],[blendSave2]]);

    if(samplerOn) {
      console.log('this is firing during SEQ LOVE');
    }

    console.log('SAMPLED STG1: ' + samplerStg1);
    console.log('SAMPLED STG2: ' + samplerStg2);
  });

// SAMPLER PLAY [ ; ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // INITIATE SAMPLER
  Mousetrap.bind(';', function() {
    if (samplerStg1.length && samplerStg2.length && !samplerOn) {
      console.log('STARTING SAMPLER');
      samplerOn = 1;
      customSequencerOn2 = 1;
      samplerStg1Num = 1;
      samplerStg2Num = 1;
      curSamplerStg1Index = -1;
      curSamplerStg2Index = -1;
    }
  });

// SAMPLER OFF / CLEAR [ SHIFT ] + [ ; ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind(":", function() {
    samplerOn = 0;
    curSamplerStg1Index = -1;
    console.log('SAMPLER: STOP');
  });

  Mousetrap.bind("alt+;", function() {
    samplerOn = 0;
    curSamplerStg1Index = -1;
    console.log('SAMPLER: STOP & CLEAR');
    samplerStg1 = [];
    samplerStg2 = [];
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
    if (effectAmount >= 10) { return false; }
    $(stgSelect).css('-webkit-filter','blur('+ (effectAmount++) +'px)');
  });
  kd.DOWN.up(function () { $(stgSelect).css(filterClear); effectAmount = 0; });

  // SATURATE - Up Arrow
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  kd.UP.down(function () {
    if (effectAmount >= 10) { return false; }
    $(stgSelect).css('-webkit-filter','saturate('+ (effectAmount++) + ')');
  });
  kd.UP.up(function () { $(stgSelect).css(filterClear); effectAmount = 0; });

  // INVERT - Right Arrow
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  kd.RIGHT.down(function () {
    $(stgSelect).css('-webkit-filter','invert('+ (effectAmount++) + ')');
  });
  kd.RIGHT.up(function () { $(stgSelect).css(filterClear); effectAmount = 0; });

  // HUE ROTATE - Left Arrow
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  kd.LEFT.down(function () {
    $(stgSelect).css('-webkit-filter','hue-rotate('+ (effectAmount++) + 'deg)');
  });
  kd.LEFT.up(function () { $(stgSelect).css(filterClear); effectAmount = 0; });

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
          if(bankerOn == 1) {
            bankerArray.push(bankNumber);
            console.log('Bank ' + numberKey + ' added to Banker'); console.log(bankerArray);
          } else {
            console.log('BANK SELECTED : ' + bankNumber);
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

    /* DEPRECATED : OVERLAY EFFECTS */
    Mousetrap.bind('ctrl+1', function() {
      console.log('FILTER GROUP 1: LOADED');
      console.log(filterGroups.groups[0].effects);
      Mousetrap.trigger('3');
      Mousetrap.trigger('8');
    });

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// MAIN KEYBOARD TRIGGERS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    for(let i = 0; i < letterArray.length; i++) {

      Mousetrap.bind(letterArray[i], function() {

        currentSequencerTriggers = [];
        sequencer.sequences.forEach(function(seq) {
          currentSequencerTriggers.push(seq.trigger);
        });

        if (storyModeOn) {
          console.log('Start selecting Sequencer Keys');

              sequencerOn = 1;
              sequenceNumber = letterArray[i];
              letterNumber = i;
              console.log(sequenceNumber);
              curSequencerIndex = 0;

        }else if (giy) {
            console.log('GIY MODE');

            if (bankNumber) {
              console.log('kickin" this letter thing?');
              bankNumberS1 = bankNumber;
              bankNumberS2 = bankNumber;
            } else {
              bankNumberS1 = bankSelectorS1;
              bankNumberS2 = bankSelectorS2;
            }

          if (stgSelect == s1) {
            $(stgSelect).css('background', bankLocation + bankNumberS1 + '/' + letterArray[i] + bgCenter);

          } else {
            $(stgSelect).css('background', bankLocation + bankNumberS2 + '/' + letterArray[i] + bgCenter);
          }

        } else {

          if (giy) {
            console.log('say yeah!!!');
          }

          console.log('when is this firing??');
          $(stgSelect).css('background', bankLocation + bankNumberS1 + '/' + letterArray[i] + bgCenter);

        }

      });
    }

});
