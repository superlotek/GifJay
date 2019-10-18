// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** FILTERS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Filter = {

  addFilter() {
    console.log('FUNCTION: ADD FILTER');

    filters.strings[0].value = filters.filter.map(function(elem){
        return elem.stage[0].value;
    }).join(" ");

    filters.strings[1].value = filters.filter.map(function(elem){
        return elem.stage[1].value;
    }).join(" ");



    console.log('S1 STRING: ', filters.strings[0].value);
    console.log('S2 STRING: ', filters.strings[1].value);

    console.log('S1: ', $(s1).css('-webkit-filter'));
    console.log('S2: ', $(s2).css('-webkit-filter'));

    // if (stgSelect == s1) {
    //   $(s1).css('-webkit-filter', filters.strings[0].value);
    // } else if (stgSelect == s2) {
    //   $(s2).css('-webkit-filter', filters.strings[1].value);
    // } else if (stgSelect == 'all') {
    //   $(s1).css('-webkit-filter', filters.strings[0].value);
    //   $(s2).css('-webkit-filter', filters.strings[1].value);
    // }

    if (filterS1) {
      console.log('what happens here s1');
      $(s1).css('-webkit-filter', filters.strings[0].value);
    }
    if (filterS2) {
      console.log('what happens here s2');
      $(s2).css('-webkit-filter', filters.strings[1].value);
    }



  },

  applyFilter(filterNum) {
    console.log('FUNCTION: APPLY FILTER');
    var filter = filters.filter[filterNum];


    if (filterS1) {
      filter.stage[0].value = filter.slugName + "(" + Init.numRan(filter.max) + filter.unit + ")";
      filter.stage[1].value = "";
      this.addFilter();
    }
    if (filterS2) {
      filter.stage[1].value = filter.slugName + "(" + Init.numRan(filter.max) + filter.unit + ")";
      filter.stage[0].value = "";
      this.addFilter();
    }

      // this.addFilter();

    // if (filterS1) {
    //   console.log('S1: FUNCTION: APPLY FILTER');
    //   filter.stage[0].value = filter.slugName + "(" + Init.numRan(filter.max) + filter.unit + ")";
    //   // filter.stage[1].value = $(s2).css('-webkit-filter', filters.strings[1].value);
    //   // filter.stage[1].value = "";

    //   // add special conditional for Invert
    //   if (filterNum == 0) {
    //     filter.stage[0].value = filter.slugName + "(" + filter.max + filter.unit + ")";
    //     // filter.stage[1].value = $(s2).css('-webkit-filter', filters.strings[1].value)
    //   }

    //   this.addFilter();

    // } else if (filterS2) {
    //   console.log('S2: FUNCTION: APPLY FILTER');
    //   filter.stage[1].value = filter.slugName + "(" + Init.numRan(filter.max) + filter.unit + ")";
    //   // filter.stage[0].value = $(s1).css('-webkit-filter', filters.strings[0].value);
    //   // filter.stage[0].value = "";
      
    //   // add special conditional for Invert
    //   if (filterNum == 0) {
    //     // filter.stage[0].value = filter.stage[0].value = $(s1).css('-webkit-filter', filters.strings[0].value);
    //     filter.stage[1].value = filter.slugName + "(" + filter.max + filter.unit + ")";
    //   }

    //   this.addFilter();

    // } else if (stgSelect == 'all') {

    //   // for both STGS
    //   filter.stage[0].value = filter.slugName + "(" + Init.numRan(filter.max) + filter.unit + ")";
    //   filter.stage[1].value = filter.slugName + "(" + Init.numRan(filter.max) + filter.unit + ")";

    //   // add special conditional for Invert
    //   if (filterNum == 0) {
    //     filter.stage[0].value = filter.slugName + "(" + filter.max + filter.unit + ")";
    //     filter.stage[1].value = filter.slugName + "(" + filter.max + filter.unit + ")";
    //   }
    // }

    // this.addFilter();
  },

  // COLOR PALETTE OVERLAYS
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  colorPalette() {
    var bankColorPalette = playlist.bank[bankNumber].colorPalette;
    $('.color-palette').css({backgroundColor: 'rgba(0,0,0,0)', background: 'rgba(0,0,0,0)'});
    if ("colorPalette" in playlist.bank[bankNumber]) {
      var colorAmt = bankColorPalette.length;
      if (playlist.bank[bankNumber].gradient) {
        $('.color-palette').css('background', 'linear-gradient(' + Init.numRan(360) + 'deg,' + bankColorPalette[Init.numRan(colorAmt)] + ',' +  bankColorPalette[Init.numRan(colorAmt)] + ')');
      } else {
        $('.color-palette').css('backgroundColor', bankColorPalette[Init.numRan(colorAmt)]);
      }

      if (playlist.bank[bankNumber].bankColorOpacity) {
        $('.color-palette').css('opacity', playlist.bank[bankNumber].bankColorOpacity);
      } else {
        $('.color-palette').css('opacity', colorPaletteOpacity);
      }
    }
  },

  // BLEND MODE SWITCHER
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  blendModeSwitcher(blendCounter) {
    console.log('BLEND MODE SWITCHER');

    if (overlaySelected) {
      $(ov).css('mix-blend-mode', appz.blendModes.mix[blendCounter].name);
    }

    if (textOn) {
      $('.text').css('mix-blend-mode', appz.blendModes.mix[blendCounter].name);
    }

    if (samplerOn) {
      $(s2).css('mix-blend-mode', appz.blendModes.mix[blendCounter].name);
      smpldScn.stages[1].blend = appz.blendModes.mix[blendCounter].name;
      return;
    }

    $(s2).css('mix-blend-mode', appz.blendModes.mix[blendCounter].name);
    console.log('BLENDMODE: ' + appz.blendModes.mix[blendCounter].name.toUpperCase(), blendCounter);

  }

};
