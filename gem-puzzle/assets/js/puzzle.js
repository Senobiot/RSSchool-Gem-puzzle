
const Puzzle = {
  elements: {
  	//если чего-нибудь вставлю не null, лучше в середину и поправить функуию reset()
  	menuBtns: ["New game", "load Saved game", "High Scores"],
  	title: null,
  	menu: null,
  	sizes: null,
  	savesMainMenu: null, 
    puzzle: null,
    controlPanel: null,
    leadersPanel: null,
    moves: null,
    timer: null,
    solutionBtn: null,
    leadersBtn: null,
    backToMenu: null,
    saveBtn: null,
    saveSlot1: null,
    saveSlot2: null,
    saveSlot3: null,
    loadSlot1: null,
    loadSlot2: null,
    loadSlot3: null,
    loadBtn: null,
    gems: []
  },

   properties: {
   	//если чего-нибудь вставлю не null, лучше в середину и поправить функуию reset()
   	size: ["child : 3 x 3", "novice : 4 x 4", "Apprentice : 5 x 5", "Adept : 6 x 6", "Expert : 7 x 7", "Master : 8 x 8", "pictures instead of numbers: ","back to menu"],
   	difficult: 3,
    time: -1,
    qty: 0,
    randMoves: [],
    finalRandMoves: [],
    snapShot: [],
    finalSnapshot: [],
    startArr: [],
    doubles: false,
    solution: false,
    keys: [],
    turn: 0,
    animation: false,
    pictures: 1,
    reset: false
  },

  	start() {
  		 this.elements.title = document.createElement("div");
  		 this.elements.menu = document.createElement("div");
  		 this.elements.sizes = document.createElement("div");
  		 
  		 this.elements.savesMainMenu = document.createElement("div");
  		 this.elements.title.classList.add("title");
  		 this.elements.title.textContent = "The Puzzle Game";
  		 this.elements.menu.classList.add("menu");
  		 this.elements.sizes.classList.add("sizes",  "inactive");
  		 this.elements.savesMainMenu.classList.add("savesMainMenu",  "inactive");
  		 
  		 this._createLeaders(3);
  		 this.elements.menu.appendChild(this._createMenu());
  		 this.elements.sizes.appendChild(this._createSizes());
  		 this.elements.savesMainMenu.appendChild(this._createSaves());
  		 document.body.appendChild(this.elements.title);
  		 document.body.appendChild(this.elements.menu);
  		 document.body.appendChild(this.elements.sizes);
  		 document.body.appendChild(this.elements.savesMainMenu);
  		 // document.body.appendChild(this.elements.leadersPanel);
  	},

  	reset(workingTimer) {
  		for (let i = 1; i <= this.elements.length - 1; i++) {
  			if (i === this.elements.length - 1) {this.elements[i] = []}
  			else{this.elements[i] = null;}
  		}
  		this.properties.time = -1;
  		this.properties.qty = 0;
  		this.properties.randMoves = [];
  		this.properties.finalRandMoves = [];
  		this.properties.snapShot = [];
  		this.properties.startArr = [];
  		this.properties.finalSnapshot = [];
  		this.properties.doubles = false;
  		this.properties.solution = false;
  		this.properties.keys = [];
  		this.properties.turn = 0;
  		this.properties.animation = false;
  		this.properties.pictures = 1;
 		if (workingTimer) this.properties.reset = true;

  	},

  	load(i, workingTimer) {
  		document.body.style.transform = "scale(0)";
		setTimeout(() => {
			
		while (document.body.firstChild) {
    		document.body.removeChild(document.body.firstChild);
		}
		document.body.style.transform = "scale(1)";
			if (workingTimer) {this.reset(true)}
				else {this.reset(false)};
			this.elements.title = document.createElement("div");
			this.elements.title.classList.add("title");
			this.elements.title.textContent = "The Puzzle Game";
			document.body.appendChild(this.elements.title);
			this.properties.difficult = +localStorage.getItem(`save-${i}-difficult`);
			this.properties.snapShot = localStorage.getItem(`save-${i}-snap`).split(",");
			this.properties.randMoves = localStorage.getItem(`save-${i}-randMoves`).split(",").map(Number);
			this.properties.time = +localStorage.getItem(`save-${i}-timer`);
			this.properties.startArr = localStorage.getItem(`save-${i}-startPos`).split("+").map(Number);
			this.properties.pictures = +localStorage.getItem(`save-${i}-pictures`);


			this.init(Math.pow(this.properties.difficult, 2), true, i)

		}, 500)
  	},

	init(num, loaded, i) {
		if (!loaded) {this.properties.qty = num*10}; //решил, что столько рандомных перемещений достаточно 
		if (!loaded) {this._getStartPosition(num)}; //нарисуем начальное положенин
		if (!loaded) {this._getMixed(num)}; // перемешивает
		this.elements.puzzle = document.createElement("div");
		this.elements.moves = document.createElement("div");
		this.elements.timer = document.createElement("div");
		this.elements.leadersBtn = document.createElement("button");
		this.elements.solutionBtn = document.createElement("button");
		this.elements.backToMenu = document.createElement("button");
		this.elements.saveBtn = document.createElement("button");
		this.elements.saveSlot1 = document.createElement("button");
		this.elements.saveSlot2 = document.createElement("button");
		this.elements.saveSlot3 = document.createElement("button");
		this.elements.loadBtn = document.createElement("button");
		this.elements.loadSlot1 = document.createElement("button")
		this.elements.loadSlot2 = document.createElement("button")
		this.elements.loadSlot3 = document.createElement("button")
		this.elements.controlPanel = document.createElement("div");
		this.elements.leadersPanel = document.createElement("div");
		

  		this.elements.solutionBtn.innerText = "solution";
  		this.elements.leadersBtn.innerText = "leaders";
  		this.elements.backToMenu.innerText = "to menu";
  		this.elements.saveBtn.innerText = "save";
  		this.elements.saveSlot1.innerText = localStorage.getItem('save-0-date') ? localStorage.getItem('save-0-date') :	"slot 1";
  		this.elements.saveSlot2.innerText = localStorage.getItem('save-1-date') ? localStorage.getItem('save-1-date') :	"slot 2";
  		this.elements.saveSlot3.innerText = localStorage.getItem('save-2-date') ? localStorage.getItem('save-2-date') :	"slot 3";
  		this.elements.loadBtn.innerText = "load";
  		this.elements.loadSlot1.innerText = localStorage.getItem('save-0-date') ? localStorage.getItem('save-0-date') :	"slot 1";
  		this.elements.loadSlot2.innerText = localStorage.getItem('save-1-date') ? localStorage.getItem('save-1-date') :	"slot 2";
  		this.elements.loadSlot3.innerText = localStorage.getItem('save-2-date') ? localStorage.getItem('save-2-date') :	"slot 3";

  		this.elements.solutionBtn.classList.add("solutionBtn");
  		this.elements.backToMenu.classList.add("backBtn");
  		this.elements.saveBtn.classList.add("saveBtn");
  		this.elements.saveSlot1.classList.add("saveSlot");
  		this.elements.saveSlot2.classList.add("saveSlot");
  		this.elements.saveSlot3.classList.add("saveSlot");
  		this.elements.loadBtn.classList.add("loadBtn");
  		this.elements.loadSlot1.classList.add("loadSlot");
  		this.elements.loadSlot2.classList.add("loadSlot");
  		this.elements.loadSlot3.classList.add("loadSlot");

		this.elements.puzzle.classList.add("puzzle");
		this.elements.moves.classList.add("moves");
		this.elements.timer.classList.add("timer");
		this.elements.leadersBtn.classList.add("leadersBtn");
		this.elements.controlPanel.classList.add("controlPanel");


		this.elements.puzzle.appendChild(this._createGems(num));
		this.elements.controlPanel.appendChild(this.elements.moves);
		this.elements.controlPanel.appendChild(this.elements.timer);
		this.elements.controlPanel.appendChild(this.elements.backToMenu);
		this.elements.controlPanel.appendChild(this.elements.saveBtn);
		this.elements.controlPanel.appendChild(this.elements.saveSlot1);
		this.elements.controlPanel.appendChild(this.elements.saveSlot2);
		this.elements.controlPanel.appendChild(this.elements.saveSlot3);
		this.elements.controlPanel.appendChild(this.elements.loadBtn);
		this.elements.controlPanel.appendChild(this.elements.loadSlot1);
		this.elements.controlPanel.appendChild(this.elements.loadSlot2);
		this.elements.controlPanel.appendChild(this.elements.loadSlot3);
		this.elements.controlPanel.appendChild(this.elements.leadersBtn);
		this.elements.controlPanel.appendChild(this.elements.solutionBtn);

		this.elements.gems = this.elements.puzzle.querySelectorAll(".gem");

		document.body.appendChild(this.elements.puzzle);
		document.body.appendChild(this.elements.controlPanel);
		if (!loaded) {this.elements.moves.textContent = "0"
		} else {this.elements.moves.textContent = localStorage.getItem('save-0-moves')};
		this._createLeaders(3);
		this._createPopup();
		this._puzzleSize();
		this._showTime();
		getClickEvents(num);
		document.querySelector(".controlPanel").classList.add("active");
		this._getKeys();
		if (this.properties.pictures === 1 && !loaded) {this._createPictureTiles()};
		if (loaded && this.properties.pictures === 1) {this._createPictureTiles(localStorage.getItem(`save-${i}-picturesNumber`))};
		if (loaded && this.properties.pictures === 0) {this._createPictureTiles(null)};

		document.querySelector(".solutionBtn").addEventListener('click', function () {
			Puzzle.properties.solution = true;
			Puzzle._findOptimal();
			setTimeout(()=>{
				// добавим количество ходов игрока
		 		Puzzle.properties.turn = Puzzle.properties.randMoves.length - 1;
				Puzzle._showSolution ()
			}, 1000)	
		})
  },


  _createMenu() {
  		const fragment = document.createDocumentFragment();

		 this.elements.menuBtns.forEach(item => {
		  		const menuElement = document.createElement("div");
		  		menuElement.textContent = item;	
		  	fragment.appendChild(menuElement);
		  	if (this.elements.menuBtns.indexOf(item) === 0) {
		  		menuElement.addEventListener('click', ()=> {
		  			this.elements.menu.classList.add("inactive")
		  			setTimeout(()=> {
		  				this.elements.menu.style.display = "none";
		  				this.elements.sizes.classList.remove("inactive");
		  			}, 600)
		  			
		  		})
		  	} else if (this.elements.menuBtns.indexOf(item) === 1) {
		  		//проверим есть ли сохранёнки
		  		if (localStorage.getItem(`save-0-date`) ||
		  			localStorage.getItem(`save-1-date`) ||
		  			localStorage.getItem(`save-2-date`)) {
		  				menuElement.addEventListener('click', ()=> {
				  			this.elements.menu.classList.add("inactive")
				  			setTimeout(()=> {
			  				this.elements.menu.style.display = "none";
			  				this.elements.sizes.style.display = "none";
			  				this.elements.savesMainMenu.classList.remove("inactive");
			  			}, 600)	
		  			})
		  		} else {		  			
		  			menuElement.addEventListener('click', ()=> {
		  				let text = menuElement.textContent;
		  				menuElement.textContent = "No Saved games yet";
		  				menuElement.style.color = "#d66e6e";
		  				setTimeout(()=> {
		  					menuElement.textContent = text;
		  					menuElement.style.color = "#f1ebe5";
		  				}, 2000)
		  			})		  			
		  		}
		  	}	else {menuElement.addEventListener('click', ()=> {
		  		document.querySelector(".leadersPanel").classList.remove("inactive");
		  		}) 		
		  	}
		 })
	  	return fragment
  },

    _createSizes() {
  		const fragment = document.createDocumentFragment();

		 this.properties.size.forEach(item => {
		  		const menuElement = document.createElement("div");
		  		menuElement.textContent = item;	
		  	fragment.appendChild(menuElement);
		  	//скрываем по нажатию на любой выбор
		  	  	menuElement.addEventListener('click', ()=> {
		  	  		if (this.properties.size.indexOf(item) === 6) {
		  	  			menuElement.classList.toggle("active");
		  	  		}
		  	  		else if (this.properties.size.indexOf(item) === 7) {
		  	  			document.body.style.transform = "scale(0)";
		  				setTimeout(() => {
		  					while (document.body.firstChild) {document.body.removeChild(document.body.firstChild)};
							document.body.style.transform = "scale(1)";
							Puzzle.reset()
							Puzzle.start();
						}, 500);
		  	  		} else {
		  	  			this.elements.sizes.classList.add("inactive")
		  				setTimeout(()=> {
			  				this.elements.sizes.style.display = "none";
			  				this.elements.savesMainMenu.style.display = "none";
			  				this.init(Math.pow(this.properties.difficult, 2));
		  				}, 600)
		  	  		}
		  		})

		  	//ставим параметр сложности
		  	this.properties.size.indexOf(item) === 0 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 3 }):
		  	this.properties.size.indexOf(item) === 1 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 4 }):
		  	this.properties.size.indexOf(item) === 2 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 6 }):
		  	this.properties.size.indexOf(item) === 3 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 6 }):
		  	this.properties.size.indexOf(item) === 4 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 7 }):
		  	this.properties.size.indexOf(item) === 5 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 8 }):
		  	this.properties.size.indexOf(item) === 6 ? menuElement.addEventListener('click', ()=> {this.properties.pictures === 1 ? this.properties.pictures = 0 : this.properties.pictures = 1 }):
		  	menuElement.style.color = "#d66e6e";
		  	
		  	})
	  	return fragment
  },
    _createSaves() {
  		const fragment = document.createDocumentFragment();

  		for (let j = 0; j <= 2; j++) {
		  		const menuElement = document.createElement("div");
		  		menuElement.textContent = localStorage.getItem(`save-${j}-date`) ? localStorage.getItem(`save-${j}-date`) : `slot ${j}`;	
		  		menuElement.classList.add("savesMainMenuSlot");
			  	fragment.appendChild(menuElement);
			  	menuElement.addEventListener('click', ()=> {
			  		//тут чтобы неактивные пустые сейвы
			  		if (localStorage.getItem(`save-${j}-date`)) {
			  			this.elements.savesMainMenu.classList.add("inactive")
			  			this.elements.sizes.style.display = "none";
				  		this.load(j, false);
			  		}

			  	})
  		}
  		const backBtn = document.createElement("div");
	  		backBtn.textContent = "back to menu";
	  		backBtn.style.color = "#d66e6e";
	  		backBtn.addEventListener('click', ()=> {
				document.body.style.transform = "scale(0)";
		  		setTimeout(() => {
		  			while (document.body.firstChild) {document.body.removeChild(document.body.firstChild)};
					document.body.style.transform = "scale(1)";
					Puzzle.reset()
					Puzzle.start();
					}, 500);
  			});

	  		fragment.appendChild(backBtn);


	  	return fragment
  },

  _createLeaders(diff, open) {
  	const fragment = document.createDocumentFragment();
  	let leadersTitle = document.createElement("div");
	leadersTitle.classList.add("leadersTitle")
	leadersTitle.textContent = "3x3 top 10 gamers"
	fragment.appendChild(leadersTitle);


  	let leadersDifficultiesBtns = document.createElement("div");
  	leadersDifficultiesBtns.classList.add("leadersDifficultiesBtns")
  	let difficulties = ["3x3", "4x4", "5x5", "6x6", "7x7", "8x8"];
  		for (let i = 0; i <= difficulties.length - 1; i++) {
		  		const menuElement = document.createElement("div");
		  		menuElement.classList.add("leadersDifficulties");
		  		menuElement.textContent = difficulties[i];
			  	menuElement.addEventListener('click', ()=> {
			  		document.querySelector(".leadersPanel").remove();	
			  		this.elements.leadersPanel = null;
			  		this._createLeaders(difficulties[i].slice(0,1), true)
			  		document.querySelector(".leadersTitle").textContent = difficulties[i] +  " top 10 gamers";
			  	})
			  	leadersDifficultiesBtns.appendChild(menuElement);
  		}

  		fragment.appendChild(leadersDifficultiesBtns);

  	let leadersHeader = document.createElement("div");	
  		leadersHeader.classList.add("leadersHeader")
		for (let i = 0; i <= 3; i++) {
		  		const menuElement = document.createElement("div");
		  		i === 0 ? menuElement.textContent = "Pos":
		  		i === 1 ? menuElement.textContent = "moves":
		  		i === 2 ? menuElement.textContent = "time":
		  		menuElement.textContent = "name";
			  	leadersHeader.appendChild(menuElement);
  		}

  		fragment.appendChild(leadersHeader);


  	let leadersGrid = document.createElement("div");
  		leadersGrid.classList.add("leadersGrid");
  	let arrayOfLeaders = JSON.parse(localStorage.getItem(`leadD${diff}`));

  		for (let i = 0; i < 10 ; i++) {
  			const menuElement = document.createElement("div");
  			menuElement.classList.add("leader");
	  		for (let j = 1; j <= 4; j++) {
	  			let cell = document.createElement("div");
	  			if (j === 1) cell.textContent = `${i + 1}`;
	  			if (j === 2) {
	  				if (arrayOfLeaders !== null && arrayOfLeaders[i]) {cell.textContent = arrayOfLeaders[i].moves;
	  				} else {cell.textContent = 999};
	  			} 
	  			if (j === 3) {
	  				if (arrayOfLeaders !== null && arrayOfLeaders[i]) {cell.textContent = arrayOfLeaders[i].time;
	  				} else {cell.textContent = 999};
	  			} 
	  			if (j === 4) {
	  				if (arrayOfLeaders !== null && arrayOfLeaders[i]) {cell.textContent = arrayOfLeaders[i].name;
	  				} else {cell.textContent = "computer"};
	  			} 

	  			menuElement.appendChild(cell);
	  		}
	  		leadersGrid.appendChild(menuElement);
  		}

  		fragment.appendChild(leadersGrid)

  		let leadersCloseBtn = document.createElement("div");
  		leadersCloseBtn.classList.add("leadersCloseBtn");
  		leadersCloseBtn.addEventListener('click', ()=> {
  			this.elements.leadersPanel.classList.add("leadersPanel", "inactive");
  		})


		fragment.appendChild(leadersCloseBtn);

		this.elements.leadersPanel = document.createElement("div");
		if (open) {this.elements.leadersPanel.classList.add("leadersPanel")}
			else {this.elements.leadersPanel.classList.add("leadersPanel", "inactive")};
		this.elements.leadersPanel.appendChild(fragment);
		document.body.appendChild(this.elements.leadersPanel);

  	},

  	_createPopup() {
  		let winPopup = document.createElement("div"),
			winPopupTitle = document.createElement("div"),
			winPopupMoves = document.createElement("div"),
			winPopupTime = document.createElement("div"),
			winPopupName = document.createElement("div"),
			winPopupSubmit = document.createElement("button");
			winPopupCloseBtn = document.createElement("button");

		winPopup.classList.add("winPopup", "inactive");
		winPopupTitle.classList.add("winPopupTitle");	
		winPopupMoves.classList.add("winPopupMoves");	
		winPopupTime.classList.add("winPopupTime");	
		winPopupName.classList.add("winPopupName");	
		winPopupSubmit.classList.add("winPopupSubmit");	
		winPopupCloseBtn.classList.add("winPopupCloseBtn");	

		winPopupName.setAttribute("contenteditable", true);
		winPopupSubmit.innerText = "remember me";

		winPopupTitle.innerText = "congratulations! you win!"	
		winPopupName.innerText = "enter your name for history"	
		winPopupMoves.innerText = "number of moves: "	
		winPopupTime.innerText = "your time is: "	

		winPopup.appendChild(winPopupTitle);
		winPopup.appendChild(winPopupMoves);
		winPopup.appendChild(winPopupTime);
		winPopup.appendChild(winPopupName);
		winPopup.appendChild(winPopupSubmit);
		winPopup.appendChild(winPopupCloseBtn);
	
		document.body.appendChild(winPopup);
  	},

  _createPictureTiles(pictureLoaded) {
  		let tiles = this.elements.keys;
  			// let percent = (100 / Math.sqrt(tiles.length)).toFixed(4)
  			let percent = 100;
  			let x = 0,y = 0;
  			let picNum = this._getRandomIntInclusive(1, 20);
  		for (let i = 0; i < tiles.length; i++) {
  			if (pictureLoaded) {
  				tiles[i].style.backgroundImage = `url("assets/images/tiles/${pictureLoaded}.jpg")`
  			}
  			else if (pictureLoaded === null) {}
  			else {tiles[i].style.backgroundImage = `url("assets/images/tiles/${picNum}.jpg")`}
  			tiles[i].style.backgroundSize = `${100*Math.sqrt(tiles.length)}px ${100*Math.sqrt(tiles.length)}px`;
  			tiles[i].style.backgroundPosition  = `-${percent*x}px -${percent*y}px`;
  			x++;
  			if (x % Math.sqrt(tiles.length) === 0) {
  				x = 0;
  				y++;
  			};
  		}
  },

  _getStartPosition(num) {
  	//тут просто исходный массив нужной размерности, который мы будем перемешивать
  		for (let i = 1; i <= num; i++) {
		this.properties.startArr.push(i)
	}
  }, 

  _getMixed(num) {
  	//тут функция перемешивания начального массива
  	let empty = num; //пустая клетка всегда равна параметру num, т.е. размерности поля
	let emptyPos = this.properties.startArr.indexOf(empty); //определяем индекс пустышки каждый раз

	let mixedArr = this.properties.startArr.map(el => {
		//тут мы каждый раз находим массив клеток, на которые можем кликнуть, в зависимости от положения пустышки
			if ((this.properties.startArr.indexOf(el) + Math.sqrt(num)) === this.properties.startArr.indexOf(empty) ||
			(this.properties.startArr.indexOf(el) - Math.sqrt(num)) === this.properties.startArr.indexOf(empty) ||
			(this.properties.startArr.indexOf(el) + 1) === this.properties.startArr.indexOf(empty) &&  (Math.ceil((this.properties.startArr.indexOf(el) + 1) / Math.sqrt(num)) === Math.ceil((this.properties.startArr.indexOf(empty) + 1) / Math.sqrt(num))) ||
			(this.properties.startArr.indexOf(el) - 1) === this.properties.startArr.indexOf(empty) &&  (Math.ceil((this.properties.startArr.indexOf(el) + 1) / Math.sqrt(num)) === Math.ceil((this.properties.startArr.indexOf(empty) + 1) / Math.sqrt(num)))) 
				return el
			}
		).filter(e => e)

	// клеток, на которые можем кликнуть, всегда от 2 до 4, находим нужное случайное число 0-1 / 0-3 ...
	//потом мы lastNum используем как индекс в массивк клеток, на которые можем кликнуть
	let lastNum = this._getRandomIntInclusive(0, mixedArr.length - 1);


	if (this.properties.randMoves[this.properties.randMoves.length - 1] !== mixedArr[lastNum]) {
		//тут проверяем, если такая кнопка уже есть в randMoves, перезапускаем функцию в else
		//если нет, добавляем её в конец randMoves, записывая как-бы ход
		this.properties.randMoves.push(mixedArr[lastNum])
		//тепепеь в нашем стартовом массиве нужно сделать перестановку, в соответствии с ходом
		this.properties.startArr[this.properties.startArr.indexOf(this.properties.randMoves[this.properties.randMoves.length - 1])] = empty;
		this.properties.startArr[emptyPos] = this.properties.randMoves[this.properties.randMoves.length - 1];
		//тут делаем снимок положения поля, для возможности ускорении показа решения
		this.properties.snapShot.push(this.properties.startArr.join("+"))
		this.properties.qty--;
	}
	else {this._getMixed(num)}

	if(this.properties.qty > 0) {this._getMixed(num)}
		else {
			//тут находим количество ходов, сделанных с начала, по сути только для читаемости в след функциях
			// this.properties.turn = this.properties.randMoves.length - 1;
		}
  },

 	_getRandomIntInclusive(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min; 
	},


	_createGems(num) {
		//тут формирует кнопки
	  	const fragment = document.createDocumentFragment();

		  this.properties.startArr.forEach(item => {
		  		const gemElement = document.createElement("div");
		  		gemElement.classList.add("gem");
		  		if (item !== this.properties.startArr.length) gemElement.textContent = item;
		  		else {gemElement.classList.add("empty");
		  		gemElement.textContent = item;}
				
			  	fragment.appendChild(gemElement);

		  	})
	  	return fragment
	 },

	_puzzleSize() {
		this.elements.puzzle.style.width = `${this.properties.difficult*100}px`;
		this.elements.puzzle.style.height = `${this.properties.difficult*100}px`;
		this.elements.puzzle.style.gridTemplateColumns = `repeat(${this.properties.difficult}, 1fr)`;
	},

	_showTime() {	
		if (this.properties.reset) {
			this.properties.reset = false;
			return};
		this.properties.time++;
		let hour = Math.floor(this.properties.time / 3600),
		min = Math.floor((this.properties.time - hour*3600) / 60);
		second = this.properties.time % 60;
		if (hour < 10) {hour = "0" + hour}
		if (second < 10) {second = "0" + second}
		if (min < 10) {min = "0" + min}
		this.elements.timer.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${second}`;

		setTimeout(()=> {this._showTime()}, 1000)
	},


	 _getKeys() {
	 	//тут строим массив из кнопок, сортируем, чтобы каждый стоял под своим индексом для ускорения вызова клика
	 	this.elements.keys = Array.from(document.querySelectorAll(".gem")).sort(function (a, b) {
  			if (+a.innerHTML > +b.innerHTML) {
    		return 1;
  			}
  			if (+a.innerHTML < +b.innerHTML) {
    		return -1;
  			}
  			return 0;
		})
	 },

	 _findOptimal () {
	 	let start ,end;
	 	let i = this.properties.snapShot.length - 1;
	 	//найдет повторные снимки в snapShot - должно обрезать между ними ходы
	 	while (i > 0) {
	 		if (this.properties.snapShot.indexOf(this.properties.snapShot[i]) !== i) 
	 		{
	 			start = this.properties.snapShot.indexOf(this.properties.snapShot[i]);
	 			end = i;
	 			this.properties.doubles = true;
	 			 break;}
	 			 i--;
	 		}
	 		if (this.properties.doubles) {
	 			console.log(`start ${start}`)
	 			console.log(`end ${end}`)
 		 		this.properties.finalSnapshot = this.properties.snapShot.slice(0, start + 1)
 				this.properties.snapShot = this.properties.finalSnapshot.concat(this.properties.snapShot.slice(end + 1))

	 			this.properties.finalRandMoves = this.properties.randMoves.slice(0, start + 1)
	 			this.properties.randMoves = this.properties.finalRandMoves.concat(this.properties.randMoves.slice(end + 1));
				this.properties.doubles = false;
				
				this._findOptimal()
				
	 		} 
	 },

	 _showSolution (){ 
	 	//тут просто читаем с конца randMoves и эумлируем клик по нужной кнопке
		setTimeout(() => {
			if (!this.properties.animation) {
				this.elements.keys[this.properties.randMoves[this.properties.turn] - 1].click()
				this.properties.turn--;
					if (this.properties.turn >= 0) {this._showSolution()}}
						else {this._showSolution()}
		}, 500)
	}
}

//module.exports = {Puzzle}

























// 	_getRand (num) {
	// 	if (this.properties.arrRandomNum.length < num) {
	// 		let number = this._getRandomIntInclusive(1, num);
	// 		if (this.properties.arrRandomNum.includes(number)) {
	// 			this._getRand(num)
	// 		} else {
	// 			this.properties.arrRandomNum.push(number);
	// 			this._getRand(num)}
	// 	} else { this._solutionCheck(num) }
	// },

	// _solutionCheck (num) {
		//тут проверка на решаемость, но она работает только для 4*4
	// 	let checkNum = 0,
	// 	array = this.properties.arrRandomNum;
	// 	for (let i = 0; i < array.length; i++) {
	// 		if (array[i] !== array.length) {
	// 			for (let j = i; j < array.length; j++) {
	// 		 		if (array[j+1] < array[i] ) checkNum++;
	// 			 }
	// 		} 
	// 	}
	// 	let empty = array.indexOf(array.length);
	// 	let emptyOrder = Math.ceil((empty + 1) / Math.sqrt(array.length))
	// 	checkNum += emptyOrder;
	// 	if (checkNum % 2 === 0) {console.log("ok"); console.log(checkNum)}
	// 	// if (checkNum % 2 === 0 && array.length % 2 === 0) {console.log("ok"); console.log(checkNum)}
	// 	// else if (checkNum % 2 !== 0 && array.length % 2 !== 0) {console.log("ok"); console.log(checkNum)}
	// 	else {
	// 		this.properties.arrRandomNum = [];
	// 		this._getRand(num);
	// 	}
	// },