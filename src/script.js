// An empty 8x5 array for the inventory
let inventory = new Array(5).fill(null).map(() => new Array(8).fill(null));

// items?
let items = ['Apple', 'Book', 'Flask', 'Herbs', 'Sword']

// Get the grid container
let gridContainer = document.getElementById('grid-container');

// Create the grid cells
for(let i = 0; i < inventory.length; i++) {
  for(let j = 0; j < inventory[i].length; j++) {
    let cell = document.createElement('div');
    cell.classList.add('grid-cell');
    cell.id = `cell-${i}-${j}`; // unique id for each cell

    // Assign a random item to this cell in the inventory array
    inventory[i][j] = getRandomItem();

    // If you want, you can also add the item visually to the cell here
    // I'll assume you have a function called getItemIcon which returns an img element for an item
    let itemIcon = getItemIcon(inventory[i][j]);
    cell.appendChild(itemIcon);

    gridContainer.appendChild(cell);
  }
}

function getRandomItem() {
  let randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

function getItemIcon(item) {
  let img = document.createElement('img');
  img.src = `./assets/Images/Icons/${item}.png`; // or wherever your item images are stored
  img.style.width = '50%';  // fill the grid cell
  img.style.height = '50%'; // fill the grid cell
  // img.style.padding = '-80%;'
  return img;
}
