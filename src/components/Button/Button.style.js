import { Button } from "native-base";
import styled from "styled-components";

export const ButtonStyled = styled(Button)`
  margin: 5;
  padding: 15;
  color: ${props => props.textColor || "white"};
`;
