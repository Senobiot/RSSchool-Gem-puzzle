//import {puzzle} from './puzzle.js';
//document.addEventListener("DOMContentLoaded", )
 
Puzzle.start()

function getClickEvents() {

	let empty = document.querySelector(".empty"),
		emptyPos,
		gems = Array.from(document.querySelectorAll(".gem")),
		gemsCurrentPosCheck,
		gemsNativePos = "",
		anDuration = 300,
		counter = 0,
		movesDisplay = document.querySelector(".moves"),
		difficult = Puzzle.properties.difficult;

	function gemsNative() {
		for (let i = 1; i <= Math.pow(difficult, 2) ; i++) {
			gemsNativePos += i;
		}
	}

	function checkWin() {
		gems = Array.from(document.querySelectorAll(".gem"))
		gemsCurrentPosCheck = gems.map(gem => gem.innerHTML).join("")
		if (gemsCurrentPosCheck === gemsNativePos) {
			setTimeout(() => {
				document.body.classList.add("block");
				popupWin.classList.add("active")
				popupMoves.innerText += counter;
				popupTime.innerText = timer.innerHTML;
			}, 100)
		};			
	}
	//---------------------------- клетки ---------------------------

	for (let i = 0; i < gems.length; i++) {
		
		if (gems[i] !== empty) {
			gems[i].addEventListener('click', function () {
				empty = document.querySelector(".empty")
				emptyPos = gems.indexOf(empty);
				if (this.previousElementSibling === empty
				 	&& !Puzzle.properties.animation
				  	&& Math.ceil((gems.indexOf(empty) + 1)/(difficult)) === Math.ceil((gems.indexOf(this) + 1)/(difficult))) {
					counter++;
					this.classList.add("animation-left");
					Puzzle.properties.animation = true;
					
					setTimeout(() => {
						 this.parentNode.insertBefore(this, empty);
						 this.classList.remove("animation-left");
						 movesDisplay.innerText = counter;
						 checkWin();
						 Puzzle.properties.randMoves.push(+this.innerText);
						 Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"))
						 Puzzle.properties.animation = false;
					 }, anDuration - 10);					
				
				}
				else if(this.nextElementSibling === empty
						&& !Puzzle.properties.animation
						&& Math.ceil((gems.indexOf(empty) + 1)/(difficult)) === Math.ceil((gems.indexOf(this) + 1)/(difficult))) {
					counter++;
					this.classList.add("animation-right");
					Puzzle.properties.animation = true;
					
					setTimeout(() => {
						empty.parentNode.insertBefore(empty, this);
						this.classList.remove("animation-right");
						movesDisplay.innerText = counter;
						checkWin()
						Puzzle.properties.randMoves.push(+this.innerText);
						Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"))
						Puzzle.properties.animation = false;
					}, anDuration - 10);		
					
				}
				else if (gems.indexOf(this) + difficult === emptyPos && !Puzzle.properties.animation){
					counter++;
					this.classList.add("animation-bottom");
					Puzzle.properties.animation = true;
					
					setTimeout(() => {
						this.parentNode.insertBefore(empty, gems[emptyPos - difficult]);
						this.parentNode.insertBefore(this, gems[emptyPos + 1]);
						this.classList.remove("animation-bottom");
						movesDisplay.innerText = counter;
						checkWin()
						Puzzle.properties.randMoves.push(+this.innerText);
						Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"))
						Puzzle.properties.animation = false;
					}, anDuration - 10);
						
				}
				else if (gems.indexOf(this) - difficult === emptyPos && !Puzzle.properties.animation){
					counter++;
					this.classList.add("animation-top");
					Puzzle.properties.animation = true;
					
					setTimeout(() => {
						this.parentNode.insertBefore(empty, gems[emptyPos + difficult]);
						this.parentNode.insertBefore(this, gems[emptyPos + 1]);
						this.classList.remove("animation-top");
						movesDisplay.innerText = counter;
						checkWin();
						//навесим событие, по клику будем записывать в randMoves ходы игрока и делать снимки расклада
						Puzzle.properties.randMoves.push(+this.innerText);
						Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"))
						Puzzle.properties.animation = false;
					}, anDuration - 10);
				};		
			 })
		}
	}
	//-------------------------------- меню -----------------------
	document.querySelector(".backBtn").addEventListener('click', function(){
		document.body.style.transform = "scale(0)";
		setTimeout(() => {
			
		while (document.body.firstChild) {
    		document.body.removeChild(document.body.firstChild);
		}
		document.body.style.transform = "scale(1)";
			Puzzle.reset()
			Puzzle.start();
		}, 500)
	})
}



//----------------------------------------

// let difficult = 3,
// 	form = document.querySelector(".choice"),
// 	start = document.querySelector(".button"),
// 	body = document.querySelector("body"),
// 	popupWin = document.querySelector(".win_popup"),
// 	popupMoves = document.querySelector(".win_popupMoves"),
// 	popupTime = document.querySelector(".win_popupTime");
// 	showSolution = document.querySelector(".solution")


	// start.addEventListener('click', function(){
	// 	let checkSize = document.getElementsByName('size');    
	// 	for(i = 0; i < checkSize.length; i++) { 
	// 		if(checkSize[i].checked) 
	// 		difficult = Number(checkSize[i].value);
	// 	} 
	// 	form.style.opacity = "0";

	// 	setTimeout(function(){
	// 		form.style.display = "none";
	// 		startGame ()
	// 	}, 200)
	// })




	//-------------------------------------------------


	//movesDisplay.innerHTML = counter;

// function showTime() {
// 	if (body.classList.contains("block")) return;
// 	time++;
// 	let hour = Math.floor(time / 3600),
// 	min = Math.floor((time - hour*3600) / 60);
// 	second = time % 60;
// 	if (hour < 10) {hour = "0" + hour}
// 	if (second < 10) {second = "0" + second}
// 	if (min < 10) {min = "0" + min}
// 	timer.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${second}`;

// 	setTimeout(showTime, 1000)
// }	



// gemsNative()



// function getRandomIntInclusive(min, max) {
//   			return Math.floor(Math.random() * (max - min + 1)) + min; 
//  }




//---функция проверки свободоного места локал стор взял с гитхаба
// var getLocalStorageSize = function() {
//     var total = 0;
//     for (var x in localStorage) {
//         // Value is multiplied by 2 due to data being stored in `utf-16` format, which requires twice the space.
//         var amount = (localStorage[x].length * 2) / 1024 / 1024;
//         if (!isNaN(amount) && localStorage.hasOwnProperty(x)) {
//             // console.log(x, localStorage.getItem(x), amount);
//             total += amount;
//         }
//     }
//     return total.toFixed(2);
// };