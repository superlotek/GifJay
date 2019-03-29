// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Overlays = {

  applyOverlay(overlayNumber) {
    $(ov).css('background-image', 'url(' + appz.overlays[overlayNumber].location + '/' + appz.overlays[overlayNumber].name + ')');
  }

};
