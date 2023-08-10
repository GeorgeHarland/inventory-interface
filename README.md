# Inventory Interface

A brief drag-and-drop inventory with stackable items and tooltips written in HTML/CSS/TypeScript.

## Run

To run:
- Install node
- 'npm i' to install express
- 'npm start' to run the server
  issue with side screens (can see going past 1050x400), new image example

## Testing

You can change DEV_POPULATE_HALF_INVENTORY in ./dist/constants.js to true to populate only half the inventory.

## Known Issues

- If the screen is made super wide, the UI breaks. This starts around 1050x400.
- When moving an item stack onto another, I would like the latter stack to be filled to its max capacity, then the remainder go back to the initial stack. Currently it just swaps the stacks if their total is above the max capacity.

## Images
