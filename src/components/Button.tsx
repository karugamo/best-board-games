import styled from 'styled-components'

const Button = styled.button`
  font-size: 20px;
  padding: 12px 40px;
  border: 2px solid #272e6e;
  background-color: transparent;
  color: #272e6e;
  cursor: pointer;
  border-radius: 7px;
  box-shadow: 0px 2px white;

  transition: background-color 0.2s, color 0.2s;

  :hover {
    background-color: #272e6e;
    color: white;
  }

  :active {
    transform: translate(0, 2px);
    box-shadow: 0px 0px white;
  }
`

export default Button
