// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** FILTERS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Filter = {

  addFilter() {
    filterString = filters.filter.map(function(elem){
        return elem.stage[0].value;
    }).join(" ");
    $(s1).css('-webkit-filter', filterString);
  },

  genericFilter(filterNum) {
    if (stgSelect == s1) {
      filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";
      if (filterNum == 0) {
        filters.filter[filterNum].stage[0].value = filters.filter[filterNum].slugName + "(" + filters.filter[filterNum].max + filters.filter[filterNum].unit + ")";
      }
    } else if (stgSelect == s2) {
      filters.filter[filterNum].value = filters.filter[filterNum].name + "(" + filters.filter[filterNum].min + filters.filter[filterNum].unit + ")";
      filters.filter[filterNum].value = filters.filter[filterNum].name + "(" + numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";
    } else {
      filters.filter[filterNum].value = filters.filter[filterNum].name + "(" + numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";
      filters.filter[filterNum].value = filters.filter[filterNum].name + "(" + numRan(filters.filter[filterNum].max) + filters.filter[filterNum].unit + ")";
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
    $(s2).css('mix-blend-mode', blendModeSwitcherArray[blendCounter]);
  }

};
