let gameBoard = document.querySelector('.grid')
const url = "http://localhost:3000/players"
const scoreDisplay = document.getElementsByTagName('tbody')
const startButton = document.querySelector('body > div.start > button')

let grid = 16;
let count = 0;

let snake = { 
    x: 0,
    y: 0,

// snake velocity. moves one grid length every frame in either the x or y direction
dx: grid,
dy: 0,

// keep track of all grids the snake body occupies
cells: [],

// length of the snake. grows after eating item
maxCells: 1 
};

let item = {
    x: 0,
    y: 0
}

let width = 10; // width of grid
let currentIndex = 0; // start at 0 and increment
let itemIndex = 0; // item starts at index 0 as well
let currentSnake = [2, 1, 0]; // snake is in an array
let direction = 1;
let score = 0; // score starts at 0 
let speed = 1; // set speed variable
let intervalTime = 0; // set interval
let interval = 0; // set interval
let gridSquares = [];

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keyup", control);
    createBoard();
    startButton.addEventListener('click', startGame)
});

function createBoard(){
    for (let i = 0; i < 100; i++) { //iterates through and adds div elements as long as
                                            // it is less than the area of the grid
      let createSnake = document.createElement("div");
      gameBoard.appendChild(createSnake);
      //gridSquares.push(createSnake); // add div element to gridSquares array
    }
  }

function startGame(){
    clearInterval(interval); // add this line to stop any previous interval
    let gridSquares = document.querySelectorAll(".grid div");
    randomItem(gridSquares);
    direction = 1;
    intervalTime = 1000;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach(index=>gridSquares[index].classList.add("snake"))
    // currentSnake.forEach(function(index) {
    //     gridSquares[index].classList.add('snake');
    // });
    interval = setInterval(moveResult, intervalTime);
  }
  
function moveResult() {
    let gridSquares = document.querySelectorAll(".grid div");
    if(checkForHit(gridSquares)){
      startButton.textContent = "GAME OVER :(";
      return clearInterval(interval);
    } else {
        const snakeTail = currentSnake.pop();
        gridSquares[snakeTail].classList.remove("snake");
        currentSnake.unshift(currentSnake[0] + direction);
        eatItem(gridSquares, snakeTail);
        gridSquares[currentSnake[0]].classList.add("snake");
    }
  }
  
function moveSnake(gridSquares) {
    let snakeTail = currentSnake.pop() 
    gridSquares[snakeTail].classList.remove("snake") 
    currentSnake.unshift(currentSnake[0]+direction)  
 
    eatItem(gridSquares, snakeTail)  
    gridSquares[currentSnake[0]].classList.add("snake")  
}

//     if (direction === "up") {
//       snake.unshift([snake[0][0] - 1, snake[0][1]]);
//     } else if (direction === "down") {
//       snake.unshift([snake[0][0] + 1, snake[0][1]]);
//     } else if (direction === "left") {
//       snake.unshift([snake[0][0], snake[0][1] - 1]);
//     } else if (direction === "right") {
//       snake.unshift([snake[0][0], snake[0][1] + 1]);
//     }
  
//     // if (checkForHit()) {
//     //   clearInterval(interval);
//     //   alert("Game Over");
//     //   return;
//     // }
  
//     if (eatItem()) {
//       drawItem();
//     } else {
//       snake.pop();
//     }
  
//     // drawSnake();
//   }
  
function checkForHit(gridSquares) {
    if(  
        (currentSnake[0] + width >=(width*width) && direction === width) ||
        (currentSnake[0] % width ===width -1 && direction ===1) ||   
        (currentSnake[0] % width === 0 && direction === -1) ||   
        (currentSnake[0] - width <= 0 && direction === -width) ||
        gridSquares[currentSnake[0] + direction].classList.contains("snake")   
        ){ 
        return true  
        }else{  
        return false 
        }
}

function eatItem(gridSquares, snakeTail) {
    if(gridSquares[currentSnake[0]].classList.contains("item")) {
      gridSquares[currentSnake[0]].classList.remove("item");
      gridSquares[snakeTail].classList.add("snake");
      currentSnake.push(snakeTail);
      randomItem(gridSquares);
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveResult, intervalTime);
    }
  }

function randomItem(gridSquares){
    do {
        itemIndex = Math.floor(Math.random() * gridSquares.length); // selects random position for item
    } 
    while (gridSquares[itemIndex].classList.contains("snake")); // while there is no snake in that position 
        gridSquares[itemIndex].classList.add("item"); // adds item to unoccupied position
    }

function control(e){ 
    if (e.keycode===39){
        direction = 1 // right 
    }else if (e.keycode===38){ 
        direction = -width //if we press the up arrow, the snake will go ten divs up
    }else if (e.keycode===37){ 
        direction = -1 // left, the snake will go left one div
    }else if (e.keycode===40){
        direction = +width // down the snake head will instantly appear 10 divs below from the current div 
    } 
} 
// function control(event){
//     document.addEventListener('keydown', function(e) {
//         switch (e.key) {
//           case 'ArrowUp':
//             if (direction !== 'down') direction = 'up';
//             break;
//           case 'ArrowDown':
//             if (direction !== 'up') direction = 'down';
//             break;
//           case 'ArrowLeft':
//             if (direction !== 'right') direction = 'left';
//             break;
//           case 'ArrowRight':
//             if (direction !== 'left') direction = 'right';
//             break;
//         }
//     });      
// }

















// fetch(url)
//     .then(response => response.json())
//     .then(data => console.log(data))
    
//     const playerData = {}

// playerData = {...data} // populate empty array with json obj
// localStorage.setItem("playerData", JSON.stringify(playerData)) // store player info locally

// const leaderBoard = document.querySelector('.scores')

// function renderScores(players){
//     leaderBoard.textContent = players.score

//     players.scores.forEach((score)=>{
//         let postScore = document.createElement('li')//creating li for each comment obj
//         postScore.textContent = comment.content //setting the textContent from the comment obj
//         // for(let comment of comments) ^
//         leaderBoard.append(postScore) // add new li for each score
//     })
   
// }

// // adding event listener for form's submit button

// const form = document.getElementById('leaderboard-form');
// const playerNameInput = document.getElementById('player-name');
// const playerScoreInput = document.getElementById('player-score');

// form.addEventListener('submit', (event) => {
//     event.preventDefault(); //prevent the form from submitting

//     const playerName = playerNameInput.value;
//     const playerScore = playerScoreInput.value;

//     //add the player and score to the leaderboard
//     updateLeaderboard(playerName, playerScore);

//     //clear the form inputs

//     playerNameInput.value = '';
//     playerScoreInput.value = '';
// });

// const leaderboard = [];
// // create a new player object
// function updateLeaderboard(playerName, playerScore) {

//     const player = {
//         name: playerName,
//         score: playerScore,
//     };

//     // add the player to the leaderboard
//     leaderboard.push(player);

//     // sort the leaderboard by score in descending order
//     leaderboard.sort((a, b) => b.score - a.score);

//     // render the updated leaderboard
//     renderLeaderboard();
// }

// const leaderboardElement = document.createElement('ul');

// function renderLeaderboard() {
//     // clear the previous leaderboard
//     leaderboardElement.innerHTML = '';

//     // render each player as a list item
//     leaderboard.forEach((player) => {
//         const listItem = document.createElement('li');
//         listItem.textContent = `${player.name}: ${player.score}`;
//         leaderboardElement.appendChild(listItem);
//     });

//     // add the leaderboard to the page
//     document.body.appendChild(leaderboardElement);
// }