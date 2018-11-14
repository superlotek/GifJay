// GifJay v.0.8.9

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// USER SETTINGS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

banksInUse = [];

midiKeys = {
  'commands' : [
    { 'name': 'Quick Stage Setup', 'trigger': 'alt+backspace', 'device': 144, 'controller': 62, 'value': 0 },
    { 'name': 'Startup/SceneFlip', 'trigger': 'space', 'device': 144, 'controller': 63, 'value': 0 },
		{ 'name': 'Show/Hide STG1', 'trigger': '_', 'device': 144, 'controller': 64, 'value': 0 },
		{ 'name': 'Show/Hide STG2', 'trigger': '+', 'device': 144, 'controller': 65, 'value': 0 },
		{ 'name': 'Set GPS', 'trigger': '<', 'device': 144, 'controller': 99, 'value': 0 },
		{ 'name': 'Start/Stop Robomode', 'trigger': '>', 'device': 144, 'controller': 98, 'value': 0 },
		{ 'name': 'GPS X2', 'trigger': ',', 'device': 144, 'controller': 101, 'value': 0 },
		{ 'name': 'GPS /2', 'trigger': '/', 'device': 144, 'controller': 100, 'value': 0 },
		{ 'name': 'Scene Fullscreen', 'trigger': '[', 'device': 144, 'controller': 60, 'value': 0 },
		{ 'name': 'Scene Fullscreen', 'trigger': '[', 'device': 128, 'controller': 60, 'value': 0 },
		{ 'name': 'Scene Pause', 'trigger': ']', 'device': 128, 'controller': 61, 'value': 0 },
		{ 'name': 'Scene Pause', 'trigger': ']', 'device': 144, 'controller': 61, 'value': 0 },
		{ 'name': 'STG1 Select', 'trigger': '-', 'device': 144, 'controller': 91, 'value': 0 },
		{ 'name': 'STG2 Select', 'trigger': '=', 'device': 144, 'controller': 92, 'value': 0 },
		{ 'name': 'STG1+2 Select', 'trigger': 'backspace', 'device': 144, 'controller': 93, 'value': 0 },

		{ 'name': 'Bank 1 Select', 'trigger': '!', 'device': 134, 'controller': 53, 'value': 0 },
		{ 'name': 'Bank 2 Select', 'trigger': '@', 'device': 134, 'controller': 54, 'value': 0 },
		{ 'name': 'Bank 3 Select', 'trigger': '#', 'device': 134, 'controller': 55, 'value': 0 },
		{ 'name': 'Bank 4 Select', 'trigger': '$', 'device': 134, 'controller': 56, 'value': 0 },
		{ 'name': 'Bank 5 Select', 'trigger': '%', 'device': 134, 'controller': 57, 'value': 0 },
		{ 'name': 'Bank 6 Select', 'trigger': '^', 'device': 135, 'controller': 53, 'value': 0 },
		{ 'name': 'Bank 7 Select', 'trigger': '&', 'device': 135, 'controller': 54, 'value': 0 },
		{ 'name': 'Bank 8 Select', 'trigger': '*', 'device': 135, 'controller': 55, 'value': 0 },
		{ 'name': 'Bank 9 Select', 'trigger': '(', 'device': 135, 'controller': 56, 'value': 0 },
		{ 'name': 'Bank 0 Select', 'trigger': ')', 'device': 135, 'controller': 57, 'value': 0 },

		{ 'name': 'Filter: Kaleidoscope', 'trigger': '1', 'device': 144, 'controller': 52, 'value': 0 },
		{ 'name': 'Filter: Kaleidoscope', 'trigger': '3', 'device': 146, 'controller': 52, 'value': 0 },
		{ 'name': 'Filter: Kaleidoscope', 'trigger': '4', 'device': 147, 'controller': 52, 'value': 0 },

		// { 'name': 'Banker Start/Clear', 'trigger': '\'', 'device': 144, 'controller': 82, 'value': 0 },
		{ 'name': 'Banker Start/Clear', 'trigger': '\'', 'device': 128, 'controller': 82, 'value': 0 },
		{ 'name': 'Sampler Start', 'trigger': ';', 'device': 144, 'controller': 83, 'value': 0 },
		{ 'name': 'Sampler Start', 'trigger': ';', 'device': 128, 'controller': 83, 'value': 0 },
		{ 'name': 'Sampler Stop', 'trigger': ':', 'device': 144, 'controller': 84, 'value': 0 },
		{ 'name': 'Sampler Stop', 'trigger': ':', 'device': 128, 'controller': 84, 'value': 0 },
		{ 'name': 'Sampler Clear', 'trigger': 'alt+;', 'device': 144, 'controller': 85, 'value': 0 },
		{ 'name': 'Sampler Clear', 'trigger': 'alt+;', 'device': 128, 'controller': 85, 'value': 0 },
		{ 'name': 'Sampler Clear', 'trigger': 'return', 'device': 128, 'controller': 81, 'value': 0 }


  ]
}

banks = {
	"bank" : [
		{
			"id" : 0,
			"name" : "MasterGif",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "MasterGif/", "name" : "masterGif_demo_1_o", "type" : 'flip', "set": "a"},
				{ "trigger" : "b", "location" : "MasterGif/", "name" : "masterGif_demo_2_o", "type" : 'flip', "set": "a"}
			]
		},
		{
			"id" : 1,
			"name" : "Dancing",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "Dancing/", "name" : "b", "type" : 'flip', "set": "a"},
				{ "trigger" : "b", "location" : "Dancing/", "name" : "h", "type" : 'flip', "set": "a"},
				{ "trigger" : "c", "location" : "Dancing/", "name" : "m", "type" : 'flip', "set": "a"},
				{ "trigger" : "d", "location" : "Dancing/", "name" : "n", "type" : 'flip', "set": "a"}
			]
		},
		{
			"id" : 2,
			"name" : "Bathbombs",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "BathBombs/", "name" : "bathbomb-galaxy-1_o", "type" : 'flip', "set": "a"},
				{ "trigger" : "b", "location" : "BathBombs/", "name" : "bathbomb-spinner-1_o", "type" : 'flip', "set": "a"},
				{ "trigger" : "c", "location" : "BathBombs/", "name" : "bathbomb-spinner-blur_o", "type" : 'flip', "set": "a"},
				{ "trigger" : "d", "location" : "BathBombs/", "name" : "bathbomb-slow-2_o", "type" : 'flip', "set": "a"}
			]
		},
		{
			"id" : 3,
			"name" : "Trails",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "DancingTrails/", "name" : "a", "type" : 'flip', "set": "a"},
				{ "trigger" : "b", "location" : "DancingTrails/", "name" : "b", "type" : 'flip', "set": "a"},
				{ "trigger" : "c", "location" : "DancingTrails/", "name" : "c", "type" : 'flip', "set": "a"},
				{ "trigger" : "d", "location" : "DancingTrails/", "name" : "d", "type" : 'flip', "set": "a"},
				{ "trigger" : "e", "location" : "DancingTrails/", "name" : "e", "type" : 'flip', "set": "a"},
				{ "trigger" : "f", "location" : "DancingTrails/", "name" : "f", "type" : 'flip', "set": "a"},
				{ "trigger" : "g", "location" : "DancingTrails/", "name" : "g", "type" : 'flip', "set": "a"},
				{ "trigger" : "h", "location" : "DancingTrails/", "name" : "h", "type" : 'flip', "set": "a"},
				{ "trigger" : "i", "location" : "DancingTrails/", "name" : "i", "type" : 'flip', "set": "a"},
				{ "trigger" : "j", "location" : "DancingTrails/", "name" : "j", "type" : 'flip', "set": "a"}
			]
		},
		{
			"id" : 4,
			"name" : "Trails",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "HighSierras/", "name" : "high-sierras-3_o", "type" : 'flip', "set": "a"},
				{ "trigger" : "b", "location" : "HighSierras/", "name" : "high-sierras-12_o", "type" : 'flip', "set": "a"},
				{ "trigger" : "c", "location" : "StarTrails/", "name" : "l", "type" : 'flip', "set": "a"},
				{ "trigger" : "d", "location" : "StarTrails/", "name" : "v", "type" : 'flip', "set": "a"}
			]
		},
		{
			"id" : 5,
			"name" : "Canyon Fly",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "CanyonFly/", "name" : "canyon_fly_1_o_t", "type" : 'flip', "set": "a"},
				{ "trigger" : "b", "location" : "CanyonFly/", "name" : "canyon_fly_1_o", "type" : 'flip', "set": "a"},
				{ "trigger" : "c", "location" : "CanyonFly/", "name" : "canyon_fly_2_o_t", "type" : 'flip', "set": "a"},
				{ "trigger" : "d", "location" : "CanyonFly/", "name" : "canyon_fly_2_o", "type" : 'flip', "set": "a"},
				{ "trigger" : "e", "location" : "CanyonFly/", "name" : "canyon_fly_3_o_t", "type" : 'flip', "set": "a"},
				{ "trigger" : "f", "location" : "CanyonFly/", "name" : "canyon_fly_3_o", "type" : 'flip', "set": "a"}
			]
		}
	]
}

// sampledScenes = {
// 	"scene" : [
// 		{
// 			"stages" : [
// 				{ "bank" : 2, "location" : "BathBombs/", "gif" : "bathbomb-spinner-1_o", "size" : "cover", "no-repeat" : "repeat", "blend" : "normal" },
// 				{ "bank" : 1, "location" : "Dancing/", "gif" : "h", "size" : "auto", "repeat" : "repeat", "blend" : "screen" }
// 			]
// 		},
// 		{
// 			"stages" : [
// 				{ "bank" : 0, "location" : "MasterGif/", "gif" : "masterGif_demo_1_o", "size" : "auto", "repeat" : "repeat", "blend" : "normal" },
// 				{ "bank" : 1, "location" : "Dancing/", "gif" : "m", "size" : "auto", "repeat" : "repeat", "blend" : "screen" }
// 			]
// 		},
// 		{
// 			"stages" : [
// 				{ "bank" : 0, "location" : "MasterGif/", "gif" : "masterGif_demo_1_o", "size" : "auto", "repeat" : "repeat", "blend" : "normal" },
// 				{ "bank" : 1, "location" : "Dancing/", "gif" : "m", "size" : "auto", "repeat" : "repeat", "blend" : "screen" }
// 			]
// 		}
// 	]
// }

setsArray = [];

bankerSets = {
	"set" : [
		{
			"name" : "set1",
			"trigger" : "a",
			"bank" : 2,
			"gifs" : [
				{ "location" : "BathBombs/", "name" : "bathbomb-spinner-blur_o"},
				{ "location" : "BathBombs/", "name" : "bathbomb-slow-2_o"}
			]
		},
		{
			"name" : "set2",
			"trigger" : "b",
			"bank" : 1,
			"gifs" : [
				{ "location" : "Dancing/", "name" : "h"},
				{ "location" : "Dancing/", "name" : "m"}
			]
		},
		{
			"name" : "set3",
			"trigger" : "c",
			"bank" : 0,
			"gifs" : [
				{ "location" : "MasterGif/", "name" : "masterGif_demo_1_o"},
				{ "location" : "MasterGif/", "name" : "masterGif_demo_2_o"}
			]
		},
		{
			"name" : "set4",
			"trigger" : "d",
			"bank" : 1,
			"gifs" : [
				{ "location" : "Dancing/", "name" : "b"},
				{ "location" : "Dancing/", "name" : "n"}
			]
		},
		{
			"name" : "set5",
			"trigger" : "e",
			"bank" : 4,
			"gifs" : [
				{ "location" : "StarTrails/", "name" : "l"},
				// { "location" : "StarTrails/", "name" : "v"},
				// { "location" : "HighSierras/", "name" : "high-sierras-3_o"},
				{ "location" : "HighSierras/", "name" : "high-sierras-12_o"}
			]
		}
	]
}

var effectsOn = [];
var filtersOn = [];
var beatTime = 2000;
var beatSpeed = 1000;
var titlePageOn = 0;
var sameSameConstant = 2;
var saturateAmount = 100;
var blurAmount = 5;
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
				enabled: false,
				filterKey: "5"
			},
			invert: {
				name: 'invert',
				enabled: true,
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
