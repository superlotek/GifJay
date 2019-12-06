// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// *** OVERLAYS ***
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var thisOneHasAnimation = false;

const Overlays = {

	enableOverlays() {

		console.log('ENABLE OVERLAYS');
	  	for ( let o = 0; o < appz.overlaySets.length; o++) {
		    Mousetrap.bind('alt+' + appz.overlaySets[o].trigger, function() {

			var currentOverlaySet = o;
			glerp = currentOverlaySet;

			if (currentOverlaySet != parseInt(appz.overlaySets[o].trigger) ) {
				console.log('THIS IS DIFFERENT');
				overlayCounter = 0;
			}

			if(!overlayOn) {
				
				if (thisOneHasAnimation) {
					console.log('does this have animation????');
					$(ov).addClass('ov-anim');
					window.opener.$(ov).addClass('ov-anim');
				}

				Overlays.applyOverlay(o);
				overlayOn = !overlayOn;
				$(ov).addClass('on');
				window.opener.$(ov).addClass('on');
				window.opener.$('#scene-section .branding').toggleClass('on');
				console.log('OVERLAY: ON');


			} else {
				overlayOn = !overlayOn;
				console.log('OVERLAY: OFF');

				$(ov).removeClass('on');
				window.opener.$(ov).removeClass('on');

				$('.branding').removeClass('ov-anim');
				window.opener.$('.branding').removeClass('ov-anim');

				if (thisOneHasAnimation) {
					console.log('YOU NEED TO BE DELETED');
					thisOneHasAnimation = !thisOneHasAnimation;
					console.log('this one haz anim: ', thisOneHasAnimation);
		          	$(ov).css('animation', '');
					$(ov).removeClass('ov-anim');
		          	window.opener.$(ov).css('animation', '');
					window.opener.$(ov).removeClass('ov-anim');
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

			var randomOverlay = Init.numRan(overlays.length);
			$(ov).css('background-image', 'url(' + overlays[randomOverlay].location + '/' + overlays[randomOverlay].url + ')');
			$(ov).css('mix-blend-mode', overlays[randomOverlay].blendMode);
			window.opener.$(ov).css('background-image', 'url(' + overlays[randomOverlay].location + '/' + overlays[randomOverlay].url + ')');
			window.opener.$(ov).css('mix-blend-mode', overlays[randomOverlay].blendMode);
			$(ov).addClass('ov-anim');
			window.opener.$(ov).addClass('ov-anim');
			thisOneHasAnimation = true;
          	$('.ov-anim').css('animation-duration', (beatTime/1000 * overlays[randomOverlay].animConstant) + 's');
          	$('.ov-anim').css('animation-name', overlays[randomOverlay].animationType);
          	window.opener.$('.ov-anim').css('animation-duration', (beatTime/1000 * overlays[randomOverlay].animConstant) + 's');
          	window.opener.$('.ov-anim').css('animation-name', overlays[randomOverlay].animationType);

		} else {

			$(ov).css('background-image', 'url(' + overlays[overlayCounter].location + '/' + overlays[overlayCounter].url + ')');
			$(ov).css('mix-blend-mode', overlays[overlayCounter].blendMode);
			window.opener.$(ov).css('background-image', 'url(' + overlays[overlayCounter].location + '/' + overlays[overlayCounter].url + ')');
			window.opener.$(ov).css('mix-blend-mode', overlays[overlayCounter].blendMode);

			if (overlays[overlayCounter].animation === true) {
				console.log('THIS OVERLAY HAS ANIMATION');
				console.log(overlays[overlayCounter].animationType);
				$(ov).addClass('ov-anim');
				window.opener.$(ov).addClass('ov-anim');
				thisOneHasAnimation = true;
	          	$('.ov-anim').css('animation-duration', (beatTime/1000 * overlays[overlayCounter].animConstant) + 's');
	          	$('.ov-anim').css('animation-name', overlays[overlayCounter].animationType);
	          	window.opener.$('.ov-anim').css('animation-duration', (beatTime/1000 * overlays[overlayCounter].animConstant) + 's');
	          	window.opener.$('.ov-anim').css('animation-name', overlays[overlayCounter].animationType);
			}

			overlayCounter++;
			if (overlayCounter === overlays.length ) { overlayCounter = 0; }

		}
	},

	displayOverlay() {
		console.log('DISPLAY OVERLAYS');
		hideOverlayTimer = setTimeout(Overlays.hideOverlay, (beatTime * overlayDuration) );
		$(ov).addClass('ov-anim');
		window.opener.$(ov).addClass('ov-anim');
		window.opener.$(ov).toggleClass('on');
	},

	hideOverlay() {
		console.log('HIDE OVERLAYS');
		Mousetrap.trigger("alt+" + glerp);
		waitOverlayTimer = setTimeout(Overlays.waitOverlay, (beatTime * overlayFrequency));
		$(ov).removeClass('ov-anim');
		window.opener.$(ov).removeClass('ov-anim');
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
