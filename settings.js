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

    { trigger: "0", location: "overlays", type: "brand", name: "beerBelly_logo_white.png" },
    { trigger: "1", location: "overlays", type: "brand", name: "beerBelly_logo_black.png" },
    { trigger: "2", location: "overlays", type: "brand", name: "incidentalBeats_logo_white.png" },
    { trigger: "3", location: "overlays", type: "brand", name: "incidentalBeats_logo_black.png" },
    { trigger: "4", location: "overlays", type: "artist", name: "fiftytwovista_logo_white.png" },
    { trigger: "5", location: "overlays", type: "artist", name: "fiftytwovista_logo_black.png" },
    { trigger: "6", location: "overlays", type: "artist", name: "floppydisco_western1_black.png" },
    { trigger: "7", location: "overlays", type: "artist", name: "floppydisco_western1_white.png" },
    { trigger: "8", location: "overlays", type: "artist", name: "clubSurge_logo_gold.gif" },
    { trigger: "9", location: "overlays", type: "artist", name: "clubSurge_logo_white.gif" },

    // { trigger: "8", location: "overlays", type: "artist", name: "nprevail_logo_white.png" },
    // { trigger: "9", location: "overlays", type: "artist", name: "nprevail_logo_black.png" }
  ],

  overlaySets: [
    {
      trigger: "0",
      name: "Eclectic Taste",
      type: "brand",
      enabled: true,
      overlays: [
        { enabled: true, location: "overlays", url: "beerBelly_logo_white.png", blendMode: "screen"},
        { enabled: true, location: "overlays", url: "beerBelly_logo_black.png", blendMode: "overlay"},
        { enabled: true, location: "overlays", url: "incidentalBeats_logo_white.png", blendMode: "screen"},
        { enabled: true, location: "overlays", url: "incidentalBeats_logo_black.png", blendMode: "overlay"}
      ]
    },
    {
      trigger: "1",
      name: "Floppy Disco",
      type: "artist",
      enabled: true,
      overlays: [
        { enabled: true, location: "overlays", url: "floppydisco_western1_white.png", blendMode: "overlay"},
        { enabled: true, location: "overlays", url: "floppydisco_western1_black.png", blendMode: "overlay"},
        { enabled: true, location: "overlays", url: "floppydisco_western2_white.png", blendMode: "overlay"},
        { enabled: true, location: "overlays", url: "floppydisco_western2_black.png", blendMode: "overlay"},

      ]
    },
    {
      trigger: "2",
      name: "Fiftytwo Vista",
      type: "artist",
      enabled: true,
      overlays: [
        { enabled: true, location: "overlays", url: "fiftytwovista_logo_white.png", blendMode: "overlay"},
        { enabled: true, location: "overlays", url: "fiftytwovista_logo_black.png", blendMode: "overlay"}
      ]
    },
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
