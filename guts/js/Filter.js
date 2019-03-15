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


var saturateDefault = 1;

const Filter = {
  addFilter() {
    glerp = filtersRunning.map(function(elem){
        return elem.amount;
    }).join(" ");
  },


  // FILTER FX : SATURATE
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  saturator() {
    if (stgSelect == s1) {
      console.log("SATURATE: S1");
      filtersRunning[0].amount = "saturate(" + numRan(saturateAmount) + ")";
      // filters[1].saturation = "saturate(" + saturateDefault + ")";
    } else if (stgSelect == s2) {
      console.log("SATURATE: S2");
      filters[0].saturation = "saturate(" + saturateDefault + ")";
      filters[1].saturation = "saturate(" + numRan(saturateAmount) + ")";
    } else {
      console.log("SATURATE: S1+S2");
      filters[0].saturation = "saturate(" + numRan(saturateAmount) + ")";
      filters[1].saturation = "saturate(" + numRan(saturateAmount) + ")";
    }
    this.addFilter();
    $(s1).css('-webkit-filter', glerp);
  },

  // FILTER FX : HUESHIFT
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  hueShift() {
    if (stgSelect == s1) {
      console.log("HUESHIFT: S1");
      filtersRunning[1].amount = "hue-rotate(" + numRan(360) + "deg)";
      // filters.hueshift = "hue-rotate(" + numRan(0) + "deg)";
    } else if (stgSelect == s2) {
      console.log("HUESHIFT: S2");
      filters.hueshift = "hue-rotate(" + numRan(0) + "deg)";
      filters.hueshift = "hue-rotate(" + numRan(360) + "deg)";
    } else {
      console.log("HUESHIFT: S1+S2");
      filters.hueshift = "hue-rotate(" + numRan(360) + "deg)";
      filters.hueshift = "hue-rotate(" + numRan(360) + "deg)";
    }
    this.addFilter();
    $(s1).css('-webkit-filter', glerp);
  },

  // FILTER FX : BLURRY
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  blurry() {
    if (stgSelect == s1) {
      console.log("BLURRY: S1");
      filtersRunning[2].amount = "blur(" + numRan(10) + "px)";
      // filters.hueshift = "hue-rotate(" + numRan(0) + "deg)";
    } else if (stgSelect == s2) {
      console.log("BLURRY: S2");
      filters.blur = "blur(" + numRan(0) + "px)";
      filters.hueshift = "blur(" + numRan(360) + "px)";
    } else {
      console.log("BLURRY: S1+S2");
      filters.hueshift = "blur(" + numRan(360) + "px)";
      filters.hueshift = "blur(" + numRan(360) + "px)";
    }
    this.addFilter();
    $(s1).css('-webkit-filter', glerp);
  },

  // FILTER FX : INVERT
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  invert() {
    if (stgSelect == s1) {
      console.log("INVERT: S1");
      filtersRunning[3].amount = "invert(1)";
      // filters.hueshift = "hue-rotate(" + numRan(0) + "deg)";
    } else if (stgSelect == s2) {
      console.log("INVERT: S2");
      filters.invert = "invert(0)";
      filters.invert = "invert(" + 1 + ")";
    } else {
      console.log("INVERT: S1+S2");
      filters.invert = "invert(" + 1 + ")";
      filters.invert = "invert(" + 1 + ")";
    }
    this.addFilter();
    $(s1).css('-webkit-filter', glerp);
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
