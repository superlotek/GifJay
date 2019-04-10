// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** EFFECTS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Effects = {

  fxChecker() {
      // CHECK FOR KALEIDOSCOPE
      if (kaleidoscopeOn) {
        console.log('KALEIDOSCOPE IS RUNNING');
        if (stgSelect == 'all') {
          $(s1 + '.kaleidoscope > div').css('background', bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter);
          $(s2 + '.kaleidoscope > div').css('background', bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter);
          $(s2).css('background', 'none !important');
          $(s2 + '.kaleidoscope').css('mix-blend-mode', Init.randomizer(appz.blendModeArray));
          $(s1 + '.kaleidoscope > div').add(s2  + '.kaleidoscope > div').css(sf);
        } else {
          $(stgSelect + '.kaleidoscope > div').css('background', bankLocation + gifSelectorS1.location + gifSelectorS1.gif + bgCenter);
          $(stgNotSelected).css('background', bankLocation + gifSelectorS2.location + gifSelectorS2.gif + bgCenter);
          $('.kaleidoscope').css('mix-blend-mode', Init.randomizer(appz.blendModeArray));
          $(stgSelect + '.kaleidoscope > div').css(sf);
        }
      }
  },

  // FX : KALEIDOSCOPE
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  buildKaleidoscope() {
    if (stgSelect == "all") {
      $(s1).add(s2).addClass('kaleidoscope')
      .append('<div class="tl" /><div class="tr" /><div class="bl" /><div class="br" />');
    } else {
      $(stgSelect).addClass('kaleidoscope')
      .append('<div class="tl" /><div class="tr" /><div class="bl" /><div class="br" />');
    }
  },

  // FX : STAGE FADE
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    stgFade() {
      $(s2).fadeOut(beatTime/2, function() {
        $(this).fadeIn(beatTime/2);
      });
    },

  // FX : SAMESAME
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    sameSame() {
      // if(!bankerOn) {
          // console.log('SAMESAME v2');
          $(s1).css('background', bankLocation + bankSelectorS1 + '/' + gifSelectorS1 + bgCenter)
            .css({'background-repeat':'no-repeat', 'background-size':'cover'});
          $(s2).css({
            'background' : bankLocation + bankSelectorS1 + '/' + gifSelectorS1 + bgCenter,
            'background-repeat':'round', 'background-size' : Init.numRan(100) + '%',
            'opacity' : '.75'
          });
          var beatz = beatTime/appz.beatSpeed;
          $(s2).css('animation-duration', beatz * appz.sameSameConstant + 's');
      // }
    },

  // FX : MUTATOR
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

    mutator() {
      var durpo = [s1, s2, 'all'];

      if (mutatorOn) {
        console.log('MUTATOR RUNNING');
        stgSelect = Init.randomizer(durpo);
        console.log(stgSelect);
        Math.random(1) > 0.5 ? Mousetrap.trigger('1') : null;
        Math.random(1) > 0.5 ? Mousetrap.trigger('4') : null;
        Math.random(1) > 0.5 ? Mousetrap.trigger('3') : null;
        Math.random(1) > 0.5 ? Mousetrap.trigger('6') : null;
        Math.random(1) > 0.5 ? Mousetrap.trigger('7') : null;
        Math.random(1) > 0.5 ? Mousetrap.trigger('8') : null;
        Math.random(1) > 0.5 ? Mousetrap.trigger('9') : null;
        Math.random(1) > 0.5 ? Mousetrap.trigger('[') : null;
      } else {
        console.log('MUTATOR TURNING DOWN');
        if (kaleidoscopeOn) { console.log('kALEID');Mousetrap.trigger('1') }
        if (sameSameOn) { console.log('SAMESAME');Mousetrap.trigger('3') }
        if (stgFadeOn) { console.log('STFFADE');Mousetrap.trigger('4') }
        return;
      }
    }
};
