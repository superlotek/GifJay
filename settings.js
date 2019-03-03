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
			"name" : "Bands",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_greg_guitar_bobby_drums_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_band_silhouette2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_band_silhouette_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_bandRockout_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_guitar_and_keyboard_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_keyboards_and_drums_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_misfits_on_stage_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_misfits_play2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_misfits_play_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_keyboardAndGuitar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_misfit_singer_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_robot_band_playing_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_synth_band_playing_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_keithAndKidsOutlines2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_keithAndKidsOutlines3_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_keithAndKidsOutlines_o', 'set': 'm'}

			]
		},
		{
			"id" : 1,
			"trigger": "!",
			"name" : "Guitar",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'billAndTed_guitar1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'billAndTed_guitar2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_cindy_guitar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_greg_guitar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_peter_guitar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'heroHigh_punker_play_guitar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'myFavoriteMartian_two_guitars_playingThemselves_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'myFavoriteMartian_two_playing_guitar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'silverhawks_strumming_guitar_cu_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'silverhawks_strumming_guitar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'myFavoriteMartian_two_playing_guitar_withDancers_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'groovieGhoulies_wolfman_strums_cu_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'groovieGhoulies_wolfman_strums_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'missionMagic_rickGuitar_colorChange2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'missionMagic_rickGuitar_colorChange_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_archie_guitar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_guitar_cu_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_snake_takes_misfitGuitar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_fingersOnGuitarStrings2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_fingersOnGuitarStrings_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_fingersOnGuitarStrings_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_keithGuitarOutlines2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_keithGuitarOutlines_o', 'set': 'm'}

			]
		},
		{
			"id" : 2,
			"trigger": "@",
			"name" : "Keyboards",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'groovieGhoulies_countOnKeyboard_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'groovieGhoulies_floorKeyboard_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_jan_keyboards2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_jan_keyboards_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_veronica_handsUp_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_veronica_keyboard_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_veronica_keyboard_silhouette2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_veronica_keyboard_silhouette_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_keyboard_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_woman_keytar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_woman_playing_keytar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_keyboards2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_keyboards_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_fingers_keyboard_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_keyboards_cu_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_keyboards_o', 'set': 'm'}

			]
		},
		{
			"id" : 3,
			"trigger": "#",
			"name" : "Dancing",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'jerryLewis_flamenco_dance1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'jerryLewis_flamenco_dance2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_friends_dancing_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_sabrina_dances_withClone_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_sabrina_friend_dances_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_dancing_pandas2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_dancing_pandas_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_cu_legs_dancing_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'jerryLewis_runningAroungScreen_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_dancing_kids_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_jughead_dance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_misfit_fire_dance2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_misfit_fire_dance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_dancingFire_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_dancingFire_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_dancingOutlines2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_dancingOutlines2_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_dancingOutlines_keithGuitar_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_dancingOutlines_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_dancingWavyLines_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_dancingWavyLines_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurieDancingTransformation_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_discoDancers_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_jasonBumpingGlass_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_keyopDiscoDance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_keyopDiscoDance2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_markFlipping_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_markOnGlass_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_princessDiscoDance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_princessDiscoDance2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_princessDiscoDance3_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_princessDiscoDance4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_princessFlipping_o', 'set': 'm'}

			]
		},
		{
			"id" : 4,
			"trigger": "$",
			"name" : "Backgrounds",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_coloredCircles_zoom_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_coloredCircles_zoom_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_colored_wavyLines2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_colored_wavyLines3_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_colored_wavyLines_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_circles_bouncyLines_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_flashing_circles_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_flower_pattern_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_thumping_heart_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_flashing_stage_lights_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_lips_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_crowd_cheer_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_discoBallLight_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_spaceStarLight_o', 'set': 'm'}
			]
		},
		{
			"id" : 5,
			"trigger": "%",
			"name" : "Drums",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_bobby_drums_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_caveman_beats_drum_fast_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_caveman_beats_drum_slow_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_jughead_drums_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_jughead_drums_silhouette_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_drumming_fire_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_drumming_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_drums2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_drums_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_hittingDrumPads_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_man_drumming_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_drumsticksPlaying_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_drumsticksPlaying_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_chris_drums2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_chris_drums_o', 'set': 'm'}

			]
		},
		{
			"id" : 6,
			"trigger": "^",
			"name" : "Misc Instruments",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_marsha_tambourine2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_marsha_tambourine_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'groovieGhoulies_frankenstein_xylophone_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_betty_tambourine2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_betty_tambourine_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_tracy_tambourines_o', 'set': 'm'}

			]
		},
		{
			"id" : 7,
			"trigger": "&",
			"name" : "MISC",
			"enabled" : false,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_floating_record_turntable_o', 'set': 'm'}
			]
		},
		{
			"id" : 8,
			"trigger": "*",
			"name" : "",
			"enabled" : false,
			"gifs" : [
				{ "trigger" : "q", "location" : "Jungle/", "name" : "jungle_minecraft_1_o", "set": "m"}
			]
		},
		{
			"id" : 9,
			"trigger": "(",
			"name" : "",
			"enabled" : false,
			"gifs" : [
				{ "trigger" : "q", "location" : "Commercial80s/", "name" : "atari_solarFox_intoCubes_o", "set": "m"}
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
