import Product from './product';

class Restaurant {
  id: string;
  name: string;
  image: string;
  address: string;
  category: string;
  products: Product[];

  constructor(
    restaurantId: string,
    restaurantName: string,
    restaurantImage: string,
    restaurantAddress: string,
    restaurantCategory: string,
    restaurantProducts: Product[]
  ) {
    this.id = restaurantId;
    this.name = restaurantName;
    this.image = restaurantImage;
    this.address = restaurantAddress;
    this.category = restaurantCategory;
    this.products = restaurantProducts;
  }
}

export default Restaurant;
