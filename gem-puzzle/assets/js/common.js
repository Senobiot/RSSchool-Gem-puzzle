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

   init(lang) {
    
    this.elements.puzzle = document.createElement("div");
    this.elements.grid = document.createElement("div");
    
    this.elements.puzzle.classList.add("puzzle");
    this.elements.grid.classList.add("grid");
   
    this.elements.grid.appendChild(this.createGems());
    this.elements.gems = this.elements.grid.querySelectorAll(".gem");
    
    this.elements.puzzle.appendChild(this.elements.grid);
    document.body.appendChild(this.elements.puzzle);
    buttons = Array.from(this.elements.buttons);
  },