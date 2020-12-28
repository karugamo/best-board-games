export interface GeekGame {
  linkeditem: Linkeditem
  objecttype: string
  objectid: string
  products: Product[]
  config: Config
}

interface Config {
  numitems: number
  itemsperpage: number
  _shiparea: null
  _shipareas: null
}

interface Linkeditem {
  type: string
  id: string
  name: string
  href: string
  label: string
  labelpl: string
  hasAngularLink: boolean
  imageid: number
  image?: Image
  imageSets: ImageSets
  yearpublished?: string
  associtem?: Associtem
}

interface Associtem {
  type: string
  id: string
}

interface Image {
  type: string
  id: string
  dimensions: Dimensions
  imageid: number
  caption: string
  postdate: Date
  gallery: string
  uploader: number
  extension: string
  blocks_ads: boolean
  hidden: boolean
  source: Associtem
  href: string
  canonical_link: string
  browse_href: string
  images: Images
  links: Link[]
}

interface Dimensions {
  width: number
  height: number
}

interface Images {
  micro: Crop100
  small: Large
  medium: Large
  large: Large
  square: Large
  itempage: Crop100
  imagepage: Crop100
  imagepagezoom: Crop100
  expanded: Crop100
  crop100: Crop100
  square200: Crop100
  mediacard: Mediacard
  original: Large
}

interface Crop100 {
  url: string
  src: string
}

interface Large {
  url: string
  src: string
  width: number
  height: number
  'src@2x'?: string
}

interface Mediacard {
  url: string
  src: string
  'src@2x': string
}

interface Link {
  rel: string
  uri: string
}

interface ImageSets {
  square100: Square100
}

interface Square100 {
  src: string
  'src@2x': string
}

interface Product {
  productid: string
  objecttype: string
  objectid: string
  producthref: string
  price: string
  currency: string
  currencystring: string
  currencysymbol: string
  condition: string
  prettycondition: string
  conditioncode: string
  productstate: string
  flagimgurl: string
  listdate: Date
  inventorytype: string
  quantity: string
  shipmethods: any[]
  version: Linkeditem
  objectlink: Linkeditem
  images: null
  linkeduser: Linkeduser
  linkeduserGeekMarket: LinkeduserGeekMarket
}

interface Linkeduser {
  type: string
  id: string
  userid: number
  username: string
  href: string
  firstname: string
  lastname: string
  city: string
  state: string
  country: string
  isocountry: string
  regdate: Date
  designerid: number
  publisherid: number
  hideSupporter: boolean
  adminBadges: any[]
  userMicrobadges: UserMicrobadge[]
  supportYears: string[]
  hideName: boolean
  links: Link[]
  flag: Crop100
  avatar: Avatar
}

interface Avatar {
  urls: Urls
  height: number
  width: number
}

interface Urls {
  md: string
  sm: string
  default: string
}

interface UserMicrobadge {
  slot: number
  badgeid: number
}

interface LinkeduserGeekMarket {
  feedbackrating: string
  vacation: boolean
  adminsuspend: boolean
  itemsig: string
}
