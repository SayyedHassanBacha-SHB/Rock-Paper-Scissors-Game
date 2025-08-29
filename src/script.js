function computerMove(){
	let cm = Math.random();
	if(cm >= 0 && cm < 1/3){
		cm = 'rock';
		// console.log(`computer Mpve : ${cm}`);
		return cm;
	}
	else if(cm >= 1/3 && 2/3){
		cm = 'paper';
		// console.log(`computer Mpve : ${cm}`);
		return cm;
	}
	else {
		cm = 'scissors';
		// console.log(`computer Mpve : ${cm}`);
		return cm;
	}
}

//Function to check who wins 
function playGame(playerMove){
	let cm = computerMove();
	let result = "";
	if(playerMove === "rock"){
			if(cm === "scissors"){
					result = "Win!";
			}
			else if (cm === "rock"){
					result = "Tie!"
			}
			else if(cm === "paper"){
					result = "Lose!"
			}
	}
	else if(playerMove === "paper"){
		if(cm === "scissors"){
			result = "Lose!";
		}
		else if (cm === "rock"){
			result = "Win!"
		}
		else if(cm === "paper"){
			result = "Tie!"
		}
	}            
	else if(playerMove === "scissors"){
		if(cm === "scissors"){
			result = "Tie!";
		}
		else if (cm === "rock"){
			result = "Lose!"
		}
		else if(cm === "paper"){
			result = "Win!"
		}
	}

	//Calculate Score
	if(result === "Win!"){
			score.win++;
	}
	else if (result === "Lose!"){
		score.lose++;
	}
	else if (result === "Tie!"){
		score.tie++;
	}
	localStorage.setItem("scoreString",JSON.stringify(score));
	// console.log(JSON.stringify(score));
	showResult.innerHTML = `You ${result}`;
	showMoves.innerHTML = `You choose (${playerMove})<img src="../assets/${playerMove}.png" alt="${playerMove}_image"> and computer choose (${cm})<img src="../assets/${cm}.png" alt="">`;
	showScore.innerHTML = `Win : ${score.win}, Loss : ${score.lose}, Tie : ${score.tie}`; 
	// console.log(`You chosse ${playerMove}.And computer choose ${cm}.YOU ${result} \n Win : ${score.win}, Loss : ${score.lose}, Tie : ${score.tie}`);
}

function reset(){
	score.win = 0; score.lose = 0; score.tie = 0; 
	localStorage.removeItem('scoreString');
	showScore.innerHTML = `Win : ${score.win}, Loss : ${score.lose}, Tie : ${score.tie}`; 
}



let score = JSON.parse(localStorage.getItem("scoreString")) || {win : 0, lose : 0, tie : 0 };
let rockBtn = document.querySelector(".js-rock");
let paperBtn = document.querySelector(".js-paper");
let scissorsBtn  = document.querySelector(".js-scissors");
let resetBtn = document.querySelector(".reset-btn");
let autoPlayBtn = document.querySelector(".auto-play-btn");
let showResult = document.querySelector(".js-show-result");
let showMoves = document.querySelector(".js-show-moves");
let showScore = document.querySelector(".js-show-score");
//Conformation message for reset
let popUp = document.querySelector(".js-pop-up");
let yesBtn = document.querySelector(".js-yes");
let noBtn = document.querySelector(".js-no");

//Autoplay btn instructions
let interval = null;
const autoPlay = () => {
	let playerMove = computerMove();
	if(interval){
		clearInterval(interval);
		interval = null;
		autoPlayBtn.innerHTML = "Auto Play Game";
	}
	else {
		interval = setInterval(() => {
		playGame(playerMove);
		},1000);
		autoPlayBtn.innerHTML = "Stop Autoplay";
	}
}

autoPlayBtn.addEventListener("click",autoPlay);

//Add eventlistner to buttons
rockBtn.addEventListener("click", ()=> playGame("rock"));
paperBtn.addEventListener("click", ()=> playGame("paper"));
scissorsBtn.addEventListener("click", ()=> playGame("scissors"));



const popUpReset = () => {
	popUp.style.display = (popUp.style.display === "none") ? "flex" : "flex";
	yesBtn.addEventListener("click",clickYesBtn);
	noBtn.addEventListener("click",clickNoBtn)
}

const clickYesBtn = () => {
		popUp.style.display = (popUp.style.display === "flex") ? "none" : "none";
		reset();
	}
const clickNoBtn = () => popUp.style.display = (popUp.style.display === "flex") ? "none" : "none";

resetBtn.addEventListener("click", popUpReset);


//event listner for keyboard keys input
document.body.addEventListener("keydown",(event) => {
	console.log(event.key);
	if(event.key === "r" || event.key === "R"){
		playGame("rock");
	}
	else if (event.key === "s" || event.key === "S"){
		playGame("scissors");
	}
	else if (event.key === "p" || event.key === "P"){
		playGame("paper");
	}
	else if(event.key === "a" || event.key === "A" ){
		autoPlay();
	}
	else if (event.key === "Backspace"){
		popUpReset();
	}
	else if (event.key === "y" || event.key === "Y"){
		clickYesBtn();
	}
	else if (event.key === "n" || event.key === "N"){
		clickNoBtn();
	}

});





