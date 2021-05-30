//Style//
import { Wrapper } from "./cart.style";
//Types//
import { CartItemType } from "../App";
//Component //
import CartItem from "../CartItem/CartItems";

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ addToCart, removeFromCart, cartItems }) => {
  const cartTotalAmount = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? "Cart Empty !!" : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h1>Total:$ {cartTotalAmount(cartItems)}</h1>
    </Wrapper>
  );
};

export default Cart;
