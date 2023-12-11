# Inventory Interface

A brief drag-and-drop inventory with stackable items and tooltips written in HTML/CSS/TypeScript.

## Run

To run:
- Install node
- 'npm i' to install express
- 'npm start' to run the server
- go to http://localhost:3000

## Testing

You can change DEV_POPULATE_HALF_INVENTORY in ./dist/constants.js to true to populate only half the inventory.

## Known Issues

- If the screen is made super wide, the UI breaks.
- When moving an item stack onto another, I would like the latter stack to be filled to its max capacity, then the remainder go back to the initial stack. Currently it just swaps the stacks if their total is above the max capacity.

## Images

![image](https://github.com/GeorgeHarland/inventory-interface/assets/37070520/4d771f9c-b3da-467a-bc43-fef72b09be89)

