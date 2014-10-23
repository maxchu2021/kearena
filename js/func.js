showKeyCode = function(e) {
	switch(e.keyCode){
		case 49: // 1
			action('shadowwordpain', 'player1', 'player2');
			break;

		case 50: // 2
			action('mindblast', 'player1', 'player2');
			break;

		case 51: // 3
			action('renew', 'player1', 'player1');
			break;

		case 52: // 4
			action('flashheal', 'player1', 'player1');
			break;

		case 13: // Enter
			start();
			break;

		case 27: // Esc,
	    case 191: // /, ?
			$('#readme').toggle();
			break;

		case 76: // L
			$('#combat-log').toggle();
			break;

		case 82: // R
			location.reload();
			break;
	}
	
	if ( debug ) {
		console.log(e.keyCode);
	}
}

usefloor = function(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

activeBot = function(){
    if ( newbot === true ) {
        player2.name = 'Undead 2',
        player2.image = 'url(img/shadow_priest_changes.png)',
        $('#player2 b').html( player2.name ),
        $('#player2 .character').css( 'background-image', player2.image );  
        
        setTimeout( 'undead2()', 4500 );
    } else {
        setTimeout( 'dummybot2()', 5000 );
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

start = function(){
	if ( $('#counting').html() || gameStart ) {
		return;
	}

	init();
	
	$('#menu').hide();
	$('#counting').html('3').css('font-size', '300%');

	setTimeout( "$('#counting').html('2').css('font-size', '400%');", 1000 );
	setTimeout( "$('#counting').html('1').css('font-size', '500%');", 2000 );
	setTimeout( "$('#counting').html('Fight!');", 3000 );
	setTimeout( "$('#counting').html('');", 3500 );
	setTimeout( "gameStart = 1;", 3000 ); 
	setTimeout( "$('.spellbar').css({ opacity: 1 });", 3000 ); 
	setTimeout( 'gameTime();', 4000 );
	setTimeout( 'manaRegen("player1");manaRegen("player2");', 4000 );

	activeBot();
}

clearAllTimeOut = function(){
	clearTimeout( manaRegenTimeout[ 0 ] );
	clearTimeout( manaRegenTimeout[ 1 ] );
    clearTimeout( spellOverTimeTimeout[ 0 ] );
    clearTimeout( spellOverTimeTimeout[ 1 ] );
	clearTimeout( casting[ 0 ] );
	clearTimeout( casting[ 1 ] );
	clearTimeout( botTimeout );
	clearTimeout( updatePoint[ 0 ] );
	clearTimeout( updatePoint[ 1 ] );
}

updateRecord = function(target){
	player = ( target == 'player1' ) ? 'player2' : 'player1'
	$('#record .' + player).html( parseInt( $('#record .' + player).html() ) + 1 );
}

dead = function(target){
	var targetIndex = targets.indexOf( target );
	
    hp[ targetIndex ] = 0,
	gameStart = 0,
    sct = 1;

	// Update UI
	$('#' + target + ' .health-points').html( 'Dead' ).width( '0%' ).css( 'color', '#000' ),
	$('#' + target + ' .character').css({ opacity: 0.5 }),
	$('.casting').hide(),
	$('.buffs img').remove(),
	$('.debuffs img').remove(),
	$('#menu').show();
	
	clearAllTimeOut();
	updateRecord(target);
    
    // Undead
    if ( $('#record .player1').html() >= 1 ) {
		battleGround = battleGround2;
		$('#screen').css( 'background-image', battleGround );
	
        test_shadow_priest();
    }
    
    setTimeout(
    	"$('#combat-log').append( $('#" + target + " b').html() + ' dies.<br>').scrollTop($('#combat-log')[0].scrollHeight);",
		2000
	);
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

test_shadow_priest = function(){
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