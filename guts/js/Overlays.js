// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Overlays = {

  applyOverlay(overlayNumber) {
    $(ov).css('background-image', 'url(' + appz.overlays[overlayNumber].location + '/' + appz.overlays[overlayNumber].name + ')');
  }

};


// if (overlayTextureOn === false) {
// 	console.log('texttire!!!');
// 	$('.texture').css('background', 'none !important');
// }