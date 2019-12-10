  
    function stageUpdate() {
        $('.stage-one').css('backgroundImage', gj.$('.stage-one').css('backgroundImage') );
        $('.stage-two').css('backgroundImage', gj.$('.stage-two').css('backgroundImage') );
        $('.stage-one').addClass('on');
        $('.stage-two').addClass('on blend');

        $('.scene.hud').css('background', gj.$('body').css('backgroundColor'));
        $('.scene.mini .s1-mini').css('backgroundImage', gj.$('.stage-one').css('backgroundImage') );
        $('.scene.mini .s2-mini').css('backgroundImage', gj.$('.stage-two').css('backgroundImage') );
        $('.scene.mini .s1-mini').css('background-repeat', gj.$('.stage-one').css('backgroundRepeat') );
        $('.scene.mini .s2-mini').css('background-repeat', gj.$('.stage-two').css('backgroundRepeat') );
        $('#overlays-mini #branding-mini').css('backgroundImage', gj.$('.branding.on').css('backgroundImage') );

        var stageRepeatS1 = gj.$('.scene .stage-one').css('backgroundRepeat');
        var stageRepeatS2 = gj.$('.scene .stage-two').css('backgroundRepeat');

        if (stageRepeatS1 === 'repeat') {
          $(s1).css('backgroundSize', '50%');
          $(s1 + ".solo").css('backgroundSize', '50%');

        } else {
          $(s1).css('backgroundSize', 'cover');
          $(s1 + ".solo").css('backgroundSize', 'cover');
        }

        if (stageRepeatS2 === 'repeat') {
          $(s2).css('backgroundSize', '50%');
          $(s2 + ".solo").css('backgroundSize', '50%');

        } else {
          $(s2).css('backgroundSize', 'cover');
          $(s2 + ".solo").css('backgroundSize', 'cover');
        }

    }

    function updateSceneSize() {
      console.log('Update Scene Sizes')
      var sceneMiniWidth = $('#scene-section').width();
      var sceneMiniHeight = $('#scene-section').height();

      var stageMiniWidth = $('#s1-section .stage-types').width();
      var stageMiniHeight = $('#s1-section .stage-types').height();

      var sceneExternalWidth = gj.innerWidth;
      var sceneExternalHeight = gj.innerHeight;

      var sceneWidthDifference = sceneMiniWidth / sceneExternalWidth;
      var sceneHeightDifference = sceneMiniHeight / sceneExternalHeight;

      var stageWidthDifference = stageMiniWidth / sceneExternalWidth;


      var ratioPercentage = sceneExternalWidth / sceneExternalHeight

      // console.log("Scene Mini Dimensions ", sceneMiniWidth, sceneMiniHeight);
      // console.log("Stage Mini Dimensions ", stageMiniWidth, stageMiniHeight);
      // console.log("Scene External Dimensions ", sceneExternalWidth, sceneExternalHeight);

      // console.log("Scene Dimension Differences", sceneWidthDifference, sceneHeightDifference);
      // console.log("ratio Percentage", ratioPercentage);

      let sceneContainerHeight = $('#scene-section .stage-types').height();
      let stageSceneHeight = $('#scene-section .stage-one').height();
      let sceneContainerPadding = (sceneContainerHeight - stageSceneHeight) / 2;
      $('#scene-section .stage-one, #scene-section .stage-two, #scene-section .video-container, #scene-section .branding').css('top', sceneContainerPadding);
      
      let stageContainerHeight = $('#s1-section .stage-types').height();
      let stageHeight = $('#s1-section .stage-one').height();
      let stageContainerPadding = (stageContainerHeight - stageHeight) / 2;
      $('#s1-section .stage-one, #s2-section .stage-two, #s1-section .video-container').css('top', stageContainerPadding);

      // if (gj.innerWidth >= $('#scene-section .stage-one').width() ) {
      //   $('#scene-section .stage-one').width();
      //   return false;
      // }

        $('#scene-section .stage-one, #scene-section .stage-two').css({width: gj.innerWidth * sceneWidthDifference + 'px', height: (gj.innerHeight / ratioPercentage) * sceneHeightDifference + 'px'});
        $('#s1-section .stage-one').css({width: gj.innerWidth * stageWidthDifference + 'px', height: gj.innerHeight * stageWidthDifference + 'px'});
        $('#s2-section .stage-two').css({width: gj.innerWidth * stageWidthDifference + 'px', height: gj.innerHeight * stageWidthDifference  + 'px'});
        $('.stage-video').css({width: gj.innerWidth * stageWidthDifference + 'px', height: gj.innerHeight * stageWidthDifference + 'px'});
        $('#scene-section .stage-video').css({width: gj.innerWidth * sceneWidthDifference + 'px', height: (gj.innerHeight / ratioPercentage) * sceneHeightDifference + 'px'});
        $('#overlays .branding').css({width: gj.innerWidth * sceneWidthDifference + 'px', height: (gj.innerHeight / ratioPercentage) * sceneHeightDifference + 'px'});
    }

    function convertBeatTime(beatTime) {
      var converto = beatTime / 1000;
      return Math.round(converto * 100) / 100 + '<em>s</em>';
    }

    function clearAllFilters(stage) {
      console.log('CLEAR ALL ICON FILTERS');
      if ( $('button.btn-toggle.filter').hasClass('active') ) {
        $('#btn-invert-' + stage).removeClass('active');
        $('#btn-saturation-' + stage).removeClass('active');
        $('#btn-hue-rotate-' + stage).removeClass('active');
        $('#btn-blur-' + stage).removeClass('active');
        $(this).removeClass('active');
      } else {

      }
    }

    function videoInternalSwitcher(randomDuration) {
      videoInternal[0].currentTime = randomDuration;
      videoInternal[1].currentTime = randomDuration;
    }

    function videoMode() {
      console.log('VIDEO MODE: ON');
      $('#btn-video-mode').addClass('active');
      $('#btn-gif-mode').removeClass('active');

      videoModeOn = true;
      $('.stage-video').toggleClass('on');
      gj.$('#stage-video').addClass('on');

      $('#s1-section .stage-one.solo').remove();
      gj.$(s1).remove();
      $('.scene.hud ' + s1).remove();

      gj.Mousetrap.trigger('@');

    }

    function gifMode() {
      console.log('GIF MODE: ON');
      videoModeOn = false;
      $('#btn-video-mode').removeClass('active');
      $('#btn-gif-mode').addClass('active');
      videoInternal[0].src = "";
      videoInternal[1].src = "";

      $('#s1-section .stage-types').append("<div class='stage-one solo' />");
      $("<div class='stage-one' />").insertBefore("#scene-section .stage-types .stage-two");

      // gj.$('.stage-types').append("<div class='stage-one' />");
      gj.$("<div class='stage-one on' />").insertBefore(".stage-types .stage-two");
      gj.$('.video-container video').attr('src', "");
      gj.Mousetrap.trigger('space');
      // $('.stage-one.solo').css('background', 'url(Bins/JapaneseAnims/japan_FileAug08123439AM.gif)');

      $('#s1-section .stage-one').height($('#s2-section .stage-two').height());
      $('#s1-section .stage-one').css('top', $('#s2-section .stage-two').css('top'));

      $('#scene-section .stage-one').height($('#scene-section .stage-two').height());
      $('#scene-section .stage-one').css('top', $('#scene-section .stage-two').css('top'));


    }

$(document).ready(function() {

  $('button').attr('disabled', true);
  $('button#hud-open').attr('disabled', false);
  $('section, .bank-slider').hide();
  $('.gps-data').html(beatTime/1000 + '<em>s</em>');

    var binLocation = "Bins/";

    $('#hud-start').click(function() { gj.Mousetrap.trigger('alt+backspace'); $('button').attr('disabled', false);
            // $('.stage-one').css('backgroundImage', gj.$('.stage-one').css('backgroundImage') );
            // $('.stage-two').css('backgroundImage', gj.$('.stage-two').css('backgroundImage') );
            stageUpdate(); updateSceneSize(); $('.scene-container').fadeIn(); $('section, .bank-slider').fadeIn();

      });

    $('#btn-scene-flip').click(function() { gj.Mousetrap.trigger('space'); stageUpdate(); });
    $('#scene-section').click(function() { gj.Mousetrap.trigger('space'); stageUpdate(); });


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

    $('#hud-open').click(function() { gj = window.open("gifjay.html","hudder","width=700,height=600"); $('#hud-close, #hud-start').attr('disabled', false); $('#hud-start').attr('disabled', false) });
    $('#hud-close').click(function() { gj.close(); });



    // BANKER
    // ++++++++++++++++++++++++++++

    for ( let i = 0; i < enabledBanksArray.length; i++) {
         $('#banks-container').append('<li><img src="' + binLocation + '/' + enabledBanksArray[i].thumbnail + '.gif' + '"/><span>' + enabledBanksArray[i].trigger + '</span></a><p>' + enabledBanksArray[i].name +'</p></li>');
    }

     $('#banks-container li').on('click', function(e) {
          var index = $( "#banks-container li" ).index( this );
          console.log("Bank Trigger: ", enabledBanksArray[index].trigger);
          $(this).toggleClass('active');
          // Mousetrap.trigger(enabledBanksArray[index].trigger.toUpperCase());
          gj.bankerArray.push([enabledBanksArray[index].id]);
     });

    // OVERLAYS
    // ++++++++++++++++++++++++++++

    for ( let i = 0; i < overlaysArray.length; i++) {
       $('#overlays-selector').append('<option value="' + overlaysArray[i].name + '">' + overlaysArray[i].name + '</option>');
    }

    $('#overlays-selector').on('change', function() {
      var selectedOverlay = $("#overlays-selector").val();
      var selectedOverlayIndex = $("#overlays-selector").prop('selectedIndex');

      console.log(selectedOverlay);
      console.log(selectedOverlayIndex);

      gj.Mousetrap.trigger('alt+' + selectedOverlayIndex);
      $(ov).toggleClass('on');
    })

    // BLEND MODES
    // ++++++++++++++++++++++++++++

    for ( let i = 0; i < blendModesArray.length; i++) {
       $('#blend-modes-selector').append('<option value="' + blendModesArray[i].name + '">' + blendModesArray[i].name + '</option>');
    }

    $('#blend-modes-selector').on('change', function() {
      var selectedBlend = $("#blend-modes-selector").val();
      var selectedBlendIndex = $("#blend-modes-selector").prop('selectedIndex');

      console.log(selectedBlend);
      console.log(selectedBlendIndex);
      gj.$(s2).css('mix-blend-mode', selectedBlend);
      $('.scene.hud .stage-two').css('mix-blend-mode', selectedBlend);
    })


     $('#btn-s1-toggle').on('click', function() {

        if (gj.stageOneOn === 1) {
            $('#btn-s1-toggle').find("use").attr("xlink:href", "gj_interface_icons.svg#icon-blocked");
        } else {
            $('#btn-s1-toggle').find("use").attr("xlink:href", "gj_interface_icons.svg#icon-eyes");
        }

     });

     $('#btn-s2-toggle').on('click', function() {

        if (gj.stageTwoOn === 1) {
            $('#btn-s2-toggle').find("use").attr("xlink:href", "gj_interface_icons.svg#icon-blocked");
        } else {
            $('#btn-s2-toggle').find("use").attr("xlink:href", "gj_interface_icons.svg#icon-eyes");
        }

     })

     function showSelectedStage(stage) {
      $('.stage-one.solo, .stage-two.solo').removeClass('glup');
      $(stage).toggleClass('glup');
     }

    // VIDEO PLAYLIST 
    // ++++++++++++++++++++++++++++

    videosArray = playlist.video.filter(function(video) {
      return video.enabled === true;
    });

    for ( let i = 0; i < videosArray.length; i++) {
       $('#video-list ul').append('<li>' + videosArray[i].name + '</li>');
    }

    $('#video-list li').click(function() {
      videoIndex = $(this).index();

      gj.externalVideoIndex = videoIndex;
      externalVideoIndex = videoIndex;

      // gj.Video.randomVideo(videoIndex);
      // myIndex(videoIndex);
      // gj.videoIndex = videoIndex;
      console.log(videoIndex);
      // getVideoIndex(videoIndex)
      // myWindow.videoIndex = videoIndex;
      // Video.randomVideo(videoIndex);
    })



      $('button.btn-toggle').on('click', function() {
        $(this).toggleClass('active');
      });


      $('.fader input').on('input', function() {
        var sliderValue = $(this).val() * .01;
        // console.log($(this).val());
        $(".scene.hud " + s2 ).css('opacity', sliderValue);
        gj.$(s2).css('opacity', sliderValue);
      });

      var speedSlider = document.getElementById("gps-speed-slider");

      $('.edit-pane').click(function() {
      });

      $('#btn-random-video').click(function() {  gj.Mousetrap.trigger('@');  /* Video.randomVideo(); */ });
      $('#btn-video-mode').click(function() { videoMode(); });
      $('#btn-gif-mode').click(function() { gifMode(); });

      $('#btn-video-jump').click(function() { Mousetrap.trigger('#') } );

      $('#btn-banker-select').click(function() { gj.Mousetrap.trigger(';'); });
      $('#btn-banker-play-all').click(function() { gj.Mousetrap.trigger('ctrl+\''); });
      $('#btn-banker-clear').click(function() {
        gj.Mousetrap.trigger('"');
        $('#banks-container li').removeClass('active');
      });

      $('#btn-clear-filters-s1').click(function() { gj.Mousetrap.trigger('-'); gj.Mousetrap.trigger('~'); clearAllFilters('s1'); });
      $('#btn-clear-filters-s2').click(function() { gj.Mousetrap.trigger('='); gj.Mousetrap.trigger('~'); clearAllFilters('s2'); });

      $('#btn-scene-freeze').click(function() { gj.Mousetrap.trigger(']'); });
      $('#btn-set-gps').click(function() { gj.Mousetrap.trigger('return'); });
      $('#btn-robomode').click(function() { gj.Mousetrap.trigger('\''); });
      $('#btn-bartender').click(function() { gj.Mousetrap.trigger('\\'); });
      $('#btn-gps-fast').click(function() { gj.Mousetrap.trigger(','); speedSlider.stepDown(1); });
      $('#btn-gps-slow').click(function() { gj.Mousetrap.trigger('/'); speedSlider.stepUp(1); });

        $('#btn-gps-burst').click(function() {
          if (gj.robomodeOn === 1) {
            gj.Mousetrap.trigger('.'); $(this).toggleClass('burst'); doStuff(beatTime);
          }
       });

        function doStuff() {
          $('#btn-gps-burst').css('animation-duration', (gj.beatTime/1000) + 's');
        }

      $('#btn-invert-s1').click(function() { gj.Mousetrap.trigger('-'); gj.Mousetrap.trigger('7'); });
      $('#btn-saturation-s1').click(function() { gj.Mousetrap.trigger('-'); gj.Mousetrap.trigger('8'); });
      $('#btn-hue-rotate-s1').click(function() { gj.Mousetrap.trigger('-'); gj.Mousetrap.trigger('9'); });
      $('#btn-blur-s1').click(function() { gj.Mousetrap.trigger('-'); gj.Mousetrap.trigger('0'); });

      $('#btn-invert-s2').click(function() { gj.Mousetrap.trigger('='); gj.Mousetrap.trigger('7'); });
      $('#btn-saturation-s2').click(function() { gj.Mousetrap.trigger('='); gj.Mousetrap.trigger('8'); });
      $('#btn-hue-rotate-s2').click(function() { gj.Mousetrap.trigger('='); gj.Mousetrap.trigger('9'); });
      $('#btn-blur-s2').click(function() { gj.Mousetrap.trigger('='); gj.Mousetrap.trigger('0'); });

      $('#btn-kaleidoscope').click(function() { gj.Mousetrap.trigger('1'); });
      $('#btn-mutator').click(function() { gj.Mousetrap.trigger('2'); });
      $('#btn-samesame').click(function() { gj.Mousetrap.trigger('3'); $('.stage-two').toggleClass('same-same'); });
      $('#btn-stageFader').click(function() { gj.Mousetrap.trigger('4'); });

      $('#btn-s1-toggle').click(function() {
        gj.Mousetrap.trigger('_');
        $('.stage-one, .stage-video').toggleClass('on').toggleClass('off');
        gj.$('#stage-video').toggleClass('on').toggleClass('off');
      });
      
      $('#btn-banker-s1').click(function() { gj.Mousetrap.trigger('alt+\''); gj.Mousetrap.trigger('-') });
      $('#btn-banker-s2').click(function() { gj.Mousetrap.trigger('=') });

      $('#btn-s2-toggle').click(function() { gj.Mousetrap.trigger('+'); $('.stage-two').toggleClass('on'); $('.stage-two').toggleClass('off'); });

      $('#btn-auto-overlay').click(function() { gj.Mousetrap.trigger('!'); });
      $('#btn-overlay-reset').click(function() { gj.Mousetrap.trigger('alt+1'); });


      $('#btn-s1-select').click(function() { gj.Mousetrap.trigger('-'); showSelectedStage('.stage-one.mini'); });
      $('#btn-s2-select').click(function() { gj.Mousetrap.trigger('='); showSelectedStage('.stage-two.mini'); });

      
      $('.stage-one.solo').click(function() { gj.Mousetrap.trigger('-'); showSelectedStage(this); });
      $('.stage-two.solo').click(function() { gj.Mousetrap.trigger('='); showSelectedStage(this); });

      $('#hud-blendMode').click(function() { gj.Mousetrap.trigger('alt+,'); });
      $('#hud-blendModeSwitcher').click(function() { gj.Mousetrap.trigger('alt+.'); });
      $('#btn-random-blend').click(function() { gj.Mousetrap.trigger('alt+/'); });

      $('#hud-stageSelectAll').click(function() { gj.Mousetrap.trigger('backspace'); });

      $('#btn-fullscreen').click(function() { gj.Mousetrap.trigger('['); });

});