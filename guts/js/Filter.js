// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** FILTERS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Filter = {

  addFilter(filterNum, filterString) {
    filtersOnString = "";
    filtersOn[filterNum] = filterString;
    filtersOn.forEach(function(element) {
      filtersOnString += element + " ";
    });
  },

  // FILTER FX : SATURATE
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  saturator() {
    s1SaturatorValue = numRan(saturateAmount);
    s2SaturatorValue = numRan(saturateAmount);
    s1SaturateString = "saturate(" + s1SaturatorValue + ")";
    s2SaturateString = "saturate(" + s2SaturatorValue + ")";
    if (stgSelect == "all") {
      $(s1).css('-webkit-filter', s1SaturateString);
      $(s2).css('-webkit-filter', s2SaturateString);
      this.addFilter(0, s2SaturateString);
      $(s1).add(s2).css('-webkit-filter', filtersOnString);
    } else {
      this.addFilter(0, s1SaturateString);
      $(stgSelect).css('-webkit-filter', filtersOnString);
    }
  },

  // FILTER FX : HUESHIFT
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  hueShift() {
    s1HueshiftValue = numRan(360);
    s2HueshiftValue = numRan(360);
    s1HueshiftString = "hue-rotate(" + s1HueshiftValue + "deg)";
    s2HueshiftString = "hue-rotate(" + s2HueshiftValue + "deg)";
    if (stgSelect == "all") {
      console.log('FX HUESHIFT: STG 1+2');
      $(s1).css('-webkit-filter', s1HueshiftString);
      $(s2).css('-webkit-filter', s2HueshiftString);
      this.addFilter(1, s2HueshiftString)
      $(s1).add(s2).css('-webkit-filter', filtersOnString);
    } else {
      this.addFilter(1, s1HueshiftString)
      $(stgSelect).css('-webkit-filter', filtersOnString);
    }
  },

  // FILTER FX : BLURRY
  // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  blurry() {
    s1BlurValue = numRan(blurAmount);
    s2BlurValue = numRan(blurAmount);
    s1BlurString = "blur(" + s1BlurValue + "px)";
    s2BlurString = "blur(" + s2BlurValue + "px)";

    if (overlaySelected) {
      if (defaultBlurValue == 0) {
        $(ov).css('-webkit-filter','blur(10px)');
        defaultBlurValue = 10;
      } else {
        $(ov).css('-webkit-filter','blur(0px)');
        defaultBlurValue = 0;
      }
    }

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

    if (overlaySelected) {
      if (defaultInvertValue == 0) {
        $(ov).css('-webkit-filter','invert(1)');
        defaultInvertValue = 1;
      } else {
        $(ov).css('-webkit-filter','invert(0)');
        defaultInvertValue = 0;
      }
    }

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

    if (overlaySelected) {
      $(ov).css('mix-blend-mode', blendModeSwitcherArray[blendCounter]);
    }

    $(s2).css('mix-blend-mode', blendModeSwitcherArray[blendCounter]);
  }

};
