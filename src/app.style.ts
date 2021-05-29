import Styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";

export const Wrapper = Styled.div`
  margin: 40px;
`;

export const StyledButton = Styled(IconButton)`
position: fixed;
z-index: 100;
right: 150px;
top: 5px;
`;
