// MAIN

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// FUNCTIONS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// INITS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// function randomColorChange() {
//     return '#'+(Math.floor(Math.random()*16777216)&0xFFFFFF).toString(16);
// }

// function Init.randomizer(arrayName) {
//   var randomArraySelector = arrayName[Math.floor(Math.random()*arrayName.length)];
//   return randomArraySelector;
// }

// function numRan(ranNum) {
//   var ranNumGen = Math.floor(Math.random()*ranNum);
//   return ranNumGen;
// }

// function robomodeBackground() {
//   $('body').css('background-image', 'repeating-linear-gradient(' + numRan(360) + 'deg, ' +
//     randomColorChange() + ' ' + numRan(100) + '%, ' +
//     randomColorChange() + ' ' + numRan(100) + '%, ' +
//     randomColorChange() + ' ' + numRan(100) + '%, ' +
//     randomColorChange() + ' ' + numRan(100)+ '%)');
// }

// function killSwitch() {
//   localStorage.setItem('killSwitch','unkilled');
//   console.log("KILL SWITCH: ENABLED", "\n---------------------------------");
//   // Scene.stageSetup();
//   $(s1).add(s2).addClass('on');
//   stageOneOn, stageTwoOn = 1;
//   $(s1).css('background', bankLocation + localStorage.getItem('stg1Location') + localStorage.getItem('stg1Gif') + bgCenter);
//   $(s2).css('background', bankLocation + localStorage.getItem('stg2Location') + localStorage.getItem('stg2Gif') + bgCenter);
//   $(s1).css('mix-blend-mode', localStorage.getItem('stg1Blend'));
//   $(s2).css('mix-blend-mode', localStorage.getItem('stg2Blend'));
//   $(s1).css('background-repeat', localStorage.getItem('stg1Repeat'));
//   $(s2).css('background-repeat', localStorage.getItem('stg2Repeat'));
//   $(s1).css('background-size', localStorage.getItem('stg1BgSize'));
//   $(s2).css('background-size', localStorage.getItem('stg2BgSize'));
//   $(s2).addClass('blend');
// }

// function startup() {

//   $('body').css('background-color', Init.randomColorChange());

//   // if (overlaysEnabled) {
//   //   console.log('OVERLAY ENABLED!!!!');
//   //   enableOverlays();
//   // }

//   banks.bank.forEach(function(item) {
//     if (item.enabled) {
//       banksInUse.push(item.id);
//     }
//   });
//   console.log('BANKS IN USE: ' + banksInUse);

//   if (localStorage.getItem('killSwitch') == 'killed') {
//     console.log('KILL SWITCH BANK #: ' + localStorage.getItem('stg1Bank'));
//     Init.killSwitch();
//     bankNumber = localStorage.getItem('stg1Bank');
//   } else {
//     console.log('GIFJAY: ' + version + ' STARTING UP', "\n---------------------------------");
//     $('<div class="logo"><img src="guts/img/gifjay_logo_white_small.png"></div>').appendTo('body');
//     $('.logo img').delay(500).fadeIn('slow').delay(1500).fadeOut('slow');
//     // bankNumber = Init.randomizer(banksInUse);
//   }

//   console.log('START UP BANK NUMBER: ' + bankNumber, "\n---------------------------------");

// }

/*
*********************************************
**  M A I N  R O B O M O D E  E N G I N E  **
*********************************************
*/

// function sceneSetter(arrayName, banker1, banker2) {

//   // Setting up for random GIFs
//   // choose 2 random banks
//   bankSelectorS1 = banker1;
//   bankSelectorS2 = banker2;
//   bankBuilderS1 = [];
//   bankBuilderS2 = [];

//   if (setOn) {
//     gifSelectorS1 = Init.randomizer(setArray);
//     gifSelectorS2 = Init.randomizer(setArray);

//     if(bankerOn) {
//       console.log('NO NO BANKERS HERE');
//       Mousetrap.trigger('\'');
//       return false;
//     }

//     arrayName.forEach(function(element, index) {
//       bankBuilderS1.push({
//         gif: element.name,
//         location: element.location,
//       });
//     });

//     arrayName.forEach(function(element, index) {
//       bankBuilderS2.push({
//         gif: element.name,
//         location: element.location,
//       });
//     });

//     if (sceneFullscreenOn) { Scene.screenFullscreen(); }

//   } else {

//     banks.bank[bankSelectorS1].gifs.forEach(function(element) {
//       bankBuilderS1.push({
//         gif: element.name,
//         location: element.location,
//         type: element.type
//       });
//     });

//     banks.bank[bankSelectorS2].gifs.forEach(function(element) {
//       bankBuilderS2.push({
//         gif: element.name,
//         location: element.location,
//         type: element.type
//       });
//     });

//   }

//   // Selecting 2 random gifs
//   gifSelectorS1 = Init.randomizer(bankBuilderS1);
//   gifSelectorS2 = Init.randomizer(bankBuilderS2);

//   if (blendModeRandomOn) {
//     $(s2).css('mix-blend-mode', blendModeSwitcherArray[Init.numRan(blendModeSwitcherArray.length)]);
//   }

//   if (currentPlayMode == 'sampler') {
//     console.log('You should definitely be switching to Sampler by now!!');
//     currentPlayMode = "sampler";
//   }

//   if (currentPlayMode != 'robomode') {

//         if (sceneFullscreenOn) { Scene.screenFullscreen(); }

//         // CHECKING FOR SCENE PAUSE
//         if (scenePauseOn) {
//           gifSelectorS1 = pausedStg1;
//           gifSelectorS2 = pausedStg2;
//           bankSelectorS1 = pausedBankStg1;
//           bankSelectorS2 = pausedBankStg2;
//         }

//         // CHECKING FOR BANKER
//         if (bankerOn) {
//           if (sceneFullscreenOn) { Scene.screenFullscreen(); }
//         }

//         if (gifSelectorS1.gif === gifSelectorS2.gif) {
//           console.log("DUPLICATE GIFS");
//           $(s1).css({
//             "background" : bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter,
//             "background-repeat" : "repeat"
//           });
//           $(s2).css({
//             "background" : bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter,
//             "background-repeat" : "no-repeat",
//             "background-size" : "cover"
//           });
//           return false;
//         }

//         if (stgSelect == "all") {
//           $(s1).css('background', bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter);
//           $(s2).css('background', bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter);
//           $(s1).add(s2).css(this[Init.randomizer(stageArray)]);
//         } else {
//           $(stgSelect).css('background', bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter);
//           $(stgNotSelected).css('background', bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter);
//           $(stgNotSelected).css(this[Init.randomizer(stageArray)]);
//           $(stgSelect).css(this[Init.randomizer(stageArray)]);
//         }

//         if (sceneFullscreenOn) { Scene.screenFullscreen(); }

//   } else {

//         if (scenePauseOn) {
//           gifSelectorS1 = pausedStg1;
//           gifSelectorS2 = pausedStg2;
//           bankSelectorS1 = pausedBankStg1;
//           bankSelectorS2 = pausedBankStg2;
//         }

//         if (setOn) {
//           gifSelectorS1 = Init.randomizer(bankerSetStorage.scenes);
//           gifSelectorS2 = Init.randomizer(bankerSetStorage.scenes);
//           console.log('SET ON 2 IN SCENE SETTER');
//         }

//         // SET THE SCENE
//         $(s1).css({'background':bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter });
//         $(s2).css({'background':bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter });
//         $(s1).css(this[Init.randomizer(stageArray)]);
//         $(s2).css(this[Init.randomizer(stageArray)]);

//         if (sceneFullscreenOn) { Scene.screenFullscreen(); }

//   }

//   Scene.saveCurrentScene()
//   Effects.fxChecker();

// }

// function playMode(playType) {

//   switch(playType) {

//     // -=-=-=-=-=-=-=-=-=-=-=-=-=-

//     // Banker
//     case 'banker':
//       currentPlayMode = 'banker';

//       if (samplerOn) {
//         playMode('sampler');
//       } else {

//         if (bankerStageArrayS1.length && bankerStageArrayS2.length) {
//           bankSelectorS1 = Init.randomizer(bankerStageArrayS1); bankSelectorS2 = Init.randomizer(bankerStageArrayS2);
//           sceneSetter(bankerArray, bankSelectorS1, bankSelectorS2);
//           return;
//         }

//         if (bankerStageArrayS1.length) {
//           bankSelectorS1 = Init.randomizer(bankerStageArrayS1);
//           sceneSetter(bankerArray, bankSelectorS1, bankSelectorS2);
//           return;
//         }

//         if (bankerStageArrayS2.length) {
//           bankSelectorS2 = Init.randomizer(bankerStageArrayS2);
//           sceneSetter(bankerArray, bankSelectorS1, bankSelectorS2);
//           return;
//         }

//         bankSelectorS1 = Init.randomizer(bankerArray); bankSelectorS2 = Init.randomizer(bankerArray);
//         sceneSetter(bankerArray, bankSelectorS1, bankSelectorS2);
//       }

//       break;

//     // -=-=-=-=-=-=-=-=-=-=-=-=-=-

//     // Sets
//     case 'sets':
//       // console.log('PLAY MODE: Sets');
//       currentPlayMode = 'sets';
//       // bankSelectorS1 = setBank; bankSelectorS2 = setBank;
//       sceneSetter(setArray,bankSelectorS1,bankSelectorS2);
//       // sceneSetter(singleBankerSet, bankSelectorS1, bankSelectorS2);
//       break;

//     // -=-=-=-=-=-=-=-=-=-=-=-=-=-

//     // SEQUENCER
//     case 'sequencer':
//       // console.log('PLAY MODE: Sequencer');
//       currentPlayMode = 'sequencer';

//       if (sequenceNumber == sequencer.sequences[letterNumber].trigger ) {
//         console.log('ITS A MATCH!!');

//         var seqNum = sequencer.sequences[letterNumber].scenes.length;
//         var someGif = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.gif;
//         var someBank = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.bank;
//         var someLocation = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.location;
//         var someGif2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.gif;
//         var someBank2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.bank;
//         var someLocation2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.location;
//         var someParam = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.parameters.repeat;
//         var someParam2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.parameters.repeat;
//         var someFX = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.parameters.fx;
//         var someFX2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.parameters.fx;

//         ++curSequencerIndex;

//         if (kaleidoscopeOn) {

//           $(s1 + '.kaleidoscope > div').css('background', bankLocation + someBank +
//             someLocation + someGif + bgCenter);
//           $(s2 + '.kaleidoscope > div').css('background', bankLocation + someBank2 +
//             someLocation2 + someGif2 + bgCenter);

//         } else {

//           $(s1).css('background', bankLocation + someBank + someLocation + someGif + bgCenter);
//           if(someParam == 'no-repeat') { $(s1).css(sf); } else { $(s1).css(st); }
//           $(s2).css('background', bankLocation + someBank2 + someLocation2 + someGif2 + bgCenter);
//           if(someParam2 == 'no-repeat') { $(s2).css(sf); } else { $(s2).css(st); }

//         }

//         if (curSequencerIndex == (seqNum)) {
//           curSequencerIndex = 0
//         }
//       }

//       break;

//     // -=-=-=-=-=-=-=-=-=-=-=-=-=-

//     // SAMPLER
//     case 'sampler':
//       // console.log('PLAY MODE: Sampler');
//       currentPlayMode = 'sampler';

//       if (scenePauseOn) {
//         samplerIndex = pausedSamplerIndex;

//       } else {

//         if (sampledScenes.scene.length === 0) {
//           console.log('SWITCH TO ANOTHER MODE');
//           Mousetrap.trigger(':');
//           return false;
//         }

//         if (samplerIndex == (sampledScenes.scene.length - 1)) { samplerIndex = -1; }
//         ++samplerIndex;
//       }

//       if (blendModeRandomOn) {
//         $(s2).css('mix-blend-mode', blendModeSwitcherArray[numRan(blendModeSwitcherArray.length)]);
//       }

//       // console.log("samplerIndex : " + samplerIndex);
//       smpldScn = sampledScenes.scene[samplerIndex];

//       if (kaleidoscopeOn) {

//         $(s1 + '.kaleidoscope > div').css({
//           'background' : bankLocation + smpldScn.stages[0].location + smpldScn.stages[0].gif + bgCenter,
//           'background-repeat' : smpldScn.stages[0].repeat,
//           'background-size' : smpldScn.stages[0].size
//         });
//         $(s2 + '.kaleidoscope > div').css({
//           'background' : bankLocation + smpldScn.stages[1].location + smpldScn.stages[1].gif + bgCenter,
//           'background-repeat' : smpldScn.stages[1].repeat,
//           'background-size' : smpldScn.stages[1].size
//         });
//         $(s2).css('background', 'none !important');
//         $(s2 + '.kaleidoscope').css('mix-blend-mode', Init.randomizer(blendModeArray));
//         $(s1 + '.kaleidoscope > div').add(s2 + '.kaleidoscope > div').css(sf);

//       } else {

//         $(s1).css({
//             'background' : bankLocation + smpldScn.stages[0].location + smpldScn.stages[0].gif + bgCenter,
//             'background-repeat' : smpldScn.stages[0].repeat,
//             'background-size' : smpldScn.stages[0].size,
//             'mix-blend-mode' : smpldScn.stages[0].blend,
//              "filter" : smpldScn.stages[0].filter
//           });

//           $(s2).css({
//               'background' : bankLocation + smpldScn.stages[1].location + smpldScn.stages[1].gif + bgCenter,
//               'background-repeat' : smpldScn.stages[1].repeat,
//               'background-size' : smpldScn.stages[1].size,
//               'mix-blend-mode' : smpldScn.stages[1].blend,
//               "filter" : smpldScn.stages[1].filter
//             });

//         if (sceneFullscreenOn) { Scene.screenFullscreen(); }

//       }

//       break;

//     // -=-=-=-=-=-=-=-=-=-=-=-=-=-

//     default:
//       // console.log('PLAY MODE: RoboMode');
//       currentPlayMode = 'robomode';
//       bankSelectorS1 = bankNumber;
//       bankSelectorS2 = bankNumber;
//       // bankSelectorS1 = Init.randomizer(banksInUse);
//       // bankSelectorS2 = Init.randomizer(banksInUse);
//       sceneSetter(banksInUse,bankSelectorS1,bankSelectorS2);
//     }
// }
