const appz = {
  midiOn: true,
  defaultBeatTime: 2000,
  beatSpeed: 1000,
  sameSameConstant: 2,
  overlaysEnabled: true,
  startupBankNumber: 18,
  startupBankTrigger: "a",

  // "stageArray" : ['sf', 'st'],
  blendModeArray: ["screen", "overlay"],

  fontStyles: [
    "Baloo Chettan",
    "Germania One",
    "Fascinate Inline",
    "Monoton",
    "Press Start 2P",
    "Spicy Rice"
  ],

  blendModes: {
    mix: [
      { name: "multiply", trigger: "1", enabled: true },
      { name: "darken", trigger: "1", enabled: true },
      { name: "lighten", trigger: "1", enabled: true },
      { name: "color-dodge", trigger: "1", enabled: true },
      { name: "color-burn", trigger: "1", enabled: true },
      { name: "hard-light", trigger: "1", enabled: true },
      { name: "soft-light", trigger: "1", enabled: true },
      { name: "difference", trigger: "1", enabled: true },
      { name: "exclusion", trigger: "1", enabled: true },
      { name: "hue", trigger: "1", enabled: true },
      { name: "saturation", trigger: "1", enabled: true },
      { name: "color", trigger: "1", enabled: true },
      { name: "luminosity", trigger: "1", enabled: true }
    ]
  },

  filters: {
    strings: [{ value: "" }, { value: "" }],
    filter: [
      {
        name: "Invert",
        slugName: "invert",
        trigger: "7",
        min: 0,
        max: 1,
        unit: "",
        enabled: true,
        on: 0,
        stage: [{ value: "" }, { value: "" }]
      },
      {
        name: "Saturate",
        slugName: "saturate",
        trigger: "8",
        min: 1,
        max: 100,
        unit: "",
        enabled: true,
        on: 0,
        stage: [{ value: "" }, { value: "" }]
      },
      {
        name: "Hue Rotate",
        slugName: "hue-rotate",
        trigger: "9",
        min: 0,
        max: 360,
        unit: "deg",
        enabled: true,
        on: 0,
        stage: [{ value: "" }, { value: "" }]
      },
      {
        name: "Blur",
        slugName: "blur",
        trigger: "0",
        min: 0,
        max: 5,
        unit: "px",
        enabled: true,
        on: 0,
        stage: [{ value: "" }, { value: "" }]
      }
    ]
  },

  effects: {
    kaleidoscope: { name: "kaleidoscope", enabled: true, trigger: "1" },
    mutator: { name: "mutator", enabled: true, trigger: "2" },
    sameSame: { name: "sameSame", enabled: true, trigger: "3" },
    stgFade: { name: "stgFade", enabled: true, trigger: "4" }
  },

  overlays: [
    { trigger: "1", location: "overlays", name: "clubMutoid_logo_ani.gif" }
  ],

  sequence: [
    {
      trigger: "a",
      name: "Some sequence",
      enabled: true,
      scene: [
        {
          gifs: [
            {
              location: "BotP/",
              name: "battleOfThePlanets_keyopDiscoDance2_o"
            },
            { location: "BotP/", name: "battleOfThePlanets_markFlipping_o" }
          ]
        },
        {
          gifs: [
            { location: "4thStreetVine/", name: "forest-forgery-2-F2-FX_o" },
            { location: "4thStreetVine/", name: "golden-flows_o" }
          ]
        },
        {
          gifs: [
            {
              location: "4thStreetVine/",
              name: "nintendo_gameboy_kid_zap_robot_o"
            },
            {
              location: "4thStreetVine/",
              name: "nintendo_gameboy_robot_dance_o"
            }
          ]
        },
        {
          gifs: [
            {
              location: "MissionSpatialeDelta2/",
              name: "msd_2018-03-0320.29.26"
            },
            {
              location: "MissionSpatialeDelta2/",
              name: "msd_2018-03-0320.38.00"
            }
          ]
        }
      ]
    },
    {
      trigger: "b",
      name: "Another sequence",
      enabled: false,
      scene: [
        {
          gifs: [
            { location: "4thStreetVine/", name: "robot_woman_head_back_o" },
            {
              location: "4thStreetVine/",
              name: "tvshow_man_floating_triangle_o"
            }
          ]
        },
        {
          gifs: [
            { location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-1_o" },
            {
              location: "FullTimeTrumpet/",
              name: "full-time-trumpet-FX-1_transparent_o"
            }
          ]
        }
      ]
    },
    {
      trigger: "c",
      name: "Last sequence",
      enabled: true,
      scene: [
        {
          gifs: [
            { location: "4thStreetVine/", name: "robot_woman_head_back_o" },
            {
              location: "4thStreetVine/",
              name: "tvshow_man_floating_triangle_o"
            }
          ]
        },
        {
          gifs: [
            { location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-1_o" },
            {
              location: "FullTimeTrumpet/",
              name: "full-time-trumpet-FX-1_transparent_o"
            }
          ]
        }
      ]
    }
  ],

  bank: [
    {
      id: 0,
      trigger: "q",
      name: "Foreground - Hercules",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_dinosaur_hercules_sword_twirl"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_dinosaur_transform"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_explosion_stars"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_fire_people_cu_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_fling_monsters_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_gorilla_dinosaur_fight"
        },
        { trigger: "q", location: "Hercules/", name: "hercules_grabs_bolt" },
        { trigger: "q", location: "Hercules/", name: "hercules_green_beams" },
        { trigger: "q", location: "Hercules/", name: "hercules_head_swirlies" },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_hercules_transport"
        },
        { trigger: "q", location: "Hercules/", name: "hercules_king" },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_king_explosion"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_king_hercules_fight"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_king_hercules_fight2"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_king_swing_beam"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_king_swing_beam2"
        },
        { trigger: "q", location: "Hercules/", name: "hercules_knight" },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_knightHerculesFight"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_knightHerculesFight2"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_knightHerculesFight3_o"
        },
        { trigger: "q", location: "Hercules/", name: "hercules_knightLyte" },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_lightning_skull_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_mermaid_eye_beams_o"
        },
        { trigger: "q", location: "Hercules/", name: "hercules_movie_intro_1" },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_movie_intro_eye2_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_movie_intro_eye3_o"
        },
        { trigger: "q", location: "Hercules/", name: "hercules_punch_beam" },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_punch_green_monster"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_shield_block_beam"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_shield_block_beam2_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_shooting_star_crater_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_space_tunnel_explosion_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_space_two_women_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_star_explosions"
        },
        { trigger: "q", location: "Hercules/", name: "hercules_sword" },
        { trigger: "q", location: "Hercules/", name: "hercules_sword_o" },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_transform_constellation_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_transforms_gorilla_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_woman_arms_beam_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_woman_space_trails"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_woman_space_trails_arms2"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_woman_space_trails_arms_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_woman_space_trails_dance_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_woman_stars_spinning"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_women_sparkle_shower2"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_women_sparkle_shower_o"
        },
        {
          trigger: "q",
          location: "Hercules/",
          name: "hercules_women_sparkles_fadeOut_o"
        }
      ]
    },
    {
      id: 1,
      trigger: "w",
      name: "Foreground - MSD",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_alienWoman_flyAround_orb2_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_alienWoman_flyAround_orb_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_bat_punch_chop_robots_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_chased_by_wave2_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_chased_by_wave_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_city_flythrough_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_explosing_balls_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_explosing_balls_o_t"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_flashing_control_room_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_floating_hallway_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_flythrough_blocky_caverns_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_geometric_cave_flythrough_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_kicking_robots_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_lighted_tunnel_o_t"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_man_fighting_robots_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_orb_drags_rainbowRings_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_orb_glowing_o_t"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_pink_space_clouds_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_running_space_forest_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_ship_flying_into_spaceClouds_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_space_forest_log_jumping_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_takeoff_tunnel_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_takeoff_tunnel_withOrb_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_tunnel_twist_o_t"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta/",
          name: "msd_woman_flying_around_orb_o"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0316.40.20"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0316.43.01"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0316.48.12"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0317.04.28"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0317.05.28"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0317.07.47"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0317.19.25"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0317.23.44"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0317.53.28"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0317.57.51"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0317.59.10"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0318.01.20"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0318.07.20"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0318.16.34"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0319.17.18"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0319.18.23"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0319.20.22"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0319.52.32"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0319.58.56"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0320.00.48"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0320.04.21"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0320.15.08"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0321.28.04"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0321.47.22"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0322.13.57"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0322.21.01"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0322.37.31"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0322.43.52"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0322.48.46"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0322.50.26"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0323.27.03"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0323.30.23"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0323.36.04"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0323.43.46"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0323.46.22"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0323.51.51"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0400.04.49"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0400.18.26"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0400.26.49"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0400.27.52"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0400.30.38"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0400.32.57"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0400.39.49"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0401.24.07"
        },
        {
          trigger: "q",
          location: "MissionSpatialeDelta2/",
          name: "msd_2018-03-0401.26.20"
        }
      ]
    },
    {
      id: 2,
      trigger: "e",
      name: "Foreground - Aerobics",
      enabled: true,
      gifs: [
        { trigger: "q", location: "Aerobics/", name: "aerobic-trails-1_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobic-trails-2_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobic-trails-3_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobic-trails-4_o" },
        {
          trigger: "q",
          location: "Aerobics/",
          name: "aerobics-leg-warmer-feet_o"
        },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_1" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_10" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_11" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_12" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_13" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_14" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_15" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_16" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_17" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_18" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_19" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_2" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_20" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_21" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_22" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_23" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_24" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_25" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_26" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_27" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_28" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_29" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_3" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_30" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_31" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_32" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_4" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_5" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_6" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_7" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_8" },
        { trigger: "q", location: "Aerobics/", name: "aerobicsCompetition_9" },
        {
          trigger: "q",
          location: "Aerobics/",
          name: "aerobicsCompetition_group1"
        },
        {
          trigger: "q",
          location: "Aerobics/",
          name: "aerobicsCompetition_group1_o"
        },
        { trigger: "q", location: "Aerobics/", name: "aerobics_1_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_2_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_4_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_5_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_group_1_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_group_2_o" },
        { trigger: "q", location: "Aerobics/", name: "aerobics_group_3_o" },

        {
          trigger: "q",
          location: "Aerobics/Group2/",
          name: "aerobics2_2019-04-2708.42.16"
        },
        {
          trigger: "q",
          location: "Aerobics/Group2/",
          name: "aerobics2_2019-04-2708.47.44"
        },
        {
          trigger: "q",
          location: "Aerobics/Group2/",
          name: "aerobics2_2019-04-2708.49.01"
        },
        {
          trigger: "q",
          location: "Aerobics/Group2/",
          name: "aerobics2_2019-04-2708.50.56"
        },
        {
          trigger: "q",
          location: "Aerobics/Group2/",
          name: "aerobics2_2019-04-2708.53.20"
        },
        {
          trigger: "q",
          location: "Aerobics/Group2/",
          name: "aerobics2_2019-04-2708.54.42"
        },
        {
          trigger: "q",
          location: "Aerobics/Group2/",
          name: "aerobics2_2019-04-2708.56.58"
        },
        {
          trigger: "q",
          location: "Aerobics/Group2/",
          name: "aerobics2_2019-04-2708.59.30"
        },
        {
          trigger: "q",
          location: "Aerobics/Group2/",
          name: "aerobics2_2019-04-2709.01.46"
        },

        {
          trigger: "q",
          location: "Aerobics/Group3/",
          name: "aerobics3_2019-04-2713.25.04"
        },
        {
          trigger: "q",
          location: "Aerobics/Group3/",
          name: "aerobics3_2019-04-2713.26.24"
        },
        {
          trigger: "q",
          location: "Aerobics/Group3/",
          name: "aerobics3_2019-04-2713.28.16"
        },
        {
          trigger: "q",
          location: "Aerobics/Group3/",
          name: "aerobics3_2019-04-2713.29.45"
        },
        {
          trigger: "q",
          location: "Aerobics/Group3/",
          name: "aerobics3_2019-04-2713.31.01"
        },
        {
          trigger: "q",
          location: "Aerobics/Group3/",
          name: "aerobics3_2019-04-2713.32.58"
        },
        {
          trigger: "q",
          location: "Aerobics/Group3/",
          name: "aerobics3_2019-04-2713.34.36"
        },
        {
          trigger: "q",
          location: "Aerobics/Group3/",
          name: "aerobics3_2019-04-2713.35.53"
        },

        { trigger: "q", location: "Aerobics/Jazzercise/", name: "jazzercise" },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.15.42"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.19.02"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.20.53"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.22.40"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.25.01"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.26.31"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.28.11"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.32.35"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.35.23"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.49.51"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.51.11"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.53.01"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.54.44"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.56.20"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.58.28"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2709.59.32"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2710.01.07"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2710.03.08"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2711.00.26"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2711.02.08"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2711.03.51"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2711.07.55"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2711.09.27"
        },
        {
          trigger: "q",
          location: "Aerobics/Jazzercise/",
          name: "jazzercise_2019-04-2711.15.38"
        }
      ]
    },
    {
      id: 3,
      trigger: "r",
      name: "Foreground - Animated Bands",
      enabled: true,
      gifs: [
        { trigger: "q", location: "Jem/", name: "jem_bandRockout_o" },
        { trigger: "q", location: "Jem/", name: "jem_drumming_fire_o" },
        { trigger: "q", location: "Jem/", name: "jem_drumming_o" },
        { trigger: "q", location: "Jem/", name: "jem_drums2_o" },
        { trigger: "q", location: "Jem/", name: "jem_drums_o" },
        { trigger: "q", location: "Jem/", name: "jem_flashing_stage_lights_o" },
        { trigger: "q", location: "Jem/", name: "jem_guitar_and_keyboard_o" },
        { trigger: "q", location: "Jem/", name: "jem_guitar_cu_o" },
        { trigger: "q", location: "Jem/", name: "jem_hittingDrumPads_o" },
        { trigger: "q", location: "Jem/", name: "jem_keyboardAndGuitar_o" },
        { trigger: "q", location: "Jem/", name: "jem_keyboard_o" },
        { trigger: "q", location: "Jem/", name: "jem_keyboards_and_drums_o" },
        { trigger: "q", location: "Jem/", name: "jem_lips_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfit_fire_dance2_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfit_fire_dance_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfit_singer_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfits_on_stage_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfits_play2_o" },
        { trigger: "q", location: "Jem/", name: "jem_misfits_play_o" },
        {
          trigger: "q",
          location: "Jem/",
          name: "jem_snake_takes_misfitGuitar_o"
        },

        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_tambourine_o"
        },
        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_blonde_drumming_o"
        },
        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_redhead_guitar_o"
        },

        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_chris_drums2_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_chris_drums_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_crowd_cheer_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_drumsticksPlaying_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_drumsticksPlaying_o_t"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_fingersOnGuitarStrings2_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_fingersOnGuitarStrings_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_fingersOnGuitarStrings_o_t"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_keithAndKidsOutlines2_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_keithAndKidsOutlines3_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_keithAndKidsOutlines_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_keithGuitarOutlines2_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_keithGuitarOutlines_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurieDancingTransformation_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurie_dancingFire_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurie_dancingFire_o_t"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurie_dancingOutlines2_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurie_dancingOutlines2_o_t"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurie_dancingOutlines_keithGuitar_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurie_dancingOutlines_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurie_dancingWavyLines_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurie_dancingWavyLines_o_t"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurie_keyboards2_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_laurie_keyboards_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_shirley_fingers_keyboard_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_shirley_keyboards_cu_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_shirley_keyboards_o"
        },
        {
          trigger: "q",
          location: "PartridgeFamilySpace/",
          name: "partridgeFamilySpace_tracy_tambourines_o"
        },

        { trigger: "q", location: "BotP/", name: "botp_spaceBand_bass2_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_bass3_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_bass_o" },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_cuGuitarHand_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_dancerCrowd_o"
        },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_drummer2_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_drummer_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_guitar2_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_guitar3_o" },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_guitar_o" },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_keyboards2_o"
        },
        { trigger: "q", location: "BotP/", name: "botp_spaceBand_keyboards_o" },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_studioCUDrummer_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_studio_bass2_O"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_studio_bass_O"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_studio_drummer2_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_studio_drummerSlowZoom_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_studio_drummer_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_studio_guitar2_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_studio_guitar_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_studio_keyboards_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spaceBand_studio_singer_o"
        },
        { trigger: "q", location: "BotP/", name: "botp_spaceband_singer_o" },

        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "billAndTed_guitar2_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_bobby_drums_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_cindy_guitar_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_dancing_pandas2_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_dancing_pandas_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_greg_guitar_bobby_drums_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_greg_guitar_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_jan_keyboards2_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_jan_keyboards_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_marsha_tambourine2_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_marsha_tambourine_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "bradyBunch_peter_guitar_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "groovieGhoulies_countOnKeyboard_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "groovieGhoulies_floorKeyboard_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "groovieGhoulies_frankenstein_xylophone_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "groovieGhoulies_wolfman_strums_cu_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "groovieGhoulies_wolfman_strums_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "heroHigh_punker_play_guitar_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "jerryLewis_flamenco_dance1_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "jerryLewis_flamenco_dance2_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "jerryLewis_runningAroungScreen_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "missionMagic_rickGuitar_colorChange2_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "missionMagic_rickGuitar_colorChange_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "myFavoriteMartian_two_guitars_playingThemselves_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "myFavoriteMartian_two_playing_guitar_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "myFavoriteMartian_two_playing_guitar_withDancers_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "sabrinaTeenageWitch_caveman_beats_drum_fast_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "sabrinaTeenageWitch_cu_legs_dancing_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "sabrinaTeenageWitch_floating_record_turntable_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "sabrinaTeenageWitch_friends_dancing_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "sabrinaTeenageWitch_sabrina_dances_withClone_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "sabrinaTeenageWitch_sabrina_friend_dances_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "silverhawks_strumming_guitar_cu_o"
        },
        {
          trigger: "q",
          location: "AnimatedBands/",
          name: "silverhawks_strumming_guitar_o"
        },

        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_kid_keytar_o"
        },
        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_kids_dancingPlaying_o"
        }
      ]
    },
    {
      id: 4,
      trigger: "t",
      name: "Foreground - ActionUSA",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.11.53"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.14.21"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.14.48"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.17.00"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.18.02"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.18.42"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.20.26"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.21.38"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.22.21"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.23.09"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.24.52"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.26.40"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.27.42"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.28.49"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.30.48"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.34.30"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.36.04"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.38.01"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.38.36"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.40.37"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.46.02"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.48.02"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-1101.50.03"
        },
        {
          trigger: "q",
          location: "ActionUSA/",
          name: "actionUSA_2019-04-11201.32.47"
        }
      ]
    },
    {
      id: 5,
      trigger: "y",
      name: "Foreground - Dancing",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.12.00"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.13.24"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.16.04"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.17.39"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.19.02"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.20.28"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.21.52"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.23.13"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.23.58"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.25.20"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.26.47"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.27.47"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.29.21"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.31.20"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.33.43"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.34.37"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.37.12"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.38.33"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.39.38"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.40.42"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.41.37"
        },
        {
          trigger: "q",
          location: "BettyBoop/",
          name: "bettyBoop_2019-04-2401.42.52"
        },

        { trigger: "q", location: "Robots/", name: "digitalDance_seq1_o" },
        { trigger: "q", location: "Robots/", name: "digitalDance_seq2_o" },
        { trigger: "q", location: "Robots/", name: "digitalDance_seq3_o" },
        { trigger: "q", location: "Robots/", name: "digitalDance_seq4_o" },

        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_hammerDancing2_o"
        },
        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_hammerDancing3_o"
        },
        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_hammerDancing4_o"
        },
        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_hammerFeet2_o"
        },
        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_hammerFeetDancing_o"
        },
        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_hammerFeet_o"
        },
        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_hammer_dance_o"
        },
        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_hammer_twoFemaleDancers_o"
        },
        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_intro_shoes_o"
        },
        {
          trigger: "q",
          location: "Hammerman/",
          name: "hammerman_kidsDancing_o"
        },

        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_discoBallLight_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_discoDancers_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_keyopDiscoDance_o"
        },

        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_a" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_b" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_c" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_d" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_e" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_f" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_g" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_h" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_i" },
        { trigger: "q", location: "DancingTrails/", name: "dancingTrails_j" },

        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_robotDancing_o"
        },
        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_robotHandOnHead_o"
        },

        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_princessDiscoDance2_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_princessDiscoDance3_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_princessDiscoDance4_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_princessDiscoDance_o"
        }
      ]
    },
    {
      id: 6,
      trigger: "u",
      name: "Foreground - MISC1",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "WonderTwins/",
          name: "wondertwins_downhillWagon"
        },
        {
          trigger: "q",
          location: "WonderTwins/",
          name: "wondertwins_fistBump1_o"
        },
        {
          trigger: "q",
          location: "WonderTwins/",
          name: "wondertwins_fistBump2_o"
        },
        {
          trigger: "q",
          location: "WonderTwins/",
          name: "wondertwins_fistBump3"
        },
        {
          trigger: "q",
          location: "WonderTwins/",
          name: "wondertwins_fists_beach"
        },
        {
          trigger: "q",
          location: "WonderTwins/",
          name: "wondertwins_formOfWater_o"
        },
        {
          trigger: "q",
          location: "WonderTwins/",
          name: "wondertwins_jayna_transforms_o"
        },
        {
          trigger: "q",
          location: "WonderTwins/",
          name: "wondertwins_spiralSpin_o"
        },
        {
          trigger: "q",
          location: "WonderTwins/",
          name: "wondertwins_transforming_o"
        },

        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_markFlipping_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_markOnGlass_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_princessFlipping_o"
        },
        {
          trigger: "q",
          location: "BotP/",
          name: "battleOfThePlanets_spaceStarLight_o"
        },
        { trigger: "q", location: "BotP/", name: "botp_banginSpoonsInCell2_o" },
        { trigger: "q", location: "BotP/", name: "botp_bangingSpoonInCell_o" },
        { trigger: "q", location: "BotP/", name: "botp_computerScreens_o" },
        { trigger: "q", location: "BotP/", name: "botp_flashingLights_o" },
        { trigger: "q", location: "BotP/", name: "botp_lightBeams_o" },
        { trigger: "q", location: "BotP/", name: "botp_lightsFlashing_o" },
        { trigger: "q", location: "BotP/", name: "botp_spectograph2_o" },
        {
          trigger: "q",
          location: "BotP/",
          name: "botp_spectograph_matchingWaves_o"
        },
        { trigger: "q", location: "BotP/", name: "botp_spectrograph_o" },
        { trigger: "q", location: "BotP/", name: "botp_trippyGalaxy_o" },
        { trigger: "q", location: "BotP/", name: "botp_trippyRainbowTunnel_o" },

        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2600.50.48"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2600.51.52"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2600.53.36"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2600.55.41"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2600.56.46"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2600.59.49"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2601.00.51"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2601.02.36"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2601.05.12"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2601.07.35"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2601.08.46"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2601.09.51"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2603.15.40"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2603.17.53"
        },
        {
          trigger: "q",
          location: "SpiralZone/",
          name: "spiralZone_2019-01-2603.18.48"
        }
      ]
    },
    {
      id: 7,
      trigger: "i",
      name: "Foreground - Vintage Cartoons",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.28.08"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.32.11"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.33.32"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.35.29"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.39.57"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.42.21"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.46.56"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.49.54"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.51.19"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.52.17"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.53.07"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.54.32"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.55.43"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.57.16"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1922.58.25"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.01.27"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.02.21"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.03.51"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.04.42"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.05.33"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.06.46"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.08.58"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.12.25"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.13.20"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.14.15"
        },
        {
          trigger: "q",
          location: "BumbleBoogie/",
          name: "bumbleBoogie_2019-04-1923.15.11"
        },

        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2523.25.17"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2523.30.25"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2523.32.50"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2523.38.57"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2523.40.29"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2523.49.53"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2523.52.17"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2523.53.51"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2523.56.38"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2523.57.35"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.00.21"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.02.50"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.05.04"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.06.34"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.21.53"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.25.37"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.29.41"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.31.39"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.39.50"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.43.55"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.45.44"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.47.48"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.49.12"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.54.07"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.56.16"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2600.59.18"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2601.03.30"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2601.06.53"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2601.08.00"
        },
        {
          trigger: "q",
          location: "MarchOfTheDinosaurs/",
          name: "MarchOfTheDinosaurs_2019-04-2601.15.54"
        },

        {
          trigger: "q",
          location: "PlasticsInventor/",
          name: "plasticsInventor_2019-04-2200.21.35"
        },
        {
          trigger: "q",
          location: "PlasticsInventor/",
          name: "plasticsInventor_2019-04-2200.22.54"
        },
        {
          trigger: "q",
          location: "PlasticsInventor/",
          name: "plasticsInventor_2019-04-2200.28.29"
        },
        {
          trigger: "q",
          location: "PlasticsInventor/",
          name: "plasticsInventor_2019-04-2200.30.07"
        },
        {
          trigger: "q",
          location: "PlasticsInventor/",
          name: "plasticsInventor_2019-04-2200.36.00"
        },
        {
          trigger: "q",
          location: "PlasticsInventor/",
          name: "plasticsInventor_2019-04-2200.42.10"
        },
        {
          trigger: "q",
          location: "PlasticsInventor/",
          name: "plasticsInventor_2019-04-2200.44.22"
        },
        {
          trigger: "q",
          location: "PlasticsInventor/",
          name: "plasticsInventor_2019-04-2200.45.48"
        },
        {
          trigger: "q",
          location: "PlasticsInventor/",
          name: "plasticsInventor_2019-04-2200.51.16"
        }
      ]
    },
    {
      id: 8,
      trigger: "o",
      name: "Foreground - MISC2",
      enabled: true,
      gifs: [
        { trigger: "q", location: "Aerobics/", name: "abc-start_o" },
        { trigger: "q", location: "Misc/", name: "att_glowing_wired" },
        { trigger: "q", location: "Misc/", name: "bw_striped_cube_spin_o" },
        { trigger: "q", location: "Misc/", name: "bw_stripes_spin_o" },
        { trigger: "q", location: "Misc/", name: "candyBar_happyFace_o" },
        { trigger: "q", location: "Misc/", name: "city-grid-2_o" },
        { trigger: "q", location: "Misc/", name: "city-grid_o" },
        { trigger: "q", location: "Misc/", name: "colored_rectangular_dance" },
        { trigger: "q", location: "Misc/", name: "electro_pyramid_zoom" },
        {
          trigger: "q",
          location: "Misc/",
          name: "fantasticVoyage_computer_flashing_o"
        },
        {
          trigger: "q",
          location: "Misc/",
          name: "fantasticVoyage_flashing_colorBars_o"
        },
        {
          trigger: "q",
          location: "Misc/",
          name: "fantasticVoyage_spinningStripes_disabledLasers_o"
        },
        {
          trigger: "q",
          location: "Misc/",
          name: "fantasticVoyage_spinningStripes_o"
        },
        { trigger: "q", location: "Misc/", name: "fantasticVoyage_tvScreen_o" },
        {
          trigger: "q",
          location: "Misc/",
          name: "forbidden_world_hyperspace2"
        },
        { trigger: "q", location: "Misc/", name: "forest-forgery-1-B-FX1_o" },
        { trigger: "q", location: "Misc/", name: "forest-forgery-2-F2-FX_o" },
        { trigger: "q", location: "Misc/", name: "glowing-cube_o" },
        { trigger: "q", location: "Misc/", name: "golden-flows_o" },
        { trigger: "q", location: "Misc/", name: "grid-open-doors_o" },
        { trigger: "q", location: "Misc/", name: "john-whitney-4_o" },
        { trigger: "q", location: "Misc/", name: "john-whitney-5_o" },
        { trigger: "q", location: "Misc/", name: "kaleidoscope_pointed_muted" },
        { trigger: "q", location: "Misc/", name: "lit_wired_tunnel_o" },
        { trigger: "q", location: "Misc/", name: "orbots_girls_dance_o" },
        { trigger: "q", location: "Misc/", name: "orbots_light_zoom_o" },
        { trigger: "q", location: "Misc/", name: "orbots_light_zoom_o_t" },
        { trigger: "q", location: "Misc/", name: "orbots_running_light_o" },
        { trigger: "q", location: "Misc/", name: "pbs-4_o" },
        { trigger: "q", location: "Misc/", name: "pbs-5_o" },
        { trigger: "q", location: "Misc/", name: "rainbow_hypnotic_circles_o" },
        { trigger: "q", location: "Misc/", name: "rainbow_sparkler_zoom" },
        { trigger: "q", location: "Misc/", name: "rainbow_spinning_circles" },
        { trigger: "q", location: "Misc/", name: "spinning-rainbow-person_o" },
        { trigger: "q", location: "Misc/", name: "spinning_space_planes" },
        { trigger: "q", location: "Misc/", name: "star_explosion_bubbles" },
        { trigger: "q", location: "Misc/", name: "stationId_black_hole_o" },
        { trigger: "q", location: "Misc/", name: "stationId_star_tunnel_o" },
        { trigger: "q", location: "Misc/", name: "stationId_star_tunnel_o_t" },
        {
          trigger: "q",
          location: "Misc/",
          name: "stationLogo_spinning_globe_o"
        },
        { trigger: "q", location: "Misc/", name: "tron_zoom-into-grid_o" },
        {
          trigger: "q",
          location: "Misc/",
          name: "ttriangular_infinity_morph_o"
        },
        {
          trigger: "q",
          location: "Misc/",
          name: "tvshow_man_floating_triangle_o"
        },
        { trigger: "q", location: "Misc/", name: "walking-block-man" },
        { trigger: "q", location: "Misc/", name: "walking_o" },

        { trigger: "q", location: "AnimatedShorts/", name: "crashing_cars_o" },
        {
          trigger: "q",
          location: "AnimatedShorts/",
          name: "man_speedos_walking_o"
        },
        {
          trigger: "q",
          location: "AnimatedShorts/",
          name: "man_speedos_walking_o_t"
        },
        {
          trigger: "q",
          location: "AnimatedShorts/",
          name: "robot_woman_head_back_o"
        },
        {
          trigger: "q",
          location: "AnimatedShorts/",
          name: "robot_woman_head_back_o_t"
        },
        {
          trigger: "q",
          location: "AnimatedShorts/",
          name: "shattered_triangles_o"
        },
        {
          trigger: "q",
          location: "AnimatedShorts/",
          name: "skinny_colored_line_trees_o"
        }
      ]
    },
    {
      id: 9,
      trigger: "p",
      name: "Foreground - MISC3",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_intro_alien_hop_o"
        },
        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_intro_cat_scratch_alien_o"
        },
        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_intro_rocketFlying2_o"
        },
        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_intro_rocketFlying_o"
        },
        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_robotsRunningSmashed_o"
        },
        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_robotsRunning_o"
        },
        {
          trigger: "q",
          location: "JosiePussycatsSpace/",
          name: "josiePussycatsSpace_space_comets_o"
        },

        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_cactusDancingMonsterMean_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_cactusDancingMonster_o"
        },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_cactus_o" },
        { trigger: "q", location: "JacksonFive/", name: "jackson5_cactus_o_t" },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_cars_on_freeway_overhead_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_colorful_walking_silhouettes_hearts_spiral_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_flashingSun_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_flashing_circle_dancing_silhouettes_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_heart_spiral_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_heart_tornado_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_horse_jockey_blob_background_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_j5_tornado_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_monster_tornado_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_riding_horse_background_colorful_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_walkingSunSilhouettes_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_walkingSunSilhouettes_shadow_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_walkingSunSilhouettes_shadow_o_t"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_walking_silhouettes_blob_background_o"
        },
        {
          trigger: "q",
          location: "JacksonFive/",
          name: "jackson5_walking_silhouettes_mirage_o"
        },

        { trigger: "q", location: "Robots/", name: "fantastic-voyage-2" },
        { trigger: "q", location: "Robots/", name: "fantastic-voyage-8" },
        {
          trigger: "q",
          location: "Robots/",
          name: "mannMachine_robotHead_laserEyes_o"
        },
        {
          trigger: "q",
          location: "Robots/",
          name: "mannMachine_robotHead_spin_o"
        },
        { trigger: "q", location: "Robots/", name: "mannMachine_robotSpin_o" },
        {
          trigger: "q",
          location: "Robots/",
          name: "nintendo_gameboy_kid_zap_robot_o"
        },
        {
          trigger: "q",
          location: "Robots/",
          name: "nintendo_gameboy_robot_dance_o"
        },
        {
          trigger: "q",
          location: "Robots/",
          name: "nintendo_gameboy_robot_walk_o"
        },
        {
          trigger: "q",
          location: "Robots/",
          name: "nintendo_gameboy_robot_zap_o"
        },
        {
          trigger: "q",
          location: "Robots/",
          name: "ronniesRobot_flashingRobot_o"
        },
        {
          trigger: "q",
          location: "Robots/",
          name: "ronniesRobots _robot_boomerang_o"
        },
        {
          trigger: "q",
          location: "Robots/",
          name: "ronniesRobots_transformMan_explosion_o"
        },
        {
          trigger: "q",
          location: "Robots/",
          name: "ronniesRobots_transformMan_o"
        },
        {
          trigger: "q",
          location: "Robots/",
          name: "thx1138-screen-graphics-2_o"
        },
        { trigger: "q", location: "Robots/", name: "thx1138-screen-head_o" },
        {
          trigger: "q",
          location: "Robots/",
          name: "thx1138_screen-graphics-2_o"
        },
        {
          trigger: "q",
          location: "Robots/",
          name: "thx1138_screen-graphics_o"
        },
        { trigger: "q", location: "Robots/", name: "tvbreak_robot_corridor" }
      ]
    },

    {
      id: 10,
      trigger: "a",
      name: "Ionalee - SomeBody",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.25.34"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.26.32"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.27.32"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.28.43"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.30.32"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.31.31"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.32.17"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.32.52"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.33.32"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.34.29"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.35.34"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.36.22"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.37.22"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.38.05"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.39.04"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.41.37"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.42.44"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.44.19"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.45.01"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.51.05"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.51.48"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.52.22"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.53.04"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.54.45"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.55.22"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.56.16"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.57.21"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3009.59.22"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3010.00.32"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3010.01.40"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3010.02.21"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3010.03.03"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3010.04.17"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3010.05.03"
        },
        {
          trigger: "q",
          location: "ClubSurge/SomeBody/",
          name: "someBody_2019-04-3010.06.45"
        }
      ]
    },
    {
      id: 11,
      trigger: "s",
      name: "Background - Bathbombs, Ferro, Trumpet",
      enabled: true,
      gifs: [
        { trigger: "q", location: "BathBombs/", name: "bathbomb-boomerang_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-galaxy-1_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-galaxy-2_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-slow-1_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-slow-2_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-spinner-1_o" },
        { trigger: "q", location: "BathBombs/", name: "bathbomb-spinner-2_o" },
        {
          trigger: "q",
          location: "BathBombs/",
          name: "bathbomb-spinner-blur_o"
        },
        { trigger: "q", location: "Ferrofluid/", name: "ferrofluid-burst_o" },
        {
          trigger: "q",
          location: "Ferrofluid/",
          name: "ferrofluid-pingpong-1_o"
        },
        {
          trigger: "q",
          location: "Ferrofluid/",
          name: "ferrofluid-pingpong-2_o"
        },
        {
          trigger: "q",
          location: "Ferrofluid/",
          name: "ferrofluid-pingpong-3_o"
        },
        {
          trigger: "q",
          location: "Ferrofluid/",
          name: "ferrofluid-symetrical-dance-2_o"
        },
        {
          trigger: "q",
          location: "FullTimeTrumpet/",
          name: "full-time-trumpet-FX-1_o"
        },
        {
          trigger: "q",
          location: "FullTimeTrumpet/",
          name: "full-time-trumpet-FX-1_transparent_o"
        },
        {
          trigger: "q",
          location: "FullTimeTrumpet/",
          name: "full-time-trumpet-FX-2_o"
        },
        {
          trigger: "q",
          location: "FullTimeTrumpet/",
          name: "full-time-trumpet-FX-2_transparent_o"
        },
        {
          trigger: "q",
          location: "FullTimeTrumpet/",
          name: "full-time-trumpet-FX-3_o"
        },
        {
          trigger: "q",
          location: "FullTimeTrumpet/",
          name: "full-time-trumpet-FX-3_transparent_o"
        },
        {
          trigger: "q",
          location: "FullTimeTrumpet/",
          name: "full-time-trumpet-FX-4_o"
        },
        {
          trigger: "q",
          location: "FullTimeTrumpet/",
          name: "full-time-trumpet-FX-4_transparent_o"
        }
      ]
    },
    {
      id: 12,
      trigger: "d",
      name: "Background - Rainbow",
      enabled: true,
      gifs: [
        { trigger: "q", location: "Rainbow/", name: "a" },
        { trigger: "q", location: "Rainbow/", name: "b" },
        { trigger: "q", location: "Rainbow/", name: "cruz-lights-1" },
        { trigger: "q", location: "Rainbow/", name: "cruz-lights-2" },
        { trigger: "q", location: "Rainbow/", name: "cruz-lights-3" },
        { trigger: "q", location: "Rainbow/", name: "cruz-lights-4" },
        { trigger: "q", location: "Rainbow/", name: "cruz-lights-5" },
        { trigger: "q", location: "Rainbow/", name: "d" },
        { trigger: "q", location: "Rainbow/", name: "e" },
        { trigger: "q", location: "Rainbow/", name: "f" },
        { trigger: "q", location: "Rainbow/", name: "g" },
        { trigger: "q", location: "Rainbow/", name: "h" },
        { trigger: "q", location: "Rainbow/", name: "i" },
        { trigger: "q", location: "Rainbow/", name: "j" },
        { trigger: "q", location: "Rainbow/", name: "l" },
        { trigger: "q", location: "Rainbow/", name: "o" },
        { trigger: "q", location: "Rainbow/", name: "p" },
        { trigger: "q", location: "Rainbow/", name: "patriotic-orb" },
        { trigger: "q", location: "Rainbow/", name: "rainbow-checker-tunnel" },
        { trigger: "q", location: "Rainbow/", name: "rainbow-gradients" },
        {
          trigger: "q",
          location: "Rainbow/",
          name: "spinning-checkered-pyramid"
        }
      ]
    },
    {
      id: 13,
      trigger: "f",
      name: "Background - Flythroughs, Flythroughs",
      enabled: true,
      gifs: [
        { trigger: "q", location: "Flythroughs/", name: "flythrough_a" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_g" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_i" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_n" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_o" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_p" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_q copy" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_q" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_s copy" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_s" },
        { trigger: "q", location: "Flythroughs/", name: "flythrough_t" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_1_o" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_2_o" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_2_o_t" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_3_o" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_3_o_t" },
        { trigger: "q", location: "CanyonFly/", name: "canyon_fly_3_t" }
      ]
    },
    {
      id: 14,
      trigger: "g",
      name: "Background - Generate",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "Generate/",
          name: "gener8-alley-overhead-lights"
        },
        { trigger: "q", location: "Generate/", name: "gener8-ascii-flow" },
        {
          trigger: "q",
          location: "Generate/",
          name: "gener8-cloud-seizures_o"
        },
        { trigger: "q", location: "Generate/", name: "gener8-dots-and-lines" },
        {
          trigger: "q",
          location: "Generate/",
          name: "gener8-flashing-police-lights"
        },
        { trigger: "q", location: "Generate/", name: "gener8-pukey-pixels" },
        {
          trigger: "q",
          location: "Generate/",
          name: "gener8-rainbow-sparkles"
        },
        {
          trigger: "q",
          location: "Generate/",
          name: "gener8-stefani-porch-light"
        },
        { trigger: "q", location: "Generate/", name: "gener8-tunnel-lights" },
        {
          trigger: "q",
          location: "Generate/",
          name: "gener8-vertical-rainbow-stripes"
        },
        {
          trigger: "q",
          location: "Generate/",
          name: "gener8-white-gold-sparkles"
        },
        {
          trigger: "q",
          location: "Generate/",
          name: "genr8-vertical-rainbow-stripes-2"
        }
      ]
    },
    {
      id: 15,
      trigger: "h",
      name: "Background - Gridlines",
      enabled: true,
      gifs: [
        { trigger: "q", location: "GridLines/", name: "e" },
        { trigger: "q", location: "GridLines/", name: "gird-open-doors" },
        { trigger: "q", location: "GridLines/", name: "glowing-cube_o" },
        { trigger: "q", location: "GridLines/", name: "h" },
        { trigger: "q", location: "GridLines/", name: "i" },
        { trigger: "q", location: "GridLines/", name: "m copy" },
        { trigger: "q", location: "GridLines/", name: "n copy" },
        { trigger: "q", location: "GridLines/", name: "r copy" },
        { trigger: "q", location: "GridLines/", name: "rainbow-sidewalk" },
        { trigger: "q", location: "GridLines/", name: "s" },
        { trigger: "q", location: "GridLines/", name: "t" },
        { trigger: "q", location: "GridLines/", name: "trench-fly-stars" },
        { trigger: "q", location: "GridLines/", name: "w copy" },
        { trigger: "q", location: "GridLines/", name: "w" }
      ]
    },
    {
      id: 16,
      trigger: "j",
      name: "Background - Matter",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "Matter/",
          name: "matterOne_2019-04-1300.37.36_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterOne_2019-04-1300.38.36_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterOne_2019-04-1300.39.35_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterOne_2019-04-1300.40.26_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterOne_2019-04-1300.41.29_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterOne_2019-04-1300.42.16_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterOne_2019-04-1300.43.25_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterOne_2019-04-1300.44.15_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterOne_2019-04-1300.46.07_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterOne_2019-04-1300.46.55_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterTwo_2019-04-13-15.11.23_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterTwo_2019-04-13-15.12.09_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterTwo_2019-04-13-15.17.55_2t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterTwo_2019-04-13-15.17.55_t"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterTwo_2019-04-14-16.35.15"
        },
        {
          trigger: "q",
          location: "Matter/",
          name: "matterTwo_2019-04-14-16.35.15_t"
        }
      ]
    },
    {
      id: 17,
      trigger: "k",
      name: "Background - Japanese Anims",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_FileAug08123439AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_FileAug08123703AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_FileJul1813455AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_FileJul1813902AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_FileJul1813914AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_FileJul1813937AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_FileJul1813947AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_FileJul1813957AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_FileJul1814555AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_FileJul184611AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_Jul1814018AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_Jul1814415AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_Jul1814448AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_Jul1814457AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_Jul1814510AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_Jul1814521AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_Jul1814531AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_Jul1814544AM"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_electrifying_organs"
        },
        {
          trigger: "q",
          location: "JapaneseAnims/",
          name: "japan_explosion_eray_tunnel_zoom_o"
        }
      ]
    },
    {
      id: 18,
      trigger: "l",
      name: "Background - Circles and Eyes",
      enabled: true,
      gifs: [
        { trigger: "q", location: "SpinningCircles/", name: "d" },
        { trigger: "q", location: "SpinningCircles/", name: "e" },
        { trigger: "q", location: "SpinningCircles/", name: "f" },
        { trigger: "q", location: "SpinningCircles/", name: "i copy" },
        { trigger: "q", location: "SpinningCircles/", name: "i" },
        { trigger: "q", location: "SpinningCircles/", name: "j copy" },
        { trigger: "q", location: "SpinningCircles/", name: "j" },
        { trigger: "q", location: "SpinningCircles/", name: "l" },
        { trigger: "q", location: "SpinningCircles/", name: "n" },
        { trigger: "q", location: "SpinningCircles/", name: "p" },
        { trigger: "q", location: "SpinningCircles/", name: "q" },
        {
          trigger: "q",
          location: "SpinningCircles/",
          name: "rainbow_hypnotic_circles_o"
        },
        {
          trigger: "q",
          location: "SpinningCircles/",
          name: "rainbow_sparkler_zoom"
        },
        {
          trigger: "q",
          location: "SpinningCircles/",
          name: "rainbow_spinning_circles"
        },
        { trigger: "q", location: "SpinningCircles/", name: "z" },
        { trigger: "q", location: "Eyes/", name: "eye_laser_sparkles_o" },
        { trigger: "q", location: "Eyes/", name: "eye_lasers_1_o" },
        { trigger: "q", location: "Eyes/", name: "eyes_r_o" },
        { trigger: "q", location: "Eyes/", name: "eyes_s_o" }
      ]
    },

    {
      id: 19,
      trigger: "z",
      name: "Ionalee - Open Seas",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_019-03-3022.31.08"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.07.34"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.10.01"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.32.27"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.33.19"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.34.11"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.35.28"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.36.47"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.37.47"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.38.25"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.39.38"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.41.20"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.42.06"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.42.52"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.44.18"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.45.29"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3022.46.53"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.07.09"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.07.56"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.09.31"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.10.34"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.11.17"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.12.02"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.12.47"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.13.34"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.14.16"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.15.09"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.16.23"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.17.08"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.18.02"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.18.52"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.19.58"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.21.03"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.22.11"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.23.12"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.24.13"
        },
        {
          trigger: "q",
          location: "ClubSurge/OpenSeas/",
          name: "OpenSeas_2019-03-3023.25.06"
        }
      ]
    },
    {
      id: 20,
      trigger: "x",
      name: "Ionalee - Goods",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0318.52.03",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0318.53.34",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0318.54.46",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.26.17",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.27.51",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.28.47",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.30.11",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.31.03",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.32.17",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.33.23",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.35.12",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.36.28",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.38.41",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.41.10",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.42.09",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.43.02",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0319.44.00",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.32.20",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.33.21",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.34.36",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.36.12",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.37.52",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.39.28",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.41.23",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.42.34",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.44.00",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.45.27",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.47.10",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.53.52",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Goods/",
          name: "2019-04-0320.55.53",
          set: "m"
        }
      ]
    },
    {
      id: 21,
      trigger: "c",
      name: "Ionalee - Hunting For Pearls",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0400.43.52",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0400.44.45",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0400.45.44",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0400.47.11",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0400.48.59",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0400.49.46",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0400.54.04",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0400.58.19",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0400.59.39",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.02.44",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.05.11",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.06.19",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.07.03",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.08.07",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.09.28",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.10.35",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.11.31",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.12.48",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.17.09",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.19.28",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.20.32",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.21.54",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.22.53",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.23.47",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.24.57",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.25.57",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.28.35",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.29.37",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.31.39",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.32.51",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.33.55",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.34.37",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.35.38",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.37.49",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.38.37",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.39.49",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.41.13",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/HuntingForPearls/",
          name: "2019-04-0401.43.26",
          set: "m"
        }
      ]
    },
    {
      id: 22,
      trigger: "v",
      name: "Ionalee - Joy",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.21.16",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.22.11",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.24.01",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.26.10",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.29.14",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.30.47",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.33.17",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.34.24",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.35.41",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.36.55",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.38.10",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.39.06",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.39.58",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.44.51",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.45.50",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.47.20",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.48.16",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.49.02",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.50.14",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.50.54",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.51.57",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.52.53",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.54.03",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.54.49",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.55.44",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.57.20",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.58.41",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Joy/",
          name: "joy_2019-04-1709.59.55",
          set: "m"
        }
      ]
    },
    {
      id: 23,
      trigger: "b",
      name: "Ionalee - Samaritan",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1712.03.08",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1714.27.09",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1714.28.19",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1714.32.00",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1714.33.18",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1714.34.06",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1716.52.47",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1716.53.41",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1716.54.32",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1716.55.16",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1716.56.05",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.23.37",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.25.46",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.27.35",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.29.00",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.30.41",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.31.49",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.32.58",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.33.48",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.34.50",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.35.36",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.40.18",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.42.15",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.43.57",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Samaritan/",
          name: "samaritan_2019-04-1802.44.46",
          set: "m"
        }
      ]
    },
    {
      id: 24,
      trigger: "n",
      name: "Ionalee - B",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.16.04",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.19.41",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.20.27",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.22.01",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.24.30",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.25.34",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.27.01",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.28.57",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.31.22",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.32.10",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.33.48",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.34.53",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.35.57",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.38.38",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.40.03",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.41.18",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/B/",
          name: "b_2019-04-0421.45.36",
          set: "m"
        }
      ]
    },
    {
      id: 25,
      trigger: "m",
      name: "Ionalee - Sever",
      enabled: true,
      gifs: [
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.14.38",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.16.36",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.18.37",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.19.44",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.20.19",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.21.48",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.24.29",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.25.31",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.27.28",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.28.32",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.31.17",
          set: "m"
        },
        {
          trigger: "q",
          location: "ClubSurge/Sever/",
          name: "sever_2019-04-0416.32.45",
          set: "m"
        }
      ]
    }
  ]
};
