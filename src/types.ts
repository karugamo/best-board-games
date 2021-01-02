export enum Category {
  'Strategy Games',
  'Family Games',
  'Party Games',
  'Cooperative Game'
}

export const categories = Object.values(Category).filter((member) => {
  var isValueProperty = parseInt(String(member), 10) >= 0
  if (isValueProperty) return false
  else return true
})
