// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Overlays = {

	enableOverlays() {

	  for ( let o = 0; o < appz.overlaySets.length; o++) {
	    Mousetrap.bind('alt+' + appz.overlaySets[o].trigger, function() {

    	console.log('OVERLAY SET: ' + appz.overlaySets[o].name);

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

	// applyOverlay(overlaySetNumber) {
	// 	$(ov).css('background-image', 'url(' + appz.overlays[overlaySetNumber].location + '/' + appz.overlays[overlaySetNumber].name + ')');
	// },


	applyOverlay(overlaySetNumber) {
		var overlays = appz.overlaySets[overlaySetNumber].overlays;

		if (randomOverlayOn) {

			console.log('RANDOM OVERLAY: ON');
			var randomOverlay = Init.numRan(overlays.length);
			console.log('randomOverlay ', randomOverlay);
			console.log('overlaySetNumber: ', overlaySetNumber);
			$(ov).css('background-image', 'url(' + overlays[randomOverlay].location + '/' + overlays[randomOverlay].url + ')');
			$(ov).css('mix-blend-mode',overlays[randomOverlay].blendMode);

		} else {

			console.log('RANDOM OVERLAY: OFF');
			console.log('overlaySetNumber: ', overlaySetNumber);
			console.log('overlayCounter: ', overlayCounter);
			$(ov).css('background-image', 'url(' + overlays[overlayCounter].location + '/' + overlays[overlayCounter].url + ')');
			// $(ov).css('mix-blend-mode',appz.overlaySets[overlayCounter].overlays[overlayCounter].blendMode);
			overlayCounter++;
			if (overlayCounter === appz.overlaySets[overlaySetNumber].overlays.length ) { overlayCounter = 0; }

		}

		// var overlays = appz.overlaySets[overlaySetNumber].overlays;
		// var randoNumbo = Init.numRan(overlays.length);
		// console.log('randoNumbo ', randoNumbo);
		// console.log('overlaySetNumber: ', overlaySetNumber);
		// $(ov).css('background-image', 'url(' + appz.overlaySets[overlaySetNumber].overlays[randoNumbo].location + '/' + appz.overlaySets[overlaySetNumber].overlays[randoNumbo].url + ')');
		// $(ov).css('mix-blend-mode',appz.overlaySets[overlaySetNumber].overlays[randoNumbo].blendMode);
	},



	displayOverlay() {
		// Selected Bank Overlays
		if (playlist.bank[bankNumber].overlays) {

			// console.log('OVERLAYS PRESENT IN BANK');

			if (randomOverlayOn) {

				console.log('PLAYING RANDOM BANK OVERLAYS HERE');
				// var overlayTrigger = Init.numRan(playlist.bank[bankNumber].overlays.length);
				// console.log('overlayTrigger ', overlayTrigger);
				// Mousetrap.trigger("alt+" + playlist.bank[bankNumber].overlays[overlayTrigger].trigger);

			} else {

				console.log('NO RANDOM BANK OVERLAYS HERE TO BE PLAYED');
				// console.log('this is how many', playlist.bank[bankNumber].overlays.length);
				// console.log('OVERLAY COUNTER: ', overlayCounter);
				// Mousetrap.trigger("alt+" + playlist.bank[0].overlays[overlayCounter].trigger);
				// console.log('OVERLAY COUNTER: ', overlayCounter);
				// overlayCounter++;
				// if (overlayCounter >= playlist.bank[bankNumber].overlays.length ) { overlayCounter = 0; }

			}

		// Global Overlays
		} else {

			// Create a Brand Only Array
			// var brandOverlays = appz.overlays.filter(function(overlay) {
  	// 			return overlay.type === "brand";
			// });

			console.log('NO ARTIST OVERLAYS IN BANK, PLAY BRAND OVERLAYS');

			if (randomOverlayOn) {
				
				console.log('SHOWING RANDOM OVERLAYS');
				// var overlayTrigger = Math.ceil(Math.random() * brandOverlays.length - 1);
				// Mousetrap.trigger("alt+" + overlayTrigger);

			} else {

				console.log('THIS SHOULD BE NO RANDOM OVERLAYS');
				// console.log('this is how many', brandOverlays.length);
				// Mousetrap.trigger("alt+" + overlayCounter);
				// console.log('OVERLAY COUNTER: ', overlayCounter);
				// overlayCounter++;
				// if (overlayCounter >= brandOverlays.length ) { overlayCounter = 0; }

			}
		}

		hideOverlayTimer = setTimeout(Overlays.hideOverlay, (beatTime * overlayDuration) );
	},

	hideOverlay() {
	  Mousetrap.trigger("alt+" + 1);
	  waitOverlayTimer = setTimeout(Overlays.waitOverlay, (beatTime * overlayFrequency));
	},

	waitOverlay() {
	  Overlays.displayOverlay();
	},

	stopFunction() {
	  clearTimeout(hideOverlayTimer);
	  clearTimeout(waitOverlayTimer);
	}
};

if (appz.overlaysEnabled) {
  Overlays.enableOverlays();
}
