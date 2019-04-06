// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** TEXT ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Text = {


};

var fontCounter = 0;
var phraseCounter = 0;
var maxCharLimit = 20;
var textOverlayFormString =
  '<form id="textOverlayForm">\
    <input type="text" autocomplete="off" value="" id="textOverlayInput" />\
    <input id="textOverlaySubmit" type="submit" />\
  </form>';

var inFeatures = 0;
var inProperties = 0;
var modeCounter = 0;
var featuresCounter = 0;
var propertyCounter = 0;

// ===== MODE =====
var modeLength = appz.modes.length;
for (let i = 0; i < modeLength; i++) {
  Mousetrap.bind(appz.modes[i].trigger, function() {
    console.log("------------------------------");
    modeCounter = i;
    mode = appz.modes[modeCounter].name;
    console.log("MODE SELECT: " + mode.toUpperCase());
    featuresCounter = 0;
    propertyCounter = 0;
    inFeatures = 0;
    inProperties = 0;
  });
}

// ===== FEATURE =====
Mousetrap.bind("alt+[", function() {
  var featuresLength = appz.modes[modeCounter].features.length;
  console.log("------------------------------");
  console.log(mode.toUpperCase() + " FEATURES CYCLER (" + featuresLength + ")");
  if (!inFeatures) {
    console.log('HELLO, FIRST TIME TO FEATURES!!');
    inFeatures = !inFeatures;
    propertyCounter = 0;
    console.log('FEATURES COUNTER: ' + featuresCounter);
    console.log("FEATURE SELECTED: " + appz.modes[modeCounter].features[featuresCounter].name.toUpperCase());
  } else {
    featuresCounter = (featuresCounter+1)%(featuresLength);
    console.log('HEY, Youve been here before');
    console.log('FEATURES COUNTER: ' + featuresCounter);
    console.log("FEATURE SELECTED: " + appz.modes[modeCounter].features[featuresCounter].name.toUpperCase());
  }
});

// ===== PROPERTY =====
Mousetrap.bind("alt+]", function() {
      console.log('PROPERTY COUNTER: ' + propertyCounter);

  var propertyLength = appz.modes[modeCounter].features[featuresCounter].properties.length;
  console.log("------------------------------");
  console.log(mode.toUpperCase() + " / " + appz.modes[modeCounter].features[featuresCounter].name.toUpperCase() + " PROPERTIES CYCLER (" + propertyLength + ")");
  if (!inProperties) {
    console.log('HELLO, FIRST TIME TO PROPERTIES!!');
    inProperties = !inProperties;
    propertyCounter = 0;
    console.log('PROPERTY COUNTER: ' + propertyCounter);
    console.log("PROPERTY SELECTED: " + appz.modes[modeCounter].features[featuresCounter].properties[propertyCounter].toUpperCase());
    console.log('modeCounter: ' + modeCounter);
    console.log('featuresCounter: ' + featuresCounter);
  } else {
    propertyCounter = (propertyCounter+1)%(propertyLength);
    console.log('HEY, Youve been here before');
    console.log('PROPERTY COUNTER: ' + propertyCounter);
    console.log("PROPERTY SELECTED: " + appz.modes[modeCounter].features[featuresCounter].properties[propertyCounter].toUpperCase());
    console.log('modeCounter: ' + modeCounter);
    console.log('featuresCounter: ' + featuresCounter);
  }
});

// ===== DONE / SUBMIT =====
Mousetrap.bind("alt+\\", function() {
  console.log("------------------------------");
  console.log('SUBMITTED / DONE');
  // console.log('modeCounter: ' + modeCounter);
  // console.log('featuresCounter: ' + featuresCounter);
  // console.log('propertyCounter: ' + propertyCounter)
  // console.log("MODE: " + appz.modes[modeCounter].name.toUpperCase() + " / PROPERTY CYCLER");
  // appz.modes[modeCounter].features[featuresCounter].glip();
  // appz.displayToggle('#overlays');
  appz.modes[modeCounter].features[featuresCounter].func(appz.modes[modeCounter].id);
  // alert(appz.modes[modeCounter].features[featuresCounter].properties[propertyCounter]);
});

// Mousetrap.bind("alt+[", function() {
//   console.log('TEXT OVERLAY: ON');
//   if (!textOverlayOn) {
//     textOverlayOn = !textOverlayOn;
//     $('.textOverlayContainer h1').show();
//     $('.textOverlayContainer h1').html(textOverlayStringParsed);
//   } else {
//     console.log('TEXT OVERLAY: OFF');
//     textOverlayOn = !textOverlayOn;
//     $('.textOverlayContainer h1').hide();
//   }
// });

// Mousetrap.bind("alt+]", function(e) {
//   e.preventDefault();
//   console.log('TEXT: ENTER TEXT');
//   var insertLineBreaks = /%/gi;
//   $('body').append(textOverlayFormString);
//   $('#textOverlayInput').focus();
//   $('#textOverlayForm').submit(function(e){
//     e.preventDefault();
//     overlayTextString = $('#textOverlayInput').val();
//     console.log('TEXT: ' + overlayTextString + ' SUBMITTED');
//     charLength = $('#textOverlayInput').val().split("").length;
//     console.log('CHAR LENGTH: ' + charLength);

//     if (charLength > maxCharLimit) {
//       console.log("TEXT SUBMITTED: TOO LONG");
//       $('.textOverlayContainer h1').css(
//         {
//           'font-size' : appz.fontStyles.font[fontCounter].sizes[0],
//           'line-height' : appz.fontStyles.font[fontCounter].sizes[1]
//         }
//       );
//     } else {
//       console.log("TEXT SUBMITTED: GOOD LENGTH");
//       $('.textOverlayContainer h1').css(
//         {
//           'font-size' : appz.fontStyles.font[fontCounter].sizeMin,
//           'line-height' : appz.fontStyles.font[fontCounter].lineHeightMin
//         }
//       );
//     }

//     textOverlayStringParsed = overlayTextString.replace(insertLineBreaks, '<br>');
//     $('.textOverlayContainer h1').html(textOverlayStringParsed);
//     console.log("OVERLAY TEXT PARSED : " + textOverlayStringParsed);
//     $(this).remove();
//   });
// });

// Mousetrap.bind("alt+\\", function() {
//   console.log('TEXT: CHANGE FONT');
//   fontCounter = (fontCounter+1)%(appz.fontStyles.font.length);
//   $('.textOverlayContainer h1').css(
//     {
//       'font-family' : '"' + appz.fontStyles.font[fontCounter].name + '"',
//       'font-size' : appz.fontStyles.font[fontCounter].sizeMin,
//       'line-height' : appz.fontStyles.font[fontCounter].lineHeightMin
//     }
//   );
// });

// Mousetrap.bind("ctrl+[", function() {
//   console.log('TEXT: CHANGE COLOR');
//   $('.textOverlayContainer h1').css(
//     {
//       'font-family' : '"' + appz.fontStyles.font[fontCounter].name + '"',
//       'color' : Init.randomColorChange(),
//       'text-shadow' : Init.randomColorChange() + " 14px 14px ",
//       'mix-blend-mode' : appz.blendModes.mix[Init.numRan(appz.blendModes.mix.length)].name
//     }
//   );
// });

// Mousetrap.bind("ctrl+]", function() {
//   console.log('TEXT: FX');
//   var tl = new TimelineMax({repeat:-1, repeatDelay:0});
//   // tl.to(".textOverlayContainer h1", beatTime/1000, {scale: 1.25, skewY: 12, rotationY: 360 });
//   tl.to(".textOverlayContainer h1", beatTime/2000, {color: Init.randomColorChange(), onUpdate: colorChange  });

// });

// function colorChange() {
//   $('.textOverlayContainer h1').css(
//     {
//       'color' : Init.randomColorChange(),
//     }
//   );
// }

// Mousetrap.bind("ctrl+\\", function() {
//   console.log('PRESET PHRASE SELECTOR');
//   console.log(appz.textOverlays.phrase[phraseCounter].text);

//   $('.textOverlayContainer h1').css(
//     {
//       'font-family' : '"' + appz.textOverlays.phrase[phraseCounter].font + '"',
//       'color' : appz.textOverlays.phrase[phraseCounter].color,
//       'font-size' : appz.textOverlays.phrase[phraseCounter].size,
//       'line-height' : appz.textOverlays.phrase[phraseCounter].lineHeight,
//       'text-shadow' : Init.randomColorChange() + " 14px 14px ",
//       'mix-blend-mode' : appz.blendModes.mix[Init.numRan(appz.blendModes.mix.length)].name
//     }
//   );

//   textOverlayStringParsed = appz.textOverlays.phrase[phraseCounter].text;
//   $('.textOverlayContainer h1').html(appz.textOverlays.phrase[phraseCounter].text);
//   phraseCounter = (phraseCounter+1)%(appz.textOverlays.phrase.length);


// });
