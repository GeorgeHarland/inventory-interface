"use strict";
let inventory = new Array(5).fill(null).map(() => new Array(8).fill(null));
let items = ['Apple', 'Book', 'Flask', 'Herbs', 'Sword'];
let gridContainer = document.getElementById('grid-container');
for (let i = 0; i < inventory.length; i++) {
    for (let j = 0; j < inventory[i].length; j++) {
        let cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.id = `cell-${i}-${j}`;
        inventory[i][j] = getRandomItem();
        let itemIcon = getItemIcon(inventory[i][j]);
        cell.appendChild(itemIcon);
        gridContainer && gridContainer.appendChild(cell);
    }
}
function getRandomItem() {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}
function getItemIcon(item) {
    let imgContainer = document.createElement('div');
    let highlight = document.createElement('img');
    highlight.src = './assets/Images/InventoryMain/IMG_SlotHighlight.png';
    highlight.style.position = 'absolute';
    highlight.style.width = '10%';
    highlight.style.height = '10%';
    highlight.style.zIndex = '3';
    highlight.style.display = 'none';
    imgContainer.appendChild(highlight);
    let img = document.createElement('img');
    img.src = `./assets/Images/Icons/${item}.png`;
    img.style.width = '50%';
    img.style.height = '50%';
    img.style.zIndex = '4';
    imgContainer.appendChild(img);
    imgContainer.style.height = '100%';
    imgContainer.style.width = '100%';
    imgContainer.addEventListener('mouseover', function () {
        highlight.style.display = 'block';
    });
    imgContainer.addEventListener('mouseout', function () {
        highlight.style.display = 'none';
    });
    return imgContainer;
}
