/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score , roundScore, activePlayer, gamePlaying, maxScore;

init();

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var dicePrev = -1; //intialisation to store previous roll point of dice

document.querySelector('.btn-roll').addEventListener('click', function() {

   if(gamePlaying) {

      //rolled/random number
      var dice0 = Math.floor(Math.random() * 6) + 1;
      var dice1 = Math.floor(Math.random() * 6) + 1;
      //console.log(dice0 + ' ' + dice1);


      // Logic if 2 6's occur continuously

      // if(dicePrev === -1 && dice === 6) {
      //    dicePrev = dice; //store in previous value only if dice is 6 and previous value is not already assigned
      // }else {
      //    if(dice === dicePrev && dice === 6) { // compare previous value and new dice value if === 6, do all score 0 and nextplayer
      //       scores[activePlayer] = 0;
      //       updateUI()
      //       nextPlayer();
      //       exit();
      //    }else {
      //       dicePrev = dice;
      //    }
      // }

      //6's on both the dice
      if(dice0 === dice1 && dice0 === 6) {
         scores[activePlayer] = 0;
         updateUI()
         nextPlayer();
      }else {

         //display result
         var diceDOM0 = document.querySelector('#dice-0');
         diceDOM0.style.display = 'block';
         diceDOM0.src = "dice-" + dice0 + ".png";

         var diceDOM1 = document.querySelector('#dice-1');
         diceDOM1.style.display = 'block';
         diceDOM1.src = "dice-" + dice1 + ".png";

         //update the score if the random/rolled number is not 1
         if(dice0 !== 1 && dice1 !== 1) {
            //add score
            roundScore += dice0 + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
         }else {
            //next player
            nextPlayer();
         }
      }

   }

});


document.querySelector('.btn-hold').addEventListener('click', function() {

   if(gamePlaying) {
      //update the users global score, add current score to global score
      scores[activePlayer] += roundScore;

      //update UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      //check if player won the game
      if(scores[activePlayer] >= maxScore) {
         document.querySelector('#name-' + activePlayer).textContent = "Winner!";
         document.querySelector('#dice-0').style.display = 'none';
         document.querySelector('#dice-1').style.display = 'none';
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
         gamePlaying = false;
      }else {
         //change player
         nextPlayer();
      }
   }

});


document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-score').addEventListener('click', function() {
   maxScore = document.querySelector('.input').value;
   if(maxScore === '') {
      document.querySelector('.input').placeholder = "Default 100";
      document.querySelector('.input').classList.add('placeholder');
   }else if(maxScore > 0){
      document.querySelector('.input').value = '';
      document.querySelector('.input').placeholder = "Current winning score " + maxScore;
   }
});

function nextPlayer() {
   activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
   roundScore = 0;
   dicePrev = -1;

   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';

   //document.querySelector('.player-0-panel').classList.remove('active');
   //document.querySelector('.player-1-panel').classList.add('active');

   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');

   document.querySelector('#dice-0').style.display = 'none';
   document.querySelector('#dice-1').style.display = 'none';
}


function init() {
   scores = [0, 0];
   roundScore = 0;
   activePlayer = 0;
   gamePlaying = true;
   maxScore = 100;

   document.querySelector('#dice-0').style.display = 'none';
   document.querySelector('#dice-1').style.display = 'none';

   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';
   document.getElementById('name-0').textContent = "Player 1";
   document.getElementById('name-1').textContent = "Player 2";
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');
   document.querySelector('.input').placeholder = "Enter winning score. Default 100";
}


function updateUI() {
   document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
   document.getElementById('current-' + activePlayer).textContent = roundScore;
}
