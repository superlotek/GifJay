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
		// Selected Bank Overlays
		if (playlist.bank[bankNumber].overlays) {
			console.log('OVERLAYS PRESENT IN BANK');
			var overlayTrigger = Init.numRan(playlist.bank[bankNumber].overlays.length);
			console.log("overlay trigger ", overlayTrigger);
			Mousetrap.trigger("alt+" + playlist.bank[bankNumber].overlays[overlayTrigger].trigger);

		// Global Overlays
		} else {

			// Create a Brand Only Array
			var brandOverlays = appz.overlays.filter(function(overlay) {
  				return overlay.type === "brand";
			});

			console.log('NO ARTIST OVERLAYS IN BANK, PLAY BRAND OVERLAYS');
			if (randomOverlayOn) {
				console.log('SHOWING RANDOM OVERLAYS');
				var overlayTrigger = Math.ceil(Math.random() * brandOverlays.length - 1);
				Mousetrap.trigger("alt+" + overlayTrigger);

			} else {
				console.log('THIS SHOULD BE NO RANDOM OVERLAYS');
				console.log('this is how many', brandOverlays.length);
				Mousetrap.trigger("alt+" + overlayCounter);
				console.log('OVERLAY COUNTER: ', overlayCounter);
				overlayCounter++;
				if (overlayCounter >= brandOverlays.length ) { overlayCounter = 0; }
			}

		}

		myvar = setTimeout(Overlays.hideOverlay, (beatTime * overlayDuration) );
	},

	hideOverlay() {
	  Mousetrap.trigger("alt+" + 1);
	  myvar2 = setTimeout(Overlays.waitOverlay, (beatTime * overlayFrequency));
	},

	waitOverlay() {
	  Overlays.displayOverlay();
	},

	stopFunction() {
	  clearTimeout(myvar);
	  clearTimeout(myvar2);
	}
};

if (appz.overlaysEnabled) {
  Overlays.enableOverlays();
}
