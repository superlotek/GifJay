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
    if (stgSelect == s1) {
      filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + Init.numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";
      // filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].min + filters.filter[filterNum].unit + ")";

      if (filterNum == 0) {
        filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].max + filters.filter[filterNum].unit + ")";
        filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].min + filters.filter[filterNum].unit + ")";
      }

    } else if (stgSelect == s2) {
      // filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].min + filters.filter[filterNum].unit + ")";
      filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + Init.numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";

      if (filterNum == 0) {
        filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].min + filters.filter[filterNum].unit + ")";
        filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].max + filters.filter[filterNum].unit + ")";
      }

    } else {
      filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + Init.numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";
      filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + Init.numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";

      if (filterNum == 0) {
        filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].max + filters.filter[filterNum].unit + ")";
        filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].max + filters.filter[filterNum].unit + ")";
      }
    }
    this.addFilter();
  },

  // BLEND MODE SWITCHER
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  
  blendModeSwitcher(blendCounter) {
    console.log('BLEND MODE SWITCHER');

    if (overlaySelected) {
      $(ov).css('mix-blend-mode', blendModes.mix[blendCounter].name);
    }

    if (samplerOn) {
      $(s2).css('mix-blend-mode', blendModes.mix[blendCounter].name);
      smpldScn.stages[1].blend = blendModes.mix[blendCounter].name;
      return;
    }

    $(s2).css('mix-blend-mode', blendModes.mix[blendCounter].name);
    console.log('BLENDMODE: ' + blendModes.mix[blendCounter].name.toUpperCase(), blendCounter);

  }

};
