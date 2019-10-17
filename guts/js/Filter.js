// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** FILTERS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Filter = {

  addFilter() {

    filters.strings[0].value = filters.filter.map(function(elem){
        return elem.stage[0].value;
    }).join(" ");

    filters.strings[1].value = filters.filter.map(function(elem){
        return elem.stage[1].value;
    }).join(" ");

    $(s1).css('-webkit-filter', filters.strings[0].value);
    $(s2).css('-webkit-filter', filters.strings[1].value);
  },

  applyFilter(filterNum) {

    var filter = filters.filter[filterNum];

    if (stgSelect == s1) {
      filter.stage[0].value = filter.slugName + "(" + Init.numRan(filter.max) + filter.unit + ")";
      // filter.stage[1].value = "";

      // add special conditional for Invert
      if (filterNum == 0) {
        filter.stage[0].value = filter.slugName + "(" + filter.max + filter.unit + ")";
        filter.stage[1].value = filter.slugName + "(" + filter.min + filter.unit + ")";
      }

    } else if (stgSelect == s2) {
      filter.stage[1].value = filter.slugName + "(" + Init.numRan(filter.max) + filter.unit + ")";
      // filter.stage[0].value = "";
      
      // add special conditional for Invert
      if (filterNum == 0) {
        filter.stage[0].value = filter.slugName + "(" + filter.min + filter.unit + ")";
        filter.stage[1].value = filter.slugName + "(" + filter.max + filter.unit + ")";
      }

    } else {

      // for both STGS
      filter.stage[0].value = filter.slugName + "(" + Init.numRan(filter.max) + filter.unit + ")";
      filter.stage[1].value = filter.slugName + "(" + Init.numRan(filter.max) + filter.unit + ")";

      // add special conditional for Invert
      if (filterNum == 0) {
        filter.stage[0].value = filter.slugName + "(" + filter.max + filter.unit + ")";
        filter.stage[1].value = filter.slugName + "(" + filter.max + filter.unit + ")";
      }
    }

    this.addFilter();
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
