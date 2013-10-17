/*
Edit by KeaNy
keanyc@gmail.com
*/
var maxhp = maxmp = 100;
var regen = 5;
var manaRegenTime = 3000;
var gamestart = 0;
var player1 = new Object();
var player2 = new Object();

var buffs = new Array();
buffs[0] = new Array();
buffs[1] = new Array();

var deBuffs = new Array();
deBuffs[0] = new Array();
deBuffs[1] = new Array();

var dotDamageTime = new Array();
dotDamageTime[0] = 0;
dotDamageTime[1] = 0;

var hotHealTime = new Array();
hotHealTime[0] = 0;
hotHealTime[1] = 0;

var manaregenTimeout = new Array();
manaregenTimeout[0] = '';
manaregenTimeout[1] = '';

var lockedSpell = new Array();
lockedSpell[0] = new Array();
lockedSpell[1] = new Array();

var targets = new Array();
targets[0] = 'player1';
targets[1] = 'player2';

var hp = new Array();
hp[0] = 100;
hp[1] = 100;

var mp = new Array();
mp[0] = 100;
mp[1] = 100;

player1.name = 'Player';
player1.image = 'url(img/cast2.jpg)';

player2.name = 'Dummy Bot';
player2.image = 'url(img/Training_Dummy.jpg)';

var battleground = 'url(img/raiddummy.jpg)';

var spellsJSON;

window.onload = function(){
	// init();
	$.getJSON("spells.json", function(data) {
		spellsJSON = data;
	});	
}

getSpellIndexByName = function(name){
	for(i=0;i < spellsJSON.spells.length;i++){
		if(spellsJSON.spells[i].name == name) return i;
	}
}

init = function(){
	hp[0] = maxhp;
	hp[1] = maxhp;
	mp[0] = maxmp;
	mp[1] = maxmp;
	
	$('.healthpoints').html(hp[0]);
	$(".healthpoints").width(hp[0] + '%');
	$('.manapoints').html(mp[0]);
	$(".manapoints").width(mp[0] + '%');
	
	$('#player1 b').html(player1.name);
	$('#player1 .character').css('background-image', player1.image);	

	$('#player2 b').html(player2.name);
	$('#player2 .character').css('background-image', player2.image);	
	
	$('.spellbar').show();
	$('.progress').show();
	$('.casting').hide();
	$('#screen').css('background-image', battleground);	
	$('.healthpoints').css('color', '#FFF');
	$('.character').css({ opacity: 1 });	
}

start = function(){
	if(gamestart) return;
	gamestart = 1;
	init();
	$('#menu').hide();
	$('#counting').html('3');
	setTimeout("$('#counting').html('2')",1000);
	setTimeout("$('#counting').html('1')",2000);
	setTimeout("$('#counting').html('')",3000);
	setTimeout('bot()',5000);
	manaregen('player1');
	manaregen('player2');
}

bot = function(){
	var rand = usefloor(1,4);
	var botSpeed = 2000;
	
	if(rand==2)
		action('shadowwordpain', 'player2', 'player1');
	else
		action('mindblast', 'player2', 'player1');
	
	if(hp[1]<70)
		action('renew', 'player2', 'player2');
	else if(hp[1]<30)
		action('flashheal', 'player2', 'player2');
	
	if(hp[1]<40)
		botSpeed = 2000;
	
	setTimeout('bot()',botSpeed);
}

addBuff = function(target, spell){
	var targetIndex = targets.indexOf(target);
	if(buffs[targetIndex].indexOf(spell) == -1){
		buffs[targetIndex].push(spell);
		spellIndex = getSpellIndexByName(spell);
		image = spellsJSON.spells[spellIndex].image;
		$('#' + target + ' .buffs').append('<img id="' + spell + '" src="img/' + image + '">');
	}
}

removeBuff = function(target, spell){
	var targetIndex = targets.indexOf(target);
	if(buffs[targetIndex].indexOf(spell) != -1){
		buffs[targetIndex].splice(buffs.indexOf(spell),1);
		$('#' + target + ' .buffs #' + spell).remove();
	}
}

addDeBuff = function(target, spell){
	var targetIndex = targets.indexOf(target);
	if(deBuffs[targetIndex].indexOf(spell) == -1){
		deBuffs[targetIndex].push(spell);
		spellIndex = getSpellIndexByName(spell);
		image = spellsJSON.spells[spellIndex].image;
		$('#' + target + ' .deBuffs').append('<img id="' + spell + '" src="img/' + image + '">');
	}
}

removeDeBuff = function(target, spell){
	var targetIndex = targets.indexOf(target);
	if(deBuffs[targetIndex].indexOf(spell) != -1){
		deBuffs[targetIndex].splice(buffs.indexOf(spell),1);
		$('#' + target + ' .deBuffs #' + spell).remove();
	}
}

manaregen = function(target){
	mana = mp[targets.indexOf(target)];
	// console.log('manaregen');
	// console.log('target: ' + target);
	// console.log('mana: ' + mana);
	if(mana < maxmp)
		mana = mana + regen;
	if(mana > maxmp)
		mana = maxmp;
	mp[targets.indexOf(target)] = mana;
	$('#' + target + ' .manapoints').width(mana + '%');
	$('#' + target + ' .manapoints').html(mana);
	// console.log('mana: ' + mana);
	manaregenTimeout[targets.indexOf(target)] = setTimeout("manaregen('" + target + "')", manaRegenTime);
}

lockSpell = function(caster, spell){
	lockedSpell[targets.indexOf(caster)].push(spell);
	$('#' + caster + ' #bar_' + spell).fadeTo('fast',0.5);
}

unlockSpell = function(caster, spell){
	lockedSpell[targets.indexOf(caster)].splice(lockedSpell[targets.indexOf(caster)].indexOf(spell),1);
	$('#' + caster + ' #bar_' + spell).fadeTo('fast',1);
}

checkLockSpell = function(caster, spell){
	return lockedSpell[targets.indexOf(caster)].indexOf(spell);
}

dead = function(target){
	// console.log(target + ' is dead.');
	// console.log('target: ' + target);
	// console.log('targets.indexOf(target): ' + targets.indexOf(target));
	hp[targets.indexOf(target)] = 0;
	clearTimeout(manaregenTimeout[targets.indexOf(target)]);
	if(typeof spellovertimeTimeout != 'undefined') clearTimeout(spellovertimeTimeout);
	$('#' + target + ' .healthpoints').html('Dead');
	$('#' + target + ' .healthpoints').width('0%');
	$('#' + target + ' .healthpoints').css('color', '#000');
	$('#' + target + ' .character').css({ opacity: 0.5 });
	$('#' + target + ' .casting').hide();
	$('.buffs img').remove();
	$('.deBuffs img').remove();
	$('#menu').show();	
	gamestart = 0;
}

checkDead = function(){
	if(hp[0] == 0 || hp[1] == 0)
		return true;
	return false;
}

spellovertime = function(spell, target, type, point, ticktime){
	if(!gamestart || checkDead()) return;

	var pts = parseInt(point);
	var targetIndex = targets.indexOf(target);
	
	health = hp[targetIndex];
	health = health + pts;
	if(health > maxhp) health = maxhp;
	hp[targetIndex] = health;
	if(health <= 0){
		health = 0;
		hp[targetIndex] = health;
		dead(target);
		return;
	}
	
	$("#" + target + " .healthpoints").width(health + '%');
	$("#" + target + " .healthpoints").html(health);

	if(type == 'damage'){
		dotDamageTime[targetIndex]++;
		if (dotDamageTime[targetIndex] < ticktime){
			addDeBuff(target, spell);
			spellovertimeTimeout = setTimeout("spellovertime('" + spell + "', '" + target + "', '" + type + "', '" + point + "', '" + ticktime + "')",1000);
		} else {
			removeDeBuff(target, spell);
			dotDamageTime[targetIndex] = 0;
		}

		if (dotDamageTime[targetIndex] >= ticktime - 3) {
			$('#' + spell).fadeOut();
			$('#' + spell).fadeIn();
		}
	} else {
		hotHealTime[targetIndex]++;
		if (hotHealTime[targetIndex] < ticktime){
			addBuff(target, spell);
			spellovertimeTimeout = setTimeout("spellovertime('" + spell + "', '" + target + "', '" + type + "', '" + point + "', '" + ticktime + "')",1000);
		} else {
			removeBuff(target, spell);
			hotHealTime[targetIndex] = 0;
		}

		if (hotHealTime[targetIndex] >= ticktime - 3) {
			$('#' + spell).fadeOut();
			$('#' + spell).fadeIn();
		}	
	}
	// console.log(target + ' getting ' + spell + ' for ' + point + ' points.');
}

action = function(spell, caster, target){
	var casterIndex = targets.indexOf(caster);
	var targetIndex = targets.indexOf(target);
	var spellIndex = getSpellIndexByName(spell);
	var type = spellsJSON.spells[spellIndex].type;
	var point = spellsJSON.spells[spellIndex].point;
	var ticktime = spellsJSON.spells[spellIndex].ticktime;
	var spellmana = spellsJSON.spells[spellIndex].spellmana;
	var colddown = spellsJSON.spells[spellIndex].colddown;
	var health = hp[targetIndex];
	var mana = mp[casterIndex];

	if(!gamestart
		|| checkDead()
		|| mana < spellmana){ 
		return;
	}

	if(type == 'damage') point = point * -1;

	// Lock Spell
	if(checkLockSpell(caster, spell) == -1){
		lockSpell(caster, spell);
		setTimeout("unlockSpell('" + caster + "', '" + spell + "');", colddown);
	} else {
		return;
	}	

	// Mana
	if(dotDamageTime[targetIndex] == 0 || hotHealTime[targetIndex] == 0 || ticktime == 0){
		mana = mana - spellmana;
		mp[casterIndex] = mana;
		if(mana < 0){
			mana = 0;
			mp[casterIndex] = mana;
			return;
		}
		if(ticktime > 0){
			$(caster + " .manapoints").width(mana + '%');
			$(caster + " .manapoints").html(mana);
		}
	}
	
	// Health	
	health = health + point;
	if(health > maxhp) health = maxhp;
	hp[targets.indexOf(target)] = health;
	
	// console.log(caster + ' ' + spell + ' ' + target + ' for ' + point + ' points.');
	
	if(health <= 0){
		dead(target);
		return;
	}
	
	if(ticktime == 0){
		$("#" + caster + " .casting").show();
		$("#" + caster + " .casting .bar").width('30%');
		setTimeout("$('#" + caster + " .manapoints').width('" + mana + "%');$('#" + caster + " .manapoints').html(" + mana + ");$('#" + target + " .healthpoints').width(" + health + "+'%');$('#" + target + " .healthpoints').html(" + health + ");$('#" + caster + " .casting .bar').width('100%');$('#" + target + " .character').fadeOut(10);$('#" + target + " .character').fadeIn();", 1000);

		setTimeout("$('#" + caster + " .casting .bar').width('0%');$('#" + caster + " .casting').hide();", 1500);
	} else {
		$("#" + target + " .healthpoints").width(health + '%');
		$("#" + target + " .healthpoints").html(health);

		if(type == 'damage'){
			dotDamageTime[targetIndex]++;
			if (dotDamageTime[targetIndex] < ticktime){
				addDeBuff(target, spell);
				setTimeout("spellovertime('" + spell + "', '" + target + "', '" + type + "', '" + point + "', '" + ticktime + "')",1000);
			} else {
				removeDeBuff(target, spell);
				dotDamageTime[targetIndex] = 0;
			}

			if (dotDamageTime[targetIndex] >= ticktime - 3) {
				$('#' + spell).fadeOut();
				$('#' + spell).fadeIn();
			}
		} else {
			hotHealTime[targetIndex]++;
			if (hotHealTime[targetIndex] < ticktime){
				addBuff(target, spell);
				setTimeout("spellovertime('" + spell + "', '" + target + "', '" + type + "', '" + point + "', '" + ticktime + "')",1000);
			} else {
				removeBuff(target, spell);
				hotHealTime[targetIndex] = 0;
			}

			if (hotHealTime[targetIndex] >= ticktime - 3) {
				$('#' + spell).fadeOut();
				$('#' + spell).fadeIn();
			}	
		}		
	}
	
	window.location.hash="";
}