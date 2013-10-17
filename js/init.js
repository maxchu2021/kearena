window.onload = function(){
	init();
	$.getJSON("data/spell.json", function(data) {
		spellJSON = data;
	});	
}

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

    if ( 0 ) {
		battleGround = battleGround2;
		$('#screen').css( 'background-image', battleGround );
	
        newbot = true;
        player2.name = 'Undead',
        player2.image = 'url(img/shadow_priest_changes.png)',
        $('#player2 b').html( player2.name ),
        $('#player2 .character').css( 'background-image', player2.image );  
        $('#player2 .character').css( 'width', '40%' );  
        $('#player2 .character').css({ opacity: 1 });
    }	
}

start = function(){
	if ( $('#counting').html() || gameStart ) {
		return;
	}
	init();
	
	$('#menu').hide();
	$('#counting').html( '3' );
	setTimeout( "$('#counting').html('2')", 1000 );
	setTimeout( "$('#counting').html('1')", 2000 );
	setTimeout( "$('#counting').html('');gameStart = 1;$('.spellbar').css({ opacity: 1 });", 3000 ); // Game start
	setTimeout( 'gameTime();', 4000 );
	setTimeout( 'manaRegen("player1");manaRegen("player2");', 4000 );
    if ( newbot === true ) {
        player2.name = 'Undead',
        player2.image = 'url(img/shadow_priest_changes.png)',
        $('#player2 b').html( player2.name ),
        $('#player2 .character').css( 'background-image', player2.image );  
        // $('#player2 .character').css( 'background-size', '140px' );  
        // $('#player2 .character').css( 'width', '140px' );  
        // $('#player2 .character').css( 'height', '140px' );
		// $('#screen').css( 'background-image', battleGround2 ),
        
        setTimeout( 'undead()', 4500 );
    } else {
        setTimeout( 'dummybot()', 5000 );
    }
}

manaRegen = function( target ){
	var 
		mana = parseInt( mp[ targets.indexOf( target ) ] ),
		targetIndex = targets.indexOf(target);
		
	if ( mana < maxmp ) {
		mana = mana + regen;
	}
	
	if ( mana > maxmp ) {
		mana = maxmp;
	}
	
	mp[ targetIndex ] = mana;
	
	$('#' + target + ' .mana-points').width( mana + '%' );
	$('#' + target + ' .mana-points').html( mana );
	
	manaRegenTimeout[ targets.indexOf( target ) ] = setTimeout( "manaRegen( '" + target + "' )", manaRegenTime );
}

dead = function(target){
	var targetIndex = targets.indexOf( target );
	
    hp[ targetIndex ] = 0,
	gameStart = 0,
    sct = 1;
	
	// Clear Timeout
	clearTimeout( manaRegenTimeout[ 0 ] ),
	clearTimeout( manaRegenTimeout[ 1 ] ),
    clearTimeout( spellOverTimeTimeout[ 0 ] ),
    clearTimeout( spellOverTimeTimeout[ 1 ] ),
	clearTimeout( casting[ 0 ] ),
	clearTimeout( casting[ 1 ] ),
	clearTimeout( botTimeout ),
	clearTimeout( updatePoint[ 0 ] ),
	clearTimeout( updatePoint[ 1 ] ),
	
	// Update UI
	$('#' + target + ' .health-points').html( 'Dead' ),
	$('#' + target + ' .health-points').width( '0%' ),
	$('#' + target + ' .health-points').css( 'color', '#000' ),
	$('#' + target + ' .character').css({ opacity: 0.5 }),
	$('.casting').hide(),
	$('.buffs img').remove(),
	$('.debuffs img').remove(),
	$('#menu').show();
	
	// Record
	if ( target == 'player1' ) {
		$('#record .player2').html( parseInt( $('#record .player2').html() ) + 1 );
	} else {
		$('#record .player1').html( parseInt( $('#record .player1').html() ) + 1 );
	}
    
    // Undead
    if ( $('#record .player1').html() >= 1 ) {
		battleGround = battleGround2;
		$('#screen').css( 'background-image', battleGround );
	
        newbot = true;
        player2.name = 'Undead',
        player2.image = 'url(img/shadow_priest_changes.png)',
        $('#player2 b').html( player2.name ),
        $('#player2 .character').css( 'background-image', player2.image );  
        $('#player2 .character').css( 'width', '40%' );  
        $('#player2 .character').css({ opacity: 1 });
    }
    
    setTimeout("$('#combat-log').append( $('#" + target + " b').html() + ' dies.<br>');$('#combat-log').scrollTop($('#combat-log')[0].scrollHeight);", 2000);    
}

checkDead = function(){
	if(hp[0] == 0 || hp[1] == 0)
		return true;
	return false;
}

gameTime = function(){
	var t = parseInt( $('#gameTime').html() );
	t = t + 1;
	$('#gameTime').html( t );
	
	if ( gameStart ) {
		gameTimeTimeOut = setTimeout( "gameTime()", 1000);
	}
}