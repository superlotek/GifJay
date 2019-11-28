    function stageUpdate() {
        $('.stage-one').css('backgroundImage', myWindow.$('.stage-one').css('backgroundImage') );
        $('.stage-two').css('backgroundImage', myWindow.$('.stage-two').css('backgroundImage') );
        $('.stage-one').addClass('on');
        $('.stage-two').addClass('on blend');

        $('.scene.hud').css('background', myWindow.$('body').css('backgroundColor'));
        $('.scene.mini .s1-mini').css('backgroundImage', myWindow.$('.stage-one').css('backgroundImage') );
        $('.scene.mini .s2-mini').css('backgroundImage', myWindow.$('.stage-two').css('backgroundImage') );
        $('.scene.mini .s1-mini').css('background-repeat', myWindow.$('.stage-one').css('backgroundRepeat') );
        $('.scene.mini .s2-mini').css('background-repeat', myWindow.$('.stage-two').css('backgroundRepeat') );
        $('#overlays-mini #branding-mini').css('backgroundImage', myWindow.$('.branding.on').css('backgroundImage') );

        var stageRepeatS1 = myWindow.$('.scene .stage-one').css('backgroundRepeat');
        var stageRepeatS2 = myWindow.$('.scene .stage-two').css('backgroundRepeat');

        if (stageRepeatS1 === 'repeat') {
          $(s1).css('backgroundSize', '75%');
          $(s1 + ".solo").css('backgroundSize', '75%');

        } else {
          $(s1).css('backgroundSize', 'cover');
          $(s1 + ".solo").css('backgroundSize', 'cover');
        }

        if (stageRepeatS2 === 'repeat') {
          $(s2).css('backgroundSize', '75%');
          $(s2 + ".solo").css('backgroundSize', '75%');

        } else {
          $(s2).css('backgroundSize', 'cover');
          $(s2 + ".solo").css('backgroundSize', 'cover');
        }

    }

    function updateSceneSize() {
        // $('.scene.mini').css({width: myWindow.innerWidth/2 + 'px', height: myWindow.innerHeight/2 + 'px'});
        // $('.stage-one').css({width: myWindow.innerWidth/3 + 'px', height: myWindow.innerHeight/3 + 'px'});
        // $('.stage-two').css({width: myWindow.innerWidth/3 + 'px', height: myWindow.innerHeight/3 + 'px'});
        $('.scene.mini').css({maxWidth: myWindow.innerWidth + 'px', height: '-webkit-fill-available'});
        $('.stage-one').css({maxWidth: myWindow.innerWidth + 'px', height: '-webkit-fill-available'});
        $('.stage-two').css({maxWidth: myWindow.innerWidth + 'px', height: '-webkit-fill-available'});
    }

    function convertBeatTime(beatTime) {
      var converto = beatTime / 1000;
      return Math.round(converto * 100) / 100 + '<em>s</em>';
    }

    function clearAllFilters() {
      console.log('CLEAR ALL ICON FILTERS');
      if ( $('button.btn-toggle.filter').hasClass('active') ) {
        $(this).toggleClass('active');
      }
    }

    function videoMode() {
      $('#s1-section .stage-one.solo').remove();
      myWindow.$(s1).remove();
      videoModeOn = true;
      video.src = "Bins/_Video/checkeredDance_fx2.mov";

    }
    function gifMode() {
      console.log('GIF MODE IS BACK!');
      video.src = "";
      $('#s1-section .stage-types').append("<div class='stage-one solo' />");
      $('.stage-one.solo').css('background', 'url(Bins/JapaneseAnims/japan_FileAug08123439AM.gif)');

      // $('#s1-section .stage-one.solo').css('background', 'none');
      // myWindow.$(s1).css('background', 'none');
      // videoModeOn = true;
    }


$(document).ready(function() {

  $('button').attr('disabled', true);
  $('button#hud-open').attr('disabled', false);
  $('section, .bank-slider').hide();
  $('.gps-data').html(beatTime/1000 + '<em>s</em>');

    var binLocation = "Bins/";

    $('#hud-start').click(function() { myWindow.Mousetrap.trigger('alt+backspace'); $('button').attr('disabled', false);
            // $('.stage-one').css('backgroundImage', myWindow.$('.stage-one').css('backgroundImage') );
            // $('.stage-two').css('backgroundImage', myWindow.$('.stage-two').css('backgroundImage') );
            stageUpdate(); updateSceneSize(); $('.scene-container').fadeIn(); $('section, .bank-slider').fadeIn();

      });

    $('#hud-scene-flip').click(function() { myWindow.Mousetrap.trigger('space'); stageUpdate(); });
    $('#scene-section').click(function() { myWindow.Mousetrap.trigger('space'); stageUpdate(); });


    var bankSliderUp = false;
    var daHeight = $('.bank-slider').height() - $('#btn-bank-slider').height();

    $('.bank-slider').css('bottom', -daHeight);

    $('#btn-bank-slider, #btn-banker-close').on('click', function() {
        if (!bankSliderUp) {
            $('.bank-slider').animate({bottom: "0", display: 'block'}, 500, function() {
              $('#btn-bank-slider').fadeOut('fast');
            });
            bankSliderUp = true;
        } else {
            $('.bank-slider').animate({bottom: -daHeight + "px", display: 'block'}, 500, function() {
              $('#btn-bank-slider').fadeIn('fast');
            });
            bankSliderUp = false;
        }
    });

    $('#hud-open').click(function() { myWindow = window.open("gifjay.html","hudder","width=700,height=600"); $('#hud-close, #hud-start').attr('disabled', false); $('#hud-start').attr('disabled', false) });
    $('#hud-close').click(function() { myWindow.close(); });

    for ( let i = 0; i < enabledBanksArray.length; i++) {
         $('#banks-container').append('<li><button><img src="' + binLocation + '/' + enabledBanksArray[i].thumbnail + '.gif' + '"/><span>' + enabledBanksArray[i].trigger + '</span></a><p>' + enabledBanksArray[i].name +'</p></button></li>');
    }

     $('#banks-container li').on('click', function(e) {
        e.preventDefault();
          var index = $( "#banks-container li" ).index( this );
          console.log("Bank Trigger: ", enabledBanksArray[index].trigger);
          myWindow.Mousetrap.trigger(enabledBanksArray[index].trigger.toUpperCase());

     });

    for ( let i = 0; i < appz.blendModes.mix.length; i++) {
       $('#blend-modes-selector').append('<option value="' + appz.blendModes.mix[i].name + '">' + appz.blendModes.mix[i].name + '</option>');
    }

    for ( let i = 0; i < appz.overlaySets.length; i++) {
       $('#overlays-selector').append('<option value="' + appz.overlaySets[i].name + '">' + appz.overlaySets[i].name + '</option>');
    }


    $('#blend-modes-selector').on('change', function() {
      var selectedBlend = $("#blend-modes-selector").val();
      var selectedBlendIndex = $("#blend-modes-selector").prop('selectedIndex');

      console.log(selectedBlend);
      console.log(selectedBlendIndex);
      myWindow.$(s2).css('mix-blend-mode', selectedBlend);
      $('.scene.hud .stage-two').css('mix-blend-mode', selectedBlend);
    })

    $('#overlays-selector').on('change', function() {
      var selectedOverlay = $("#overlays-selector").val();
      var selectedOverlayIndex = $("#overlays-selector").prop('selectedIndex');

      myWindow.Mousetrap.trigger('alt+' + selectedOverlayIndex);
      $(ov).toggleClass('on');
    })


     //  $('#effects-section button').on('click', function(e) {
     //    e.preventDefault();
     //      var index = $( "#effects-section button" ).index( this );
     //      console.log("button: ", index);
     //      // $(this).toggleClass('active');
     // });
     //  $('.robomode-container button').on('click', function(e) {
     //    e.preventDefault();
     //      var index = $( ".robomode-container button" ).index( this );
     //      console.log("button: ", index);
     //      $(this).toggleClass('active');
     // });


     $('#hud-s1-toggle').on('click', function() {

        if (myWindow.stageOneOn === 1) {
            $('#hud-s1-toggle').find("use").attr("xlink:href", "gj_interface_icons.svg#icon-blocked");
        } else {
            $('#hud-s1-toggle').find("use").attr("xlink:href", "gj_interface_icons.svg#icon-eyes");
        }

     });

     $('#hud-s2-toggle').on('click', function() {

        if (myWindow.stageTwoOn === 1) {
            $('#hud-s2-toggle').find("use").attr("xlink:href", "gj_interface_icons.svg#icon-blocked");
        } else {
            $('#hud-s2-toggle').find("use").attr("xlink:href", "gj_interface_icons.svg#icon-eyes");
        }

     })

     function showSelectedStage(stage) {
      $('.stage-one.solo, .stage-two.solo').removeClass('glup');
      $(stage).toggleClass('glup');
     }

     function changeRando() {
      // window.opener.$('video')[0].currentSrc
      alert('hi');
     }


      $('button.btn-toggle').on('click', function() {
        $(this).toggleClass('active');
      });


      $('.fader input').on('input', function() {
        console.log('hi');
        var sliderValue = $(this).val() * .01;
        console.log($(this).val());
        $(".scene.hud " + s2 ).css('opacity', sliderValue);
        myWindow.$(s2).css('opacity', sliderValue);

      });



      $('#btn-random-video').click(function() {  myWindow.Mousetrap.trigger('@');  /* Video.randomVideo(); */ });
      $('#btn-video-mode').click(function() { videoMode(); });
      $('#btn-gif-mode').click(function() { gifMode(); });

      $('#btn-banker-select').click(function() { myWindow.Mousetrap.trigger(';'); });
      $('#btn-banker-play-all').click(function() { myWindow.Mousetrap.trigger('ctrl+\''); });
      $('#btn-banker-clear').click(function() { myWindow.Mousetrap.trigger('"'); });

      $('#btn-clear-filters-s1').click(function() { myWindow.Mousetrap.trigger('-'); myWindow.Mousetrap.trigger('~'); clearAllFilters(); });
      $('#btn-clear-filters-s2').click(function() { myWindow.Mousetrap.trigger('='); myWindow.Mousetrap.trigger('~'); clearAllFilters(); });


      $('#btn-set-gps').click(function() { myWindow.Mousetrap.trigger('return'); });
      $('#btn-robomode').click(function() { myWindow.Mousetrap.trigger('\''); });
      $('#btn-bartender').click(function() { myWindow.Mousetrap.trigger('\\'); });
      $('#hud-gps-fast').click(function() { myWindow.Mousetrap.trigger(','); });
      $('#hud-gps-slow').click(function() { myWindow.Mousetrap.trigger('/'); });
      $('#hud-gps-burst').click(function() { myWindow.Mousetrap.trigger('.'); });

      $('#hud-invert-s1').click(function() { myWindow.Mousetrap.trigger('-'); myWindow.Mousetrap.trigger('7'); });
      $('#hud-saturation-s1').click(function() { myWindow.Mousetrap.trigger('-'); myWindow.Mousetrap.trigger('8'); });
      $('#hud-hueRotate-s1').click(function() { myWindow.Mousetrap.trigger('-'); myWindow.Mousetrap.trigger('9'); });
      $('#hud-blur-s1').click(function() { myWindow.Mousetrap.trigger('-'); myWindow.Mousetrap.trigger('0'); });

      $('#hud-invert-s2').click(function() { myWindow.Mousetrap.trigger('='); myWindow.Mousetrap.trigger('7'); });
      $('#hud-saturation-s2').click(function() { myWindow.Mousetrap.trigger('='); myWindow.Mousetrap.trigger('8'); });
      $('#hud-hueRotate-s2').click(function() { myWindow.Mousetrap.trigger('='); myWindow.Mousetrap.trigger('9'); });
      $('#hud-blur-s2').click(function() { myWindow.Mousetrap.trigger('='); myWindow.Mousetrap.trigger('0'); });

      $('#hud-kaleidoscope').click(function() { myWindow.Mousetrap.trigger('1'); });
      $('#hud-mutator').click(function() { myWindow.Mousetrap.trigger('2'); });
      $('#hud-samesame').click(function() { myWindow.Mousetrap.trigger('3'); $('.stage-two').toggleClass('same-same'); });
      $('#hud-stageFader').click(function() { myWindow.Mousetrap.trigger('4'); });

      $('#hud-s1-toggle').click(function() { myWindow.Mousetrap.trigger('_'); $('.stage-one').toggleClass('on'); $('.stage-one').toggleClass('off'); });
      $('#hud-s2-toggle').click(function() { myWindow.Mousetrap.trigger('+'); $('.stage-two').toggleClass('on'); $('.stage-two').toggleClass('off'); });

      $('#btn-auto-overlay').click(function() { myWindow.Mousetrap.trigger('!'); });
      $('#btn-overlay-reset').click(function() { myWindow.Mousetrap.trigger('alt+1'); });


      $('#hud-s1-select').click(function() { myWindow.Mousetrap.trigger('-'); showSelectedStage('.stage-one.mini'); });
      $('#hud-s2-select').click(function() { myWindow.Mousetrap.trigger('='); showSelectedStage('.stage-two.mini'); });

      
      $('.stage-one.solo').click(function() { myWindow.Mousetrap.trigger('-'); showSelectedStage(this); });
      $('.stage-two.solo').click(function() { myWindow.Mousetrap.trigger('='); showSelectedStage(this); });

      $('#hud-blendMode').click(function() { myWindow.Mousetrap.trigger('alt+,'); });
      $('#hud-blendModeSwitcher').click(function() { myWindow.Mousetrap.trigger('alt+.'); });
      $('#hud-random-blend').click(function() { myWindow.Mousetrap.trigger('alt+/'); });

      $('#hud-stageSelectAll').click(function() { myWindow.Mousetrap.trigger('backspace'); });

      $('#hud-fullscreen').click(function() { myWindow.Mousetrap.trigger('['); });

});