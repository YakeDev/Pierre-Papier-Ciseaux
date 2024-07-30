class Game {
  constructor() {
    this._humChoice = null;
    this._compChoice = null;
    this.hScore = 0;
    this.cScore = 0;
    this.gameRound = 0;
    this.gameActive = true;

    this.humanChoices = document.querySelectorAll(".human-choice");
    this.playerChoice_img = document.getElementById("human-choice-object");
    this.computerChoice_img = document.getElementById("computer-choice-object");
    this.playerScore = document.getElementById("human-score");
    this.computerScore = document.getElementById("computer-score");
    this.rulerText = document.querySelector(".ruler");
    this.roundNumber = document.getElementById("game-round");
    this.btnNewGame = document.querySelector(".btn-new-game");
    this.btnReset = document.querySelector(".btn-cancel");

    //Audio
    this.audio = document.getElementById("audio");
    this.audioWin = document.getElementById("audio-win");
    this.audioFireWork = document.getElementById("audio-firework");
    this.audioLose = document.getElementById("audio-lose");
  }

  initGame() {
    this.playerChoice_img.className = "object-begin";
    this.computerChoice_img.className = "object-begin";
  }

  resetGame() {
    this._humChoice = null;
    this._compChoice = null;
    this.hScore = 0;
    this.cScore = 0;
    this.gameRound = 0;
    this.gameActive = true;
    this.rulerText.className = "ruler";
    this.rulerText.textContent =
      "The stone breaks the scissor, the scissor cuts the paper, the paper covers the stone. If both throw the same object, it's a tie.";
    this.playerChoice_img.className = "object-begin";
    this.computerChoice_img.className = "object-begin";
    this.showPlayersScore();
    this.showRound();
  }

  newGame() {
    this.btnNewGame.addEventListener("click", () => {
      this.resetGame();
      // this.playGame();
    });
  }

  compChoice() {
    const choices = ["ROCK", "PAPER", "SCISSOR"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    this._compChoice = choices[randomIndex];
    return this._compChoice;
  }

  playRound() {
    switch (true) {
      case this._humChoice === this._compChoice:
        console.log("It's a tie!");
        this.rulerText.textContent = "It's a tie!";
        break;

      case this._humChoice === "ROCK" && this._compChoice === "SCISSOR":
      case this._humChoice === "PAPER" && this._compChoice === "ROCK":
      case this._humChoice === "SCISSOR" && this._compChoice === "PAPER":
        this.hScore++;
        console.log("Player1 wins this round!");
        this.rulerText.textContent = "Player1 wins this round!";
        break;

      default:
        this.cScore++;
        console.log("Computer wins this round!");
        this.rulerText.textContent = "Computer wins this round!";
    }
  }

  showRound() {
    this.roundNumber.textContent = `${this.gameRound}`;
  }

  showPlayersChoice() {
    //Afficher le choix du jouer et de l'ordinateur
    this.playerChoice_img.src = `img/${this._humChoice}.png`;
    this.computerChoice_img.src = `img/${this._compChoice}.png`;
  }
  /**
   * Afficher les scores des joueurs
   *
   */
  showPlayersScore() {
    this.playerScore.textContent = `${this.hScore}`;
    this.computerScore.textContent = `${this.cScore}`;
  }
  /**
   * Check winner
   *
   */
  winner() {
    if (this.hScore === this.cScore) {
      console.log("Match Null 🤪🤪");
      this.rulerText.textContent = "Woow!! Tie score 🤪🤪";
      this.rulerText.className = "tieMatch";
    } else if (this.hScore > this.cScore) {
      console.log(`Congratulations, you've won 🏆 with ${this.hScore}`);
      this.firework();
      this.audioFireWork.play();
      this.audioWin.play();
      this.rulerText.textContent = "Congratulations, you've won 🏆";
      this.rulerText.className = "winMatch";
    } else {
      this.rulerText.textContent = "Try again, you lost 😫😫😫";
      this.rulerText.className = "loseMatch";
      this.audioLose.play();
    }
  }

  playGame() {
    this.initGame();
    this.humanChoices.forEach((hChoice, index) => {
      hChoice.addEventListener("click", () => {
        if (this.gameActive) {
          this.audio.play();
          this.playerChoice_img.classList.remove("object-begin");
          this.computerChoice_img.classList.remove("object-begin");

          let tabChoices = ["ROCK", "PAPER", "SCISSOR"];
          this._humChoice = tabChoices[index];

          this._compChoice = this.compChoice(); // Update computer's choice

          this.gameRound++;

          this.playRound();
          this.showPlayersChoice();
          this.showPlayersScore();
          this.showRound();

          console.log(`GAME ROUND: ${this.gameRound}`);
          console.log("----------------------------");
          console.log(`Human: ${this._humChoice}`);
          console.log(`Computer: ${this._compChoice}`);
          console.log("----------------------------");
          console.log(`Human score: ${this.hScore}`);
          console.log(`Computer score: ${this.cScore}`);
          console.log("=======================================");

          if (this.gameRound >= 5) {
            this.gameActive = false;
            this.initGame();
            this.winner();
          }
        }
      });
    });
  }

  firework() {
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
}

// Supposons que vous avez des valeurs pour `humChoice` et `compChoice`
let myGame = new Game();
myGame.playGame();
myGame.newGame();
