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
      filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";
      // filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].min + filters.filter[filterNum].unit + ")";

      if (filterNum == 0) {
        filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].max + filters.filter[filterNum].unit + ")";
        filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].min + filters.filter[filterNum].unit + ")";
      }

    } else if (stgSelect == s2) {
      // filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].min + filters.filter[filterNum].unit + ")";
      filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";

      if (filterNum == 0) {
        filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].min + filters.filter[filterNum].unit + ")";
        filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].max + filters.filter[filterNum].unit + ")";
      }

    } else {
      filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";
      filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";

      if (filterNum == 0) {
        filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].max + filters.filter[filterNum].unit + ")";
        filters.filter[filterNum].stage[1].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].max + filters.filter[filterNum].unit + ")";
      }
    }
    this.addFilter();
  },

  // BLEND MODE SWITCHER
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  blendModeSwitcher(counter) {
    console.log('BLEND MODE SWITCHER FUNCTION');
    if (counter === blendModeSwitcherArray.length - 1) {
      blendCounter = 0;
      return false;
    }

    if (overlaySelected) {
      $(ov).css('mix-blend-mode', blendModeSwitcherArray[blendCounter]);
    }

    $(s2).css('mix-blend-mode', blendModeSwitcherArray[blendCounter]);
  }

};
