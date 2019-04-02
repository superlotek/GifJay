// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** TEXT ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Text = {


};

// TEXT EFFECTS
Mousetrap.bind("alt+[", function() {
  console.log('TEXT OVERLAY: ON');
  if (!textOn) {
    textOn = !textOn;
    $('.text').show();
    $('.text h1').html(overlayText);
  } else {
    textOn = !textOn;
    $('.text').hide();
  }
});

Mousetrap.bind("alt+]", function(e) {
  e.preventDefault();
  console.log('TEXT: ENTER TEXT');
  $('body').append('<form id="formtest"><input type="text" autocomplete="off" value="" id="text-fx" /><input id="text-submit" type="submit" /></form>');
  $('#text-fx').focus();
  $('#formtest').submit(function(e){
    console.log('TEXT: SUBMITTED');
    e.preventDefault();
    overlayText = $('#text-fx').val();
    $(this).remove();
  });
});

Mousetrap.bind("ctrl+[", function() {
  console.log('TEXT: INCREASE FONT SIZE');
  $('.text h1').css(
    {
      'font-size' : '10vw',
      'line-height' : '15vh',
      'font-family' : '"' + Init.randomizer(appz.fontStyles) + '"',
      'color' : Init.randomColorChange(),
      'mix-blend-mode' : appz.blendModes.mix[Init.numRan(appz.blendModes.mix.length)].name
    }
  );
});

Mousetrap.bind("ctrl+]", function() {
  console.log('TEXT: RESIZE??');
  TweenMax.to(".text h1", beatTime/1000, {rotationX:360});
  // someAnimation();
  // $('.text h1').animate({fontSize: "20vw" }, beatTime, function() {
  //   $(this).animate({fontSize: "10vw"}, beatTime);
  // });
  // $('.text h1').css('animation-name', 'example');
  // $('.text h1').css('animation-duration', beatTime/1000 +'s');
});

function someAnimation() {
  $('.text h1').animate({fontSize: "20vw" }, beatTime, function() {
    $(this).animate({fontSize: "10vw"}, beatTime, function() {
      // someAnimation();
    });
  });

}
