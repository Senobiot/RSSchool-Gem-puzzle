//import {puzzle} from './puzzle.js';
//document.addEventListener("DOMContentLoaded", )
let myAudio2 = new Audio;    	
let	myAudio3 = new Audio;
let	myAudio4 = new Audio;
let	myAudio5 = new Audio;

myAudio2.src = "assets/media/bubble.mp3";
myAudio3.src = "assets/media/music_main.mp3";
myAudio4.src = "assets/media/music_2.mp3";
myAudio5.src = "assets/media/music_1.mp3";



myAudio3.loop = true;
myAudio4.loop = true;
myAudio5.loop = true;


Puzzle.start()

if (Puzzle.properties.music) myAudio3.play();

function getClickEvents() {

	let empty = document.querySelector(".empty"),
		emptyPos,
		gems = Array.from(document.querySelectorAll(".gem")),
		gemsCurrentPosCheck,
		gemsNativePos = "",
		anDuration = 300,
		movesDisplay = document.querySelector(".moves"),
		puzzleRadialGradient = document.querySelector(".puzzle"),
		draggable = false,
		crossTimer,
		counter = Number(movesDisplay.innerText),
		difficult = Puzzle.properties.difficult;
		myAudio1 = new Audio;
      	myAudio1.src = "assets/media/3.mp3";



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

	//CLICK FUNCTIONS	

	//пустая слева
	function leftClick () {
		if (Puzzle.properties.sound) {myAudio1.currentTime = 0; myAudio1.play()};
		empty = document.querySelector(".empty");
		emptyPos = gems.indexOf(empty);
		if(stopClick) return false;
		if (this.previousElementSibling === empty && !Puzzle.properties.animation && Math.ceil((gems.indexOf(empty) + 1)/(difficult)) === Math.ceil((gems.indexOf(this) + 1)/(difficult))) {
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
	}

	//пустая справа
	function rightClick () {
		if (Puzzle.properties.sound) {myAudio1.currentTime = 0; myAudio1.play()};
		empty = document.querySelector(".empty");
		emptyPos = gems.indexOf(empty);
		if(stopClick) return false;
		if (this.nextElementSibling === empty && !Puzzle.properties.animation && Math.ceil((gems.indexOf(empty) + 1)/(difficult)) === Math.ceil((gems.indexOf(this) + 1)/(difficult))) {
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
	}

	//пустая сверху
	function topClick () {
		if (Puzzle.properties.sound) {myAudio1.currentTime = 0; myAudio1.play()};
		empty = document.querySelector(".empty");
		emptyPos = gems.indexOf(empty);
		if(stopClick) return false;
		if (gems.indexOf(this) - difficult === emptyPos && !Puzzle.properties.animation) {
			counter++;
			this.classList.add("animation-top");
			Puzzle.properties.animation = true;

			setTimeout(() => {
				this.parentNode.insertBefore(empty, gems[emptyPos + difficult]);
				this.parentNode.insertBefore(this, gems[emptyPos + 1]);
				this.classList.remove("animation-top");
				movesDisplay.innerText = counter;
				checkWin();
				Puzzle.properties.randMoves.push(+this.innerText);
				Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"))
				Puzzle.properties.animation = false;
			}, anDuration - 10);
		}
	}

	//пустая снизу
	function bottomClick () {
		if (Puzzle.properties.sound) {myAudio1.currentTime = 0; myAudio1.play()};
		empty = document.querySelector(".empty");
		emptyPos = gems.indexOf(empty);
		if(stopClick) return false;
		if (gems.indexOf(this) + difficult === emptyPos && !Puzzle.properties.animation) {
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
	}


	//DRAG & DROP FUNCTIONS ---------------------------------------------------
	let stopClick = false;
	function captureClick() {
		setTimeout(()=> {stopClick = false}, 50)
	}
		
	//пустая слева
	function leftDrag () {
		let dragging = false;
		empty = document.querySelector(".empty");
		emptyPos = gems.indexOf(empty);
		
		if (this.previousElementSibling === empty && !Puzzle.properties.animation && Math.ceil((gems.indexOf(empty) + 1)/(difficult)) === Math.ceil((gems.indexOf(this) + 1)/(difficult))) {
			this.style.position = 'relative';
			let pointOfClick = event.clientX,
				positionOfStart = this.getBoundingClientRect().right,
				positionOfEnd = positionOfStart,
				width = this.offsetWidth + 4.5; //4.5 - gridgap ширина для "красивости"


		document.addEventListener('mousemove',  move = (event) => {
			dragging = true; //если перместили зажатой кнопке
			let newPos = pointOfClick - event.clientX; //меняем местами - меняется сторона, ещё поменять laft/right
			if (newPos < 0 ) newPos = 0;
			if (newPos > width) newPos = width;
			positionOfEnd = this.getBoundingClientRect().right;
			this.style.right = newPos + 'px' //тут меняем что куда надо двигать
		});

		document.addEventListener('mouseup',  up = (event) => {
			if ((positionOfStart - positionOfEnd) > 0.4*width) {
				counter++;
				this.style.position = 'static';
				this.style.right = 'auto';
				this.parentNode.insertBefore(this, empty);
				movesDisplay.innerText = counter;
				checkWin();
				Puzzle.properties.randMoves.push(+this.innerText);
				Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"));
				if (Puzzle.properties.sound) {myAudio1.currentTime = 0; myAudio1.play()};
			}
			else {
				this.style.position = 'static';
				this.style.right = 'auto';
			}

			if (dragging) {
				stopClick = true;
				captureClick();
			}
			document.removeEventListener('mousemove', move);
			document.removeEventListener('mouseup', up);      	
			}) 
		}
	}

	//пустая справа
	function rightDrag () {
		let dragging = false;
		empty = document.querySelector(".empty");
		emptyPos = gems.indexOf(empty);
		
		if (this.nextElementSibling === empty && !Puzzle.properties.animation && Math.ceil((gems.indexOf(empty) + 1)/(difficult)) === Math.ceil((gems.indexOf(this) + 1)/(difficult))) {
			this.style.position = 'relative';
			let pointOfClick = event.clientX,
				positionOfStart = this.getBoundingClientRect().right,
				positionOfEnd = positionOfStart,
				width = this.offsetWidth + 4.5; //4.5 - gridgap ширина для "красивости"


		document.addEventListener('mousemove',  move = (event) => {
			dragging = true; //если перместили зажатой кнопке
			let newPos = event.clientX - pointOfClick; //меняем местами - меняется сторона, ещё поменять laft/right
			if (newPos < 0 ) newPos = 0;
			if (newPos > width) newPos = width;
			positionOfEnd = this.getBoundingClientRect().right;
			this.style.right = -newPos + 'px' //тут меняем что куда надо двигать
		});

		document.addEventListener('mouseup',  up = (event) => {
			if (-(positionOfStart - positionOfEnd) > 0.4*width) {
				counter++;
				this.style.position = 'static';
				this.style.right = 'auto';
				empty.parentNode.insertBefore(empty, this);
				movesDisplay.innerText = counter;
				checkWin();
				Puzzle.properties.randMoves.push(+this.innerText);
				Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"));
				if (Puzzle.properties.sound) {myAudio1.currentTime = 0; myAudio1.play()};
			}
			else {
				this.style.position = 'static';
				this.style.right = 'auto';
			}

			if (dragging) {
				stopClick = true;
				captureClick();
			}
			document.removeEventListener('mousemove', move);
			document.removeEventListener('mouseup', up);      	
			}) 
		}
	}

	//пустая сверху
	function topDrag () {
		let dragging = false;
		empty = document.querySelector(".empty");
		emptyPos = gems.indexOf(empty);
		
		if (gems.indexOf(this) - difficult === emptyPos && !Puzzle.properties.animation) {
			this.style.position = 'relative';
			let pointOfClick = event.clientY,
				positionOfStart = this.getBoundingClientRect().top,
				positionOfEnd = positionOfStart,
				width = this.offsetWidth + 4.5; //4.5 - gridgap ширина для "красивости" квадратные можно брат только ширину


		document.addEventListener('mousemove',  move = (event) => {
			dragging = true; //если перместили зажатой кнопке
			let newPos = pointOfClick - event.clientY; //меняем местами - меняется сторона, ещё поменять laft/right
			if (newPos < 0 ) newPos = 0;
			if (newPos > width) newPos = width;
			positionOfEnd = this.getBoundingClientRect().top;
			this.style.top = -newPos + 'px' //тут меняем что куда надо двигать
		});

		document.addEventListener('mouseup',  up = (event) => {
			if ((positionOfStart - positionOfEnd) > 0.4*width) {
				counter++;
				this.style.position = 'static';
				this.style.top = 'auto';
				this.parentNode.insertBefore(empty, gems[emptyPos + difficult]);
				this.parentNode.insertBefore(this, gems[emptyPos + 1]);
				movesDisplay.innerText = counter;
				checkWin();
				Puzzle.properties.randMoves.push(+this.innerText);
				Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"));
				if (Puzzle.properties.sound) {myAudio1.currentTime = 0; myAudio1.play()};
			}
			else {
				this.style.position = 'static';
				this.style.top = 'auto';
			}

			if (dragging) {
				stopClick = true;
				captureClick();
			}
			document.removeEventListener('mousemove', move);
			document.removeEventListener('mouseup', up);      	
			}) 
		}
	}


	function bottomDrag () {
		let dragging = false;
		empty = document.querySelector(".empty");
		emptyPos = gems.indexOf(empty);
		
		if (gems.indexOf(this) + difficult === emptyPos && !Puzzle.properties.animation) {
			this.style.position = 'relative';
			let pointOfClick = event.clientY,
				positionOfStart = this.getBoundingClientRect().top,
				positionOfEnd = positionOfStart,
				width = this.offsetWidth + 4.5; //4.5 - gridgap ширина для "красивости" квадратные можно брат только ширину


		document.addEventListener('mousemove',  move = (event) => {
			dragging = true; //если перместили зажатой кнопке
			let newPos =  event.clientY - pointOfClick; //меняем местами - меняется сторона, ещё поменять laft/right
			if (newPos < 0 ) newPos = 0;
			if (newPos > width) newPos = width;
			positionOfEnd = this.getBoundingClientRect().top;
			this.style.top = newPos + 'px' //тут меняем что куда надо двигать
		});

		document.addEventListener('mouseup',  up = (event) => {
			if (-(positionOfStart - positionOfEnd) > 0.4*width) {
				counter++;
				this.style.position = 'static';
				this.style.top = 'auto';
				this.parentNode.insertBefore(empty, gems[emptyPos - difficult]);
				this.parentNode.insertBefore(this, gems[emptyPos + 1]);
				movesDisplay.innerText = counter;
				checkWin();
				Puzzle.properties.randMoves.push(+this.innerText);
				Puzzle.properties.snapShot.push(Array.from(document.querySelectorAll(".gem")).map(e => e.innerHTML).join("+"));
				if (Puzzle.properties.sound) {myAudio1.currentTime = 0; myAudio1.play()};
			}
			else {
				this.style.position = 'static';
				this.style.top = 'auto';
			}

			if (dragging) {
				stopClick = true;
				captureClick();
			}
			document.removeEventListener('mousemove', move);
			document.removeEventListener('mouseup', up);      	
			}) 
		}
	}

 	

	//---------------------------- функции клеток ---------------------------

	for (let i = 0; i < gems.length; i++) {
		gems[i].addEventListener('mousedown', leftDrag);
		gems[i].addEventListener('mousedown', rightDrag);
		gems[i].addEventListener('mousedown', topDrag);
		gems[i].addEventListener('mousedown', bottomDrag);
		gems[i].addEventListener('click', leftClick);
		gems[i].addEventListener('click', rightClick);
		gems[i].addEventListener('click', topClick);
		gems[i].addEventListener('click', bottomClick);
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
					localStorage.setItem(`save-${i}-startPos`, `${Puzzle.properties.snapShot[Puzzle.properties.snapShot.length - 1]}`);
					localStorage.setItem(`save-${i}-pictures`, `${Puzzle.properties.pictures}`);
					localStorage.setItem(`save-${i}-picturesNumber`, `${window.getComputedStyle(gems[1], null).getPropertyValue("background-image").match(/\d*(?=.jpg)/)}`);
					localStorage.setItem(`save-r-${i}-snap`,`${localStorage.getItem('save-4-snap')}`);
					localStorage.setItem(`save-r-${i}-startPos`,`${localStorage.getItem('save-4-startPos')}`);
					localStorage.setItem(`save-r-${i}-randMoves`,`${localStorage.getItem('save-4-randMoves')}`);
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

		//----кнопка растарт------------


		localStorage.setItem(`save-4-date`, `now`);
		localStorage.setItem(`save-4-moves`, `0`);
		localStorage.setItem(`save-4-timer`, `0`);
		localStorage.setItem(`save-4-difficult`, `${Puzzle.properties.difficult}`);
		localStorage.setItem(`save-4-pictures`, `${Puzzle.properties.pictures}`);
		Puzzle.properties.restartSlot !== false ? localStorage.setItem(`save-4-snap`, `${localStorage.getItem(`save-r-${Puzzle.properties.restartSlot}-snap`)}`) : localStorage.setItem(`save-4-snap`, `${Puzzle.properties.snapShot}`);
		Puzzle.properties.restartSlot !== false ? localStorage.setItem(`save-4-randMoves`, `${localStorage.getItem(`save-r-${Puzzle.properties.restartSlot}-randMoves`)}`) : localStorage.setItem(`save-4-randMoves`, `${Puzzle.properties.randMoves}`);
		Puzzle.properties.restartSlot !== false ? localStorage.setItem(`save-4-startPos`, `${localStorage.getItem(`save-r-${Puzzle.properties.restartSlot}-startPos`)}`)  : localStorage.setItem(`save-4-startPos`, `${Puzzle.properties.snapShot[Puzzle.properties.snapShot.length - 1]}`);
		


		 document.querySelector(".restart").addEventListener('click', function(){
		 	localStorage.setItem(`save-4-picturesNumber`, `${window.getComputedStyle(gems[1], null).getPropertyValue("background-image").match(/\d*(?=.jpg)/)}`);
			Puzzle.load(4, true)
		 });


		 //---кнопки звука ----



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

		window.addEventListener('resize', function(){
			if (window.screen.width < 850) {
				 document.getElementById("viewport").setAttribute("content", "width=830");

			} else  {
				document.getElementById("viewport").setAttribute("content", "width=device-width, initial-scale=1.0");
			}
		})
}
