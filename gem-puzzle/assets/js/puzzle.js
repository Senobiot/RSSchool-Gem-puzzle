
const Puzzle = {
  elements: {
  	title: null,
  	menu: null,
  	menuBtns: ["New game", "Choose Field-Size", "Saves", "High Scores"],
  	sizes: null, 
    puzzle: null,
    controlPanel: null,
    leadersPanel: null,
    moves: null,
    timer: null,
    solutionBtn: null,
    leadersBtn: null,
    backToMenu: null,
    saveBtn: null,
    loadBtn: null,
    gems: []
  },

   properties: {
   	//scores: 0,
   	size: ["child : 3 x 3", "novice : 4 x 4", "Apprentice : 5 x 5", "Adept : 6 x 6", "Expert : 7 x 7", "Master : 8 x 8"],
   	difficult: 3,
    time: -1,
    qty: 0,
    randMoves: [],
    finalRandMoves: [],
    snapShot: [],
    finalSnapshot: [],
    startArr: [],
    doubles: false,
    keys: [],
    turn: 0,
    animation: false
  },

  	start() {
  		 this.elements.title = document.createElement("div");
  		 this.elements.menu = document.createElement("div");
  		 this.elements.sizes = document.createElement("div");
  		 this.elements.title.classList.add("title");
  		 this.elements.title.textContent = "The Puzzle Game";
  		 this.elements.menu.classList.add("menu");
  		 this.elements.sizes.classList.add("sizes",  "inactive");
  		 this.elements.menu.appendChild(this._createMenu());
  		 this.elements.sizes.appendChild(this._createSizes());
  		 document.body.appendChild(this.elements.title);
  		 document.body.appendChild(this.elements.menu);
  		 document.body.appendChild(this.elements.sizes);
  	},

	init(num) {
		this.properties.qty = num*10 //решил, что столько рандомных перемещений достаточно 
		this._getStartPosition(num); //нарисуем начальное положенин
		this._getMixed(num); // перемешивает
		this.elements.puzzle = document.createElement("div");
		this.elements.moves = document.createElement("div");
		this.elements.timer = document.createElement("div");
		this.elements.leadersBtn = document.createElement("button");
		this.elements.solutionBtn = document.createElement("button");
		this.elements.backToMenu = document.createElement("button");
		this.elements.saveBtn = document.createElement("button");
		this.elements.loadBtn = document.createElement("button");
		this.elements.controlPanel = document.createElement("div");
		this.elements.leadersPanel = document.createElement("div");

  		this.elements.solutionBtn.innerText = "solution";
  		this.elements.leadersBtn.innerText = "leaders";
  		this.elements.backToMenu.innerText = "to menu";
  		this.elements.saveBtn.innerText = "save";
  		this.elements.loadBtn.innerText = "load";

  		this.elements.solutionBtn.classList.add("solutionBtn");
  		this.elements.solutionBtn.classList.add("leadersBtn");
  		this.elements.backToMenu.classList.add("backBtn");
  		this.elements.saveBtn.classList.add("saveBtn");
  		this.elements.loadBtn.classList.add("saveBtn");
		this.elements.puzzle.classList.add("puzzle");
		this.elements.moves.classList.add("moves");
		this.elements.timer.classList.add("timer");
		this.elements.leadersBtn.classList.add("leadersBtn");
		this.elements.controlPanel.classList.add("controlPanel");
		this.elements.leadersPanel.classList.add("leaders");

		this.elements.puzzle.appendChild(this._createGems(num));
		this.elements.controlPanel.appendChild(this.elements.moves);
		this.elements.controlPanel.appendChild(this.elements.timer);
		this.elements.controlPanel.appendChild(this.elements.backToMenu);
		this.elements.controlPanel.appendChild(this.elements.saveBtn);
		this.elements.controlPanel.appendChild(this.elements.loadBtn);
		this.elements.controlPanel.appendChild(this.elements.leadersBtn);
		this.elements.controlPanel.appendChild(this.elements.solutionBtn);

		this.elements.gems = this.elements.puzzle.querySelectorAll(".gem");

		document.body.appendChild(this.elements.puzzle);
		document.body.appendChild(this.elements.controlPanel);
		this.elements.moves.textContent = "0";
		this._puzzleSize();
		this._showTime();
		getClickEvents();
		document.querySelector(".controlPanel").classList.add("active");
		this._getKeys();
		document.querySelector(".solutionBtn").addEventListener('click', function () {
			
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
		  	}
		  	})
	  	return fragment
  },

    _createSizes() {
    	//
  		const fragment = document.createDocumentFragment();

		 this.properties.size.forEach(item => {
		  		const menuElement = document.createElement("div");
		  		menuElement.textContent = item;	
		  	fragment.appendChild(menuElement);
		  	//скрываем по нажатию на любой выбор
		  	menuElement.addEventListener('click', ()=> {
		  			this.elements.sizes.classList.add("inactive")
		  			setTimeout(()=> {
		  				this.elements.sizes.style.display = "none";
		  				this.init(Math.pow(this.properties.difficult, 2));
		  			}, 600)

		  		})
		  	//ставим параметр сложности
		  	this.properties.size.indexOf(item) === 0 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 3;}):
		  	this.properties.size.indexOf(item) === 1 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 4;}):
		  	this.properties.size.indexOf(item) === 2 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 6;}):
		  	this.properties.size.indexOf(item) === 3 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 6;}):
		  	this.properties.size.indexOf(item) === 4 ? menuElement.addEventListener('click', ()=> {this.properties.difficult = 7;}):
		  	menuElement.addEventListener('click', ()=> {this.properties.difficult = 8});
		  	
		  	})
	  	return fragment
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
		if (document.body.classList.contains("block")) return;
		Puzzle.properties.time++;
		let hour = Math.floor(Puzzle.properties.time / 3600),
		min = Math.floor((Puzzle.properties.time - hour*3600) / 60);
		second = Puzzle.properties.time % 60;
		if (hour < 10) {hour = "0" + hour}
		if (second < 10) {second = "0" + second}
		if (min < 10) {min = "0" + min}
		Puzzle.elements.timer.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${second}`;

		setTimeout(Puzzle._showTime, 1000)
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