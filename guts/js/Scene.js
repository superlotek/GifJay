// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** EFFECTS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

function sceneSetter(arrayName, banker1, banker2) {

  // Setting up for random GIFs
  // choose 2 random banks
  bankSelectorS1 = banker1;
  bankSelectorS2 = banker2;
  bankBuilderS1 = [];
  bankBuilderS2 = [];


  if (sequencerOn) {
    console.log('SAY HELLO');
  }

  if (setOn) {
    gifSelectorS1 = Init.randomizer(setArray);
    gifSelectorS2 = Init.randomizer(setArray);

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

    if (sceneFullscreenOn) { Scene.screenFullscreen(); }

  } else {

    appz.bank[bankSelectorS1].gifs.forEach(function(element) {
      bankBuilderS1.push({
        gif: element.name,
        location: element.location,
        type: element.type
      });
    });

    appz.bank[bankSelectorS2].gifs.forEach(function(element) {
      bankBuilderS2.push({
        gif: element.name,
        location: element.location,
        type: element.type
      });
    });

  }

  // Selecting 2 random gifs
  gifSelectorS1 = Init.randomizer(bankBuilderS1);
  gifSelectorS2 = Init.randomizer(bankBuilderS2);

  if (blendModeRandomOn) {
    $(s2).css('mix-blend-mode', appz.blendModes.mix[Init.numRan(appz.blendModes.mix.length)].name);
  }

  if (currentPlayMode == 'sampler') {
    console.log('You should definitely be switching to Sampler by now!!');
    currentPlayMode = "sampler";
  }

  if (currentPlayMode != 'robomode') {

        if (sceneFullscreenOn) { Scene.screenFullscreen(); }

        // CHECKING FOR SCENE PAUSE
        if (scenePauseOn) {
          gifSelectorS1 = pausedStg1;
          gifSelectorS2 = pausedStg2;
          bankSelectorS1 = pausedBankStg1;
          bankSelectorS2 = pausedBankStg2;
        }

        // CHECKING FOR BANKER
        if (bankerOn) {
          if (sceneFullscreenOn) { Scene.screenFullscreen(); }
        }

        if (gifSelectorS1.gif === gifSelectorS2.gif) {
          console.log("DUPLICATE GIFS");
          $(s1).css({
            "background" : bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter,
            "background-repeat" : "repeat"
          });
          $(s2).css({
            "background" : bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter,
            "background-repeat" : "no-repeat",
            "background-size" : "cover"
          });
          return false;
        }

        if (stgSelect == "all") {
          $(s1).css('background', bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter);
          $(s2).css('background', bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter);
          $(s1).add(s2).css(this[Init.randomizer(stageArray)]);
        } else {
          $(stgSelect).css('background', bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter);
          $(stgNotSelected).css('background', bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter);
          $(stgNotSelected).css(Init.randomizer(stageArray));
          $(stgSelect).css(Init.randomizer(stageArray));
        }

        if (sceneFullscreenOn) { Scene.screenFullscreen(); }

  } else {

        if (scenePauseOn) {
          gifSelectorS1 = pausedStg1;
          gifSelectorS2 = pausedStg2;
          bankSelectorS1 = pausedBankStg1;
          bankSelectorS2 = pausedBankStg2;
        }

        if (setOn) {
          gifSelectorS1 = Init.randomizer(bankerSetStorage.scenes);
          gifSelectorS2 = Init.randomizer(bankerSetStorage.scenes);
          console.log('SET ON 2 IN SCENE SETTER');
        }

        // SET THE SCENE
        $(s1).css({'background':bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter });
        $(s2).css({'background':bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter });
        $(s1).css(Init.randomizer(stageArray));
        $(s2).css(Init.randomizer(stageArray));

        if (sceneFullscreenOn) { Scene.screenFullscreen(); }

  }

  Scene.saveCurrentScene()
  Effects.fxChecker();

}

const Scene = {

  saveCurrentScene() {
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
    currentScene.stage[0].repeat = $(s1).css('background-repeat');
    currentScene.stage[1].repeat = $(s2).css('background-repeat');
    currentScene.stage[0].bgSize = $(s1).css('background-size');
    currentScene.stage[1].bgSize = $(s2).css('background-size');
    return currentScene;
  },

  screenFullscreen() {
    $(s1).add(s2).css(sf);
  },

  stageSetup() {
    console.log('STG1+2: SETUP', "\n---------------------------------");

    if(giy) {
      console.log('BANK NUMBER: ' + bankNumber, "\n---------------------------------");
      console.log('SETTING UP: GIY');

      if(!bankNumber) {
        console.log('GIY: RANDOM BANKS');
        // bankSelectorS1 = Init.randomizer(banksInUse);
        // bankSelectorS2 = Init.randomizer(banksInUse);
        bankSelectorS1 = bankNumber;
        bankSelectorS2 = bankNumber;
        sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);

      } else {
        console.log('GIY: BANK NUMBER');
        bankSelectorS1 = bankNumber;
        bankSelectorS2 = bankNumber;
        sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
      }

    } else {
      bankSelectorS1 = Init.randomizer(banksInUse);
      bankSelectorS2 = Init.randomizer(banksInUse);
      sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
    }
      console.log('BANK SELECTOR S1: ' + bankSelectorS1);
      console.log('BANK SELECTOR S2: ' + bankSelectorS2);
  }

};
