var version = "1.9.63";

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// INITS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

beatTime = appz.defaultBeatTime;
bankNumber = appz.startupBankNumber;
bankTrigger = appz.startUpBankTrigger;
filters = appz.filters;

singleBankTriggerArray = [];

var banksInUse = [];
var giyTriggerArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// Declarations
var bankLocation = "url(../../Bins/";
var bgCenter = ".gif) center center";
var enabledBanksArray = [];
var bankSelectKeyArray = [')','!','@','#','$','%','^','&','*','('];
var enabledSequenceTriggers = [];

var enabledBanksArray = [];
abledSequences = [];

var s1 = '.stage-one';
var s2 = '.stage-two';
var wc = '#webcam-container';
var ov = "#overlays";

var sf = {'background-position':'center', 'background-size':'cover', 'backgroundRepeat':'no-repeat'}; // STAGE FullScreen
var st = {'background-position':'center', 'background-size':'auto', 'backgroundRepeat':'repeat'}; // STAGE Tile
var filterClear = {'-webkit-filter':'none'};

var currentScene = {
	"stage" : [
		{ "bank": undefined, "location": undefined, "name": undefined, "filter": undefined, "blendMode": undefined, "repeat": undefined, "bgSize": undefined },
		{ "bank": undefined, "location": undefined, "name": undefined, "filter": undefined, "blendMode": undefined, "repeat": undefined, "bgSize": undefined }
	]
};

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

// RoboMode
var lastClick = 0;
var robomodeOn = 0;
var roboFillOn = 0;
var gpsTimer;
var gpsTimer2;
var scenePauseOn = 0;
var sceneFullscreenOn = 0;
var stageFlipOn = 0;
var currentPlayMode = 'giy';
var gpsNudgeAmount = 100;

var overlayOn = 0;
var textOn = 0;
var overlayText = "";

var stgStore;


$(document).ready(function() {

	kd.run(function () { kd.tick(); });

  // $('body').css('background-color', randomColorChange());

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
    console.log('KILL SWITCH BANK #: ' + localStorage.getItem('stg1Bank'));
    Init.killSwitch();
    bankNumber = localStorage.getItem('stg1Bank');
  } else {
    console.log('GIFJAY: ' + version + ' STARTING UP', "\n---------------------------------");
    $('<div class="logo"><img src="guts/img/gifjay_logo_white_small.png"></div>').appendTo('body');
    $('.logo img').delay(500).fadeIn('slow').delay(1500).fadeOut('slow');
    // bankNumber = Init.randomizer(banksInUse);
  }

}


}
