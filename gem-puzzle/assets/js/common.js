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
		puzzleRadialGradient = document.querySelector(".puzzle"),
		crossTimer,
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

	function radialGradient() {
		document.body.classList.add("gradient");
		let image = window.getComputedStyle(gems[1], null).getPropertyValue("background-image");
		puzzleRadialGradient.style.background = `${image} no-repeat 50%/contain`;
		for (var i = 0; i < gems.length; i++) {
			gems[i].classList.add("gradient");
		}
	}

	function checkWin() {
		gems = Array.from(document.querySelectorAll(".gem"))
		gemsCurrentPosCheck = gems.map(gem => gem.innerHTML).join("");

		if (gemsCurrentPosCheck === gemsNativePos) {
			if (Puzzle.properties.pictures) {
					crossTimer = timer.innerText;
					radialGradient();
					setTimeout(() => {
					document.body.classList.add("win");
					popup ();
				}, 4000)
			} else {
					crossTimer = timer.innerText;
					setTimeout(() => {
					document.body.classList.add("win");
					popup ();
				}, 1000)
			}

		};			
	}

	//------------------------drag & drop -----------------------------
	let ats = document.querySelectorAll(".gem");

	// let slider = document.querySelector(".puzzle")

	 for (var i = 0; i < ats.length; i++) {

		//пустая справа
   //  ats[i].addEventListener('mousedown',  function (event) {
   //    //event.preventDefault(); 

   //    this.style.position = 'relative';
   //    let pointOfClick = event.clientX - this.previousElementSibling.getBoundingClientRect().left;
   //    let positionOfStart = this.getBoundingClientRect().left
   //    let positionOfEnd = this.getBoundingClientRect().left;
   //    document.addEventListener('mousemove',  move = (event) => {
			// let newPos = event.clientX - pointOfClick - this.previousElementSibling.getBoundingClientRect().left;
			// let limit = this.previousElementSibling.offsetWidth - this.offsetWidth + 100;

   //      if (newPos < 0 ) newPos = 0;
   //      if (newPos > limit) newPos = limit;

   //      this.style.left = newPos + 'px'
   //      positionOfEnd = this.getBoundingClientRect().left
   //  });

   //    	document.addEventListener('mouseup', function up (event) {
   //    		//if (positionOfEnd - positionOfStart > 50) тут запуск логики
   //      	this.removeEventListener('mouseup', up)
   //    		this.removeEventListener('mousemove', move)
   //    	} );

   //    function onMouseUp() {
   //      document.removeEventListener('mouseup', up);
   //      document.removeEventListener('mousemove', move);
   //    }

   	//пустая слева
   	ats[i].addEventListener('mousedown',  function (event) {
      //event.preventDefault(); 

      this.style.position = 'relative';
      let pointOfClick = event.clientX - this.previousElementSibling.getBoundingClientRect().left;
      let positionOfStart = this.getBoundingClientRect().left
      let positionOfEnd = this.getBoundingClientRect().left;
      document.addEventListener('mousemove',  move = (event) => {
			let newPos = event.clientX - pointOfClick - this.previousElementSibling.getBoundingClientRect().left;
			let limit = this.previousElementSibling.offsetWidth - this.offsetWidth + 100;

        if (newPos < 0 ) newPos = 0;
        if (newPos > limit) newPos = limit;

        this.style.left = newPos + 'px'
        positionOfEnd = this.getBoundingClientRect().left
    });

      	document.addEventListener('mouseup', function up (event) {
      		//if (positionOfEnd - positionOfStart > 50) тут запуск логики
        	this.removeEventListener('mouseup', up)
      		this.removeEventListener('mousemove', move)
      	} );

      function onMouseUp() {
        document.removeEventListener('mouseup', up);
        document.removeEventListener('mousemove', move);
      }



     });
	}
	



	//---------------------------- клетки ---------------------------

	// for (let i = 0; i < gems.length; i++) {
		
	// 	if (gems[i] !== empty) {
	// 		gems[i].addEventListener('click', function () {
 //              //myAudio2.play();
	// 			empty = document.querySelector(".empty")
	// 			emptyPos = gems.indexOf(empty);
	// 			if (this.previousElementSibling === empty
	// 			 	&& !Puzzle.properties.animation
	// 			  	&& Math.ceil((gems.indexOf(empty) + 1)/(difficult)) === Math.ceil((gems.indexOf(this) + 1)/(difficult))) {
	// 				counter++;
	// 				this.classList.add("animation-left");
	// 				Puzzle.properties.animation = true;
					
	// 				setTimeout(() => {
	// 					 this.parentNode.insertBefore(this, empty);
	// 					 this.classList.remove("animation-left");
	// 					 movesDisplay.innerText = counter;
	// 					 checkWin();
	// 					 Puzzle.properties.randMoves.push(+this.innerText);
	// 					 Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"))
	// 					 Puzzle.properties.animation = false;
	// 				 }, anDuration - 10);					
				
	// 			}
	// 			else if(this.nextElementSibling === empty
	// 					&& !Puzzle.properties.animation
	// 					&& Math.ceil((gems.indexOf(empty) + 1)/(difficult)) === Math.ceil((gems.indexOf(this) + 1)/(difficult))) {
	// 				counter++;
	// 				this.classList.add("animation-right");
	// 				Puzzle.properties.animation = true;
					
	// 				setTimeout(() => {
	// 					empty.parentNode.insertBefore(empty, this);
	// 					this.classList.remove("animation-right");
	// 					movesDisplay.innerText = counter;
	// 					checkWin()
	// 					Puzzle.properties.randMoves.push(+this.innerText);
	// 					Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"))
	// 					Puzzle.properties.animation = false;
	// 				}, anDuration - 10);		
					
	// 			}
	// 			else if (gems.indexOf(this) + difficult === emptyPos && !Puzzle.properties.animation){
	// 				counter++;
	// 				this.classList.add("animation-bottom");
	// 				Puzzle.properties.animation = true;
					
	// 				setTimeout(() => {
	// 					this.parentNode.insertBefore(empty, gems[emptyPos - difficult]);
	// 					this.parentNode.insertBefore(this, gems[emptyPos + 1]);
	// 					this.classList.remove("animation-bottom");
	// 					movesDisplay.innerText = counter;
	// 					checkWin()
	// 					Puzzle.properties.randMoves.push(+this.innerText);
	// 					Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"))
	// 					Puzzle.properties.animation = false;
	// 				}, anDuration - 10);
						
	// 			}
	// 			else if (gems.indexOf(this) - difficult === emptyPos && !Puzzle.properties.animation){
	// 				counter++;
	// 				this.classList.add("animation-top");
	// 				Puzzle.properties.animation = true;
					
	// 				setTimeout(() => {
	// 					this.parentNode.insertBefore(empty, gems[emptyPos + difficult]);
	// 					this.parentNode.insertBefore(this, gems[emptyPos + 1]);
	// 					this.classList.remove("animation-top");
	// 					movesDisplay.innerText = counter;
	// 					checkWin();
	// 					//навесим событие, по клику будем записывать в randMoves ходы игрока и делать снимки расклада
	// 					Puzzle.properties.randMoves.push(+this.innerText);
	// 					Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"))
	// 					Puzzle.properties.animation = false;
	// 				}, anDuration - 10);
	// 			};		
	// 		 })
	// 	}
	// }






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
					// localStorage.setItem(`save-${i}-snap`, `${Puzzle.properties.snapShot}`); ???????????
					localStorage.setItem(`save-${i}-startPos`, `${Puzzle.properties.snapShot[Puzzle.properties.snapShot.length - 1]}`);
					localStorage.setItem(`save-${i}-pictures`, `${Puzzle.properties.pictures}`);
					localStorage.setItem(`save-${i}-picturesNumber`, `${window.getComputedStyle(gems[1], null).getPropertyValue("background-image").match(/\d*(?=.jpg)/)}`);
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
				
		for (let i = 0; i < saveSlots.length; i++) {
			saveSlots[i].classList.toggle("active");
		}
	});

	document.querySelector(".loadBtn").addEventListener('click', function(){
		this.classList.toggle("active");
		
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
		winPopupTitle = document.querySelector(".winPopupTitle"),
		winPopupMoves = document.querySelector(".winPopupMoves"),
		winPopupTime = document.querySelector(".winPopupTime"),
		winPopupName = document.querySelector(".winPopupName"),
		winPopupSubmit = document.querySelector(".winPopupSubmit"),
		winPopupCloseBtn = document.querySelector(".winPopupCloseBtn"),
		timer = document.querySelector(".timer"),
		arrayOfLeaders = [];

		function compareLeaders(a, b) {
  			if (a.moves < b.moves ){
   			 	return -1;
  			}
  			if (a.moves > b.moves){
   				return 1;
  			}
 				return 0;
		};

			for (let key in localStorage){
				if (key == `leadD${difficult}`) {
					arrayOfLeaders = JSON.parse(localStorage.getItem(`leadD${difficult}`));
				}
			}

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
					document.body.classList.remove("win", "gradient");
					backToMenuReset();
				});
				winPopupSubmit.addEventListener('click', () => {
					document.body.classList.remove("win", "gradient");
					backToMenuReset();
				});
			} else {
				let leaderObj = {pos: '', moves: '', time: '', name: '' };
				let time = timer.innerText;
				let defaultName = winPopupName.innerText;

				winPopup.classList.remove("inactive");
				winPopupMoves.innerText += ` ${counter}`;

				winPopupTime.innerText += ` ${crossTimer}`;
				winPopupCloseBtn.addEventListener('click', ()=> {
					document.body.classList.remove("win", "gradient");
					backToMenuReset();
				});

				winPopupName.addEventListener('focus', function() {
					setTimeout(()=> {winPopupName.innerText = "";}, 100)
				})
				winPopupName.addEventListener('blur', function() {
					setTimeout(()=> {
						if (winPopupName.innerText.length === 0) {
							winPopupName.innerText = defaultName;
						}
					}, 100)
				})


				winPopupSubmit.addEventListener('click', () => {
					leaderObj.moves = counter;
					leaderObj.time = time;
					leaderObj.name = winPopupName.innerText;
					arrayOfLeaders.push(leaderObj);
					arrayOfLeaders.sort(compareLeaders);
					arrayOfLeaders.forEach((item, index) => {
						item.pos = index + 1;
					});
					if (arrayOfLeaders.length > 10) arrayOfLeaders = arrayOfLeaders.slice(0,10);
					localStorage.setItem(`leadD${difficult}`, JSON.stringify(arrayOfLeaders));
					document.body.classList.remove("win", "gradient");
					backToMenuReset();
				});
			}

		}

}



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