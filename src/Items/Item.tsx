import Button from "@material-ui/core/Button";
//Style//
import { Wrapper } from "./item.style";

//Types//
import { CartItemType } from "../App";

type Props = {
  item: CartItemType;
  handleAddToCart: (clickedItems: CartItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3> {item.title} </h3>
      <pre>{item.category}</pre>
      <p>{item.description} </p>
      <h3>${item.price} </h3>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      variant="outlined"
      color="secondary"
    >
      Add to cart
    </Button>
  </Wrapper>
);

export default Item;
