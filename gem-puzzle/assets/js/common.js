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

 	_getRand (qty) {
		if (this.properties.arrRandomNum.length < qty) {
			let number = this._getRandomIntInclusive(1, 16);
			if (this.properties.arrRandomNum.includes(number)) {
				this._getRand(qty)
			} else {
				this.properties.arrRandomNum.push(number);
				this._getRand(qty)}
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

document.addEventListener("DOMContentLoaded", Puzzle.init(16))





let empty = document.querySelector(".empty");

let emptyPos;
let gems = Array.from(document.querySelectorAll(".gem"));
let gemsCurrentPosCheck;
let gemsNativePos = "12345678910111213141516"
let win = 16;
let animation = false;

for (let i = 0; i < gems.length; i++) {
	
	if (gems[i] !== empty) {
		gems[i].addEventListener('click', function () {

			empty = document.querySelector(".empty")
			gems = Array.from(document.querySelectorAll(".gem"))
			emptyPos = gems.indexOf(empty);
			if (this.previousElementSibling === empty && !animation) {
				animation = true;
				this.animate([
				  { transform: 'translate(-125px)' }, 
				], {
				  duration: 200,
				})

				empty.animate([
				  { transform: 'translate(125px)' }, 
				], {
				  duration: 200,
				})
				setTimeout(() => {
				 this.parentNode.insertBefore(this, empty);
				 animation = false;
				 }, 200);					

				
			}
			else if(this.nextElementSibling === empty && !animation) {
				animation = true;
				this.animate([
				  { transform: 'translate(125px)' }, 
				], {
				  duration: 200,
				})

				empty.animate([
				  { transform: 'translate(-125px)' }, 
				], {
				  duration: 200,
				})

				setTimeout(() => {
				empty.parentNode.insertBefore(empty, this);
				animation = false;
				}, 200);		


				
			}
			else if (gems.indexOf(this) + 4 === emptyPos && !animation){
				animation = true;
				this.animate([
				  { transform: 'translate(0, 125px)' }, 
				], {
				  duration: 200,
				})

				empty.animate([
				  { transform: 'translate(0, -125px)' }, 
				], {
				  duration: 200,
				})

				setTimeout(() => { this.parentNode.insertBefore(empty, gems[emptyPos - 4]);
									this.parentNode.insertBefore(this, gems[emptyPos + 1]);
									animation = false;
								}, 205);

						
			}
			else if (gems.indexOf(this) - 4 === emptyPos && !animation){
				animation = true;
				this.animate([
				  { transform: 'translate(0, -125px)' }, 
				], {
				  duration: 200,
				})

				empty.animate([
				  { transform: 'translate(0, 125px)' }, 
				], {
				  duration: 200,
				})

					setTimeout(() => { this.parentNode.insertBefore(empty, gems[emptyPos + 4]);
										this.parentNode.insertBefore(this, gems[emptyPos + 1]);	
										animation = false;
								}, 205);

			
			};

			//gems = Array.from(document.querySelectorAll(".gem"))
			gemsCurrentPosCheck = gems.map(gem => gem.innerHTML).join("")
			setTimeout(function(){
				if (gemsCurrentPosCheck === gemsNativePos) alert("Your   WIN!!!!")
			}, 200)
			
		 })
	}
}



