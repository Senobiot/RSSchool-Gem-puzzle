
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
    arrRandomNum: []
  },

   init(num) {
    this._getRand(num);
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


 	_getRandomIntInclusive(min, max) {
  		return Math.floor(Math.random() * (max - min + 1)) + min; 
	},

 	_getRand (num) {
		if (this.properties.arrRandomNum.length < num) {
			let number = this._getRandomIntInclusive(1, num);
			if (this.properties.arrRandomNum.includes(number)) {
				this._getRand(num)
			} else {
				this.properties.arrRandomNum.push(number);
				this._getRand(num)}
		} else { this._solutionCheck(num) }
	},

	_solutionCheck (num) {
		let checkNum = 0,
		array = this.properties.arrRandomNum;
		for (let i = 0; i < array.length; i++) {
			if (array[i] !== array.length) {
				for (let j = i; j < array.length; j++) {
			 		if (array[j+1] < array[i] ) checkNum++;
				 }
			} 
		}
		let empty = array.indexOf(array.length);
		let emptyOrder = Math.ceil((empty + 1) / Math.sqrt(array.length))
		checkNum += emptyOrder;
		if (checkNum % 2 === 0 && array.length % 2 === 0) {console.log("ok")}
		else if (checkNum % 2 !== 0 && array.length % 2 !== 0) {console.log("ok")}
		else {
			this.properties.arrRandomNum = [];
			this._getRand(num);
		}
	},


	_createGems(num) {
	  	const fragment = document.createDocumentFragment();

		  	this.properties.arrRandomNum.forEach(item => {
		  		const gemElement = document.createElement("div");
		  		gemElement.classList.add("gem");
		  		if (item !== this.properties.arrRandomNum.length) gemElement.textContent = item;
		  		else {gemElement.classList.add("empty");
		  		gemElement.textContent = item;
		  	}
		  		
		  	fragment.appendChild(gemElement);

		  	})
	  	return fragment
	 }
}

//module.exports = {Puzzle}