// GifJay v.0.8.9

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// USER SETTINGS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

var midiOn = true;

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
		{ 'name': 'Sample', 'trigger': 'return', 'device': 128, 'controller': 81, 'value': 0 },

		{ 'name': 'GIY: a', 'trigger': 'a', 'device': 128, 'controller': 53, 'value': 0 },
		{ 'name': 'GIY: b', 'trigger': 'b', 'device': 128, 'controller': 54, 'value': 0 },
		{ 'name': 'GIY: c', 'trigger': 'c', 'device': 128, 'controller': 55, 'value': 0 },
		{ 'name': 'GIY: d', 'trigger': 'd', 'device': 128, 'controller': 56, 'value': 0 },
		{ 'name': 'GIY: e', 'trigger': 'e', 'device': 128, 'controller': 57, 'value': 0 },
		{ 'name': 'GIY: f', 'trigger': 'f', 'device': 129, 'controller': 53, 'value': 0 },
		{ 'name': 'GIY: g', 'trigger': 'g', 'device': 129, 'controller': 54, 'value': 0 },
		{ 'name': 'GIY: h', 'trigger': 'h', 'device': 129, 'controller': 55, 'value': 0 },
		{ 'name': 'GIY: i', 'trigger': 'i', 'device': 129, 'controller': 56, 'value': 0 },
		{ 'name': 'GIY: j', 'trigger': 'j', 'device': 129, 'controller': 57, 'value': 0 },
		{ 'name': 'GIY: k', 'trigger': 'k', 'device': 130, 'controller': 53, 'value': 0 },
		{ 'name': 'GIY: l', 'trigger': 'l', 'device': 130, 'controller': 54, 'value': 0 },
		{ 'name': 'GIY: m', 'trigger': 'm', 'device': 130, 'controller': 55, 'value': 0 },
		{ 'name': 'GIY: n', 'trigger': 'n', 'device': 130, 'controller': 56, 'value': 0 },
		{ 'name': 'GIY: o', 'trigger': 'o', 'device': 130, 'controller': 57, 'value': 0 },
		{ 'name': 'GIY: p', 'trigger': 'p', 'device': 131, 'controller': 53, 'value': 0 },
		{ 'name': 'GIY: q', 'trigger': 'q', 'device': 131, 'controller': 54, 'value': 0 },
		{ 'name': 'GIY: r', 'trigger': 'r', 'device': 131, 'controller': 55, 'value': 0 },
		{ 'name': 'GIY: s', 'trigger': 's', 'device': 131, 'controller': 56, 'value': 0 },
		{ 'name': 'GIY: t', 'trigger': 't', 'device': 131, 'controller': 57, 'value': 0 },
		{ 'name': 'GIY: u', 'trigger': 'u', 'device': 132, 'controller': 53, 'value': 0 },
		{ 'name': 'GIY: v', 'trigger': 'v', 'device': 132, 'controller': 54, 'value': 0 },
		{ 'name': 'GIY: w', 'trigger': 'w', 'device': 132, 'controller': 55, 'value': 0 },
		{ 'name': 'GIY: x', 'trigger': 'x', 'device': 132, 'controller': 56, 'value': 0 },
		{ 'name': 'GIY: y', 'trigger': 'y', 'device': 132, 'controller': 57, 'value': 0 },
		{ 'name': 'GIY: z', 'trigger': 'z', 'device': 133, 'controller': 53, 'value': 0 }
  ]
}

// GIF BINS
const banks = {
	"bank" : [
		{
			"id" : 0,
			"trigger": ")",
			"name" : "MasterGif",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "MasterGif/", "name" : "masterGif_demo_1_o", "type" : 'flip', "set": 'a'},
				{ "trigger" : "b", "location" : "MasterGif/", "name" : "masterGif_demo_2_o", "type" : 'flip', "set": 'a'},

				{ "trigger" : "q", "location" : "Dancing/", "name" : "b", "type" : 'flip', "set": "b"},
				{ "trigger" : "a", "location" : "Dancing/", "name" : "h", "type" : 'flip', "set": "b"},
				{ "trigger" : null, "location" : "Dancing/", "name" : "m", "type" : 'flip', "set": "b"},
				{ "trigger" : null, "location" : "Dancing/", "name" : "n", "type" : 'flip', "set": "b"},

				{ "trigger" : "u", "location" : "BathBombs/", "name" : "bathbomb-galaxy-1_o", "type" : 'flip', "set": "c"},
				{ "trigger" : "i", "location" : "BathBombs/", "name" : "bathbomb-spinner-1_o", "type" : 'flip', "set": "c"},
				{ "trigger" : null, "location" : "BathBombs/", "name" : "bathbomb-spinner-blur_o", "type" : 'flip', "set": "c"},
				{ "trigger" : null, "location" : "BathBombs/", "name" : "bathbomb-slow-2_o", "type" : 'flip', "set": "c"},

				{ "trigger" : "q", "location" : "DancingTrails/", "name" : "a", "type" : 'flip', "set": "d"},
				{ "trigger" : "w", "location" : "DancingTrails/", "name" : "b", "type" : 'flip', "set": "d"},
				{ "trigger" : "e", "location" : "DancingTrails/", "name" : "c", "type" : 'flip', "set": "d"},
				{ "trigger" : "r", "location" : "DancingTrails/", "name" : "d", "type" : 'flip', "set": "d"},
				{ "trigger" : "a", "location" : "DancingTrails/", "name" : "e", "type" : 'flip', "set": null},
				{ "trigger" : "s", "location" : "DancingTrails/", "name" : "f", "type" : 'flip', "set": null},
				{ "trigger" : "d", "location" : "DancingTrails/", "name" : "g", "type" : 'flip', "set": null},
				{ "trigger" : "f", "location" : "DancingTrails/", "name" : "h", "type" : 'flip', "set": null},
				{ "trigger" : "z", "location" : "DancingTrails/", "name" : "i", "type" : 'flip', "set": null},
				{ "trigger" : "x", "location" : "DancingTrails/", "name" : "j", "type" : 'flip', "set": null},

				{ "trigger" : "a", "location" : "HighSierras/", "name" : "high-sierras-3_o", "type" : 'flip', "set": "e"},
				{ "trigger" : "b", "location" : "HighSierras/", "name" : "high-sierras-12_o", "type" : 'flip', "set": "e"},
				{ "trigger" : "c", "location" : "StarTrails/", "name" : "l", "type" : 'flip', "set": "e"},
				{ "trigger" : "d", "location" : "StarTrails/", "name" : "v", "type" : 'flip', "set": "e"},

				{ "trigger" : "a", "location" : "CanyonFly/", "name" : "canyon_fly_1_o_t", "type" : 'flip', "set": "f"},
				{ "trigger" : "b", "location" : "CanyonFly/", "name" : "canyon_fly_1_o", "type" : 'flip', "set": "f"},
				{ "trigger" : "c", "location" : "CanyonFly/", "name" : "canyon_fly_2_o_t", "type" : 'flip', "set": "f"},
				{ "trigger" : "d", "location" : "CanyonFly/", "name" : "canyon_fly_2_o", "type" : 'flip', "set": "f"},
				{ "trigger" : "e", "location" : "CanyonFly/", "name" : "canyon_fly_3_o_t", "type" : 'flip', "set": "f"},
				{ "trigger" : "", "location" : "CanyonFly/", "name" : "canyon_fly_3_o", "type" : 'flip', "set": "f"}
			]
		},
		{
			"id" : 1,
			"trigger": "!",
			"name" : "Dancing",
			"enabled" : false,
			"gifs" : [
				{ "trigger" : "q", "location" : "Dancing/", "name" : "b", "type" : 'flip', "set": "b"},
				{ "trigger" : "a", "location" : "Dancing/", "name" : "h", "type" : 'flip', "set": "b"},
				{ "trigger" : null, "location" : "Dancing/", "name" : "m", "type" : 'flip', "set": "b"},
				{ "trigger" : null, "location" : "Dancing/", "name" : "n", "type" : 'flip', "set": "b"}
			]
		},
		{
			"id" : 2,
			"trigger": "@",
			"name" : "Bathbombs",
			"enabled" : false,
			"gifs" : [
				{ "trigger" : "u", "location" : "BathBombs/", "name" : "bathbomb-galaxy-1_o", "type" : 'flip', "set": "c"},
				{ "trigger" : "i", "location" : "BathBombs/", "name" : "bathbomb-spinner-1_o", "type" : 'flip', "set": "c"},
				{ "trigger" : null, "location" : "BathBombs/", "name" : "bathbomb-spinner-blur_o", "type" : 'flip', "set": null},
				{ "trigger" : null, "location" : "BathBombs/", "name" : "bathbomb-slow-2_o", "type" : 'flip', "set": null}
			]
		},
		{
			"id" : 3,
			"trigger": "#",
			"name" : "Trails",
			"enabled" : false,
			"gifs" : [
				{ "trigger" : "q", "location" : "DancingTrails/", "name" : "a", "type" : 'flip', "set": "a"},
				{ "trigger" : "w", "location" : "DancingTrails/", "name" : "b", "type" : 'flip', "set": "a"},
				{ "trigger" : "e", "location" : "DancingTrails/", "name" : "c", "type" : 'flip', "set": "z"},
				{ "trigger" : "r", "location" : "DancingTrails/", "name" : "d", "type" : 'flip', "set": "z"},
				{ "trigger" : "a", "location" : "DancingTrails/", "name" : "e", "type" : 'flip', "set": "z"},
				{ "trigger" : "s", "location" : "DancingTrails/", "name" : "f", "type" : 'flip', "set": "z"},
				{ "trigger" : "d", "location" : "DancingTrails/", "name" : "g", "type" : 'flip', "set": "y"},
				{ "trigger" : "f", "location" : "DancingTrails/", "name" : "h", "type" : 'flip', "set": "y"},
				{ "trigger" : "z", "location" : "DancingTrails/", "name" : "i", "type" : 'flip', "set": "z"},
				{ "trigger" : "x", "location" : "DancingTrails/", "name" : "j", "type" : 'flip', "set": "z"}
			]
		},
		{
			"id" : 4,
			"trigger": "$",
			"name" : "Trails",
			"enabled" : false,
			"gifs" : [
				{ "trigger" : "a", "location" : "HighSierras/", "name" : "high-sierras-3_o", "type" : 'flip', "set": null},
				{ "trigger" : "b", "location" : "HighSierras/", "name" : "high-sierras-12_o", "type" : 'flip', "set": null},
				{ "trigger" : "c", "location" : "StarTrails/", "name" : "l", "type" : 'flip', "set": "a"},
				{ "trigger" : "d", "location" : "StarTrails/", "name" : "v", "type" : 'flip', "set": "a"}
			]
		},
		{
			"id" : 5,
			"trigger": "%",
			"name" : "Canyon Fly",
			"enabled" : false,
			"gifs" : [
				{ "trigger" : "a", "location" : "CanyonFly/", "name" : "canyon_fly_1_o_t", "type" : 'flip', "set": null},
				{ "trigger" : "b", "location" : "CanyonFly/", "name" : "canyon_fly_1_o", "type" : 'flip', "set": null},
				{ "trigger" : "c", "location" : "CanyonFly/", "name" : "canyon_fly_2_o_t", "type" : 'flip', "set": null},
				{ "trigger" : "d", "location" : "CanyonFly/", "name" : "canyon_fly_2_o", "type" : 'flip', "set": null},
				{ "trigger" : "e", "location" : "CanyonFly/", "name" : "canyon_fly_3_o_t", "type" : 'flip', "set": null},
				{ "trigger" : "", "location" : "CanyonFly/", "name" : "canyon_fly_3_o", "type" : 'flip', "set": null}
			]
		}
	]
}

setsArray = [];

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
blendModeSwitcherArray = ['multiply','darken','lighten','color-dodge','color-burn',
  'hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'];
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
			kaleidoscope: { name: 'kaleidoscope', enabled: true, filterKey: "1" },
			sameSame: { name: 'sameSame', enabled: true, filterKey: "3" },
			stgFade: { name: 'stgFade', enabled: true, filterKey: "4" },
			invert: { name: 'invert', enabled: true, filterKey: "7" },
			saturator: { name: 'saturator', enabled: true, filterKey: "8" },
			hueShift: { name: 'hueShift', enabled: true, filterKey: "9" },
			blurry: { name: 'blurry', enabled: true, filterKey: "0" }
		}
	}
}

var appFX = app.settings.effects;
