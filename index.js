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

const leaderBoard = document.getElementsByClassName('.leader-board')

function renderScores(players){
    const createP = document.createElement('li')
    const createUl = document.createElement('ul')
    leaderBoard.textContent = players.score
    leaderBoard.appendChild(createUl, createP)
}
