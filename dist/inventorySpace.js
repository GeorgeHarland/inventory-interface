export default class InventorySpace {
    id;
    gridElement;
    item = null;
    imgContainer;
    highlight;
    img;
    stackCount;
    tooltip;
    tooltipTitle;
    tooltipDescription;
    tooltipPrice;
    tooltipContainer;
    static sourceSpace = null;
    constructor(id, gridElement) {
        this.id = id;
        this.gridElement = gridElement;
        this.imgContainer = document.createElement('div');
        this.highlight = document.createElement('img');
        this.img = document.createElement('img');
        this.stackCount = document.createElement('span');
        this.tooltipContainer = document.createElement('div');
        this.tooltip = document.createElement('img');
        this.tooltipTitle = document.createElement('p');
        this.tooltipDescription = document.createElement('p');
        this.tooltipPrice = document.createElement('p');
        this.imgContainer.draggable = true;
        this.imgContainer.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.imgContainer.addEventListener('dragover', this.handleDragOver.bind(this));
        this.imgContainer.addEventListener('drop', this.handleDrop.bind(this));
        this.imgContainer.addEventListener('mouseenter', this.showTooltip.bind(this));
        this.imgContainer.addEventListener('mouseleave', this.hideTooltip.bind(this));
        this.imgContainer.addEventListener('mousemove', this.moveTooltip.bind(this));
        this.setupTooltip();
        this.setupHighlight();
        this.setupImgContainer();
        this.setupStackCount();
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
    setupStackCount() {
        this.stackCount.style.position = 'absolute';
        this.stackCount.style.top = '9%';
        this.stackCount.style.left = '10%';
        this.stackCount.style.zIndex = '5';
        this.stackCount.style.color = 'brown';
        this.stackCount.style.fontSize = '12px';
        this.stackCount.style.fontFamily = 'NumericsFont';
        this.imgContainer.appendChild(this.stackCount);
    }
    setupTooltip() {
        this.tooltipContainer.style.position = 'absolute';
        this.tooltipContainer.style.zIndex = '9999';
        this.tooltipContainer.style.visibility = 'hidden';
        this.tooltipContainer.style.pointerEvents = 'none';
        this.tooltip.src = `./assets/Images/Tooltip/IMG_TooltipPanel.png`;
        this.tooltipTitle.style.position = 'absolute';
        this.tooltipTitle.style.color = 'brown';
        this.tooltipTitle.style.top = '6%';
        this.tooltipTitle.style.left = '14%';
        this.tooltipTitle.style.fontSize = '18px';
        this.tooltipTitle.style.fontFamily = 'MenusPrimaryFont';
        this.tooltipDescription.style.position = 'absolute';
        this.tooltipDescription.style.color = 'brown';
        this.tooltipDescription.style.top = '35%';
        this.tooltipDescription.style.left = '14%';
        this.tooltipDescription.style.fontSize = '12px';
        this.tooltipDescription.style.fontFamily = 'ToolTipDescription';
        this.tooltipDescription.style.fontStyle = 'italic';
        this.tooltipPrice.style.position = 'absolute';
        this.tooltipPrice.style.color = 'brown';
        this.tooltipPrice.style.bottom = '6%';
        this.tooltipPrice.style.right = '6%';
        this.tooltipPrice.style.fontSize = '12px';
        this.tooltipPrice.style.fontFamily = 'ToolTipDescription';
        this.tooltipContainer.appendChild(this.tooltip);
        this.tooltipContainer.appendChild(this.tooltipTitle);
        this.tooltipContainer.appendChild(this.tooltipDescription);
        this.tooltipContainer.appendChild(this.tooltipPrice);
        document.body.appendChild(this.tooltipContainer);
    }
    setItem(item) {
        this.item = item;
        if (item) {
            this.img.src = `./assets/Images/Icons/${item.icon}.png`;
            this.img.alt = item.icon;
            this.img.style.width = '50%';
            this.img.style.height = '50%';
            this.img.style.zIndex = '4';
            if (item.currentStackSize > 1) {
                this.stackCount.textContent = item.currentStackSize.toString();
            }
            else {
                this.stackCount.textContent = '';
            }
        }
    }
    clearItem() {
        this.item = null;
        this.img.src = '';
        this.img.alt = '';
        this.img.style.width = '0%';
        this.img.style.height = '0%';
        this.stackCount.textContent = '';
    }
    handleDragStart(e) {
        InventorySpace.sourceSpace = this;
        this.tooltipContainer.style.visibility = 'hidden';
    }
    handleDragOver(e) {
        e.preventDefault();
    }
    handleDrop(e) {
        e.preventDefault();
        this.tooltipContainer.style.visibility = 'visible';
        if (InventorySpace.sourceSpace && InventorySpace.sourceSpace.item) {
            if (this.item) {
                // stack if can
                if (this.item.canStack(InventorySpace.sourceSpace.item)) {
                    this.item.currentStackSize += InventorySpace.sourceSpace.item.currentStackSize;
                    if (this.item.currentStackSize > 1) {
                        this.stackCount.textContent = this.item.currentStackSize.toString();
                    }
                    else {
                        this.stackCount.textContent = '';
                    }
                    InventorySpace.sourceSpace.clearItem();
                    // swap the items
                }
                else {
                    const tempItem = this.item;
                    this.setItem(InventorySpace.sourceSpace.item);
                    InventorySpace.sourceSpace.setItem(tempItem);
                }
                // move item to empty space
            }
            else {
                this.setItem(InventorySpace.sourceSpace.item);
                InventorySpace.sourceSpace.clearItem();
            }
            InventorySpace.sourceSpace = null;
        }
    }
    showTooltip() {
        if (this.item) {
            this.tooltipTitle.textContent = this.item.title;
            this.tooltipDescription.textContent = this.item.description;
            this.tooltipPrice.textContent = this.item.sellPrice.toString() + 'g';
            this.tooltipContainer.style.visibility = 'visible';
        }
    }
    hideTooltip() {
        this.tooltipContainer.style.visibility = 'hidden';
    }
    moveTooltip(e) {
        this.tooltipContainer.style.left = `${e.pageX}px`;
        this.tooltipContainer.style.top = `${e.pageY}px`;
    }
}
