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
    $(s1).attr({stage:1,bank:bankSelectorS1,gif:gifSelectorS1,repeat:$(s1).
      css('background-repeat'),size:$(s1).css('background-size'),blend:$(s1).css('mix-blend-mode')});
    $(s2).attr({stage:2,bank:bankSelectorS2,gif:gifSelectorS2,repeat:$(s2).
      css('background-repeat'),size:$(s2).css('background-size'),blend:$(s2).css('mix-blend-mode')});
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

  function sceneSetter(arrayName,banker1,banker2) {

    // choose 2 random banks
    bankSelectorS1 = banker1;
    bankSelectorS2 = banker2;
    bankBuilderS1 = [];
    bankBuilderS2 = [];

    // console.log('creating some gifs');
    banks.bank[bankSelectorS1].gifs.forEach(function(glarb) {
      bankBuilderS1.push(glarb.name);
    });

    banks.bank[bankSelectorS2].gifs.forEach(function(gleek) {
      bankBuilderS2.push(gleek.name);
    });

    // choose 2 random gifs
    gifSelectorS1 = randomizer(bankBuilderS1);
    gifSelectorS2 = randomizer(bankBuilderS2);

    if (setOn) {
      gifSelectorS1 = randomizer(setArray);
      gifSelectorS2 = randomizer(setArray);
    }

    if (currentPlayMode != 'robomode') {

      if (gifSizeLockOn) {
        $(s1).css(sf);
        $(s2).css(sf);
      }

      if (stageLockOn) {
        gifSelectorS1 = pausedStg1;
        gifSelectorS2 = pausedStg2;
        bankSelectorS1 = pausedBankStg1;
        bankSelectorS2 = pausedBankStg2;
      }

      if (bankerOn) {
        if (gifSizeLockOn) {
          $(s1).css(sf);
          $(s2).css(sf);
        }
      }

      $(stgSelect).css('background', bankLocation + bankSelectorS1 + '/' + gifSelectorS1 + bgCenter);
      $(stgNotSelected).css('background', bankLocation + bankSelectorS2 + '/' + gifSelectorS2 + bgCenter);
      $(stgNotSelected).css(this[randomizer(stageArray)]);
      $(stgSelect).css(this[randomizer(stageArray)]);

      if (gifSizeLockOn) {
        $(s1).css(sf);
        $(s2).css(sf);
      }

    } else {

      if (stageLockOn) {
        gifSelectorS1 = pausedStg1;
        gifSelectorS2 = pausedStg2;
        bankSelectorS1 = pausedBankStg1;
        bankSelectorS2 = pausedBankStg2;
      }

      // SET THE SCENE
      $(s1).css({'background':bankLocation + bankSelectorS1 + '/' + gifSelectorS1 + bgCenter });
      $(s2).css({'background':bankLocation + bankSelectorS2 + '/' + gifSelectorS2 + bgCenter });
      $(s1).css(this[randomizer(stageArray)]);
      $(s2).css(this[randomizer(stageArray)]);
      $(s2).css('opacity', '1');

      if (gifSizeLockOn) {
        $(s1).css(sf);
        $(s2).css(sf);
      }

    }

    fxChecker();

  }

  function playMode(playType) {

    switch(playType) {

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-

      // Banker
      case 'banker':
        console.log('PLAY MODE: Banker');
        currentPlayMode = 'banker';

        if (stgSelect == s1 || s2) { bankSelectorS1 = randomizer(bankerArray); bankSelectorS2 = randomizer(bankerArray); }
        if (stgSelect == 'all') { bankSelectorS1 = randomizer(bankerArray); bankSelectorS2 = randomizer(bankerArray) }

        sceneSetter(bankerArray,bankSelectorS1,bankSelectorS2);
        break;

      // -=-=-=-=-=-=-=-=-=-=-=-=-=-

      // Sets
      case 'sets':
        console.log('PLAY MODE: Sets');
        currentPlayMode = 'sets';
        bankSelectorS1 = setBank; bankSelectorS2 = setBank;
        sceneSetter(setArray,bankSelectorS1,bankSelectorS2);
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
          var someGif2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.gif;
          var someBank2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.bank;
          var someParam = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.parameters.repeat;
          var someParam2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.parameters.repeat;
          var someFX = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage1.parameters.fx;
          var someFX2 = sequencer.sequences[letterNumber].scenes[curSequencerIndex].stage2.parameters.fx;

          ++curSequencerIndex;

          if (kaleidoscopeOn) {

            $(s1 + '.kaleidoscope > div').css('background', bankLocation + someBank +
              '/' + someGif + bgCenter);
            $(s2 + '.kaleidoscope > div').css('background', bankLocation + someBank2 +
              '/' + someGif2 + bgCenter);

          } else {

            $(s1).css('background', bankLocation + someBank + '/' + someGif + bgCenter);
            if(someParam == 'no-repeat') { $(s1).css(sf); } else { $(s1).css(st); }
            $(s2).css('background', bankLocation + someBank2 + '/' + someGif2 + bgCenter);
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

        ++curSamplerStg1Index;
        ++curSamplerStg2Index;

        var samplerStg1 = this["samplerStg" + samplerStg1Num];
        var samplerStg1 = this["samplerStg" + samplerStg2Num];

        if (kaleidoscopeOn) {

          $(s1 + '.kaleidoscope > div').css('background', bankLocation + samplerStg1[curSamplerStg1Index][0] +
            '/' + samplerStg1[curSamplerStg1Index][1] + bgCenter)
            .css({'background-repeat':samplerStg1[curSamplerStg1Index][2]})
            .css('background-size',samplerStg1[curSamplerStg1Index][3]);
          $(s2 + '.kaleidoscope > div').css('background', bankLocation + samplerStg2[curSamplerStg2Index][0] +
            '/' + samplerStg2[curSamplerStg2Index][1] + bgCenter)
            .css({'background-repeat':samplerStg2[curSamplerStg1Index][2]})
            .css('background-size',samplerStg2[curSamplerStg1Index][3]);

          $(s2).css('background', 'none !important');
          $(s2 + '.kaleidoscope').css('mix-blend-mode', randomizer(blendModeArray));
          $(s1 + '.kaleidoscope > div').add(s2  + '.kaleidoscope > div').css(sf);

        } else {

          $(s1).css('background', bankLocation + samplerStg1[curSamplerStg1Index][0] +
            '/' + samplerStg1[curSamplerStg1Index][1] + bgCenter)
            .css({'background-repeat':samplerStg1[curSamplerStg1Index][2]})
            .css('background-size',samplerStg1[curSamplerStg1Index][3])
            .css('mix-blend-mode',samplerStg1[curSamplerStg1Index][4]);


          $(s2).css('background', bankLocation + samplerStg2[curSamplerStg2Index][0] +
            '/' + samplerStg2[curSamplerStg2Index][1] + bgCenter)
            .css({'background-repeat':samplerStg2[curSamplerStg1Index][2]})
            .css('background-size',samplerStg2[curSamplerStg1Index][3])
            .css('mix-blend-mode',samplerStg2[curSamplerStg1Index][4]);

            if (gifSizeLockOn) {
              $(s1).css(sf);
              $(s2).css(sf);
            }

        }

        if (curSamplerStg1Index == (samplerStg1.length - 1)) {
          curSamplerStg1Index = -1;
        }

        if (curSamplerStg2Index == (samplerStg2.length - 1)) {
          curSamplerStg2Index = -1;
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

  function fxChecker() {

      // CHECK FOR KALEIDOSCOPE
      if (kaleidoscopeOn) {
        console.log('KALEIDOSCOPE IS RUNNING');
        if (stgSelect == 'all') {
          $(s1 + '.kaleidoscope > div').css('background', bankLocation + bankSelectorS1 + '/' + gifSelectorS1 + bgCenter);
          $(s2 + '.kaleidoscope > div').css('background', bankLocation + bankSelectorS2 + '/' + gifSelectorS2 + bgCenter);
          $(s2).css('background', 'none !important');
          $(s2 + '.kaleidoscope').css('mix-blend-mode', randomizer(blendModeArray));
          $(s1 + '.kaleidoscope > div').add(s2  + '.kaleidoscope > div').css(sf);
        } else {
          $(stgSelect + '.kaleidoscope > div').css('background', bankLocation + bankSelectorS1 + '/' + gifSelectorS1 + bgCenter);
          $(stgNotSelected).css('background', bankLocation + bankSelectorS2 + '/' + gifSelectorS2 + bgCenter);
          $('.kaleidoscope').css('mix-blend-mode', randomizer(blendModeArray));
          $(stgSelect + '.kaleidoscope > div').css(sf);
        }
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

    $('body').css('background', 'linear-gradient(' + numRan(360) + 'deg, ' +
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
    if(stgFadeOn) { stgFade(); }
    if(saturateOn) { saturator(); }
    if(sameSameOn) { sameSame(); }
    if(switcherooOn) { switcheroo(); }
    if(hueShiftOn) { hueShift(); }
    if(blurryOn) { blurry(); }
    if(invertOn) { invert(); }

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

  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // *** FX & FILTERS ***
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // FX : KALEIDOSCOPE
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  function buildKaleidoscope() {
    if (stgSelect == "all") {
      $(s1).add(s2).addClass('kaleidoscope')
      .append('<div class="tl" /><div class="tr" /><div class="bl" /><div class="br" />');
    } else {
      $(stgSelect).addClass('kaleidoscope')
      .append('<div class="tl" /><div class="tr" /><div class="bl" /><div class="br" />');
    }
  }

  // FX : ROBOCHOP
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  function roboChop() {

  }

  // FX : STAGE FADE
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    function stgFade() {
      $(s2).fadeOut(beatTime/2, function() {
        $(this).fadeIn(beatTime/2);
      });
    }

  // FX : SAMESAME
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    function sameSame() {

      if(!bankerOn) {
          // console.log('SAMESAME v2');
          $(s1).css('background', bankLocation + bankSelectorS1 + '/' + gifSelectorS1 + bgCenter)
            .css({'background-repeat':'no-repeat', 'background-size':'cover'});
          $(s2).css({
            'background' : bankLocation + bankSelectorS1 + '/' + gifSelectorS1 + bgCenter,
            'background-repeat':'round', 'background-size' : numRan(100) + '%',
            'opacity' : '.75'
          });
          var beatz = beatTime/beatSpeed;
          $(s2).css('animation-duration', beatz * sameSameConstant + 's');
      }
    }

    // FX : SWITCHEROO
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

      function switcheroo() {
        console.log('SWITCHEROO');
      }


  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  // *** FILTERS ***
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  function addFilter(filterNum, filterString) {
    filtersOnString = "";
    filtersOn[filterNum] = filterString;
    filtersOn.forEach(function(element) {
      filtersOnString += element + " ";
    });
  }


  // FILTER FX : SATURATE
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    function saturator() {

      s1SaturatorValue = numRan(saturateAmount);
      s2SaturatorValue = numRan(saturateAmount);
      s1SaturateString = "saturate(" + s1SaturatorValue + ")";
      s2SaturateString = "saturate(" + s2SaturatorValue + ")";

      if (stgSelect == "all") {
        // console.log('FX SATURATOR: STG 1+2');
        // s1SaturateValue = numRan(saturateAmount);
        // s2SaturateValue = numRan(saturateAmount);
        $(s1).css('-webkit-filter',s1SaturateString);
        $(s2).css('-webkit-filter',s2SaturateString);
        // $(s2).css('-webkit-filter','saturate(' + numRan(500) + ')');
      } else {
        // filtersOnString = "";
        // filtersOn[0] = s1SaturateString;
        // filtersOn.forEach(function(element) {
        //   filtersOnString += element + " ";
        // });
        addFilter(0, s1SaturateString)

        $(stgSelect).css('-webkit-filter', filtersOnString);

      }


    }

  // FILTER FX : HUESHIFT
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    function hueShift() {

      s1HueshiftValue = numRan(360);
      s2HueshiftValue = numRan(360);
      s1HueshiftString = "hue-rotate(" + s1HueshiftValue + "deg)";
      s2HueshiftString = "hue-rotate(" + s2HueshiftValue + "deg)";

      if (stgSelect == "all") {
        console.log('FX HUESHIFT: STG 1+2');
        $(s1).css('-webkit-filter', s1HueshiftString);
        $(s2).css('-webkit-filter', s2HueshiftString);
      } else {

        addFilter(1, s1HueshiftString)

        // filtersOnString = "";
        // filtersOn[1] = s1HueshiftString;
        // filtersOn.forEach(function(element) {
        //   filtersOnString += element + " ";
        // });
        $(stgSelect).css('-webkit-filter', filtersOnString);
      }
    }

  // FILTER FX : BLURRY
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    function blurry() {

      s1BlurValue = numRan(blurAmount);
      s2BlurValue = numRan(blurAmount);
      s1BlurString = "blur(" + s1BlurValue + "px)";
      s2BlurString = "blur(" + s2BlurValue + "px)";

      if (stgSelect == "all") {
        console.log('FX BLURRY: STG 1+2');
        $(s1).css('-webkit-filter','blur(' + s1BlurValue + 'px');
        $(s2).css('-webkit-filter','blur(' + s2BlurValue + 'px');
      } else {
        $(stgSelect).css('-webkit-filter','blur(' + numRan(10) + 'px');
        addFilter(2, s1BlurString);
        $(stgSelect).css('-webkit-filter', filtersOnString);

      }

    }

  // FILTER FX : INVERT
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    function invert() {

      s1InvertValue = 1;
      s2InvertValue = 1;
      s1InvertString = "invert(" + s1InvertValue + ")";
      s2InvertString = "invert(" + s2InvertValue + ")";

      if (stgSelect == "all") {
        console.log('FX INVERT: STG 1+2');
        $(s1).css('-webkit-filter','invert(' + s1InvertValue + ')');
        $(s2).css('-webkit-filter','invert(' + s2InvertValue + ')');
      } else {
        $(stgSelect).css('-webkit-filter','invert(1)');
        addFilter(3, s1InvertString);
        $(stgSelect).css('-webkit-filter', filtersOnString);
      }

    }

  /* ---------------------- */

  function clearClass(className) {
    $(stgSelect).alterClass(className);
  }

    $.fn.alterClass = function ( removals, additions ) {
      var self = this;

      if ( removals.indexOf( '*' ) === -1 ) {
        // Use native jQuery methods if there is no wildcard matching
        self.removeClass( removals );
        return !additions ? self : self.addClass( additions );
      }

      var patt = new RegExp( '\\s' +
        removals.
          replace( /\*/g, '[A-Za-z0-9-_]+' ).
          split( ' ' ).
          join( '\\s|\\s' ) +
        '\\s', 'g' );

      self.each( function ( i, it ) {
        var cn = ' ' + it.className + ' ';
        while ( patt.test( cn ) ) {
          cn = cn.replace( patt, ' ' );
        }
        it.className = $.trim( cn );
      });

      return !additions ? self : self.addClass( additions );
    };
