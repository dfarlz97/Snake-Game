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

fetch("url")
    .then(response => response.json())
    .then(data => renderLeaderBoard(data))
const playerData = {

}

playerData = {...data} // populate empty array with json obj
localStorage.setItem("playerData", JSON.stringify(playerData)) // store player info locally

const leaderBoard = document.querySelector('.scores')

function renderScores(players){
    leaderBoard.textContent = players.score

    players.scores.forEach((score)=>{
        let postScore = document.createElement('li')//creating li for each comment obj
        postScore.textContent = comment.content //setting the textContent from the comment obj
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


