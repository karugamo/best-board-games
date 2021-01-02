import styled from 'styled-components'

type TagProps = {
  inverted?: boolean
}

const Tag = styled.div<TagProps>`
  border-radius: 25px;
  text-align: center;
  padding: 4px 10px;
  margin-left: 4px;
  background: ${({inverted}) => (inverted ? '#272e6e' : '#ddd')};
  border: 2px solid ${({inverted}) => (inverted ? '#272e6e' : '#ccc')};
  color: ${({inverted}) => (inverted ? '#ddd' : '#272e6e')};
  font-weight: 500;
  cursor: pointer;
  user-select: none;
`

export default Tag
