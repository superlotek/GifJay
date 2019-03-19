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
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_keithAndKidsOutlines_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BIC/', 'name' : 'BIC_pianoDrummerDancers_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BIC/', 'name' : 'BIC_pianoDrummerDancers2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_kids_dancingPlaying_o', 'set': 'm'}
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
				{ 'trigger' : 'w', 'location' : 'AnimatedBands/', 'name' : 'groovieGhoulies_floorKeyboard_o', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_jan_keyboards2_o', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_jan_keyboards_o', 'set': 'm'},
				{ 'trigger' : 't', 'location' : 'Archies/', 'name' : 'archies_veronica_handsUp_o', 'set': 'm'},
				{ 'trigger' : 'y', 'location' : 'Archies/', 'name' : 'archies_veronica_keyboard_o', 'set': 'm'},
				{ 'trigger' : 'u', 'location' : 'Archies/', 'name' : 'archies_veronica_keyboard_silhouette2_o', 'set': 'm'},
				{ 'trigger' : 'a', 'location' : 'Archies/', 'name' : 'archies_veronica_keyboard_silhouette_o', 'set': 'm'},
				{ 'trigger' : 's', 'location' : 'Jem/', 'name' : 'jem_keyboard_o', 'set': 'm'},
				{ 'trigger' : 'd', 'location' : 'Bravestarr/', 'name' : 'bravestarr_woman_keytar_o', 'set': 'm'},
				{ 'trigger' : 'f', 'location' : 'Bravestarr/', 'name' : 'bravestarr_woman_playing_keytar_o', 'set': 'm'},
				{ 'trigger' : 'g', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_keyboards2_o', 'set': 'm'},
				{ 'trigger' : 'h', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_laurie_keyboards_o', 'set': 'm'},
				{ 'trigger' : 'z', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_fingers_keyboard_o', 'set': 'm'},
				{ 'trigger' : 'x', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_keyboards_cu_o', 'set': 'm'},
				{ 'trigger' : 'c', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_shirley_keyboards_o', 'set': 'm'},
				{ 'trigger' : 'v', 'location' : 'BIC/', 'name' : 'BIC_fingerdOnKeys_o', 'set': 'm'},
				{ 'trigger' : 'b', 'location' : 'BIC/', 'name' : 'BIC_pianoAndDancers_o', 'set': 'm'},
				{ 'trigger' : 'n', 'location' : 'Hammerman/', 'name' : 'hammerman_kid_keytar_o', 'set': 'm'}

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
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_princessFlipping_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BIC/', 'name' : 'BIC_dancers_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_dancingWaterTower_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_hammer_dance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_hammer_tiledLogos_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_hammer_twoFemaleDancers_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_hammerDancing2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_hammerDancing3_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_hammerDancing4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_hammerFeet_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_hammerFeet2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_hammerFeetDancing_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_intro_dancing_tvImages_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_intro_shoes_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_kidsDancing_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'psa_dancing_fruitsVeggies_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Heman/', 'name' : 'heman_dodgingLasers_o', 'set': 'm'}
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
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_spaceStarLight_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Heman/', 'name' : 'heman_insideTheVortex_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_spiralSpin_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_floating_record_turntable_o', 'set': 'm'}
			]
		},
		{
			"id" : 5,
			"trigger": "%",
			"name" : "Drums",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_bobby_drums_o', 'set': 'm'},
				{ 'trigger' : 'w', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_caveman_beats_drum_fast_o', 'set': 'm'},
				{ 'trigger' : 'e', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_caveman_beats_drum_slow_o', 'set': 'm'},
				{ 'trigger' : 'r', 'location' : 'Archies/', 'name' : 'archies_jughead_drums_o', 'set': 'm'},
				{ 'trigger' : 't', 'location' : 'Archies/', 'name' : 'archies_jughead_drums_silhouette_o', 'set': 'm'},
				{ 'trigger' : 'a', 'location' : 'Jem/', 'name' : 'jem_drumming_fire_o', 'set': 'm'},
				{ 'trigger' : 's', 'location' : 'Jem/', 'name' : 'jem_drumming_o', 'set': 'm'},
				{ 'trigger' : 'd', 'location' : 'Jem/', 'name' : 'jem_drums2_o', 'set': 'm'},
				{ 'trigger' : 'f', 'location' : 'Jem/', 'name' : 'jem_drums_o', 'set': 'm'},
				{ 'trigger' : 'g', 'location' : 'Jem/', 'name' : 'jem_hittingDrumPads_o', 'set': 'm'},
				{ 'trigger' : 'z', 'location' : 'Bravestarr/', 'name' : 'bravestarr_man_drumming_o', 'set': 'm'},
				{ 'trigger' : 'x', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_drumsticksPlaying_o', 'set': 'm'},
				{ 'trigger' : 'c', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_drumsticksPlaying_o_t', 'set': 'm'},
				{ 'trigger' : 'v', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_chris_drums2_o', 'set': 'm'},
				{ 'trigger' : 'b', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_chris_drums_o', 'set': 'm'}

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
			"name" : "4thStreetVine Foreground",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobic-trails-1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobic-trails-2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobic-trails-3_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobic-trails-4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobics-leg-warmer-feet_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobics_1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobics_2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobics_4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobics_5_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobics_group_1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobics_group_2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'aerobics_group_3_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'robot_woman_head_back_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'silverhawks_2019-01-26 00.29.53', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'spinning-rainbow-person_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'tvshow_man_floating_triangle_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'walking-block-man', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'walking_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_kid_zap_robot_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_dance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_walk_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_zap_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'orbots_girls_dance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'crashing_cars_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fp_collar_making_machine2_REDO_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fp_collar_making_machine_REDO_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fp_father_collar_making_REDO_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fp_rocket_factory_lights_REDO_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'man_speedos_walking_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_alienWoman_flyAround_orb2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_alienWoman_flyAround_orb_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_bat_punch_chop_robots_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_running_space_forest_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_ship_flying_into_spaceClouds_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_space_forest_log_jumping_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'orbots_running_light_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_kicking_robots_o', 'set': 'm'}
			]
		},
		{
			"id" : 8,
			"trigger": "*",
			"name" : "4thStreetVine Background",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'abc-start_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'att_glowing_wired', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'candyBar_happyFace_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'city-grid-2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'city-grid_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'colored_rectangular_dance', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'electro_pyramid_zoom', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'eye_laser_sparkles_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'eye_lasers_1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fantasticVoyage_computer_flashing2_o', 'set': 'm'},
				// { 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fantasticVoyage_computer_flashing_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fantasticVoyage_flashing_colorBars_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fantasticVoyage_spinningStripes_disabledLasers_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fantasticVoyage_spinningStripes_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fantasticVoyage_tvScreen_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'forbidden_world_hyperspace2', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'forest-forgery-1-B-FX1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'forest-forgery-2-F2-FX_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'glowing-cube_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'golden-flows_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'grid-open-doors_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'japan_electrifying_organs', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'japan_explosion_eray_tunnel_zoom_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'john-whitney-4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'john-whitney-5_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'kaleidoscope_pointed_muted', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'lit_wired_tunnel_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_city_flythrough_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_geometric_cave_flythrough_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_lighted_tunnel_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_orb_drags_rainbowRings_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_orb_glowing_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_takeoff_tunnel_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_takeoff_tunnel_withOrb_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_tunnel_twist_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'orbots_light_zoom_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'orbots_light_zoom_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'pbs-4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'pbs-5_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'rainbow_hypnotic_circles_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'rainbow_sparkler_zoom', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'rainbow_spinning_circles', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'spinning_space_planes', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'star_explosion_bubbles', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'stationId_black_hole_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'stationId_star_tunnel_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'stationId_star_tunnel_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'stationLogo_spinning_globe_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'tron_grid_flyover_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'tron_zoom-into-grid_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'ttriangular_infinity_morph_o', 'set': 'm'},
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
titlePageName = 'title-1.gif';

var filterSettings = [
	{ "name": "invert", "min": 0, "slugName": "invert", "max": 1, "unit": "", "value" : "", "trigger": "7", "enabled": true },
	{ "name": "saturate", "min": 1, "slugName": "saturate", "max": 100, "unit": "", "value" : "", "trigger": "8", "enabled": true },
	{ "name": "hueRotate", "slugName": "hue-rotate", "min": 0, "max": 360, "unit": "deg", "value" : "", "trigger": "9", "enabled": true },
	{ "name": "blur", "min": 0, "slugName": "blur", "max": 5, "unit": "px", "value" : "", "trigger": "0", "enabled": true }
]

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
