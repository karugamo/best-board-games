import React from 'react'
import {Range} from 'rc-slider'
import styled from 'styled-components'
import 'rc-slider/assets/index.css'

export default function ComplexitySlider({value, onChange}) {
  return (
    <RangeContainer>
      <Range
        value={value}
        onChange={onChange}
        min={1}
        max={5}
        defaultValue={[0, 3]}
        marks={{1: 'very easy', 5: 'very complex'}}
        dots
        trackStyle={[{backgroundColor: '#272e6e'}]}
        handleStyle={[
          {border: 'solid 2px #272e6e'},
          {border: 'solid 2px #272e6e'}
        ]}
        activeDotStyle={{border: 'solid 2px #272e6e'}}
      />
    </RangeContainer>
  )
}

const RangeContainer = styled.div`
  max-width: 500px;
  height: 50px;
  width: 80%;
`
