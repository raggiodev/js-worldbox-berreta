// Set up the HTML structure
const gameContainer = document.getElementById('game-container');

console.log("Creating game container...");
gameContainer.appendChild(createToolbar());
gameContainer.appendChild(createWorld());
console.log("Game container added to DOM.");

function createToolbar() {
  const toolbar = document.createElement('div');
  toolbar.id = 'toolbar';

  const tileTypes = ['grass', 'water', 'forest'];
  tileTypes.forEach(type => {
    const button = document.createElement('button');
    button.id = type;
    button.textContent = capitalize(type);
    toolbar.appendChild(button);
  });

  return toolbar;
}

function createWorld() {
  const world = document.createElement('div');
  world.id = 'world';
  return world;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Apply basic CSS styles directly to the page
const world = document.getElementById('world');
const toolbar = document.getElementById('toolbar');

// Create the grid world
let gridSize = prompt("Enter grid size (e.g., 10 for 10x10 grid):", 10);
gridSize = parseInt(gridSize, 10);
if (isNaN(gridSize) || gridSize <= 0) {
  gridSize = 10; // Default grid size
  console.log("Invalid input. Defaulting to grid size:", gridSize);
}

console.log("Setting up grid with size:", gridSize);
world.style.gridTemplateColumns = `repeat(${gridSize}, 40px)`;
world.style.gridTemplateRows = `repeat(${gridSize}, 40px)`;
const fragment = document.createDocumentFragment();
for (let i = 0; i < gridSize * gridSize; i++) {
  const tile = document.createElement('div');
  tile.classList.add('tile');
  fragment.appendChild(tile);
}
world.appendChild(fragment);
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

// Enable painting with mouse drag
let isPainting = false;

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

world.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('tile')) {
    isPainting = true;
    event.target.className = `tile ${activeType}`;
    console.log("Started painting with type:", activeType);
  }
});

world.addEventListener('mousemove', debounce((event) => {
  if (isPainting && event.target.classList.contains('tile')) {
    event.target.className = `tile ${activeType}`;
    console.log("Painting tile with type:", activeType);
  }
}, 50));

world.addEventListener('mouseup', () => {
  if (isPainting) {
    isPainting = false;
    console.log("Stopped painting.");
  }
});

world.addEventListener('mouseleave', () => {
  if (isPainting) {
    isPainting = false;
    console.log("Painting interrupted (mouse left the grid).");
  }
});
