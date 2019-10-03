const appz = {
  midiOn: false,
  // defaultBeatTime: 2000,
  beatSpeed: 1000,
  sameSameConstant: 2,
  overlaysEnabled: true,
  // startupBankNumber: 1,
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
      { name: "difference", trigger: "1", enabled: true },
      { name: "multiply", trigger: "1", enabled: true },
      { name: "darken", trigger: "1", enabled: true },
      { name: "lighten", trigger: "1", enabled: true },
      { name: "color-dodge", trigger: "1", enabled: true },
      { name: "color-burn", trigger: "1", enabled: true },
      { name: "hard-light", trigger: "1", enabled: true },
      { name: "soft-light", trigger: "1", enabled: true },
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
    // { trigger: "1", location: "overlays", name: "dot_overlay.gif" },
    // { trigger: "2", location: "overlays", name: "scanlines_overlay.gif" },
    { trigger: "1", location: "overlays", name: "beerBelly_logo_white.png" },
    { trigger: "2", location: "overlays", name: "beerBelly_logo_black.png" },
    { trigger: "3", location: "overlays", name: "incidentalBeats_logo_white.png" },
    { trigger: "4", location: "overlays", name: "incidentalBeats_logo_black.png" },
    { trigger: "5", location: "overlays", name: "fiftytwovista_logo_white.png" },
    { trigger: "6", location: "overlays", name: "fiftytwovista_logo_black.png" },
  ],

  sequence: [
    {
      trigger: "a",
      name: "Some sequence",
      enabled: true,
      scene: [
        {
          gifs: [
            { location: "BotP/", name: "battleOfThePlanets_keyopDiscoDance2_o" },
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
            { location: "4thStreetVine/", name: "nintendo_gameboy_kid_zap_robot_o" },
            { location: "4thStreetVine/", name: "nintendo_gameboy_robot_dance_o" }
          ]
        },
        {
          gifs: [
            { location: "MissionSpatialeDelta2/", name: "msd_2018-03-0320.29.26" },
            { location: "MissionSpatialeDelta2/", name: "msd_2018-03-0320.38.00" }
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
            { location: "4thStreetVine/", name: "tvshow_man_floating_triangle_o" }
          ]
        },
        {
          gifs: [
            { location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-1_o" },
            { location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-1_transparent_o" }
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
            { location: "4thStreetVine/", name: "tvshow_man_floating_triangle_o"
            }
          ]
        },
        {
          gifs: [
            { location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-1_o" },
            { location: "FullTimeTrumpet/", name: "full-time-trumpet-FX-1_transparent_o"
            }
          ]
        }
      ]
    }
  ]
};
