const gameCanvas = document.getElementById('gameCanvas');
const url = "http://localhost:3000/player"
const context = gameCanvas.getContext('2d');

// need to be var because value will change 
var grid = 16;
var count = 0;

var snake = { 
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

var item = {
    x: 0,
    y: 0
}

let width = 10; // width of grid
let currentIndex = 0; // start at 0 and increment
let itemIndex = 0; // item starts at index 0 as well
let currentSnake = [2, 1, 0]; // snake is in an array
let direction = 1;
let score = 0; // score starts at 0 
let speed = 0.8; // set speed variable
let intervalTime = 0; // set interval
let interval = 0; // set interval

fetch(url)
    .then(response => response.json())
    .then(data => renderLeaderboard(data))

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keyup", control);
    createBoard();
    startGame();
});

function createBoard() {
    for (let i = 0; i < 100; i++) {
      let createDiv = document.createElement("div");
      gameCanvas.appendChild(createDiv);
    }
  }

const userData = {

}

let playerData = {};

function renderScoreboard(data) {
    playerData = {...data}; // populate empty object with JSON object
    localStorage.setItem("playerData", JSON.stringify(playerData));
}


const leaderBoard = document.querySelector('.scores')

function renderScores(score){
    leaderBoard.innerHTML = score.score;

    playerData.scores.forEach((score)=>{
        let postScore = document.createElement('li')//creating li for each comment obj
        postScore.textContent = score //setting the textContent from the comment obj
        // for(let comment of comments) ^
        leaderBoard.append(postScore) // add new li for each score
    })
   
}

// adding event listener for form's submit button

const form = document.getElementById('leaderboard-form');
const playerNameInput = document.getElementById('player-name');
const playerScoreInput = document.getElementById('player-score');

form.addEventListener('submit', (event) => {
    event.preventDefault(); //prevent the form from submitting

    const playerName = playerNameInput.value;
    const playerScore = playerScoreInput.value;

    //add the player and score to the leaderboard
    updateLeaderboard(playerName, playerScore);

    //clear the form inputs

    playerNameInput.value = '';
    playerScoreInput.value = '';
});

const leaderboard = [];
// create a new player object
function updateLeaderboard(playerName, playerScore, leaderboard) {

    const player = {
        name: playerName,
        score: parseInt(playerScore),
    };

    // add the player to the leaderboard
    leaderboard.push(player);

    // sort the leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // render the updated leaderboard
    renderScores(leaderboard);
}

const leaderboardElement = document.createElement('ul');

function renderLeaderboard() {
    // clear the previous leaderboard
    leaderboardElement.innerHTML = '';

    // render each player as a list item
    leaderboard.forEach((player) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name}: ${player.score}`;
        leaderboardElement.appendChild(listItem);
    });

    // add the leaderboard to the page
    document.body.appendChild(leaderboardElement);
}
// use fetch to load JSON data
fetch(url)
.then(response => response.json())
.then(data => {
    // code to populate the data
    const tableBody = document.querySelector('tbody');
// in the ".then() method, loop through JSON data and create new row for each item"
    data.scores.forEach(item => {
        const row = document.createElement('tr');
        const playerCell = document.createElement('td');
        const scoreCell = document.createElement('td');
        playerCell.textContent = item.playerName;
        scoreCell.textContent = item.playerScore;
        row.appendChild(playerCell);
        row.appendChild(scoreCell);
        tableBody.appendChild(row);
    });
});