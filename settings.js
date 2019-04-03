const appz = {
	"midiOn" : false,
	"defaultBeatTime" : 2000,
	"beatSpeed": 1000,
	"sameSameConstant" : 2,
	"overlaysEnabled" : true,
	"startupBankNumber" : 0,
	"startupBankTrigger" : "a",

	"stageArray" : ['sf', 'st'],
	"blendModeArray" : ['screen','overlay'],

	"fontStyles" : ["Baloo Chettan", "Germania One", "Fascinate Inline", "Monoton", "Press Start 2P", "Spicy Rice"],

	"blendModes" : {
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
	},

	"filters" : {
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
	},

	"effects": {
		"kaleidoscope": { "name": 'kaleidoscope', "enabled": true, "trigger": "1" },
		"sameSame": { "name": 'sameSame', "enabled": true, "trigger": "3" },
		"stgFade": { "name": 'stgFade', "enabled": true, "trigger": "4" },
	},

	"overlays" : [
		{ 'trigger' : '1', 'location' : 'overlays', 'name' : 'clubMutoid_logo_ani.gif'},
	],


	"sequence" : [
		{
			"trigger": "a",
			"name" : "Some sequence",
			"enabled" : true,
			"scene" : [
				{
					"gifs" : [
						{ 'location' : 'BotP/', 'name' : 'battleOfThePlanets_keyopDiscoDance2_o' },
						{ 'location' : 'BotP/', 'name' : 'battleOfThePlanets_markFlipping_o' },
					]
				},
				{
					"gifs" : [
						{ 'location' : '4thStreetVine/', 'name' : 'forest-forgery-2-F2-FX_o' },
						{ 'location' : '4thStreetVine/', 'name' : 'golden-flows_o' },
					]
				},
				{
					"gifs" : [
						{ 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_kid_zap_robot_o' },
						{ 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_dance_o' },
					]
				},
				{
					"gifs" : [
						{ 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.29.26' },
						{ 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.38.00' },
					]
				}
			]
		},
		{
			"trigger": "b",
			"name" : "Another sequence",
			"enabled" : false,
			"scene" : [
				{
					"gifs" : [
						{ 'location' : '4thStreetVine/', 'name' : 'robot_woman_head_back_o' },
						{ 'location' : '4thStreetVine/', 'name' : 'tvshow_man_floating_triangle_o' },
					]
				},
				{
					"gifs" : [
						{ 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-1_o' },
						{ 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-1_transparent_o' }
					]
				}
			]
		},
		{
			"trigger": "c",
			"name" : "Last sequence",
			"enabled" : true,
			"scene" : [
				{
					"gifs" : [
						{ 'location' : '4thStreetVine/', 'name' : 'robot_woman_head_back_o' },
						{ 'location' : '4thStreetVine/', 'name' : 'tvshow_man_floating_triangle_o' },
					]
				},
				{
					"gifs" : [
						{ 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-1_o' },
						{ 'location' : 'FullTimeTrumpet/', 'name' : 'full-time-trumpet-FX-1_transparent_o' }
					]
				}
			]
		}
	],

	"bank" : [
		{
			"id" : 0,
			"trigger": "a",
			"name" : "Backgrounds 1",
			"enabled" : true,
			"sequencer" : false,
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
			"enabled" : false,
			"sequencer" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'forbidden_world_hyperspace2', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : '4thStreetVine/', 'name' : 'forest-forgery-1-B-FX1_o', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : '4thStreetVine/', 'name' : 'forest-forgery-2-F2-FX_o', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : '4thStreetVine/', 'name' : 'golden-flows_o', 'set': 'm'},
				{ 'trigger' : 't', 'location' : '4thStreetVine/', 'name' : 'grid-open-doors_o', 'set': 'm'},
				{ 'trigger' : 'a', 'location' : '4thStreetVine/', 'name' : 'kaleidoscope_pointed_muted', 'set': 'm'},
			]
		},
		{
			"id" : 2,
			"trigger": "c",
			"name" : "Backgrounds 3",
			"enabled" : false,
			"sequencer" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'JapaneseAnims/', 'name' : 'japan_FileJul1814555AM', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : 'JapaneseAnims/', 'name' : 'japan_FileJul184611AM', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : 'JapaneseAnims/', 'name' : 'japan_Jul1814018AM', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : 'JapaneseAnims/', 'name' : 'japan_Jul1814034AM', 'set': 'm'},
				{ 'trigger' : 't', 'location' : 'JapaneseAnims/', 'name' : 'japan_Jul1814415AM', 'set': 'm'},
			]
		},

		{
			"id" : 3,
			"trigger": "d",
			"name" : "Foregrounds 1 - Dancing",
			"enabled" : true,
			"sequencer" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_discoDancers_o', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_keyopDiscoDance_o', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_keyopDiscoDance2_o', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_markFlipping_o', 'set': 'm'},
				{ 'trigger' : 't', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_markOnGlass_o', 'set': 'm'},
				{ 'trigger' : 'a', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_princessDiscoDance_o', 'set': 'm'},
			]
		},
		{
			"id" : 4,
			"trigger": "e",
			"name" : "Foregrounds 2 - Robots and Stuff",
			"enabled" : true,
			"sequencer" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'robot_woman_head_back_o', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : '4thStreetVine/', 'name' : 'tvshow_man_floating_triangle_o', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_kid_zap_robot_o', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_dance_o', 'set': 'm'},
				{ 'trigger' : 't', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_walk_o', 'set': 'm'},
				{ 'trigger' : 'a', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_zap_o', 'set': 'm'},
			]
		},

		{
			"id" : 5,
			"trigger": "f",
			"name" : "Foregrounds 3",
			"enabled" : true,
			"sequencer" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'Eyes/', 'name' : 'eyes_s_o', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : '4thStreetVine/', 'name' : 'eye_laser_sparkles_o', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : '4thStreetVine/', 'name' : 'eye_lasers_1_o', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : '4thStreetVine/', 'name' : 'walking-block-man', 'set': 'm'},
				{ 'trigger' : 't', 'location' : '4thStreetVine/', 'name' : 'walking_o', 'set': 'm'},
				{ 'trigger' : 'a', 'location' : '4thStreetVine/', 'name' : 'crashing_cars_o', 'set': 'm'},
				{ 'trigger' : 's', 'location' : '4thStreetVine/', 'name' : 'spinning-rainbow-person_o', 'set': 'm'},
			]
		},

		{
			"id" : 6,
			"trigger": "g",
			"name" : "Foregrounds 4 - Bands",
			"enabled" : true,
			"sequencer" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_drums_o', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : 'Jem/', 'name' : 'jem_hittingDrumPads_o', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : 'Bravestarr/', 'name' : 'bravestarr_man_drumming_o', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_drumsticksPlaying_o', 'set': 'm'},
				{ 'trigger' : 't', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_drumsticksPlaying_o_t', 'set': 'm'},
			]
		},

		{
			"id" : 7,
			"trigger": "h",
			"name" : "Foregrounds 5 - Aerobics",
			"enabled" : true,
			"sequencer" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_7', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_8', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_9', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_group1_o', 'set': 'm'},
				{ 'trigger' : 'a', 'location' : '4thStreetVine/', 'name' : 'aerobic-trails-1_o', 'set': 'm'},
				{ 'trigger' : 's', 'location' : '4thStreetVine/', 'name' : 'aerobic-trails-2_o', 'set': 'm'},
				{ 'trigger' : 'd', 'location' : '4thStreetVine/', 'name' : 'aerobic-trails-3_o', 'set': 'm'},
			]
		},

		{
			"id" : 8,
			"trigger": "i",
			"name" : "Foregrounds 6 - Hercules",
			"enabled" : true,
			"sequencer" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_green_beams', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : 'Hercules/', 'name' : 'hercules_head_swirlies', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : 'Hercules/', 'name' : 'hercules_hercules_transport', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : 'Hercules/', 'name' : 'hercules_king', 'set': 'm'},
				{ 'trigger' : 't', 'location' : 'Hercules/', 'name' : 'hercules_king_explosion', 'set': 'm'},
				{ 'trigger' : 'a', 'location' : 'Hercules/', 'name' : 'hercules_king_hercules_fight', 'set': 'm'},
				{ 'trigger' : 's', 'location' : 'Hercules/', 'name' : 'hercules_king_hercules_fight2', 'set': 'm'},
				{ 'trigger' : 'd', 'location' : 'Hercules/', 'name' : 'hercules_king_laser_eyes', 'set': 'm'},
				{ 'trigger' : 'f', 'location' : 'Hercules/', 'name' : 'hercules_king_swing_beam', 'set': 'm'},
			]
		},
		{
			"id" : 9,
			"trigger": "j",
			"name" : "Foregrounds 7 - Mission Space Delta",
			"enabled" : true,
			"sequencer" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.07.08', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.15.08', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.20.16', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.29.26', 'set': 'm'},
				{ 'trigger' : 't', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0320.38.00', 'set': 'm'},
				{ 'trigger' : 'a', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0321.47.22', 'set': 'm'},
				{ 'trigger' : 's', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0322.09.49', 'set': 'm'},
				{ 'trigger' : 'd', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0322.13.57', 'set': 'm'},
				{ 'trigger' : 'f', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0322.16.05', 'set': 'm'},
				{ 'trigger' : 'g', 'location' : 'MissionSpatialeDelta2/', 'name' : 'msd_2018-03-0322.30.08', 'set': 'm'},
			]
		},
		{
			"id" : 10,
			"trigger": "k",
			"name" : "Foregrounds 7 - Mission Space Delta",
			"enabled" : true,
			"sequencer" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_keyboards2_o', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_fingers_keyboard_o', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_keyboards_cu_o', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_keyboards_o', 'set': 'm'},
			]
		},
		{
			"id" : 11,
			"trigger": "l",
			"name" : "Open Seas",
			"enabled" : true,
			"sequencer" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.07.34', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.10.01', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.31.08', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.32.27', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-30 22.33.19', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.34.11', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.35.28', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.36.47', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.37.47', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.38.25', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.39.38', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.41.20', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.42.06', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.42.52', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.44.18', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.45.29', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3022.46.53', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.07.09', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.07.56', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.09.31', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.10.34', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.11.17', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.12.02', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.12.47', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.13.34', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.14.16', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.15.09', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.16.23', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.17.08', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.18.02', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.18.52', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.19.58', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.21.03', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.22.11', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.23.12', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.24.13', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'ClubSurge/', 'name' : '2019-03-3023.25.06', 'set': 'm'},
			]
		}
	]
}
