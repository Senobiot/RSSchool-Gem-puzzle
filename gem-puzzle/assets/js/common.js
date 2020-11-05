//import {puzzle} from './puzzle.js';
//document.addEventListener("DOMContentLoaded", )

let difficult = 3,
	form = document.querySelector(".choice"),
	start = document.querySelector(".button");

	start.addEventListener('click', function(){
		let checkSize = document.getElementsByName('size');    
		for(i = 0; i < checkSize.length; i++) { 
			if(checkSize[i].checked) 
			difficult = Number(checkSize[i].value);
		} 
		form.style.opacity = "0";

		setTimeout(function(){
			form.style.display = "none";
			startGame ()
		}, 200)
	})

function startGame () {
 	Puzzle.init(difficult*difficult)
let puzzleCss = document.querySelector(".puzzle"),
	gridCss = document.querySelector(".grid"),
	empty = document.querySelector(".empty"),
	emptyPos,
	gems = Array.from(document.querySelectorAll(".gem")),
	gemsCurrentPosCheck,
	gemsNativePos = "",
	anDuration = 200,
	tanslate = 95,
	animation = false,
	counter = 0;

function gemsNative() {
	for (var i = 1; i <= difficult*difficult ; i++) {
		gemsNativePos += i;
	}
}
gemsNative()

function puzzleSize() {
	puzzleCss.style.width = `${difficult*100}px`;
	puzzleCss.style.height = `${difficult*100}px`;
	gridCss.style.gridTemplateColumns = `repeat(${difficult}, 1fr)`;
}
puzzleSize()

function checkWin() {
	animation = false;
	gems = Array.from(document.querySelectorAll(".gem"))
	gemsCurrentPosCheck = gems.map(gem => gem.innerHTML).join("")
	if (gemsCurrentPosCheck === gemsNativePos) {
		setTimeout(() => {
			alert("Your   WIN!!!!")}, 100)
	};			
}

	for (let i = 0; i < gems.length; i++) {
		
		if (gems[i] !== empty) {
			gems[i].addEventListener('click', function () {

				empty = document.querySelector(".empty")
				emptyPos = gems.indexOf(empty);
				if (this.previousElementSibling === empty && !animation) {
					console.log("!!!!")
					animation = true;
					this.animate([
					  { transform: `translate(-${tanslate}px)` }, 
					], {
					  duration: anDuration,
					})

					empty.animate([
					  { transform: `translate(${tanslate}px)` }, 
					], {
					  duration: anDuration,
					})
					setTimeout(() => {
					 this.parentNode.insertBefore(this, empty);
					 checkWin();
					 }, anDuration);					
				
				}
				else if(this.nextElementSibling === empty && !animation) {
					animation = true;
					this.animate([
					  { transform: `translate(${tanslate}px)` }, 
					], {
					  duration: anDuration,
					})

					empty.animate([
					  { transform: `translate(-${tanslate}px)` }, 
					], {
					  duration: anDuration,
					})

					setTimeout(() => {
					empty.parentNode.insertBefore(empty, this);
					checkWin()
					}, anDuration);		
					
				}
				else if (gems.indexOf(this) + difficult === emptyPos && !animation){
					animation = true;
					this.animate([
					  { transform: `translateY(${tanslate}px)` }, 
					], {
					  duration: anDuration,
					})

					empty.animate([
					  { transform: `translateY(${tanslate})` }, 
					], {
					  duration: anDuration,
					})

					setTimeout(() => {
						this.parentNode.insertBefore(empty, gems[emptyPos - difficult]);
						this.parentNode.insertBefore(this, gems[emptyPos + 1]);
						checkWin()
						}, anDuration);
						
				}
				else if (gems.indexOf(this) - difficult === emptyPos && !animation){
					animation = true;
					this.animate([
					  { transform: `translateY(-${tanslate}px)` }, 
					], {
					  duration: anDuration,
					})

					empty.animate([
					  { transform: `translateY(${tanslate}px)` }, 
					], {
					  duration: anDuration,
					})

					setTimeout(() => {
						this.parentNode.insertBefore(empty, gems[emptyPos + difficult]);
						this.parentNode.insertBefore(this, gems[emptyPos + 1]);	
						checkWin();
						}, anDuration);
				};		
			 })
		}
	}

}

