export default class InventorySpace {
    id;
    gridElement;
    item = null;
    imgContainer;
    highlight;
    img;
    static sourceSpace = null;
    constructor(id, gridElement) {
        this.id = id;
        this.gridElement = gridElement;
        this.imgContainer = document.createElement('div');
        this.highlight = document.createElement('img');
        this.img = document.createElement('img');
        this.img.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.imgContainer.addEventListener('dragover', this.handleDragOver.bind(this));
        this.imgContainer.addEventListener('drop', this.handleDrop.bind(this));
        this.setupHighlight();
        this.setupImgContainer();
        this.gridElement.appendChild(this.imgContainer);
        this.gridElement.appendChild(this.highlight);
    }
    setupHighlight() {
        this.highlight.src = './assets/Images/InventoryMain/IMG_SlotHighlight.png';
        this.highlight.style.position = 'absolute';
        this.highlight.style.width = '12%';
        this.highlight.style.height = '19%';
        this.highlight.style.zIndex = '3';
        this.highlight.style.visibility = 'hidden';
        this.imgContainer.appendChild(this.highlight);
    }
    setupImgContainer() {
        this.imgContainer.style.display = 'flex';
        this.imgContainer.style.height = '100%';
        this.imgContainer.style.width = '100%';
        // this.imgContainer.style.marginBottom = '0%';
        // this.imgContainer.style.marginLeft = '0%';
        this.imgContainer.style.justifyContent = 'center';
        this.imgContainer.style.alignItems = 'center';
        this.imgContainer.style.position = 'relative';
        this.imgContainer.style.setProperty('z-index', '8', 'important');
        this.imgContainer.appendChild(this.img);
        this.imgContainer.addEventListener('mouseover', () => {
            this.highlight.style.visibility = 'visible';
        });
        this.imgContainer.addEventListener('mouseout', () => {
            this.highlight.style.visibility = 'hidden';
        });
    }
    setItem(item) {
        this.item = item;
        if (item) {
            this.img.src = `./assets/Images/Icons/${item.name}.png`;
            this.img.alt = item.name;
            this.img.style.width = '50%';
            this.img.style.height = '50%';
            this.img.style.zIndex = '4';
            // this.img.draggable = true;
        }
    }
    clearItem() {
        this.item = null;
        this.img.src = '';
        this.img.alt = '';
        this.img.style.width = '0%';
        this.img.style.height = '0%';
    }
    handleDragStart(e) {
        InventorySpace.sourceSpace = this;
        e.dataTransfer.setData('text/plain', this.id);
    }
    handleDragOver(e) {
        e.preventDefault();
    }
    handleDrop(e) {
        e.preventDefault();
        if (InventorySpace.sourceSpace) {
            const tempItem = this.item;
            this.setItem(InventorySpace.sourceSpace.item);
            InventorySpace.sourceSpace.setItem(tempItem);
            if (!tempItem) {
                InventorySpace.sourceSpace.clearItem();
            }
            InventorySpace.sourceSpace = null;
        }
    }
}
