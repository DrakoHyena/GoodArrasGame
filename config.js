exports.o = {
  // Base
  "host": "0.0.0.0",
  "servesStatic": true,
  "port": 3000,
  "logpath": "logger.php",
  
  // Networking
  "networkUpdateFactor": 24,
  "socketWarningLimit": 5,
  "networkFrontlog": 1,
  "networkFallbackTime": 150,
  "visibleListInterval": 1000,
  "maxHeartbeatInterval": 30000,
  "sqlinfo":{
    "connectionLimit": 50,
    "host": "DEFAULT",
    "user": "root",
    "password": "DEFAULT",
    "database": "DEFAULT",
    "debug": false
  },
  "verbose": true,
  
  // Gamespeed
  "gameSpeed": 1,
  "runSpeed": 1.5,
  "MIN_SPEED": 0.001,

  // General map settings
  "WIDTH": 2500,
  "HEIGHT": 2500,
  "MODE": "ffa",
  "RANDOM_COLORS": false,
  "BANNED_CHARACTER_REGEX": "/[\uFDFD\u200E\u0000]/gi", // Free Food Lucario
  "ROOM_SETUP": [
    [ "roid", "norm", "norm", "roid" ],
    [ "norm", "nest", "roid", "norm" ],
    [ "norm", "roid", "nest", "norm" ],
    [ "roid", "norm", "norm", "roid" ]
  ],
  "X_GRID": 4,
  "Y_GRID": 4,
  
  // Constants
  "DAMAGE_CONSTANT": 0.6,
  "KNOCKBACK_CONSTANT": 1,
  "ROOM_BOUND_FORCE": 0.01,
  
  // Foods
  "FOOD": [
    0, 
    0.75,
    0.22,
    0.1,
    0.005,
    0,
    0
  ],
  "FOOD_NEST": [
    0, 
    0.0,
    0.0,
    0.75,
    0.23,
    0.02,
    0
  ],
  "FOOD_AMOUNT": 25, 
  
  // Skills and upgrades
  "MAX_SKILL": 7,
  "SOFT_MAX_SKILL": 0.59,
  "TIER_1": 10,
  "TIER_2": 25,
  "TIER_3": 45,
  "SKILL_CAP": 45,
  "SKILL_SOFT_CAP": 0,
  "SKILL_CHEAT_CAP": 45,
  "SKILL_LEAK": 0,
  "SKILL_BOOST": 5,
  "STEALTH": 4,
  
  // Other
  "BOTS": 0,
  "GLASS_HEALTH_FACTOR": 2,
  "TOKEN_REQUIRED": false
}
