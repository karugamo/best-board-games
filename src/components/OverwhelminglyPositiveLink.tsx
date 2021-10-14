import React from 'react'
import styled from 'styled-components'

export default function BestBoardGamesLink() {
  return (
    <Container>
      <Emoji />
      <Link target="_blank" href="https://overwhelmingly-positive.com">
        Overwhelmingly Positive Steam Games
      </Link>
      <Emoji />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`

const Link = styled.a`
  color: #272e6e;
  font-size: 40px;
`

function Emoji() {
  return <EmojiContainer>🕹</EmojiContainer>
}

const EmojiContainer = styled.div`
  margin: 16px;
  line-height: 26px;
  font-size: 40px;
`
