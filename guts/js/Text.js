// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** TEXT ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Text = {


};

var fontCounter = 0;
var maxCharLimit = 20;
var textOverlayFormString =
  '<form id="textOverlayForm">\
    <input type="text" autocomplete="off" value="" id="textOverlayInput" />\
    <input id="textOverlaySubmit" type="submit" />\
  </form>';

Mousetrap.bind("alt+[", function() {
  console.log('TEXT OVERLAY: ON');
  if (!textOverlayOn) {
    textOverlayOn = !textOverlayOn;
    $('.textOverlayContainer h1').show();
    $('.textOverlayContainer h1').html(textOverlayStringParsed);
  } else {
    console.log('TEXT OVERLAY: OFF');
    textOverlayOn = !textOverlayOn;
    $('.textOverlayContainer h1').hide();
  }
});

Mousetrap.bind("alt+]", function(e) {
  e.preventDefault();
  console.log('TEXT: ENTER TEXT');
  var insertLineBreaks = /%/gi;
  $('body').append(textOverlayFormString);
  $('#textOverlayInput').focus();
  $('#textOverlayForm').submit(function(e){
    e.preventDefault();
    overlayTextString = $('#textOverlayInput').val();
    console.log('TEXT: ' + overlayTextString + ' SUBMITTED');
    charLength = $('#textOverlayInput').val().split("").length;
    console.log('CHAR LENGTH: ' + charLength);

    if (charLength > maxCharLimit) {
      console.log("TEXT SUBMITTED: TOO LONG");
      $('.textOverlayContainer h1').css(
        {
          'font-size' : appz.fontStyles.font[fontCounter].sizes[0],
          'line-height' : appz.fontStyles.font[fontCounter].sizes[1]
        }
      );
    } else {
      console.log("TEXT SUBMITTED: GOOD LENGTH");
      $('.textOverlayContainer h1').css(
        {
          'font-size' : appz.fontStyles.font[fontCounter].sizeMin,
          'line-height' : appz.fontStyles.font[fontCounter].lineHeightMin
        }
      );
    }

    textOverlayStringParsed = overlayTextString.replace(insertLineBreaks, '<br>');
    $('.textOverlayContainer h1').html(textOverlayStringParsed);
    console.log("OVERLAY TEXT PARSED : " + textOverlayStringParsed);
    $(this).remove();
  });
});

Mousetrap.bind("alt+\\", function() {
  console.log('TEXT: CHANGE FONT');
  fontCounter = (fontCounter+1)%(appz.fontStyles.font.length);
  $('.textOverlayContainer h1').css(
    {
      'font-family' : '"' + appz.fontStyles.font[fontCounter].name + '"',
    }
  );
});

Mousetrap.bind("ctrl+[", function() {
  console.log('TEXT: CHANGE COLOR');
  $('.textOverlayContainer h1').css(
    {
      'font-family' : '"' + appz.fontStyles.font[fontCounter].name + '"',
      'color' : Init.randomColorChange(),
      'mix-blend-mode' : appz.blendModes.mix[Init.numRan(appz.blendModes.mix.length)].name
    }
  );
});

Mousetrap.bind("ctrl+]", function() {
  console.log('TEXT: FX');
  var tl = new TimelineMax({repeat:-1, repeatDelay:0});
  tl.to(".textOverlayContainer h1", beatTime/1000, {scale: 1.25, skewY: 12, rotationY: 360 });
});

Mousetrap.bind("ctrl+\\", function() {
  console.log('ClEAR SOMETHING');
});
