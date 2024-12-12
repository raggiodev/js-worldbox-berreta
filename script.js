// JavaScript functionality for Worldbox Clone
const world = document.getElementById('world');
const toolbar = document.getElementById('toolbar');

// Create the grid world
const gridSize = 10; // Define the grid size
console.log("Setting up grid with size:", gridSize);

document.getElementById('world').style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
document.getElementById('world').style.gridTemplateRows = `repeat(${gridSize}, 40px)`;

for (let i = 0; i < gridSize * gridSize; i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  world.appendChild(tile);
}

console.log("Grid world created with", gridSize * gridSize, "tiles.");

// Active tile type
let activeType = 'grass';
console.log("Initial active tile type set to:", activeType);

// Toolbar button event listeners
const tileTypes = ['grass', 'water', 'forest'];
tileTypes.forEach(type => {
  document.getElementById(type).addEventListener('click', () => {
    activeType = type;
    console.log("Active tile type changed to:", activeType);
  });
});

// Change tile type on click
world.addEventListener('click', (event) => {
  if (event.target.classList.contains('tile')) {
    event.target.className = `tile ${activeType}`;
    console.log("Tile changed to type:", activeType);
  }
});
