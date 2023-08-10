import InventorySpace from './inventorySpace.js';
import { DEV_POPULATE_HALF_INVENTORY, ItemsRecord } from './constants.js';
import Item from './item.js';
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
        this.populateInventory();
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
    populateInventory() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (DEV_POPULATE_HALF_INVENTORY) {
                    if (Math.random() < 0.5) {
                        const randomItem = this.generateItem();
                        this.inventory[i][j].setItem(randomItem);
                    }
                }
                else {
                    const randomItem = this.generateItem();
                    this.inventory[i][j].setItem(randomItem);
                }
            }
        }
    }
    generateItem() {
        const keys = Object.keys(ItemsRecord);
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomItem = ItemsRecord[keys[randomIndex]];
        const randomStackSize = Math.floor(Math.random() * randomItem.maxStackSize) + 1;
        return new Item(randomItem, randomStackSize);
    }
}
