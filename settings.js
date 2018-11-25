// GifJay v.0.8.9

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// USER SETTINGS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

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
			"enabled" : true,
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
var blurAmount = 10;
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
