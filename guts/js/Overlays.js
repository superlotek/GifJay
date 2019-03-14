// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Overlays = {

  applyOverlay(overlayNumber) {
    $(ov).css('background-image', 'url(' + overlays[overlayNumber].location + '/' + overlays[overlayNumber].name + ')');
  }

};
