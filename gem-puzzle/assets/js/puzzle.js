
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
    qty: 500,
    randMoves: [],
    finalRandMoves: [],
    startArr: []
  },

   init(num) {
    // this._getRand(num);
    // this._getSize(num);
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

  },

  _getStartPosition(num) {
  		for (let i = 1; i <= num; i++) {
		this.properties.startArr.push(i)
	}
  }, 

  _getMixed(num) {
  	//let arr = this.properties.startArr;
  	let empty = num;
	let emptyPos = this.properties.startArr.indexOf(empty);
	let mixedArr = this.properties.startArr.map(el => {
			if ((this.properties.startArr.indexOf(el) + Math.sqrt(num)) === this.properties.startArr.indexOf(empty) ||
			(this.properties.startArr.indexOf(el) - Math.sqrt(num)) === this.properties.startArr.indexOf(empty) ||
			(this.properties.startArr.indexOf(el) + 1) === this.properties.startArr.indexOf(empty) &&  (Math.ceil((this.properties.startArr.indexOf(el) + 1) / Math.sqrt(num)) === Math.ceil((this.properties.startArr.indexOf(empty) + 1) / Math.sqrt(num))) ||
			(this.properties.startArr.indexOf(el) - 1) === this.properties.startArr.indexOf(empty) &&  (Math.ceil((this.properties.startArr.indexOf(el) + 1) / Math.sqrt(num)) === Math.ceil((this.properties.startArr.indexOf(empty) + 1) / Math.sqrt(num)))) 
				return el
			}
		).filter(e => e)

		//console.log(`mixedARR ${mixedArr}`)

	let lastNum = this._getRandomIntInclusive(0, mixedArr.length - 1);

		//console.log(`lastNum ${lastNum}`)

	this.properties.randMoves.push(mixedArr[lastNum]) 

		//console.log(`randMoves ${randMoves}`)

	this.properties.startArr[this.properties.startArr.indexOf(this.properties.randMoves[this.properties.randMoves.length - 1])] = empty;
	this.properties.startArr[emptyPos] = this.properties.randMoves[this.properties.randMoves.length - 1];
	this.properties.qty--;

	if(this.properties.qty > 0) {this._getMixed(num)}
		else {
				for (let i = 0; i < this.properties.randMoves.length; i++) {
				if (this.properties.randMoves[i] !== this.properties.randMoves[i - 1]) this.properties.finalRandMoves.push(this.properties.randMoves[i])
			}
		}
  },


 	_getRandomIntInclusive(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min; 
	},

	// _getSize(num) {
	// 	for (var i = 1; i <= num; i++) {
	// 		this.properties.arrRandomNum.push(i)
	// 	}
	// },



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


	_createGems(num) {
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
	 }
}

//module.exports = {Puzzle}