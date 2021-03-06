"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var warrior = [{
  name: "Bonk",
  description: "Bonk releases a powerful blow that increases damage. Damage and Attack Rating are also increased compared to normal blow; damage is added both as flat amount and percentage (after flat increase).",
  initial: {
    damage: 1,
    "damageBonus %": 50,
    "attackBonus %": 20
  },
  next: {
    damage: 1,
    "damageBonus %": 5,
    "attackBonus %": 5
  }
}, {
  name: "Swordsman",
  description: "Deal Extra damage with Swords",
  initial: {
    "damageBonus %": 28,
    "attackBonus %": 40,
    "critcalStrike %": 5
  },
  next: {
    "damageBonus %": 5,
    "attackBonus %": 8,
    "critcalStrike %": 4
  }
}, {
  name: "Axeman",
  description: "Deal Extra damage with Axes",
  initial: {
    "damageBonus %": 28,
    "attackBonus %": 40,
    "critcalStrike %": 5
  },
  next: {
    "damageBonus %": 5,
    "attackBonus %": 8,
    "critcalStrike %": 4
  }
}, {
  name: "Maceman",
  description: "Deal Extra damage with Maces",
  initial: {
    "damageBonus %": 28,
    "attackBonus %": 40,
    "critcalStrike %": 5
  },
  next: {
    "damageBonus %": 5,
    "attackBonus %": 8,
    "critcalStrike %": 4
  }
}, {
  name: "Spearman",
  description: "Deal Extra damage with Spears",
  initial: {
    "damageBonus %": 28,
    "attackBonus %": 40,
    "critcalStrike %": 5
  },
  next: {
    "damageBonus %": 5,
    "attackBonus %": 8,
    "critcalStrike %": 4
  }
}, {
  name: "Polearm Master",
  description: "Deal Extra damage with Polearms & Poleaxes",
  initial: {
    "damageBonus %": 28,
    "attackBonus %": 40,
    "critcalStrike %": 5
  },
  next: {
    "damageBonus %": 5,
    "attackBonus %": 8,
    "critcalStrike %": 4
  }
}, {
  name: "Throwing Master",
  description: "Deal Extra damage with Throwing Weapons",
  initial: {
    "damageBonus %": 28,
    "attackBonus %": 40,
    "critcalStrike %": 5
  },
  next: {
    "damageBonus %": 5,
    "attackBonus %": 8,
    "critcalStrike %": 4
  }
}, {
  name: "Relieve",
  description: "Heal after Winning a battle",
  initial: {
    "heal %": 10
  },
  next: {
    "heal %": 1
  }
}, {
  name: "Critical Hit",
  description: "Change to Critical Hit the enemy",
  initial: {
    "chance %": 5
  },
  next: {
    "chance %": 1
  }
}, {
  name: "Healing Hit",
  description: "Receive Healing from hitting enemies",
  initial: {
    "heal %": 1
  },
  next: {
    "heal %": 0.5
  }
}, {
  name: "Stun",
  description: "Chance to Stun enemies & increased attack damage",
  initial: {
    "damageBonus %": 5,
    "chance %": 5
  },
  next: {
    "damageBonus %": 1,
    "chance %": 2
  }
}, {
  name: "Retaliate",
  description: "Chance to Kick enemy when receiving non-ranged damage",
  initial: {
    "chance %": 5
  },
  next: {
    "chance %": 2
  }
}, {
  name: "Critical Kick",
  description: "Change to Critical Kick the enemy",
  initial: {
    "chance %": 5
  },
  next: {
    "chance %": 1
  }
}, {
  name: "Wound",
  description: "Wound the enemy, bleed over time (% weapon damage)",
  initial: {
    "damage %": 50,
    rounds: 2
  },
  next: {
    "damage %": 5,
    rounds: 0.2
  }
}, {
  name: "Double Swing",
  description: "Double Weapon damage + damage increase",
  initial: {
    "damage %": 100,
    attackBonus: 15
  },
  next: {
    "damage %": 0,
    attackBonus: 5
  }
}, {
  name: "Parry",
  description: "Gives chance to parry incoming monster attacks",
  initial: {
    "parry %": 5
  },
  next: {
    "parry %": 1
  }
}, {
  name: "Though Skin",
  description: "Increase overall armor value %",
  initial: {
    "armorBonus %": 50
  },
  next: {
    "armorBonus %": 5
  }
}, {
  name: "Resistance",
  description: "Increase all resistance",
  initial: {
    "resistance %": 2
  },
  next: {
    "resistance %": 2
  }
}, {
  name: "Cleave",
  description: "Hit all monsters with % weapon damage",
  initial: {
    "damage %": 50
  },
  next: {
    "damage %": 5
  }
}, {
  name: "Howl",
  description: "Reduce all enemies armor by %",
  initial: {
    "reducedArmor %": 10,
    rounds: 2
  },
  next: {
    "reducedArmor %": 2,
    rounds: 0.2
  }
}, {
  name: "Screech",
  description: "Chance to stun enemies %",
  initial: {
    chance: 10,
    rounds: 2
  },
  next: {
    chance: 2,
    rounds: 0.2
  }
}, {
  name: "Strategic Shout",
  description: "Increases attack rating next rounds",
  initial: {
    "attackBonus %": 40,
    rounds: 2
  },
  next: {
    "attackBonus %": 5,
    rounds: 0.2
  }
}, {
  name: "Battle Cry",
  description: "Increases attack damage next rounds",
  initial: {
    "damageBonus %": 40,
    rounds: 2
  },
  next: {
    "damageBonus %": 5,
    rounds: 0.2
  }
}, {
  name: "Battle Orders",
  description: "Increases life next rounds",
  initial: {
    "lifeBonus %": 40,
    rounds: 2
  },
  next: {
    "lifeBonus %": 5,
    rounds: 0.2
  }
}, {
  name: "War Cry",
  description: "Chance to parry next rounds",
  initial: {
    "chance %": 30,
    rounds: 2
  },
  next: {
    "chance %": 5,
    rounds: 0.5
  }
}, {
  name: "Battle Command",
  description: "Wound all enemies",
  initial: {
    "damage %": 10,
    rounds: 2
  },
  next: {
    "damage %": 5,
    rounds: 0.5
  }
}, {
  name: "Double Throw",
  description: "Double Throw Weapon damage + damage increase",
  initial: {
    "damage %": 100,
    attackBonus: 15
  },
  next: {
    "damage %": 0,
    attackBonus: 5
  }
}, {
  name: "Critical Throw",
  description: "Chance to critically hit enemies with throw weapons and attack rating increase",
  initial: {
    chance: 10,
    "attackBonus %": 40
  },
  next: {
    chance: 2,
    "attackBonus %": 5
  }
}, {
  name: "Strategic Strike",
  description: "Increases attack rating and damage",
  initial: {
    "damage %": 20,
    "attackBonus %": 40
  },
  next: {
    "damage %": 5,
    "attackBonus %": 5
  }
}, {
  name: "Concentrated Strike",
  description: "Increases damage, critical chance and unable to miss",
  initial: {
    "damage %": 20,
    critChance: 2,
    "attackBonus %": 40
  },
  next: {
    "damage %": 5,
    critChance: 1,
    "attackBonus %": 5
  }
}];
var _default = warrior;
exports["default"] = _default;