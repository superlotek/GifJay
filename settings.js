// GifJay v.0.8.9

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// USER SETTINGS
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
var midiOn = true;
var overlaysEnabled = true;

// OVERLAYS
const overlays = [
	{ 'trigger' : '1', 'location' : 'overlays', 'name' : 'doctorka_logo_black_ani.gif'},
	{ 'trigger' : '2', 'location' : 'overlays', 'name' : 'onymico_logo_black_ani.gif'},
	{ 'trigger' : '3', 'location' : 'overlays', 'name' : 'manAMAchine_logo_black_ani.gif'},
]

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
				{ 'trigger' : 'q', 'location' : 'Hammerman/', 'name' : 'hammerman_kids_dancingPlaying_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_marsha_tambourine2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'bradyBunch_marsha_tambourine_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'groovieGhoulies_frankenstein_xylophone_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_betty_tambourine2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_betty_tambourine_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_tracy_tambourines_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'AnimatedBands/', 'name' : 'sabrinaTeenageWitch_floating_record_turntable_o', 'set': 'm'},
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
			"id" : 1,
			"trigger": "!",
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
			"id" : 2,
			"trigger": "@",
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
				{ 'trigger' : 'q', 'location' : 'Heman/', 'name' : 'heman_dodgingLasers_o', 'set': 'm'},
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
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'orbots_girls_dance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'digitalDance_seq1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'digitalDance_seq2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'digitalDance_seq3_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'digitalDance_seq4_o', 'set': 'm'}
			]
		},

		{
			"id" : 4,
			"trigger": "$",
			"name" : "Spiral Zone",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2600.39.46', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2600.40.46', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2600.42.25', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2600.46.59', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2600.50.48', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2600.51.52', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2600.53.36', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2600.55.41', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2600.56.46', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2600.59.49', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2601.00.51', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2601.02.36', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2601.03.53', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2601.05.12', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2601.07.35', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2601.08.46', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2601.09.51', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2603.11.29', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2603.12.43', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2603.13.36', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2603.15.40', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2603.17.53', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SpiralZone/', 'name' : 'spiralZone_2019-01-2603.18.48', 'set': 'm'}
			]
		},

		{
			"id" : 5,
			"trigger": "%",
			"name" : "Monkey Magic",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_1_fx2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_2_fx2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_2_fx_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_3_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_5_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_6_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Mushrooms/', 'name' : 'mushroom_7_fx_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'CanyonFly/', 'name' : 'canyon_fly_1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'CanyonFly/', 'name' : 'canyon_fly_1_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'CanyonFly/', 'name' : 'canyon_fly_2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'CanyonFly/', 'name' : 'canyon_fly_2_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'CanyonFly/', 'name' : 'canyon_fly_3_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'CanyonFly/', 'name' : 'canyon_fly_3_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'CanyonFly/', 'name' : 'canyon_fly_3_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2721.23.59', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2721.26.26', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2721.29.21', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2818.47.34', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2818.51.48', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2818.53.34', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2818.56.17', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2819.00.02', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2819.02.47', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2819.03.42', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2821.39.12', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MonkeyMagic/', 'name' : 'monkeyMagic_2019-02-2821.41.10', 'set': 'm'}
			]
		},

		{
			"id" : 6,
			"trigger": "^",
			"name" : "Doctor KA Backgrounds",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'rainbow_hypnotic_circles_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'rainbow_sparkler_zoom', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'rainbow_spinning_circles', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'john-whitney-4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'john-whitney-5_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_coloredCircles_zoom_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_coloredCircles_zoom_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_colored_wavyLines2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_colored_wavyLines3_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_colored_wavyLines_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_circles_bouncyLines_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_flashing_circles_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_flower_pattern_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Archies/', 'name' : 'archies_thumping_heart_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'PartridgeFamilySpace/', 'name' : 'partridgeFamilySpace_crowd_cheer_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_discoBallLight_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'battleOfThePlanets_spaceStarLight_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Heman/', 'name' : 'heman_insideTheVortex_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'WonderTwins/', 'name' : 'wondertwins_spiralSpin_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BathBombs/', 'name' : 'bathbomb-boomerang_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BathBombs/', 'name' : 'bathbomb-galaxy-1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BathBombs/', 'name' : 'bathbomb-galaxy-2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BathBombs/', 'name' : 'bathbomb-slow-1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BathBombs/', 'name' : 'bathbomb-slow-2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BathBombs/', 'name' : 'bathbomb-spinner-1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BathBombs/', 'name' : 'bathbomb-spinner-2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BathBombs/', 'name' : 'bathbomb-spinner-blur_o', 'set': 'm'}
			]
		},

		{
			"id" : 7,
			"trigger": "&",
			"name" : "Doctor KA Foregrounds",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'spinning-rainbow-person_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'candyBar_happyFace_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_jumping_off_cliff_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Bravestarr/', 'name' : 'bravestarr_mind_control_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'botp_lightBeams_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'botp_trippyGalaxy_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'BotP/', 'name' : 'botp_trippyRainbowTunnel_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_mermaid_eye_beams_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_movie_intro_eye2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_shooting_star_crater_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_space_tunnel_explosion_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_woman_arms_beam_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_woman_space_trails_dance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_women_sparkle_shower_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_women_sparkles_fadeOut_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta/', 'name' : 'msd_floating_hallway_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SallyKruickshank/', 'name' : 'sun_shining_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SallyKruickshank/', 'name' : 'water_dripping_flashes_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'SallyKruickshank/', 'name' : 'zoom_through_eyes_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'MissionSpatialeDelta/', 'name' : 'msd_floating_hallway_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_flashing_stage_lights_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Jem/', 'name' : 'jem_lips_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'JacksonFive/', 'name' : 'jackson5_flashingSun_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'JacksonFive/', 'name' : 'jackson5_heart_spiral_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'JacksonFive/', 'name' : 'jackson5_heart_tornado_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'JacksonFive/', 'name' : 'jackson5_walkingSunSilhouettes_shadow_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'DancingTrails/', 'name' : 'dancingTrails_a', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'DancingTrails/', 'name' : 'dancingTrails_b', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'DancingTrails/', 'name' : 'dancingTrails_c', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'DancingTrails/', 'name' : 'dancingTrails_d', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'DancingTrails/', 'name' : 'dancingTrails_e', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'DancingTrails/', 'name' : 'dancingTrails_f', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'DancingTrails/', 'name' : 'dancingTrails_g', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'DancingTrails/', 'name' : 'dancingTrails_h', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'DancingTrails/', 'name' : 'dancingTrails_i', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'DancingTrails/', 'name' : 'dancingTrails_j', 'set': 'm'},
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
				{ 'trigger' : 'q', 'location' : 'Aerobics/', 'name' : 'aerobicsCompetition_group1_o', 'set': 'm'}
			]
		},

		{
			"id" : 8,
			"trigger": "*",
			"name" : "Man A Machine Background",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'abc-start_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'att_glowing_wired', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'city-grid-2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'city-grid_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'colored_rectangular_dance', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'electro_pyramid_zoom', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'eye_laser_sparkles_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'eye_lasers_1_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'fantasticVoyage_computer_flashing2_o', 'set': 'm'},
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
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'kaleidoscope_pointed_muted', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'lit_wired_tunnel_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_city_flythrough_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_geometric_cave_flythrough_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_lighted_tunnel_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_takeoff_tunnel_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_takeoff_tunnel_withOrb_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_tunnel_twist_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'orbots_light_zoom_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'orbots_light_zoom_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'spinning_space_planes', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'star_explosion_bubbles', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'stationId_black_hole_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'stationId_star_tunnel_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'stationId_star_tunnel_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'stationLogo_spinning_globe_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'tron_grid_flyover_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'tron_zoom-into-grid_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'ttriangular_infinity_morph_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'thx1138-code_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'thx1138-screen-graphics-2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'thx1138-screen-graphics-4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'thx1138-screen-head_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'thx1138_screen-graphics-2_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'thx1138_screen-graphics_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'thx1138_screen-grid_o', 'set': 'm'}
			]
		},

		{
			"id" : 9,
			"trigger": "(",
			"name" : "Man A Machine Foreground",
			"enabled" : true,
			"gifs" : [
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'robot_woman_head_back_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'tvshow_man_floating_triangle_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'walking-block-man', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'walking_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_kid_zap_robot_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_dance_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_walk_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'nintendo_gameboy_robot_zap_o', 'set': 'm'},
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
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_kicking_robots_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_orb_drags_rainbowRings_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'msd_orb_glowing_o_t', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'mannMachine_robotHead_laserEyes_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'mannMachine_robotHead_spin_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'mannMachine_robotSpin_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'ronniesRobot_flashingRobot_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'ronniesRobots _robot_boomerang_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'ronniesRobots_transformMan_explosion_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'ronniesRobots_transformMan_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'star-rider-4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Robots/', 'name' : 'tvbreak_robot_corridor', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'pbs-4_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : '4thStreetVine/', 'name' : 'pbs-5_o', 'set': 'm'},
				{ 'trigger' : 'q', 'location' : 'Hercules/', 'name' : 'hercules_transform_constellation_o', 'set': 'm'}
			]
		},
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
