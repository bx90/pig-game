var scores, currentScore, activePlayer, isGameStillGoing;

initialization();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (isGameStillGoing) {
        var number = Math.floor(Math.random() * 6) + 1;
        var diceDom = document.querySelector('.dice');
        diceDom.style = 'block';
        diceDom.src = 'resources/images/dice-' + number + '.png';

        // Sum current scr.
        if (number !== 1) {
            currentScore += number;
            document.querySelector('#current-' + activePlayer).textContent = currentScore;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (isGameStillGoing) {
        scores[activePlayer] += currentScore;
        sumScore('score-' + activePlayer, scores[activePlayer]);
        if (scores[activePlayer] >= 15) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            isGameStillGoing = false;
        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', function() {
    initialization();
});

function initialization() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isGameStillGoing = true;

    hideTheDice();
    initializePlayerName();
    reset();
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentScore = 0;
    // hideTheDice();
    resetCurrentScore();
    switchPanel('.player-0-panel');
    switchPanel('.player-1-panel');
}



function reset() {
    resetCurrentScore();
    resetOriginScore();
    resetPlayerPanel();
}

function hideTheDice() {
    document.querySelector('.dice').style.display = 'none';
}

function resetOriginScore() {
    var resetValue = 0;
    document.querySelector('#score-0').textContent = resetValue;
    document.querySelector('#score-1').textContent = resetValue;
}

function resetCurrentScore() {
    var resetValue = 0;
    document.querySelector('#current-0').textContent = resetValue;
    document.querySelector('#current-1').textContent = resetValue;
}

function switchPanel(playerId) {
    document.querySelector(playerId).classList.toggle('active');
}
function sumScore(playerId, value) {
    document.getElementById(playerId).textContent = value;
}
function resetPlayerPanel() {
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function initializePlayerName() {
    var p1 = window.prompt('Player 1\'s name', 'P1');
    var p2 = window.prompt('Player 2\'s name', 'P2');

    document.getElementById('name-0').textContent = p1;
    document.getElementById('name-1').textContent = p2;
}
