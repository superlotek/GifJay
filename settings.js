// GifJay v.0.8.9

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// USER SETTINGS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

banksInUse = [];

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
var blurAmount = 10;
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
