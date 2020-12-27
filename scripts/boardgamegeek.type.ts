export interface GeekGame {
  linkeditem: Linkeditem
  objecttype: string
  objectid: string
  products: Product[]
  config: Config
}

export interface Config {
  numitems: number
  itemsperpage: number
  _shiparea: null
  _shipareas: null
}

export interface Linkeditem {
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

export interface Associtem {
  type: string
  id: string
}

export interface Image {
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

export interface Dimensions {
  width: number
  height: number
}

export interface Images {
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

export interface Crop100 {
  url: string
  src: string
}

export interface Large {
  url: string
  src: string
  width: number
  height: number
  'src@2x'?: string
}

export interface Mediacard {
  url: string
  src: string
  'src@2x': string
}

export interface Link {
  rel: string
  uri: string
}

export interface ImageSets {
  square100: Square100
}

export interface Square100 {
  src: string
  'src@2x': string
}

export interface Product {
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

export interface Linkeduser {
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

export interface Avatar {
  urls: Urls
  height: number
  width: number
}

export interface Urls {
  md: string
  sm: string
  default: string
}

export interface UserMicrobadge {
  slot: number
  badgeid: number
}

export interface LinkeduserGeekMarket {
  feedbackrating: string
  vacation: boolean
  adminsuspend: boolean
  itemsig: string
}

export interface GeekItem {
  items: Item[]
  itemdata: Itemdatum[]
  linkdata: any[]
  config: ConfigGeekItem
}

export interface ConfigGeekItem {
  numitems: number
  sortdata: Sortdatum[]
  filters: Filter[]
}

export interface Filter {
  key: string
  options: FilterOption[]
  title: string
}

export interface FilterOption {
  objectid: string
  name: string
}

export interface Sortdatum {
  title: string
  hidden?: boolean
  key: string
  onzero?: string
  href?: string
  string_format?: string
}

export interface Itemdatum {
  datatype: Datatype
  fieldname?: string
  title: string
  primaryname?: boolean
  required?: boolean
  unclickable?: boolean
  fullcredits?: boolean
  subtype?: Subtype
  keyname: string
  alternate?: boolean
  createposttext?: string
  posttext?: string
  createtitle?: string
  table?: string
  options?: ItemdatumOption[]
  adminonly?: boolean
  nullable?: boolean
  validatemethod?: string
  maxlength?: number
  editfieldsize?: number
  other_objecttype?: string
  other_subtype?: string
  linktype?: string
  self_prefix?: SelfPrefix
  titlepl?: string
  lookup_subtype?: string
  showall_ctrl?: boolean
  loadlinks?: boolean
  uneditable?: boolean
  correctioncomment?: string
  addnew?: boolean
  adminaccess?: string[]
  polltype?: string
}

export enum Datatype {
  GeekitemFielddata = 'geekitem_fielddata',
  GeekitemLinkdata = 'geekitem_linkdata',
  GeekitemPolldata = 'geekitem_polldata'
}

export interface ItemdatumOption {
  value: number
  title: string
}

export enum SelfPrefix {
  Dst = 'dst',
  Src = 'src'
}

export enum Subtype {
  Boardgame = 'boardgame'
}

export interface Item {
  usersrated: string
  average: string
  avgweight: string
  numowned: string
  numprevowned: string
  numtrading: string
  numwanting: string
  numwish: string
  numcomments: string
  yearpublished: string
  rank: string
  name: string
  postdate: Date
  linkid: string
  linktype: string
  objecttype: string
  objectid: string
  itemstate: string
  rep_imageid: string
  subtype: Subtype
  links: any[]
  href: string
  images: GeekItemImages
}

export interface GeekItemImages {
  thumb: string
  micro: string
  square: string
  squarefit: string
  tallthumb: string
  previewthumb: string
  square200: string
}
