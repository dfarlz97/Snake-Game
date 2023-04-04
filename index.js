const gameBoard = document.querySelector('.grid')
const url = "http://localhost:3000/players"
const scoreDisplay = document.getElementsByTagName('tbody')
const startButton = document.querySelector('body > div.start > button')

//const context = canvas.getContext('2d');

// need to be var because value will change 
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

// length of the snake. grows when eating an apple
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
let alertMessage = document.querySelector('alert')

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keyup", control);
    createBoard();
    buttonStart();
});

function buttonStart(){
    startButton.addEventListener('click', (e) =>
    startGame())
}
function createBoard() {
    for (let i = 0; i < 100; i++) {
      let createSnake = document.createElement("div");
      gameBoard.appendChild(createSnake);
    }
  }

function startGame(){
    let gridSquares = document.querySelectorAll(".grid div");
    randomItem(gridSquares);
    direction = 1; // sets direction to 1-right
    intervalTime = 1000; // sets the time it takes for the snake to move around
    currentSnake = [2, 1, 0]; // sets grid position of snake
    currentIndex = 0; // start at index 0
    currentSnake.forEach(function(index) { // takes the value of currentSnake (index) and 
        gridSquares[index].classList.add('snake') 
        interval = setInterval(moveResult, intervalTime); // assigns intervalTime and moveOutcome to interval so it can be called later
    }) //function move runs every 1s and defines what happens when you move the snake
}

function moveResult(){
    let gridSquares = document.querySelectorAll(".grid div")
    if (checkForHit(gridSquares)) { // checks to see if snake has checkForHit function evaluates as true 
        startButton.textContent = 'GAME OVER :('
        return clearInterval(interval);  // ends game
      } else { // if checkForHit resolves false then continue to move snake
        moveSnake(gridSquares);
      }
}

function moveSnake(gridSquares) {
    let snakeTail = currentSnake.pop(); // selects last cell of snake
    gridSquares[snakeTail].classList.remove("snake"); // removes last cell of snake
    currentSnake.unshift(currentSnake[0] + direction); // adds new cell value to beginning of snake array 
                                                        // snake = [2,1,0] ---> [2,1] ---> [3,2,1]
    // movement ends here
    eatItem(gridSquares, snakeTail); // check to see if snake has eaten item
    gridSquares[currentSnake[0]].classList.add("snake"); // displays snake head after checking
}

function checkForHit(gridSquares){
    if ( // 4 different conditions specifying whether the snake has hit border
        (currentSnake[0] + width >= width * width && direction === width) || // if [0] of snake array + width(10) 
                                                                    // is greater than or equal to width*width (area)
                                                                    // AND direction is strictly equal to width
                                                                    //(snake has hit border)

                                                                    // OR

        (currentSnake[0] % width === width - 1 && direction === 1) || // if the difference of [0] of snake array 
                                                                    // divided by width(10) is strictly equal to
                                                                    // width(10 -1) = 9 AND direction is equall to 1
                                                                    //(snake has hit border)

                                                                    // OR

        (currentSnake[0] % width === 0 && direction === -1) || // if the difference of [0] of snake array divided by
                                                                // width(10) is strictly equal to 0 AND direction is strictly
                                                                // equal to -1
                                                                //(snake has hit border)

                                                                // OR

        (currentSnake[0] - width <= 0 && direction === -width) || // if [0] of snake array - width(10) is less than 
                                                                 // equal to 0 AND direction is strictly equal to -10(-width)
                                                                 // (snake has hit border)

                                                                 //OR
                                            
        gridSquares[currentSnake[0] + direction]                // if the first cell of the current snake array 
                                                                // and the direction are the same, the snake is eating itself
    ){
        return true // means the snake has hit something
    } else{
        return false; // no hits, keep moving
    }
}

function eatItem(gridSquares, snakeTail){
    if (gridSquares[currentSnake[0]].classList.contains("item")) { // checks if snake is going to hit an item
        gridSquares[currentSnake[0]].classList.remove("item"); // if true, removes the item 
        gridSquares[snakeTail].classList.add("snake"); // adds cell to snake 
        currentSnake.push(snakeTail); // adds a cell to end of snake
        randomItem(gridSquares); // sets random position to item after it is eaten
        score++; // increases score by 1 when item is eaten 
        scoreDisplay.textContent = score; // adds 1 to score and displays 
        clearInterval(interval); // clear the interval so that it can increase
        intervalTime = intervalTime * speed; // increases speed 
        interval = setInterval(moveSnake, intervalTime); // sets new interval
      }
    }

function randomItem(gridSquares){
    do {
        itemIndex = Math.floor(Math.random() * gridSquares.length); // selects random position for item
    } 
    while (gridSquares[itemIndex].classList.contains("snake")); // while there is no snake in that position 
        gridSquares[itemIndex].classList.add("item"); // adds item to unoccupied position
    }

function control(event){
    if (event.keycode === 39) { // 39 is keycode for right
        direction = 1; // right
      } else if (event.keycode === 38) { // keycode for up 
        direction = -width; //if we press the up arrow, the snake will go ten divs up
      } else if (event.keycode === 37) { // keycode for left
        direction = -1; // snake will go left one div
      } else if (event.keycode === 40) { //keycode for down
        direction = +width; // down the snake head will go 10 divs below current div
      }
    }

// const playerData = {

// }

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