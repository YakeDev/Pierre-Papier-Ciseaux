/**
 * Project by YakeDev
 *
 */

//Object begin
let objectBegin = document.querySelectorAll(".object-begin");

//Audio
const audio = document.getElementById("audio");
const audioWin = document.getElementById("audio-win");
const audioFireWork = document.getElementById("audio-firework");
const audioLose = document.getElementById("audio-lose");

//score
let rulerText = document.querySelector(".ruler-text");
let humanScore = document.getElementById("human-score");
let computerScore = document.getElementById("computer-score");
let hScore = 0;
let cScore = 0;

//Buttons
let newGame = document.querySelector(".btn-new-game");
let resetGame = document.querySelector(".btn-cancel");

//human selection
let humanSelection1 = document.querySelector(".human-selection-1");
let humanSelection2 = document.querySelector(".human-selection-2");
let humanSelection3 = document.querySelector(".human-selection-3");

//images links
const imgLink =
  "https://raw.githubusercontent.com/YakeDev/Pierre-Papier-Ciseaux/main/img/";

//choice
let humanChoiceElement = document.querySelector("#human-choice-object");
let computerChoiceElement = document.querySelector("#computer-choice-object");
humanChoiceElement.className = "object-begin";
computerChoiceElement.className = "object-begin";

//Round
let gameRound = document.getElementById("game-round");
let compteurRound = 0;
gameRound.innerHTML = `${compteurRound}/5`;

let humanSelection = 0;
let computerChoice = 0;
let humanChoice;

//Object begin
function objectBeginOpacity() {
  humanChoiceElement.className = "object-begin";
  computerChoiceElement.className = "object-begin";
}

//game result
function win() {
  // console.log(`Felicitation, vous avez gagné 🏆🏆 avec un score de `);
  rulerText.innerHTML = "Congratulations, you've won 🏆";
  rulerText.className = "winMatch";
  compteurRound = 0;
  hScore = 0;
  cScore = 0;

  objectBeginOpacity();

  firework();
  audioFireWork.play();
  audioWin.play();
}

function tie() {
  // console.log("Match Null 🤪🤪");
  rulerText.innerHTML = "Woow!! Tie score 🤪🤪";
  rulerText.className = "tieMatch";
  compteurRound = 0;
  hScore = 0;
  cScore = 0;

  objectBeginOpacity();
}

function lose() {
  compteurRound = 0;
  hScore = 0;
  cScore = 0;
  rulerText.innerHTML = "Try again, you lost 😫😫😫";
  rulerText.className = "loseMatch";

  objectBeginOpacity();
  audioLose.play();
}

/**
 * Fire work
 */

function firework() {
  const duration = 15 * 700,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

/**
 * Get computer choice
 * @returns
 */
function getComputerChoice() {
  let computerChoice = Math.ceil(Math.random(1) * 3);

  if (computerChoice === 1) {
    return "ROCK";
  } else if (computerChoice === 2) {
    return "PAPER";
  } else {
    return "SCISSOR";
  }
}

function reset() {
  //Reset game
  compteurRound = 0;
  hScore = 0;
  cScore = 0;

  gameRound.innerHTML = `${compteurRound}/5`;
  humanScore.innerHTML = ` ${hScore}`;
  computerScore.innerHTML = ` ${cScore}`;

  rulerText.innerHTML = `The stone breaks the scissor, the scissor cuts the paper, the
              paper covers the stone and if you throw the same object, it's all
              the same.`;
  rulerText.className = "ruler-text";
  humanChoiceElement.className = "object-begin";
  computerChoiceElement.className = "object-begin";
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    hScore = hScore;
    cScore = cScore;
  } else if (
    (humanChoice === "ROCK" && computerChoice === "SCISSOR") ||
    (humanChoice === "PAPER" && computerChoice === "ROCK") ||
    (humanChoice === "SCISSOR" && computerChoice === "PAPER")
  ) {
    hScore++;
  } else {
    cScore++;
  }
}

function playGame() {
  humanChoiceElement.className = "game-begin";
  computerChoiceElement.className = "game-begin";

  gameRound.innerHTML = `${compteurRound}/5`;

  rulerText.innerHTML = `The stone breaks the scissor, the scissor cuts the paper, the
              paper covers the stone and if you throw the same object, it's all
              the same.`;
  rulerText.className = "ruler-text";

  // console.log("Round " + compteurRound);

  humanSelection = humanChoice;
  computerChoice = getComputerChoice();

  playRound(humanChoice, computerChoice);
  getComputerChoice();
  humanChoiceElement.src = `img/${humanChoice}.png`;
  computerChoiceElement.src = `img/${computerChoice}.png`;

  //score
  humanScore.innerHTML = ` ${hScore}`;
  computerScore.innerHTML = ` ${cScore}`;

  // console.log("hScore => " + hScore + ", cScore => " + cScore);
  // console.log(
  //   "human choice: " + humanChoice + ", computer choice: " + computerChoice
  // );
  if (compteurRound === 5) {
    if (hScore === cScore) {
      tie();
    } else if (hScore > cScore) {
      win();
    } else {
      lose();
    }
  }
}

//Get Human choice
humanSelection1.addEventListener("click", function () {
  audio.play();
  compteurRound++;
  humanChoice = "ROCK";
  playGame();
});

humanSelection2.addEventListener("click", function () {
  audio.play();
  compteurRound++;
  humanChoice = "PAPER";
  playGame();
});

humanSelection3.addEventListener("click", function () {
  audio.play();
  compteurRound++;
  humanChoice = "SCISSOR";
  playGame();
});

//New Game
newGame.addEventListener("click", function () {
  location.reload();
});

// Reset Game
resetGame.addEventListener("click", function () {
  reset();
});
