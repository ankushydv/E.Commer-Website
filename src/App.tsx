import { useState } from "react";
import { useQuery } from "react-query";

//Components
import Cart from "./Cart/Cart";
import Item from "./Items/Item";
import Drawer from "@material-ui/core/Drawer";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";

//Styles
import { Wrapper, StyledButton } from "./app.style";

//Types//
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  title: string;
  price: number;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

function App() {
  const { error, isLoading, data } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );

  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  console.log(cartItems);

  const [cartOpen, setCartOpen] = useState(false);

  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => ack + item.amount, 0);
  };
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      // 1. Is the item already added in the cart?
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      // First time the item is added
      return [...prev, { ...clickedItem, amount: 1 }];
    });
    // setCartItems((prevState) => {
    //   const CheckItemInCart = prevState.find(
    //     (item) => item.id === clickedItem.id
    //   );
  };
  const handleRemoveFromCart = ( id: number) => {
    setCartItems(prev => prev.reduce((ack, item) =>{
      if(item.id === id){
        if(item.amount === 1) return ack;
        return [...ack, {...item , amount: item.amount -1}];
      }else{
        return[...ack , item]
      }
    }, [] as CartItemType[]))
  }

  // console.log(data);
  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "24%",
        }}
      >
        <CircularProgress />
      </div>
    );
  if (error) {
    return (
      <div>
        <h1>Something Went Wrong</h1>
      </div>
    );
  }

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          addToCart={handleAddToCart}
          cartItems={cartItems}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4} lg={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
}

export default App;
