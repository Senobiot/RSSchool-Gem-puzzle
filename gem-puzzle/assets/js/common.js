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
		movesDisplay = document.querySelector(".moves"),

		counter = Number(movesDisplay.innerText),
		difficult = Puzzle.properties.difficult;
		myAudio1 = new Audio;
		myAudio2 = new Audio;
      	myAudio1.src = "assets/media/1.wav";
      	myAudio2.src = "assets/media/2.wav";

	function gemsNative() {
		for (let i = 1; i <= Math.pow(difficult, 2) ; i++) {
			gemsNativePos += i;
		}
	}
	gemsNative();

	function checkWin() {
		gems = Array.from(document.querySelectorAll(".gem"))
		gemsCurrentPosCheck = gems.map(gem => gem.innerHTML).join("")
		if (gemsCurrentPosCheck === gemsNativePos) {
			setTimeout(() => {
				document.body.classList.add("win");
				popup ();
				// popupWin.classList.add("active")
				// popupMoves.innerText += counter;
				// popupTime.innerText = timer.innerHTML;
			}, 100)
		};			
	}
	//---------------------------- клетки ---------------------------

	for (let i = 0; i < gems.length; i++) {
		
		if (gems[i] !== empty) {
			gems[i].addEventListener('click', function () {
              //myAudio2.play();
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

	function backToMenuReset () {
		document.body.style.transform = "scale(0)";
		setTimeout(() => {		
			while (document.body.firstChild) {document.body.removeChild(document.body.firstChild)};
				document.body.style.transform = "scale(1)";
				Puzzle.reset(true)
				Puzzle.start();
		}, 500)
	}

	document.querySelector(".backBtn").addEventListener('click', backToMenuReset)

	let saveSlots =  document.querySelectorAll(".saveSlot"),
		loadSlots =  document.querySelectorAll(".loadSlot");
		const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

		//------логика сохранения -------
		for (let i = 0; i < saveSlots.length; i++) {
				saveSlots[i].addEventListener('click', function(){
					let date = new Date();
					let hour = date.getHours();
					let min = date.getMinutes()
					if (hour < 10) {hour = "0" + hour}
					if (min < 10) {min = "0" + min}
					saveSlots[i].innerText = loadSlots[i].innerText = `${Puzzle.properties.difficult}x${Puzzle.properties.difficult} ${month[date.getMonth()]} ${date.getDate()} ${hour}:${min}`
					localStorage.setItem(`save-${i}-date`, `${saveSlots[i].innerText}`);
					localStorage.setItem(`save-${i}-moves`, `${counter}`);
					localStorage.setItem(`save-${i}-timer`, `${Puzzle.properties.time}`);
					localStorage.setItem(`save-${i}-difficult`, `${Puzzle.properties.difficult}`);
					localStorage.setItem(`save-${i}-snap`, `${Puzzle.properties.snapShot}`);
					localStorage.setItem(`save-${i}-randMoves`, `${Puzzle.properties.randMoves}`);
					localStorage.setItem(`save-${i}-snap`, `${Puzzle.properties.snapShot}`);
					localStorage.setItem(`save-${i}-startPos`, `${Puzzle.properties.snapShot[Puzzle.properties.snapShot.length - 1]}`);
				})
		}

		//-----логика загрузки

		for (let i = 0; i < saveSlots.length; i++) {
			loadSlots[i].addEventListener('click', function(){
				if (localStorage.getItem(`save-${i}-date`)) {
					Puzzle.load(i, true)
				}	
			})
		}

		// раскрытие кнопок сохранения/хагрузки
	document.querySelector(".saveBtn").addEventListener('click', function(){
		this.classList.toggle("active");
		// if (document.querySelector(".loadBtn").classList.contains("active")) {document.querySelector(".loadBtn").click()}
		
		for (let i = 0; i < saveSlots.length; i++) {
			saveSlots[i].classList.toggle("active");
		}
	});

	document.querySelector(".loadBtn").addEventListener('click', function(){
		this.classList.toggle("active");
		// if (document.querySelector(".saveBtn").classList.contains("active")) {document.querySelector(".saveBtn").click()}

		for (let i = 0; i < loadSlots.length; i++) {
			loadSlots[i].classList.toggle("active");
		}
	});

	document.querySelector(".leadersBtn").addEventListener('click', function(){
		document.querySelector(".leadersPanel").classList.toggle("inactive");
	});

	document.querySelector(".leadersCloseBtn").addEventListener('click', function(){
		document.querySelector(".leadersPanel").classList.add("inactive");
	});


	//----WIN! popup

	let winPopup = document.querySelector(".winPopup"),
		winPopupTitle = document.querySelector(".winPopupTitle")
		winPopupMoves = document.querySelector(".winPopupMoves")
		winPopupTime = document.querySelector(".winPopupTime")
		winPopupName = document.querySelector(".winPopupName")
		winPopupSubmit = document.querySelector(".winPopupSubmit")
		winPopupCloseBtn = document.querySelector(".winPopupCloseBtn");
		timer = document.querySelector(".timer");

		function popup () {
			if (Puzzle.properties.solution) {
				winPopup.classList.remove("inactive");
				winPopupTitle.innerText = `the computer solved the puzzle in ${counter} moves`
				winPopupTitle.style.textAlign = "center";
				winPopupTitle.style.marginBottom  = "30px";
				winPopupMoves.remove();
				winPopupTime.remove();
				winPopupName.remove();
				winPopupSubmit.innerText = "try again";
				winPopupCloseBtn.addEventListener('click', ()=> {
					document.body.classList.remove("win");
					backToMenuReset();
				});
				winPopupSubmit.addEventListener('click', () => {
					document.body.classList.remove("win");
					backToMenuReset();
				});
			} else {
				winPopup.classList.remove("inactive");
				winPopupMoves.innerText += ` ${counter}`;

				winPopupTime.innerText += ` ${timer.innerText}`;
				winPopupCloseBtn.addEventListener('click', ()=> {
					document.body.classList.remove("win");
					backToMenuReset();
				});
				winPopupSubmit.addEventListener('click', () => {
					document.body.classList.remove("win");
					backToMenuReset();
				});
			}

			//winPopupTime += ` ${}`;
		}

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