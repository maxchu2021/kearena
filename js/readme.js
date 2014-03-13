function create_readme(basepath)
{
	var base = (basepath == 'null') ? '' : basepath;

	document.write(
		'<h1>Kearena</h1>' +
		'<a href="#en" style="float:right; margin-top:-40px;">English</a><br>' +

		'遊戲開發中，歡迎提供回饋和想法!<br>' +

		'<h3>說明</h3>' +
		'<b>按鍵 / 法術</b><br>' +
		'1 - 暗言術: 痛<br>' +
		'2 - 心靈震爆<br>' +
		'3 - 恢復<br>' +
		'4 - 快速治療<br>' +
		'* 支援手機或滑鼠點選法術圖示。<br>' +
		'<br>' +
		'<b>法術</b><br>' +
		'<img src="img/spell_shadow_shadowwordpain.jpg"> 暗言術: 痛<br>法力值8，7秒內每秒傷害3點生命值。<br>' +
		'<img src="img/spell_shadow_unholyfrenzy.jpg"> 心靈震爆<br>法力值10，直接傷害18點生命值，冷卻時間3秒。<br>' +
		'<img src="img/spell_holy_renew.jpg"> 恢復<br>法力值7，6秒內每秒治療2點生命值。<br>' +
		'<img src="img/spell_holy_flashheal.jpg"> 快速治療<br>法力值9，治療12點生命值。<br>' +
		'<br>' +
		'<b>法力恢復</b><br>' +
		'每5秒鐘恢復10點法力。<br>' +
		'<br><a name="en"></a>' +
				
		'<hr style="border-bottom:1px solid #333">This game still under development. Feel free to give feedback and idea!<br>' +
		
		'<h3>Readme</h3>' +
		'<b>Key / Spell</b><br>' +
		'1 - Shadow Word: Pain<br>' +
		'2 - Mind Blast<br>' +
		'3 - Renew<br>' +
		'4 - Flash Heal<br>' +
		'* support mobile or mouse for clicking on spell icons.<br>' +
		'<br>' +
		'<b>Spell</b><br>' +
		'<img src="img/spell_shadow_shadowwordpain.jpg"> Shadow Word: 8 mana, Pain<br>damage 3 health points per second, tick 7 times.<br>' +
		'<img src="img/spell_shadow_unholyfrenzy.jpg"> Mind Blast<br>10 mana, direct damage 18 health points. Colddown 2 sec.<br>' +
		'<img src="img/spell_holy_renew.jpg"> Renew<br>7 mana, heal 2 health points per second, tick 6 times.<br>' +
		'<img src="img/spell_holy_flashheal.jpg"> Flash Heal<br>9 mana, heal 12 health points.<br>' +
		'<br>' +
		'<b>Mana regeneration</b><br>' +
		'Recovery 10 mana points every 5 sec.<br>' +

		'<hr style="border-bottom:1px solid #333">2013 KeaNy Chu <a href="http://keanychu.info">http://keanychu.info</a><br>');

}