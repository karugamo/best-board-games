import React from 'react'
import styled from 'styled-components'

export default function Game({image}) {
  return (
    <GameContainer>
      <Image src={image} />
    </GameContainer>
  )
}

const GameContainer = styled.div``

const Image = styled.img`
  width: 444px;
  height: 250px;
`
