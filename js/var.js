/**
 * 2013 Edit by KeaNy keanyc@gmail.com
 * Arena
 * Last updated: 2013-03-30
 * 
**/
var 
	// Max health points and Max mana points
	maxhp = maxmp = 100,
	
	// Mana regen
	regen = 10,
	
	// Mana regen time
	manaRegenTime = 5000,
	
	// Set it 1 when game start
	gameStart = 0,
	
	// Players
	player1 = {}, player2 = {},
	
	// Buffs
	buffs = [], debuffs = [],
	
	// DOT/HOT time counts
	dotDamageTime = [], hotHealTime = [],
	
	// Mana regen timeout
	manaRegenTimeout = [],
	
	// Spell over time timeout
	spellOverTimeTimeout = [],
	
	// Lock spells when spell on colddown
	lockedSpell = [],
	
	// Targets
	targets = [],
	
	// Health points / Mana points
	hp = [], mp = [],
	
	// Set the backgroud image
	battleGround = 'url(img/arena/raiddummy.jpg)',
	battleGround2 = 'url(img/arena/arena.jpg)',
	
	// Spells JSON file
	spellJSON,
	
	// Bot timeout
	botTimeout,
	
	// Casting
	casting = [],
    
    // Update point
    updatePoint = [],
	
	// Global Colddown
	globalColddown = [],
    
    // testing new bot
    newbot = false,
    
    // Scrolling Combat Text
    sct = 1,
	
	// Debug mode
	debug = false;