
const Puzzle = {
  elements: {
    puzzle: null,
    statistic: null,
    moves: null,
    timer: null,
    gems: []
  },

   properties: {
    time: 0,
    qty: 0,
    randMoves: [],
    finalRandMoves: [],
    snapShot: [],
    finalSnapshot: [],
    startArr: [],
    keys: [],
    turn: 0,
  },

   init(num) {
   	this.properties.qty = num*10 //решил, что столько рандомных перемещений достаточно 
    this._getStartPosition(num);
    this._getMixed(num);
    this.elements.puzzle = document.createElement("div");
    this.elements.statistic = document.createElement("div");
    this.elements.moves = document.createElement("div");
    this.elements.timer = document.createElement("div");

    this.elements.puzzle.classList.add("puzzle");
    this.elements.statistic.classList.add("statistic");
    this.elements.moves.classList.add("moves");
    this.elements.moves.innertText = '0';
    this.elements.timer.classList.add("timer");

    this.elements.puzzle.appendChild(this._createGems(num));
	this.elements.statistic.appendChild(this.elements.moves);
	this.elements.statistic.appendChild(this.elements.timer);
    this.elements.gems = this.elements.puzzle.querySelectorAll(".gem");
    
    document.body.appendChild(this.elements.puzzle);
    document.body.appendChild(this.elements.statistic);
    document.querySelector(".solution").classList.add("active");
    document.querySelector(".solution").addEventListener('click', function () {
    	this._getKeys();
    	setTimeout(()=>{
    		this._showSolution ()
    	}, 150)	
    })

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
			this.properties.turn = this.properties.randMoves.length - 1;
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
		  		gemElement.textContent = item;
		  	}
		  		
		  	fragment.appendChild(gemElement);

		  	})
	  	return fragment
	 },

	 _getKeys() {
	 	//тут строим массив из кнопок, сортируем, чтобы каждый стоял под своим индексом для упрощения вызова клика
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

	 _showSolution (){ 
	 	//тут просто читаем с конца randMoves и эумлируем клик по нужной кнопке
		setTimeout(() => {
			this.elements.keys[this.properties.randMoves[this.properties.turn] - 1].click()
					this.properties.turn--;
					if (this.properties.turn >= 0) {this._showSolution()}
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