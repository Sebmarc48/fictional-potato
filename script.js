// Get the game container element from the HTML
const gameContainer = document.getElementById("game");

// Array of colors to be used in the game (each color is repeated twice)
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// Function to shuffle the elements of an array using the Fisher-Yates algorithm
function shuffle(array) {
  // Initialize a counter with the length of the array
  let counter = array.length;

  // Loop through each element in the array
  while (counter > 0) {
    // Pick a random index within the remaining elements
    let index = Math.floor(Math.random() * counter);

    // Decrease the counter by 1
    counter--;

    // Swap the last element with the randomly picked one
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  // Return the shuffled array
  return array;
}

// Variables to keep track of game state
let firstClick = "";
let secondClick = "";
let processingClicks = false;
let score = 0;

// Function called when a card is clicked
function handleCardClick(event) {
  if (processingClicks) {
    return;
  }

  // If it's the first click
  if (firstClick === "") {
    // Set background color, store the clicked card, and increment click count
    event.target.style.backgroundColor = event.target.className;
    firstClick = event.target;
  }
  // If it's the second click
  else {
    // Set background color, store the second clicked card, and increment click count
    event.target.style.backgroundColor = event.target.className;
    secondClick = event.target;

    // Set processing flag to prevent more clicks during processing
    processingClicks = true;

    // Check if the colors of the two clicked cards match
    if (
      firstClick !== secondClick &&
      firstClick.className !== secondClick.className
    ) {
      setTimeout(function () {
        firstClick.style.backgroundColor = "white";
        secondClick.style.backgroundColor = "white";
        firstClick = "";
        secondClick = "";
        processingClicks = false;
      }, 2000);

      // For matching cards, simply reset click count and processing flag after a delay
    } else {
      setTimeout(function () {
        firstClick = "";
        secondClick = "";
        processingClicks = false;
      }, 3000);
    }
  }
}

// Function to create div elements for colors and add click event listeners
function createDivsForColors(colorArray) {
  // Loop through each color in the array
  for (let color of colorArray) {
    // Create a new div element
    const newDiv = document.createElement("div");

    // Add the color as a class to the new div
    newDiv.classList.add(color);

    // Add a click event listener to the new div, calling handleCardClick function
    newDiv.addEventListener("click", handleCardClick);

    // Append the new div to the game container
    gameContainer.append(newDiv);
  }
}

// Function to start the game
function startGame() {
  // Shuffle the COLORS array
  let shuffledColors = shuffle(COLORS);

  // Create div elements for the shuffled colors
  createDivsForColors(shuffledColors);

  // Remove the event listener for the startButton to prevent starting the game multiple times
  startButton.removeEventListener("click", startGame);
}

// Add event listener to the startButton to initiate the game when clicked
document.getElementById("startButton").addEventListener("click", startGame);

// Add event listener to the restartButton to clear the game container and restart the game when clicked
document.getElementById("restartButton").addEventListener("click", function () {
  // Clear the game container
  gameContainer.innerHTML = "";

  // Shuffle the COLORS array
  let shuffledColors = shuffle(COLORS);

  // Create div elements for the shuffled colors
  createDivsForColors(shuffledColors);
});
