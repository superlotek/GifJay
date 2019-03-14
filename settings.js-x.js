// GifJay v.0.8.9

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// USER SETTINGS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var midiOn = true;

// GIF BINS
const banks = {
	"bank" : [
		{
			"id" : 0,
			"trigger": ")",
			"name" : "MissionSpatialeDelta",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_chased_by_wave_o", "set": 'a'},
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_chased_by_wave2_o", "set": 'a'},
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_city_flythrough_o", "set": 'a'},
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_explosing_balls_o_t", "set": 'a'},
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_explosing_balls_o", "set": 'a'},
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_flashing_control_room_o", "set": 'a'},
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_floating_hallway_o", "set": 'a'},
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_flythrough_blocky_caverns_o", "set": 'a'},
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_man_fighting_robots_o", "set": 'a'},
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_pink_space_clouds_o", "set": 'a'},
				{ "trigger" : "a", "location" : "MissionSpatialeDelta/", "name" : "msd_woman_flying_around_orb_o", "set": 'a'}
			]
		},
		{
			"id" : 1,
			"trigger": "!",
			"name" : "Animated Shorts & Sally",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "q", "location" : "AnimatedShorts/", "name" : "crashing_cars_o", "set": "b"},
				{ "trigger" : "a", "location" : "AnimatedShorts/", "name" : "man_speedos_walking_o_t", "set": "b"},
				{ "trigger" : "a", "location" : "AnimatedShorts/", "name" : "man_speedos_walking_o", "set": "b"},
				{ "trigger" : "a", "location" : "AnimatedShorts/", "name" : "robot_woman_head_back_o_t", "set": "b"},
				{ "trigger" : "a", "location" : "AnimatedShorts/", "name" : "robot_woman_head_back_o", "set": "b"},
				{ "trigger" : "a", "location" : "AnimatedShorts/", "name" : "shattered_triangles_o", "set": "b"},
				{ "trigger" : "a", "location" : "AnimatedShorts/", "name" : "skinny_colored_line_trees_o", "set": "b"},
				{ "trigger" : "q", "location" : "SallyKruickshank/", "name" : "black_white_rays_o", "set": "m"},
				{ "trigger" : "w", "location" : "SallyKruickshank/", "name" : "flipping_eyes_o", "set": "m"},
				{ "trigger" : "e", "location" : "SallyKruickshank/", "name" : "sun_shining_o", "set": "m"},
				{ "trigger" : "a", "location" : "SallyKruickshank/", "name" : "water_dripping_flashes_o", "set": "m"},
				{ "trigger" : "s", "location" : "SallyKruickshank/", "name" : "zoom_through_eyes_o", "set": "m"},
				{ "trigger" : "s", "location" : "SallyKruickshank/", "name" : "punch_face_o", "set": "m"}

			]
		},
		{
			"id" : 2,
			"trigger": "@",
			"name" : "Canyons",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "u", "location" : "BathBombs/", "name" : "bathbomb-galaxy-1_o", "set": "c"},
				{ "trigger" : "i", "location" : "BathBombs/", "name" : "bathbomb-spinner-1_o", "set": "c"},
				{ "trigger" : null, "location" : "BathBombs/", "name" : "bathbomb-spinner-blur_o", "set": null},
				{ "trigger" : null, "location" : "BathBombs/", "name" : "bathbomb-slow-2_o", "set": null},
				{ "trigger" : "a", "location" : "CanyonFly/", "name" : "canyon_fly_1_o_t", "set": null},
				{ "trigger" : "b", "location" : "CanyonFly/", "name" : "canyon_fly_1_o", "set": null},
				{ "trigger" : "c", "location" : "CanyonFly/", "name" : "canyon_fly_2_o_t", "set": null},
				{ "trigger" : "d", "location" : "CanyonFly/", "name" : "canyon_fly_2_o", "set": null},
				{ "trigger" : "e", "location" : "CanyonFly/", "name" : "canyon_fly_3_o_t", "set": null},
				{ "trigger" : "", "location" : "CanyonFly/", "name" : "canyon_fly_3_o", "set": null}
			]
		},
		{
			"id" : 3,
			"trigger": "#",
			"name" : "Trails",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "q", "location" : "DancingTrails/", "name" : "a", "set": "a"},
				{ "trigger" : "w", "location" : "DancingTrails/", "name" : "b", "set": "a"},
				{ "trigger" : "e", "location" : "DancingTrails/", "name" : "c", "set": "z"},
				{ "trigger" : "r", "location" : "DancingTrails/", "name" : "d", "set": "z"},
				{ "trigger" : "a", "location" : "DancingTrails/", "name" : "e", "set": "z"},
				{ "trigger" : "s", "location" : "DancingTrails/", "name" : "f", "set": "z"},
				{ "trigger" : "d", "location" : "DancingTrails/", "name" : "g", "set": "y"},
				{ "trigger" : "f", "location" : "DancingTrails/", "name" : "h", "set": "y"},
				{ "trigger" : "z", "location" : "DancingTrails/", "name" : "i", "set": "z"},
				{ "trigger" : "x", "location" : "DancingTrails/", "name" : "j", "set": "z"}
			]
		},
		{
			"id" : 4,
			"trigger": "$",
			"name" : "Bravestarr",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_golden_star_o_t", "set": null},
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_golden_star_o", "set": null},
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_jumping_off_cliff_o", "set": null},
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_man_drumming_o", "set": null},
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_mind_control_o", "set": null},
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_robot_band_playing_o", "set": null},
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_running_animals_o", "set": null},
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_synth_band_playing_o", "set": null},
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_woman_keytar_o", "set": null},
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_woman_playing_keytar_o", "set": null},
				{ "trigger" : "a", "location" : "Bravestarr/", "name" : "bravestarr_zoom_star_o", "set": null}
			]
		},
		{
			"id" : 5,
			"trigger": "%",
			"name" : "Robots",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "Robots/", "name" : "digitalDance_seq1_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "digitalDance_seq2_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "digitalDance_seq3_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "digitalDance_seq4_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "gameboy_robotDance_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "gameboy_robotShoot_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "mannMachine_robotHead_laserEyes_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "mannMachine_robotHead_spin_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "mannMachine_robotSpin_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "ronniesRobot_flashingRobot_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "ronniesRobots _robot_boomerang_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "ronniesRobots_transformMan_explosion_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "ronniesRobots_transformMan_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "thx1138_screen-graphics_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "thx1138_screen-graphics-2_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "thx1138_screen-grid_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "thx1138-code_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "thx1138-screen-graphics-2_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "thx1138-screen-graphics-4_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "thx1138-screen-head_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "tvbreak_robot_corridor", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "star-rider-4_o", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "fantastic-voyage-2", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "fantastic-voyage-5", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "fantastic-voyage-8", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "egyptianLover_robotDance", "set": null},
				{ "trigger" : "a", "location" : "Robots/", "name" : "egyptianLover_robotDance2", "set": null},
			]
		},
		{
			"id" : 6,
			"trigger": "^",
			"name" : "Mushrooms",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "q", "location" : "Mushrooms/", "name" : "mushroom_1_fx2_o", "set": "m"},
				{ "trigger" : "w", "location" : "Mushrooms/", "name" : "mushroom_1_o", "set": "m"},
				{ "trigger" : "e", "location" : "Mushrooms/", "name" : "mushroom_2_fx_o", "set": "m"},
				{ "trigger" : "a", "location" : "Mushrooms/", "name" : "mushroom_2_fx2_o", "set": "m"},
				{ "trigger" : "s", "location" : "Mushrooms/", "name" : "mushroom_3_o", "set": "m"},
				{ "trigger" : "d", "location" : "Mushrooms/", "name" : "mushroom_4_o", "set": "n"},
				{ "trigger" : "z", "location" : "Mushrooms/", "name" : "mushroom_5_o", "set": "n"},
				{ "trigger" : "x", "location" : "Mushrooms/", "name" : "mushroom_6_o", "set": "n"},
				{ "trigger" : "c", "location" : "Mushrooms/", "name" : "mushroom_7_fx_o", "set": "n"}
			]
		},
		{
			"id" : 7,
			"trigger": "&",
			"name" : "Hercules",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_fling_monsters_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_knightHerculesFight3_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_mermaid_eye_beams_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_movie_intro_eye2_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_movie_intro_eye3_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_punch_beam_space_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_shield_block_beam2_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_shooting_star_crater_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_space_tunnel_explosion_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_sword_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_transform_constellation_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_transforms_gorilla_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_woman_arms_beam_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_woman_space_trails_dance_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_women_sparkle_shower_o", "set": "b"},
				{ "trigger" : "a", "location" : "Hercules/", "name" : "hercules_women_sparkles_fadeOut_o", "set": "b"}
			]
		},
		{
			"id" : 8,
			"trigger": "*",
			"name" : "Jungle",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "q", "location" : "Jungle/", "name" : "jungle_minecraft_1_o", "set": "m"},
				{ "trigger" : "w", "location" : "Jungle/", "name" : "jungle_minecraft_1_o_t", "set": "m"},
				{ "trigger" : "e", "location" : "Jungle/", "name" : "jungle_minecraft_2_o", "set": "m"},
				{ "trigger" : "a", "location" : "Jungle/", "name" : "jungle_minecraft_2_o_t", "set": "m"},
				{ "trigger" : "s", "location" : "Jungle/", "name" : "jungle_minecraft_3_o", "set": "m"},
				{ "trigger" : "d", "location" : "Jungle/", "name" : "jungle_minecraft_3_o_t", "set": "m"},
				{ "trigger" : "z", "location" : "Jungle/", "name" : "jungle_minecraft_4_o", "set": "m"},
				{ "trigger" : "x", "location" : "Jungle/", "name" : "jungle_minecraft_4_o_t", "set": "m"},
				{ "trigger" : "e", "location" : "Jungle/", "name" : "jungle_game_1_o", "set": "m"},
				{ "trigger" : "a", "location" : "Jungle/", "name" : "jungle_game_1_o_t", "set": "m"},
				{ "trigger" : "s", "location" : "Jungle/", "name" : "jungle_game_2_o", "set": "m"},
				{ "trigger" : "d", "location" : "Jungle/", "name" : "jungle_game_2_o_t", "set": "m"},
				{ "trigger" : "z", "location" : "Jungle/", "name" : "jungle_drone_bolivia_3_o", "set": "m"},
				{ "trigger" : "x", "location" : "Jungle/", "name" : "jungle_drone_bolivia_3_o_t", "set": "m"},

				{ "trigger" : "x", "location" : "Jungle/", "name" : "men_fighting_snake_around_o", "set": "m"},
				{ "trigger" : "x", "location" : "Jungle/", "name" : "man_walking_mushroom_o_t", "set": "m"},
				{ "trigger" : "x", "location" : "Jungle/", "name" : "man_walking_mushroom_o", "set": "m"},
				{ "trigger" : "x", "location" : "Jungle/", "name" : "spinning_around_moon_o", "set": "m"},
				{ "trigger" : "x", "location" : "Jungle/", "name" : "dancing_shield_o_t", "set": "m"},
				{ "trigger" : "x", "location" : "Jungle/", "name" : "dancing_shield_o", "set": "m"}

			]
		},
		{
			"id" : 9,
			"trigger": "(",
			"name" : "Commercial80s",
			"enabled" : true,
			"gifs" : [
				{ "trigger" : "q", "location" : "Commercial80s/", "name" : "atari_solarFox_intoCubes_o", "set": "m"},
				{ "trigger" : "w", "location" : "Commercial80s/", "name" : "atari_solarFox_intoCubes_o_t", "set": "m"},
				{ "trigger" : "e", "location" : "Commercial80s/", "name" : "candyBar_jumping_tiger_o_t", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "candyBar_jumping_tiger_o", "set": "m"},
				{ "trigger" : "s", "location" : "Commercial80s/", "name" : "candyBar_umbrella_rain_o_t", "set": "m"},
				{ "trigger" : "d", "location" : "Commercial80s/", "name" : "candyBar_umbrella_rain_o", "set": "m"},
				{ "trigger" : "z", "location" : "Commercial80s/", "name" : "sunglassesAd_man_into_woman_o_t", "set": "m"},
				{ "trigger" : "x", "location" : "Commercial80s/", "name" : "sunglassesAd_man_into_woman_o", "set": "m"},
				{ "trigger" : "e", "location" : "Commercial80s/", "name" : "sunglassesAd_woman_spreads_curtains_o_t", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "sunglassesAd_woman_spreads_curtains_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "atari_flying_cartridges_tv_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "atari_pacman_eat_dot_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "candyBar_happyFace_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "orbots_girls_dance_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "orbots_light_zoom_o_t", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "orbots_light_zoom_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "orbots_running_light_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "stationBreak_spinning_rainbow_ribbons_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "stationID_bigDipper_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "stationId_black_hole_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "stationId_star_tunnel_o_t", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "stationId_star_tunnel_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "stationLogo_spinning_globe_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "zack_armDance_o_t", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "zack_armDance_o", "set": "m"},
				{ "trigger" : "a", "location" : "Commercial80s/", "name" : "zack_radio_musicNotes_o", "set": "m"}

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
