// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Overlays = {

	enableOverlays() {
	  for ( let o = 0; o < appz.overlays.length; o++) {
	    Mousetrap.bind('alt+' + appz.overlays[o].trigger, function() {
	      if(!overlayOn) {
	        Overlays.applyOverlay(o);
	        overlayOn = !overlayOn;
	        $(ov).toggleClass('on');
	        console.log('OVERLAY: ON');
	      } else {
	        overlayOn = !overlayOn;
	        console.log('OVERLAY: OFF');
	        $(ov).toggleClass('on');
	      }
	    });
	  }
	},

	applyOverlay(overlayNumber) {
		$(ov).css('background-image', 'url(' + appz.overlays[overlayNumber].location + '/' + appz.overlays[overlayNumber].name + ')');
	},

	displayOverlay() {
		if (playlist.bank[bankNumber].overlays) {
			console.log('OVERLAYS PRESENT IN BANK');
			var overlayTrigger = Math.ceil(Math.random() * playlist.bank[bankNumber].overlays.length - 1);
			Mousetrap.trigger("alt+" + playlist.bank[bankNumber].overlays[overlayTrigger].trigger);
		} else {

			var brandOverlays = appz.overlays.filter(function(overlay) {
  				return overlay.type === "brand";
			});

			console.log('NO OVERLAYS IN BANK, PLAY BRAND OVERLAYS');
			var overlayTrigger = Math.ceil(Math.random() * brandOverlays.length - 1);
			Mousetrap.trigger("alt+" + overlayTrigger);

		}
		myvar = setTimeout(Overlays.hideOverlay, (beatTime * 8) );
	},

	hideOverlay() {
	  Mousetrap.trigger("alt+" + 1);
	  myvar2 = setTimeout(Overlays.waitOverlay, (beatTime * 64));
	},

	waitOverlay() {
	  Overlays.displayOverlay();
	},

	stopFunction() {
	  clearTimeout(this.myvar);
	  clearTimeout(this.myvar2);
	}
};

if (appz.overlaysEnabled) {
  Overlays.enableOverlays();
}
