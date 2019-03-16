// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** FILTERS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

/* SAMPLE OF JOIN AND MAP, FILTER SPECS */
/*
[
  {name: "Joe", age: 22},
  {name: "Kevin", age: 24},
  {name: "Peter", age: 21}
].map(function(elem){
    return elem.name;
}).join(",");

/* hueShift 0deg
  SATURATE 100%
  invert 0%
  blur 0%

  name: 'grayscale',
  default: 0,
  value: 0,
  min: 0,
  max: 100,
  unit: '%'
*/

const filtersRunning = [
  { 'name' : 'Saturation', 'amount' : ''},
  { 'name' : 'Hue Rotate', 'amount' : ''},
  { 'name' : 'Blur', 'amount' : ''},
  { 'name' : 'Invert', 'amount' : ''}
]

const Filter = {
  addFilter() {
    filterString = filtersRunning.map(function(elem){
        return elem.amount;
    }).join(" ");
  },

  // FILTER FX : SATURATE
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  saturator() {
    if (stgSelect == s1) {
      filtersRunning[0].amount = "saturate(" + numRan(saturateMax) + ")";
      // filters[1].saturation = "saturate(" + saturateDefault + ")";
    } else if (stgSelect == s2) {
      filters[0].saturation = "saturate(" + saturateMin + ")";
      filters[1].saturation = "saturate(" + numRan(saturateMax) + ")";
    } else {
      filters[0].saturation = "saturate(" + numRan(saturateMax) + ")";
      filters[1].saturation = "saturate(" + numRan(saturateMax) + ")";
    }
    this.addFilter();
    $(s1).css('-webkit-filter', filterString);
  },

  // FILTER FX : HUESHIFT
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  hueShift() {
    if (stgSelect == s1) {
      filtersRunning[1].amount = "hue-rotate(" + numRan(hueRotateMax) + "deg)";
      // filters.hueshift = "hue-rotate(" + numRan(0) + "deg)";
    } else if (stgSelect == s2) {
      filters.hueshift = "hue-rotate(" + numRan(hueRotateMin) + "deg)";
      filters.hueshift = "hue-rotate(" + numRan(hueRotateMax) + "deg)";
    } else {
      filters.hueshift = "hue-rotate(" + numRan(hueRotateMax) + "deg)";
      filters.hueshift = "hue-rotate(" + numRan(hueRotateMax) + "deg)";
    }
    this.addFilter();
    $(s1).css('-webkit-filter', filterString);
  },

  // FILTER FX : BLURRY
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  blurry() {
    if (stgSelect == s1) {
      filtersRunning[2].amount = "blur(" + numRan(blurMax) + "px)";
      // filters.hueshift = "hue-rotate(" + numRan(0) + "deg)";
    } else if (stgSelect == s2) {
      filters.blur = "blur(" + numRan(blurMin) + "px)";
      filters.hueshift = "blur(" + numRan(blurMax) + "px)";
    } else {
      filters.hueshift = "blur(" + numRan(blurMax) + "px)";
      filters.hueshift = "blur(" + numRan(blurMax) + "px)";
    }
    this.addFilter();
    $(s1).css('-webkit-filter', filterString);
  },

  // FILTER FX : INVERT
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  invert() {
    if (stgSelect == s1) {
      filtersRunning[3].amount = "invert(" + invertMax + ")";
      // filters.hueshift = "hue-rotate(" + numRan(0) + "deg)";
    } else if (stgSelect == s2) {
      filters.invert = "invert(0)";
      filters.invert = "invert(" + invertMax + ")";
    } else {
      filters.invert = "invert(" + invertMax + ")";
      filters.invert = "invert(" + invertMax + ")";
    }
    this.addFilter();
    $(s1).css('-webkit-filter', filterString);
  },

  // BLEND MODE SWITCHER
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  blendModeSwitcher(counter) {
    console.log('BLEND MODE SWITCHER FUNCTION');
    // console.log(blendModeSwitcherArray.length);
    // console.log(blendModeSwitcherArray);
    // console.log('BLEND COUNTER: ' + blendCounter);
    // console.log('BLEND MODE: ' + blendModeSwitcherArray[counter]);
    if (counter === blendModeSwitcherArray.length - 1) {
      // console.log('I STHIS TAKIUNG??');
      blendCounter = 0;
      return false;
    }
    $(s2).css('mix-blend-mode', blendModeSwitcherArray[blendCounter]);
  }

};
