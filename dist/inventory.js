import InventorySpace from './inventorySpace.js';
import { ItemsRecord } from './constants.js';
export default class Inventory {
    rows;
    columns;
    gridContainer;
    inventory = [];
    constructor(rows, columns, gridContainer) {
        this.rows = rows;
        this.columns = columns;
        this.gridContainer = gridContainer;
        this.setupGrid();
        // this.populateAll();
        this.populateHalf();
    }
    setupGrid() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.columns; j++) {
                let cell = document.createElement('div');
                cell.classList.add('grid-cell');
                cell.id = `x${i}y${j}`;
                let cellSpace = new InventorySpace(cell.id, cell);
                row.push(cellSpace);
                this.gridContainer?.appendChild(cell);
            }
            this.inventory.push(row);
        }
    }
    populateAll() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                const randomItem = this.generateItem();
                this.inventory[i][j].setItem(randomItem);
            }
        }
    }
    generateItem() {
        const keys = Object.keys(ItemsRecord);
        const randomIndex = Math.floor(Math.random() * keys.length);
        return ItemsRecord[keys[randomIndex]];
    }
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    populateHalf() {
        const mixedInventory = this.inventory.reduce((acc, curr) => acc.concat(curr), []);
        for (let i = mixedInventory.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mixedInventory[i], mixedInventory[j]] = [mixedInventory[j], mixedInventory[i]];
        }
        const halfLength = Math.floor(mixedInventory.length / 2);
        for (let i = 0; i < halfLength; i++) {
            const randomItem = this.generateItem();
            mixedInventory[i].setItem(randomItem);
        }
    }
}
