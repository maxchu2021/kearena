showKeyCode = function(e) {
	switch(e.keyCode)
	{
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
	case 27:    // Esc,
    case 191:   // /, ?
		$('#readme').toggle();
		break;
	case 76: // L
		$('#combat-log').toggle();
		break;
	case 82: // R
		location.reload();
		break;
	}
	
	// console.log(e.keyCode);
}

function usefloor(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

