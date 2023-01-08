class Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;

  constructor(
    productId: string,
    productTitle: string,
    productPrice: number,
    productDescription: string,
    productImage: string
  ) {
    this.id = productId;
    this.title = productTitle;
    this.price = productPrice;
    this.description = productDescription;
    this.image = productImage;
  }
}

export default Product;
