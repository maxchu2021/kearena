getSpellIndexByName = function( name ) {
	var i = 0;
	for ( ;i < spellJSON.spells.length; i++ ) {
		if ( spellJSON.spells[i].codeName == name ) {
			return i;
		}
	}
}

addBuff = function( target, spell ) {
	var targetIndex = targets.indexOf( target );
	if ( buffs[ targetIndex ].indexOf( spell ) == -1 ) {
		buffs[ targetIndex ].push( spell );
		spellIndex = getSpellIndexByName( spell );
		image = spellJSON.spells[ spellIndex ].image;
		$('#' + target + ' .buffs').append( '<img class="' + spell + '" src="img/' + image + '">' );
	}
}

removeBuff = function( target, spell ) {
	var targetIndex = targets.indexOf( target );
	if ( buffs[ targetIndex ].indexOf( spell ) != -1 ) {
		buffs[ targetIndex ].splice(buffs.indexOf( spell ),1 );
		$('#' + target + ' .buffs .' + spell).remove();
	}
}

addDebuff = function( target, spell ) {
	var targetIndex = targets.indexOf( target );
	if ( debuffs[ targetIndex ].indexOf( spell ) == -1 ) {
		debuffs[ targetIndex ].push( spell );
		spellIndex = getSpellIndexByName( spell );
		image = spellJSON.spells[ spellIndex ].image;
		$('#' + target + ' .debuffs').append('<img class="' + spell + '" src="img/' + image + '">' );
	}
}

removeDebuff = function( target, spell ) {
	var targetIndex = targets.indexOf( target );
	if ( debuffs[ targetIndex ].indexOf( spell ) != -1 ) {
		debuffs[ targetIndex ].splice( buffs.indexOf( spell ),1 );
		$('#' + target + ' .debuffs .' + spell).remove();
	}
}

lockSpell = function( caster, spell ) {
	var casterIndex = targets.indexOf( caster );
	lockedSpell[ casterIndex ].push( spell );

	if ( globalColddown[ casterIndex ] === false ) {
		if ( $('#' + caster + ' #bar_' + spell).css("opacity") != "0.5" ) {
			$('#' + caster + ' #bar_' + spell).css("opacity","0.5");
		}
	}
}

unlockSpell = function( caster, spell ) {
	var casterIndex = targets.indexOf( caster );
	var spellIndex = lockedSpell[ casterIndex ].indexOf( spell );
	lockedSpell[ casterIndex ].splice( spellIndex, 1 );
	$('#' + caster + ' #bar_' + spell).css("opacity","1");
}

checkLockSpell = function( caster, spell ) {
	var casterIndex = targets.indexOf( caster );
	if ( typeof lockedSpell[ casterIndex ] != 'undefined' ) {
		return lockedSpell[ casterIndex ].indexOf( spell );
	}
}

lockAllSpell = function( caster ) {
	var casterIndex = targets.indexOf( caster );
	globalColddown[ casterIndex ] = true;
	$.each( lockedSpell[ casterIndex ], function( index, value ) {
		$('#' + caster + ' #bar_' + value).css("opacity","1");
	});	
	$('#' + caster + ' .spellbar').css("opacity","0.5");
}

unlockAllSpell = function( caster ) {
	var casterIndex = targets.indexOf( caster );
	if ( globalColddown[ casterIndex ] == false ) {
		return;
	}		
	globalColddown[ casterIndex ] = false;
	$('#' + caster + ' .spellbar').css("opacity","1");
	$.each( lockedSpell[ casterIndex ], function( index, value ) {
		$('#' + caster + ' #bar_' + value).css("opacity","0.5");
	});	
}

action = function( spell, caster, target ) {
	var 
		casterIndex = targets.indexOf( caster ),
		spellIndex = getSpellIndexByName( spell ),
        spellMana = spellJSON.spells[ spellIndex ].spellMana,
		tickTime = spellJSON.spells[ spellIndex ].tickTime,	
		colddown = spellJSON.spells[ spellIndex ].colddown,
		mana = mp[ casterIndex ];

	if ( !gameStart || checkDead() || mana < spellMana ) { 
		return;
	}

	// Global Colddown
	if ( globalColddown[ casterIndex ] == false && checkLockSpell( caster, spell ) == -1 ) {
		lockAllSpell( caster );
		setTimeout( "unlockAllSpell( '" + caster + "' );", 1000 );
	} else {
		return false;
	}
	
	// Lock Spell
	if ( checkLockSpell( caster, spell ) == -1 ) {
		lockSpell( caster, spell );
		setTimeout( "unlockSpell( '" + caster + "', '" + spell + "' );", colddown );
	} else {
		return false;
	}
	
	if ( tickTime == 0 ) {
		spellDirect( spell, caster, target );
	} else {
		spellOverTime( spell, caster, target );	
	}
	
	window.location.hash = "";
}

spellDirect = function( spell, caster, target ) {
	var 
		casterIndex = targets.indexOf( caster ),
		targetIndex = targets.indexOf( target ),
        spellIndex = getSpellIndexByName( spell ),
		name = spellJSON.spells[ spellIndex ].name,
		point = spellJSON.spells[ spellIndex ].point,
		spellMana = spellJSON.spells[ spellIndex ].spellMana,
		castingTime = spellJSON.spells[ spellIndex ].castingTime,        
		type = spellJSON.spells[ spellIndex ].type,
        health = parseInt( hp[ targetIndex ] ),
		mana = parseInt( mp[ casterIndex ] ),
        pointc = point; // For calculate
	
    if ( type == 'damage') {
        pointc = point * -1;	
    }
    
	mana = mana - spellMana;
	health = health + pointc;

	
    clearTimeout( casting[ casterIndex ] );
	$("#" + caster + " .casting .bar").width( "0%" );
    $("#" + caster + " .casting").hide();
    setTimeout("$('#" + caster + " .casting').show();$('#" + caster + " .casting .bar').width( '100%' );", 100);
    $("#" + caster + " .casting .bar").html( name );
    
	setTimeout( 
		"$('#" + target + " .character').fadeOut( 10 );" +
		"$('#" + target + " .character').fadeIn();", castingTime );

	updatePoint[ casterIndex ] = setTimeout( 
		"updateHP( '" + target + "', '" + health + "' );" +
		"updateScrollCombatText( '" + target + "', '" + point + "', '" + type + "' );" +
		"updateCombatLog( '" + spell + "', '" + caster + "', '" + target + "' );" +
		"updateMP( '" + caster + "', '" + mana + "' );", 
        castingTime
    );		
        
	casting[ casterIndex ] = setTimeout( 
		"$('#" + caster + " .casting .bar').width( '0%' );" +
		"$('#" + caster + " .casting').hide();", 
        castingTime
    );		
}

spellOverTime = function( spell, caster, target ) {
	if ( !gameStart || checkDead() ) return;

	var 
		casterIndex = targets.indexOf( caster ),
		targetIndex = targets.indexOf( target ),
        spellIndex = getSpellIndexByName( spell ),
		point = spellJSON.spells[ spellIndex ].point,
		spellMana = spellJSON.spells[ spellIndex ].spellMana,
		type = spellJSON.spells[ spellIndex ].type,
		tickTime = spellJSON.spells[ spellIndex ].tickTime,
        health = parseInt( hp[ targetIndex ] ),
		mana = parseInt( mp[ casterIndex ] ),
        pointc = point; // For calculate
	
	if ( type == 'damage' ) {
        pointc = point * -1;	

		if ( dotDamageTime[ targetIndex ] > 0 ) {		
			health = health + pointc;
			updateHP( target, health );
            updateScrollCombatText( target, point, type );
            updateCombatLog( spell, caster, target );
		} else {
			mana = mana - spellMana;
			updateMP( caster, mana );
		}	
		dotDamageTime[ targetIndex ]++;
		if ( dotDamageTime[ targetIndex ] <= tickTime ) {
			addDebuff( target, spell );
			spellOverTimeTimeout[ targetIndex ] = setTimeout( "spellOverTime('" + spell + "', '" +
				caster + "', '" +
				target + "')", 1000 );
		} else {
			removeDebuff( target, spell );
			dotDamageTime[ targetIndex ] = 0;
		}

		if ( dotDamageTime[ targetIndex ] >= tickTime - 3) {
			$('#' + target + ' .' + spell).fadeOut();
			$('#' + target + ' .' + spell).fadeIn();
		}
	} else {
		if ( hotHealTime[ targetIndex ] > 0 ) {		
			health = health + pointc;
			updateHP( target, health );
            updateScrollCombatText( target, point, type );
            updateCombatLog( spell, caster, target );            
		} else {
			mana = mana - spellMana;
			updateMP( caster, mana );
		}	
	
		hotHealTime[ targetIndex ]++;
		if ( hotHealTime[ targetIndex ] <= tickTime ) {
			addBuff( target, spell );
			spellOverTimeTimeout[ targetIndex ] = setTimeout( "spellOverTime('" + spell + "', '" +
				caster + "', '" +
				target + "')", 1000 );
		} else {
			removeBuff( target, spell );
			hotHealTime[ targetIndex ] = 0;
		}

		if ( hotHealTime[ targetIndex ] >= tickTime - 3) {
			$('#' + target + ' .' + spell).fadeOut();
			$('#' + target + ' .' + spell).fadeIn();
		}	
	}
}

updateHP = function( target, health ) {
	var targetIndex = targets.indexOf( target );

	if ( health > maxhp ) {
		health = maxhp;
	}

	if ( health <= 0 ) {
		dead( target );
	} else {	
		hp[ targetIndex ] = health;
		$('#' + target + ' .health-points').width( health + '%' );
		$('#' + target + ' .health-points').html( health );
	}
}

updateMP = function( target, mana ) {
	var targetIndex = targets.indexOf( target );

	mp[ targetIndex ] = mana;
	$('#' + target + ' .mana-points').width( mana + '%' );
	$('#' + target + ' .mana-points').html( mana );
}

updateScrollCombatText = function( target, point, type ) {
	return;
    var thisSct = sct;
    var color = '';
    
    if ( type == 'damage') {
        color = ' ' + type;
    } 
    
    $('#' + target + ' .scrolling-combat-text').append('<span class="sct_' + sct + color + '">' + point + '</span><br>');
    $('#' + target + ' .scrolling-combat-text').animate( 
        {
            "bottom": "+=3px",
        }, {
            duration: 500,
            complete: function() {
                $('#' + target + ' .scrolling-combat-text span.sct_' + thisSct).remove();
                $('#' + target + ' .scrolling-combat-text').css( "bottom", "180" );
            }
        } 
    );
    sct++;
}

updateCombatLog = function( spell, caster, target ) {
	var 
        spellIndex = getSpellIndexByName( spell ),
		name = spellJSON.spells[ spellIndex ].name,
		point = spellJSON.spells[ spellIndex ].point,
		type = spellJSON.spells[ spellIndex ].type;
        
    if ( type == 'damage' )
        type = 'hits';
    else
        type = 'heals';
    
    $('#combat-log').append( $('#' + caster + ' b').html() + "'s " + name + ' ' + type + ' ' + $('#' + target + ' b').html() + ' for ' + point + '<br>');
    $("#combat-log").scrollTop($("#combat-log")[0].scrollHeight);
}