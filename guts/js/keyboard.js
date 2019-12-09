// keyboard

  // FX MODE [ ` ]
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-



function loadjscssfile(filename, filetype){
    if (filetype=="js"){ //if filename is a external JavaScript file
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype=="css"){ //if filename is an external CSS file
        var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref!="undefined")
        document.getElementsByTagName("body")[0].appendChild(fileref)
}
 
        // $('canvas').hide();
  Mousetrap.bind("ctrl+/", function() {


        // loadjscssfile("guts/js/GLTFLoader.js", "js") //dynamically load "javascript.php" as a JavaScript file
        // loadjscssfile("guts/js/dancer.js", "js") ////dynamically load and add this .css file


      if (!dancerOn) {
        console.log('CANVAS: DANCER LOADED', "\n---------------------------------");

        // loadjscssfile("guts/js/GLTFLoader.js", "js") //dynamically load "javascript.php" as a JavaScript file
        // loadjscssfile("guts/js/dancer.js", "js") ////dynamically load and add this .css file
        $('canvas').show();
        dancerOn = true;
      } else {
        console.log('CANVAS: DANCER REMOVED', "\n---------------------------------");
        $('canvas').hide();
        dancerOn = false;
      }

      // loadjscssfile("guts/js/three.min.js", "js") //dynamically load and add this .js file
      // loadjscssfile("guts/js/GLTFLoader.js", "js") //dynamically load "javascript.php" as a JavaScript file
      // loadjscssfile("guts/js/dancer.js", "js") ////dynamically load and add this .css file

  });  

  // Mousetrap.bind("`", function() {
  //   if (sampledFilterOn == 1) {
  //     console.log('SAMPLED FILTER: APPLIED', "\n---------------------------------");
  //     $(stgSelect).css('filter', sampledFilter);
  //     if (stgSelect == 'all') {
  //       $(s1).css('filter', sampledFilter);
  //       $(s2).css('filter', sampledFilter);
  //     } else {
  //       $(stgSelect).css('filter', sampledFilter);
  //     }
  //   }
  // });

  Mousetrap.bind("@", function() {
      Video.randomVideo();
      // window.opener.Video.randomVideo();
  });


  Mousetrap.bind("~", function() {
    console.log('FILTERS: CLEARED');
    if (stgSelect == 'all') {
      $(s1).add(s2).css('-webkit-filter', 'none');
      window.opener.$(s1).add(s2).css('-webkit-filter', 'none');
      $('#stage-video').css('-webkit-filter', 'none');
      window.opener.$('.stage-video').css('-webkit-filter', 'none');
    } else {
      $(stgSelect).css('-webkit-filter', 'none');
      window.opener.$(stgSelect).css('-webkit-filter', 'none');
      $('#stage-video').css('-webkit-filter', 'none');
      window.opener.$('.stage-video').css('-webkit-filter', 'none');

    }

    for (i = 0; i < filters.filter.length; i++) {
      filters.filter[i].on = 0;
      filters.filter[i].stage[0].value = ""; filters.filter[i].stage[1].value = "";

    }

    Filter.addFilter();

  });

  // Kaleidoscope
  if(appz.effects.kaleidoscope.enabled) {
    Mousetrap.bind(appz.effects.kaleidoscope.trigger, function() {
      if(!kaleidoscopeOn) {
        console.log(appz.effects.kaleidoscope.name + ': ON');
        kaleidoscopeOn = 1;
        Effects.buildKaleidoscope();
        Effects.fxChecker();
      } else {
        kaleidoscopeOn = 0;
        console.log('REMOVING KALEIDOSCOPE: ' + stgSelect);
        $(s1).add(s2)
          .removeClass(appz.effects.kaleidoscope.name);
        $(s1 + ' > div').add(s2 + ' > div')
          .detach().css('mix-blend-mode','normal');
          $(s2).css('mix-blend-mode','');
      }
    });
  }

  /* SameSame */
  if(appz.effects.sameSame.enabled) {
    Mousetrap.bind(appz.effects.sameSame.trigger, function() {
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
  if(appz.effects.stgFade.enabled) {
    Mousetrap.bind(appz.effects.stgFade.trigger, function() {
      if(!stgFadeOn) {
      console.log('FX: FADER ON');
      stgFadeOn = 1;
      } else {
      console.log('FX: FADER OFF');
      stgFadeOn = 0;

      }
    });
  }

  // MUTATOR
  if(appz.effects.mutator.enabled) {
    Mousetrap.bind(appz.effects.mutator.trigger, function() {
      if(!mutatorOn) {
        console.log('FX: MUTATOR ON');
        mutatorOn = !mutatorOn;
        // Mousetrap.trigger("'");
        // Mousetrap.trigger("ctrl+'");
        Mousetrap.trigger('alt+/');
        prevStgSelect = stgSelect;
      } else {
        console.log('FX: MUTATOR OFF');
        mutatorOn = !mutatorOn;
        // Mousetrap.trigger('"');
        // Mousetrap.trigger("ctrl+'");
        Mousetrap.trigger('alt+/');
        stgSlect = 'all';
        Mousetrap.trigger('~');
        if (kaleidoscopeOn) { console.log('kALEID');Mousetrap.trigger('1') }
        if (sameSameOn) { console.log('SAMESAME');Mousetrap.trigger('3') }
        if (stgFadeOn) { console.log('STFFADE');Mousetrap.trigger('4') }
        stgSelect = prevStgSelect;
      }
    });
  }


  function filterBuild() {
    console.log('FILTERS: SETUP', "\n---------------------------------");
    for (let i=0; i < filters.filter.length; i++) {
      if(filters.filter[i].enabled) {
        Mousetrap.bind(filters.filter[i].trigger, function() {
          if(!filters.filter[i].on) {
            filters.filter[i].on = 1;
            console.log('FX: ' + filters.filter[i].name.toUpperCase() + ' ON');
            Filter.applyFilter(i);
          } else {
            console.log('FX: ' + filters.filter[i].name.toUpperCase() + ' OFF');
            filters.filter[i].on = 0;
            $(s1).css('-webkit-filter', filters.filter[i].slugName + '(' + filters.filter[i].min + filters.filter[i].unit + ')');
            window.opener.$(s1).css('-webkit-filter', filters.filter[i].slugName + '(' + filters.filter[i].min + filters.filter[i].unit + ')');
            $('#stage-video').css('-webkit-filter', filters.filter[i].slugName + '(' + filters.filter[i].min + filters.filter[i].unit + ')');

            console.log('getting called');
            filters.filter[i].stage[0].value = ""; filters.filter[i].stage[1].value = "";
            Filter.addFilter();
          }
        });
      }
    }
  }


// BLEND MODES SWITCHER
Mousetrap.bind('alt+,', function() {
  if(!blendModesOn) {
  console.log('---------------------------------');
  console.log('BLEND MODES: ON');
  console.log('BLEND MODES TOTAL: ' + appz.blendModes.mix.length);
  blendModesOn = !blendModesOn;
  blendCounter = null;

  if (blendModeRandomOn) {
    blendModeRandomOn = !blendModeRandomOn;
    console.log('RANDOM BLEND MODE: OFF');
    // $(s2).css('mix-blend-mode', 'screen');
  }

  } else {
    console.log('BLEND MODES: OFF');
    blendModesOn = !blendModesOn;
    // $(s2).css('mix-blend-mode', 'screen');
    blendCounter = null;
    $(s1).css('mix-blend-mode', originalBlend[0].stage1);
    $(s2).css('mix-blend-mode', originalBlend[0].stage2);
  }
});

// BLEND MODES SWITCHER CYCLE
Mousetrap.bind('alt+.', function() {
  if(blendModesOn) {
    Filter.blendModeSwitcher(blendCounter++);
    if (blendCounter === blendModesArray.length) {
      console.log('BLEND MODES: RESET');
      blendCounter = 0;
      return;
    }
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
    $(s2).css('mix-blend-mode', 'overlay');
    window.opener.$('#scene-section ' + s2).css('mix-blend-mode', 'overlay');
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
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// OVERLAY [ - ] [ = ] [ DEL ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

Mousetrap.bind('!', function() {
  if(!autoOverlayOn) {
    autoOverlayOn = !autoOverlayOn;
    console.log('AUTO OVERLAY: ON');
    Overlays.displayOverlay();
  } else {
    console.log('AUTO OVERLAY: OFF', "\n---------------------------------");
    autoOverlayOn = !autoOverlayOn;
    // Overlays.hideOverlay();
    Overlays.stopFunction();
  }
});

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** STAGE PARAMETERS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// STAGE SELECT [ - ] [ = ] [ DEL ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("-", function() {

    if (bankerStageSetupOn) {
        bankerStageSetupS1 = 1;
        bankerStageSetupS2 = 0;

        console.log('BANKER STAGE SETUP S1: SELECTED');
        bankerStorageSet.clear();
        return;
    }

    console.log('STG1 SELECTED');
    stgSelect = s1;
    stgNotSelected = s2;
  });

  Mousetrap.bind("=", function() {

    if (bankerStageSetupOn) {
        bankerStageSetupS2 = 1;
        bankerStageSetupS1 = 0;

        console.log('BANKER STAGE SETUP S2: SELECTED');
        bankerStorageSet.clear();
        return;
    }

    console.log('STG2 SELECTED');
    stgSelect = s2;
    stgNotSelected = s1;
  });

  Mousetrap.bind("backspace", function() {
    console.log('All STG 1+2 SELECTED');
    stgSelect = "all";
  });


  Mousetrap.bind("ctrl+-", function() {
    if (!overlaySelected) {
      overlaySelected = 1;
      console.log('OVERLAY: SELECTED');
    } else {
      console.log('OVERLAY: DESELECTED');
      overlaySelected = 0;
    }
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
        // console.log('SAMPLER INDEX: ' + samplerIndex);
        pausedSamplerIndex = samplerIndex;
        // console.log('PAUSED SAMPLER INDEX: ' + pausedSamplerIndex, "\n---------------------------------");
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

  // BAR TENDER [ SHIFT ] + [ ] ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind(!performanceModeOn ? "}" : "\\", function() {

    // NEW STAGE PAUSE
    if(!barTenderOn) {
      if (!scenePauseOn) {
        Mousetrap.trigger(']');
      }
        barTenderOn = 1;
        console.log('BAR TENDER: ON');
        console.log("BAR LENGTH: " + barLength);
        barTenderCounter++;
    } else {
      barTenderOn = !barTenderOn;
      console.log('BAR TENDER: OFF');
      Mousetrap.trigger(']');

      barTenderCounter = 0;

    }

  });


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** SEQUENCERS, BANKER & SETS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// BANKER ON/OFF/CLEAR [ ' ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind(!performanceModeOn ? "'" : ";", function() {
    if (!bankerOn) {
      bankerOn = !bankerOn;
      console.log('BANKER: ON');
      initialStartUp = 0;
    } else {
      bankerOn = !bankerOn;
      console.log('BANKER: OFF');
      console.log(bankerArray);
    }
  });

  Mousetrap.bind("\"", function() {
    console.log('BANKER: CLEAR');
    Mousetrap.trigger(";");
    // bankerOn = !bankerOn;

    // if (bankerOn) {
    //   bankerOn = !bankerOn;
    // }

    bankerArray = [];
    bankerStageArrayS1 = [];
    bankerStageArrayS2 = [];
    bankerStageSetupS1 = 0;
    bankerStageSetupS2 = 0;
    bankerStageSetupOn = 0;
    bankerStorageSet.clear();
  });

  Mousetrap.bind("ctrl+'", function() {
  console.log('BANKER: PLAY ALL');
  // bankerArray = enabledBanksArray;

  bankerArray = enabledBanksArray.map(function(banks) {
    return banks.id
  });
});


// SAMPLER [ RETURN, ENTER ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


  Mousetrap.bind(!performanceModeOn ? "return" : "", function() {

    console.log('SCENE SAMPLED', "\n---------------------------------");

    if (samplerCounter == null ) { samplerCounter = 0; } else { ++samplerCounter; }

    sampledScenes.scene.push(
      {
        stages: [
  		    { "bank" : currentScene.stage[0].bank, "location" : currentScene.stage[0].location, "gif" : currentScene.stage[0].name, "size" : currentScene.stage[0].bgSize, "repeat" : currentScene.stage[0].repeat, "blend" : currentScene.stage[0].blendMode, "filter" : currentScene.stage[0].filter },
          { "bank" : currentScene.stage[1].bank, "location" : currentScene.stage[1].location, "gif" : currentScene.stage[1].name, "size" : currentScene.stage[1].bgSize, "repeat" : currentScene.stage[1].repeat, "blend" : currentScene.stage[1].blendMode, "filter" : currentScene.stage[1].filter },
        ]
      }
    );
  });

  // SAMPLER PLAY TOGGLER [ SHIFT ] + [ ; ]
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    Mousetrap.bind(!performanceModeOn ? ";" : "", function() {
      if (sampledScenes.scene.length && !samplerOn) {
        console.log('SAMPLES: PLAYING', "\n---------------------------------");
        samplerOn = !samplerOn;
        samplerIndex = -1;
      } else if (sampledScenes.scene.length && samplerOn) {
        samplerOn = !samplerOn;
        samplerIndex = -1;
        $(s1).add(s2).css('filter','none');
        console.log('SAMPLER: STOP', "\n---------------------------------");
      }
    });

    Mousetrap.bind(":", function() {
      samplerOn = !samplerOn;
      samplerIndex = -1;
      console.log('SAMPLER: CLEAR', "\n---------------------------------");
      sampledScenes.scene = [];
      $(s1).add(s2).css('filter','none');
    });

  // SEQUENCER TOGGLE ON/OFF [ SHIFT ] + [ ; ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind("alt+;", function() {
    if(!sequencerOn) {
      console.log('SEQUENCER: ON');
      // storyModeOn = 1;
      sequencerOn = 1;
    } else {
      console.log('SEQUENCER: OFF');
      // storyModeOn = 0;
      // Mousetrap.trigger('"');
      sequencerOn = 0;
      curSequencerIndex = -1;
    }
    console.log("---------------------------------");
  });

  Mousetrap.bind("ctrl+;", function() {
    if(!randomOn) {
      console.log('RANDOM: ON');
      randomOn = !randomOn;
    } else {
      console.log('RANDOM: OFF');
      randomOn = !randomOn;
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
        sampledScenes.scene.splice(samplerIndex,1);
        // console.log(sampledScenes);
        --samplerIndex;
        console.log("SAMPLE: REMOVED");
        return false;
      }
      console.log('STAGE FLIPPED', "\n---------------------------------");
      Play.stageFlip();
    }
  });

// ROBOMODE [ SHIFT ] + [ . ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

      Mousetrap.bind(!performanceModeOn ? ">" : "'", function() {
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

          if(barTenderOn === 1) {
            window.opener.$('#btn-bartender').toggleClass('active');
            barTenderOn = 0;
            barTenderCounter = 0;
            scenePauseOn = 0;
          }

          robomodeOn = 0;
        }
      });


// GPS SET [ SHIFT ] + [ . ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  Mousetrap.bind(!performanceModeOn ? "<" : "return", function() {
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
        window.opener.$('.gps-data').html(window.opener.convertBeatTime(beatTime));

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
          window.opener.$('.gps-data').html(window.opener.convertBeatTime(beatTime));
        } else {
          roboFillOn = 0;
          beatTime = previousGps;
          Play.clearBeatTime();
          console.log('GPS - Super Fill OFF :' + beatTime);
          console.log('back to previousGps: ' + previousGps);
        window.opener.$('.gps-data').html(window.opener.convertBeatTime(beatTime));
        }
      }
    });

    // GPS - X2 [ / ]
    Mousetrap.bind("/", function() {
      if(robomodeOn == 1) {
        beatTime = (beatTime*2);
        Play.clearBeatTime();
        console.log('GPS[x2] :' + beatTime);
        window.opener.$('.gps-data').html(window.opener.convertBeatTime(beatTime));
      }
    });

    // GPS NUDGE [ CTRL + , ] [ CTRL + . ]
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Mousetrap.bind("ctrl+,", function() {
    //   if(robomodeOn == 1) {
    //     beatTime -=  gpsNudgeAmount;
    //     Play.clearBeatTime();
    //     console.log('GPS NUDGE: ' + beatTime);
    //   }
    // });

    // Mousetrap.bind("ctrl+.", function() {
    //   if(robomodeOn == 1) {
    //     beatTime +=  gpsNudgeAmount;
    //     Play.clearBeatTime();
    //     console.log('GPS NUDGE: ' + beatTime);
    //   }
    // });


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// CURSOR KEY EFFECTS [ UP ], [ DOWN ], [ LEFT ], [ RIGHT ]
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // BLUR - Down Arrow
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  kd.DOWN.down(function () {
    if (effectAmount >= filters.filter[3].max) { return false; }
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
    if (effectAmount >= filters.filter[1].max) { return false; }
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
    if (effectAmount >= filters.filter[2].max) { return false; }
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
    localStorage.setItem('bankNumber', JSON.parse(bankNumber));
    stgStore = localStorage.getItem('killSwitch');
    location.reload();
  });

  // BANKS, BANKERS & GIY
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // BANKER STAGE SETUP
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  Mousetrap.bind("alt+'", function() {
    if(!bankerStageSetupOn) {
      console.log('BANKER STAGE SELECT: ON');
      bankerStageSetupOn = 1;
    } else {
      console.log('BANKER STAGE SELECT: OFF');
      bankerStageSetupOn = 0;
    }
  });

  // Check for enabled Banks
  // createEnabledBankers();
  function createEnabledBankers() {
    allBankers = [];
    console.log('SELECTING ENABLED BANKS');
    // console.log('BANKS IN USE: ' + banksInUse);
    // console.log('CHECKING FOR: ENABLED BANKS');


      enabledBanksArray = playlist.bank.filter(function(bank) {
          return bank.enabled === true;
          // allBankers.push(bank);

      });


    // playlist.bank.forEach(function(element, index) {
    //   if (element.enabled === true) {
    //     // console.log('BANK ' + element.id + ': ENABLED');

    //     enabledBanksArray.push(element);
    //     allBankers.push(element.id);
    //   }
    // });


    // enabledBankers();
    // console.log("---------------------------------");
  }

  bankerStorageSet = new Set();
  function createBankTriggers() {
    console.log('BANK TRIGGERS: CREATED');
    keyModifier = 'alt';
    if (performanceModeOn) { keyModifier = ''; }
    for(let i = 0; i < enabledBanksArray.length; i++) {
      Mousetrap.bind(keyModifier + "+" + enabledBanksArray[i].trigger, function() {
        if (enabledBanksArray[i].trigger == bankTrigger) { return; }
        overlayCounter = 0;
        bankNumber = enabledBanksArray[i].id;
        bankTrigger = enabledBanksArray[i].trigger;
        console.log('BANK SELECTED: ' + bankNumber, bankTrigger);
        console.log('CREATING GIY TRIGGERS FOR: ', bankNumber);


        // if (enabledBanksArray[i].sequencer == true) {
        //   console.log('THIS BANK HAS A SEQUENCER ENABLED');
        // }

        // createGiyTriggers(bankNumber);

        if(bankerOn || bankerStageSetupOn) {

          if (bankerStorageSet.has(bankNumber)) {
            bankerStorageSet.delete(bankNumber);
            console.log('BANK ' + bankNumber + ': REMOVED FROM BANKER', "\n---------------------------------");
            bankerArray = [...bankerStorageSet];
            console.log(bankerArray);

            if (bankerArray.length === 0) { Mousetrap.trigger("'"); }
            return false;
          }

          if(bankerStageSetupS1) {
            bankerStorageSet.add(bankNumber);
            console.log('BANKER ARRAY S1 IN EFFECT');
            bankerStageArrayS1 = [...bankerStorageSet];

          } else if(bankerStageSetupS2) {
            bankerStorageSet.add(bankNumber);
            console.log('BANKER ARRAY S2 IN EFFECT');
            bankerStageArrayS2 = [...bankerStorageSet];

          } else {
            bankerStorageSet.add(bankNumber);
            console.log('BANKER: ENABLED');
            bankerArray = [...bankerStorageSet];
          }

          // bankerArray = [...bankerStorageSet];
          console.log('BANK ' + bankNumber + ': ADDED TO BANKER', "\n---------------------------------");;
          console.log('BANKER: ' + bankerArray);
          console.log('BANKER S1 : ' + bankerStageArrayS1);
          console.log('BANKER S2 : ' + bankerStageArrayS2);

        } else {
          console.log('BANK SELECTED: ' + bankNumber, "\n---------------------------------");
          createGiyTriggers(bankNumber);
          bankSelected = true;
        }
      });
    }
  }

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// GIY:  KEYBOARD TRIGGERS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-


Mousetrap.bind('q', function() {
  alert('fuck!');
});

  // createGiyTriggers(bankNumber);

// GIY TRIGGERS
function createGiyTriggers(bankNumber) {
  console.log('GIY TRIGGERS: SETUP', "\n---------------------------------");
  // Reset the trigger buttons (A-Z)

  for ( i = 0; i < giyTriggerArray.length; i++) {
    Mousetrap.unbind(giyTriggerArray[i]);
    Mousetrap.unbind(giyTriggerArray[i].toUpperCase());
  }
  singleBankTriggerArray = [];
  playlist.bank[bankNumber].gifs.forEach(function(element, index) {
    if (playlist.bank[bankNumber].gifs[index].trigger !== null) {
      singleBankTriggerArray.push(element);
    }
  });
  GiyTriggers();
}

// BANK TRIGGERS
function GiyTriggers() {
  console.log('GIY TRIGGERS: SETUP', "\n---------------------------------");

  singleBankTriggerArray.forEach(function(element, index) {
    Mousetrap.bind(singleBankTriggerArray[index].trigger, function() {

      console.log('GIY CLICK S1: ' + singleBankTriggerArray[index].trigger, bankNumber);
      cacheBuster =  new Date().getTime();
      bgCenters = ".gif?" + cacheBuster + ") center center";
      $(s1).css({
        'background': bankLocation + singleBankTriggerArray[index].location + singleBankTriggerArray[index].name + bgCenters
      });
      if (sceneFullscreenOn) { Scene.screenFullscreen(); return false; }
      $(s1).css(Init.randomizer(stageArray));
    });

    Mousetrap.bind(singleBankTriggerArray[index].trigger.toUpperCase(), function() {
      console.log('GIY CLICK S2: ' + singleBankTriggerArray[index].trigger);
      cacheBuster =  new Date().getTime();
      bgCenters = ".gif?" + cacheBuster + ") center center";
      $(s2).css({
        'background': bankLocation + singleBankTriggerArray[index].location + singleBankTriggerArray[index].name + bgCenters
      });
      if (sceneFullscreenOn) { Scene.screenFullscreen(); return false; }
      $(s2).css(Init.randomizer(stageArray));
    });
    // createGiyTriggers(0)
  });
}

//  SEQUENCE TRIGGERS
function createSequenceTriggers() {
  var enabledSequences = [];
  var enabledSequenceTriggers = [];
  console.log('CREATING ENABLED SEQUENCES', "\n---------------------------------");
  appz.sequence.forEach(function(element, index) {
    if (element.enabled === true) {
      enabledSequences.push(element);
      enabledSequenceTriggers.push(element.trigger);
    }
  });
  // console.log('enabledSequencesArray: ', enabledSequences);
  // console.log('enabledSequenceTriggers: ', enabledSequenceTriggers);

  for ( let i = 0; i < enabledSequenceTriggers.length; i++) {
    Mousetrap.bind("ctrl+" + enabledSequenceTriggers[i], function() {
      console.log("SEQUENCE SELECTED: " + enabledSequenceTriggers[i].toUpperCase(), "/", enabledSequences[i].name, "\n---------------------------------");
      selectedSequence = enabledSequences[i];
      curSequencerIndex = 0;
    });
  }
}
