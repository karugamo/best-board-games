import React from 'react'
import {Range} from 'rc-slider'
import styled from 'styled-components'
import 'rc-slider/assets/index.css'

export default function RangeSlider({
  value,
  onChange,
  min,
  max,
  step,
  marks
}: RangeSliderProps) {
  return (
    <RangeContainer>
      <Range
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        defaultValue={[min, max]}
        marks={marks}
        dots
        trackStyle={[{backgroundColor: '#272e6e'}]}
        handleStyle={[
          {border: 'solid 2px #272e6e'},
          {border: 'solid 2px #272e6e'}
        ]}
        step={step}
        activeDotStyle={{border: 'solid 2px #272e6e'}}
      />
    </RangeContainer>
  )
}

type RangeSliderProps = {
  value: number[]
  onChange: (value: number[]) => void
  min: number
  max: number
  marks?: any
  step?: number
}

const RangeContainer = styled.div`
  max-width: 500px;
  height: 50px;
  width: 80%;
`
