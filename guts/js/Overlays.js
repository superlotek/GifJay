// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var thisOneHasAnimation = false;

const Overlays = {

	enableOverlays() {
		// console.log('WHAT IS THE CURRENT OVERLAY SET: ', currentOverlaySet);
		console.log('ENABLE OVERLAYS');
	  for ( let o = 0; o < appz.overlaySets.length; o++) {
	    Mousetrap.bind('alt+' + appz.overlaySets[o].trigger, function() {

    	// console.log('OVERLAY SET: ' + appz.overlaySets[o].name);
			var currentOverlaySet = o;
			glerp = currentOverlaySet;
			// console.log('CURRENT OVERLAY SET: ', currentOverlaySet);

			if (currentOverlaySet != parseInt(appz.overlaySets[o].trigger) ) {
				console.log('THIS IS DIFFERENT');
				overlayCounter = 0;
			}

				// if (thisOneHasAnimation) {
				// 	console.log('YOU NEED TO BE DELETED');
				// 	$(ov).toggleClass('ov-anim');
				// 	thisOneHasAnimation = !thisOneHasAnimation;
				// }


			if(!overlayOn) {
				
				if (thisOneHasAnimation) {
					console.log('does this have animation????');
					$(ov).addClass('ov-anim');
					// thisOneHasAnimation = !thisOneHasAnimation;
				}


				Overlays.applyOverlay(o);
				overlayOn = !overlayOn;
				$(ov).addClass('on');
				console.log('OVERLAY: ON');



			} else {
				overlayOn = !overlayOn;
				console.log('OVERLAY: OFF');
				$(ov).removeClass('on');
				$('.branding').removeClass('ov-anim');

				if (thisOneHasAnimation) {
					console.log('YOU NEED TO BE DELETED');
					thisOneHasAnimation = !thisOneHasAnimation;
					console.log('this one haz anim: ', thisOneHasAnimation);
		          	$(ov).css('animation', '');
					$(ov).removeClass('ov-anim');
				}

			}

	    });
	  }
	},

	applyOverlay(overlaySetNumber) {

		console.log('APPLY OVERLAYS');
		var overlays = appz.overlaySets[overlaySetNumber].overlays;
		var currentOverlaySet = overlaySetNumber;

		if (randomOverlayOn) {

			// RANDOM OVERLAY DISPLAY
			// console.log('RANDOM OVERLAY: ON');
			var randomOverlay = Init.numRan(overlays.length);
			// console.log('randomOverlay ', randomOverlay);
			// console.log('overlaySetNumber: ', overlaySetNumber);
			$(ov).css('background-image', 'url(' + overlays[randomOverlay].location + '/' + overlays[randomOverlay].url + ')');
			$(ov).css('mix-blend-mode', overlays[randomOverlay].blendMode);

			$(ov).addClass('ov-anim');
			thisOneHasAnimation = true;
          	$('.ov-anim').css('animation-duration', (beatTime/1000 * overlays[randomOverlay].animConstant) + 's');
          	$('.ov-anim').css('animation-name', overlays[randomOverlay].animationType);

		} else {
			// LINEAR OVERLAY DISPLAY
			// console.log('RANDOM OVERLAY: OFF');
			// console.log('overlaySetNumber: ', overlaySetNumber);
			// console.log('overlayCounter: ', overlayCounter);
			$(ov).css('background-image', 'url(' + overlays[overlayCounter].location + '/' + overlays[overlayCounter].url + ')');
			$(ov).css('mix-blend-mode', overlays[overlayCounter].blendMode);

			if (overlays[overlayCounter].animation === true) {
				console.log('THIS OVERLAY HAS ANIMATION');
				console.log(overlays[overlayCounter].animationType);
				$(ov).addClass('ov-anim');
				thisOneHasAnimation = true;
	          	$('.ov-anim').css('animation-duration', (beatTime/1000 * overlays[overlayCounter].animConstant) + 's');
	          	$('.ov-anim').css('animation-name', overlays[overlayCounter].animationType);
			}

			overlayCounter++;
			if (overlayCounter === overlays.length ) { overlayCounter = 0; }

		}
	},

	displayOverlay() {
		console.log('DISPLAY OVERLAYS');
		hideOverlayTimer = setTimeout(Overlays.hideOverlay, (beatTime * overlayDuration) );
		$(ov).addClass('ov-anim');

	},

	hideOverlay() {
		Mousetrap.trigger("alt+" + glerp);
		waitOverlayTimer = setTimeout(Overlays.waitOverlay, (beatTime * overlayFrequency));
		$(ov).removeClass('ov-anim');
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
