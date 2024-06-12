let humanScore = 0;
let computerScore = 0;
let round = 0;

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

function getHumanChoice() {
  let humanChoice = "";

  while (humanChoice === "") {
    humanChoice = prompt("ROCK, PAPER, SCISSOR ?");
    humanChoice = humanChoice.toUpperCase();
  }

  return humanChoice;
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    humanScore = 0;
    computerScore = 0;
  } else if (
    (humanChoice === "ROCK" && computerChoice === "SCISSOR") ||
    (humanChoice === "PAPER" && computerChoice === "ROCK") ||
    (humanChoice === "SCISSOR" && computerChoice === "PAPER")
  ) {
    humanScore++;
  } else {
    computerScore++;
  }
}

function palyGame() {
  while (round < 5) {
    const humanSelection = getHumanChoice();
    const computerSelection = getComputerChoice();
    playRound(humanSelection, computerSelection);
    round++;
    console.log(
      `Human Choice : ${humanSelection} - Computer Choice ${computerSelection}`
    );
  }
  // console.log(`Human Scrore : ${humanScore}`);
  // console.log(`Computer Scrore : ${computerScore}`);

  if (humanScore === computerScore) {
    console.log("Match Null 🤪🤪");
  } else if (humanScore > computerScore) {
    console.log(
      `Felicitation, vous avez gagné 🏆🏆 avec un score de ${humanScore} - ${computerScore}`
    );
  } else {
    console.log(
      `Desolé, vous avez perdu 😫😫😫 avec un score de ${humanScore} - ${computerScore}`
    );
  }
}

// palyGame();
