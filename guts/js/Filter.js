// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** FILTERS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Filter = {

  addFilter() {
    filterString = filterSettings.map(function(elem){
        return elem.value;
    }).join(" ");
    $(s1).css('-webkit-filter', filterString);
  },

  genericFilter(filterNum) {
    if (stgSelect == s1) {
      filterSettings[filterNum].value = filterSettings[filterNum].slugName + "(" + numRan(filterSettings[filterNum].max) + filterSettings[filterNum].unit + ")";
      if (filterNum == 0) {
        filterSettings[filterNum].value = filterSettings[filterNum].slugName + "(" + filterSettings[filterNum].max + filterSettings[filterNum].unit + ")";
      }
    } else if (stgSelect == s2) {
      filterSettings[filterNum].value = filterSettings[filterNum].name + "(" + filterSettings[filterNum].min + filterSettings[filterNum].unit + ")";
      filterSettings[filterNum].value = filterSettings[filterNum].name + "(" + numRan(filterSettings[filterNum].max) + filterSettings[filterNum].unit + ")";
    } else {
      filterSettings[filterNum].value = filterSettings[filterNum].name + "(" + numRan(filterSettings[filterNum].max) + filterSettings[filterNum].unit + ")";
      filterSettings[filterNum].value = filterSettings[filterNum].name + "(" + numRan(filterSettings[filterNum].max) + filterSettings[filterNum].unit + ")";
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
