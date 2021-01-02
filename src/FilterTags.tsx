import React from 'react'
import styled from 'styled-components'
import {GeekGame} from '../types'
import Tag from './Tag'
import {categories, Category} from './types'

export type Filter = {
  name: string
  function: (game: GeekGame) => boolean
}

type FilterTagsProps = {
  onToggle: (filter: Filter) => void
  activeFilters: Filter[]
}

export default function FilterTags({onToggle, activeFilters}: FilterTagsProps) {
  const filterTagProps = {
    onToggle,
    activeFilters
  }

  return (
    <Container>
      {categories.map((category) => (
        <FilterTag
          key={category}
          {...filterTagProps}
          filter={createCategoryFilter(category)}
        />
      ))}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 1100px;

  @media (max-width: 1200px) {
    display: none;
  }
`

function createCategoryFilter(category: string | Category) {
  return {
    name: String(category),
    function: (game: GeekGame) => game?.categories?.includes(String(category))
  }
}

type FilterTagProps = {
  filter: Filter
  onToggle: (filter: Filter) => void
  activeFilters: Filter[]
}

function FilterTag({filter, activeFilters, onToggle}: FilterTagProps) {
  const isActive = activeFilters
    .map((filter) => filter.name)
    .includes(filter.name)

  return (
    <StyledTag inverted={isActive} onClick={() => onToggle(filter)}>
      {filter.name}
    </StyledTag>
  )
}

const StyledTag = styled(Tag)`
  margin-bottom: 7px;
`
