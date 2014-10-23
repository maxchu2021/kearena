dummybot = function() {
    if (!gameStart) {
        return;
    }
}

undead = function() {
    if (!gameStart) {
        return;
    }

    var
        // Random action
        rand = usefloor(1, 10),

        // Bot action speed
        botSpeed = 3000,

        // For Action()
        spell, caster = 'player2',
        target = 'player1';

    if (rand < 4) {
        if (checkLockSpell(caster, 'shadowwordpain') == -1) {
            spell = 'shadowwordpain';
        } else {
            spell = 'mindblast';
        }
    } else {
        if (rand > 7) {
            if (hp[1] <= 40) {
                spell = 'flashheal', target = caster;
            } else if (hp[1] <= 80) {
                botSpeed = 2000;

                if (!checkLockSpell('renew')) {
                    spell = 'renew', target = caster;
                } else {
                    spell = 'flashheal', target = caster;
                }
            } else {
                if (checkLockSpell(caster, 'shadowwordpain') == -1) {
                    spell = 'shadowwordpain';
                } else {
                    spell = 'mindblast';
                }
            }
        } else {
            if (checkLockSpell(caster, 'shadowwordpain') == -1) {
                spell = 'shadowwordpain';
            } else {
                spell = 'mindblast';
            }
        }
    }

    if (hp[1] <= 50) {
        botSpeed = 2000;
    }

    action(spell, caster, target);

    botTimeout = setTimeout('undead2()', botSpeed);

    if (debug) {
        console.log('botSpeed: ' + botSpeed + ', rand: ' + rand);
    }
}