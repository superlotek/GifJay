// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Overlays = {

  applyOverlay(overlayNumber) {
    $('#overlays').css('background-image', 'url(' + overlays[overlayNumber].location + '/' + overlays[overlayNumber].name + ')');
  }

};
