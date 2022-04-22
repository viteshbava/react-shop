import Product from './product';

interface Cart {
  id: number;
  userId: number;
  products: {
    data: Product;
    quantity: number;
  }[];
  date: Date;
}

export default Cart;
