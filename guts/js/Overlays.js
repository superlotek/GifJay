// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Overlays = {

  applyOverlay() {
    console.log('OVERLAY: APPLIED');
    // $('#overlays').append('<div class="ovolay" />');
    $('#overlays').css('background', 'url(overlays/doctorKa_logo_black_o.png) no-repeat center center');
    $('#overlays').css('display', 'block');
    $('#overlays').css('background-size', 'contain');
  }


};
