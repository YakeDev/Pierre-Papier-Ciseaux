class Choice {
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
  }

  get compChoice() {
    const choices = ["ROCK", "PAPER", "SCISSOR"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    this._compChoice = choices[randomIndex];

    return this._compChoice;
  }

  playRound() {
    if (this._humChoice === this._compChoice) {
      // It's a tie, no score change
      console.log("It's a tie!");
    } else if (
      (this._humChoice === "ROCK" && this._compChoice === "SCISSOR") ||
      (this._humChoice === "PAPER" && this._compChoice === "ROCK") ||
      (this._humChoice === "SCISSOR" && this._compChoice === "PAPER")
    ) {
      this.hScore++;
      console.log("Player1 wins this round!");
    } else {
      this.cScore++;
      console.log("Computer wins this round!");
    }
  }

  showRound() {
    this.roundNumber.textContent = `${this.gameRound}`;
  }

  showPlayersChoice() {
    //Afficher le choix du jouer et de l'ordinateur
    this.playerChoice_img.src = `img/${this._humChoice}.png`;
    this.computerChoice_img.src = `img/${this.compChoice}.png`;
  }
  /**
   * Afficher les scores des joueurs
   *
   */
  showPlayersScore() {
    this.playerScore.textContent = `${this.hScore}`;
    this.computerScore.textContent = `${this.cScore}`;
  }

  winner() {
    if (this.hScore === this.cScore) {
      console.log("Match Null 🤪🤪");
      this.rulerText.textContent = "Woow!! Tie score 🤪🤪";
      this.rulerText.className = "tieMatch";
    } else if (this.hScore > this.cScore) {
      console.log(`Congratulations, you've won 🏆 with ${this.hScore}`);
      this.rulerText.textContent = "Congratulations, you've won 🏆";
      this.rulerText.className = "winMatch";
    } else {
      this.rulerText.textContent = "Try again, you lost 😫😫😫";
      this.rulerText.className = "loseMatch";
    }
  }

  playGame() {
    this.humanChoices.forEach((hChoice, index) => {
      hChoice.addEventListener("click", () => {
        if (this.gameActive) {
          let tabChoices = ["ROCK", "PAPER", "SCISSOR"];
          this._humChoice = tabChoices[index];

          this._compChoice = this.compChoice; // Update computer's choice

          this.gameRound++;

          this.playRound();
          this.showPlayersChoice();
          this.showPlayersScore();
          this.showRound();

          console.log(`Game Round: ${this.gameRound}`);
          console.log("----------------------------");
          console.log(`Computer: ${this._compChoice}`);
          console.log(`Human: ${this._humChoice}`);
          console.log("----------------------------");
          console.log(`Human score: ${this.hScore}`);
          console.log(`Computer score: ${this.cScore}`);

          if (this.gameRound === 5) {
            this.gameActive = false;
            this.winner();
          }
        }
      });
    });
  }
}

// Supposons que vous avez des valeurs pour `humChoice` et `compChoice`
let hChoice = new Choice();
hChoice.playGame();
