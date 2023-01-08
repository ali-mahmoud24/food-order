const DUMMY_RESTAURANTS = [
  {
    id: '1',
    name: 'karam el sham',
    image: 'karam.jpg',
    location: 'El Mandra',
    category: 'syrian-food',
    products: [
      {
        id: '1',
        name: 'Chicken Shawerma',
        price: 40,
        description:
          'Pita bread, chicken thigh fillets, cheese, hot sauce, smoked',
        image: 'shawerma.jpg',
      },
      {
        id: '2',
        name: 'Fattah Shawarma',
        price: 50,
        description:
          'Chicken thighs, lebanese pita bread, basmati rice, chicken',
        image: 'fattah-shawerma.jpg',
      },
    ],
  },
  {
    id: '2',
    name: 'kfc',
    image: 'kfc.png',
    location: 'Loran',
    category: 'fried-chicken',
    products: [
      {
        id: '1',
        name: 'Chicken Box',
        price: 50,
        description:
          'Pita bread, chicken thigh fillets, cheese, hot sauce, smoked',
        image: 'kfc-fried.png',
      },
    ],
  },
  {
    id: '3',
    name: "mcdonald's",
    image: 'mac.png',
    location: 'El ekbal',
    category: 'burger',
    products: [
      {
        id: '1',
        name: 'Happy meal',
        price: 150,
        description:
          'Pita bread, chicken thigh fillets, cheese, hot sauce, smoked',
        image: 'burger.jpg',
      },
    ],
  },
  {
    id: '4',
    name: 'pizza hut',
    image: 'pizza.webp',
    location: 'San stefano',
    category: 'pizza',
    products: [
      {
        id: '1',
        name: 'Pepproni pizza',
        price: 140,
        description:
          'Pita bread, chicken thigh fillets, cheese, hot sauce, smoked',
        image: 'pizza.jpg',
      },
    ],
  },
];

export function getAllRestaurants() {
  return DUMMY_RESTAURANTS;
}

// export function getFilteredEvents(dateFilter) {
//   const { year, month } = dateFilter;

//   let filteredEvents = DUMMY_RESTAURANTS.filter((event) => {
//     const eventDate = new Date(event.date);
//     return (
//       eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
//     );
//   });

//   return filteredEvents;
// }

export function getRestaurantById(id: string) {
  return DUMMY_RESTAURANTS.find((restaurant) => restaurant.id === id);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const DUMMY_ORDERS = [
  {
    id: 'O1',
    restaurant: { name: 'Karam El Sham' },
    // this.user : orderUser,
    date: '1-4-2023',
    location: 'Alexandria, Abuqir, masaken el zobat',
    totalPrice: 100,
    status: 'Preparing',
  },
];

export function getAllOrders() {
  return DUMMY_ORDERS;
}
