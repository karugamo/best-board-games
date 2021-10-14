import React from 'react'
import styled from 'styled-components'

export default function BestBoardGamesLink() {
  return (
    <Container>
      <Link target="_blank" href="https://overwhelmingly-positive.com">
        Overwhelmingly Positive Steam Games
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px;
  text-align: center;
`

const Link = styled.a`
  color: #272e6e;
  font-size: 40px;
`
