import styled from 'styled-components'

type TagProps = {
  inverted?: boolean
}

const Tag = styled.div<TagProps>`
  border-radius: 25px;
  text-align: center;
  padding: 4px 10px;
  margin-left: 4px;
  background: ${({inverted}) => (inverted ? '#ddd' : '#272e6e')};
  border: 2px solid ${({inverted}) => (inverted ? '#CCCCCC' : '#272e6e')};
  color: ${({inverted}) => (inverted ? '#272e6e' : '#DDDDDD')};
  font-weight: 500;
  cursor: pointer;
  user-select: none;
`

export default Tag
