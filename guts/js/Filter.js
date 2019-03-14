// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** FILTERS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

var filters = {
  "stage" : [
    {"saturation": "blurp", "hueshift": "bleek"},
    {"saturation": "block", "hueshift": "gleep"}
  ],
  "string": ""
}

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

var saturateDefault = 1;

const Filter = {

  // addFilter(filterNum, filterString) {
  addFilter() {
    // filtersOnString = "";
    // filtersOn[filterNum] = filterString;
    filters.stage.forEach(function(element) {
      filtersOnString += element + " ";
    });

    console.log(filtersOnString);
    // console.log(filters.stage[0].string);
    // console.log(filters.stage[1].string);

  },


/*


[
  {name: "Joe", age: 22},
  {name: "Kevin", age: 24},
  {name: "Peter", age: 21}
].map(function(elem){
    return elem.name;
}).join(",");

*/


  // FILTER FX : SATURATE
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  saturator() {

    // filters.stage[0].saturation = "saturate(" + numRan(saturateAmount) + ")";
    // filters.stage[1].saturation = "saturate(" + numRan(saturateAmount) + ")";
    // $(s1).css('-webkit-filter', filters.stage[0].saturation);
    // $(s2).css('-webkit-filter', filters.stage[1].saturation);

    if (stgSelect == s1) {
      console.log("SATURATE: S1");
      filters.stage[0].saturation = "saturate(" + numRan(saturateAmount) + ")";
      filters.stage[1].saturation = "saturate(" + saturateDefault + ")";
    } else if (stgSelect == s2) {
      console.log("SATURATE: S2");
      filters.stage[0].saturation = "saturate(" + saturateDefault + ")";
      filters.stage[1].saturation = "saturate(" + numRan(saturateAmount) + ")";
    } else {
      console.log("SATURATE: S1+S2");
      filters.stage[0].saturation = "saturate(" + numRan(saturateAmount) + ")";
      filters.stage[1].saturation = "saturate(" + numRan(saturateAmount) + ")";
    }

    $(s1).css('-webkit-filter', filters.stage[0].saturation);
    $(s2).css('-webkit-filter', filters.stage[1].saturation);

    filters.stage[0].string = filters.stage[0].saturation;
    filters.stage[1].string = filters.stage[1].saturation;

    // this.addFilter()
    //   this.addFilter(0, s1SaturateString);
  },

  // FILTER FX : HUESHIFT
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  hueShift() {


    if (stgSelect == s1) {
      console.log("HUESHIFT: S1");
      filters.stage[0].hueshift = "hue-rotate(" + numRan(360) + "deg)";
      filters.stage[1].hueshift = "hue-rotate(" + numRan(0) + "deg)";
    } else if (stgSelect == s2) {
      console.log("HUESHIFT: S2");
      filters.stage[0].hueshift = "hue-rotate(" + numRan(0) + "deg)";
      filters.stage[1].hueshift = "hue-rotate(" + numRan(360) + "deg)";
    } else {
      console.log("HUESHIFT: S1+S2");
      filters.stage[0].hueshift = "hue-rotate(" + numRan(360) + "deg)";
      filters.stage[1].hueshift = "hue-rotate(" + numRan(360) + "deg)";
    }

    $(s1).css('-webkit-filter', filters.stage[0].hueshift);
    $(s2).css('-webkit-filter', filters.stage[1].hueshift);



    // s1HueshiftValue = numRan(360);
    // s2HueshiftValue = numRan(360);
    // s1HueshiftString = "hue-rotate(" + s1HueshiftValue + "deg)";
    // s2HueshiftString = "hue-rotate(" + s2HueshiftValue + "deg)";
    // if (stgSelect == "all") {
    //   console.log('FX HUESHIFT: STG 1+2');
    //   $(s1).css('-webkit-filter', s1HueshiftString);
    //   $(s2).css('-webkit-filter', s2HueshiftString);
    //   this.addFilter(1, s2HueshiftString)
    //   $(s1).add(s2).css('-webkit-filter', filtersOnString);
    // } else {
    //   this.addFilter(1, s1HueshiftString)
    //   $(stgSelect).css('-webkit-filter', filtersOnString);
    // }
  },

  // FILTER FX : BLURRY
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  blurry() {
    s1BlurValue = numRan(blurAmount);
    s2BlurValue = numRan(blurAmount);
    s1BlurString = "blur(" + s1BlurValue + "px)";
    s2BlurString = "blur(" + s2BlurValue + "px)";
    if (stgSelect == "all") {
      console.log('FX BLURRY: STG 1+2');
      $(s1).css('-webkit-filter','blur(' + s1BlurValue + 'px');
      $(s2).css('-webkit-filter','blur(' + s2BlurValue + 'px');
      this.addFilter(2, s2BlurString);
      $(s1).add(s2).css('-webkit-filter', filtersOnString);
    } else {
      $(stgSelect).css('-webkit-filter','blur(' + numRan(10) + 'px');
      this.addFilter(2, s1BlurString);
      $(stgSelect).css('-webkit-filter', filtersOnString);
    }
  },

  // FILTER FX : INVERT
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  invert() {
    s1InvertValue = 1;
    s2InvertValue = 1;
    s1InvertString = "invert(" + s1InvertValue + ")";
    s2InvertString = "invert(" + s2InvertValue + ")";
    if (stgSelect == "all") {
      console.log('FX INVERT: STG 1+2');
      $(s1).css('-webkit-filter','invert(' + s1InvertValue + ')');
      $(s2).css('-webkit-filter','invert(' + s2InvertValue + ')');
      this.addFilter(3, s2InvertString);
      $(s1).add(s2).css('-webkit-filter', filtersOnString);
    } else {
      $(stgSelect).css('-webkit-filter','invert(1)');
      this.addFilter(3, s1InvertString);
      $(stgSelect).css('-webkit-filter', filtersOnString);
    }
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
