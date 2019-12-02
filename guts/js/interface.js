  
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

      var sceneMiniWidth = $('#scene-section').width();
      var sceneMiniHeight = $('#scene-section').height();

      var stageMiniWidth = $('#s1-section .stage-types').width();
      var stageMiniHeight = $('#s1-section .stage-types').height();

      var sceneExternalWidth = myWindow.innerWidth;
      var sceneExternalHeight = myWindow.innerHeight;

      var sceneWidthDifference = sceneMiniWidth / sceneExternalWidth;
      var sceneHeightDifference = sceneMiniHeight / sceneExternalHeight;

      var stageWidthDifference = stageMiniWidth / sceneExternalWidth;


      var ratioPercentage = sceneExternalWidth / sceneExternalHeight

      console.log("Scene Mini Dimensions ", sceneMiniWidth, sceneMiniHeight);
      console.log("Stage Mini Dimensions ", stageMiniWidth, stageMiniHeight);
      console.log("Scene External Dimensions ", sceneExternalWidth, sceneExternalHeight);

      console.log("Scene Dimension Differences", sceneWidthDifference, sceneHeightDifference);
      console.log("ratio Percentage", ratioPercentage);

      // if (myWindow.innerWidth >= $('#scene-section .stage-one').width() ) {
      //   $('#scene-section .stage-one').width();
      //   return false;
      // }

        $('#scene-section .stage-one, #scene-section .stage-two').css({width: myWindow.innerWidth * sceneWidthDifference + 'px', height: (myWindow.innerHeight / ratioPercentage) * sceneHeightDifference + 'px'});
        $('#s1-section .stage-one').css({width: myWindow.innerWidth * stageWidthDifference + 'px', height: myWindow.innerHeight * stageWidthDifference + 'px'});
        $('#s2-section .stage-two').css({width: myWindow.innerWidth * stageWidthDifference + 'px', height: myWindow.innerHeight * stageWidthDifference  + 'px'});
        $('.stage-video').css({width: myWindow.innerWidth * stageWidthDifference + 'px', height: myWindow.innerHeight * stageWidthDifference + 'px'});
        $('#scene-section .stage-video').css({width: myWindow.innerWidth * sceneWidthDifference + 'px', height: (myWindow.innerHeight / ratioPercentage) * sceneHeightDifference + 'px'});
        $('#overlays .branding').css({width: myWindow.innerWidth * sceneWidthDifference + 'px', height: (myWindow.innerHeight / ratioPercentage) * sceneHeightDifference + 'px'});


        // $('.scene.mini').css({maxWidth: myWindow.innerWidth + 'px', height: '-webkit-fill-available'});
        // $('.stage-one').css({maxWidth: myWindow.innerWidth + 'px', height: '-webkit-fill-available'});
        // $('.stage-two').css({maxWidth: myWindow.innerWidth + 'px', height: '-webkit-fill-available'});
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

    function videoMode() {
      console.log('VIDEO MODE: ON');
      videoModeOn = true;

      $('#s1-section .stage-one.solo').remove();
      myWindow.$(s1).remove();
      $('.scene.hud ' + s1).remove();

      videoInternal[0].src = "Bins/_Video/checkeredDance_fx2.mov";
      videoInternal[1].src = "Bins/_Video/checkeredDance_fx2.mov";
      // myWindow.videoExternal.src = "Bins/_Video/checkeredDance_fx2.mov";

      // myWindow.$('.stage-video').src = "Bins/_Video/checkeredDance_fx2.mov";
      // $('.scene.hud ').attr('src', "Bins/_Video/checkeredDance_fx2.mov");

    }
    function gifMode() {
      videoModeOn = false;

      console.log('GIF MODE: ON');
      video.src = "";
      $('#s1-section .stage-types').append("<div class='stage-one solo' />");
      $('.stage-one.solo').css('background', 'url(Bins/JapaneseAnims/japan_FileAug08123439AM.gif)');

      // $('#s1-section .stage-one.solo').css('background', 'none');
      // myWindow.$(s1).css('background', 'none');
      // videoModeOn = true;
    }

      // $('#edit-filter-slider').on('input', function() {
      //   console.log('hi');
      // })


$(document).ready(function() {

      $('#edit-filter-slider').on('input', function() {
        // console.log('hi');
        // console.log($('#saturation-slider').val());
        var daVal = $('#saturation-slider').val();
        $('.stage-one.solo').css('filter', 'saturate(' + daVal + ')');
      })


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
         $('#banks-container').append('<li><img src="' + binLocation + '/' + enabledBanksArray[i].thumbnail + '.gif' + '"/><span>' + enabledBanksArray[i].trigger + '</span></a><p>' + enabledBanksArray[i].name +'</p></li>');
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
      console.log('changeRando function called');
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


      // $('#hud-saturation-s1').hover(function() {
      //   $('.btn-edit-filter').fadeIn();
      //   // $(this).attr('disabled', true);
      // },
      // function() {
      //   $('.btn-edit-filter').fadeOut();
      //   // $(this).attr('disabled', false);
      // });

      // $('.btn-edit-filter').on('click', function() {
      //   console.log('here comes the slider');
      //           // $(this).attr('disabled', false);

      //   $('#edit-filter-slider').fadeIn();
      //   // $('#edit-filter-slider').html('<input type="range" id="saturation-slider" orient="vertical" />');
      // });

      $('#close-filter-slider').click(function() {
        $('#edit-filter-slider').fadeOut();
        $('#hud-saturation-s1').attr('disabled', false);
        $('.btn-edit-filter').fadeOut();
        myWindow.Mousetrap.trigger("7");
        $('#hud-saturation-s1').toggleClass('active');
      });

      var speedSlider = document.getElementById("gps-speed-slider");

      // $('.btn-edit-filter').on('click', function() {
      //   console.log('here comes the slider');
      //   $('#edit-filter-slider').html('<input type="range" id="saturation-slider" orient="vertical" />');
      // });
      // $('#edit-filter-slider input#saturation-slider').on('input', function() {
      //   console.log('hi');
      // });

      // $('#hud-saturation-s2').click(function() {
      //   $(this).css('grid-column', '1 / span 3');
      //   $('<span class="edit-pane">hi</span>').appendTo('.new-filter-section');
      // });

      // $('#btn-saturation-s2').hover(function(e) {
      //   $(this).css('grid-column', '1 / span 3');
      //   e.preventDefault();
      //   e.stopPropagation();
      //   // $('<span class="edit-pane">hi</span>').appendTo('.new-filter-section');
      //   // $(this).attr('disabled', true);
      //   $('.edit-pane').fadeIn('fast');

      // }, function() {
      //   $(this).css('grid-column', '1 / span 4');
      //   $('.edit-pane').fadeOut('fast');
      //   // $(this).attr('disabled', false);

      // });

      // $('.edit-pane').hover(function() {
      //   // $('#hud-saturation-s2').attr('disabled', false);
      // }, function() {
      //   $(this).fadeOut('fast');
      //   // $(this).attr('disabled', false);
      //   $('#hud-saturation-s2').css('grid-column', '1 / span 4');
      // });

      $('.edit-pane').click(function() {
      });

      $('#btn-random-video').click(function() {  myWindow.Mousetrap.trigger('@');  /* Video.randomVideo(); */ });
      $('#btn-video-mode').click(function() { videoMode(); });
      $('#btn-gif-mode').click(function() { gifMode(); });

      $('#btn-banker-select').click(function() { myWindow.Mousetrap.trigger(';'); });
      $('#btn-banker-play-all').click(function() { myWindow.Mousetrap.trigger('ctrl+\''); });
      $('#btn-banker-clear').click(function() { myWindow.Mousetrap.trigger('"'); });

      $('#btn-clear-filters-s1').click(function() { myWindow.Mousetrap.trigger('-'); myWindow.Mousetrap.trigger('~'); clearAllFilters('s1'); });
      $('#btn-clear-filters-s2').click(function() { myWindow.Mousetrap.trigger('='); myWindow.Mousetrap.trigger('~'); clearAllFilters('s2'); });


      $('#btn-set-gps').click(function() { myWindow.Mousetrap.trigger('return'); });
      $('#btn-robomode').click(function() { myWindow.Mousetrap.trigger('\''); });
      $('#btn-bartender').click(function() { myWindow.Mousetrap.trigger('\\'); });
      $('#hud-gps-fast').click(function() { myWindow.Mousetrap.trigger(','); speedSlider.stepDown(1); });
      $('#hud-gps-slow').click(function() { myWindow.Mousetrap.trigger('/'); speedSlider.stepUp(1); });

        $('#btn-gps-burst').click(function() {
          if (myWindow.robomodeOn === 1) {
            myWindow.Mousetrap.trigger('.'); $(this).toggleClass('burst'); doStuff(beatTime);
          }
       });

        function doStuff() {
          $('#btn-gps-burst').css('animation-duration', (myWindow.beatTime/1000) + 's');
        }

      $('#btn-invert-s1').click(function() { myWindow.Mousetrap.trigger('-'); myWindow.Mousetrap.trigger('7'); });
      $('#btn-saturation-s1').click(function() { myWindow.Mousetrap.trigger('-'); myWindow.Mousetrap.trigger('8'); });
      $('#btn-hue-rotate-s1').click(function() { myWindow.Mousetrap.trigger('-'); myWindow.Mousetrap.trigger('9'); });
      $('#btn-blur-s1').click(function() { myWindow.Mousetrap.trigger('-'); myWindow.Mousetrap.trigger('0'); });

      $('#btn-invert-s2').click(function() { myWindow.Mousetrap.trigger('='); myWindow.Mousetrap.trigger('7'); });
      $('#btn-saturation-s2').click(function() { myWindow.Mousetrap.trigger('='); myWindow.Mousetrap.trigger('8'); });
      $('#btn-hue-rotate-s2').click(function() { myWindow.Mousetrap.trigger('='); myWindow.Mousetrap.trigger('9'); });
      $('#btn-blur-s2').click(function() { myWindow.Mousetrap.trigger('='); myWindow.Mousetrap.trigger('0'); });

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