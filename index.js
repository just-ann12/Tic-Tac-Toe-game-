//Selectors
const cellsContainer = document.querySelector(".container");
const cells = cellsContainer.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#reset");
const announcer = document.querySelector(".announcer");

//var
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();
//Functions
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = currentPlayer;
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] !== "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();  
}
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(`player${currentPlayer}`);
    
}
function changePlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = currentPlayer;
    color();
}
function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA === "" || cellB === "" || cellC === ""){
            continue;
        }
        if(cellA === cellB && cellB === cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
       // announcer.textContent = `Player ${currentPlayer} Won`;
       if(currentPlayer === "O"){
        announcer.innerHTML = 'Player <span class="playerO">O Won</span>';
       }else{
        announcer.innerHTML = 'Player <span class="playerX">X Won</span>';
       }
        running = false;
    }else if(!options.includes("")){
        
        running = false;
    }else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    
    options = ["", "", "", "", "", "", "", "", ""];
    announcer.textContent = currentPlayer;
    cells.forEach(cell => { 
        cell.textContent = ""; 
    });
    running = true;
}

function color(){
    if(currentPlayer === "O"){
        console.log("0 aded");
        statusText.classList.add("playerO");
        statusText.classList.remove("playerX");
    }else{
        console.log("x aded");
        statusText.classList.add("playerX");
        statusText.classList.remove("playerO");
    }

}

//AVATARS
let dragged;

document.addEventListener("dragstart", event => {
  dragged = event.target;
  event.target.classList.add("dragging");
});

document.addEventListener("dragend", event => {
  event.target.classList.remove("dragging");
});

document.addEventListener("dragover", event => {
  event.preventDefault();
}, false);

document.addEventListener("dragenter", event => {
  if (event.target.classList.contains("avatar-container")) {
    event.target.classList.add("dragover");
  }
});

document.addEventListener("dragleave", event => {
  // reset background of potential drop target when the draggable element leaves it
  if (event.target.classList.contains("avatar-container")) {
    event.target.classList.remove("dragover");
  }
});

document.addEventListener("drop", event => {
  // prevent default action (open as link for some elements)
  event.preventDefault();
  // move dragged element to the selected drop target
  if (event.target.classList.contains("avatar-container")) {
    event.target.classList.remove("dragover");
    dragged.parentNode.removeChild(dragged);
    event.target.appendChild(dragged);
  }
});

//ARROWS
//not working
const codes = {
      40: 5, 
      38: -5,
      39: 1,
      37: -1
    }
function arrows(){
    
    
    function getkey(ev) {
      const current = ev.target;
      let i = 0
      for (i; i < cells.length; i++) {
        if (cells[i] === current) {
          break;
        }
      }
      if (cells[i + codes[ev.keyCode]]) {
        
        cells[i + codes[ev.keyCode]].focus();
        console.log(cells[i + codes[ev.keyCode]]);
      }
    }
    cellsContainer.addEventListener("keyup", getkey);
}
arrows();