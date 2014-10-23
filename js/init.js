init = function(){
	hp[0] = maxhp, hp[1] = maxhp, mp[0] = maxmp, mp[1] = maxmp,
	
	buffs[0] = [],
	buffs[1] = [],

	debuffs[0] = [],
	debuffs[1] = [],

	dotDamageTime[0] = 0,
	dotDamageTime[1] = 0,

	hotHealTime[0] = 0,
	hotHealTime[1] = 0,

	manaRegenTimeout[0] = '',
	manaRegenTimeout[1] = '',

	spellOverTimeTimeout[0] = '',
	spellOverTimeTimeout[1] = '',

	lockedSpell[0] = [],
	lockedSpell[1] = [],

	globalColddown[0] = false,
	globalColddown[1] = false,

	targets[0] = 'player1',
	targets[1] = 'player2',

	player1.name = 'Player',
	player1.image = 'url(img/cast2.png)',

	player2.name = 'Dummy Bot',
	player2.image = 'url(img/Training_Dummy.png)',
	$('#player2 b').html( player2.name ),
	$('#player2 .character').css( 'background-image', player2.image ),
	
	$('.health-points').html( hp[0] ),
	$(".health-points").width( '100%' ),
	$('.mana-points').html(mp[0] ),
	$(".mana-points").width( '100%' ),
	
	$('#player1 b').html( player1.name ),
	$('#player1 .character').css( 'background-image', player1.image ),

	$('.spellbar').css({ opacity: 0.5 }),
	$('.spellbar').show(),
	$('.progress').show(),
    $(".casting .bar").width( '0%' ),
	$('.casting').hide(),
	$('#screen').css( 'background-image', battleGround ),
	
	$('.health-points').css( 'color', '#FFF' ),
	$('.character').css({ opacity: 1 }),
	$('#gameTime').html( '0' );

	$.getJSON("data/spell.json", function(data) {
		spellJSON = data;
	});

	// test_shadow_priest();
}