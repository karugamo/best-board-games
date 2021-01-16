import React from 'react'
import Slider from 'rc-slider'
import styled from 'styled-components'
import 'rc-slider/assets/index.css'

export default function SingleSlider({
  value,
  onChange,
  min,
  max,
  step,
  marks
}: SingleSliderProps) {
  return (
    <SliderContainer>
      <Slider
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        defaultValue={value}
        marks={marks}
        dots
        trackStyle={{backgroundColor: '#e9e9e9'}}
        handleStyle={{border: 'solid 2px #272e6e'}}
        step={step}
        activeDotStyle={{border: 'solid 2px #e9e9e9'}}
      />
    </SliderContainer>
  )
}

type SingleSliderProps = {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  marks?: any
  step?: number
}

const SliderContainer = styled.div`
  max-width: 500px;
  height: 50px;
  width: 80%;
`
