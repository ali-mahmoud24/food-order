import Restaurant from './restaurant';

class Order {
  id: string;
  restaurant: Restaurant;
  //   user: User;
  date: string;
  location: string;
  totalPrice: number;
  status: string;

  constructor(
    orderId: string,
    orderRestaurant: Restaurant,
    // orderUser: User,
    orderDate: string,
    orderLocation: string,
    orderTotalPrice: number,
    orderStatus: string
  ) {
    this.id = orderId;
    this.restaurant = orderRestaurant;
    // this.user = orderUser;
    this.date = orderDate;
    this.location = orderLocation;
    this.totalPrice = orderTotalPrice;
    this.status = orderStatus;
  }
}

export default Order;
