
const Puzzle = {
  elements: {
    puzzle: null,
    grid: null,
    gems: []
  },

   properties: {
    unknown1: false,
    unknown2: false,
    arrRandomNum: []
  },

   init(num) {
    this._getRand(num)
    this.elements.puzzle = document.createElement("div");
    this.elements.grid = document.createElement("div");
    
    this.elements.puzzle.classList.add("puzzle");
    this.elements.grid.classList.add("grid");
   
    this.elements.grid.appendChild(this._createGems(num));
    this.elements.gems = this.elements.grid.querySelectorAll(".gem");
    
    this.elements.puzzle.appendChild(this.elements.grid);
    document.body.appendChild(this.elements.puzzle);
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
		} else { return }
	},


	_createGems(num) {
	  	const fragment = document.createDocumentFragment();

		  	this.properties.arrRandomNum.forEach(item => {
		  		const gemElement = document.createElement("div");
		  		gemElement.classList.add("gem");
		  		if (item !== this.properties.arrRandomNum.length) gemElement.textContent = item;
		  		else {gemElement.classList.add("empty");
		  		gemElement.textContent = item
		  	}
		  		
		  	fragment.appendChild(gemElement);

		  	})
	  	return fragment
	 }
}

//module.exports = {Puzzle}