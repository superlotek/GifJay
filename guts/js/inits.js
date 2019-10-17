var version = "1.9.73";

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// INITS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// beatTime = appz.defaultBeatTime;

if (localStorage.getItem("beatTime") === null) {
	beatTime = 2000;
} else {
	beatTime = localStorage.getItem('beatTime');
}

if (localStorage.getItem("performanceMode") === null) {
	performanceModeOn = false;
} else {
	performanceModeOn = JSON.parse(localStorage.getItem('performanceMode'));
}

if (localStorage.getItem("randomOverlay") === null) {
	randomOverlayOn = false;
} else {
	randomOverlayOn = JSON.parse(localStorage.getItem('randomOverlay'));
}


if (localStorage.getItem("overlayTexture") === null) {
	overlayTextureOn = true;
} else {
	overlayTextureOn = JSON.parse(localStorage.getItem('overlayTexture'));
}


if (localStorage.getItem("barTenderLength") === null) {
	barLength = 8;
} else {
	barLength = JSON.parse(localStorage.getItem('barTenderLength'));
}

if (localStorage.getItem("saturationAmount") === null) {
	saturationAmount = appz.filters.filter[1].max;
} else {
	saturationAmount = JSON.parse(localStorage.getItem('saturationAmount'));
	appz.filters.filter[1].max = saturationAmount;
}

if (localStorage.getItem("overlayFrequency") === null) {
	overlayFrequency = 64;

} else {
	overlayFrequency = JSON.parse(localStorage.getItem('overlayFrequency'));
}

if (localStorage.getItem("overlayDuration") === null) {
	overlayDuration = 8;

} else {
	overlayDuration = JSON.parse(localStorage.getItem('overlayDuration'));
}


if (localStorage.getItem("colorPaletteOpacity") === null) {
	colorPaletteOpacity = .25;
} else {
	colorPaletteOpacity = JSON.parse(localStorage.getItem('colorPaletteOpacity'));
}


if (localStorage.getItem("startupBankNumber") === null) {
	startupBankNumber = 0;
	bankNumber = startupBankNumber;
} else {
	startupBankNumber = JSON.parse(localStorage.getItem('startupBankNumber'));
	bankNumber = startupBankNumber;
	// bankNumber = startupBankNumber;
}

if (localStorage.getItem("beatTimeMinimum") === null) {
	beatTimeMinimum = 500;
} else {
	beatTimeMinimum = JSON.parse(localStorage.getItem('beatTimeMinimum'));
}


var overlayCounter = 0;
var currentOverlaySet = 0;
// barLength = appz.barLength;
// bankNumber = appz.startupBankNumber;
bankTrigger = appz.startUpBankTrigger;
filters = appz.filters;

// beatTimeMinimum = 1000;

singleBankTriggerArray = [];

var banksInUse = [];
var giyTriggerArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// Declarations
var bankLocation = "url(../../Bins/";
var bgCenter = ".gif) center center";

var stageArray = [{'background-position':'center', 'background-size':'cover', 'backgroundRepeat':'no-repeat'}, {'background-position':'center', 'background-size':'auto', 'backgroundRepeat':'repeat'}];

var enabledBanksArray = [];
var bankSelectKeyArray = [')','!','@','#','$','%','^','&','*','('];
var enabledSequenceTriggers = [];

var enabledBanksArray = [];
abledSequences = [];

var s1 = '.stage-one';
var s2 = '.stage-two';
var wc = '#webcam-container';
var ov = ".branding";

var sf = {'background-position':'center', 'background-size':'cover', 'backgroundRepeat':'no-repeat'}; // STAGE FullScreen
var st = {'background-position':'center', 'background-size':'auto', 'backgroundRepeat':'repeat'}; // STAGE Tile
var filterClear = {'-webkit-filter':'none'};

var currentScene = {
	"stage" : [
		{ "bank": undefined, "location": undefined, "name": undefined, "filter": undefined, "blendMode": undefined, "repeat": undefined, "bgSize": undefined },
		{ "bank": undefined, "location": undefined, "name": undefined, "filter": undefined, "blendMode": undefined, "repeat": undefined, "bgSize": undefined }
	]
};

var autoOverlayOn = 0;
// var overlayDuration = 1000;
// var overlayFrequency = 6000;

var bankSelectkeyArray;

var bankSelected = 0;
// Startup
var startUpKey;
var giy = 1;
var screensaver = 0;

// STAGE
var stageOneLayout = 0;
var stageTwoLayout = 0;
var stageOneBankNumber = 1;
var stageTwoBankNumber = 1;
var bankNumber;
var bankNumberS1;
var bankNumberS2;
var stageOneOn = 0;
var stageTwoOn = 0;
var stgSelect = s1;
var stgNotSelected = s2; //= s2;
var lastBank;

var webcamOn = 0;

var initialStartUp = 0;

var overlaySelected = 0;
var defaultInvertValue = 0;
var defaultBlurValue = 0;


var bankerOn = 0;
var bankerStageSetupOn = 0;
var bankerStageSetupS1 = 0;
var bankerStageSetupS2 = 0;
var bankerArray = [];
var bankerStageArrayS1 = [];
var bankerStageArrayS2 = [];

// EFFECTS
var opacity = 1;
var opacity2 = 1;
var effectAmount = 0;
var kaleidoscopeOn = 0;
var shapeOn = 0;
var textOn = 0;
var glarp = -1;
var effectFillOn = 0;

var stgFadeOn = 0;
var stageFlipOn = 0;
var sameSameOn = 0;
var switcherooOn = 0;
var mutatorOn = 0;

// FILTERS
// var invertOn = 0;
// var saturateOn = 0;
// var hueRotateOn = 0;
// var blurOn = 0;

var filtersOnString = "";
var sampledFilterOn = 0;
// var hueRotateAmount;
// var saturateAmount;

// BLEND MODES
var blendModesOn = 0;
var blendCounter = null;
var blendModeRandomOn = 0;
var originalBlend = [{"stage1": "", "stage2": ""}];

var gifAmount = 26;

// SAMPLER
var samplerStg1 = [];
var samplerStg2 = [];
var samplerOn = 0;
var samplerOn2 = 0;
var samplerCounter = null;
var samplerIndex = 0;
sampledScenes = {};
sampledScenes.scene =  [];
sampledScenes.scene.stages = [];

bankerSetStorage = {};
bankerSetStorage.scenes = [];

var sequencerOn = 0;
var curSequencerIndex = 0;
var selectedSequence = {};
var storyModeOn = 0;
var setOn = 0;
var randomOn = 0;

// RoboMode
var lastClick = 0;
var robomodeOn = 0;
var roboFillOn = 0;
var gpsTimer;
var gpsTimer2;
var scenePauseOn = 0;
var barTenderOn = 0;
// var barLength = 8;
var barTenderCounter = 0;

var sceneFullscreenOn = 0;
var stageFlipOn = 0;
var currentPlayMode = 'giy';
var gpsNudgeAmount = 100;

var overlayOn = 0;
var textOn = 0;
var overlayText = "";

var stgStore;


$(document).ready(function() {

	//kd.run(function () { kd.tick(); });

  // $('body').css('background-color', randomColorChange());

    if (!overlayTextureOn) {
      console.log('Texture Is here!!');
      $('.texture').css('background', 'none !important');
      $('.texture').css('display', 'none');
    }

    Init.startup();

    $('.logo a').click(function() {
      $(this).fadeOut(function() {
        $('.logo').remove();
        Scene.stageSetup();
      });
    });

		createEnabledBankers();
		createBankTriggers();
		createGiyTriggers(bankNumber);
		filterBuild();
		createSequenceTriggers();

		console.log('START UP BANK NUMBER: ' + bankNumber, "\n---------------------------------");
		Filter.colorPalette();

  });

const Init = {

	randomColorChange() {
    return '#'+(Math.floor(Math.random()*16777216)&0xFFFFFF).toString(16);
	},

	randomizer(arrayName) {
	  var randomArraySelector = arrayName[Math.floor(Math.random()*arrayName.length)];
	  return randomArraySelector;
	},

	numRan(ranNum) {
	  var ranNumGen = Math.floor(Math.random()*ranNum);
	  return ranNumGen;
	},

	robomodeBackground() {
	  $('body').css('background-image', 'repeating-linear-gradient(' + this.numRan(360) + 'deg, ' +
	    this.randomColorChange() + ' ' + this.numRan(100) + '%, ' +
	    this.randomColorChange() + ' ' + this.numRan(100) + '%, ' +
	    this.randomColorChange() + ' ' + this.numRan(100) + '%, ' +
	    this.randomColorChange() + ' ' + this.numRan(100)+ '%)');
	},

	killSwitch() {
	  localStorage.setItem('killSwitch','unkilled');
	  console.log("KILL SWITCH: ENABLED", "\n---------------------------------");
	  // Scene.stageSetup();
	  $(s1).add(s2).addClass('on');
	  stageOneOn, stageTwoOn = 1;
	  bankNumber = localStorage.getItem('bankNumber');
	  $(s1).css('background', bankLocation + localStorage.getItem('stg1Location') + localStorage.getItem('stg1Gif') + bgCenter);
	  $(s2).css('background', bankLocation + localStorage.getItem('stg2Location') + localStorage.getItem('stg2Gif') + bgCenter);
	  $(s1).css('mix-blend-mode', localStorage.getItem('stg1Blend'));
	  $(s2).css('mix-blend-mode', localStorage.getItem('stg2Blend'));
	  $(s1).css('background-repeat', localStorage.getItem('stg1Repeat'));
	  $(s2).css('background-repeat', localStorage.getItem('stg2Repeat'));
	  $(s1).css('background-size', localStorage.getItem('stg1BgSize'));
	  $(s2).css('background-size', localStorage.getItem('stg2BgSize'));
	  $(s2).addClass('blend');
	},

	startup() {

  $('body').css('background-color', Init.randomColorChange());

  // appz.bank.forEach(function(item) {
  //   if (item.enabled) {
  //     banksInUse.push(item.id);
  //   }
  // });

  // console.log('BANKS IN USE: ' + banksInUse);

  if (localStorage.getItem('killSwitch') == 'killed') {
  	  	bankNumber = localStorage.getItem('bankNumber');

    console.log('KILL SWITCH BANK #: ' + localStorage.getItem('stg1Bank'));
    Init.killSwitch();
    // bankNumber = localStorage.getItem('stg1Bank');
  	bankNumber = localStorage.getItem('bankNumber');
  } else {
    console.log('GIFJAY: ' + version + ' STARTING UP', "\n---------------------------------");
    $('<div class="logo"><img src="guts/img/gifjay_logo_white_small.png"></div>').appendTo('#overlays');
    $('.logo img').delay(500).fadeIn('slow').delay(1500).fadeOut('slow', function() {
    	$('.logo').remove();
    });
    // bankNumber = Init.randomizer(banksInUse);
  }

}


}
