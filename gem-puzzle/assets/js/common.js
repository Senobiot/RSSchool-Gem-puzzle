const Puzzle = {
  elements: {
    puzzle: null,
    grid: null,
    gems: []
  },

   properties: {
    unknown1: false,
    unknown2: false
  },

   init(num) {
    
    this.elements.puzzle = document.createElement("div");
    this.elements.grid = document.createElement("div");
    
    this.elements.puzzle.classList.add("puzzle");
    this.elements.grid.classList.add("grid");
   
    this.elements.grid.appendChild(this._createGems(num));
    this.elements.gems = this.elements.grid.querySelectorAll(".gem");
    
    this.elements.puzzle.appendChild(this.elements.grid);
    document.body.appendChild(this.elements.puzzle);
    //gems = Array.from(this.elements.buttons);
  },


	  _createGems(num) {
	  	const fragment = document.createDocumentFragment();

	  	const gemLayout = [];
		  	for (let i = 1; i <= num; i++) {
		  		gemLayout.push(i)
		  	}
		  	gemLayout.forEach(item => {
		  		const gemElement = document.createElement("div");
		  		gemElement.classList.add("gem");
		  		if (item !== gemLayout.length) gemElement.textContent = item;
		  		else {gemElement.classList.add("empty");
		  		gemElement.textContent = "+"
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
let gemsNativePos = "123456789101112131415+"
let win = 16;
for (let i = 0; i < gems.length; i++) {
	
	if (this !== empty) {
		gems[i].addEventListener('click', function () {
			emptyPos = gems.indexOf(empty)
			if (this.previousElementSibling === empty) {
				this.parentNode.insertBefore(this, empty)

			}
			else if(this.nextElementSibling === empty) {
				empty.parentNode.insertBefore(empty, this)
				
			}
			else if (gems.indexOf(this) + 4 === emptyPos){
				this.parentNode.insertBefore(empty, gems[emptyPos - 4])
				this.parentNode.insertBefore(this, gems[emptyPos + 1])	
				
			}
			else if (gems.indexOf(this) - 4 === emptyPos){
				this.parentNode.insertBefore(empty, gems[emptyPos + 4])
				this.parentNode.insertBefore(this, gems[emptyPos + 1])	
				
			};

			gems = Array.from(document.querySelectorAll(".gem"))
			gemsCurrentPosCheck = gems.map(gem => gem.innerHTML).join("")
			setTimeout(function(){
				if (gemsCurrentPosCheck === gemsNativePos) alert("Your   WIN!!!!")
			}, 150)
		 })
	}
}



