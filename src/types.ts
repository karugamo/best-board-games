export enum Category {
  'Strategy Games',
  'Thematic Games',
  'Wargames',
  'Family Games',
  'Customizable Games',
  'Abstract Games',
  'Party Games'
}

export const categories = Object.values(Category).filter((member) => {
  var isValueProperty = parseInt(String(member), 10) >= 0
  if (isValueProperty) return false
  else return true
})
