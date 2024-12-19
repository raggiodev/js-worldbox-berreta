// Función para crear la barra de herramientas con los botones de tipos de terreno
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

// Función para crear el botón Reset y posicionarlo debajo del grid
function createResetButton() {
  const resetButton = document.createElement('button');
  resetButton.id = 'reset';
  resetButton.textContent = 'Reset';
  resetButton.addEventListener('click', resetWorld);
  return resetButton;
}

// Función para capitalizar la primera letra de un texto
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Crear el contenedor principal y añadir las secciones
const gameContainer = document.createElement('div');
gameContainer.id = 'game-container';

console.log("Creating game container...");
gameContainer.appendChild(createToolbar());
gameContainer.appendChild(createWorld());
gameContainer.appendChild(createResetButton());
document.body.appendChild(gameContainer);

setupWorldGrid();

// Crear el mundo donde estará el grid
function createWorld() {
  const world = document.createElement('div');
  world.id = 'world';
  return world;
}

// Limitar el tamaño del grid a 100x100 y configurarlo
function setupWorldGrid() {
  let gridSize = prompt("Enter grid size (e.g., 10 for 10x10 grid):", 10);
  gridSize = parseInt(gridSize, 10);

  if (isNaN(gridSize) || gridSize <= 0) {
    gridSize = 10; // Tamaño predeterminado
    console.log("Invalid input. Defaulting to grid size:", gridSize);
  } else if (gridSize > 100) {
    gridSize = 100; // Límite máximo
    console.log("Input exceeds limit. Setting grid size to max limit:", gridSize);
  }

  const world = document.getElementById('world');
  world.innerHTML = ''; // Limpiar contenido previo
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
}

// Reiniciar el mundo
function resetWorld() {
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.className = 'tile'; // Elimina todas las clases, dejando las celdas "vacías"
  });
  console.log("World reset: all tiles cleared.");
}

// Definir el tipo de terreno activo
let activeType = 'grass';
console.log("Initial active tile type set to:", activeType);

// Agregar event listeners a los botones de la barra de herramientas
const tileTypes = ['grass', 'water', 'forest'];
tileTypes.forEach(type => {
  document.getElementById(type).addEventListener('click', () => {
    activeType = type;
    console.log("Active tile type changed to:", activeType);
  });
});

// Habilitar pintar con el mouse
let isPainting = false;

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const world = document.getElementById('world');

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
