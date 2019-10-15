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
		console.log('FUNCTION: applyOverlay');
		$(ov).css('background-image', 'url(' + appz.overlays[overlayNumber].location + '/' + appz.overlays[overlayNumber].name + ')');
	},

	displayOverlay() {
		console.log('FUNCTION: displayOverlay');
		if (playlist.bank[bankNumber].overlays) {
			console.log('OVERLAYS PRESENT IN BANK');
			var overlayTrigger = Init.numRan(playlist.bank[bankNumber].overlays.length);
			console.log("overlay trigger ", overlayTrigger);
			Mousetrap.trigger("alt+" + playlist.bank[bankNumber].overlays[overlayTrigger].trigger);
		} else {
			var brandOverlays = appz.overlays.filter(function(overlay) {
  				return overlay.type === "brand";
			});
			console.log('NO OVERLAYS IN BANK, PLAY BRAND OVERLAYS');
			var overlayTrigger = Math.ceil(Math.random() * brandOverlays.length - 1);
			Mousetrap.trigger("alt+" + overlayTrigger);

		}
		myvar = setTimeout(Overlays.hideOverlay, (beatTime * overlayDuration) );
	},

	hideOverlay() {
		console.log('FUNCTION: hideOverlay');
	  Mousetrap.trigger("alt+" + 1);
	  myvar2 = setTimeout(Overlays.waitOverlay, (beatTime * overlayFrequency));
	},

	waitOverlay() {
		console.log('FUNCTION:waitOverlay');
	  Overlays.displayOverlay();
	},

	stopFunction() {
		console.log('FUNCTION: stopOverlay');
	  clearTimeout(myvar);
	  clearTimeout(myvar2);
	}
};

if (appz.overlaysEnabled) {
  Overlays.enableOverlays();
}
