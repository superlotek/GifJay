// GifJay

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// USER SETTINGS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

banksInUse = [];

banks = {
	"bank" : [
		{
			"id" : 0,
			"name" : "INTRO-BANK",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "name" : "dancing_trails1"},
				{ "trigger" : "b", "name" : "dancing_trails2"},
				{ "trigger" : "c", "name" : "bathbomb-spinner-1_o"},
				{ "trigger" : "d", "name" : "bathbomb-boomerang_o"},
				{ "trigger" : "e", "name" : "star_trails"},
				{ "trigger" : "f", "name" : "star_trails2"},
				{ "trigger" : "g", "name" : "sun"},
				{ "trigger" : "h", "name" : "cruz-lights-3"},
				{ "trigger" : "i", "name" : "rainbow_cubes"},
				{ "trigger" : "j", "name" : "ikea_rainbow_kitchen"},
				{ "trigger" : "k", "name" : "star-rider-4_o"},
				{ "trigger" : "l", "name" : "medit_man_1"},
				{ "trigger" : "m", "name" : "video-feedback-2"},
				{ "trigger" : "n", "name" : "websafe_colors_b"}
			]
		}
	]
}

setsArray = [];

bankerSets = {
	"set" : [
		{
			"name" : "SET-NAME",
			"trigger" : "a",
			"bank" : 0,
			"gifs" : [
				{ "name" : "GIFS-GO-HERE"},
				{ "name" : "GIFS-GO-HERE"},
				{ "name" : "GIFS-GO-HERE"},
				{ "name" : "GIFS-GO-HERE"}
			]
		}
	]
}

var effectsOn = [];

var beatTime = 3650;
var beatSpeed = 1000;
var titlePageOn = 0;
titlePageName = 'title-1.gif';

stageArray = ['sf', 'st'];
shapeArray = ['circle','triangle','rhombus','octagon','close','frame','rabbet'];
flipArray = ['rotateX(180deg)','rotateX(-180deg)','rotateY(180deg)','rotateY(-180deg)'];
// blendModeArray = ['multiply','screen','overlay','darken','lighten','color-dodge','color-burn',
//   'hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'];
// blendModeArray = ['multiply','screen','overlay','darken','lighten'];
blendModeArray = ['screen','overlay'];
effectArray = ['invert','saturation','brightness','hue-rotate','blur'];
bankArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r'];
bgPosA = ['top', 'bottom'];
bgPosB = ['right', 'left'];
repeatArray = ['repeat', 'no-repeat'];
borderArray = ['dotted', 'dashed', 'double', 'solid', 'ridge'];

var app = {
	settings: {
		effects: {
			kaleidoscope: {
				name: 'kaleidoscope',
				enabled: true,
				filterKey: "1"
			},
			roboChop: {
				name: 'roboChop',
				enabled: false,
				filterKey: "2"
			},
			sameSame: {
				name: 'sameSame',
				enabled: true,
				filterKey: "3"
			},
			stgFade: {
				name: 'stgFade',
				enabled: true,
				filterKey: "4"
			},
			switcheroo: {
				name: 'switcheroo',
				enabled: true,
				filterKey: "5"
			},
			blackAndWhite: {
				name: 'blackAndWhite',
				enabled: false,
				filterKey: "7"
			},
			saturator: {
				name: 'saturator',
				enabled: true,
				filterKey: "8"
			},
			hueShift: {
				name: 'hueShift',
				enabled: true,
				filterKey: "9"
			},
			blurry: {
				name: 'blurry',
				enabled: true,
				filterKey: "0"
			}
		}
	}
}

var appFX = app.settings.effects;
