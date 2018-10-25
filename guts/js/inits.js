var version = "0.9.1";

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// INITS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

var bankerArray = [];
letterArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// Declarations
var bankLocation = "url(banks/bank";
var bgCenter = ".gif) center center";

var s1 = '.stage-one';
var s2 = '.stage-two';
var wc = '#webcam-container';

var sf = {'background-position':'center', 'background-size':'cover', 'backgroundRepeat':'no-repeat'}; // STAGE FullScreen
var st = {'background-position':'center', 'background-size':'auto', 'backgroundRepeat':'repeat'}; // STAGE Tile
var filterClear = {'-webkit-filter':'none'};
var bankSelectkeyArray;


// Startup
var startUpKey;
var giy = 1;
var screensaver = 0;

// Stage
var stageOneLayout = 0;
var stageTwoLayout = 0;
var stageOneBankNumber = 1;
var stageTwoBankNumber = 1;
var bankNumber;
var bankNumberS1;
var bankNumberS2;
var stageOneOn = 0;
var stageTwoOn = 0;
var stageThreeOn = 0;
var stgSelect = s1;
var stgNotSelected = s2; //= s2;
var lastBank;

var webcamOn = 0;

var initialStartUp = 0;

var bankerOn = 0;

// Effects
var opacity = 1;
var opacity2 = 1;
var effectAmount = 0;
var kaleidoscopeOn = 0;
var shapeOn = 0;
var roboChopOn = 0;
var roboChopImgAmount = 25;
var robostripImgAmount = 10;
var robostripOn = 0;
var roboSpinOn = 0;
var textOn = 0;
var glarp = -1;
var effectFillOn = 0;

var stgFadeOn = 0;
var verticalStacksOn = 0;
var stageFlipOn = 0;
var saturateOn = 0;
var sameSameOn = 0;
var switcherooOn = 0;
var hueShiftOn = 0;
var blurryOn = 0;
var blackWhiteOn = 0;

// GLITCH
var glitchOn = 0;
var screenHeight = 100;
var randomNumberArray = [];
var selectedNumber;
var saturateLevel = 20;
var borderSize = 10;

var delayFXOn = 0;
var fxModeOn = 0;


var hueRotateAmount;
var saturateAmount;

var gifAmount = 26;
// var bankNumber;

// SAMPLER
var samplerStg1 = [];
var samplerStg2 = [];
var samplerOn = 0;
var samplerOn2 = 0;

var sequencerOn = 0;
var curSequencerIndex;
var storyModeOn = 0;
var setOn = 0;
// var daLetter;
// var sequencerReverse = 0;


// RoboMode
var lastClick = 0;
var robomodeOn = 0;
var roboFillOn = 0;
var gpsTimer;
var gpsTimer2;
var stageLockOn = 0;
var stageLockedImage;
var stageLockedImage2;
var gifSizeLockOn = 0;
var stageFlipOn = 0;
var currentPlayMode = 'giy';

var overlayOn = 0;
// var overlaySpin = 0;
var stgStore;
