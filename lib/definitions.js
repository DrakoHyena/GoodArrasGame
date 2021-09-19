// GUN DEFINITIONS
const combineStats = function(arr) {
  arr.unshift(
    // RELOAD RECOIL SHUDDER SIZE HEALTH DAMAGE PEN SPEED MAX RANGE DENSITY SPRAY RESIST
      [1,     1,     1,      1,   1,     1,     1,  1,    1,  1,    1,      1,    1     ],
  )
  try {
    // Build a blank array of the appropiate length
    let data = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    arr.forEach(function(component) {
      for (let i = 0; i < data.length; i++) {
        data[i] = data[i] * component[i];
      }
    });
    return {
      reload: data[0],
      recoil: data[1],
      shudder: data[2],
      size: data[3],
      health: data[4],
      damage: data[5],
      pen: data[6],
      speed: data[7],
      maxSpeed: data[8],
      range: data[9],
      density: data[10],
      spray: data[11],
      resist: data[12],
    };
  } catch (err) {
    console.log(err);
    console.log(JSON.stringify(arr));
  }
};
const skillSet = (() => {
  let skcnv = {
    rld: 0,
    pen: 1,
    str: 2,
    dam: 3,
    spd: 4,

    shi: 5,
    atk: 6,
    hlt: 7,
    rgn: 8,
    mob: 9,
  };
  return args => {
    let skills = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let s in args) {
      if (!args.hasOwnProperty(s)) continue;
      skills[skcnv[s]] = Math.round(7 * args[s]);
    }
    return skills;
  };
})();
const setBuild = build => {
  let skills = build.split(build.includes('/') ? '/' : '').map(r => +r);
  if (skills.length !== 10) throw new RangeError('Build must be made up of 10 numbers');
  return [6, 4, 3, 5, 2, 9, 0, 1, 8, 7].map(r => skills[r]);
};

const g = require('./gstats.js').g

const dfltskl = 7;

// NAMES
const statnames = {
  smasher: 1,
  drone: 2,
  necro: 3,
  swarm: 4,
  trap: 5,
  generic: 6,
};
const gunCalcNames = {
  default: 0,
  bullet: 1,
  drone: 2,
  swarm: 3,
  fixedReload: 4,
  thruster: 5,
  sustained: 6,
  necro: 7,
  trap: 8,
};
// ENTITY DEFINITIONS
exports.genericEntity = {
  NAME: '',
  LABEL: 'Unknown Entity',
  TYPE: 'unknown',
  DAMAGE_CLASS: 0, // 0: def, 1: food, 2: tanks, 3: obstacles
  DANGER: 0,
  VALUE: 0,
  SHAPE: 0,
  COLOR: 16,
  INDEPENDENT: false,
  CONTROLLERS: ['doNothing'],
  HAS_NO_MASTER: false,
  MOTION_TYPE: 'glide', // motor, swarm, chase
  FACING_TYPE: 'toTarget', // turnWithSpeed, withMotion, looseWithMotion, toTarget, looseToTarget
  DRAW_HEALTH: false,
  DRAW_SELF: true,
  DAMAGE_EFFECTS: true,
  RATEFFECTS: true,
  MOTION_EFFECTS: true,
  INTANGIBLE: false,
  ACCEPTS_SCORE: true,
  GIVE_KILL_MESSAGE: false,
  CAN_GO_OUTSIDE_ROOM: false,
  HITS_OWN_TYPE: 'normal', // hard, repel, never, hardWithBuffer
  DIE_AT_LOW_SPEED: false,
  DIE_AT_RANGE: false,
  CLEAR_ON_MASTER_UPGRADE: false,
  PERSISTS_AFTER_DEATH: false,
  VARIES_IN_SIZE: false,
  HEALTH_WITH_LEVEL: true,
  CAN_BE_ON_LEADERBOARD: true,
  HAS_NO_RECOIL: false,
  AUTO_UPGRADE: 'none',
  BUFF_VS_FOOD: false,
  OBSTACLE: false,
  CRAVES_ATTENTION: false,
  NECRO: false,
  UPGRADES_TIER_1: [],
  UPGRADES_TIER_2: [],
  UPGRADES_TIER_3: [],
  SKILL: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  LEVEL: 0,
  SKILL_CAP: [dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl, dfltskl],
  GUNS: [],
  MAX_CHILDREN: 0,
  BODY: {
    ACCELERATION: 1,
    SPEED: 0,
    HEALTH: 1,
    RESIST: 1,
    SHIELD: 0,
    REGEN: 0,
    DAMAGE: 1,
    PENETRATION: 1,

    RANGE: 0,
    FOV: 1,
    DENSITY: 1,
    STEALTH: 1,
    PUSHABILITY: 1,
    HETERO: 2,
  },
  FOOD: {
    LEVEL: -1,
  },
};

const base = {
  ACCEL: 1.8,
  SPEED: 6.5,
  HEALTH: 20,
  DAMAGE: 3,
  RESIST: 1,
  PENETRATION: 1.05,
  SHIELD: 8,
  REGEN: 0.025,
  FOV: 1.2,
  DENSITY: 0.5,
};
exports.genericTank = {
  LABEL: 'Unknown Class',
  TYPE: 'tank',
  DAMAGE_CLASS: 2,
  DANGER: 5,
  MOTION_TYPE: 'motor',
  FACING_TYPE: 'toTarget',
  SIZE: 15,
  MAX_CHILDREN: 0,
  DAMAGE_EFFECTS: false,
  BODY: { // def
    ACCELERATION: base.ACCEL,
    SPEED: base.SPEED,
    HEALTH: base.HEALTH,
    DAMAGE: base.DAMAGE,
    PENETRATION: base.PENETRATION,
    SHIELD: base.SHIELD,
    REGEN: base.REGEN,
    FOV: base.FOV,
    DENSITY: base.DENSITY,
    PUSHABILITY: 0.9,
    HETERO: 3,
  },
  GUNS: [],
  TURRETS: [],
  GIVE_KILL_MESSAGE: true,
  DRAW_HEALTH: true,
  dHITS_OWN_TYPE: "hardOnlyTanks"
};

exports.obstacle = {
  TYPE: 'wall',
  DAMAGE_CLASS: 1,
  LABEL: 'Rock',
  FACING_TYPE: 'turnWithSpeed',
  SHAPE: -9,
  BODY: {
    PUSHABILITY: 0,
    HEALTH: 10000,
    SHIELD: 10000,
    REGEN: 1000,
    DAMAGE: 1,
    RESIST: 100,
    STEALTH: 1,
  },
  VALUE: 0,
  SIZE: 60,
  COLOR: 16,
  VARIES_IN_SIZE: true,
  GIVE_KILL_MESSAGE: true,
  ACCEPTS_SCORE: false,
};
exports.mazeWall = {
  PARENT: [exports.obstacle],
  LABEL: "Wall",
  SHAPE: 4
};
exports.babyObstacle = {
  PARENT: [exports.obstacle],
  SIZE: 25,
  SHAPE: -7,
  LABEL: "Gravel",
};

// WEAPONS
exports.bullet = {
  LABEL: 'Bullet',
  TYPE: 'bullet',
  ACCEPTS_SCORE: false,
  BODY: {
    PENETRATION: 1,
    SPEED: 3.75,
    RANGE: 90,
    DENSITY: 1.25,
    HEALTH: 1,
    DAMAGE: 5,
    PUSHABILITY: 0.3,
  },
  FACING_TYPE: 'smoothWithMotion',
  CAN_GO_OUTSIDE_ROOM: true,
  HITS_OWN_TYPE: 'never',
  // DIE_AT_LOW_SPEED: true,
  DIE_AT_RANGE: true,
};

// TURRETS
exports.autoTurret = {
  PARENT: [exports.genericTank],
  LABEL: 'Turret',
  BODY: {
    FOV: 0.8
  },
  COLOR: 16,
  //CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [{
    /*** LENGTH WIDTH ASPECT X Y ANGLE DELAY */
    POSITION: [22, 10, 1, 0, 0, 0, 0, ],
    PROPERTIES: {
      SHOOT_SETTINGS: combineStats([g.basic, [1.5, 0.5, 1, 1, 0.8, 0.8, 1.5, 1.25, 1.25, 1, 2, 1, 1]]),
      TYPE: exports.bullet,
    },
  }],
};

// FUNCTIONS
function newWeapon(type, l = 18, w = 8, s, x = 0, y = 0, as = 0, an = 0, d = 0, p = {}) {
    // Define the position and properties
    let weapon = {
        //length width aspect x y angle delay
        POSITION: [l, w, as, x, y, an, d]
    }, properties;
    // Switch standard for gun type
    switch(type) {
      case 'bullets':
        properties = {
            SHOOT_SETTINGS: combineStats(s),
            TYPE: exports.bullet,
            LABEL: '', // def
            STAT_CALCULATOR: 0, // def
            WAIT_TO_CYCLE: false, // def
            AUTOFIRE: false, // def
            SYNCS_SKILLS: false, // def
            MAX_CHILDREN: 0, // def
            ALT_FIRE: false, // def
            NEGATIVE_RECOIL: false, // def
        };
        break;
      case 'drones':
        properties = {
            SHOOT_SETTINGS: combineStats(s),
            TYPE: exports.drone,
            AUTOFIRE: true,
            SYNCS_SKILLS: true,
            STAT_CALCULATOR: gunCalcNames.drone,
        }
        break;
      case 'traps':
        properties = {
            SHOOT_SETTINGS: combineStats([g.trap]),
          TYPE: exports.trap,
          STAT_CALCULATOR: gunCalcNames.trap,
        }
        break;
      defualt:
        console.log("Invalid weapon type specified");
        break;
    };
    // Set any options that where defined
    if (p.MAX_CHILDREN != null) properties.MAX_CHILDREN = p.MAX_CHILDREN
    if (p.TYPE != null) properties.TYPE = p.TYPE
    if (p.AUTOFIRE != null) properties.AUTOFIRE = p.AUTOFIRE
    if (p.ALT_FIRE != null) properties.ALT_FIRE = p.ALT_FIRE
    if (p.SYNCS_SKILLS != null) properties.SYNCS_SKILLS = p.SYNCS_SKILLS
    // Return it
    weapon.PROPERTIES = properties
    return weapon
}
exports.bot = {
  AUTO_UPGRADE: 'random',
  FACING_TYPE: 'looseToTarget',
  BODY: {
    SIZE: 12,
  },
  //COLOR: 17,
  NAME: "ai_",
  CONTROLLERS: ['nearestDifferentMaster', 'mapAltToFire', 'minion', 'fleeAtLowHealth'],
  AI: {
    STRAFE: true,
  },
};

/*exports.developer = {
  PARENT: [exports.genericTank],
  LABEL: 'developer'
}*/

exports.basic = {
  PARENT: [exports.genericTank],
  LABEL: 'Basic',
  //CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [
    newWeapon('bullets', 18, 8, [g.basic], 0, 0, 1, 0, 0, {}),
  ]
};

exports.THESPY = {
  PARENT: [exports.genericTank],
  LABEL: 'THE SPY',
  //CONTROLLERS: ['nearestDifferentMaster'],
  GUNS: [
    newWeapon('bullets', 18, 8, [g.basic], 0, 0, 1, 0, 0),
  ],
};
for (let k = 100; k > 0; k--) {
    exports.THESPY.GUNS.push(newWeapon('bullets', 18, 8, [g.basic], 0, 0, 1, 0, 0, {ALT_FIRE:true}))
}

//exports.basic.UPGRADES_TIER_1 = [exports.developer]
//exports.developer.UPGRADES_TIER_2 = [exports.THESPY]