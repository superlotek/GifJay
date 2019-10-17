// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

const Overlays = {

	enableOverlays() {
		console.log('WHAT IS THE CURRENT OVERLAY SET: ', currentOverlaySet);
		console.log('ENABLE OVERLAYS');
	  for ( let o = 0; o < appz.overlaySets.length; o++) {
	    Mousetrap.bind('alt+' + appz.overlaySets[o].trigger, function() {

    	console.log('OVERLAY SET: ' + appz.overlaySets[o].name);
			var currentOverlaySet = o;
			glerp = currentOverlaySet;
			console.log('CURRENT OVERLAY SET: ', currentOverlaySet);

			if (currentOverlaySet != parseInt(appz.overlaySets[o].trigger) ) {
				console.log('THIS IS DIFFERENT');
				overlayCounter = 0;
			}

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

	applyOverlay(overlaySetNumber) {

		console.log('APPLY OVERLAYS');
		var overlays = appz.overlaySets[overlaySetNumber].overlays;
		var currentOverlaySet = overlaySetNumber;

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
			overlayCounter++;
			if (overlayCounter === overlays.length ) { overlayCounter = 0; }

		}
	},

	displayOverlay() {
		console.log('DISPLAY OVERLAYS');
		hideOverlayTimer = setTimeout(Overlays.hideOverlay, (beatTime * overlayDuration) );
	},

	hideOverlay() {
	  Mousetrap.trigger("alt+" + glerp);
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
