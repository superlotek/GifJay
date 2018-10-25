// GifJay v.0.8.9

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// USER SETTINGS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

banksInUse = [];

banks = {
	"bank" : [
		{
			"id" : 0,
			"name" : "The Lunar Saloon",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "b", "name" : "dancing_trails1"},
				{ "trigger" : "c", "name" : "dancing_trails2"},
				{ "trigger" : "f", "name" : "bathbomb-spinner-1_o"},
				{ "trigger" : "d", "name" : "bathbomb-boomerang_o"},
				{ "trigger" : "f", "name" : "star_trails"},
				{ "trigger" : "f", "name" : "star_trails2"},
				{ "trigger" : "f", "name" : "sun"},
				{ "trigger" : "f", "name" : "cruz-lights-3"},
				{ "trigger" : "f", "name" : "rainbow_cubes"},

				{ "trigger" : "f", "name" : "ikea_rainbow_kitchen"},
				{ "trigger" : "f", "name" : "star-rider-4_o"},
				{ "trigger" : "f", "name" : "medit_man_1"},
				{ "trigger" : "f", "name" : "video-feedback-2"},
				{ "trigger" : "f", "name" : "websafe_colors_b"}
			]
		},
		{
			"id" : 1,
			"name" : "Halloween",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "b", "name" : "creepy-clown-hands"},
				{ "trigger" : "c", "name" : "creepy-mask-kids_o"},
				{ "trigger" : "f", "name" : "dracula-blood-eyes"},
				{ "trigger" : "d", "name" : "dracula-eyes"},
				{ "trigger" : "f", "name" : "head-chop_o"},
				{ "trigger" : "f", "name" : "headless-squirting_o"},
				{ "trigger" : "f", "name" : "lightning_o"},
				{ "trigger" : "f", "name" : "scary-woman-blowing-out-candle"},
				{ "trigger" : "f", "name" : "screaming-woman-2"},

				{ "trigger" : "f", "name" : "skeleton-in-rearview_o"},
				{ "trigger" : "f", "name" : "skeleton-spinning-faces"},
				{ "trigger" : "f", "name" : "skeleton-with-smoke"},
				{ "trigger" : "f", "name" : "speeding-scary-forest"},
				{ "trigger" : "f", "name" : "spiderman-kotep-7_o"},
				{ "trigger" : "f", "name" : "spiderman-kotep-12"},
				{ "trigger" : "f", "name" : "spiderman-kotep-15_o"},
				{ "trigger" : "f", "name" : "thriller-zombie-heads_o"},
				{ "trigger" : "f", "name" : "wolf-man"},
				{ "trigger" : "f", "name" : "woman-arched-back"},
				{ "trigger" : "f", "name" : "woman-mask-face"},
				{ "trigger" : "f", "name" : "woman-screaming"},
				{ "trigger" : "f", "name" : "woman-vampire"},
				{ "trigger" : "f", "name" : "zombie-1_o"},
				{ "trigger" : "f", "name" : "zombie-crowd"},
				{ "trigger" : "f", "name" : "zoom-in-scary-woman"},
				{ "trigger" : "f", "name" : "channel_zero_1_o"},
				{ "trigger" : "f", "name" : "channel_zero_2_o"},
				{ "trigger" : "f", "name" : "channel_zero_3_o"},
				{ "trigger" : "f", "name" : "killer_clowns_1_o"},
				{ "trigger" : "f", "name" : "killer_clowns_2_o"},
				{ "trigger" : "f", "name" : "mummy_o"},
				{ "trigger" : "f", "name" : "mummy2_o"}

			]
		},
		{
			"id" : 2,
			"name" : "Halloween2",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "b", "name" : "tekkon_fireball"},
				{ "trigger" : "c", "name" : "tekkon_minotaur1"},
				{ "trigger" : "f", "name" : "tekkon_minotaurdance"},
				{ "trigger" : "d", "name" : "tekkon_minotauropencape"},
				{ "trigger" : "f", "name" : "tekkon_fire"},
				{ "trigger" : "f", "name" : "tekkon_eviltwin"},
				{ "trigger" : "f", "name" : "tekkon_darkhallway"},

				{ "trigger" : "f", "name" : "fv5_o"},
				{ "trigger" : "f", "name" : "fv7_o"},
				{ "trigger" : "f", "name" : "gold-and-purple-flows_o"},

				{ "trigger" : "f", "name" : "fp_transformation_REDO"},
				{ "trigger" : "f", "name" : "fp_traag_hands_eyes_REDO"},
				{ "trigger" : "f", "name" : "fp_traag_dance_shoot2_REDO"},
				{ "trigger" : "f", "name" : "fp_learning_head_2_REDO"},
				{ "trigger" : "f", "name" : "fp_hollow_eyes_REDO"},

				{ "trigger" : "f", "name" : "black-white-4_o"},
				{ "trigger" : "f", "name" : "black-white-8"},
				{ "trigger" : "f", "name" : "black-white-10"},
				{ "trigger" : "f", "name" : "confetti-sprinkles-flow_o"},
				{ "trigger" : "f", "name" : "spinning-rainbow-person_o"},
				{ "trigger" : "f", "name" : "drip-shapes"},
				{ "trigger" : "f", "name" : "flies-fx_o"},
				{ "trigger" : "f", "name" : "forbidden_world_hyperspace2"},
				{ "trigger" : "f", "name" : "forest-forgery-2-B1-FX_o"},
				{ "trigger" : "f", "name" : "fp_collar_making_machine4_REDO"},

				{ "trigger" : "f", "name" : "hercules_beam_water_explosion_bolt_o"},
				{ "trigger" : "f", "name" : "hercules_cave_eyes_flash_o"},
				{ "trigger" : "f", "name" : "hercules_city_fire_o"},
				{ "trigger" : "f", "name" : "hercules_fire_people_cu_o"},
				{ "trigger" : "f", "name" : "hercules_fire_people_o"},
				{ "trigger" : "f", "name" : "hercules_shooting_star_crater_o"},
				{ "trigger" : "f", "name" : "hercules_movie_intro_eye2_o"},
				{ "trigger" : "f", "name" : "hercules_movie_intro_eye_o"},
				{ "trigger" : "f", "name" : "hercules_monsters_jump_pov_o"},
				{ "trigger" : "f", "name" : "hercules_mermaid_eye_beams_o"},
				{ "trigger" : "f", "name" : "hercules_lightning_skull_o"},
				{ "trigger" : "f", "name" : "hercules_lightning_ritual_o"},
				{ "trigger" : "f", "name" : "hercules_knight_weapon_o"},
				{ "trigger" : "f", "name" : "hercules_women_sparkle_shower_o"},
				{ "trigger" : "f", "name" : "hercules_woman_space_trails_dance_o"},
				{ "trigger" : "f", "name" : "hercules_woman_space_trails_arms_o"},
				{ "trigger" : "f", "name" : "hercules_transform_constellation_o"},
				{ "trigger" : "f", "name" : "hercules_space_two_women_o"},
				{ "trigger" : "f", "name" : "hercules_space_tunnel_explosion_o"},
				{ "trigger" : "f", "name" : "hercules_skull_zoom_o"},

				{ "trigger" : "f", "name" : "roach-birth-2-fx_o"},
				{ "trigger" : "f", "name" : "maggot-cu-fx_o"},
				{ "trigger" : "f", "name" : "maggots-2-fx_o"},
				{ "trigger" : "f", "name" : "maggots-cu-fx_o"},

				{ "trigger" : "f", "name" : "acid_drive_crop_o"},
				{ "trigger" : "f", "name" : "black_white_stripes_ball"},
				{ "trigger" : "f", "name" : "drip_shapes_pixelated"},
				{ "trigger" : "f", "name" : "flythrough_space_planes_crop_o"},
				{ "trigger" : "f", "name" : "hyperspace_color_clouds"},
				{ "trigger" : "f", "name" : "multi_color_stripe_spins_o"},
				{ "trigger" : "f", "name" : "playground_spin_thing_o"},
				{ "trigger" : "f", "name" : "rainbow_thread_flow"},
				{ "trigger" : "f", "name" : "red_dots_shimmy"},
				{ "trigger" : "f", "name" : "red_spiral_gener8"},
				{ "trigger" : "f", "name" : "smoke_explosion"},
				{ "trigger" : "f", "name" : "spinning_trail_eye_crop_o"},

				{ "trigger" : "f", "name" : "nuclear-explosion-2_o"},
				{ "trigger" : "f", "name" : "nuclear-explosion-5_o"},
				{ "trigger" : "f", "name" : "nuclear-explosion-3_o"}
			]
		},
		{
			"id" : 3,
			"name" : "Halloween3",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "b", "name" : "phantasm_ball_drilling_head_o"},
				{ "trigger" : "c", "name" : "phantasm_ball_drilling_head2_o"},
				{ "trigger" : "b", "name" : "phantasm_bed_grab_boy_o"},
				{ "trigger" : "c", "name" : "phantasm_cutting_fingers_o"},
				{ "trigger" : "b", "name" : "phantasm_hey_boy_grabbing_o"},
				{ "trigger" : "c", "name" : "phantasm_house_vanishes_o"},
				{ "trigger" : "b", "name" : "phantasm_multi_clips_o"},
				{ "trigger" : "c", "name" : "phantasm_mustard_mouth_o"},
				{ "trigger" : "c", "name" : "phantasm_tall_man_chase_boy_o"},
				{ "trigger" : "b", "name" : "phantasm_tall_man_eye_multiplies_o"},
				{ "trigger" : "c", "name" : "phantasm_tall_man_multiplies_o"},
				{ "trigger" : "b", "name" : "phantasm_tall_man_portal_o"},
				{ "trigger" : "c", "name" : "phantasm_tall_man_stare_o"},
				{ "trigger" : "f", "name" : "phantasm_tall_man_walk_o"},
				{ "trigger" : "f", "name" : "space_promotheus_alien"},
				{ "trigger" : "f", "name" : "humanoid_from_the_deep_o"},
				{ "trigger" : "f", "name" : "humanoid_from_the_deep2_o"}
			]
		}
	]
}

setsArray = [];

bankerSets = {
	"set" : [
		{
			"name" : "set1",
			"trigger" : "a",
			"bank" : 2,
			"gifs" : [
				{ "name" : "black-white-8"},
				{ "name" : "hercules_skull_zoom_o"},
				{ "name" : "drip-shapes"},
				{ "name" : "tekkon_fire"}
			]
		},
		{
			"name" : "set2",
			"trigger" : "b",
			"bank" : 2,
			"gifs" : [
				{ "name" : "hercules_women_sparkle_shower_o"},
				{ "name" : "hercules_woman_space_trails_dance_o"},
				{ "name" : "hercules_woman_space_trails_arms_o"},
				{ "name" : "hercules_transform_constellation_o"},
				{ "name" : "hercules_space_two_women_o"}
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

/* SEQUENCER */
var sequencer = {

	"sequences": [
		{
			"name" : "intro",
			"trigger" : 'a',
			"scenes": [
				{ "stage1": { "bank" : 3, "gif" : "river-wall-stripes-fx-o", "parameters" : { "repeat": 'no-repeat', "fx" : "kaleidoscope" } },
					"stage2": { "bank" : 1, "gif" : "nature1_fx_o", "parameters" : { "repeat": 'no-repeat', "fx" : "kaleidoscope" } }
				},
				{ "stage1": { "bank" : 3, "gif" : "river-wall-stripes-fx-o", "parameters" : { "repeat": 'repeat', "fx" : "kaleidoscope" } },
					"stage2": { "bank" : 3, "gif" : "obama-circles-fx-o", "parameters" : { "repeat": 'repeat', "fx" : "kaleidoscope" } }
				}
			]
		},
		{
			"name" : "goodbye",
			"trigger" : 'b',
			"scenes": [
				{ "stage1": { "bank" : 3, "gif" : "obama-window-lines-fx-o", "parameters" : { "repeat": 'repeat' } },
					"stage2": { "bank" : 2, "gif" : "obama-tony-play-4-fx-o", "parameters" : { "repeat": 'no-repeat' } }
				},
				{ "stage1": { "bank" : 1, "gif" : "nature4_fx_o", "parameters" : { "repeat": 'repeat' } },
					"stage2": { "bank" : 1, "gif" : "tony_walk_towards_1_fx_o", "parameters" : { "repeat": 'no-repeat' } }
				}
			]
		},
		{
			"name" : "test",
			"trigger" : 'c',
			"scenes": [
				{ "stage1": { "bank" : 2, "gif" : "e", "parameters" : { "repeat": 'repeat' } },
					"stage2": { "bank" : 3, "gif" : "e", "parameters" : { "repeat": 'repeat' } }
				},
				{ "stage1": { "bank" : 1, "gif" : "j", "parameters" : { "repeat": 'repeat' } },
					"stage2": { "bank" : 1, "gif" : "n", "parameters" : { "repeat": 'repeat' } }
				}
			]
		}
	]
}

var filterGroups = {
	"groups" : [
		{
			"filterKey": "1",
			"effects" : [
				{ "stage": 1, "trigger": 3, "name": "sameSame"},
				{ "stage": 2, "trigger": 8, "name": "saturator"}
			]
		},
		{
			"filterKey": "2",
			"effects" : [
				{ "effect": "kaleidoscope"},
				{ "effect": "saturator"}
			]
		}
	]
}

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
