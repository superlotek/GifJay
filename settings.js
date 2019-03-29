// GifJay v.0.8.9

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// USER SETTINGS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var midiOn = false;
var overlaysEnabled = true;
var bankNumber = 0;
var bankTrigger = "a";

// OVERLAYS
const overlays = [
	{ 'trigger' : '1', 'location' : 'overlays', 'name' : 'clubMutoid_logo_ani.gif'},
	// { 'trigger' : '2', 'location' : 'overlays', 'name' : 'onymico_logo_black_ani.gif'},
	// { 'trigger' : '3', 'location' : 'overlays', 'name' : 'manAMAchine_logo_black_ani.gif'},
]

// GIF BINS
const appz = {

	"overlays" : [
		{ 'trigger' : '1', 'location' : 'overlays', 'name' : 'clubMutoid_logo_ani.gif'},
	],

	"bank" : [
		{
			"id" : 0,
			"trigger": "a",
			"name" : "Backgrounds 1",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-1_o', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-1_transparent_o', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-2_o', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-2_transparent_o', 'set': 'm'},
				{ 'trigger' : 't', 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-3_o', 'set': 'm'},
				{ 'trigger' : 'a', 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-3_transparent_o', 'set': 'm'},
				{ 'trigger' : 's', 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-4_o', 'set': 'm'},
				{ 'trigger' : 'd', 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-4_transparent_o', 'set': 'm'},
			]
		},
		{
			"id" : 1,
			"trigger": "b",
			"name" : "Backgrounds 2",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'forbidden_world_hyperspace2', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'forest-forgery-1-B-FX1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'forest-forgery-2-F2-FX_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'golden-flows_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'grid-open-doors_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'kaleidoscope_pointed_muted', 'set': 'm'},
			]
		},
		{
			"id" : 2,
			"trigger": "c",
			"name" : "Backgrounds 3",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'JapaneseAnims/', 'name' : 'japan_FileJul1814555AM', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'JapaneseAnims/', 'name' : 'japan_FileJul184611AM', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'JapaneseAnims/', 'name' : 'japan_Jul1814018AM', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'JapaneseAnims/', 'name' : 'japan_Jul1814034AM', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'JapaneseAnims/', 'name' : 'japan_Jul1814415AM', 'set': 'm'},
			]
		},

		{
			"id" : 3,
			"trigger": "d",
			"name" : "Foregrounds 1 - Dancing",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_discoDancers_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_keyopDiscoDance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_keyopDiscoDance2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_markFlipping_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_markOnGlass_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_princessDiscoDance_o', 'set': 'm'},
			]
		},
		{
			"id" : 4,
			"trigger": "e",
			"name" : "Foregrounds 2 - Robots and Stuff",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'robot_woman_head_back_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'tvshow_man_floating_triangle_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_kid_zap_robot_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_dance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_walk_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_zap_o', 'set': 'm'},
			]
		},

		{
			"id" : 5,
			"trigger": "f",
			"name" : "Foregrounds 3",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'Eyes/', 'name' : 'eyes_s_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'eye_laser_sparkles_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'eye_lasers_1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'walking-block-man', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'walking_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'crashing_cars_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'spinning-rainbow-person_o', 'set': 'm'},
			]
		},

		{
			"id" : 6,
			"trigger": "g",
			"name" : "Foregrounds 4 - Bands",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'f', 'location' : 'Jem/', 'name' : 'jem_drums_o', 'set': 'm'},
				{ 'trigger' : 'g', 'location' : 'Jem/', 'name' : 'jem_hittingDrumPads_o', 'set': 'm'},
				{ 'trigger' : 'z', 'location' : 'Bravestarr/', 'name' : 'bravestarr_man_drumming_o', 'set': 'm'},
				{ 'trigger' : 'x', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_drumsticksPlaying_o', 'set': 'm'},
				{ 'trigger' : 'c', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_drumsticksPlaying_o_t', 'set': 'm'},
			]
		},

		{
			"id" : 7,
			"trigger": "h",
			"name" : "Foregrounds 5 - Aerobics",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_7', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_8', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_9', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_group1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobic-trails-1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobic-trails-2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobic-trails-3_o', 'set': 'm'},
			]
		},

		{
			"id" : 8,
			"trigger": "i",
			"name" : "Foregrounds 6 - Hercules",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_green_beams', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_head_swirlies', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_hercules_transport', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_king', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_king_explosion', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_king_hercules_fight', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_king_hercules_fight2', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_king_laser_eyes', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_king_swing_beam', 'set': 'm'},
			]
		},
		{
			"id" : 9,
			"trigger": "j",
			"name" : "Foregrounds 7 - Mission Space Delta",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.07.08', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.15.08', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.20.16', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.29.26', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.38.00', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0321.47.22', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0322.09.49', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0322.13.57', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0322.16.05', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0322.30.08', 'set': 'm'},
			]
		},
		{
			"id" : 10,
			"trigger": "k",
			"name" : "Foregrounds 7 - Mission Space Delta",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'g', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_keyboards2_o', 'set': 'm'},
				{ 'trigger' : 'z', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_fingers_keyboard_o', 'set': 'm'},
				{ 'trigger' : 'x', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_keyboards_cu_o', 'set': 'm'},
				{ 'trigger' : 'c', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_keyboards_o', 'set': 'm'},
			]
		}
	]
}

setsArray = [];

var effectsOn = [];
// var filtersOn = [];
var beatTime = 2000;
var beatSpeed = 1000;
var titlePageOn = 0;
var sameSameConstant = 2;
titlePageName = 'title-1.gif';

filters = {
	"strings": [
		{"value": ""},
		{"value": ""}
	],
  "filter" : [
    {
      "name": "Invert",
      "slugName": "invert",
      "trigger": "7",
      "min": 0,
      "max": 1,
      "unit": "",
      "enabled": true,
      "on": 0,
      "stage": [
        { "value": "" },
        { "value": "" }
      ]
    },
    {
      "name": "Saturate",
      "slugName": "saturate",
      "trigger": "8",
      "min": 1,
      "max": 100,
      "unit": "",
      "enabled": true,
      "on": 0,
      "stage": [
        { "value": "" },
        { "value": "" }
      ]
    },
    {
      "name": "Hue Rotate",
      "slugName": "hue-rotate",
      "trigger": "9",
      "min": 0,
      "max": 360,
      "unit": "deg",
      "enabled": true,
      "on": 0,
      "stage": [
        { "value": "" },
        { "value": "" }
      ]
    },
    {
      "name": "Blur",
      "slugName": "blur",
      "trigger": "0",
      "min": 0,
      "max": 5,
      "unit": "px",
      "enabled": true,
      "on": 0,
      "stage": [
        { "value": "" },
        { "value": "" }
      ]
    }
  ]
}

bankerSets = {
	"set" : [
		{
			"name" : "Eyeballs",
			"trigger" : "a",
			"gifs" : [
				{'location' : '4thStreetVine/', 'name' : 'robot_woman_head_back_o' },
				{'location' : '4thStreetVine/', 'name' : 'electro_pyramid_zoom' },
				{'location' : '4thStreetVine/', 'name' : 'eye_laser_sparkles_o' },
				{'location' : '4thStreetVine/', 'name' : 'eye_lasers_1_o' },
				{'location' : 'BathBombs/', 'name' : 'bathbomb-boomerang_o'},
				{'location' : 'BathBombs/', 'name' : 'bathbomb-galaxy-1_o'},
				{'location' : 'BathBombs/', 'name' : 'bathbomb-galaxy-2_o'},
				{'trigger' : 'q', 'location' : 'BathBombs/', 'name' : 'bathbomb-slow-1_o'}
			]
		},
		{
			"name" : "Hercules",
			"trigger" : "b",
			"gifs" : [
				{'location' : 'Hercules/', 'name' : 'hercules_mermaid_eye_beams_o'},
				{'location' : 'Hercules/', 'name' : 'hercules_movie_intro_eye2_o'},
				{'location' : 'Hercules/', 'name' : 'hercules_shooting_star_crater_o'},
				{'location' : 'Hercules/', 'name' : 'hercules_space_tunnel_explosion_o'},
				{'location' : 'Hercules/', 'name' : 'hercules_woman_arms_beam_o'},
				{'location' : 'Hercules/', 'name' : 'hercules_woman_space_trails_dance_o'},
				{'location' : 'Hercules/', 'name' : 'hercules_women_sparkle_shower_o'},
				{'location' : 'Hercules/', 'name' : 'hercules_women_sparkles_fadeOut_o'}
			]
		},
		{
			"name" : "Aerobics Competition",
			"trigger" : "c",
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_1', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_10', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_11', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_12', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_13', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_14', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_15', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_16', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_17', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_18', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_19', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_2', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_20', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_21', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_22', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_23', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_24', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_25', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_26', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_27', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_28', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_29', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_3', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_30', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_31', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_32', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_4', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_5', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_6', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_7', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_8', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_9', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_group1', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_group1_o', 'set': 'm'}
			]
		},
		{
			"name" : "Wonder Twins",
			"trigger" : "d",
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_downhillWagon', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_fistBump1', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_fistBump1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_fistBump2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_fistBump3', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_fists_beach', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_formOfWater_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_jayna_transforms_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_spiralSpin_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_transforming', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_transforming_o', 'set': 'm'},
			]
		},
	]
}

var blendModes = {
	"mix" : [
		{ "name": "multiply", "trigger": "1", "enabled": true },
		{ "name": "darken", "trigger": "1", "enabled": true },
		{ "name": "lighten", "trigger": "1", "enabled": true },
		{ "name": "color-dodge", "trigger": "1", "enabled": true },
		{ "name": "color-burn", "trigger": "1", "enabled": true },
		{ "name": "hard-light", "trigger": "1", "enabled": true },
		{ "name": "soft-light", "trigger": "1", "enabled": true },
		{ "name": "difference", "trigger": "1", "enabled": true },
		{ "name": "exclusion", "trigger": "1", "enabled": true },
		{ "name": "hue", "trigger": "1", "enabled": true },
		{ "name": "saturation", "trigger": "1", "enabled": true },
		{ "name": "color", "trigger": "1", "enabled": true },
		{ "name": "luminosity", "trigger": "1", "enabled": true }
	]
}

stageArray = ['sf', 'st'];
shapeArray = ['circle','triangle','rhombus','octagon','close','frame','rabbet'];
flipArray = ['rotateX(180deg)','rotateX(-180deg)','rotateY(180deg)','rotateY(-180deg)'];
blendModeSwitcherArray = ['multiply','darken','lighten','color-dodge','color-burn',
  'hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'];
blendModeArray = ['screen','overlay'];
effectArray = ['invert','saturation','brightness','hue-rotate','blur'];

bankArray = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r'];
// bgPosA = ['top', 'bottom'];
// bgPosB = ['right', 'left'];
// repeatArray = ['repeat', 'no-repeat'];
// borderArray = ['dotted', 'dashed', 'double', 'solid', 'ridge'];

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
