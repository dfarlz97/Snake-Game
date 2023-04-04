const canvas = document.getElementById('game');
//const context = canvas.getContext('2d');

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


const url = "http://localhost:3000/player"


// use fetch to load JSON data
fetch("url")
.then(response => response.json())
.then(data => {
    // code to populate the data
    const tableBody = document.querySelector('tbody');
// in the ".then() method, loop through JSON data and create new row for each item"
    data.forEach(item => {
        const row = document.createElement('tr');
        const playerCell = document.createElement('td');
        const scoreCell = document.createElement('td');
        playerCell.textContent = item.player;
        scoreCell.textContent = item.score;
        row.appendChild(playerCell);
        row.appendChild(scoreCell);
        tableBody.appendChild(row);
    });
});

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
function updateLeaderboard(playerName, playerScore) {

    const player = {
        name: playerName,
        score: playerScore,
    };

    // add the player to the leaderboard
    leaderboard.push(player);

    // sort the leaderboard by score in descending order
    leaderboard.sort((a, b) => b.score - a.score);

    // render the updated leaderboard
    renderLeaderboard();
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