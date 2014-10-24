function create_readme(basepath) {
    var base = (basepath == 'null') ? '' : basepath;

    document.write(
        '<h1>Kearena</h1>' +
        
        '<hr style="border-bottom:1px solid #333">' +
        '<p>A web game inspired by World of Warcraft. I\'m addict to the arena and love to play shadow priest. I would like to enjoy sometime when the server down or on my mobile phone. So I develop this game. Enjoy it.</p>' +
        '<p>Feel free to send me feedback or fork this. You can leave message on issues or contact me via my email.</p>' +

        '<h3>Readme</h3>' +
        '<b>Key / Function</b><br>' +
        '1 - Shadow Word: Pain<br>' +
        '2 - Mind Blast<br>' +
        '3 - Renew<br>' +
        '4 - Flash Heal<br>' +
        'Enter - Start<br>' +
        'L - Log<br>' +
        'R - Reload<br>' +
        '/ or ? - Help<br>' +
        '<br>' +
        
        '<b>Spell</b><br>' +
        '<img src="img/spell_shadow_shadowwordpain.jpg"> Shadow Word: 8 mana, Pain<br>damage 3 health points per second, tick 7 times.<br>' +
        '<img src="img/spell_shadow_unholyfrenzy.jpg"> Mind Blast<br>10 mana, direct damage 18 health points. Colddown 2 sec.<br>' +
        '<img src="img/spell_holy_renew.jpg"> Renew<br>7 mana, heal 2 health points per second, tick 6 times.<br>' +
        '<img src="img/spell_holy_flashheal.jpg"> Flash Heal<br>9 mana, heal 12 health points.<br>' +
        '<br>' +
        '<b>Mana regeneration</b><br>' +
        'Recovery 10 mana points every 5 sec.<br>' +

        '<hr style="border-bottom:1px solid #333">2014 KeaNy Chu <a href="http://keanychu.com">http://keanychu.com</a><br>');

}