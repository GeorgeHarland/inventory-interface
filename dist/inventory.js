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
    }
    setupGrid() {
        for (let i = 0; i < this.rows; i++) {
            let row = [];
            for (let j = 0; j < this.columns; j++) {
                let cell = document.createElement('div');
                cell.classList.add('grid-cell');
                cell.id = `x${i}y${j}`;
                cell.style.display = 'flex';
                // cell.style.justifyContent = 'center';
                // cell.style.alignItems = 'center';
                cell.style.height = '90%';
                cell.style.width = '90%';
                let cellSpace = new InventorySpace(cell.id, cell);
                row.push(cellSpace);
                this.gridContainer?.appendChild(cell);
                const randomItem = this.generateItem();
                cellSpace.setItem(randomItem);
            }
            this.inventory.push(row);
        }
    }
    generateItem() {
        const keys = Object.keys(ItemsRecord);
        const randomIndex = Math.floor(Math.random() * keys.length);
        return ItemsRecord[keys[randomIndex]];
    }
}
