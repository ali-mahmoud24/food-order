const OPTIONS_LIST = [
  'Syrian Food',
  'Burger',
  'Fried chicken',
  'Pizza',
  'Sandwich',
  'Cafe',
  'Egyptian Food',
  'Bakery Shop',
  'Milkshake',
  'Muffin',
  'Burrito',
  'Taco',
  'Hot dog',
  'Donuts',
  'Soft drink',
  'Onion ring',
  'Pancake',
  'Bacon',
  'Chip',
  'Noodle',
];

export const categoryOptions = OPTIONS_LIST.map((option) => (
  <option key={Math.random()} value={option}>
    {option}
  </option>
));
