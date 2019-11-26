    function stageUpdate() {
        $('.stage-one').css('backgroundImage', myWindow.$('.stage-one').css('backgroundImage') );
        $('.stage-two').css('backgroundImage', myWindow.$('.stage-two').css('backgroundImage') );
        $('.scene.mini').css('background', myWindow.$('body').css('backgroundColor'));
        $('.scene.mini .stage-one-mini').css('backgroundImage', myWindow.$('.stage-one').css('backgroundImage') );
        $('.scene.mini .stage-two-mini').css('backgroundImage', myWindow.$('.stage-two').css('backgroundImage') );
        $('.scene.mini .stage-one-mini').css('background-repeat', myWindow.$('.stage-one').css('backgroundRepeat') );
        $('.scene.mini .stage-two-mini').css('background-repeat', myWindow.$('.stage-two').css('backgroundRepeat') );
        $('#overlays-mini #branding-mini').css('backgroundImage', myWindow.$('.branding.on').css('backgroundImage') );
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
      return Math.round(converto * 100) / 100 + 's';
    }


$(document).ready(function() {

    var binLocation = "Bins/";

    $('#hud-start').click(function() { myWindow.Mousetrap.trigger('alt+backspace'); $('button').attr('disabled', false);
            // $('.stage-one').css('backgroundImage', myWindow.$('.stage-one').css('backgroundImage') );
            // $('.stage-two').css('backgroundImage', myWindow.$('.stage-two').css('backgroundImage') );
            stageUpdate(); updateSceneSize(); $('.scene-container').fadeIn();
      });

    $('#hud-stageFlip').click(function() { myWindow.Mousetrap.trigger('space'); stageUpdate(); });
    $('#scene').click(function() { myWindow.Mousetrap.trigger('space'); stageUpdate(); });


    var bankSliderUp = false;
    var daHeight = $('.bank-slider').height() - $('.bank-slider h3').height();

    $('.bank-slider').css('bottom', -daHeight);

    $('#btn-bankSlider, #hud-banker').on('click', function() {
        if (!bankSliderUp) {
            $('.bank-slider').animate({bottom: "0", display: 'block'}, 500, function() {
            });
            bankSliderUp = true;
        } else {


            $('.bank-slider').animate({bottom: -daHeight + "px", display: 'block'}, 500, function() {
            });
            bankSliderUp = false;
        }
    });

    $('#hud-open').click(function() { myWindow = window.open("gifjay.html","hudder","width=700,height=600"); $('#hud-close, #hud-start').attr('disabled', false); $('#hud-start').attr('disabled', false) });
    $('#hud-close').click(function() { myWindow.close(); });

    for ( let i = 0; i < enabledBanksArray.length; i++) {
         $('#banks-container').append('<li><a href><img src="' + binLocation + '/' + enabledBanksArray[i].thumbnail + '.gif' + '"/><span>' + enabledBanksArray[i].trigger + '</span></a><p>' + enabledBanksArray[i].name +'</p></li>');
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
    })

    $('#overlays-selector').on('change', function() {
      var selectedOverlay = $("#overlays-selector").val();
      var selectedOverlayIndex = $("#overlays-selector").prop('selectedIndex');

      myWindow.Mousetrap.trigger('alt+' + selectedOverlayIndex);;
    })


      $('#effects-section button').on('click', function(e) {
        e.preventDefault();
          var index = $( "#effects-section button" ).index( this );
          console.log("button: ", index);
          $(this).toggleClass('active');
     });
     //  $('.robomode-container button').on('click', function(e) {
     //    e.preventDefault();
     //      var index = $( ".robomode-container button" ).index( this );
     //      console.log("button: ", index);
     //      $(this).toggleClass('active');
     // });


     $('#hud-stageOneToggle').on('click', function() {

        if (myWindow.stageOneOn === 1) {
            $('#hud-stageOneToggle').find("use").attr("xlink:href", "test.svg#icon-blocked");
        } else {
            $('#hud-stageOneToggle').find("use").attr("xlink:href", "test.svg#icon-eyes");
        }

     });

     $('#hud-stageTwoToggle').on('click', function() {

        if (myWindow.stageTwoOn === 1) {
            $('#hud-stageTwoToggle').find("use").attr("xlink:href", "test.svg#icon-blocked");
        } else {
            $('#hud-stageTwoToggle').find("use").attr("xlink:href", "test.svg#icon-eyes");
        }

     })

     function showSelectedStage(stage) {
      $('.stage-one.mini, .stage-two.mini').removeClass('glup');
      $(stage).toggleClass('glup');
     }


      $('#hud-setGPS').click(function() { myWindow.Mousetrap.trigger('return'); });
      $('#hud-robomode').click(function() { myWindow.Mousetrap.trigger('\''); $(this).toggleClass('active'); });
      $('#hud-GPSFast').click(function() { myWindow.Mousetrap.trigger(','); });
      $('#hud-GPSSlow').click(function() { myWindow.Mousetrap.trigger('/'); });
      $('#hud-GPSBurst').click(function() { myWindow.Mousetrap.trigger('.'); $(this).toggleClass('active'); });

      $('#hud-invert').click(function() { myWindow.Mousetrap.trigger('7'); });
      $('#hud-saturation').click(function() { myWindow.Mousetrap.trigger('8'); });
      $('#hud-hueRotate').click(function() { myWindow.Mousetrap.trigger('9'); });
      $('#hud-blur').click(function() { myWindow.Mousetrap.trigger('0'); });

      $('#hud-kaleidoscope').click(function() { myWindow.Mousetrap.trigger('1'); });
      $('#hud-mutator').click(function() { myWindow.Mousetrap.trigger('2'); });
      $('#hud-samesame').click(function() { myWindow.Mousetrap.trigger('3'); });
      $('#hud-stageFader').click(function() { myWindow.Mousetrap.trigger('4'); });

      $('#hud-stageOneToggle').click(function() { myWindow.Mousetrap.trigger('_'); });
      $('#hud-stageTwoToggle').click(function() { myWindow.Mousetrap.trigger('+'); });

      $('#hud-stageOneSelect').click(function() { myWindow.Mousetrap.trigger('-'); showSelectedStage('.stage-one.mini'); });
      $('#hud-stageTwoSelect').click(function() { myWindow.Mousetrap.trigger('='); showSelectedStage('.stage-two.mini'); });
      $('.stage-one.mini').click(function() { myWindow.Mousetrap.trigger('-'); showSelectedStage(this); });
      $('.stage-two.mini').click(function() { myWindow.Mousetrap.trigger('='); showSelectedStage(this); });

      $('#hud-blendMode').click(function() { myWindow.Mousetrap.trigger('alt+,'); });
      $('#hud-blendModeSwitcher').click(function() { myWindow.Mousetrap.trigger('alt+.'); });
      $('#hud-blendModeRandom').click(function() { myWindow.Mousetrap.trigger('alt+/'); });

      $('#hud-stageSelectAll').click(function() { myWindow.Mousetrap.trigger('backspace'); });

      $('#hud-fullscreen').click(function() { myWindow.Mousetrap.trigger('['); });

});