let userClickedPattern = [];
let buttonColours = ["red", "blue", "green", "yellow"]
let gamePattern = [];
let gameLevel = 0;
let started = false;
let lastElementArray1;
let lastElementArray2;

// This is the core. It generates a random number that selects a colour to start off. Also starts game.

function nextSequence() {
    userClickedPattern = [];
    gameLevel++;
    $("h1").text("level " + gameLevel);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSoundColour(randomChosenColour);
}


// Adding a listener to the button to get which one was triggered and pushes the value to an array.

$(".btn").click(function(event) {
    let userChosenColour;
    userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSoundColour(userChosenColour);
    checkAnswer();
});


// Gives animation to the selected colour. I use it only for the ones clicked by user.

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}


// Creates an audio depending the colour selected and plays it.

function playSoundColour(currentColour) {
    let nuevoAudio = new Audio("sounds/" + currentColour + ".mp3");
    nuevoAudio.play(); 
}


// Detects if a key is pressed, if it is the first time a key is pressed the game is started.

$(document).keypress(function (event) {
    if(started === false) {
        nextSequence();
        started = true;
    }
})


function checkAnswer() {
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            // If the clicked pattern does not match the game pattern, reset the game
            desdeCero();
            return;
        }
    }

    // If all the clicked colors match the game pattern and the lengths are the same
    if (userClickedPattern.length === gamePattern.length) {
        // Check if the last element of the user pattern matches the game pattern
        if(userClickedPattern[userClickedPattern.length - 1] === gamePattern[gamePattern.length - 1]) {
            // If the last element matches, proceed to the next level
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } else {
            // If the last element does not match, reset the game
            desdeCero();
        }
    }
}


function desdeCero() {
    let perderAudio = new Audio("sounds/wrong.mp3");
    perderAudio.play();
    gameLevel = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false; 
    $("h1").text("You've lost! Press A Key to Start")
}

function arraysMatch(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
